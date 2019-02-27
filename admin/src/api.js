import axios from "axios";
import store from "store";

const client = axios.create({
  baseURL: "http://localhost:5000"
});

const headers = () => ({
  Authorization: `Bearer ${store.getState().auth.token}`
});

const get = async (endpoint, params = {}) => {
  return (await client.get(endpoint, { params, headers: headers() })).data;
};

const post = async (endpoint, data = {}) => {
  return (await client.post(endpoint, data, { headers: headers() })).data;
};

const put = async (endpoint, data = {}) => {
  return (await client.put(endpoint, data, { headers: headers() })).data;
};

const api = {
  auth: {
    login: data => get("/admin/auth/login", data)
  },
  places: {
    create: data => post("/admin/places", data),
    list: () => get("/admin/places")
  },
  events: {
    create: data => post("/admin/events", data),
    update: ({ id, ...rest }) => put(`/admin/events/${id}`, rest),
    list: () => get("/admin/events")
  }
};

export default api;
