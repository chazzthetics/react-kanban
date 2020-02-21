import uuid from "uuid/v4";

export function makeBoard({ title, color }) {
  return {
    id: uuid(),
    title,
    color,
    isEditing: false,
    columnIds: []
  };
}
