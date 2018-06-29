import axios from 'axios';

const client = axios.create({
  baseURL: 'http://api.gis.odusseys.com',
});

const api = {
  events: {
    list: async () => (await client.get('/v1/events')).data,
  },
};

export default api;
