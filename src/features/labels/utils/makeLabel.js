export function makeLabel({ color, name }) {
  return {
    id: `labelNew${Math.floor(Math.random() * 20)}`,
    color,
    name
  };
}
