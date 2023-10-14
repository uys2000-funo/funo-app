import { range } from "@/services/app/NumberService";

export const getMonthLength = function (date: Date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
};
export const getMonthLengthAsArray = function (date: Date) {
  return range(1, getMonthLength(date));
};

export const checkDateIsToday = function (day: number, date: Date) {
  return (
    day == new Date().getDate() &&
    new Date().getMonth() == date.getMonth() &&
    new Date().getFullYear() == date.getFullYear()
  );
};
export const getIncreasedDateByDay = function (date: Date, days: number) {
  const day = 1000 * 60 * 60 * 24 * days;
  return new Date(date.getTime() + day);
};

export const getDateFromString = function (
  year: string,
  month: string,
  day: string
) {
  return new Date(parseInt(year), parseInt(month), parseInt(day));
};
export const getTimestampFromString = function (
  year: string,
  month: string,
  day: string
) {
  return new Date(parseInt(year), parseInt(month), parseInt(day)).getTime();
};
