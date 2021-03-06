import should from 'should';
import zapier from 'zapier-platform-core';
import { App } from '../index';
import { config } from 'dotenv';

config();

const { TEST_API_KEY } = process.env;
const appTester = zapier.createAppTester(App);

describe('triggers', () => {
  describe('Get Notes', () => {
    it('should load notes without explode', async () => {
      const bundle = {
        authData: {
          apiKey: TEST_API_KEY,
        },
        inputData: {
          title: '',
        },
      };

      const response = await appTester(App.triggers.note.operation.perform, bundle);

      response.length.should.above(3);

      const firstNote = response[0];

      firstNote.title.should.eql('Test note');
      firstNote.content.should.eql('Test note content');
    });

    it('should load notes with title', async () => {
      const bundle = {
        authData: {
          apiKey: TEST_API_KEY,
        },
        inputData: {
          title: 'Test note',
        },
      };

      const response = await appTester(App.triggers.note.operation.perform, bundle);

      response.length.should.be.exactly(1);

      const firstNote = response[0];

      firstNote.title.should.eql('Test note');
      firstNote.content.should.eql('Test note content');
    });
  });
});
