import { config } from 'dotenv';

config();

const { API_NOTES_HOST, API_NOTES_PORT } = process.env;

const test = (z, bundle) => {
  const { apiKey } = bundle.authData || {};
  const url = `${API_NOTES_HOST}:${API_NOTES_PORT}/api/auth/verify`;
  const headers = { Authorization: `ApiKey ${apiKey}` };

  return z.request({ url, headers }).catch(() => {
    throw new Error('The API Key you supplied is invalid');
  });
};

export const authentication = {
  type: 'custom',
  test,
  fields: [{ key: 'apiKey', label: 'API Key', required: true, type: 'string' }],
  connectionLabel: '{{bundle.authData.apiKey}}',
};

export const addApiKeyToHeader = (request, z, bundle) => {
  const { apiKey } = bundle.authData || {};

  if (apiKey) {
    request.headers.Authorization = `ApiKey ${apiKey}`;
  }

  return request;
};
