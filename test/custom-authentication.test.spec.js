require('should');

const zapier = require('zapier-platform-core');
const App = require('../index');
const appTester = zapier.createAppTester(App);

describe('custom authentication "My Notes"', () => {
  it('should verify api key without explode', done => {
    const bundle = {
      authData: {
        apiKey: '72LLWDFV7U.1RKVNHTDJMD.TF4Z7LZ8CXM',
      },
    };

    appTester(App.authentication.test, bundle)
      .then(response => {
        response.status.should.eql(200);
        response.request.headers.Authorization.should.eql(
          'ApiKey 72LLWDFV7U.1RKVNHTDJMD.TF4Z7LZ8CXM'
        );
        done();
      })
      .catch(done);
  });
});
