# API Documentation Summary

## Base URL
`http://localhost:3001`

## Collections & Schemas

### 1. Users Collection
**Endpoint Base**: `/users`

**Schema**:
```typescript
{
  firstName: string
  lastName: string
  email: string (unique)
  password: string (hashed)
  role: "student" | "admin"
  isMentor: boolean
  studentId?: string
  phoneNumber?: string
  profilePicture?: string
  isActive: boolean
  lastLogin?: Date
  timestamps: { createdAt, updatedAt }
}
```

**Endpoints**:
- `POST /users` - Create user
- `GET /users` - Get all users
- `GET /users/mentors` - Get users who are mentors
- `GET /users/:id` - Get user by ID
- `PATCH /users/:id` - Update user
- `DELETE /users/:id` - Delete user

---

### 2. Mentors Collection
**Endpoint Base**: `/mentors`

**Schema**:
```typescript
{
  userId: ObjectId (ref: User, unique)
  bio: string
  languages: string[]
  country: string
  majors: string[]
  interests: string[] // ["Academic Support", "Career Guidance", "Social Integration"]
  yearOfStudy: string
  rating: number (0-5)
  totalRatings: number
  isAvailable: boolean
  availability: [{
    day: string
    startTime: string
    endTime: string
  }]
  totalMentees: number
  maxMentees: number (default: 5)
  linkedIn?: string
  instagram?: string
  timestamps: { createdAt, updatedAt }
}
```

**Endpoints**:
- `POST /mentors` - Create mentor profile
- `GET /mentors` - Get all mentors (filterable)
  - Filters: `?languages=English,Spanish&country=Germany&majors=CS&interests=Career&isAvailable=true`
- `GET /mentors/:id` - Get mentor by ID
- `GET /mentors/user/:userId` - Get mentor by user ID
- `PATCH /mentors/:id` - Update mentor
- `PATCH /mentors/:id/rating` - Update rating
- `DELETE /mentors/:id` - Delete mentor

---

### 3. Mentorship Requests Collection
**Endpoint Base**: `/mentorship-requests`

**Schema**:
```typescript
{
  studentId: ObjectId (ref: User)
  mentorId: ObjectId (ref: Mentor)
  message: string
  status: "pending" | "accepted" | "rejected" | "cancelled"
  proposedMeetingTime?: Date
  responseMessage?: string
  respondedAt?: Date
  timestamps: { createdAt, updatedAt }
}
```

**Endpoints**:
- `POST /mentorship-requests` - Create request
- `GET /mentorship-requests` - Get all requests
- `GET /mentorship-requests/student/:studentId` - By student
- `GET /mentorship-requests/mentor/:mentorId` - By mentor
- `GET /mentorship-requests/mentor/:mentorId/pending` - Pending for mentor
- `GET /mentorship-requests/:id` - Get by ID
- `PATCH /mentorship-requests/:id` - Update (accept/reject)
- `DELETE /mentorship-requests/:id` - Delete

---

### 4. Languages Collection (Reference Data)
**Endpoint Base**: `/languages`

**Schema**:
```typescript
{
  code: string (unique) // "en", "es", "fr"
  name: string // "English", "Spanish", "French"
  isActive: boolean
  timestamps: { createdAt, updatedAt }
}
```

**Endpoints**:
- `POST /languages` - Create language
- `GET /languages` - Get all active languages
- `POST /languages/seed` - Seed initial data
- `DELETE /languages/:id` - Delete language

**Seeded Languages**: English, Spanish, French, German, Italian, Portuguese, Chinese, Japanese, Korean, Arabic, Turkish, Russian

---

### 6. Countries Collection (Reference Data)
**Endpoint Base**: `/countries`

**Schema**:
```typescript
{
  code: string (unique) // "US", "GB", "DE"
  name: string // "United States", "United Kingdom", "Germany"
  isActive: boolean
  timestamps: { createdAt, updatedAt }
}
```

**Endpoints**:
- `POST /countries` - Create country
- `GET /countries` - Get all active countries
- `POST /countries/seed` - Seed initial data
- `DELETE /countries/:id` - Delete country

**Seeded Countries**: 33+ countries including US, UK, Germany, France, Spain, Italy, etc.

---

### 7. Majors Collection (Reference Data)
**Endpoint Base**: `/majors`

**Schema**:
```typescript
{
  name: string (unique) // "Computer Science"
  department?: string // "Engineering", "Business", etc.
  isActive: boolean
  timestamps: { createdAt, updatedAt }
}
```

**Endpoints**:
- `POST /majors` - Create major
- `GET /majors` - Get all active majors
- `POST /majors/seed` - Seed initial data
- `DELETE /majors/:id` - Delete major

**Seeded Majors**: 4 majors (Software Engineering, Cyber Security, Data Science And AI, Digital Industrial Engineering)

---

## Common Patterns

### Creating Resources
All POST endpoints accept JSON body and return the created resource:
```bash
POST /resource
Content-Type: application/json
{...data}

Response: 201 Created
{...createdResource}
```

### Updating Resources
PATCH endpoints accept partial updates:
```bash
PATCH /resource/:id
Content-Type: application/json
{...partialData}

Response: 200 OK
{...updatedResource}
```

### Deleting Resources
DELETE endpoints return no content:
```bash
DELETE /resource/:id

Response: 204 No Content
```

### Filtering & Querying
GET endpoints support query parameters:
```bash
GET /mentors?languages=English,Spanish&isAvailable=true
GET /mentorship-requests/student/123
```

---

## Quick Setup Workflow

1. **Start MongoDB**
   ```bash
   mongod
   # or
   docker run -d -p 27017:27017 mongo
   ```

2. **Start Backend**
   ```bash
   cd backend
   npm install
   npm run start:dev
   ```

3. **Seed Reference Data**
   ```bash
   curl -X POST http://localhost:3001/languages/seed
   curl -X POST http://localhost:3001/countries/seed
   curl -X POST http://localhost:3001/majors/seed
   ```

4. **Create First User**
   ```bash
   curl -X POST http://localhost:3001/users \
     -H "Content-Type: application/json" \
     -d '{
       "firstName": "John",
       "lastName": "Doe",
       "email": "john@example.com",
       "password": "password123",
       "role": "student"
     }'
   ```

5. **Create Mentor Profile** (using userId from step 4)
   ```bash
   curl -X POST http://localhost:3001/mentors \
     -H "Content-Type: application/json" \
     -d '{
       "userId": "USER_ID_HERE",
       "bio": "3rd year CS student helping newcomers",
       "languages": ["English"],
       "country": "United States",
       "majors": ["Computer Science"],
       "interests": ["Academic Support"],
       "yearOfStudy": "3rd Year"
     }'
   ```

---

## Response Format

All successful responses return JSON:
```json
{
  "_id": "ObjectId",
  "field1": "value1",
  "field2": "value2",
  "createdAt": "ISO Date",
  "updatedAt": "ISO Date"
}
```

Error responses:
```json
{
  "statusCode": 400,
  "message": "Error description",
  "error": "Bad Request"
}
```

---

## Validation Rules

- Email must be valid and unique
- Password minimum 6 characters
- All required fields must be provided
- Enum values must match defined options
- ObjectId references must be valid MongoDB IDs
- Rating must be between 0-5
- Duration must be at least 15 minutes

---

## Next Steps

1. Add JWT authentication
2. Implement role-based access control
3. Add pagination to list endpoints
4. Implement email notifications
5. Add file upload for profile pictures
6. Create analytics/statistics endpoints

