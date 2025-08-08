export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  try {
    const response = await fetch(
      'https://zillow-com1.p.rapidapi.com/marketData?resourceId=32810&beds=0&propertyTypes=house',
      {
        method: 'GET',
        headers: {
          'x-rapidapi-host': 'zillow-com1.p.rapidapi.com',
          'x-rapidapi-key': '25270fe2d8msh94761e6134108ecp1ab902jsnba784ecc6e5b'
        }
      }
    );
    
    const data = await response.json();
    return res.status(200).json(data);
    
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
