import axios from 'axios';

const client = axios.create({
  baseURL: 'http://34.246.84.126',
});

const api = {
  events: {
    list: async () => (await client.get('/v1/events')).data,
  },
};

export default api;
