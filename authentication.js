require('dotenv').config();

const { API_NOTES_HOST, API_NOTES_PORT } = process.env;

const test = async (z, bundle) => {
  const url = `${API_NOTES_HOST}:${API_NOTES_PORT}/verify`;
  const response = await z.request({ url });

  if (response.status === 401) {
    throw new Error('The username and/or password you supplied is incorrect');
  }

  return response;
};

const authentication = {
  type: 'custom',
  test,
  fields: [{ key: 'apiKey', label: 'API Key', required: true, type: 'string' }]
};

const addApiKeyToHeader = (request, z, bundle) => {
  request.headers.Authorization = `ApiKey ${basicHash}`;
  return request;
};

module.exports = { authentication };
