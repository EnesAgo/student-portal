# Database Seeder Guide

The database seeder creates realistic dummy data for development and testing purposes.

## Overview

**File**: `scripts/seed-database.js`  
**Command**: `npm run seed:db`

Unlike the test suite (`scripts/test-api.js`) which cleans up after itself, the seeder creates **persistent data** that remains in your database for development use.

## What Gets Created

### Users (5 total)

1. **Emma Johnson** - Regular Student
   - Email: `emma.johnson@stu.uni-munich.de`
   - Password: `password123`
   - Role: Student
   - Not a mentor

2. **Sarah Chen** - Student & Mentor
   - Email: `sarah.chen@stu.uni-munich.de`
   - Password: `password123`
   - Role: Student
   - isMentor: true
   - Has complete mentor profile (Software Engineering)

3. **Mehmet Yılmaz** - Student & Mentor
   - Email: `mehmet.yilmaz@stu.uni-munich.de`
   - Password: `password123`
   - Role: Student
   - isMentor: true
   - Has complete mentor profile (Cyber Security)

4. **Alex Rodriguez** - Regular Student
   - Email: `alex.rodriguez@stu.uni-munich.de`
   - Password: `password123`
   - Role: Student
   - Not a mentor

5. **Admin User** - Administrator
   - Email: `admin@uni-munich.de`
   - Password: `adminpass123`
   - Role: Admin

### Mentor Profiles (2 total)

#### 1. Sarah Chen - Software Engineering Mentor
```javascript
{
  bio: "5th semester Software Engineering student from Germany",
  languages: ["English", "German"],
  country: "Germany",
  flag: "🇩🇪",
  majors: ["Software Engineering"],
  interests: ["Academic Support", "Career Guidance", "Social Integration"],
  semester: 5,
  yearOfStudy: "5th Semester",
  isAvailable: true,
  maxMentees: 5,
  // Full optional fields included (about, academicBackground, etc.)
}
```

#### 2. Mehmet Yılmaz - Cyber Security Mentor
```javascript
{
  bio: "6th semester Cyber Security student from Turkey",
  languages: ["Turkish", "English", "German"],
  country: "Turkey",
  flag: "🇹🇷",
  majors: ["Cyber Security"],
  interests: ["Academic Support", "Career Guidance"],
  semester: 6,
  yearOfStudy: "6th Semester",
  isAvailable: true,
  maxMentees: 4,
  // Full optional fields included
}
```

### Mentorship Requests (3 total)

1. **Emma → Sarah** (Status: Pending)
   - Student requests mentorship from Sarah
   - Status: pending

2. **Alex → Mehmet** (Status: Pending)
   - Student requests mentorship from Mehmet
   - Status: pending

3. **Emma → Mehmet** (Status: Accepted)
   - Student requests mentorship from Mehmet
   - Status: accepted
   - Includes response message

### Reference Data

- **Languages**: 10 items (German, English, Turkish, etc.)
- **Countries**: 8 items (Germany, Turkey, Uganda, etc.)
- **Majors**: 4 items (Software Engineering, Cyber Security, etc.)

## Usage

### Prerequisites

1. **MongoDB** must be running
2. **Backend server** must be running

### Run the Seeder

```bash
# Terminal 1: Start backend
npm run start:dev

# Terminal 2: Run seeder
npm run seed:db
```

### Expected Output

```
╔════════════════════════════════════════════════════════╗
║   Student Portal Backend - Database Seeder             ║
║   Creates realistic dummy data for development         ║
╚════════════════════════════════════════════════════════╝

━━━ Step 1: Seeding Reference Data ━━━

✅ Seed Languages (10 items)
✅ Seed Countries (8 items)
✅ Seed Majors (4 items)

━━━ Step 2: Creating Users ━━━

✅ Create Student 1: Emma Johnson
   ID: 507f1f77bcf86cd799439011

... (continues for all steps)

╔════════════════════════════════════════════════════════╗
║   Database Seeding Completed!                          ║
╚════════════════════════════════════════════════════════╝

📊 Summary of Created Data:
─────────────────────────────────────────────────────────

👥 Users Created (5):
   - Emma Johnson (Student) - ID: 507f...
   - Sarah Chen (Student/Mentor) - ID: 507f...
   - Mehmet Yılmaz (Student/Mentor) - ID: 507f...
   - Alex Rodriguez (Student) - ID: 507f...
   - Admin User - ID: 507f...

🎓 Mentors Created (2):
   - Sarah Chen (Software Engineering) - ID: 507f...
   - Mehmet Yılmaz (Cyber Security) - ID: 507f...

📨 Mentorship Requests Created (3):
   - Emma → Sarah (Pending) - ID: 507f...
   - Alex → Mehmet (Pending) - ID: 507f...
   - Emma → Mehmet (Accepted) - ID: 507f...

📚 Reference Data:
   - 10 Languages seeded
   - 8 Countries seeded
   - 4 Majors seeded

✅ Your database is now populated with realistic dummy data!

📝 Test Accounts:
   Student: emma.johnson@student.edu / password123
   Mentor: sarah.chen@student.edu / password123
   Admin: admin@university.edu / adminpass123
```

## What the Seeder Tests

After creating data, the seeder also tests these endpoints:

1. `GET /users` - Get all users
2. `GET /users/mentors` - Get users who are mentors
3. `GET /mentors` - Get all mentors
4. `GET /mentors?languages=English` - Filter by language
5. `GET /mentors?country=Germany` - Filter by country
6. `GET /mentors?majors=Cyber Security` - Filter by major
7. `GET /mentorship-requests` - Get all requests
8. `GET /mentorship-requests/mentor/:id/pending` - Get pending requests
9. `GET /mentorship-requests/student/:id` - Get requests by student
10. `PATCH /mentors/:id/rating` - Update mentor rating
11. `GET /languages` - Get all languages
12. `GET /countries` - Get all countries
13. `GET /majors` - Get all majors

## Use Cases

### 1. Initial Development Setup
```bash
# Fresh database? Seed it first!
npm run seed:db
```

### 2. Frontend Development
- Use seeded data to develop frontend features
- Test with realistic user accounts
- No need to manually create data

### 3. Manual Testing
- Login with seeded accounts
- Test user flows
- Verify UI with real data

### 4. Demo/Presentation
- Quick setup for demos
- Consistent data every time
- Professional-looking sample data

### 5. Backend Development
- Test new features with existing data
- Verify API responses
- Debug with known data

## Differences from Test Suite

| Feature | scripts/test-api.js | scripts/seed-database.js |
|---------|-------------|------------------|
| **Purpose** | Automated testing | Development data |
| **Data persistence** | Deleted after tests | Permanent |
| **Number of items** | Minimal for testing | More realistic |
| **Test coverage** | 35 tests, all CRUD | 13 GET tests only |
| **Use case** | CI/CD, validation | Development, demo |
| **Run frequency** | Every commit | Once per setup |

## Clearing Seeded Data

### Option 1: MongoDB Compass or CLI
```bash
# Drop entire database
mongosh
use student-portal
db.dropDatabase()
```

### Option 2: Use DELETE endpoints
```bash
# Delete specific items via API
curl -X DELETE http://localhost:3001/users/{id}
curl -X DELETE http://localhost:3001/mentors/{id}
curl -X DELETE http://localhost:3001/mentorship-requests/{id}
```

### Option 3: Re-seed
The seeder handles duplicates gracefully:
- Reference data won't duplicate (uses unique constraints)
- Users with same email will fail (shows error but continues)
- You can manually delete users then re-run seeder

## Customization

### Adding More Users

Edit `scripts/seed-database.js` and add:

```javascript
const userResult = await makeRequest('POST', '/users', {
  firstName: 'Your',
  lastName: 'Name',
  email: 'your.email@student.edu',
  password: 'password123',
  role: 'student',
}, 'Create Your User');
if (userResult.success) createdUserIds.yourUser = userResult.data._id;
```

### Adding More Mentors

```javascript
if (createdUserIds.yourUser) {
  const mentorResult = await makeRequest('POST', '/mentors', {
    userId: createdUserIds.yourUser,
    bio: 'Your bio here',
    languages: ['English'],
    country: 'Your Country',
    // ... other fields
  }, 'Create Your Mentor');
}
```

### Changing Test Accounts

Edit the user creation section with your preferred emails and passwords.

## Troubleshooting

### "User already exists" Error
- Users with duplicate emails will fail
- Either use different emails or delete existing users first
- The seeder continues despite errors

### "Connection Refused"
- Backend server not running
- Start with: `npm run start:dev`

### "MongoDB Error"
- MongoDB not running
- Start MongoDB before seeding

### Partial Seeding
- Some items created but not all
- Check errors in output
- Some data may already exist
- You can re-run the seeder

## Best Practices

1. **Run once per environment** - Not needed repeatedly
2. **Use for development** - Not for production!
3. **Document custom data** - If you modify the seeder
4. **Keep passwords simple** - For development only
5. **Commit changes** - If you customize for your team

## Integration with Workflow

```bash
# Typical workflow for new developers

# 1. Clone repo
git clone <repo-url>

# 2. Install dependencies
cd backend
npm install

# 3. Start MongoDB
mongod

# 4. Start backend
npm run start:dev

# 5. Seed database (in another terminal)
npm run seed:db

# 6. Start developing!
```

## Summary

✅ **Persistent data** - Not deleted automatically  
✅ **Realistic users** - Complete profiles with all fields  
✅ **Test accounts** - Ready to use for login  
✅ **Multiple scenarios** - Pending/accepted requests  
✅ **Reference data** - All lookups populated  
✅ **Quick setup** - One command to populate DB  
✅ **Customizable** - Easy to add more data  
✅ **Development-friendly** - Designed for daily use  

Perfect for getting your development environment ready quickly! 🚀

