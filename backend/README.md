# Student Portal Backend API

A NestJS REST API backend for the Student Mentoring Portal with MongoDB integration.

## Features

- **User Management**: Handle student and admin accounts
- **Mentor Profiles**: Extended profiles for students who volunteer as mentors
- **Mentorship Requests**: Connect students with mentors
- **Mentoring Sessions**: Schedule and track mentoring sessions
- **Reference Data**: Languages, Countries, and Majors collections
- **Advanced Filtering**: Search mentors by language, country, major, interests, and availability
- **Validation**: Input validation using class-validator
- **MongoDB**: Full MongoDB integration with Mongoose

## Collections

### Core Collections

1. **Users** - Base user information
   - firstName, lastName, email, password
   - role (student/admin)
   - isMentor flag
   - studentId, phoneNumber, profilePicture
   - isActive, lastLogin

2. **Mentors** - Extended mentor profiles
   - userId (reference to User)
   - bio, languages, country, majors
   - interests (Academic Support, Career Guidance, etc.)
   - yearOfStudy, rating, totalRatings
   - isAvailable, availability schedule
   - totalMentees, maxMentees
   - linkedIn, instagram

3. **MentorshipRequests** - Connection requests
   - studentId, mentorId
   - message, status (pending/accepted/rejected/cancelled)
   - proposedMeetingTime
   - responseMessage, respondedAt

### Reference Data Collections

4. **Languages** - Available languages (English, Spanish, French, etc.)
5. **Countries** - Countries list (US, UK, Germany, etc.)
6. **Majors** - Academic majors (Computer Science, Business, etc.)

## Installation

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your MongoDB connection string
```

## Database Setup

Make sure MongoDB is running locally or update the `MONGODB_URI` in `.env`:

```bash
# Start MongoDB (if installed locally)
mongod

# Or use MongoDB Docker container
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

## Running the Application

```bash
# Development mode with hot-reload
npm run start:dev

# Production mode
npm run build
npm run start:prod

# Debug mode
npm run start:debug
```

The API will be available at `http://localhost:3001`

## Seed Initial Data

After starting the server, seed the reference data:

```bash
# Seed Languages
curl -X POST http://localhost:3001/languages/seed

# Seed Countries
curl -X POST http://localhost:3001/countries/seed

# Seed Majors
curl -X POST http://localhost:3001/majors/seed
```

## API Endpoints

### Users
- `POST /users` - Create a new user
- `GET /users` - Get all users
- `GET /users/mentors` - Get all users who are mentors
- `GET /users/:id` - Get user by ID
- `PATCH /users/:id` - Update user
- `DELETE /users/:id` - Delete user

### Mentors
- `POST /mentors` - Create mentor profile
- `GET /mentors` - Get all mentors (supports filtering)
  - Query params: `languages`, `country`, `majors`, `interests`, `isAvailable`
- `GET /mentors/:id` - Get mentor by ID
- `GET /mentors/user/:userId` - Get mentor profile by user ID
- `PATCH /mentors/:id` - Update mentor profile
- `PATCH /mentors/:id/rating` - Update mentor rating
- `DELETE /mentors/:id` - Delete mentor profile

### Mentorship Requests
- `POST /mentorship-requests` - Create mentorship request
- `GET /mentorship-requests` - Get all requests
- `GET /mentorship-requests/student/:studentId` - Get requests by student
- `GET /mentorship-requests/mentor/:mentorId` - Get requests by mentor
  - Query params: `studentId`, `mentorId`
- `GET /mentorship-requests/:id` - Get request by ID
- `PATCH /mentorship-requests/:id` - Update request (accept/reject)
- `DELETE /mentorship-requests/:id` - Delete request


### Reference Data
- `GET /languages` - Get all languages
- `POST /languages/seed` - Seed initial languages
- `GET /countries` - Get all countries
- `POST /countries/seed` - Seed initial countries
- `GET /majors` - Get all majors
- `POST /majors/seed` - Seed initial majors

## Example API Calls

### Create a User
```bash
curl -X POST http://localhost:3001/users \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "password": "password123",
    "studentId": "S12345"
  }'
```

### Create a Mentor Profile
```bash
curl -X POST http://localhost:3001/mentors \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "USER_ID_HERE",
    "bio": "Hi! I am a 3rd year CS student...",
    "languages": ["English", "Spanish"],
    "country": "United States",
    "majors": ["Computer Science"],
    "interests": ["Academic Support", "Career Guidance"],
    "yearOfStudy": "3rd Year"
  }'
```

### Search Mentors
```bash
# Find mentors who speak Spanish
curl "http://localhost:3001/mentors?languages=Spanish"

# Find CS mentors in Germany
curl "http://localhost:3001/mentors?majors=Computer%20Science&country=Germany"

# Find available mentors
curl "http://localhost:3001/mentors?isAvailable=true"
```

### Create a Mentorship Request
```bash
curl -X POST http://localhost:3001/mentorship-requests \
  -H "Content-Type: application/json" \
  -d '{
    "studentId": "STUDENT_USER_ID",
    "mentorId": "MENTOR_ID",
    "message": "Hi! I would love to connect with you...",
    "proposedMeetingTime": "2026-02-20T14:00:00Z"
  }'
```

## Project Structure

```
backend/
├── src/
│   ├── users/              # User module
│   │   ├── dto/
│   │   ├── schemas/
│   │   ├── users.controller.ts
│   │   ├── users.service.ts
│   │   └── users.module.ts
│   ├── mentors/            # Mentor module
│   ├── mentorship-requests/
│   ├── languages/          # Reference data
│   ├── countries/
│   ├── majors/
│   ├── common/             # Shared utilities
│   ├── config/             # Configuration
│   ├── app.module.ts
│   └── main.ts
├── .env
├── .env.example
├── package.json
└── tsconfig.json
```

## Security Notes

- Passwords are hashed using bcrypt
- Update `JWT_SECRET` in production
- Add authentication middleware (JWT) as needed
- Enable CORS only for trusted origins in production
- Use environment variables for sensitive data

## Next Steps / Recommendations

1. **Authentication & Authorization**
   - Add JWT authentication
   - Implement role-based guards
   - Add refresh token mechanism

2. **Additional Features**
   - Review/Rating system for mentors
   - Email notifications for requests
   - File upload for profile pictures
   - Real-time chat/messaging

3. **Enhancements**
   - Pagination for list endpoints
   - Full-text search
   - Analytics dashboard
   - Calendar integration

4. **Testing**
   - Unit tests
   - Integration tests
   - E2E tests

## Documentation

For detailed documentation, see the `docs/` folder:
- **API_DOCUMENTATION.md** - Complete API reference with all endpoints
- **PROJECT_OVERVIEW.md** - Comprehensive project structure and features
- **ARCHITECTURE.md** - System architecture diagrams and data flow
- **COMPLETION_SUMMARY.md** - What was built and delivered
- **SEED_DATA_UPDATED.md** - Reference data matching frontend

## License

ISC

## Support

For questions or issues, please contact the development team.

