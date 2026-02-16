const axios = require('axios');

const BASE_URL = 'http://localhost:3001';

async function clearDatabase() {
  console.log('\n╔════════════════════════════════════════════════════════╗');
  console.log('║   Database Cleanup Utility                             ║');
  console.log('║   Removes all seeded data from the database            ║');
  console.log('╚════════════════════════════════════════════════════════╝\n');

  console.log('⚠️  WARNING: This will delete ALL data from the database!');
  console.log('   This is useful before running the seeder again.\n');

  try {
    // Get all users
    console.log('📋 Fetching all users...');
    const usersResponse = await axios.get(`${BASE_URL}/users`);
    const users = usersResponse.data;
    console.log(`   Found ${users.length} users`);

    // Get all mentors
    console.log('📋 Fetching all mentors...');
    const mentorsResponse = await axios.get(`${BASE_URL}/mentors`);
    const mentors = mentorsResponse.data;
    console.log(`   Found ${mentors.length} mentors`);

    // Get all mentorship requests
    console.log('📋 Fetching all mentorship requests...');
    const requestsResponse = await axios.get(`${BASE_URL}/mentorship-requests`);
    const requests = requestsResponse.data;
    console.log(`   Found ${requests.length} requests\n`);

    // Delete mentorship requests first (they reference users and mentors)
    console.log('━━━ Deleting Mentorship Requests ━━━');
    for (const request of requests) {
      try {
        await axios.delete(`${BASE_URL}/mentorship-requests/${request._id}`);
        console.log(`✅ Deleted request ${request._id}`);
      } catch (error) {
        console.log(`❌ Failed to delete request ${request._id}`);
      }
    }

    // Delete mentors (they reference users)
    console.log('\n━━━ Deleting Mentors ━━━');
    for (const mentor of mentors) {
      try {
        await axios.delete(`${BASE_URL}/mentors/${mentor._id}`);
        console.log(`✅ Deleted mentor ${mentor._id}`);
      } catch (error) {
        console.log(`❌ Failed to delete mentor ${mentor._id}`);
      }
    }

    // Delete users
    console.log('\n━━━ Deleting Users ━━━');
    for (const user of users) {
      try {
        await axios.delete(`${BASE_URL}/users/${user._id}`);
        console.log(`✅ Deleted user ${user._id} (${user.email})`);
      } catch (error) {
        console.log(`❌ Failed to delete user ${user._id}`);
      }
    }

    console.log('\n╔════════════════════════════════════════════════════════╗');
    console.log('║   Database Cleanup Complete!                           ║');
    console.log('╚════════════════════════════════════════════════════════╝');

    console.log('\n📊 Summary:');
    console.log(`   - Deleted ${requests.length} mentorship requests`);
    console.log(`   - Deleted ${mentors.length} mentors`);
    console.log(`   - Deleted ${users.length} users`);

    console.log('\n✅ Database is now clean!');
    console.log('💡 You can now run the seeder: npm run seed:db\n');

  } catch (error) {
    console.error('\n❌ Error during cleanup:', error.message);
    if (error.response?.data) {
      console.error('   Details:', error.response.data);
    }
    console.log('\n⚠️  Make sure the backend server is running on http://localhost:3001\n');
    process.exit(1);
  }
}

// Run the cleanup
console.log('\n🧹 Starting Database Cleanup...');
console.log('⚠️  Make sure the backend server is running on http://localhost:3001\n');

setTimeout(() => {
  clearDatabase().catch(error => {
    console.error('\n❌ Fatal Error:', error.message);
    process.exit(1);
  });
}, 1000);

