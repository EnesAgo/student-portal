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
  if (error.response?.data) {
    console.log(`   Error:`, JSON.stringify(error.response.data, null, 2));
  } else {
    console.log(`   Error:`, error.message || error);
  }
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

  const user1Result = await makeRequest('POST', '/users', {
    firstName: 'Enes',
    lastName: 'Ago',
    email: 'enes.ago@stu.uni-munich.de',
    password: 'password123',
    role: 'student',
    studentId: 'STU-2026-0001',
    phoneNumber: '+38970000001',
  }, 'Create Student 1: Enes Ago');
  if (user1Result.success) createdUserIds.enes = user1Result.data._id;

  const user2Result = await makeRequest('POST', '/users', {
    firstName: 'Edgars',
    lastName: 'Zeltmanis',
    email: 'edgars.zeltmanis@stu.uni-munich.de',
    password: 'password123',
    role: 'draftStudent',
    studentId: 'DRAFT-2026-EDGARS-01',
    phoneNumber: '+37120000001',
  }, 'Create Draft Student 2: Edgars Zeltmanis');
  if (user2Result.success) {
    createdUserIds.edgars = user2Result.data._id;
  }

  const user3Result = await makeRequest('POST', '/users', {
    firstName: 'Malsor',
    lastName: 'Arifi',
    email: 'malsor.arifi@stu.uni-munich.de',
    password: 'password123',
    role: 'draftStudent',
    studentId: 'DRAFT-2026-MALSOR-01',
    phoneNumber: '+38344123456',
  }, 'Create Draft Student 3: Malsor Arifi');
  if (user3Result.success) {
    createdUserIds.malsor = user3Result.data._id;
  }

  const user4Result = await makeRequest('POST', '/users', {
    firstName: 'Timothy Lule Philemond',
    lastName: 'Mbobbo',
    email: 'timothy.mbobbo@stu.uni-munich.de',
    password: 'password123',
    role: 'draftStudent',
    studentId: 'DRAFT-2026-TIMOTHY-01',
    phoneNumber: '+25670000004',
  }, 'Create Draft Student 4: Timothy Mbobbo');
  if (user4Result.success) {
    createdUserIds.timothy = user4Result.data._id;
  }

  const adminResult = await makeRequest('POST', '/users', {
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@uni-munich.de',
    password: 'adminpass123',
    role: 'admin',
  }, 'Create Admin User');
  if (adminResult.success) createdUserIds.admin = adminResult.data._id;

  console.log('\n⏳ Waiting for user creation to complete...');
  await new Promise(resolve => setTimeout(resolve, 1000));

  // ========== CREATE MENTOR PROFILES ==========
  console.log('\n━━━ Step 3: Creating Mentor Profiles ━━━');

  console.log('📋 Checking user IDs:', {
    enes: createdUserIds.enes || 'NOT FOUND',
    edgars: createdUserIds.edgars || 'NOT FOUND',
    malsor: createdUserIds.malsor || 'NOT FOUND',
    timothy: createdUserIds.timothy || 'NOT FOUND'
  });

  if (createdUserIds.enes) {
    const mentor1Result = await makeRequest('POST', '/mentors', {
      userId: createdUserIds.enes,
      bio: 'Hey! I am Enes, a Cyber Security student from North Macedonia. I enjoy playing piano, coding, and skateboarding. I am passionate about helping international students navigate their university experience.',
      languages: ['Macedonian', 'English', 'Turkish'],
      country: 'North Macedonia',
      flag: 'MK',
      majors: ['Cyber Security'],
      interests: ['Academic Support', 'Technical Skills', 'Social Integration'],
      semester: 2,
      yearOfStudy: '2nd Semester',
      image: '/mentorImages/EnesAgo.png',
      email: 'enes.ago@stu.uni-munich.de',
      maxMentees: 5,
      about: [
        'Hey! I am Enes, a Cyber Security student from North Macedonia.',
        'I enjoy playing piano, coding, and skateboarding and love helping other students settle in.'
      ],
      academicBackground: {
        major: 'Cyber Security',
        currentSemester: 2,
        focusAreas: 'Cybersecurity and Software Development',
        experience: 'Currently Fullstack Developer Intern'
      },
      personalInfo: {
        languages: 'Macedonian, English, Turkish',
        nationality: 'Macedonian',
        hobbies: 'Playing Piano, Coding, Skateboarding'
      },
      mentorshipFocus: {
        whoCanHelp: 'First-year students, international students, and students interested in cybersecurity',
        topics: [
          'Academic transition and study strategies',
          'Programming help and coding projects',
          'Navigating campus resources',
          'Cultural adjustment and making friends'
        ]
      }
    }, 'Create Mentor Profile: Enes Ago');
    if (mentor1Result.success) createdMentorIds.enes = mentor1Result.data._id;
  }

  if (createdUserIds.edgars) {
    const mentor2Result = await makeRequest('POST', '/mentors', {
      userId: createdUserIds.edgars,
      bio: 'Hi! I am Edgars, a Latvian student with diverse interests. I enjoy motorcycles, skiing, surfing, and golf. I speak multiple languages and am here to help international students adapt to university life.',
      languages: ['Latvian', 'English', 'German', 'Russian'],
      country: 'Latvia',
      flag: 'LV',
      majors: ['Software Engineering'],
      interests: ['Social Integration', 'Language Support', 'Cultural Exchange'],
      semester: 2,
      yearOfStudy: '2nd Semester',
      image: '/mentorImages/EdgarsZeltmanis.jpg',
      email: 'edgars.zeltmanis@stu.uni-munich.de',
      maxMentees: 5,
      about: [
        'Hi! I am Edgars, an international student from Latvia currently studying Software Engineering.',
        'I enjoy helping new students adapt to life at university and feel at home on campus.'
      ],
      academicBackground: {
        major: 'Software Engineering',
        currentSemester: 2,
        focusAreas: 'Software Development',
        experience: 'Currently Senior Tester'
      },
      personalInfo: {
        languages: 'Latvian, English, German, Russian',
        nationality: 'Latvian',
        hobbies: 'Motorcycles, Ski, Surfing, Golf'
      },
      mentorshipFocus: {
        whoCanHelp: 'First-year students, international students, students in Software Engineering or related majors',
        topics: [
          'Academic transition and study strategies',
          'Programming help and coding projects',
          'Navigating campus resources',
          'Cultural adjustment and making friends'
        ]
      }
    }, 'Create Mentor Profile: Edgars Zeltmanis');
    if (mentor2Result.success) createdMentorIds.edgars = mentor2Result.data._id;
  }

  if (createdUserIds.malsor) {
    const mentor3Result = await makeRequest('POST', '/mentors', {
      userId: createdUserIds.malsor,
      bio: 'Greetings! I am Malsor, a Software Engineering student from Kosovo. I love football and coding. I am here to help fellow students with their academic journey and integration.',
      languages: ['Albanian', 'English'],
      country: 'Kosovo',
      flag: 'XK',
      majors: ['Software Engineering'],
      interests: ['Academic Support', 'Career Guidance', 'Technical Skills'],
      semester: 2,
      yearOfStudy: '2nd Semester',
      image: '/mentorImages/MalsorArifi.jpeg',
      email: 'malsor.arifi@stu.uni-munich.de',
      maxMentees: 4,
      about: [
        'Greetings! I am Malsor, a Software Engineering student from Kosovo.',
        'I love football and coding and enjoy helping fellow students with their academic journey.'
      ],
      academicBackground: {
        major: 'Software Engineering',
        currentSemester: 2,
        focusAreas: 'Software Development',
        experience: 'Currently Python Backend Developer Intern'
      },
      personalInfo: {
        languages: 'Albanian, English',
        nationality: 'Kosovar',
        hobbies: 'Football, Coding'
      },
      mentorshipFocus: {
        whoCanHelp: 'Students interested in software engineering, technical students, anyone needing academic support',
        topics: [
          'Academic Support',
          'Career Guidance',
          'Technical Skills'
        ]
      }
    }, 'Create Mentor Profile: Malsor Arifi');
    if (mentor3Result.success) createdMentorIds.malsor = mentor3Result.data._id;
  }

  if (createdUserIds.timothy) {
    const mentor4Result = await makeRequest('POST', '/mentors', {
      userId: createdUserIds.timothy,
      bio: 'Hello! I am Timothy from Uganda, currently studying Data Science. I enjoy rugby, swimming, and relaxing. I am here to support international students in their academic and personal journey.',
      languages: ['English', 'Luganda'],
      country: 'Uganda',
      flag: 'UG',
      majors: ['Data Science'],
      interests: ['Academic Support', 'Social Integration', 'Sports'],
      semester: 2,
      yearOfStudy: '2nd Semester',
      image: '/mentorImages/TimothyLulePhilemondMbobbo.jpg',
      email: 'timothy.mbobbo@stu.uni-munich.de',
      maxMentees: 4,
      about: [
        'Hello! I am Timothy from Uganda, currently studying Data Science.',
        'I enjoy rugby, swimming, and relaxing, and I am here to support international students in their academic and personal journey.'
      ],
      academicBackground: {
        major: 'Data Science',
        currentSemester: 2,
        focusAreas: 'Data Analysis and Machine Learning',
        experience: 'Data Science student with passion for sports'
      },
      personalInfo: {
        languages: 'English, Luganda',
        nationality: 'Ugandan',
        hobbies: 'Rugby, Swimming, Relaxing'
      },
      mentorshipFocus: {
        whoCanHelp: 'Students needing academic guidance, international students, and anyone interested in data science',
        topics: [
          'Academic transition and study strategies',
          'Research and data science guidance',
          'Cultural adjustment',
          'Campus resources'
        ]
      }
    }, 'Create Mentor Profile: Timothy Mbobbo');
    if (mentor4Result.success) createdMentorIds.timothy = mentor4Result.data._id;
  }

  // ========== CREATE MENTORSHIP REQUESTS ==========
  console.log('\n━━━ Step 4: Creating Mentorship Requests ━━━');

  if (createdUserIds.enes && createdMentorIds.edgars) {
    const req1Result = await makeRequest('POST', '/mentorship-requests', {
      studentId: createdUserIds.enes,
      mentorId: createdMentorIds.edgars,
      message: 'Hi Edgars! I am Enes and I would love guidance on adapting to university life and improving my coding skills.'
    }, 'Create Request: Enes → Edgars');
    if (req1Result.success) createdRequestIds.request1 = req1Result.data._id;
  }

  if (createdUserIds.enes && createdMentorIds.malsor) {
    const req2Result = await makeRequest('POST', '/mentorship-requests', {
      studentId: createdUserIds.enes,
      mentorId: createdMentorIds.malsor,
      message: 'Hi Malsor! I am Enes and I would love to learn more about software engineering and study strategies.'
    }, 'Create Request: Enes → Malsor');
    if (req2Result.success) createdRequestIds.request2 = req2Result.data._id;
  }

  if (createdUserIds.enes && createdMentorIds.yi) {
    const req3Result = await makeRequest('POST', '/mentorship-requests', {
      studentId: createdUserIds.enes,
      mentorId: createdMentorIds.yi,
      message: 'Hi Yi! I am Enes and I would appreciate help with data science and research direction.'
    }, 'Create Request: Enes → Yi');
    if (req3Result.success) {
      createdRequestIds.request3 = req3Result.data._id;
      await makeRequest('PATCH', `/mentorship-requests/${createdRequestIds.request3}`, {
        status: 'accepted',
        responseMessage: 'Hi Enes! I would be happy to help you with data science and research.'
      }, 'Accept Request: Enes → Yi');
    }
  }

  // ========== TEST VARIOUS ENDPOINTS ==========
  console.log('\n━━━ Step 5: Testing Various Endpoints ━━━');

  await makeRequest('GET', '/users', null, 'Get All Users');
  await makeRequest('GET', '/users/mentors', null, 'Get Users Who Are Mentors');
  await makeRequest('GET', '/mentors', null, 'Get All Mentors');
  await makeRequest('GET', '/mentorship-requests', null, 'Get All Mentorship Requests');
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
  console.log(`   - Enes Ago (Student) - ID: ${createdUserIds.enes || 'N/A'}`);
  console.log(`   - Edgars Zeltmanis (Draft Student/Mentor) - ID: ${createdUserIds.edgars || 'N/A'}`);
  console.log(`   - Malsor Arifi (Draft Student/Mentor) - ID: ${createdUserIds.malsor || 'N/A'}`);
  console.log(`   - Timothy Mbobbo (Draft Student/Mentor) - ID: ${createdUserIds.timothy || 'N/A'}`);
  console.log(`   - Admin User - ID: ${createdUserIds.admin || 'N/A'}`);

  console.log(`\n🎓 Mentors Created (${Object.keys(createdMentorIds).length}):`);
  console.log(`   - Enes Ago - ID: ${createdMentorIds.enes || 'N/A'}`);
  console.log(`   - Edgars Zeltmanis - ID: ${createdMentorIds.edgars || 'N/A'}`);
  console.log(`   - Malsor Arifi - ID: ${createdMentorIds.malsor || 'N/A'}`);
  console.log(`   - Timothy Mbobbo - ID: ${createdMentorIds.timothy || 'N/A'}`);

  console.log(`\n📨 Mentorship Requests Created (${Object.keys(createdRequestIds).length}):`);

  for (const [key, id] of Object.entries(createdRequestIds)) {
    console.log(`   - ${key}: ${id}`);
  }
}

seedDatabase().catch(console.error);
