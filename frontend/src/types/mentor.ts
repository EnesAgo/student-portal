export interface Mentor {
  id: string;
  name: string;
  major: string;
  semester: number;
  languages: string[];
  nationality: string;
  flag: string;
  bio: string;
  image: string;
  about?: string[];
  academicBackground?: {
    major: string;
    currentSemester: number;
    focusAreas: string;
    experience: string;
  };
  personalInfo?: {
    languages: string;
    nationality: string;
    hobbies: string;
  };
  mentorshipFocus?: {
    whoCanHelp: string;
    topics: string[];
  };
  email?: string;
}

export interface FilterOptions {
  major: string;
  semester: string;
  language: string;
}

