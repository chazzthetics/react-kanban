import axios from "axios";

const baseUrl = process.env.REACT_APP_API_URL;

export const authApi = {
  getUser: token => {
    return axios.get(`${baseUrl}/auth/user`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  },
  login: ({ email, password }) => {
    return axios.post(`${baseUrl}/auth/login`, {
      email,
      password
    });
  },
  register: ({ name, email, password }) => {
    return axios.post(`${baseUrl}/auth/register`, { name, email, password });
  },
  logout: () => {
    return axios.post(`${baseUrl}/auth/logout`);
  }
};
