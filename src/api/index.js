import axios from "axios";

const baseUrl = "http://localhost:8000/api";

export const getBoards = () => axios.get(`${baseUrl}/boards`);

export const getColumns = () => axios.get(`${baseUrl}/columns`);

export const getTasks = () => axios.get(`${baseUrl}/tasks`);

export const getData = token =>
  axios.get(`${baseUrl}/all`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
