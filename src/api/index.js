import axios from "axios";
import { boardsApi } from "./boardsApi";
import { columnsApi } from "./columnsApi";
import { tasksApi } from "./tasksApi";
import { authApi } from "./authApi";

const baseUrl = "http://localhost:8000/api";

export const getData = token =>
  axios.get(`${baseUrl}/all`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

export { boardsApi, columnsApi, tasksApi, authApi };
