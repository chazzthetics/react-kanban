export const darkenOnOver = color => {
  const split = color.split(".");
  const hover = parseInt(split[1]) + 100;
  const newColor = `${split[0]}.${hover}`;
  return newColor;
};
