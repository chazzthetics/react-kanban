import dateFnsFormat from "date-fns/format";
import dateFnsParse from "date-fns/parse";
import { DateUtils } from "react-day-picker";

export const FORMAT = "MM/dd/yyyy";

export const parseDate = (str, format, locale) => {
  const parsed = dateFnsParse(str, format, new Date(), { locale });
  if (DateUtils.isDate(parsed)) {
    return parsed;
  }

  return null;
};

export const formatDate = (date, format, locale) =>
  dateFnsFormat(date, format, { locale });

export const formatTagDate = date => {
  if (!date) {
    return;
  }
  const parsed = dateFnsParse(date, "yyyy-MM-dd", new Date());
  return formatDate(parsed, "MMM dd");
};

//FIXME: check imports (size)
