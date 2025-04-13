# FitFoodie Setup Guide

This guide provides detailed instructions for setting up and running the FitFoodie application.

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v14 or newer)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- Expo Go app on your mobile device for testing
- Git for version control

## Frontend Setup

### Clone the Repository

```bash
git clone <repository-url>
cd FitFoodie
```

### Install Dependencies

```bash
npm install
# or
yarn install
```

### Running the App

1. Start the development server:

```bash
npx expo start
```

2. Options for running the app:
   - Scan the QR code with the Expo Go app on your mobile device
   - Press 'a' to open on an Android emulator
   - Press 'i' to open on an iOS simulator
   - Press 'w' to open in a web browser

3. Development mode:
   - The app supports hot reloading, so changes will appear automatically
   - Shake your device or press 'r' in the terminal to reload
   - Press 'm' to toggle the menu

## Backend Setup

The backend is built with Flask and MongoDB Atlas. Follow these steps to set up the backend:

### Navigate to the Backend Directory

```bash
cd FitFoodie-Backend
```

### Set Up a Virtual Environment (Recommended)

```bash
# On macOS/Linux
python3 -m venv venv
source venv/bin/activate

# On Windows
python -m venv venv
venv\Scripts\activate
```

### Install Backend Dependencies

```bash
pip install -r requirements.txt
```

### Configure Environment Variables

Create a `.env` file in the backend directory with the following variables:

```
FLASK_APP=app.py
FLASK_ENV=development
SECRET_KEY=your_secret_key
MONGODB_URI=your_mongodb_connection_string
```

### Run the Backend Server

```bash
flask run
# or
python run.py
```

The backend server will start at `http://localhost:5000`.

## Connecting Frontend to Backend

By default, the frontend is configured to connect to the backend at `http://localhost:5000`. If you need to change this:

1. Open `FitFoodie/config.js`
2. Update the `API_BASE_URL` value to your backend URL

## Troubleshooting

### Common Issues

1. **Expo CLI not found**
   - Make sure you've installed Expo CLI globally: `npm install -g expo-cli`

2. **Cannot connect to development server**
   - Ensure your mobile device and computer are on the same network
   - Try using the "Tunnel" connection option in Expo

3. **Module not found errors**
   - Run `npm install` to ensure all dependencies are installed
   - Try clearing the Metro bundler cache: `npx expo start --clear`

4. **Backend connection issues**
   - Check that your backend server is running
   - Verify the API URL in `config.js` is correct
   - Ensure your firewall isn't blocking the connection

### Getting Help

If you encounter issues not covered here, please:
1. Check the existing issues on the GitHub repository
2. Create a new issue with detailed information about your problem

## Development Workflow

1. Create a new branch for your feature or bug fix
2. Make your changes
3. Test thoroughly on both iOS and Android
4. Submit a pull request

## Building for Production

### Expo Build

To create a production build:

```bash
expo build:android
# or
expo build:ios
```

Follow the prompts to complete the build process.

### EAS Build (Recommended for newer Expo projects)

```bash
npm install -g eas-cli
eas build --platform android
# or
eas build --platform ios
```

## Additional Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [Flask Documentation](https://flask.palletsprojects.com/)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
