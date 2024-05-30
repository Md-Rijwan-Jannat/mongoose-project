import {
  ISemesterCodeMapper,
  TMonths,
  TSemesterCode,
  TSemesterName,
} from "./semester.interface";

export const months: readonly TMonths[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

export const semesterName: readonly TSemesterName[] = [
  "Autumn",
  "Summer",
  "Fall",
] as const;
export const semesterCode: readonly TSemesterCode[] = [
  "01",
  "02",
  "03",
] as const;

export const semesterCodeMapper: ISemesterCodeMapper = {
  Autumn: "01",
  Summer: "02",
  Fall: "03",
};
