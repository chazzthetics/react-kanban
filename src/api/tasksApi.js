import axios from "axios";

const baseUrl = "http://localhost:8000/api";

export const tasksApi = {
  get: () => axios.get(`${baseUrl}/tasks`),

  create: ({ task, columnId }) =>
    axios.post(`${baseUrl}/tasks`, {
      content: task.content,
      column_id: parseInt(columnId)
    }),

  remove: ({ taskId }) => axios.delete(`${baseUrl}/tasks/${taskId}`),

  updateContent: ({ taskId, content }) =>
    axios.patch(`${baseUrl}/tasks/${taskId}`, { content }),

  toggleComplete: ({ taskId, completed }) =>
    axios.patch(`${baseUrl}/tasks/${taskId}`, { completed: !completed }),

  addLabel: ({ taskId, labelId }) =>
    axios.put(`${baseUrl}/tasks/${taskId}/label`, {
      labelId: parseInt(labelId)
    }),

  removeLabel: ({ taskId, labelId }) =>
    axios.put(`${baseUrl}/tasks/${taskId}/label/remove`, {
      labelId: parseInt(labelId)
    })
};
