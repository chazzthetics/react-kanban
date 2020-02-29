export const slugify = title => {
  return title.toLowerCase().replace(/ /g, "-");
};
