const axios = require('axios');

const BASE_URL = 'http://localhost:3001';
let createdUserIds = {};
let createdMentorIds = {};
let createdRequestIds = {};

// Helper function to log results
function logSuccess(name, data = null) {
  console.log(`\n✅ ${name}`);
  if (data && data._id) {
    console.log(`   ID: ${data._id}`);
  }
}

function logError(name, error) {
  console.log(`\n❌ ${name}`);
  console.log(`   Error:`, error.message || error);
}

// Helper function to make requests
async function makeRequest(method, url, data = null, name = '') {
  try {
    const config = {
      method,
      url: `${BASE_URL}${url}`,
    };
    if (data) config.data = data;

    const response = await axios(config);
    logSuccess(name, response.data);
    return { success: true, data: response.data };
  } catch (error) {
    logError(name, error.response?.data || error.message);
    return { success: false, error: error.response?.data || error.message };
  }
}

// Seed Database with Dummy Data
async function seedDatabase() {
  console.log('\n╔════════════════════════════════════════════════════════╗');
  console.log('║   Student Portal Backend - Database Seeder             ║');
  console.log('║   Creates realistic dummy data for development         ║');
  console.log('╚════════════════════════════════════════════════════════╝\n');

  // ========== SEED REFERENCE DATA ==========
  console.log('\n━━━ Step 1: Seeding Reference Data ━━━');

  await makeRequest('POST', '/languages/seed', null, 'Seed Languages (10 items)');
  await makeRequest('POST', '/countries/seed', null, 'Seed Countries (8 items)');
  await makeRequest('POST', '/majors/seed', null, 'Seed Majors (4 items)');

  // ========== CREATE USERS ==========
  console.log('\n━━━ Step 2: Creating Users ━━━');

  // User 1: Regular Student (not a mentor)
  const user1Result = await makeRequest('POST', '/users', {
    firstName: 'Emma',
    lastName: 'Johnson',
    email: 'emma.johnson@stu.uni-munich.de',
    password: 'password123',
    role: 'student',
    phoneNumber: '+1234567890',
  }, 'Create Student 1: Emma Johnson');
  if (user1Result.success) createdUserIds.emma = user1Result.data._id;

  // User 2: Student who will become a Mentor
  const user2Result = await makeRequest('POST', '/users', {
    firstName: 'Sarah',
    lastName: 'Chen',
    email: 'sarah.chen@stu.uni-munich.de',
    password: 'password123',
    role: 'student',
    isMentor: true,
    phoneNumber: '+49123456789',
  }, 'Create Student 2: Sarah Chen (Mentor)');
  if (user2Result.success) createdUserIds.sarah = user2Result.data._id;

  // User 3: Another Student who will become a Mentor
  const user3Result = await makeRequest('POST', '/users', {
    firstName: 'Mehmet',
    lastName: 'Yılmaz',
    email: 'mehmet.yilmaz@stu.uni-munich.de',
    password: 'password123',
    role: 'student',
    isMentor: true,
    phoneNumber: '+905551234567',
  }, 'Create Student 3: Mehmet Yılmaz (Mentor)');
  if (user3Result.success) createdUserIds.mehmet = user3Result.data._id;

  // User 4: Another regular student
  const user4Result = await makeRequest('POST', '/users', {
    firstName: 'Alex',
    lastName: 'Rodriguez',
    email: 'alex.rodriguez@stu.uni-munich.de',
    password: 'password123',
    role: 'student',
    phoneNumber: '+34612345678',
  }, 'Create Student 4: Alex Rodriguez');
  if (user4Result.success) createdUserIds.alex = user4Result.data._id;

  // User 5: Admin
  const adminResult = await makeRequest('POST', '/users', {
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@uni-munich.de',
    password: 'adminpass123',
    role: 'admin',
  }, 'Create Admin User');
  if (adminResult.success) createdUserIds.admin = adminResult.data._id;

  // ========== CREATE MENTOR PROFILES ==========
  console.log('\n━━━ Step 3: Creating Mentor Profiles ━━━');

  // Mentor 1: Sarah Chen - Software Engineering
  if (createdUserIds.sarah) {
    const mentor1Result = await makeRequest('POST', '/mentors', {
      userId: createdUserIds.sarah,
      bio: 'Hi! I\'m Sarah, a 5th semester Software Engineering student from Germany. I love coding and helping newcomers adjust to university life.',
      languages: ['English', 'German'],
      country: 'Germany',
      flag: '🇩🇪',
      majors: ['Software Engineering'],
      interests: ['Academic Support', 'Career Guidance', 'Social Integration'],
      semester: 5,
      yearOfStudy: '5th Semester',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
      email: 'sarah.chen@stu.uni-munich.de',
      maxMentees: 5,
      linkedIn: 'https://linkedin.com/in/sarahchen',
      instagram: '@sarah_codes',
      about: [
        'Hi! I\'m Sarah, an international student from Germany currently in my fifth semester studying Software Engineering.',
        'I\'m passionate about coding, problem-solving, and building connections across cultures. Outside of academics, I enjoy photography, hiking, and exploring local coffee shops.',
        'I\'m here to support you academically and help you feel at home on campus.'
      ],
      academicBackground: {
        major: 'Software Engineering',
        currentSemester: 5,
        focusAreas: 'Software Development, Web Applications, Cloud Computing',
        experience: 'Teaching Assistant for Intro to Programming, Member of Coding Club'
      },
      personalInfo: {
        languages: 'English (Fluent), German (Native)',
        nationality: 'Germany',
        hobbies: 'Photography, Hiking, Coffee tasting, Reading tech blogs'
      },
      mentorshipFocus: {
        whoCanHelp: 'First-year students, international students, students in Software Engineering or related majors',
        topics: [
          'Academic transition and study strategies',
          'Programming help and coding projects',
          'Navigating campus resources',
          'Cultural adjustment and making friends',
          'Time management and work-life balance'
        ]
      }
    }, 'Create Mentor Profile: Sarah Chen');
    if (mentor1Result.success) createdMentorIds.sarah = mentor1Result.data._id;
  }

  // Mentor 2: Mehmet Yılmaz - Cyber Security
  if (createdUserIds.mehmet) {
    const mentor2Result = await makeRequest('POST', '/mentors', {
      userId: createdUserIds.mehmet,
      bio: 'Passionate about cybersecurity and ethical hacking. Can help with security fundamentals and technical problem-solving.',
      languages: ['Turkish', 'English', 'German'],
      country: 'Turkey',
      flag: '🇹🇷',
      majors: ['Cyber Security'],
      interests: ['Academic Support', 'Career Guidance'],
      semester: 6,
      yearOfStudy: '6th Semester',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
      email: 'mehmet.yilmaz@stu.uni-munich.de',
      maxMentees: 4,
      linkedIn: 'https://linkedin.com/in/mehmetyilmaz',
      about: [
        'Hello! I\'m Mehmet, a Cyber Security student from Turkey in my sixth semester.',
        'I\'m passionate about protecting digital systems and helping others understand the importance of security.'
      ],
      academicBackground: {
        major: 'Cyber Security',
        currentSemester: 6,
        focusAreas: 'Network Security, Ethical Hacking, Cryptography',
        experience: 'Security Club President, CTF Competition Participant'
      },
      personalInfo: {
        languages: 'Turkish (Native), English (Fluent), German (Intermediate)',
        nationality: 'Turkey',
        hobbies: 'CTF competitions, Gaming, Technology podcasts'
      },
      mentorshipFocus: {
        whoCanHelp: 'Students interested in cybersecurity, technical students, anyone wanting to improve their digital security knowledge',
        topics: [
          'Cybersecurity fundamentals',
          'Programming for security',
          'Study techniques for technical subjects',
          'Career planning in tech',
          'Networking and professional development'
        ]
      }
    }, 'Create Mentor Profile: Mehmet Yılmaz');
    if (mentor2Result.success) createdMentorIds.mehmet = mentor2Result.data._id;
  }

  // ========== CREATE MENTORSHIP REQUESTS ==========
  console.log('\n━━━ Step 4: Creating Mentorship Requests ━━━');

  // Request 1: Emma → Sarah (Pending)
  if (createdUserIds.emma && createdMentorIds.sarah) {
    const req1Result = await makeRequest('POST', '/mentorship-requests', {
      studentId: createdUserIds.emma,
      mentorId: createdMentorIds.sarah,
      message: 'Hi Sarah! I\'m Emma, a first-year student. I\'m struggling with my programming courses and would really appreciate your guidance. I saw you\'re from Germany too and thought we might have a lot in common!',
    }, 'Create Request: Emma → Sarah (Pending)');
    if (req1Result.success) createdRequestIds.request1 = req1Result.data._id;
  }

  // Request 2: Alex → Mehmet (Pending)
  if (createdUserIds.alex && createdMentorIds.mehmet) {
    const req2Result = await makeRequest('POST', '/mentorship-requests', {
      studentId: createdUserIds.alex,
      mentorId: createdMentorIds.mehmet,
      message: 'Hello Mehmet! I\'m very interested in cybersecurity and would love to learn from you. Could you help me get started in this field?',
    }, 'Create Request: Alex → Mehmet (Pending)');
    if (req2Result.success) createdRequestIds.request2 = req2Result.data._id;
  }

  // Request 3: Emma → Mehmet (will be accepted)
  if (createdUserIds.emma && createdMentorIds.mehmet) {
    const req3Result = await makeRequest('POST', '/mentorship-requests', {
      studentId: createdUserIds.emma,
      mentorId: createdMentorIds.mehmet,
      message: 'Hi Mehmet! I\'m interested in learning about cybersecurity basics. Would you be available to mentor me?',
    }, 'Create Request: Emma → Mehmet');
    if (req3Result.success) {
      createdRequestIds.request3 = req3Result.data._id;

      // Accept this request
      await makeRequest('PATCH', `/mentorship-requests/${createdRequestIds.request3}`, {
        status: 'accepted',
        responseMessage: 'Hi Emma! I\'d be happy to help you learn about cybersecurity. Let\'s connect!'
      }, 'Accept Request: Emma → Mehmet');
    }
  }

  // ========== TEST VARIOUS ENDPOINTS ==========
  console.log('\n━━━ Step 5: Testing Various Endpoints ━━━');

  // Test: Get all users
  await makeRequest('GET', '/users', null, 'Get All Users');

  // Test: Get users who are mentors
  await makeRequest('GET', '/users/mentors', null, 'Get Users Who Are Mentors');

  // Test: Get all mentors
  await makeRequest('GET', '/mentors', null, 'Get All Mentors');

  // Test: Filter mentors by language
  await makeRequest('GET', '/mentors?languages=English', null, 'Filter Mentors: English speakers');

  // Test: Filter mentors by country
  await makeRequest('GET', '/mentors?country=Germany', null, 'Filter Mentors: From Germany');

  // Test: Filter mentors by major
  await makeRequest('GET', '/mentors?majors=Cyber Security', null, 'Filter Mentors: Cyber Security major');

  // Test: Get all mentorship requests
  await makeRequest('GET', '/mentorship-requests', null, 'Get All Mentorship Requests');

  // Test: Get pending requests for mentor
  if (createdMentorIds.sarah) {
    await makeRequest('GET', `/mentorship-requests/mentor/${createdMentorIds.sarah}/pending`, null, 'Get Pending Requests for Sarah');
  }

  // Test: Get requests by student
  if (createdUserIds.emma) {
    await makeRequest('GET', `/mentorship-requests/student/${createdUserIds.emma}`, null, 'Get Requests by Emma');
  }

  // Test: Update mentor rating
  if (createdMentorIds.sarah) {
    await makeRequest('PATCH', `/mentors/${createdMentorIds.sarah}/rating`, {
      rating: 4.8
    }, 'Update Sarah\'s Rating to 4.8');
  }

  // Test: Get reference data
  await makeRequest('GET', '/languages', null, 'Get All Languages');
  await makeRequest('GET', '/countries', null, 'Get All Countries');
  await makeRequest('GET', '/majors', null, 'Get All Majors');

  // ========== FINAL SUMMARY ==========
  console.log('\n╔════════════════════════════════════════════════════════╗');
  console.log('║   Database Seeding Completed!                          ║');
  console.log('╚════════════════════════════════════════════════════════╝');

  console.log('\n📊 Summary of Created Data:');
  console.log('─────────────────────────────────────────────────────────');
  console.log(`\n👥 Users Created (${Object.keys(createdUserIds).length}):`);
  console.log(`   - Emma Johnson (Student) - ID: ${createdUserIds.emma || 'N/A'}`);
  console.log(`   - Sarah Chen (Student/Mentor) - ID: ${createdUserIds.sarah || 'N/A'}`);
  console.log(`   - Mehmet Yılmaz (Student/Mentor) - ID: ${createdUserIds.mehmet || 'N/A'}`);
  console.log(`   - Alex Rodriguez (Student) - ID: ${createdUserIds.alex || 'N/A'}`);
  console.log(`   - Admin User - ID: ${createdUserIds.admin || 'N/A'}`);

  console.log(`\n🎓 Mentors Created (${Object.keys(createdMentorIds).length}):`);
  console.log(`   - Sarah Chen (Software Engineering) - ID: ${createdMentorIds.sarah || 'N/A'}`);
  console.log(`   - Mehmet Yılmaz (Cyber Security) - ID: ${createdMentorIds.mehmet || 'N/A'}`);

  console.log(`\n📨 Mentorship Requests Created (${Object.keys(createdRequestIds).length}):`);
  console.log(`   - Emma → Sarah (Pending) - ID: ${createdRequestIds.request1 || 'N/A'}`);
  console.log(`   - Alex → Mehmet (Pending) - ID: ${createdRequestIds.request2 || 'N/A'}`);
  console.log(`   - Emma → Mehmet (Accepted) - ID: ${createdRequestIds.request3 || 'N/A'}`);

  console.log('\n📚 Reference Data:');
  console.log('   - 10 Languages seeded');
  console.log('   - 8 Countries seeded');
  console.log('   - 4 Majors seeded');

  console.log('\n✅ Your database is now populated with realistic dummy data!');
  console.log('💡 You can now use these IDs to test your API manually.');
  console.log('\n🔗 Quick Links:');
  console.log(`   - All Users: ${BASE_URL}/users`);
  console.log(`   - All Mentors: ${BASE_URL}/mentors`);
  console.log(`   - All Requests: ${BASE_URL}/mentorship-requests`);
  console.log(`   - Languages: ${BASE_URL}/languages`);
  console.log(`   - Countries: ${BASE_URL}/countries`);
  console.log(`   - Majors: ${BASE_URL}/majors`);

  console.log('\n📝 Test Accounts:');
  console.log('   Student: emma.johnson@stu.uni-munich.de / password123');
  console.log('   Mentor: sarah.chen@stu.uni-munich.de / password123');
  console.log('   Admin: admin@uni-munich.de / adminpass123');

  console.log('\n💾 Data is persistent - NOT deleted automatically.');
  console.log('🗑️  To clear data, use MongoDB or the DELETE endpoints.\n');
}

// Run the seeder
console.log('\n🌱 Starting Database Seeder...');
console.log('⚠️  Make sure the backend server is running on http://localhost:3001');
console.log('📌 Note: This will create persistent data (not deleted automatically)\n');

setTimeout(() => {
  seedDatabase().catch(error => {
    console.error('\n❌ Fatal Error:', error.message);
    process.exit(1);
  });
}, 1000);

