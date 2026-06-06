# Student Portal Backend Documentation

## Overview

NestJS backend for a university student mentoring portal. Built with TypeScript, MongoDB (Mongoose), and class-validator for input validation. The API runs on port `3001` by default.

**Tech Stack**: NestJS 11, Mongoose 9, bcrypt, class-validator, Joi (env validation)

---

## Modules

```
AppModule
├── UsersModule          (exports UsersService)
├── MentorsModule        (imports UsersModule)
├── MentorshipRequestsModule
├── LanguagesModule
├── CountriesModule
└── MajorsModule
```

---

## Schemas

### User (`users` collection)

| Field          | Type    | Required | Notes                                                  |
|----------------|---------|----------|--------------------------------------------------------|
| firstName      | String  | Yes      |                                                        |
| lastName       | String  | Yes      |                                                        |
| email          | String  | Yes      | Unique, indexed. Must match `@(stu.)?uni-munich.de`    |
| password       | String  | Yes      | Hashed with bcrypt (10 rounds)                         |
| role           | Enum    | Yes      | `student` (default), `draftStudent`, `pendingStudent`, `admin` |
| studentId      | String  | No       |                                                        |
| phoneNumber    | String  | No       |                                                        |
| profilePicture | String  | No       |                                                        |
| isActive       | Boolean | No       | Default: `true`                                        |
| lastLogin      | Date    | No       |                                                        |

Indexes: `email`, `role`. Timestamps enabled.

---

### Mentor (`mentors` collection)

| Field              | Type                | Required | Notes                              |
|--------------------|---------------------|----------|------------------------------------|
| userId             | ObjectId (ref User) | Yes      | Unique, indexed                    |
| bio                | String              | Yes      |                                    |
| languages          | String[]            | No       | Default: `[]`                      |
| country            | String              | No       |                                    |
| flag               | String              | No       | Country flag code                  |
| majors             | String[]            | No       | Default: `[]`                      |
| interests          | String[]            | No       | Default: `[]`                      |
| semester           | Number              | No       |                                    |
| yearOfStudy        | String              | No       |                                    |
| image              | String              | No       |                                    |
| email              | String              | No       |                                    |
| rating             | Number              | No       | Default: `0`                       |
| totalRatings       | Number              | No       | Default: `0`                       |
| isAvailable        | Boolean             | No       | Default: `true`                    |
| totalMentees       | Number              | No       | Default: `0`                       |
| maxMentees         | Number              | No       | Default: `5`                       |
| linkedIn           | String              | No       |                                    |
| instagram          | String              | No       |                                    |
| about              | String[]            | No       |                                    |
| academicBackground | Object              | No       | `{ major, currentSemester, focusAreas, experience }` |
| personalInfo       | Object              | No       | `{ languages, nationality, hobbies }` |
| mentorshipFocus    | Object              | No       | `{ whoCanHelp, topics[] }`         |

Indexes: `userId`, `isAvailable`, `languages`, `country`, `majors`. Timestamps enabled.

---

### MentorshipRequest (`mentorshiprequests` collection)

| Field           | Type                  | Required | Notes                                          |
|-----------------|-----------------------|----------|-------------------------------------------------|
| studentId       | ObjectId (ref User)   | Yes      | Indexed                                         |
| mentorId        | ObjectId (ref Mentor) | Yes      | Indexed                                         |
| message         | String                | Yes      | Student's request message                       |
| status          | Enum                  | Yes      | `pending` (default), `accepted`, `rejected`, `cancelled` |
| responseMessage | String                | No       | Mentor's response                               |
| respondedAt     | Date                  | No       | Auto-set on status change                       |

Indexes: `studentId`, `mentorId`, `status`, `createdAt` (desc). Timestamps enabled.

---

### Language (`languages` collection)

| Field    | Type    | Required | Notes           |
|----------|---------|----------|-----------------|
| code     | String  | Yes      | Unique (e.g. "en") |
| name     | String  | Yes      |                 |
| isActive | Boolean | No       | Default: `true` |

---

### Country (`countries` collection)

| Field    | Type    | Required | Notes           |
|----------|---------|----------|-----------------|
| code     | String  | Yes      | Unique (e.g. "DE") |
| name     | String  | Yes      |                 |
| isActive | Boolean | No       | Default: `true` |

---

### Major (`majors` collection)

| Field      | Type    | Required | Notes           |
|------------|---------|----------|-----------------|
| name       | String  | Yes      | Unique          |
| department | String  | No       |                 |
| isActive   | Boolean | No       | Default: `true` |

---

## API Routes

### Users (`/users`)

| Method | Endpoint        | Body / Params       | Description                          |
|--------|-----------------|---------------------|--------------------------------------|
| POST   | `/users`        | CreateUserDto       | Create a new user (password hashed)  |
| GET    | `/users`        | —                   | Get all users (password excluded)    |
| GET    | `/users/mentors` | —                  | Get all users who have mentor profiles |
| GET    | `/users/:id`    | `id`                | Get user by ID                       |
| PATCH  | `/users/:id`    | UpdateUserDto       | Update user                          |
| DELETE | `/users/:id`    | `id`                | Delete user (204)                    |

**CreateUserDto**:
```json
{
  "firstName": "string (required)",
  "lastName": "string (required)",
  "email": "string (required, must be @(stu.)uni-munich.de)",
  "password": "string (required, min 6 chars)",
  "role": "student | draftStudent | pendingStudent | admin (optional)",
  "studentId": "string (optional, alphanumeric)",
  "phoneNumber": "string (optional)",
  "profilePicture": "string (optional)"
}
```

---

### Mentors (`/mentors`)

| Method | Endpoint                  | Body / Params / Query        | Description                              |
|--------|---------------------------|------------------------------|------------------------------------------|
| POST   | `/mentors`                | CreateMentorDto              | Create mentor profile                    |
| POST   | `/mentors/seed`           | `{ adminPassword: "admin" }` | Seed 4 default mentors                  |
| GET    | `/mentors`                | Query filters (see below)    | Get all mentors (filterable)             |
| GET    | `/mentors/:id`            | `id`                         | Get mentor by ID                         |
| GET    | `/mentors/user/:userId`   | `userId`                     | Get mentor by user ID                    |
| PATCH  | `/mentors/:id`            | UpdateMentorDto              | Update mentor profile                    |
| PATCH  | `/mentors/:id/rating`     | `{ rating: number }`        | Update mentor rating (running average)   |
| DELETE | `/mentors/:id`            | `id`                         | Delete mentor (204)                      |

**Query filters for `GET /mentors`**:
- `languages=English,German` (comma-separated)
- `country=Germany`
- `majors=Software%20Engineering` (comma-separated)
- `interests=Academic%20Support` (comma-separated)
- `isAvailable=true`

**CreateMentorDto**:
```json
{
  "userId": "string (required, User ObjectId)",
  "bio": "string (required)",
  "languages": ["string"] ,
  "country": "string (required)",
  "flag": "string (optional)",
  "majors": ["string"],
  "interests": ["string (optional)"],
  "semester": "number (optional)",
  "yearOfStudy": "string (required)",
  "image": "string (optional)",
  "email": "string (optional)",
  "maxMentees": "number (optional, 1-20)",
  "linkedIn": "string (optional)",
  "instagram": "string (optional)",
  "about": ["string (optional)"],
  "academicBackground": { "major": "", "currentSemester": 0, "focusAreas": "", "experience": "" },
  "personalInfo": { "languages": "", "nationality": "", "hobbies": "" },
  "mentorshipFocus": { "whoCanHelp": "", "topics": [] }
}
```

---

### Mentorship Requests (`/mentorship-requests`)

| Method | Endpoint                                      | Body / Params              | Description                        |
|--------|-----------------------------------------------|----------------------------|------------------------------------|
| POST   | `/mentorship-requests`                        | CreateMentorshipRequestDto | Create a mentorship request        |
| GET    | `/mentorship-requests`                        | —                          | Get all requests (newest first)    |
| GET    | `/mentorship-requests/:id`                    | `id`                       | Get request by ID                  |
| GET    | `/mentorship-requests/student/:studentId`     | `studentId`                | Get requests by student            |
| GET    | `/mentorship-requests/mentor/:mentorId`       | `mentorId`                 | Get requests by mentor             |
| GET    | `/mentorship-requests/mentor/:mentorId/pending` | `mentorId`              | Get pending requests for a mentor  |
| PATCH  | `/mentorship-requests/:id`                    | UpdateMentorshipRequestDto | Accept/reject/cancel request       |
| DELETE | `/mentorship-requests/:id`                    | `id`                       | Delete request (204)               |

**CreateMentorshipRequestDto**:
```json
{
  "studentId": "string (required, User ObjectId)",
  "mentorId": "string (required, Mentor ObjectId)",
  "message": "string (required)"
}
```

**UpdateMentorshipRequestDto**:
```json
{
  "status": "pending | accepted | rejected | cancelled (optional)",
  "responseMessage": "string (optional)"
}
```

---

### Languages (`/languages`)

| Method | Endpoint          | Body                    | Description                     |
|--------|-------------------|-------------------------|---------------------------------|
| POST   | `/languages`      | `{ code, name }`       | Create language                 |
| POST   | `/languages/seed` | —                       | Seed 10 default languages       |
| GET    | `/languages`      | —                       | Get all active languages (A-Z)  |
| GET    | `/languages/:id`  | `id`                    | Get language by ID              |
| DELETE | `/languages/:id`  | `id`                    | Delete language (204)           |

---

### Countries (`/countries`)

| Method | Endpoint           | Body                    | Description                     |
|--------|--------------------|-------------------------|---------------------------------|
| POST   | `/countries`       | `{ code, name }`       | Create country                  |
| POST   | `/countries/seed`  | —                       | Seed 8 default countries        |
| GET    | `/countries`       | —                       | Get all active countries (A-Z)  |
| GET    | `/countries/:id`   | `id`                    | Get country by ID               |
| DELETE | `/countries/:id`   | `id`                    | Delete country (204)            |

---

### Majors (`/majors`)

| Method | Endpoint        | Body                         | Description                  |
|--------|-----------------|------------------------------|------------------------------|
| POST   | `/majors`       | `{ name, department? }`     | Create major                 |
| POST   | `/majors/seed`  | —                            | Seed 4 default majors        |
| GET    | `/majors`       | —                            | Get all active majors (A-Z)  |
| GET    | `/majors/:id`   | `id`                         | Get major by ID              |
| DELETE | `/majors/:id`   | `id`                         | Delete major (204)           |

---

## Entity Relationships

```
User (1) ──── (0..1) Mentor
  │                    │
  │ studentId          │ mentorId
  └──── MentorshipRequest ────┘
```

- A **User** can optionally have one **Mentor** profile (linked via `userId`)
- A **MentorshipRequest** links a student (User) to a Mentor
- **Languages**, **Countries**, **Majors** are reference data collections

---

## Configuration

Environment variables (`.env`):

| Variable       | Default                                    | Description              |
|----------------|--------------------------------------------|--------------------------|
| PORT           | 3001                                       | Server port              |
| MONGODB_URI    | mongodb://localhost:27017/student-portal    | MongoDB connection       |
| JWT_SECRET     | —                                          | JWT signing key          |
| JWT_EXPIRATION | 7d                                         | Token expiration         |
| CORS_ORIGIN    | http://localhost:3000                       | Allowed CORS origin      |
| NODE_ENV       | development                                | Environment              |

---

## Global Middleware

- **ValidationPipe**: Whitelist + transform + forbid non-whitelisted properties
- **LoggingInterceptor**: Logs method, URL, status code, and execution time
- **AllExceptionsFilter**: Returns `{ statusCode, timestamp, message }` for all errors
- **CORS**: Enabled with configurable origin

---

## Auth Status

Currently **not enforced**. Decorators `@Public()` and `@Roles()` exist but no guards are wired up. JWT config is present in environment but no auth module is implemented yet.

---

## Seeding

**Script**: `npm run seed:db` (runs `scripts/seed-database.js`)

Seeds reference data (languages, countries, majors), 5 users, 4 mentor profiles, and sample mentorship requests. The script is idempotent — it checks for existing data before creating.

**In-app seed endpoints**:
- `POST /languages/seed` — 10 languages
- `POST /countries/seed` — 8 countries
- `POST /majors/seed` — 4 engineering majors
- `POST /mentors/seed` — 4 mentors (requires `{ adminPassword: "admin" }`)
