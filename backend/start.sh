#!/bin/bash

# Student Portal Backend - Quick Start Script

echo "🎓 Student Portal Backend - Quick Start"
echo "========================================"
echo ""

# Check if MongoDB is running
echo "Checking MongoDB connection..."
if ! nc -z localhost 27017 2>/dev/null; then
    echo "MongoDB is not running on localhost:27017"
    echo ""
    echo "Please start MongoDB:"
    echo "  Option 1: mongod"
    echo "  Option 2: docker run -d -p 27017:27017 --name mongodb mongo"
    echo ""
    exit 1
else
    echo "MongoDB is running"
fi

echo ""
echo "Starting NestJS server in development mode..."
echo ""

# Start the development server
npm run start:dev &
SERVER_PID=$!

# Wait for server to start
echo " Waiting for server to start..."
sleep 5

# Check if server is running
if ! curl -s http://localhost:3001 > /dev/null; then
    echo ""
    echo "Seeding reference data..."
    echo ""

    # Seed languages
    echo " Seeding languages..."
    curl -s -X POST http://localhost:3001/languages/seed > /dev/null

    # Seed countries
    echo "  Seeding countries..."
    curl -s -X POST http://localhost:3001/countries/seed > /dev/null

    # Seed majors
    echo "  Seeding majors..."
    curl -s -X POST http://localhost:3001/majors/seed > /dev/null

    echo ""
    echo "Reference data seeded successfully!"
fi

echo ""
echo "Backend is ready!"
echo ""
echo "API Base URL: http://localhost:3001"
echo ""
echo "Quick Links:"
echo "   - API Documentation: backend/docs/API_DOCUMENTATION.md"
echo "   - Project Overview: backend/docs/PROJECT_OVERVIEW.md"
echo "   - Architecture: backend/docs/ARCHITECTURE.md"
echo "   - Postman Collection: backend/postman_collection.json"
echo ""
echo "Test endpoints:"
echo "   curl http://localhost:3001/languages"
echo "   curl http://localhost:3001/countries"
echo "   curl http://localhost:3001/majors"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

# Wait for the server process
wait $SERVER_PID

