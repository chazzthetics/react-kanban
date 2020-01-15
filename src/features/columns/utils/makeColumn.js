export function makeColumn({ title }) {
  return {
    id: `columnNew${Math.floor(Math.random() * 20)}`,
    title,
    taskIds: [],
    isEditing: false
  };
}
