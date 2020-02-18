import axios from "axios";

const baseUrl = process.env.REACT_APP_API_URL;

export const tasksApi = {
  get: () => {
    return axios.get(`${baseUrl}/tasks`);
  },
  create: ({ task, columnId }) => {
    return axios.post(`${baseUrl}/tasks`, {
      content: task.content,
      column_id: parseInt(columnId)
    });
  },
  remove: ({ taskId }) => {
    return axios.delete(`${baseUrl}/tasks/${taskId}`);
  },
  updateContent: ({ taskId, content }) => {
    return axios.patch(`${baseUrl}/tasks/${taskId}`, { content });
  },
  toggleComplete: ({ taskId, completed }) => {
    return axios.patch(`${baseUrl}/tasks/${taskId}`, { completed: !completed });
  },
  addLabel: ({ taskId, labelId }) => {
    return axios.put(`${baseUrl}/tasks/${taskId}/label`, {
      labelId: parseInt(labelId)
    });
  },
  removeLabel: ({ taskId, labelId }) => {
    return axios.put(`${baseUrl}/tasks/${taskId}/label/remove`, {
      labelId: parseInt(labelId)
    });
  }
};
