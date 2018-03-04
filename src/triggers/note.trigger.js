import { config } from 'dotenv';

config();

const { API_NOTES_HOST, API_NOTES_PORT } = process.env;

const fetchNoteList = (z, bundle) => {
  z.console.log(process.env);
  const url = `${API_NOTES_HOST}:${API_NOTES_PORT}/api/notes`;
  const method = 'GET';
  const params = {};

  return z.request({ url, method, params }).then((response) => {
    const { items: notes } = JSON.parse(response.content).data;

    const { title } = bundle.inputData;

    if (title) {
      return notes.filter((note) => note.title === title);
    }

    return notes;
  });
};

export const getNote = {
  key: 'note',
  noun: 'Note',

  display: {
    label: 'Get Note',
    description: 'Get note dynamic dropdown.',
  },

  operation: {
    inputFields: [
      {
        key: 'note',
        label: 'Note',
        type: 'string',
        required: true,
        dynamic: 'notesList.id.title',
      },
    ],
    perform: fetchNoteList,
    sample: { id: 123, title: 'Test note', content: 'Test note content' },
  },
};
