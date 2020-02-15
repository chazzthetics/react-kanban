import axios from "axios";
const baseUrl = "http://localhost:8000/api";

export const authApi = {
  getUser: token =>
    axios.get(`${baseUrl}/auth/user`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }),

  login: ({ email, password }) =>
    axios.post(`${baseUrl}/auth/login`, {
      email,
      password
    }),

  register: ({ name, email, password }) =>
    axios.post(`${baseUrl}/auth/register`, { name, email, password }),

  logout: () => axios.post(`${baseUrl}/auth/logout`)
};
