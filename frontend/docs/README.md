# Frontend Documentation

This folder contains documentation for the Student Portal frontend application.

## Documentation Files

### Integration Documentation
- **[INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md)** - Complete guide for frontend-backend integration
  - Setup instructions
  - API integration details
  - Data transformation
  - Environment configuration
  - Troubleshooting

- **[INTEGRATION_COMPLETE.md](./INTEGRATION_COMPLETE.md)** - Integration summary
  - What was implemented
  - Features overview
  - API endpoints connected
  - Success metrics

### Fixes & Solutions
- **[OBJECTID_FIX.md](./OBJECTID_FIX.md)** - ObjectId casting error and hydration warning fixes
  - Problem descriptions
  - Root causes
  - Solutions implemented
  - Verification steps

## Quick Links

### Getting Started
1. Read [INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md) for setup
2. Check [INTEGRATION_COMPLETE.md](./INTEGRATION_COMPLETE.md) for feature overview
3. See [OBJECTID_FIX.md](./OBJECTID_FIX.md) if you encounter errors

### Key Topics

#### Setup & Configuration
- Environment variables (`.env.local`)
- Axios client configuration
- API service functions

#### Features
- Real-time mentor data fetching
- Dynamic filter options
- Loading and error states
- Data transformation

#### Troubleshooting
- 500 errors
- CORS issues
- Hydration warnings
- Connection problems

## Project Structure

```
frontend/
├── docs/                          # Documentation (you are here)
│   ├── README.md                  # This file
│   ├── INTEGRATION_GUIDE.md       # Integration guide
│   ├── INTEGRATION_COMPLETE.md    # Integration summary
│   └── OBJECTID_FIX.md           # Error fixes
├── src/
│   ├── app/                       # Next.js app directory
│   ├── components/                # React components
│   ├── lib/                       # Utilities (API client)
│   ├── services/                  # API services
│   ├── types/                     # TypeScript types
│   └── data/                      # Static data
├── .env.local                     # Environment variables
└── README.md                      # Main README
```

## Related Documentation

- **Backend Documentation**: `../backend/docs/`
- **Main README**: `../README.md`

## Contributing

When adding new documentation:
1. Create markdown file in this `docs/` folder
2. Update this README with a link to the new file
3. Use clear headings and code examples
4. Include troubleshooting sections

## Support

For issues or questions:
1. Check the relevant documentation file
2. Review troubleshooting sections
3. Check browser console for errors
4. Verify backend is running

