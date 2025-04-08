#!/bin/bash

# Create scripts directory if it doesn't exist
mkdir -p scripts

# Script to start the FitFoodie app
echo "Starting FitFoodie app..."

# Check if node_modules exists, if not, install dependencies
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm install
fi

# Start the app with Expo
echo "Starting Expo server..."
npx expo start --clear

# Exit with the same code as the Expo command
exit $?
