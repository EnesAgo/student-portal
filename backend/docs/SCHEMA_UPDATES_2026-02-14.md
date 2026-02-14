# Schema Updates - February 14, 2026

Summary of changes made to MongoDB schemas based on frontend requirements.

## Changes Made

### 1. User Schema - studentId Type Change
**Before:** `studentId: String (optional)`
**After:** `studentId: ObjectId (optional)`

**Reason:** ObjectId provides better data consistency and allows for potential references to other collections.

**Implementation:**
- Updated `user.schema.ts` to use `Types.ObjectId` type
- Updated `UsersService.create()` to convert string input to ObjectId
- Updated `UsersService.update()` to handle ObjectId conversion
- DTO remains string type (converted in service layer)

---

### 2. Mentor Schema - Major Updates

#### Removed Fields:
- ❌ `availability: Array<{ day, startTime, endTime }>` - REMOVED

**Reason:** The `isAvailable` boolean flag is sufficient. Complex availability scheduling not needed.

#### Added Fields from Frontend:
- ✅ `flag: String` - Country flag emoji
- ✅ `semester: Number` - Current semester number
- ✅ `image: String` - Profile image URL
- ✅ `email: String` - Contact email
- ✅ `about: String[]` (optional) - Detailed bio paragraphs
- ✅ `academicBackground: Object` (optional) - Academic details
  - `major: String`
  - `currentSemester: Number`
  - `focusAreas: String`
  - `experience: String`
- ✅ `personalInfo: Object` (optional) - Personal information
  - `languages: String`
  - `nationality: String`
  - `hobbies: String`
- ✅ `mentorshipFocus: Object` (optional) - Mentoring areas
  - `whoCanHelp: String`
  - `topics: String[]`

**Reason:** Match frontend data structure from `mentors.json.ts`. Optional fields allow flexibility.

**Implementation:**
- Updated `mentor.schema.ts` with all new fields
- Updated `create-mentor.dto.ts` with validation for new fields
- Added nested DTO classes for complex objects
- Made optional fields truly optional with `@IsOptional()`

---

### 3. MentorshipRequest Schema - Field Removal

#### Removed Fields:
- ❌ `proposedMeetingTime: Date` - REMOVED

**Reason:** Simplified connection flow. The main purpose is to connect students with mentors, not schedule meetings.

**Implementation:**
- Updated `mentorship-request.schema.ts`
- Updated `create-mentorship-request.dto.ts`
- Removed validation for this field

---

## Updated Schemas Overview

### User Schema (Final)
```typescript
{
  firstName: String (required)
  lastName: String (required)
  email: String (required, unique)
  password: String (required, hashed)
  role: Enum ["student", "admin"] (default: "student")
  isMentor: Boolean (default: false)
  studentId: ObjectId (optional)  // ← Changed to ObjectId
  phoneNumber: String (optional)
  profilePicture: String (optional)
  isActive: Boolean (default: true)
  lastLogin: Date (optional)
}
```

### Mentor Schema (Final)
```typescript
{
  userId: ObjectId (required, unique, ref: User)
  bio: String (required)
  languages: String[] (default: [])
  country: String
  flag: String  // ← Added
  majors: String[] (default: [])
  interests: String[] (default: [])
  semester: Number  // ← Added
  yearOfStudy: String
  image: String  // ← Added
  email: String  // ← Added
  rating: Number (default: 0)
  totalRatings: Number (default: 0)
  isAvailable: Boolean (default: true)
  // availability array REMOVED
  totalMentees: Number (default: 0)
  maxMentees: Number (default: 5)
  linkedIn: String (optional)
  instagram: String (optional)
  
  // Optional detailed fields
  about: String[] (optional)  // ← Added
  academicBackground: Object (optional)  // ← Added
  personalInfo: Object (optional)  // ← Added
  mentorshipFocus: Object (optional)  // ← Added
}
```

### MentorshipRequest Schema (Final)
```typescript
{
  studentId: ObjectId (required, ref: User)
  mentorId: ObjectId (required, ref: Mentor)
  message: String (required)
  status: Enum ["pending", "accepted", "rejected", "cancelled"]
  // proposedMeetingTime REMOVED
  responseMessage: String (optional)
  respondedAt: Date (optional)
}
```

---

## Migration Considerations

### For Existing Data:

1. **studentId conversion:**
   - Old string values like "S12345" need to be converted to valid ObjectIds
   - Or set to null if not valid

2. **Mentor availability:**
   - Remove `availability` arrays from existing documents
   - Keep `isAvailable` flag

3. **Mentor new fields:**
   - Existing mentors will have null/undefined for new fields
   - Can be populated gradually or remain optional

4. **MentorshipRequest proposedMeetingTime:**
   - Remove field from existing documents
   - No data loss since it's optional information

---

## Benefits of Changes

1. **Better Type Safety:** ObjectId for studentId ensures data consistency
2. **Simplified Availability:** Boolean flag easier to manage than complex schedules
3. **Frontend Alignment:** Mentor schema now matches frontend data structure
4. **Flexible Profiles:** Optional detailed fields allow rich or minimal profiles
5. **Cleaner Requests:** Removed unnecessary meeting time field

---

## Testing Checklist

- [x] User creation with ObjectId studentId
- [x] User update with studentId conversion
- [x] Mentor creation with all new fields
- [x] Mentor creation with only required fields (optional fields omitted)
- [x] MentorshipRequest creation without proposedMeetingTime
- [x] Build succeeds without errors
- [x] Documentation updated

---

## Files Modified

### Schemas:
- `src/users/schemas/user.schema.ts`
- `src/mentors/schemas/mentor.schema.ts`
- `src/mentorship-requests/schemas/mentorship-request.schema.ts`

### DTOs:
- `src/mentors/dto/create-mentor.dto.ts`
- `src/mentorship-requests/dto/create-mentorship-request.dto.ts`

### Services:
- `src/users/users.service.ts`

### Documentation:
- `docs/MONGODB_SCHEMAS_JSON.md`

---

## Next Steps

1. Test with real data from frontend
2. Consider adding migration script if there's existing data
3. Update API examples in documentation
4. Test Postman collection with new schema structure

