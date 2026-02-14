const axios = require('axios');

const BASE_URL = 'http://localhost:3001';
let createdUserIds = {};
let createdMentorIds = {};
let createdRequestIds = {};

// Helper function to log test results
function logTest(name, success, data = null, error = null) {
  const status = success ? '✅ PASS' : '❌ FAIL';
  console.log(`\n${status} - ${name}`);
  if (data) console.log('   Data:', JSON.stringify(data, null, 2));
  if (error) console.log('   Error:', error.message || error);
}

// Helper function to make requests
async function testEndpoint(method, url, data = null, testName = '') {
  try {
    const config = {
      method,
      url: `${BASE_URL}${url}`,
    };
    if (data) config.data = data;

    const response = await axios(config);
    logTest(testName, true, response.data);
    return { success: true, data: response.data };
  } catch (error) {
    logTest(testName, false, null, error.response?.data || error.message);
    return { success: false, error: error.response?.data || error.message };
  }
}

// Test Suite
async function runTests() {
  console.log('\n═══════════════════════════════════════════════════════');
  console.log('   Student Portal Backend API - Complete Test Suite');
  console.log('═══════════════════════════════════════════════════════\n');

  // ========== REFERENCE DATA TESTS ==========
  console.log('\n━━━ REFERENCE DATA ENDPOINTS ━━━');

  // 1. Seed Languages
  await testEndpoint('POST', '/languages/seed', null, 'Seed Languages');

  // 2. Get Languages
  const langResult = await testEndpoint('GET', '/languages', null, 'Get All Languages');

  // 3. Seed Countries
  await testEndpoint('POST', '/countries/seed', null, 'Seed Countries');

  // 4. Get Countries
  const countryResult = await testEndpoint('GET', '/countries', null, 'Get All Countries');

  // 5. Seed Majors
  await testEndpoint('POST', '/majors/seed', null, 'Seed Majors');

  // 6. Get Majors
  const majorResult = await testEndpoint('GET', '/majors', null, 'Get All Majors');

  // ========== USER TESTS ==========
  console.log('\n━━━ USER ENDPOINTS ━━━');

  // 7. Create User 1 (Student)
  const user1Data = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@stu.uni-munich.de',
    password: 'password123',
    role: 'student',
    phoneNumber: '+1234567890',
  };
  const user1Result = await testEndpoint('POST', '/users', user1Data, 'Create User 1 (Student)');
  if (user1Result.success) createdUserIds.user1 = user1Result.data._id;

  // 8. Create User 2 (Student who will be a Mentor)
  const user2Data = {
    firstName: 'Sarah',
    lastName: 'Chen',
    email: 'sarah.chen@stu.uni-munich.de',
    password: 'password123',
    role: 'student',
    phoneNumber: '+49123456789',
  };
  const user2Result = await testEndpoint('POST', '/users', user2Data, 'Create User 2 (Future Mentor)');
  if (user2Result.success) createdUserIds.user2 = user2Result.data._id;

  // 9. Create User 3 (Admin)
  const user3Data = {
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@uni-munich.de',
    password: 'adminpass123',
    role: 'admin',
  };
  const user3Result = await testEndpoint('POST', '/users', user3Data, 'Create User 3 (Admin)');
  if (user3Result.success) createdUserIds.admin = user3Result.data._id;

  // 10. Get All Users
  await testEndpoint('GET', '/users', null, 'Get All Users');

  // 11. Get User by ID
  if (createdUserIds.user1) {
    await testEndpoint('GET', `/users/${createdUserIds.user1}`, null, 'Get User 1 by ID');
  }

  // 12. Update User (set isMentor to true)
  if (createdUserIds.user2) {
    const updateData = { isMentor: true };
    await testEndpoint('PATCH', `/users/${createdUserIds.user2}`, updateData, 'Update User 2 (set isMentor)');
  }

  // 13. Get Mentors (should return empty initially)
  await testEndpoint('GET', '/users/mentors', null, 'Get Users Who Are Mentors');

  // ========== MENTOR TESTS ==========
  console.log('\n━━━ MENTOR ENDPOINTS ━━━');

  // 14. Create Mentor Profile for User 2
  if (createdUserIds.user2) {
    const mentorData = {
      userId: createdUserIds.user2,
      bio: 'Hi! I\'m a 3rd year Software Engineering student from Germany. Happy to help with coding and campus life.',
      languages: ['English', 'German'],
      country: 'Germany',
      flag: '🇩🇪',
      majors: ['Software Engineering'],
      interests: ['Academic Support', 'Career Guidance'],
      semester: 5,
      yearOfStudy: '5th Semester',
      image: 'https://example.com/sarah.jpg',
      email: 'sarah.chen@student.edu',
      maxMentees: 5,
      linkedIn: 'https://linkedin.com/in/sarahchen',
      about: [
        'Hi! I\'m Sarah, an international student from Germany.',
        'I\'m passionate about coding and helping others.'
      ],
      academicBackground: {
        major: 'Software Engineering',
        currentSemester: 5,
        focusAreas: 'Web Development, Cloud Computing',
        experience: 'Teaching Assistant, Coding Club Member'
      },
      personalInfo: {
        languages: 'English (Fluent), German (Native)',
        nationality: 'Germany',
        hobbies: 'Photography, Hiking, Coffee'
      },
      mentorshipFocus: {
        whoCanHelp: 'First-year students, international students',
        topics: ['Academic transition', 'Programming help', 'Campus resources']
      }
    };
    const mentorResult = await testEndpoint('POST', '/mentors', mentorData, 'Create Mentor Profile');
    if (mentorResult.success) createdMentorIds.mentor1 = mentorResult.data._id;
  }

  // 15. Get All Mentors
  const mentorsResult = await testEndpoint('GET', '/mentors', null, 'Get All Mentors');

  // 16. Get Mentor by ID
  if (createdMentorIds.mentor1) {
    await testEndpoint('GET', `/mentors/${createdMentorIds.mentor1}`, null, 'Get Mentor by ID');
  }

  // 17. Get Mentor by User ID
  if (createdUserIds.user2) {
    await testEndpoint('GET', `/mentors/user/${createdUserIds.user2}`, null, 'Get Mentor by User ID');
  }

  // 18. Filter Mentors by Language
  await testEndpoint('GET', '/mentors?languages=English', null, 'Filter Mentors by Language (English)');

  // 19. Filter Mentors by Country
  await testEndpoint('GET', '/mentors?country=Germany', null, 'Filter Mentors by Country (Germany)');

  // 20. Filter Mentors by Major
  await testEndpoint('GET', '/mentors?majors=Software Engineering', null, 'Filter Mentors by Major');

  // 21. Filter Mentors by Availability
  await testEndpoint('GET', '/mentors?isAvailable=true', null, 'Filter Mentors by Availability');

  // 22. Update Mentor (change availability)
  if (createdMentorIds.mentor1) {
    const updateData = { isAvailable: false };
    await testEndpoint('PATCH', `/mentors/${createdMentorIds.mentor1}`, updateData, 'Update Mentor Availability');
  }

  // 23. Update Mentor Rating
  if (createdMentorIds.mentor1) {
    const ratingData = { rating: 4.5 };
    await testEndpoint('PATCH', `/mentors/${createdMentorIds.mentor1}/rating`, ratingData, 'Update Mentor Rating');
  }

  // ========== MENTORSHIP REQUEST TESTS ==========
  console.log('\n━━━ MENTORSHIP REQUEST ENDPOINTS ━━━');

  // 24. Create Mentorship Request
  if (createdUserIds.user1 && createdMentorIds.mentor1) {
    const requestData = {
      studentId: createdUserIds.user1,
      mentorId: createdMentorIds.mentor1,
      message: 'Hi Sarah! I\'m a first-year student and would love to connect with you. I need help with programming and adjusting to university life.',
    };
    const requestResult = await testEndpoint('POST', '/mentorship-requests', requestData, 'Create Mentorship Request');
    if (requestResult.success) createdRequestIds.request1 = requestResult.data._id;
  }

  // 25. Get All Mentorship Requests
  await testEndpoint('GET', '/mentorship-requests', null, 'Get All Mentorship Requests');

  // 26. Get Requests by Student
  if (createdUserIds.user1) {
    await testEndpoint('GET', `/mentorship-requests/student/${createdUserIds.user1}`, null, 'Get Requests by Student');
  }

  // 27. Get Requests by Mentor
  if (createdMentorIds.mentor1) {
    await testEndpoint('GET', `/mentorship-requests/mentor/${createdMentorIds.mentor1}`, null, 'Get Requests by Mentor');
  }

  // 28. Get Pending Requests for Mentor
  if (createdMentorIds.mentor1) {
    await testEndpoint('GET', `/mentorship-requests/mentor/${createdMentorIds.mentor1}/pending`, null, 'Get Pending Requests');
  }

  // 29. Get Request by ID
  if (createdRequestIds.request1) {
    await testEndpoint('GET', `/mentorship-requests/${createdRequestIds.request1}`, null, 'Get Request by ID');
  }

  // 30. Accept Mentorship Request
  if (createdRequestIds.request1) {
    const updateData = {
      status: 'accepted',
      responseMessage: 'Hi John! I\'d be happy to help. Looking forward to meeting you!'
    };
    await testEndpoint('PATCH', `/mentorship-requests/${createdRequestIds.request1}`, updateData, 'Accept Request');
  }

  // 31. Create Another Request to Reject
  if (createdUserIds.user1 && createdMentorIds.mentor1) {
    const requestData = {
      studentId: createdUserIds.user1,
      mentorId: createdMentorIds.mentor1,
      message: 'Another request for testing rejection.',
    };
    const requestResult = await testEndpoint('POST', '/mentorship-requests', requestData, 'Create Request (to reject)');
    if (requestResult.success) {
      createdRequestIds.request2 = requestResult.data._id;

      // 32. Reject Request
      const rejectData = {
        status: 'rejected',
        responseMessage: 'Sorry, I\'m at full capacity right now.'
      };
      await testEndpoint('PATCH', `/mentorship-requests/${createdRequestIds.request2}`, rejectData, 'Reject Request');
    }
  }

  // ========== CLEANUP TESTS (DELETE) ==========
  console.log('\n━━━ DELETE ENDPOINTS ━━━');

  // 33. Delete Mentorship Request
  if (createdRequestIds.request2) {
    await testEndpoint('DELETE', `/mentorship-requests/${createdRequestIds.request2}`, null, 'Delete Mentorship Request');
  }

  // 34. Delete Mentor
  if (createdMentorIds.mentor1) {
    await testEndpoint('DELETE', `/mentors/${createdMentorIds.mentor1}`, null, 'Delete Mentor Profile');
  }

  // 35. Delete Users
  if (createdUserIds.user1) {
    await testEndpoint('DELETE', `/users/${createdUserIds.user1}`, null, 'Delete User 1');
  }
  if (createdUserIds.user2) {
    await testEndpoint('DELETE', `/users/${createdUserIds.user2}`, null, 'Delete User 2');
  }
  if (createdUserIds.admin) {
    await testEndpoint('DELETE', `/users/${createdUserIds.admin}`, null, 'Delete Admin User');
  }

  // ========== FINAL SUMMARY ==========
  console.log('\n═══════════════════════════════════════════════════════');
  console.log('   Test Suite Completed!');
  console.log('═══════════════════════════════════════════════════════');
  console.log('\nCreated IDs during tests:');
  console.log('Users:', createdUserIds);
  console.log('Mentors:', createdMentorIds);
  console.log('Requests:', createdRequestIds);
  console.log('\n✨ All tests executed. Check logs above for results.\n');
}

// Run the tests
console.log('\n🚀 Starting API Tests...');
console.log('⚠️  Make sure the backend server is running on http://localhost:3001\n');

// Wait a bit before starting
setTimeout(() => {
  runTests().catch(error => {
    console.error('\n❌ Fatal Error:', error.message);
    process.exit(1);
  });
}, 1000);

