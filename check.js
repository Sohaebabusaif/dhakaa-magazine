const PROJECT_ID = 'cby043pw';
const DATASET = 'production';
const query = encodeURIComponent('*[_type == "article" && slug.current == "khaled-leadership-program-new"][0]{body}');
fetch(`https://${PROJECT_ID}.api.sanity.io/v2024-01-01/data/query/${DATASET}?query=${query}`)
  .then(res => res.json())
  .then(data => console.log(JSON.stringify(data, null, 2)));
