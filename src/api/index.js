import axios from "axios";
import { boardsApi } from "./boardsApi";
import { columnsApi } from "./columnsApi";
import { tasksApi } from "./tasksApi";
import { authApi } from "./authApi";

const baseUrl = process.env.REACT_APP_API_URL;

export const getData = token => {
  return axios.get(`${baseUrl}/all`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export { boardsApi, columnsApi, tasksApi, authApi };
