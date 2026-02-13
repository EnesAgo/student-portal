export const MAJORS = [
  "Software Engineering",
  "Cyber Security",
  "Data Science And AI",
  "Digital Industrial Engineering"
] as const;

export const LANGUAGES = [
  "German",
  "English",
  "Turkish",
  "Romanian",
  "Russian",
  "Italian",
  "Macedonian",
  "Albanian",
  "Latvian",
  "Luganda"
] as const;

export type Major = typeof MAJORS[number];
export type Language = typeof LANGUAGES[number];

