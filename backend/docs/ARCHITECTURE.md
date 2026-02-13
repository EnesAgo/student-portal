# System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                         FRONTEND (React/Next.js)                     │
│                         http://localhost:3000                        │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             │ HTTP Requests
                             │ (JSON)
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    BACKEND API (NestJS)                              │
│                    http://localhost:3001                             │
│                                                                      │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │                    API Layer (Controllers)                     │  │
│  │                                                                │  │
│  │  /users          /mentors        /mentorship-requests         │  │
│  │  /languages      /countries      /majors                      │  │
│  │  /mentoring-sessions                                          │  │
│  └─────────────────────────┬─────────────────────────────────────┘  │
│                            │                                         │
│                            ▼                                         │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │              Business Logic (Services)                        │  │
│  │                                                                │  │
│  │  UsersService         MentorsService                          │  │
│  │  LanguagesService     CountriesService                        │  │
│  │  MajorsService        MentorshipRequestsService              │  │
│  │  MentoringSessionsService                                     │  │
│  └─────────────────────────┬─────────────────────────────────────┘  │
│                            │                                         │
│                            ▼                                         │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │                 Data Layer (Mongoose)                         │  │
│  │                                                                │  │
│  │  User Schema          Mentor Schema                           │  │
│  │  Language Schema      Country Schema                          │  │
│  │  Major Schema         MentorshipRequest Schema                │  │
│  │  MentoringSession Schema                                      │  │
│  └─────────────────────────┬─────────────────────────────────────┘  │
└────────────────────────────┼─────────────────────────────────────────┘
                             │
                             │ MongoDB Driver
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│                       DATABASE (MongoDB)                             │
│                    mongodb://localhost:27017                         │
│                                                                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────────┐  │
│  │    users     │  │   mentors    │  │  mentorshiprequests      │  │
│  └──────────────┘  └──────────────┘  └──────────────────────────┘  │
│                                                                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────────┐  │
│  │ mentoringsessions │ languages │  │       countries          │  │
│  └──────────────┘  └──────────────┘  └──────────────────────────┘  │
│                                                                      │
│  ┌──────────────┐                                                   │
│  │    majors    │                                                   │
│  └──────────────┘                                                   │
└─────────────────────────────────────────────────────────────────────┘


                        DATA FLOW EXAMPLE
                        ─────────────────

┌─────────────────────────────────────────────────────────────────────┐
│                    SEARCH FOR MENTORS                                │
└─────────────────────────────────────────────────────────────────────┘

1. Frontend Request:
   GET /mentors?languages=English,Spanish&country=Germany&isAvailable=true

2. Controller (mentors.controller.ts):
   ├─ Parse query parameters
   ├─ Call MentorsService.findAll(filters)
   └─ Return JSON response

3. Service (mentors.service.ts):
   ├─ Build MongoDB query with filters
   ├─ Apply population (join with User)
   ├─ Execute query
   └─ Return results

4. MongoDB:
   ├─ Use indexes for fast lookup
   ├─ Filter by languages (array contains)
   ├─ Filter by country (exact match)
   ├─ Filter by isAvailable (boolean)
   └─ Populate userId reference

5. Response:
   [{
     _id: "...",
     userId: { firstName: "John", lastName: "Doe", ... },
     bio: "...",
     languages: ["English", "Spanish"],
     country: "Germany",
     isAvailable: true,
     ...
   }]


                        CREATE MENTORSHIP REQUEST
                        ──────────────────────────

1. Frontend Request:
   POST /mentorship-requests
   {
     "studentId": "student_id_123",
     "mentorId": "mentor_id_456",
     "message": "Hi! I'd love to connect...",
     "proposedMeetingTime": "2026-02-20T14:00:00Z"
   }

2. Controller validates DTO (CreateMentorshipRequestDto)
   ├─ Check required fields
   ├─ Validate data types
   └─ Call service

3. Service creates record in MongoDB
   ├─ Convert IDs to ObjectId
   ├─ Set status to "pending"
   └─ Save to database

4. Response:
   {
     _id: "request_id_789",
     studentId: "student_id_123",
     mentorId: "mentor_id_456",
     message: "Hi! I'd love to connect...",
     status: "pending",
     proposedMeetingTime: "2026-02-20T14:00:00.000Z",
     createdAt: "2026-02-13T...",
     updatedAt: "2026-02-13T..."
   }


                        DATABASE RELATIONSHIPS
                        ──────────────────────

User ←─────────────────┐
  │                    │
  │ (1)                │ (ref)
  │                    │
  ▼                    │
Mentor                 │
  │                    │
  │ (many)             │
  │                    │
  ├──→ MentorshipRequests ──→ (ref) ─────┘
  │         │
  │         │ (ref to Student)
  │         └──→ User (as student)
  │
  └──→ MentoringSessions ──→ (ref to Student) ──→ User


Languages ─┐
Countries ─┼──→ Referenced in Mentor (as strings)
Majors ────┘


                        TECHNOLOGY STACK
                        ────────────────

┌─────────────────────────────────────────────────────────────────────┐
│  Layer              │  Technology         │  Purpose                │
├─────────────────────┼─────────────────────┼─────────────────────────┤
│  Runtime            │  Node.js            │  JavaScript runtime     │
│  Framework          │  NestJS             │  Backend framework      │
│  Language           │  TypeScript         │  Type safety            │
│  Database           │  MongoDB            │  NoSQL database         │
│  ODM                │  Mongoose           │  MongoDB object mapper  │
│  Validation         │  class-validator    │  DTO validation         │
│  Transformation     │  class-transformer  │  Object mapping         │
│  Security           │  bcrypt             │  Password hashing       │
│  Config             │  @nestjs/config     │  Environment vars       │
│  HTTP               │  Express            │  Web server             │
└─────────────────────────────────────────────────────────────────────┘


                        MODULE STRUCTURE
                        ────────────────

AppModule (Root)
│
├─── UsersModule
│    ├─── UsersController
│    ├─── UsersService
│    └─── User Schema
│
├─── MentorsModule
│    ├─── MentorsController
│    ├─── MentorsService
│    └─── Mentor Schema
│
├─── MentorshipRequestsModule
│    ├─── MentorshipRequestsController
│    ├─── MentorshipRequestsService
│    └─── MentorshipRequest Schema
│
├─── MentoringSessionsModule
│    ├─── MentoringSessionsController
│    ├─── MentoringSessionsService
│    └─── MentoringSession Schema
│
├─── LanguagesModule
│    ├─── LanguagesController
│    ├─── LanguagesService
│    └─── Language Schema
│
├─── CountriesModule
│    ├─── CountriesController
│    ├─── CountriesService
│    └─── Country Schema
│
└─── MajorsModule
     ├─── MajorsController
     ├─── MajorsService
     └─── Major Schema
```

