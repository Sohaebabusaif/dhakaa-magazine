const PROJECT_ID = 'cby043pw';
const DATASET = 'production';
const TOKEN = 'skjwzJYLXxRR6b1zwlfVAQk3DgzNKUcGEV6e7jWfWgCISKiIs9NHBQY9eEQ1OiNPUyU1X7rpZt6rU7xUBsjmP8pWj6093rKjgHK1nGxKduEjZ46SkWIBFzFaOaBS2LjLQnDUE7grUamasFm5Z9la2zg6wwnsK2ZYGxluqt8UvSNz1cPkGNTR';
const API_VERSION = 'v2024-01-01';
const fs = require('fs');
const path = require('path');

const setHeroImage = async () => {
  try {
    console.log('Uploading local Khaled Leadership image to Sanity...');
    const imagePath = path.join(__dirname, 'public', 'khaled-leadership.jpg');
    const imageBuffer = fs.readFileSync(imagePath);

    const uploadRes = await fetch(`https://${PROJECT_ID}.api.sanity.io/${API_VERSION}/assets/images/${DATASET}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'image/jpeg',
        'Authorization': `Bearer ${TOKEN}`
      },
      body: imageBuffer
    });
    
    const uploadData = await uploadRes.json();
    if (!uploadRes.ok) {
      throw new Error(`Failed to upload image: ${JSON.stringify(uploadData)}`);
    }

    const imageId = uploadData.document._id;
    console.log(`Uploaded! Asset ID: ${imageId}.`);

    console.log('Finding Hero article to patch...');
    const query = encodeURIComponent('*[_type == "article" && isHero == true][0]');
    const res = await fetch(`https://${PROJECT_ID}.api.sanity.io/${API_VERSION}/data/query/${DATASET}?query=${query}`, {
      headers: { 'Authorization': `Bearer ${TOKEN}` }
    });
    const data = await res.json();
    const heroArticle = data.result;

    if (!heroArticle) {
       console.log('No hero article found!');
       return;
    }

    console.log(`Found Hero Article: ${heroArticle.title}. Patching...`);
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
              id: heroArticle._id,
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
      console.log('Successfully set the Khaled Leadership image to the Hero article!');
    } else {
      console.error('Failed to patch article:', await patchRes.json());
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

setHeroImage();
