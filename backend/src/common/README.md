# Common Module

This folder contains shared utilities, decorators, guards, filters, and interceptors used across the application.

## Current Contents

### Decorators (`decorators/`)

#### `public.decorator.ts`
Marks routes as public (bypass authentication).

**Usage:**
```typescript
@Public()
@Get('health')
getHealth() {
  return { status: 'ok' };
}
```

#### `roles.decorator.ts`
Specifies required roles for route access.

**Usage:**
```typescript
import { Roles } from '@common/decorators/roles.decorator';
import { UserRole } from '@users/schemas/user.schema';

@Roles(UserRole.ADMIN)
@Get('admin-only')
adminOnlyRoute() {
  return { message: 'Admin access granted' };
}
```

### Filters (`filters/`)

#### `http-exception.filter.ts`
Global exception handler that formats error responses consistently.

**Features:**
- Catches all exceptions
- Formats error responses with timestamp
- Returns proper HTTP status codes

**Usage in `main.ts`:**
```typescript
import { AllExceptionsFilter } from './common/filters/http-exception.filter';

app.useGlobalFilters(new AllExceptionsFilter());
```

### Interceptors (`interceptors/`)

#### `logging.interceptor.ts`
Logs HTTP requests with method, URL, status code, and response time.

**Usage in `main.ts`:**
```typescript
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';

app.useGlobalInterceptors(new LoggingInterceptor());
```

**Output example:**
```
GET /users 200 - 45ms
POST /mentors 201 - 123ms
```

## Future Additions

### Guards (`guards/`)
To be added when implementing authentication:
- **JwtAuthGuard** - JWT authentication guard
- **RolesGuard** - Role-based authorization guard
- **ThrottlerGuard** - Rate limiting

### Pipes (`pipes/`)
Custom validation pipes:
- **ParseObjectIdPipe** - Validate MongoDB ObjectIds
- **TrimPipe** - Trim string inputs

### Additional Interceptors
- **TransformInterceptor** - Transform response data
- **TimeoutInterceptor** - Request timeout handling
- **CacheInterceptor** - Response caching

## Usage Examples

### Import from common module:
```typescript
import { 
  Public, 
  Roles, 
  AllExceptionsFilter, 
  LoggingInterceptor 
} from './common';
```

### Apply decorators:
```typescript
@Controller('users')
export class UsersController {
  @Public()
  @Get('public')
  publicRoute() {
    return { message: 'Anyone can access this' };
  }

  @Roles(UserRole.ADMIN)
  @Get('admin')
  adminRoute() {
    return { message: 'Admin only' };
  }
}
```

## Best Practices

1. **Keep it generic** - Only add utilities used by multiple modules
2. **Document usage** - Add JSDoc comments to decorators and utilities
3. **Export via index.ts** - Use barrel exports for cleaner imports
4. **Test thoroughly** - Add unit tests for guards and interceptors

