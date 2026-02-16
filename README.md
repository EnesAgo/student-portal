# Student Portal - Mentoring Platform

A full-stack mentoring platform connecting students with experienced mentors. Built with NestJS, Next.js, and MongoDB.

## Features

- 🎓 **Mentor Discovery** - Browse and search for mentors by major, language, and semester
- 📝 **Mentorship Requests** - Students can request mentorship from available mentors
- 🔍 **Advanced Filtering** - Filter mentors by major, semester, language, and interests
- 🌍 **Multi-language Support** - Support for 10+ languages
- 📊 **Complete Profiles** - Detailed mentor profiles with academic background and focus areas
- 🔒 **University Email Verification** - Only @uni-munich.de and @stu.uni-munich.de emails allowed

## Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **UI Components**: Custom React components

### Backend
- **Framework**: NestJS
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose
- **Validation**: class-validator
- **Architecture**: RESTful API

### Database
- **MongoDB**: Document database
- **Collections**: Users, Mentors, Mentorship Requests, Languages, Countries, Majors

## Quick Start with Docker 🐳

The easiest way to run the entire application:

```bash
# Start all services
docker-compose up

# Access the application
# Frontend: http://localhost:3000
# Backend: http://localhost:3001
```

**That's it!** The application is now running with MongoDB, Backend, and Frontend.

### Seed the Database

```bash
# Run in another terminal
docker-compose exec backend npm run seed:db
```

See [DOCKER_GUIDE.md](./DOCKER_GUIDE.md) for detailed Docker documentation.

## Manual Setup (Without Docker)

### Prerequisites
- Node.js 20+
- MongoDB (running locally or remote)
- npm or yarn

### Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update .env with your MongoDB URI
# MONGODB_URI=mongodb://localhost:27017/student-portal

# Start backend
npm run start:dev

# Seed database (in another terminal)
npm run seed:db
```

Backend will run on http://localhost:3001

### Frontend Setup

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Create .env.local file
cp .env.example .env.local

# Update .env.local
# NEXT_PUBLIC_API_URL=http://localhost:3001

# Start frontend
npm run dev
```

Frontend will run on http://localhost:3000

## Project Structure

```
student-portal/
├── backend/                    # NestJS backend
│   ├── src/
│   │   ├── users/             # User management
│   │   ├── mentors/           # Mentor profiles
│   │   ├── mentorship-requests/
│   │   ├── languages/         # Reference data
│   │   ├── countries/         # Reference data
│   │   └── majors/            # Reference data
│   ├── scripts/               # Utility scripts
│   │   ├── test-api.js       # API testing
│   │   ├── seed-database.js  # Database seeding
│   │   └── clear-database.js # Database cleanup
│   └── docs/                  # Backend documentation
├── frontend/                   # Next.js frontend
│   ├── src/
│   │   ├── app/               # Next.js app routes
│   │   ├── components/        # React components
│   │   ├── services/          # API services
│   │   ├── lib/               # Utilities
│   │   └── types/             # TypeScript types
│   └── docs/                  # Frontend documentation
├── docker-compose.yml          # Docker orchestration
└── DOCKER_GUIDE.md            # Docker documentation
```

## API Endpoints

### Users
- `POST /users` - Create user
- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID
- `PATCH /users/:id` - Update user
- `DELETE /users/:id` - Delete user

### Mentors
- `POST /mentors` - Create mentor profile
- `GET /mentors` - Get all mentors (with filters)
- `GET /mentors/:id` - Get mentor by ID
- `PATCH /mentors/:id` - Update mentor
- `DELETE /mentors/:id` - Delete mentor

### Mentorship Requests
- `POST /mentorship-requests` - Create request
- `GET /mentorship-requests` - Get all requests
- `GET /mentorship-requests/student/:id` - Get by student
- `GET /mentorship-requests/mentor/:id` - Get by mentor
- `PATCH /mentorship-requests/:id` - Update request
- `DELETE /mentorship-requests/:id` - Delete request

### Reference Data
- `GET /languages` - Get all languages
- `GET /countries` - Get all countries
- `GET /majors` - Get all majors

See [backend/docs/API_DOCUMENTATION.md](./backend/docs/API_DOCUMENTATION.md) for complete API reference.

## Database Collections

### Users
- Students and admins
- Email validation (@uni-munich.de domains only)
- Password hashing with bcrypt

### Mentors
- Complete mentor profiles
- Languages, majors, interests
- Availability status
- Rating system

### Mentorship Requests
- Connection requests between students and mentors
- Status tracking (pending, accepted, rejected)
- Response messages

### Reference Data
- **Languages**: 10 languages (German, English, Turkish, etc.)
- **Countries**: 8 countries (Germany, Turkey, Uganda, etc.)
- **Majors**: 4 majors (Software Engineering, Cyber Security, etc.)

## Testing

### Backend API Testing

```bash
cd backend

# Run automated tests (cleans up after)
npm run test:api

# Seed database with sample data
npm run seed:db

# Clear all seeded data
npm run clear:db
```

### Using Postman

Import `backend/postman_collection.json` into Postman for manual API testing.

## Documentation

### Backend Documentation
- [API Documentation](./backend/docs/API_DOCUMENTATION.md)
- [Project Overview](./backend/docs/PROJECT_OVERVIEW.md)
- [Database Schemas](./backend/docs/MONGODB_SCHEMAS_JSON.md)
- [Architecture](./backend/docs/ARCHITECTURE.md)

### Frontend Documentation
- [Integration Guide](./frontend/docs/INTEGRATION_GUIDE.md)
- [Integration Complete](./frontend/docs/INTEGRATION_COMPLETE.md)
- [ObjectId Fix](./frontend/docs/OBJECTID_FIX.md)

### Docker Documentation
- [Docker Guide](./DOCKER_GUIDE.md) - Complete Docker setup and usage

## Development Scripts

### Backend
```bash
npm run start:dev    # Start with hot-reload
npm run build        # Build production
npm run test:api     # Run API tests
npm run seed:db      # Seed database
npm run clear:db     # Clear database
```

### Frontend
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
```

## Environment Variables

### Backend (.env)
```env
MONGODB_URI=mongodb://localhost:27017/student-portal
PORT=3001
NODE_ENV=development
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## Test Accounts (After Seeding)

```
Students:
- emma.johnson@stu.uni-munich.de / password123
- alex.rodriguez@stu.uni-munich.de / password123

Mentors:
- sarah.chen@stu.uni-munich.de / password123
- mehmet.yilmaz@stu.uni-munich.de / password123

Admin:
- admin@uni-munich.de / adminpass123
```

## Deployment

### Using Docker (Recommended)

```bash
# Build and start all services
docker-compose up -d --build

# Seed database
docker-compose exec backend npm run seed:db

# View logs
docker-compose logs -f
```

### Manual Deployment

1. Set up MongoDB instance
2. Deploy backend to hosting service (e.g., Heroku, DigitalOcean)
3. Deploy frontend to Vercel or similar
4. Update environment variables with production URLs

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License

## Support

For issues or questions:
- Check documentation in `docs/` folders
- Review troubleshooting sections
- Check browser/server console for errors

---

**Built with ❤️ for University of Munich Students**

