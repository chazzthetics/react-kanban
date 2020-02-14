import axios from "axios";
import { arrayToObject } from "../utils/arrayToObject";

const baseUrl = "http://localhost:8000/api";

export const getBoards = () => axios.get(`${baseUrl}/boards`);

export const getTasks = () => axios.get(`${baseUrl}/tasks`);

export const getData = token =>
  axios.get(`${baseUrl}/all`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

export const getUser = token =>
  axios.get(`${baseUrl}/auth/user`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

export const loginRequest = ({ email, password }) =>
  axios.post(`${baseUrl}/auth/login`, {
    email,
    password
  });

export const columnsApi = {
  getColumns: () => axios.get(`${baseUrl}/columns`),

  create: ({ column, boardId }) =>
    axios.post(`${baseUrl}/columns`, {
      title: column.title,
      board_id: parseInt(boardId)
    }),

  remove: ({ columnId }) => axios.delete(`${baseUrl}/columns/${columnId}`),

  clear: ({ columnId }) => axios.delete(`${baseUrl}/columns/${columnId}/clear`),

  toggleLock: ({ columnId, isLocked }) =>
    axios.patch(`${baseUrl}/columns/${columnId}`, { isLocked }),

  updateTitle: ({ columnId, title }) =>
    axios.patch(`${baseUrl}/columns/${columnId}`, { title }),

  reorder: ({ columnId, orderToPersist }) =>
    axios.put(`${baseUrl}/columns/${columnId}/tasks`, {
      id: parseInt(columnId),
      taskIds: arrayToObject(orderToPersist)
    }),

  reorderBetween: ({
    startColumnId,
    endColumnId,
    startOrderToPersist,
    endOrderToPersist
  }) =>
    axios.put(`${baseUrl}/columns/${endColumnId}`, {
      startColumnId: parseInt(startColumnId),
      endColumnId: parseInt(endColumnId),
      startTasks: arrayToObject(startOrderToPersist),
      endTasks: arrayToObject(endOrderToPersist)
    })
};
