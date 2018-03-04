import should from 'should';
import zapier from 'zapier-platform-core';
import { App } from '../index';
import { config } from 'dotenv';

config();

const { TEST_API_KEY } = process.env;
const appTester = zapier.createAppTester(App);

describe('custom authentication "My Notes"', () => {
  it('should verify api key without explode', async () => {
    const bundle = {
      authData: {
        apiKey: TEST_API_KEY,
      },
    };

    const response = await appTester(App.authentication.test, bundle);
    should(response.status).eql(200);
    response.request.headers.Authorization.should.eql(`ApiKey ${TEST_API_KEY}`);
  });

  it('should verify api key with explode', async () => {
    const bundle = {
      authData: {
        apiKey: '',
      },
    };

    try {
      const response = await appTester(App.authentication.test, bundle);
    } catch (e) {
      e.message.should.containEql('The API Key you supplied is invalid');
    }
  });
});
