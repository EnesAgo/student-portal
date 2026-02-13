# Seed Data Updated - Matches Frontend

The backend seed data has been updated to match the frontend constants exactly.

## Languages (10 total)
Matches `frontend/src/data/constants.ts` LANGUAGES array:
- German
- English
- Turkish
- Romanian
- Russian
- Italian
- Macedonian
- Albanian
- Latvian
- Luganda

## Countries (8 total)
Matches nationalities from `frontend/src/data/mentors.json.ts`:
- Germany
- Turkey
- Uganda
- Italy
- Romania
- Latvia
- Albania
- North Macedonia

## Majors (4 total)
Matches `frontend/src/data/constants.ts` MAJORS array:
- Software Engineering
- Cyber Security
- Data Science And AI
- Digital Industrial Engineering

## Verification

To seed the database with this data:
```bash
curl -X POST http://localhost:3001/languages/seed
curl -X POST http://localhost:3001/countries/seed
curl -X POST http://localhost:3001/majors/seed
```

All data now matches exactly what is defined in the frontend, ensuring consistency across the application.

