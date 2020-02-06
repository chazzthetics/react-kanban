import uuid from "uuid/v4";

export function makeBoard({ title }) {
  return {
    id: uuid(),
    title,
    isEditing: false,
    columnIds: []
  };
}
