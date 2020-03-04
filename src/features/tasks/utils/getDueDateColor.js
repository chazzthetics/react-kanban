import {
  toDate,
  isToday,
  isTomorrow,
  isPast,
  isWithinInterval,
  add
} from "date-fns";

export const getDueDateColor = date => {
  const today = toDate(new Date());
  const dueDate = toDate(new Date(`2020-${date}`));

  const nextWeek = add(today, { weeks: 1 });
  const isNextWeek = isWithinInterval(dueDate, {
    start: today,
    end: nextWeek
  });

  if (isToday(dueDate)) return "red";
  if (isPast(dueDate)) return "gray";
  if (isTomorrow(dueDate)) return "orange";
  if (isNextWeek) return "blue";

  return "green";
};
