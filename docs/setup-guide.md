# FitFoodie Setup Guide

This guide provides detailed instructions for setting up the FitFoodie development environment on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or later)
- **npm** (v6 or later)
- **Python** (v3.8 or later)
- **pip** (Python package manager)
- **MongoDB** (local installation or MongoDB Atlas account)
- **Git**

## Clone the Repository

```bash
git clone https://github.com/VIJAYRUR/paloAlto_frontend.git
cd paloAlto_frontend
```

## Frontend Setup

The frontend is a React Native application built with Expo.

### Install Dependencies

```bash
cd FitFoodie
npm install
```

### Environment Configuration

Create a `.env` file in the `FitFoodie` directory with the following content:

```
API_BASE_URL=http://localhost:5000/api
```

For production, replace with your actual API URL.

### Running the App

```bash
npx expo start
```

This will start the Expo development server. You can run the app on:

- **iOS Simulator**: Press `i` in the terminal
- **Android Emulator**: Press `a` in the terminal
- **Physical Device**: Scan the QR code with the Expo Go app

## Backend Setup

The backend is a Flask application with MongoDB.

### Install Dependencies

```bash
cd FitFoodie-Backend
pip install -r requirements.txt
```

### Database Configuration

#### Option 1: Local MongoDB

1. Ensure MongoDB is running locally
2. Create a `.env` file in the `FitFoodie-Backend` directory:

```
FLASK_APP=app.py
FLASK_ENV=development
MONGODB_URI=mongodb://localhost:27017/fitfoodie
JWT_SECRET_KEY=your-secret-key-change-in-production
```

#### Option 2: MongoDB Atlas

1. Create a MongoDB Atlas account and cluster
2. Get your connection string from MongoDB Atlas
3. Create a `.env` file in the `FitFoodie-Backend` directory:

```
FLASK_APP=app.py
FLASK_ENV=development
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/fitfoodie
JWT_SECRET_KEY=your-secret-key-change-in-production
```

### Running the Backend

```bash
python run.py
```

The API will be available at `http://localhost:5000/api`.

## Development Workflow

1. Start the backend server
2. Start the frontend Expo server
3. Make changes to the code
4. Test your changes in the app

## Common Issues and Solutions

### Backend Issues

- **MongoDB Connection Error**: Ensure MongoDB is running and the connection string is correct
- **Module Not Found Errors**: Make sure all dependencies are installed with `pip install -r requirements.txt`
- **Port Already in Use**: Change the port in `run.py` if port 5000 is already in use

### Frontend Issues

- **Dependency Errors**: Try deleting `node_modules` folder and running `npm install` again
- **Expo Connection Issues**: Ensure your device is on the same network as your development machine
- **Build Errors**: Check for syntax errors in your JavaScript files

## Testing

### Backend Tests

```bash
cd FitFoodie-Backend
python -m unittest discover tests
```

### Frontend Tests

```bash
cd FitFoodie
npm test
```

## Deployment

### Backend Deployment

The backend can be deployed to platforms like Heroku, AWS, or Google Cloud. See the [Backend Deployment Guide](./backend/deployment.md) for detailed instructions.

### Frontend Deployment

The React Native app can be built for production using Expo's build service or EAS Build. See the [Frontend Deployment Guide](./frontend/deployment.md) for detailed instructions.

## Additional Resources

- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [Expo Documentation](https://docs.expo.dev/)
- [Flask Documentation](https://flask.palletsprojects.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
