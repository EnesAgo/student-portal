# MongoDB Schemas as JSON

Complete MongoDB schema examples for all collections in the Student Portal backend.

---

## 1. Users Collection

```json
{
  "_id": "507f1f77bcf86cd799439011",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@stu.uni-munich.de",
  "password": "$2b$10$hashedPasswordHere",
  "role": "student",
  "isMentor": false,
  "studentId": "507f1f77bcf86cd799439099",
  "phoneNumber": "+1234567890",
  "profilePicture": "https://example.com/avatars/john.jpg",
  "isActive": true,
  "lastLogin": "2026-02-14T10:30:00.000Z",
  "createdAt": "2026-01-15T08:00:00.000Z",
  "updatedAt": "2026-02-14T10:30:00.000Z"
}
```

**Schema Details:**
- `_id`: ObjectId (auto-generated)
- `firstName`: String (required)
- `lastName`: String (required)
- `email`: String (required, unique, indexed)
- `password`: String (required, hashed with bcrypt)
- `role`: Enum ["student", "admin"] (required, default: "student", indexed)
- `isMentor`: Boolean (default: false, indexed)
- `studentId`: ObjectId (optional)
- `phoneNumber`: String (optional)
- `profilePicture`: String (optional)
- `isActive`: Boolean (default: true)
- `lastLogin`: Date (optional)
- `createdAt`: Date (auto-generated)
- `updatedAt`: Date (auto-generated)

**Indexes:**
- `{ email: 1 }` - Unique
- `{ role: 1 }`
- `{ isMentor: 1 }`

---

## 2. Mentors Collection

```json
{
  "_id": "507f1f77bcf86cd799439022",
  "userId": "507f1f77bcf86cd799439011",
  "bio": "International student from Germany. Happy to help with academic transition, coding projects, and campus life.",
  "languages": ["English", "German"],
  "country": "Germany",
  "flag": "🇩🇪",
  "majors": ["Software Engineering"],
  "interests": ["Academic Support", "Career Guidance", "Social Integration"],
  "semester": 5,
  "yearOfStudy": "5th Semester",
  "image": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
  "email": "sarah.chen@stu.uni-munich.de",
  "rating": 4.9,
  "totalRatings": 47,
  "isAvailable": true,
  "totalMentees": 4,
  "maxMentees": 5,
  "linkedIn": "https://linkedin.com/in/sarahchen",
  "instagram": "@sarah_codes",
  "about": [
    "Hi! I'm Sarah, an international student from Germany currently in my fifth semester studying Software Engineering.",
    "I'm passionate about coding, problem-solving, and building connections across cultures."
  ],
  "academicBackground": {
    "major": "Software Engineering",
    "currentSemester": 5,
    "focusAreas": "Software Development, Web Applications, Cloud Computing",
    "experience": "Teaching Assistant for Intro to Programming, Member of Coding Club"
  },
  "personalInfo": {
    "languages": "English (Fluent), German (Native)",
    "nationality": "Germany",
    "hobbies": "Photography, Hiking, Coffee tasting, Reading tech blogs"
  },
  "mentorshipFocus": {
    "whoCanHelp": "First-year students, international students, students in Software Engineering or related majors",
    "topics": [
      "Academic transition and study strategies",
      "Programming help and coding projects",
      "Navigating campus resources",
      "Cultural adjustment and making friends"
    ]
  },
  "createdAt": "2025-10-15T10:00:00.000Z",
  "updatedAt": "2026-02-14T09:30:00.000Z"
}
```

**Schema Details:**
- `_id`: ObjectId (auto-generated)
- `userId`: ObjectId (required, unique, references User collection, indexed)
- `bio`: String (required)
- `languages`: Array of Strings (default: [])
- `country`: String
- `flag`: String (emoji flag)
- `majors`: Array of Strings (default: [])
- `interests`: Array of Strings (default: [])
- `semester`: Number
- `yearOfStudy`: String
- `image`: String (profile image URL)
- `email`: String
- `rating`: Number (default: 0, range: 0-5)
- `totalRatings`: Number (default: 0)
- `isAvailable`: Boolean (default: true, indexed)
- `totalMentees`: Number (default: 0)
- `maxMentees`: Number (default: 5)
- `linkedIn`: String (optional)
- `instagram`: String (optional)
- `about`: Array of Strings (optional - detailed bio paragraphs)
- `academicBackground`: Object (optional - academic details)
- `personalInfo`: Object (optional - personal information)
- `mentorshipFocus`: Object (optional - mentoring areas)
- `createdAt`: Date (auto-generated)
- `updatedAt`: Date (auto-generated)

**Indexes:**
- `{ userId: 1 }` - Unique
- `{ isAvailable: 1 }`
- `{ languages: 1 }`
- `{ country: 1 }`
- `{ majors: 1 }`

---

## 3. Mentorship Requests Collection

```json
{
  "_id": "507f1f77bcf86cd799439033",
  "studentId": "507f1f77bcf86cd799439011",
  "mentorId": "507f1f77bcf86cd799439022",
  "message": "Hi! I'm a first-year student from Turkey and I'd love to connect with you. I need help adjusting to university life and would appreciate your guidance on academic matters.",
  "status": "accepted",
  "responseMessage": "Hi! I'd be happy to help. Looking forward to meeting you!",
  "respondedAt": "2026-02-14T12:00:00.000Z",
  "createdAt": "2026-02-13T10:00:00.000Z",
  "updatedAt": "2026-02-14T12:00:00.000Z"
}
```

**Schema Details:**
- `_id`: ObjectId (auto-generated)
- `studentId`: ObjectId (required, references User collection, indexed)
- `mentorId`: ObjectId (required, references Mentor collection, indexed)
- `message`: String (required)
- `status`: Enum ["pending", "accepted", "rejected", "cancelled"] (required, default: "pending", indexed)
- `responseMessage`: String (optional)
- `respondedAt`: Date (optional)
- `createdAt`: Date (auto-generated, indexed descending)
- `updatedAt`: Date (auto-generated)

**Indexes:**
- `{ studentId: 1 }`
- `{ mentorId: 1 }`
- `{ status: 1 }`
- `{ createdAt: -1 }`

---

## 4. Languages Collection (Reference Data)

```json
{
  "_id": "507f1f77bcf86cd799439044",
  "code": "en",
  "name": "English",
  "isActive": true,
  "createdAt": "2026-01-10T00:00:00.000Z",
  "updatedAt": "2026-01-10T00:00:00.000Z"
}
```

**Schema Details:**
- `_id`: ObjectId (auto-generated)
- `code`: String (required, unique, indexed) - ISO language code
- `name`: String (required, indexed)
- `isActive`: Boolean (default: true)
- `createdAt`: Date (auto-generated)
- `updatedAt`: Date (auto-generated)

**Indexes:**
- `{ code: 1 }` - Unique
- `{ name: 1 }`

**Seeded Data (10 languages):**
```json
[
  { "code": "de", "name": "German" },
  { "code": "en", "name": "English" },
  { "code": "tr", "name": "Turkish" },
  { "code": "ro", "name": "Romanian" },
  { "code": "ru", "name": "Russian" },
  { "code": "it", "name": "Italian" },
  { "code": "mk", "name": "Macedonian" },
  { "code": "sq", "name": "Albanian" },
  { "code": "lv", "name": "Latvian" },
  { "code": "lg", "name": "Luganda" }
]
```

---

## 5. Countries Collection (Reference Data)

```json
{
  "_id": "507f1f77bcf86cd799439055",
  "code": "DE",
  "name": "Germany",
  "isActive": true,
  "createdAt": "2026-01-10T00:00:00.000Z",
  "updatedAt": "2026-01-10T00:00:00.000Z"
}
```

**Schema Details:**
- `_id`: ObjectId (auto-generated)
- `code`: String (required, unique, indexed) - ISO country code
- `name`: String (required, indexed)
- `isActive`: Boolean (default: true)
- `createdAt`: Date (auto-generated)
- `updatedAt`: Date (auto-generated)

**Indexes:**
- `{ code: 1 }` - Unique
- `{ name: 1 }`

**Seeded Data (8 countries):**
```json
[
  { "code": "DE", "name": "Germany" },
  { "code": "TR", "name": "Turkey" },
  { "code": "UG", "name": "Uganda" },
  { "code": "IT", "name": "Italy" },
  { "code": "RO", "name": "Romania" },
  { "code": "LV", "name": "Latvia" },
  { "code": "AL", "name": "Albania" },
  { "code": "MK", "name": "North Macedonia" }
]
```

---

## 6. Majors Collection (Reference Data)

```json
{
  "_id": "507f1f77bcf86cd799439066",
  "name": "Software Engineering",
  "department": "Engineering",
  "isActive": true,
  "createdAt": "2026-01-10T00:00:00.000Z",
  "updatedAt": "2026-01-10T00:00:00.000Z"
}
```

**Schema Details:**
- `_id`: ObjectId (auto-generated)
- `name`: String (required, unique, indexed)
- `department`: String (optional, indexed)
- `isActive`: Boolean (default: true)
- `createdAt`: Date (auto-generated)
- `updatedAt`: Date (auto-generated)

**Indexes:**
- `{ name: 1 }` - Unique
- `{ department: 1 }`

**Seeded Data (4 majors):**
```json
[
  { "name": "Software Engineering", "department": "Engineering" },
  { "name": "Cyber Security", "department": "Engineering" },
  { "name": "Data Science And AI", "department": "Engineering" },
  { "name": "Digital Industrial Engineering", "department": "Engineering" }
]
```

---

## Complete Example: Student with Mentor Profile

### User Document
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "firstName": "Sarah",
  "lastName": "Chen",
  "email": "sarah.chen@stu.uni-munich.de",
  "password": "$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhbO",
  "role": "student",
  "isMentor": true,
  "studentId": "507f1f77bcf86cd799439099",
  "phoneNumber": "+491234567890",
  "profilePicture": "https://example.com/avatars/sarah.jpg",
  "isActive": true,
  "lastLogin": "2026-02-14T14:25:00.000Z",
  "createdAt": "2025-09-01T08:00:00.000Z",
  "updatedAt": "2026-02-14T14:25:00.000Z"
}
```

### Mentor Profile Document
```json
{
  "_id": "507f1f77bcf86cd799439022",
  "userId": "507f1f77bcf86cd799439011",
  "bio": "International student from Germany. Happy to help with academic transition, coding projects, and campus life.",
  "languages": ["English", "German"],
  "country": "Germany",
  "flag": "🇩🇪",
  "majors": ["Software Engineering"],
  "interests": ["Academic Support", "Career Guidance"],
  "semester": 5,
  "yearOfStudy": "5th Semester",
  "image": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
  "email": "sarah.chen@stu.uni-munich.de",
  "rating": 4.9,
  "totalRatings": 47,
  "isAvailable": true,
  "totalMentees": 4,
  "maxMentees": 5,
  "linkedIn": "https://linkedin.com/in/sarahchen",
  "instagram": "@sarah_codes",
  "about": [
    "Hi! I'm Sarah, an international student from Germany currently in my fifth semester studying Software Engineering.",
    "I'm passionate about coding, problem-solving, and building connections across cultures."
  ],
  "academicBackground": {
    "major": "Software Engineering",
    "currentSemester": 5,
    "focusAreas": "Software Development, Web Applications, Cloud Computing",
    "experience": "Teaching Assistant for Intro to Programming, Member of Coding Club"
  },
  "personalInfo": {
    "languages": "English (Fluent), German (Native)",
    "nationality": "Germany",
    "hobbies": "Photography, Hiking, Coffee tasting, Reading tech blogs"
  },
  "mentorshipFocus": {
    "whoCanHelp": "First-year students, international students, students in Software Engineering or related majors",
    "topics": [
      "Academic transition and study strategies",
      "Programming help and coding projects",
      "Navigating campus resources",
      "Cultural adjustment and making friends"
    ]
  },
  "createdAt": "2025-10-15T10:00:00.000Z",
  "updatedAt": "2026-02-14T09:30:00.000Z"
}
```

---

## Database Relationships

```
User (1) ←→ (0..1) Mentor
  ↓
  ├─→ (many) MentorshipRequests (as student)
  └─→ (many) MentorshipRequests (as mentor via Mentor)

Mentor (1) ←→ (many) MentorshipRequests

Languages, Countries, Majors ─→ Referenced as strings in Mentor
```

---

## Notes

- All collections have automatic `_id`, `createdAt`, and `updatedAt` fields
- ObjectId format: 24-character hexadecimal string
- Dates are stored as ISODate in MongoDB
- Passwords are hashed using bcrypt with salt rounds of 10
- Reference data collections are pre-seeded on application startup
- Rating is calculated as average and stored with one decimal precision
- `studentId` in User schema is stored as ObjectId (can reference another collection if needed)
- Mentor `availability` array removed - use `isAvailable` boolean flag instead
- Mentor optional fields: `about`, `academicBackground`, `personalInfo`, `mentorshipFocus` for detailed profiles
- MentorshipRequest `proposedMeetingTime` removed - connection is main focus

