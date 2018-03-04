import { loadBabel } from './tools';
import { addApiKeyToHeader, authentication } from './authentication';
import { getNote } from './triggers/note.trigger';
import { notes } from './resources/notes.resources';

loadBabel();

const handleHTTPError = (response, z) => {
  if (response.status >= 400) {
    throw new Error(`Unexpected status code ${response.status}`);
  }

  return response;
};

export const App = {
  version: require('../package.json').version,
  platformVersion: require('zapier-platform-core').version,
  authentication,
  beforeRequest: [addApiKeyToHeader],
  afterResponse: [handleHTTPError],
  resources: {
    [notes.key]: notes,
  },
  triggers: {
    [getNote.key]: getNote,
  },
  searches: {},
  creates: {},
};
