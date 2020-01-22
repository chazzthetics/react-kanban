export function makeTask({ content }) {
  return {
    id: `taskNew${Math.floor(Math.random() * 20)}`,
    content,
    completed: false,
    isEditing: false,
    labelIds: []
  };
}
