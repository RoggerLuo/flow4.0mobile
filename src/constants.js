export const api_url = process.env.NODE_ENV == 'production'?
  'http://alice0115.applinzi.com/index.php/ngflow' :
  'http://localhost:9123'