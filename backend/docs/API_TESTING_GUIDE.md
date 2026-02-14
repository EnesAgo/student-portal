# API Testing Guide

Complete API test suite for the Student Portal Backend.

## Test Script

The `scripts/test-api.js` script tests all 31 API endpoints in a logical sequence.

## Prerequisites

1. **MongoDB** must be running
2. **Backend server** must be running on `http://localhost:3001`

## Running the Tests

### Option 1: Using npm script (recommended)
```bash
npm run test:api
```

### Option 2: Direct execution
```bash
node test-api.js
```

## What Gets Tested

### Test Sequence (35 tests total)

#### 1. Reference Data Endpoints (6 tests)
- ✅ POST `/languages/seed` - Seed languages
- ✅ GET `/languages` - Get all languages
- ✅ POST `/countries/seed` - Seed countries
- ✅ GET `/countries` - Get all countries
- ✅ POST `/majors/seed` - Seed majors
- ✅ GET `/majors` - Get all majors

#### 2. User Endpoints (7 tests)
- ✅ POST `/users` - Create User 1 (Student)
- ✅ POST `/users` - Create User 2 (Future Mentor)
- ✅ POST `/users` - Create User 3 (Admin)
- ✅ GET `/users` - Get all users
- ✅ GET `/users/:id` - Get user by ID
- ✅ PATCH `/users/:id` - Update user (set isMentor)
- ✅ GET `/users/mentors` - Get users who are mentors

#### 3. Mentor Endpoints (10 tests)
- ✅ POST `/mentors` - Create mentor profile
- ✅ GET `/mentors` - Get all mentors
- ✅ GET `/mentors/:id` - Get mentor by ID
- ✅ GET `/mentors/user/:userId` - Get mentor by user ID
- ✅ GET `/mentors?languages=English` - Filter by language
- ✅ GET `/mentors?country=Germany` - Filter by country
- ✅ GET `/mentors?majors=Software Engineering` - Filter by major
- ✅ GET `/mentors?isAvailable=true` - Filter by availability
- ✅ PATCH `/mentors/:id` - Update mentor availability
- ✅ PATCH `/mentors/:id/rating` - Update mentor rating

#### 4. Mentorship Request Endpoints (9 tests)
- ✅ POST `/mentorship-requests` - Create request
- ✅ GET `/mentorship-requests` - Get all requests
- ✅ GET `/mentorship-requests/student/:studentId` - Get by student
- ✅ GET `/mentorship-requests/mentor/:mentorId` - Get by mentor
- ✅ GET `/mentorship-requests/mentor/:mentorId/pending` - Get pending
- ✅ GET `/mentorship-requests/:id` - Get by ID
- ✅ PATCH `/mentorship-requests/:id` - Accept request
- ✅ POST `/mentorship-requests` - Create request to reject
- ✅ PATCH `/mentorship-requests/:id` - Reject request

#### 5. Cleanup/Delete Endpoints (5 tests)
- ✅ DELETE `/mentorship-requests/:id` - Delete request
- ✅ DELETE `/mentors/:id` - Delete mentor
- ✅ DELETE `/users/:id` - Delete user 1
- ✅ DELETE `/users/:id` - Delete user 2
- ✅ DELETE `/users/:id` - Delete admin

## Test Data Created

### Users
```javascript
User 1 (Student):
  - Name: John Doe
  - Email: john.doe@student.edu
  - Role: student

User 2 (Mentor):
  - Name: Sarah Chen
  - Email: sarah.chen@student.edu
  - Role: student
  - isMentor: true

User 3 (Admin):
  - Name: Admin User
  - Email: admin@university.edu
  - Role: admin
```

### Mentor Profile
```javascript
Mentor (for User 2):
  - Bio: Full bio text
  - Languages: English, German
  - Country: Germany
  - Major: Software Engineering
  - Semester: 5
  - Full optional fields: about, academicBackground, personalInfo, mentorshipFocus
```

### Mentorship Requests
```javascript
Request 1: John → Sarah (Accepted)
Request 2: John → Sarah (Rejected then Deleted)
```

## Output Format

The test script provides clear output:

```
✅ PASS - Test Name
   Data: { response data }

❌ FAIL - Test Name
   Error: { error details }
```

## Test Features

1. **Automatic ID Tracking**: Created IDs are stored and reused in subsequent tests
2. **Complete Coverage**: Tests all CRUD operations
3. **Realistic Data**: Uses proper test data matching schema requirements
4. **Sequential Testing**: Tests run in logical order (create before read/update/delete)
5. **Cleanup**: Deletes all test data at the end
6. **Error Handling**: Catches and reports errors clearly

## Important Notes

### Before Running Tests:

1. **Start MongoDB**:
   ```bash
   mongod
   # or
   docker run -d -p 27017:27017 mongo
   ```

2. **Start Backend**:
   ```bash
   npm run start:dev
   ```

3. **Wait for server**: Ensure backend is fully started before running tests

### Database Impact:

- Tests will create data in your MongoDB
- All test data is deleted at the end
- Reference data (languages, countries, majors) will remain seeded

### If Tests Fail:

1. Check if backend server is running
2. Check if MongoDB is running
3. Verify port 3001 is not in use by another service
4. Check server logs for errors
5. Ensure database connection is working

## Customization

### Changing Base URL
Edit the `BASE_URL` constant in `scripts/test-api.js`:
```javascript
const BASE_URL = 'http://localhost:3001';
```

### Adding More Tests
Add new test functions in `scripts/test-api.js` following the pattern:
```javascript
await testEndpoint('METHOD', '/endpoint', data, 'Test Description');
```

### Skipping Cleanup
Comment out the cleanup section if you want to inspect test data:
```javascript
// ========== CLEANUP TESTS (DELETE) ==========
// console.log('\n━━━ DELETE ENDPOINTS ━━━');
// ... comment out delete tests
```

## Troubleshooting

### "Connection Refused" Error
- Backend server is not running
- Start with: `npm run start:dev`

### "MongoError" in logs
- MongoDB is not running
- Start MongoDB before running tests

### "Duplicate Key" Error
- Test data already exists
- Clear database or use different test emails

### Tests Pass but Data Not Visible
- Data was deleted in cleanup phase
- Comment out cleanup section to keep test data

## Integration with CI/CD

To use in CI/CD pipelines:

```bash
# Start services
mongod &
npm run start:prod &

# Wait for services
sleep 5

# Run tests
npm run test:api

# Cleanup
killall mongod node
```

## Next Steps

After successful API tests:
1. Test with Postman collection
2. Write unit tests for services
3. Write integration tests with Jest
4. Add E2E tests with supertest
5. Set up automated testing in CI/CD

## Support

If tests fail unexpectedly:
1. Check backend logs: `npm run start:dev`
2. Check MongoDB logs
3. Verify all dependencies are installed: `npm install`
4. Try rebuilding: `npm run build`

