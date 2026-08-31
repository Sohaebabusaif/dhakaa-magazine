const PROJECT_ID = 'cby043pw';
const DATASET = 'production';
const TOKEN = 'skjwzJYLXxRR6b1zwlfVAQk3DgzNKUcGEV6e7jWfWgCISKiIs9NHBQY9eEQ1OiNPUyU1X7rpZt6rU7xUBsjmP8pWj6093rKjgHK1nGxKduEjZ46SkWIBFzFaOaBS2LjLQnDUE7grUamasFm5Z9la2zg6wwnsK2ZYGxluqt8UvSNz1cPkGNTR';
const API_VERSION = 'v2024-01-01';
const crypto = require('crypto');

const fixKeysV2 = async () => {
  console.log('Fetching all articles to fix missing keys in children...');
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
        let newBlock = { ...block };
        if (!newBlock._key) {
          needsFix = true;
          newBlock._key = crypto.randomBytes(8).toString('hex');
        }
        
        if (newBlock.children && Array.isArray(newBlock.children)) {
          newBlock.children = newBlock.children.map(child => {
            if (!child._key) {
              needsFix = true;
              return { ...child, _key: crypto.randomBytes(8).toString('hex') };
            }
            return child;
          });
        }
        
        return newBlock;
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
    
    // Mutate in chunks of 5 to avoid payload limits just in case
    for(let i = 0; i < mutations.length; i += 5) {
      const chunk = mutations.slice(i, i + 5);
      const patchRes = await fetch(`https://${PROJECT_ID}.api.sanity.io/${API_VERSION}/data/mutate/${DATASET}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${TOKEN}`
        },
        body: JSON.stringify({ mutations: chunk })
      });
      if (!patchRes.ok) {
        console.error('Failed to fix chunk:', await patchRes.json());
      } else {
         console.log(`Fixed chunk ${i/5 + 1}`);
      }
    }
    console.log('Successfully fixed all missing child keys!');
  } else {
    console.log('No articles needed fixing.');
  }
};

fixKeysV2();
