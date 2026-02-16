# Frontend-Backend Integration Guide

This document explains how the frontend connects to the backend API to fetch mentors and filter options.

## Overview

The mentoring page now fetches real data from the backend API instead of using static JSON files.

## Files Created/Modified

### New Files:
1. **`src/lib/api.ts`** - Axios client configuration
2. **`src/services/api.service.ts`** - API service functions for fetching data
3. **`.env.local`** - Environment variables for API URL

### Modified Files:
1. **`src/components/pages/MentoringPage.tsx`** - Fetches mentors from backend
2. **`src/components/ui/SearchFilter.tsx`** - Fetches filter options (majors, languages) from backend

## Setup Instructions

### 1. Install Dependencies
```bash
cd frontend
npm install axios
```

### 2. Configure Environment Variables
Create `.env.local` in the frontend root:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### 3. Start Backend Server
Make sure the backend is running:
```bash
cd backend
npm run start:dev
```

### 4. Seed Backend Database
Populate the backend with sample data:
```bash
cd backend
npm run seed:db
```

### 5. Start Frontend
```bash
cd frontend
npm run dev
```

## API Integration Details

### API Client (`src/lib/api.ts`)
```typescript
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
```

### API Service Functions (`src/services/api.service.ts`)

#### Fetch Languages
```typescript
export const fetchLanguages = async (): Promise<Language[]> => {
  const response = await apiClient.get('/languages');
  return response.data;
};
```

#### Fetch Majors
```typescript
export const fetchMajors = async (): Promise<Major[]> => {
  const response = await apiClient.get('/majors');
  return response.data;
};
```

#### Fetch Mentors
```typescript
export const fetchAndTransformMentors = async (): Promise<Mentor[]> => {
  const backendMentors = await fetchMentors();
  
  // Transform backend format to frontend format
  return await Promise.all(
    backendMentors.map(mentor => transformMentorToFrontend(mentor))
  );
};
```

### Data Transformation

The backend mentor format is different from the frontend format, so we transform it:

**Backend Format:**
```typescript
{
  _id: string;
  userId: string;
  bio: string;
  languages: string[];
  country: string;
  majors: string[];
  semester: number;
  // ... more fields
}
```

**Frontend Format:**
```typescript
{
  id: string;
  name: string;  // From user.firstName + user.lastName
  major: string;
  semester: number;
  languages: string[];
  nationality: string;
  bio: string;
  // ... more fields
}
```

The transformation fetches user data to get the name and maps fields accordingly.

## Component Updates

### MentoringPage Component

**Before:**
```typescript
import { mentors } from "@/data/mentors.json";
```

**After:**
```typescript
const [mentors, setMentors] = useState<Mentor[]>([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const loadMentors = async () => {
    const fetchedMentors = await fetchAndTransformMentors();
    setMentors(fetchedMentors);
  };
  loadMentors();
}, []);
```

### SearchFilter Component

**Before:**
```typescript
import { MAJORS, LANGUAGES } from "@/data/constants";
```

**After:**
```typescript
const [majors, setMajors] = useState<Major[]>([]);
const [languages, setLanguages] = useState<Language[]>([]);

useEffect(() => {
  const loadOptions = async () => {
    const [fetchedMajors, fetchedLanguages] = await Promise.all([
      fetchMajors(),
      fetchLanguages(),
    ]);
    setMajors(fetchedMajors);
    setLanguages(fetchedLanguages);
  };
  loadOptions();
}, []);
```

## Features Implemented

### ✅ Loading States
- Shows spinner while fetching mentors
- Prevents UI from breaking during load

### ✅ Error Handling
- Catches and displays API errors
- Provides retry button on failure

### ✅ Dynamic Filters
- Majors fetched from `/majors` endpoint
- Languages fetched from `/languages` endpoint
- Filters update based on backend data

### ✅ Real-time Data
- Mentors loaded from `/mentors` endpoint
- User names fetched from `/users/:id` endpoint
- All data synchronized with backend

## API Endpoints Used

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/mentors` | GET | Fetch all mentors |
| `/users/:id` | GET | Fetch user details (for name) |
| `/languages` | GET | Fetch available languages |
| `/majors` | GET | Fetch available majors |
| `/countries` | GET | Fetch available countries |

## Testing

### 1. Verify Backend is Running
```bash
curl http://localhost:3001/mentors
```

### 2. Check Seeded Data
```bash
# Should return 2 mentors
curl http://localhost:3001/mentors | jq '. | length'

# Should return languages
curl http://localhost:3001/languages

# Should return majors
curl http://localhost:3001/majors
```

### 3. Test Frontend
1. Open browser: `http://localhost:3000`
2. Should see loading spinner briefly
3. Should display mentors from backend
4. Filter dropdowns should show backend data

## Troubleshooting

### CORS Issues
If you see CORS errors, verify backend CORS settings in `backend/src/main.ts`:
```typescript
app.enableCors({
  origin: 'http://localhost:3000',
  credentials: true,
});
```

### Connection Refused
- Ensure backend is running on port 3001
- Check `.env.local` has correct API URL

### No Mentors Displayed
- Run `npm run seed:db` in backend to populate data
- Check browser console for errors
- Verify backend endpoints return data

### Filter Options Empty
- Ensure backend is seeded with reference data
- Check network tab for API responses

## Environment Variables

### Development
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### Production
```env
NEXT_PUBLIC_API_URL=https://your-backend-api.com
```

## Next Steps

- [ ] Add authentication integration
- [ ] Implement mentorship request submission
- [ ] Add user profile management
- [ ] Implement real-time updates with WebSockets
- [ ] Add pagination for mentors list
- [ ] Implement caching with React Query

## Summary

✅ **Frontend now connected to backend API**  
✅ **Real-time data fetching for mentors**  
✅ **Dynamic filter options from backend**  
✅ **Loading and error states implemented**  
✅ **Data transformation handled**  

The mentoring page is now fully integrated with the backend! 🎉

