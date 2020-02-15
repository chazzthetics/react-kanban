import axios from "axios";
import { arrayToObject } from "../utils/arrayToObject";

//TODO: move to env var
const baseUrl = "http://localhost:8000/api";

export const columnsApi = {
  get: () => axios.get(`${baseUrl}/columns`),

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
