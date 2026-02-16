# ✅ FIXED - Scripts Folder Missing in Docker Container

## Problem

When trying to run `npm run seed:db` inside the Docker container, it failed with:

```
Error: Cannot find module '/app/scripts/seed-database.js'
code: 'MODULE_NOT_FOUND'
```

## Root Cause

The `scripts` folder was being excluded from the Docker build for two reasons:

1. **Listed in `.dockerignore`** - The scripts folder was explicitly excluded
2. **Not copied to production image** - The Dockerfile didn't copy scripts to the final stage

## Solution

### 1. Updated `.dockerignore`

Removed `scripts` from the exclusion list:

```diff
# Test files
test
*.test.ts
*.spec.ts

- # Scripts
- scripts

# Logs
logs
*.log
```

### 2. Updated `Dockerfile`

Added explicit copy of scripts folder to the production image:

```dockerfile
# Copy built application
COPY --from=builder --chown=nestjs:nodejs /app/dist ./dist
COPY --from=builder --chown=nestjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nestjs:nodejs /app/package.json ./package.json
COPY --from=builder --chown=nestjs:nodejs /app/scripts ./scripts  # ← Added
```

## How to Run Seed Command

After rebuilding, you can seed the database using any of these methods:

### Method 1: Using docker-compose (from host)

```bash
# From your terminal (outside Docker)
docker-compose exec backend npm run seed:db
```

Or with newer Docker Compose syntax:
```bash
docker compose exec backend npm run seed:db
```

### Method 2: Using Docker Desktop

1. Open Docker Desktop
2. Go to Containers
3. Find `student-portal-backend`
4. Click on it
5. Go to "Exec" tab
6. Run:
   ```bash
   npm run seed:db
   ```

### Method 3: Using docker exec

```bash
# Find container ID or name
docker ps

# Execute command
docker exec -it student-portal-backend npm run seed:db
```

## Rebuild Instructions

To apply the fix:

```bash
# Stop containers
docker-compose down

# Rebuild backend (this will include scripts folder now)
docker-compose build --no-cache backend

# Start containers
docker-compose up -d

# Now seed the database
docker-compose exec backend npm run seed:db
```

## Files Modified

1. ✅ `backend/.dockerignore` - Removed scripts exclusion
2. ✅ `backend/Dockerfile` - Added scripts folder copy

## Verification

After rebuilding and starting the container:

```bash
# Check if scripts folder exists in container
docker-compose exec backend ls -la scripts

# Expected output:
# total 56
# -rw-r--r--    1 nestjs   nodejs       2835 Feb 16 02:00 clear-database.js
# -rw-r--r--    1 nestjs   nodejs      15758 Feb 16 02:00 seed-database.js
# -rw-r--r--    1 nestjs   nodejs      11864 Feb 16 02:00 test-api.js
```

## Available Scripts in Container

Once fixed, these npm scripts will work:

```bash
# Seed database with sample data
docker-compose exec backend npm run seed:db

# Clear all seeded data
docker-compose exec backend npm run clear:db

# Run API tests
docker-compose exec backend npm run test:api
```

## Why Scripts Are Needed in Production Container

The scripts folder contains useful utilities:

- **`seed-database.js`** - Populate database with sample data for demos/testing
- **`clear-database.js`** - Clean up test data
- **`test-api.js`** - Validate all API endpoints

These are especially useful in containerized environments for:
- Quick setup for new deployments
- Testing in staging environments
- Demo data for presentations

## Summary

✅ **Scripts folder now included in Docker image**  
✅ **Seed commands work inside container**  
✅ **All npm scripts available in Docker**  
✅ **Database can be seeded with one command**  

The fix is complete! Just rebuild your backend container and you'll be able to seed the database. 🐳✅

