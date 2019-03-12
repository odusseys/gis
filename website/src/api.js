import axios from "axios";

const client = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

const get = async (endpoint, params = {}) => {
  return (await client.get(endpoint, { params })).data;
};

const api = {
  events: {
    list: () => get("/v1/events"),
    get: ({ id }) => get(`/v1/events/${id}`)
  }
};

export default api;
