import uuid from "uuid/v4";

export function makeTask({ content }) {
  return {
    id: uuid(),
    content,
    completed: false,
    isEditing: false,
    dueDate: "",
    priority: null,
    isDueDate: false,
    isPriority: false,
    labelIds: []
  };
}
