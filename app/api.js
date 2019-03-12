import axios from "axios";
import store from "./store";

const client = axios.create({
  baseURL: "https://api.kiki.rocks"
});

const withAuth = params => ({ ...params, token: store.getState().auth.token });

const get = async (endpoint, data = {}) => {
  return (await client.get(endpoint, { params: withAuth(data) })).data;
};

const post = async (endpoint, data = {}) => {
  return (await client.post(endpoint, withAuth(data))).data;
};

const api = {
  events: {
    list: () => get("/v1/events"),
    get: ({ id }) => get(`/v1/events/${id}`),
    interested: ({ event_id, interested }) =>
      post(`/v1/events/${event_id}/interest`, { interested })
  },
  auth: {
    signupVerification: data => post("/v1/auth/signup/verification", data),
    signup: data => post("/v1/auth/signup", data),
    loginVerification: data => post("/v1/auth/login/verification", data),
    login: data => post("/v1/auth/login", data)
  }
};

export default api;
