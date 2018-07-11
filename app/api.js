import axios from 'axios';

const client = axios.create({
  baseURL: 'http://127.0.0.1:5000',
});

const api = {
  events: {
    list: async () => (await client.get('/v1/events')).data,
  },
  auth: {
    signupVerification: async data =>
      (await client.post('/v1/auth/signup/verification', data)).data,
    signup: async data => (await client.post('/v1/auth/signup', data)).data,
  },
};

export default api;
