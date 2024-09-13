import {
  IAcademicSemesterCodeMapper,
  TMonths,
  TAcademicSemesterCode,
  TAcademicSemesterName,
} from "./academicSemester.interface";

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

export const AcademicSemesterName: readonly TAcademicSemesterName[] = [
  "Autumn",
  "Summer",
  "Fall",
] as const;
export const AcademicSemesterCode: readonly TAcademicSemesterCode[] = [
  "01",
  "02",
  "03",
] as const;

export const academicSemesterNameCodeMapper: IAcademicSemesterCodeMapper = {
  Autumn: "01",
  Summer: "02",
  Fall: "03",
};


export const SemesterSearchableFields = [
  "name",
  "year",
  "code",
  "startMonth",
  "endMonth",
];