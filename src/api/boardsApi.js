import axios from "axios";
import { arrayToObject } from "../utils/arrayToObject";

const baseUrl = "http://localhost:8000/api";

export const boardsApi = {
  get: () => axios.get(`${baseUrl}/boards`),

  create: ({ board }) =>
    axios.post(`${baseUrl}/boards`, {
      title: board.title
    }),

  remove: ({ boardId }) => axios.delete(`${baseUrl}/boards/${boardId}`),

  clear: ({ boardId }) => axios.delete(`${baseUrl}/boards/${boardId}/clear`),

  updateTitle: ({ boardId, title }) =>
    axios.patch(`${baseUrl}/boards/${boardId}`, { title }),

  reorder: ({ boardId, orderToPersist }) =>
    axios.put(`${baseUrl}/boards/${boardId}/reorder`, {
      id: parseInt(boardId),
      columnIds: arrayToObject(orderToPersist)
    })
};
