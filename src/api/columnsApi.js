import axios from "axios";
import { arrayToObject } from "../utils/arrayToObject";

const baseUrl = process.env.REACT_APP_API_URL;

export const columnsApi = {
  get: () => {
    return axios.get(`${baseUrl}/columns`);
  },
  create: ({ column, boardId }) => {
    return axios.post(`${baseUrl}/columns`, {
      title: column.title,
      board_id: parseInt(boardId)
    });
  },
  remove: columnId => {
    return axios.delete(`${baseUrl}/columns/${columnId}`);
  },
  clear: columnId => {
    return axios.delete(`${baseUrl}/columns/${columnId}/clear`);
  },
  toggleLock: ({ columnId, isLocked }) => {
    return axios.patch(`${baseUrl}/columns/${columnId}`, { isLocked });
  },
  updateTitle: ({ columnId, title }) => {
    return axios.patch(`${baseUrl}/columns/${columnId}`, { title });
  },
  reorder: ({ columnId, orderToPersist }) => {
    return axios.put(`${baseUrl}/columns/${columnId}/tasks`, {
      id: parseInt(columnId),
      taskIds: arrayToObject(orderToPersist)
    });
  },
  reorderBetween: ({
    startColumnId,
    endColumnId,
    startOrderToPersist,
    endOrderToPersist
  }) => {
    return axios.put(`${baseUrl}/columns/${endColumnId}`, {
      startColumnId: parseInt(startColumnId),
      endColumnId: parseInt(endColumnId),
      startTasks: arrayToObject(startOrderToPersist),
      endTasks: arrayToObject(endOrderToPersist)
    });
  }
};
