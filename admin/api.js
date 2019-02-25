import axios from "axios";
import store from "store";

const client = axios.create({
  baseURL: "http://localhost:5000"
});

const withAuth = params => ({ ...params, token: store.getState().auth.token });

const get = async (endpoint, data = {}) => {
  return (await client.get(endpoint, { params: withAuth(data) })).data;
};

const post = async (endpoint, data = {}) => {
  return (await client.post(endpoint, withAuth(data))).data;
};

const api = {
  auth: {
    login: data => get("/v1/admin/auth/login", data)
  }
};

export default api;
