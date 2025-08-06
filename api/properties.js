// api/properties.js
// This file works with Vercel (recommended) or Netlify Functions

// For Vercel deployment (RECOMMENDED - Easiest)
export default async function handler(req, res) {
  // Enable CORS for your GitHub Pages site
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const API_KEY = '37b5cffffamsh6c4ba5550a4883ep196c6fjsn2dc297e77753';
  const API_HOST = 'zillow-com1.p.rapidapi.com';
  
  try {
    // Fetch properties from Zillow API
    const response = await fetch(
      'https://zillow-com1.p.rapidapi.com/marketData?resourceId=32810&beds=0&propertyTypes=house',
      {
        method: 'GET',
        headers: {
          'x-rapidapi-host': API_HOST,
          'x-rapidapi-key': API_KEY
        }
      }
    );

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();
    
    // Filter for properties in the $2M-$5M range
    if (data.results) {
      data.results = data.results.filter(prop => {
        const price = prop.price || prop.zestimate || 0;
        return price >= 2000000 && price <= 5000000;
      });
    }
    
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching from Zillow:', error);
    return res.status(500).json({ 
      error: 'Failed to fetch properties',
      message: error.message 
    });
  }
}

/* 
DEPLOYMENT INSTRUCTIONS - VERCEL (EASIEST - 5 MINUTES):
=========================================================

1. Go to: https://vercel.com
2. Sign up/Login with your GitHub account
3. Click "Add New Project"
4. Create a new directory on your computer called "zillow-backend"
5. Inside that directory, create a folder called "api"
6. Save this file as "api/properties.js"
7. Create a file called "package.json" with:
   {
     "name": "zillow-backend",
     "version": "1.0.0",
     "description": "Zillow API Backend"
   }
8. Push to a new GitHub repository
9. Import that repository in Vercel
10. Deploy! Your API will be at: https://your-project.vercel.app/api/properties

ALTERNATIVE - NETLIFY FUNCTIONS:
=================================
// For Netlify, save this as "netlify/functions/properties.js"

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  const API_KEY = '37b5cffffamsh6c4ba5550a4883ep196c6fjsn2dc297e77753';
  const API_HOST = 'zillow-com1.p.rapidapi.com';
  
  try {
    const response = await fetch(
      'https://zillow-com1.p.rapidapi.com/marketData?resourceId=32810&beds=0&propertyTypes=house',
      {
        method: 'GET',
        headers: {
          'x-rapidapi-host': API_HOST,
          'x-rapidapi-key': API_KEY
        }
      }
    );

    const data = await response.json();
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to fetch properties' })
    };
  }
};
*/
