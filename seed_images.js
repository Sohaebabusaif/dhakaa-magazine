const PROJECT_ID = 'cby043pw';
const DATASET = 'production';
const TOKEN = 'skjwzJYLXxRR6b1zwlfVAQk3DgzNKUcGEV6e7jWfWgCISKiIs9NHBQY9eEQ1OiNPUyU1X7rpZt6rU7xUBsjmP8pWj6093rKjgHK1nGxKduEjZ46SkWIBFzFaOaBS2LjLQnDUE7grUamasFm5Z9la2zg6wwnsK2ZYGxluqt8UvSNz1cPkGNTR';
const API_VERSION = 'v2024-01-01';

const fetchImages = async () => {
  console.log('Fetching articles from Sanity to attach images to them...');
  const query = encodeURIComponent('*[_type == "article"]');
  const res = await fetch(`https://${PROJECT_ID}.api.sanity.io/${API_VERSION}/data/query/${DATASET}?query=${query}`, {
    headers: { 'Authorization': `Bearer ${TOKEN}` }
  });
  const data = await res.json();
  const articles = data.result;

  const imageQueries = [
    'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80', // education
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80', // tech / laptop
    'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=80', // science / lab
    'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=80', // school / kids
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80', // startup / team
    'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=80', // sports / soccer
    'https://images.unsplash.com/photo-1475518132813-4dc200cefc09?auto=format&fit=crop&w=1200&q=80', // space
    'https://images.unsplash.com/photo-1427504494785-319cecb4ce79?auto=format&fit=crop&w=1200&q=80', // meeting
  ];

  for (let i = 0; i < articles.length; i++) {
    const article = articles[i];
    if (article.mainImage) continue; // skip if already has image

    console.log(`Processing article: ${article.title}`);
    
    // Pick an image URL
    const imageUrl = imageQueries[i % imageQueries.length];
    console.log(`Downloading image: ${imageUrl}`);
    const imgRes = await fetch(imageUrl);
    const imgBuffer = await imgRes.arrayBuffer();

    // Upload to Sanity
    console.log('Uploading to Sanity...');
    const uploadRes = await fetch(`https://${PROJECT_ID}.api.sanity.io/${API_VERSION}/assets/images/${DATASET}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'image/jpeg',
        'Authorization': `Bearer ${TOKEN}`
      },
      body: Buffer.from(imgBuffer)
    });
    
    const uploadData = await uploadRes.json();
    if (!uploadRes.ok) {
      console.error('Failed to upload image:', uploadData);
      continue;
    }

    const imageId = uploadData.document._id;
    console.log(`Uploaded! Asset ID: ${imageId}. Patching article...`);

    // Patch the article
    const patchRes = await fetch(`https://${PROJECT_ID}.api.sanity.io/${API_VERSION}/data/mutate/${DATASET}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TOKEN}`
      },
      body: JSON.stringify({
        mutations: [
          {
            patch: {
              id: article._id,
              set: {
                mainImage: {
                  _type: 'image',
                  asset: {
                    _type: 'reference',
                    _ref: imageId
                  }
                }
              }
            }
          }
        ]
      })
    });

    if (patchRes.ok) {
      console.log('Successfully added image to article!');
    } else {
      console.error('Failed to patch article:', await patchRes.json());
    }
  }
};

fetchImages();
