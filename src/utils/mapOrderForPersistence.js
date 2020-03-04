export const mapOrderForPersistence = (array, rest) => {
  return array.map((id, index) => ({
    id: parseInt(id),
    position: index,
    ...rest
  }));
};
