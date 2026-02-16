import apiClient from '@/lib/api';
import { Mentor } from '@/types/mentor';

export interface Language {
  _id: string;
  code: string;
  name: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Country {
  _id: string;
  code: string;
  name: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Major {
  _id: string;
  name: string;
  department: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface BackendMentor {
  _id: string;
  userId: string | User; // Can be string (ObjectId) or populated User object
  bio: string;
  languages: string[];
  country: string;
  flag?: string;
  majors: string[];
  interests?: string[];
  semester?: number;
  yearOfStudy: string;
  image?: string;
  email?: string;
  rating: number;
  totalRatings: number;
  isAvailable: boolean;
  totalMentees: number;
  maxMentees: number;
  linkedIn?: string;
  instagram?: string;
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
  createdAt: string;
  updatedAt: string;
}

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  isMentor: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Fetch all languages
export const fetchLanguages = async (): Promise<Language[]> => {
  const response = await apiClient.get('/languages');
  return response.data;
};

// Fetch all countries
export const fetchCountries = async (): Promise<Country[]> => {
  const response = await apiClient.get('/countries');
  return response.data;
};

// Fetch all majors
export const fetchMajors = async (): Promise<Major[]> => {
  const response = await apiClient.get('/majors');
  return response.data;
};

// Fetch all mentors
export const fetchMentors = async (): Promise<BackendMentor[]> => {
  const response = await apiClient.get('/mentors');
  return response.data;
};

// Fetch mentor by ID with populated user data
export const fetchMentorById = async (id: string): Promise<BackendMentor> => {
  const response = await apiClient.get(`/mentors/${id}`);
  return response.data;
};

// Fetch user by ID to get name
export const fetchUserById = async (id: string): Promise<User> => {
  const response = await apiClient.get(`/users/${id}`);
  return response.data;
};

// Transform backend mentor to frontend mentor format
export const transformMentorToFrontend = async (
  backendMentor: BackendMentor
): Promise<Mentor> => {
  // Get user data - either from populated userId or fetch it
  let user: User;

  if (typeof backendMentor.userId === 'object' && backendMentor.userId._id) {
    // userId is already populated
    user = backendMentor.userId as User;
  } else {
    // userId is a string, need to fetch
    const userIdString = typeof backendMentor.userId === 'string'
      ? backendMentor.userId
      : String(backendMentor.userId);
    user = await fetchUserById(userIdString);
  }

  return {
    id: backendMentor._id,
    name: `${user.firstName} ${user.lastName}`,
    major: backendMentor.majors[0] || '', // Take first major
    semester: backendMentor.semester || 1,
    languages: backendMentor.languages,
    nationality: backendMentor.country,
    flag: backendMentor.flag || '',
    bio: backendMentor.bio,
    image: backendMentor.image || '',
    about: backendMentor.about,
    academicBackground: backendMentor.academicBackground,
    personalInfo: backendMentor.personalInfo,
    mentorshipFocus: backendMentor.mentorshipFocus,
    email: backendMentor.email || user.email,
  };
};

// Fetch all mentors and transform them to frontend format
export const fetchAndTransformMentors = async (): Promise<Mentor[]> => {
  const backendMentors = await fetchMentors();

  // Transform all mentors in parallel
  return await Promise.all(
    backendMentors.map(mentor => transformMentorToFrontend(mentor))
  );
};

