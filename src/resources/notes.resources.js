import { config } from 'dotenv';

config();

const { API_NOTES_HOST, API_NOTES_PORT } = process.env;

const fetchNoteList = (z, bundle) => {
  const url = `${API_NOTES_HOST}:${API_NOTES_PORT}/api/notes`;
  const method = 'GET';
  const params = {};

  return z.request({ url, method, params }).then((response) => {
    const { items } = JSON.parse(response.content).data;

    return items;
  });
};

export const notes = {
  key: 'notes',
  noun: 'Notes',
  list: {
    display: {
      label: 'Note List',
      hidden: true,
      description: 'Get notes dynamic dropdown.',
    },
    operation: {
      perform: fetchNoteList,
      sample: { id: 123, title: 'Test note', content: 'Test note content' },
    },
  },
};
