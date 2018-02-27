const authentication = require('./authentication');

const handleHTTPError = (response, z) => {
  if (response.status >= 400) {
    throw new Error(`Unexpected status code ${response.status}`);
  }

  return response;
};

const App = {
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,
  authentication,
  beforeRequest: [],
  afterResponse: [handleHTTPError],
  resources: {},
  triggers: {},
  searches: {},
  creates: {}
};

module.exports = App;
