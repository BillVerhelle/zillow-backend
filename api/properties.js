export default async function handler(req, res) {
  // Allow your website to access this
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  
  try {
    // Direct call to Zillow - EXACTLY as it works in RapidAPI
    const response = await fetch(
      'https://zillow-com1.p.rapidapi.com/marketData?resourceId=32810&beds=0&propertyTypes=house',
      {
        method: 'GET',
        headers: {
          'x-rapidapi-host': 'zillow-com1.p.rapidapi.com',
          'x-rapidapi-key': '2fce36f1bamsh4969a56fe56ac45p180e3cjsn786e264c82e'
        }
      }
    );
    
    // Return whatever Zillow returns
    const data = await response.json();
    return res.status(200).json(data);
    
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
