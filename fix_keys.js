const PROJECT_ID = 'cby043pw';
const DATASET = 'production';
const TOKEN = 'skjwzJYLXxRR6b1zwlfVAQk3DgzNKUcGEV6e7jWfWgCISKiIs9NHBQY9eEQ1OiNPUyU1X7rpZt6rU7xUBsjmP8pWj6093rKjgHK1nGxKduEjZ46SkWIBFzFaOaBS2LjLQnDUE7grUamasFm5Z9la2zg6wwnsK2ZYGxluqt8UvSNz1cPkGNTR';
const API_VERSION = 'v2024-01-01';
const crypto = require('crypto');

const fixKeys = async () => {
  console.log('Fetching articles to fix missing keys...');
  const query = encodeURIComponent('*[_type == "article" && defined(body)]');
  const res = await fetch(`https://${PROJECT_ID}.api.sanity.io/${API_VERSION}/data/query/${DATASET}?query=${query}`, {
    headers: { 'Authorization': `Bearer ${TOKEN}` }
  });
  const data = await res.json();
  const articles = data.result;

  const mutations = [];

  for (const article of articles) {
    if (article.body && Array.isArray(article.body)) {
      let needsFix = false;
      const fixedBody = article.body.map(block => {
        if (!block._key) {
          needsFix = true;
          return { ...block, _key: crypto.randomBytes(8).toString('hex') };
        }
        return block;
      });

      if (needsFix) {
        mutations.push({
          patch: {
            id: article._id,
            set: { body: fixedBody }
          }
        });
      }
    }
  }

  if (mutations.length > 0) {
    console.log(`Fixing keys for ${mutations.length} articles...`);
    const patchRes = await fetch(`https://${PROJECT_ID}.api.sanity.io/${API_VERSION}/data/mutate/${DATASET}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TOKEN}`
      },
      body: JSON.stringify({ mutations })
    });
    const patchData = await patchRes.json();
    if (patchRes.ok) {
      console.log('Successfully fixed all missing keys!');
    } else {
      console.error('Failed to fix keys:', patchData);
    }
  } else {
    console.log('No articles needed fixing.');
  }
};

fixKeys();
