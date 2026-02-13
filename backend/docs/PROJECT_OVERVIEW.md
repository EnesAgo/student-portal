# Student Portal Backend - Complete Overview

##What Has Been Created

A complete **NestJS REST API** backend with **MongoDB** integration for a Student Mentoring Portal platform.

---

## Collections Implemented

###1. Users Collection
- Student and admin user management
- Password hashing with bcrypt
- isMentor flag for students who become mentors
- Full CRUD operations

###2. Mentors Collection
- Extended profiles for student mentors
- Bio, languages, country, majors
- Interests (Academic Support, Career Guidance, Social Integration)
- Availability scheduling
- Rating system
- Max mentees limit
- Social media links (LinkedIn, Instagram)
- Advanced filtering by languages, country, majors, interests, availability

###3. Mentorship Requests Collection
- Request system for students to connect with mentors
- Status tracking (pending/accepted/rejected/cancelled)
- Proposed meeting times
- Response messages
- Filter by student, mentor, or status

###4. Mentoring Sessions Collection
- Schedule and track actual mentoring sessions
- Session status (scheduled/completed/cancelled)
- Duration, topic, location
- Meeting links for online sessions
- Notes for completed sessions
- Upcoming sessions query

###5. Languages Collection (Reference Data)
- Seeded with 12 common languages
- Used for mentor language filters

###6. Countries Collection (Reference Data)
- Seeded with 33+ countries
- Used for mentor location

###7. Majors Collection (Reference Data)
- Seeded with 28+ academic majors
- Organized by department
- Used for finding mentors in same field

---

## Project Structure

```
backend/
├── src/
│   ├── users/
│   │   ├── dto/
│   │   │   ├── create-user.dto.ts
│   │   │   └── update-user.dto.ts
│   │   ├── schemas/
│   │   │   └── user.schema.ts
│   │   ├── users.controller.ts
│   │   ├── users.service.ts
│   │   └── users.module.ts
│   │
│   ├── mentors/
│   │   ├── dto/
│   │   │   ├── create-mentor.dto.ts
│   │   │   └── update-mentor.dto.ts
│   │   ├── schemas/
│   │   │   └── mentor.schema.ts
│   │   ├── mentors.controller.ts
│   │   ├── mentors.service.ts
│   │   └── mentors.module.ts
│   │
│   ├── mentorship-requests/
│   │   ├── dto/
│   │   │   ├── create-mentorship-request.dto.ts
│   │   │   └── update-mentorship-request.dto.ts
│   │   ├── schemas/
│   │   │   └── mentorship-request.schema.ts
│   │   ├── mentorship-requests.controller.ts
│   │   ├── mentorship-requests.service.ts
│   │   └── mentorship-requests.module.ts
│   │
│   ├── mentoring-sessions/
│   │   ├── dto/
│   │   │   ├── create-mentoring-session.dto.ts
│   │   │   └── update-mentoring-session.dto.ts
│   │   ├── schemas/
│   │   │   └── mentoring-session.schema.ts
│   │   ├── mentoring-sessions.controller.ts
│   │   ├── mentoring-sessions.service.ts
│   │   └── mentoring-sessions.module.ts
│   │
│   ├── languages/
│   │   ├── schemas/
│   │   │   └── language.schema.ts
│   │   ├── languages.controller.ts
│   │   ├── languages.service.ts
│   │   └── languages.module.ts
│   │
│   ├── countries/
│   │   ├── schemas/
│   │   │   └── country.schema.ts
│   │   ├── countries.controller.ts
│   │   ├── countries.service.ts
│   │   └── countries.module.ts
│   │
│   ├── majors/
│   │   ├── schemas/
│   │   │   └── major.schema.ts
│   │   ├── majors.controller.ts
│   │   ├── majors.service.ts
│   │   └── majors.module.ts
│   │
│   ├── common/              # For future utilities
│   │   ├── guards/
│   │   ├── decorators/
│   │   ├── filters/
│   │   ├── interceptors/
│   │   └── pipes/
│   │
│   ├── config/              # For future config
│   ├── app.module.ts
│   └── main.ts
│
├── dist/                    # Compiled output
├── node_modules/
├── .env
├── .env.example
├── .gitignore
├── nest-cli.json
├── package.json
├── tsconfig.json
├── README.md
├── API_DOCUMENTATION.md
└── postman_collection.json
```

---

## Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (local or Docker)
- npm or yarn

### Installation

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Start MongoDB (if using Docker)
docker run -d -p 27017:27017 --name mongodb mongo:latest

# Or start local MongoDB
mongod
```

### Configuration

Edit `.env` file:
```env
MONGODB_URI=mongodb://localhost:27017/student-portal
PORT=3001
NODE_ENV=development
JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRATION=7d
```

### Run the Application

```bash
# Development mode (with hot-reload)
npm run start:dev

# Production build
npm run build
npm run start:prod

# Debug mode
npm run start:debug
```

Server will start at: `http://localhost:3001`

### Seed Initial Data

```bash
# Seed languages
curl -X POST http://localhost:3001/languages/seed

# Seed countries
curl -X POST http://localhost:3001/countries/seed

# Seed majors
curl -X POST http://localhost:3001/majors/seed
```

---

## API Endpoints Summary

### Users (7 endpoints)
- Create, read, update, delete users
- Get all users who are mentors
- Password hashing included

### Mentors (7 endpoints)
- Create, read, update, delete mentor profiles
- Advanced filtering (languages, country, majors, interests, availability)
- Rating system
- Get by user ID

### Mentorship Requests (8 endpoints)
- Create, read, update, delete requests
- Filter by student or mentor
- Get pending requests
- Accept/reject requests

### Mentoring Sessions (8 endpoints)
- Schedule, read, update, delete sessions
- Get upcoming sessions
- Filter by student or mentor
- Mark as completed

### Reference Data (9 endpoints)
- Languages, Countries, Majors
- CRUD operations
- Seed endpoints for initial data

**Total: 39 API endpoints**

---

## Key Features

### Security
Password hashing with bcrypt  
Input validation with class-validator  
Environment variables for sensitive data  
CORS enabled for frontend  

### Database
MongoDB with Mongoose ODM  
Schema definitions with TypeScript  
Indexes for performance  
Population for relationships  
Timestamps (createdAt, updatedAt)  

### API Design
RESTful endpoints  
Proper HTTP status codes  
Query parameter filtering  
DTO validation  
Error handling  

### Code Quality
TypeScript strict mode  
Modular architecture  
Separation of concerns  
Reusable services  
Clean code structure  

---

## Documentation Provided

1. **README.md** - Complete setup and usage guide
2. **API_DOCUMENTATION.md** - Detailed API reference
3. **postman_collection.json** - Import into Postman for testing
4. **This file** - Project overview

---

## Typical Workflow

1. **User Registration**: Student creates account via `POST /users`
2. **Become a Mentor**: User creates mentor profile via `POST /mentors`
3. **Search Mentors**: Students filter mentors via `GET /mentors?filters`
4. **Send Request**: Student sends request via `POST /mentorship-requests`
5. **Accept Request**: Mentor accepts via `PATCH /mentorship-requests/:id`
6. **Schedule Session**: Either party schedules via `POST /mentoring-sessions`
7. **Complete Session**: Mark session complete, add notes, rate mentor

---

##  Technologies Used

- **NestJS** - Progressive Node.js framework
- **TypeScript** - Type-safe JavaScript
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **class-validator** - DTO validation
- **class-transformer** - Object transformation
- **bcrypt** - Password hashing
- **@nestjs/config** - Configuration management

---

## Future Enhancements (Recommendations)

### Authentication & Authorization
- [ ] JWT authentication middleware
- [ ] Role-based guards (student/admin)
- [ ] Protected routes
- [ ] Refresh token mechanism

### Additional Features
- [ ] Review/Rating system for mentors
- [ ] Email notifications (NodeMailer)
- [ ] File upload (profile pictures)
- [ ] Real-time chat (Socket.io)
- [ ] Calendar integration
- [ ] Search with full-text indexing
- [ ] Pagination for list endpoints

### DevOps
- [ ] Docker containerization
- [ ] CI/CD pipeline
- [ ] Logging (Winston)
- [ ] Monitoring (Prometheus)
- [ ] API rate limiting

### Testing
- [ ] Unit tests (Jest)
- [ ] Integration tests
- [ ] E2E tests
- [ ] Test coverage reports

---

## Database Schema Relationships

```
User (1) ←→ (0..1) Mentor
  ↓
  ├─→ (many) MentorshipRequests (as student)
  ├─→ (many) MentorshipRequests (as mentor via Mentor)
  ├─→ (many) MentoringSessions (as student)
  └─→ (many) MentoringSessions (as mentor via Mentor)

Mentor (1) ←→ (many) MentorshipRequests
Mentor (1) ←→ (many) MentoringSessions

Languages, Countries, Majors are reference collections
```

---

## What Makes This Backend Great

1. **Complete Feature Set** - All essential mentoring platform features
2. **Scalable Architecture** - Modular NestJS structure
3. **Type Safety** - Full TypeScript implementation
4. **Data Validation** - Input validation at every endpoint
5. **Performance** - Database indexes for fast queries
6. **Filtering** - Advanced search capabilities
7. **Documentation** - Comprehensive docs and Postman collection
8. **Best Practices** - Follows NestJS and Node.js conventions
9. **Extensible** - Easy to add new features
10. **Production Ready** - With JWT and auth, ready to deploy

---

## Summary

You now have a **fully functional NestJS backend API** with:
-7 MongoDB collections
-39 REST API endpoints
-Complete CRUD operations
-Advanced filtering and search
-Seeded reference data
-Input validation
-Password security
-Comprehensive documentation
-Postman collection for testing
-Production-ready structure

**Next Step**: Add JWT authentication and connect your React frontend!

---

## Need Help?

Check these files:
- `README.md` - Setup instructions
- `API_DOCUMENTATION.md` - API reference
- Import `postman_collection.json` into Postman

Happy coding!

