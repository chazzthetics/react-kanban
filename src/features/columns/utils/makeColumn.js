import uuid from "uuid/v4";

export function makeColumn({ title }) {
  return {
    id: uuid(),
    title,
    isEditing: false,
    isLocked: false,
    isOpen: false,
    taskIds: []
  };
}
