# Configuration Module

This folder contains centralized configuration management for the application.

## Files

### `configuration.ts`
Main configuration factory that loads and structures environment variables.

**Exports:**
- `port` - Server port (default: 3001)
- `database.uri` - MongoDB connection string
- `jwt.secret` - JWT secret for authentication
- `jwt.expiresIn` - JWT token expiration time
- `cors.origin` - Allowed CORS origin
- `cors.credentials` - CORS credentials setting
- `nodeEnv` - Current environment (development/production/test)

**Usage:**
```typescript
import { ConfigService } from '@nestjs/config';

constructor(private configService: ConfigService) {}

const port = this.configService.get<number>('port');
const dbUri = this.configService.get<string>('database.uri');
const jwtSecret = this.configService.get<string>('jwt.secret');
```

### `validation.schema.ts`
Joi validation schema for environment variables. Ensures required variables are present and have correct types.

**Validates:**
- `NODE_ENV` - Must be 'development', 'production', or 'test'
- `PORT` - Must be a number
- `MONGODB_URI` - Required string
- `JWT_SECRET` - Required string
- `JWT_EXPIRATION` - String with default
- `CORS_ORIGIN` - String with default

**Benefits:**
- Fails fast on startup if required env vars are missing
- Type validation for environment variables
- Default values for optional variables

### `index.ts`
Barrel export file for easy imports.

## Environment Variables

Required variables in `.env`:
```env
MONGODB_URI=mongodb://localhost:27017/student-portal
JWT_SECRET=your-secret-key-change-in-production
NODE_ENV=development
PORT=3001
JWT_EXPIRATION=7d
CORS_ORIGIN=http://localhost:3000
```

## Integration

The configuration is loaded in `app.module.ts`:
```typescript
ConfigModule.forRoot({
  isGlobal: true,
  envFilePath: '.env',
  load: [configuration],
  validationSchema: validationSchema,
}),
```

This makes the configuration available globally throughout the application.

