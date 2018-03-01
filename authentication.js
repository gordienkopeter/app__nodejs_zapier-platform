require('dotenv').config();

const { API_NOTES_HOST, API_NOTES_PORT } = process.env;

const test = async (z, bundle) => {
  const { apiKey } = bundle.authData || {};
  const url = `${API_NOTES_HOST}:${API_NOTES_PORT}/api/auth/verify`;
  const headers = { Authorization: `ApiKey ${apiKey}` };
  const response = await z.request({ url, headers });

  if (response.status === 401) {
    throw new Error('The API Key you supplied is invalid');
  }

  return response;
};

const authentication = {
  type: 'custom',
  test,
  fields: [{ key: 'apiKey', label: 'API Key', required: true, type: 'string' }],
};

const addApiKeyToHeader = (request, z, bundle) => {
  const { apiKey } = bundle.authData || {};

  if (apiKey) {
    request.headers.Authorization = `ApiKey ${apiKey}`;
  }

  return request;
};

module.exports = authentication;
