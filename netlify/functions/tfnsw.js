const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJpUFEyNk9PTllKUGtwUnc1Si14bkMzV3pNWDhFVzZzR2NiYl83eWV6VjdjIiwiaWF0IjoxNzc0ODI4NjcxfQ.YX03Gcyekf70Srls_s8qniP0202t4GVC-sFXP5o_g-w';
const BASE = 'https://api.transport.nsw.gov.au/v1/tp';

exports.handler = async (event) => {
  const params = { ...event.queryStringParameters };
  const endpoint = params.endpoint;
  delete params.endpoint;

  if (!endpoint) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Missing endpoint' }) };
  }

  const qs = new URLSearchParams(params).toString();
  const url = `${BASE}/${endpoint}?${qs}`;

  try {
    const res = await fetch(url, {
      headers: { Authorization: 'apikey ' + API_KEY }
    });
    const body = await res.text();
    return {
      statusCode: res.status,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body
    };
  } catch (e) {
    return {
      statusCode: 502,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: e.message })
    };
  }
};
