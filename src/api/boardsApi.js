import axios from "axios";
import { arrayToObject } from "../utils/arrayToObject";

const baseUrl = process.env.REACT_APP_API_URL;

export const boardsApi = {
  get: () => {
    return axios.get(`${baseUrl}/boards`);
  },
  create: ({ board }) => {
    return axios.post(`${baseUrl}/boards`, {
      title: board.title,
      color: board.color
    });
  },
  remove: ({ boardId }) => {
    return axios.delete(`${baseUrl}/boards/${boardId}`);
  },
  clear: ({ boardId }) => {
    return axios.delete(`${baseUrl}/boards/${boardId}/clear`);
  },
  updateTitle: ({ boardId, title }) => {
    return axios.patch(`${baseUrl}/boards/${boardId}`, { title });
  },
  setCurrent: ({ boardId }) => {
    return axios.patch(`http://localhost:8000/api/boards/${boardId}/current`);
  },
  reorder: ({ boardId, orderToPersist }) => {
    return axios.put(`${baseUrl}/boards/${boardId}/reorder`, {
      id: parseInt(boardId),
      columnIds: arrayToObject(orderToPersist)
    });
  },
  move: ({
    startBoardId,
    endBoardId,
    startOrderToPersist,
    endOrderToPersist
  }) => {
    return axios.put(`${baseUrl}/boards/${startBoardId}/move`, {
      id: parseInt(startBoardId),
      endBoardId: parseInt(endBoardId),
      startColumnIds: arrayToObject(startOrderToPersist),
      endColumnIds: arrayToObject(endOrderToPersist)
    });
  }
};
