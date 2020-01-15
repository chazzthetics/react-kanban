export function makeBoard({ title }) {
  return {
    id: `boardNew${Math.floor(Math.random() * 20)}`,
    title,
    columnIds: [],
    isEditing: false
  };
}
