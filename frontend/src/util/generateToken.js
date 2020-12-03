const request = require('request');
const OAuth = require('oauth-1.0a');
const crypto = require('crypto'); // dependency package for OAuth-1.0a

function generateToken() {
  const collectupAuth = JSON.parse(localStorage.getItem('collectupAuth'));

  if (collectupAuth) {
    if (new Date(collectupAuth.expiresOn) > Date.now()) {
      console.log('[*] OAuth Token exists...');
      return;
    }
  }

  console.log('[*] Generating OAuth Token...');

  const oauth = OAuth({
    consumer: {
      key: process.env.REACT_APP_HERE_REST_API_KEY_ID, //Access key
      secret: process.env.REACT_APP_HERE_REST_API_KEY_SECRET, //Secret key
    },
    signature_method: 'HMAC-SHA256',
    hash_function(base_string, key) {
      return crypto
        .createHmac('sha256', key)
        .update(base_string)
        .digest('base64');
    },
  });

  const request_data = {
    url: 'https://account.api.here.com/oauth2/token',
    method: 'POST',
    data: { grant_type: 'client_credentials' },
  };

  request(
    {
      url: request_data.url,
      method: request_data.method,
      form: request_data.data,
      headers: oauth.toHeader(oauth.authorize(request_data)),
    },
    (error, response, body) => {
      if (response.statusCode === 200) {
        const result = JSON.parse(response.body);
        result['expiresOn'] = new Date(
          Date.now() + result.expires_in
        ).toString();
        localStorage.setItem('collectupAuth', JSON.stringify(result));
      }
    }
  );
}

export default generateToken;
