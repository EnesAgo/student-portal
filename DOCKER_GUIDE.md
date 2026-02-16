# Docker Setup Guide

Complete guide to run the Student Portal application using Docker.

## Prerequisites

- Docker Desktop installed ([Download here](https://www.docker.com/products/docker-desktop))
- Docker Compose (included with Docker Desktop)
- At least 4GB of free RAM
- At least 2GB of free disk space

## Quick Start

### Option 1: Using Docker Compose (Recommended)

Run the entire application stack with one command:

```bash
# From the project root directory
docker-compose up
```

This will start:
- ✅ MongoDB database
- ✅ Backend API (NestJS)
- ✅ Frontend (Next.js)

**Access the application:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- MongoDB: localhost:27017

### Option 2: Build and Run in Background

```bash
# Build and start all services in detached mode
docker-compose up -d --build

# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Stop and remove volumes (database will be cleared)
docker-compose down -v
```

## Project Structure

```
student-portal/
├── docker-compose.yml           # Docker Compose configuration
├── backend/
│   ├── Dockerfile              # Backend container definition
│   ├── .dockerignore           # Files to exclude from Docker build
│   └── .env.example            # Backend environment template
├── frontend/
│   ├── Dockerfile              # Frontend container definition
│   ├── .dockerignore           # Files to exclude from Docker build
│   └── .env.example            # Frontend environment template
└── DOCKER_GUIDE.md            # This file
```

## Docker Configuration

### Services

#### 1. MongoDB
- **Image**: `mongo:7.0`
- **Port**: `27017`
- **Database**: `student-portal`
- **Volumes**: Persistent data storage

#### 2. Backend (NestJS)
- **Build**: `./backend/Dockerfile`
- **Port**: `3001`
- **Environment**: Production mode
- **Depends on**: MongoDB

#### 3. Frontend (Next.js)
- **Build**: `./frontend/Dockerfile`
- **Port**: `3000`
- **Environment**: Production mode
- **Depends on**: Backend

### Networks

All services run on a custom bridge network `student-portal-network` for secure inter-container communication.

### Volumes

- `mongodb_data`: Persistent MongoDB database storage
- `mongodb_config`: MongoDB configuration

## Environment Variables

### Backend (.env)

Create `backend/.env` from `backend/.env.example`:

```env
MONGODB_URI=mongodb://mongodb:27017/student-portal
PORT=3001
NODE_ENV=production
JWT_SECRET=your-super-secret-jwt-key-change-in-production-please
JWT_EXPIRATION=7d
CORS_ORIGIN=http://localhost:3000
```

**Important**: Change the `JWT_SECRET` value in production!

### Frontend (.env.local)

Create `frontend/.env.local` from `frontend/.env.example`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

**Note**: When running with Docker Compose, environment variables are set in `docker-compose.yml`.

## Common Commands

### Start Services

```bash
# Start all services
docker-compose up

# Start in background
docker-compose up -d

# Rebuild and start
docker-compose up --build

# Start specific service
docker-compose up frontend
```

### Stop Services

```bash
# Stop all services
docker-compose down

# Stop and remove volumes (clears database)
docker-compose down -v

# Stop specific service
docker-compose stop backend
```

### View Logs

```bash
# View all logs
docker-compose logs

# Follow logs in real-time
docker-compose logs -f

# View logs for specific service
docker-compose logs backend

# Follow logs for specific service
docker-compose logs -f frontend
```

### Manage Containers

```bash
# List running containers
docker-compose ps

# Restart services
docker-compose restart

# Restart specific service
docker-compose restart backend

# Execute command in container
docker-compose exec backend npm run seed:db
```

### Clean Up

```bash
# Remove stopped containers
docker-compose rm

# Remove all containers, networks, and volumes
docker-compose down -v

# Remove unused Docker resources
docker system prune -a
```

## Development Workflow

### Initial Setup

```bash
# 1. Clone the repository
git clone <repo-url>
cd student-portal

# 2. Start all services
docker-compose up -d

# 3. Wait for services to be healthy (check logs)
docker-compose logs -f

# 4. Seed the database
docker-compose exec backend npm run seed:db
```

### Making Changes

#### Backend Changes

```bash
# 1. Make changes to backend code

# 2. Rebuild backend container
docker-compose up -d --build backend

# 3. View logs
docker-compose logs -f backend
```

#### Frontend Changes

```bash
# 1. Make changes to frontend code

# 2. Rebuild frontend container
docker-compose up -d --build frontend

# 3. View logs
docker-compose logs -f frontend
```

### Database Management

```bash
# Access MongoDB shell
docker-compose exec mongodb mongosh student-portal

# Seed database
docker-compose exec backend npm run seed:db

# Clear database
docker-compose exec backend npm run clear:db

# Backup database
docker-compose exec mongodb mongodump --db=student-portal --out=/data/backup

# Restore database
docker-compose exec mongodb mongorestore --db=student-portal /data/backup/student-portal
```

## Troubleshooting

### Services Won't Start

**Check if ports are already in use:**
```bash
# Check port 3000
lsof -i :3000

# Check port 3001
lsof -i :3001

# Check port 27017
lsof -i :27017
```

**Solution**: Stop the conflicting process or change ports in `docker-compose.yml`

### MongoDB Connection Failed

**Check MongoDB health:**
```bash
docker-compose ps
docker-compose logs mongodb
```

**Solution**: Ensure MongoDB is healthy before backend starts. The `docker-compose.yml` has health checks configured.

### Backend Returns 500 Errors

**Check backend logs:**
```bash
docker-compose logs backend
```

**Common issues:**
- MongoDB not ready: Wait for health check
- Environment variables missing: Check `.env` files
- Database not seeded: Run seed command

### Frontend Can't Connect to Backend

**Check network connectivity:**
```bash
# From frontend container
docker-compose exec frontend ping backend

# Check backend is running
curl http://localhost:3001/users
```

**Solution**: 
- Ensure backend is healthy
- Check `NEXT_PUBLIC_API_URL` environment variable
- For Docker, backend URL should be service name: `http://backend:3001`

### Build Failures

**Clear Docker cache and rebuild:**
```bash
# Remove all containers and volumes
docker-compose down -v

# Remove images
docker-compose rm -f
docker rmi student-portal-frontend student-portal-backend

# Rebuild from scratch
docker-compose build --no-cache
docker-compose up
```

### Out of Disk Space

**Clean up Docker resources:**
```bash
# Remove unused images
docker image prune -a

# Remove unused volumes
docker volume prune

# Remove everything unused
docker system prune -a --volumes
```

## Production Deployment

### Using Docker Compose

```bash
# 1. Set production environment variables
export NODE_ENV=production

# 2. Build optimized images
docker-compose build --no-cache

# 3. Start services
docker-compose up -d

# 4. Check health
docker-compose ps
```

### Using Individual Containers

#### Build Images

```bash
# Backend
cd backend
docker build -t student-portal-backend:latest .

# Frontend
cd frontend
docker build -t student-portal-frontend:latest .
```

#### Run Containers

```bash
# MongoDB
docker run -d \
  --name mongodb \
  -p 27017:27017 \
  -v mongodb_data:/data/db \
  mongo:7.0

# Backend
docker run -d \
  --name backend \
  -p 3001:3001 \
  --link mongodb:mongodb \
  -e MONGODB_URI=mongodb://mongodb:27017/student-portal \
  student-portal-backend:latest

# Frontend
docker run -d \
  --name frontend \
  -p 3000:3000 \
  --link backend:backend \
  -e NEXT_PUBLIC_API_URL=http://localhost:3001 \
  student-portal-frontend:latest
```

## Health Checks

All services include health checks:

### MongoDB
```bash
# Check MongoDB health
docker-compose exec mongodb mongosh --eval "db.adminCommand('ping')"
```

### Backend
```bash
# Check backend health
curl http://localhost:3001/users
```

### Frontend
```bash
# Check frontend health
curl http://localhost:3000
```

## Performance Optimization

### Multi-stage Builds

Both Dockerfiles use multi-stage builds to minimize image size:

- **Backend**: ~150MB (vs ~1GB without optimization)
- **Frontend**: ~180MB (vs ~1.5GB without optimization)

### Caching

Docker layer caching is optimized:
1. Dependencies installed first (cached unless package.json changes)
2. Source code copied last (rebuilt on code changes)

### Resource Limits

Add resource limits in `docker-compose.yml`:

```yaml
services:
  backend:
    deploy:
      resources:
        limits:
          cpus: '1.0'
          memory: 512M
        reservations:
          cpus: '0.5'
          memory: 256M
```

## Security Best Practices

### Non-root User

All containers run as non-root users:
- Backend: `nestjs` (UID 1001)
- Frontend: `nextjs` (UID 1001)

### Environment Variables

Never commit `.env` files:
- Use `.env.example` templates
- Set secrets via environment or Docker secrets

### Network Isolation

Services communicate via internal Docker network, not exposed to host.

## Monitoring

### View Resource Usage

```bash
# Container stats
docker stats

# Specific container
docker stats student-portal-backend
```

### View Logs

```bash
# All services
docker-compose logs -f

# Specific time range
docker-compose logs --since 1h

# Last 100 lines
docker-compose logs --tail=100
```

## Backup & Restore

### Backup Database

```bash
# Create backup directory
mkdir -p backups

# Backup MongoDB
docker-compose exec mongodb mongodump \
  --db=student-portal \
  --out=/data/backup

# Copy backup to host
docker cp student-portal-mongodb:/data/backup ./backups/
```

### Restore Database

```bash
# Copy backup to container
docker cp ./backups/student-portal student-portal-mongodb:/data/restore

# Restore MongoDB
docker-compose exec mongodb mongorestore \
  --db=student-portal \
  /data/restore/student-portal
```

## Summary

### Quick Reference

| Action | Command |
|--------|---------|
| Start all | `docker-compose up` |
| Start in background | `docker-compose up -d` |
| Stop all | `docker-compose down` |
| View logs | `docker-compose logs -f` |
| Rebuild | `docker-compose up --build` |
| Seed DB | `docker-compose exec backend npm run seed:db` |
| Access MongoDB | `docker-compose exec mongodb mongosh student-portal` |

### Ports

| Service | Port |
|---------|------|
| Frontend | 3000 |
| Backend | 3001 |
| MongoDB | 27017 |

### URLs

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **MongoDB**: mongodb://localhost:27017/student-portal

---

**The entire Student Portal application is now fully Dockerized and ready to deploy!** 🐳🚀

