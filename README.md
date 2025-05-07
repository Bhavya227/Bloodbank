# Blood Bank Management System

A full-stack application for managing blood donation, requests, and hospital information.

## Features

- User authentication (Admin, Donor, Hospital)
- Blood donation management
- Request processing
- Hospital directory
- User profiles and statistics

## Tech Stack

- **Frontend:** React.js, TailwindCSS, Vite
- **Backend:** Node.js, Express.js
- **Database:** MongoDB

## Deployment Instructions

1. Clone the repository
2. Install dependencies:
   ```
   npm run install:all
   ```
3. Set up environment variables:
   Create a `.env` file in the server directory with the following variables:
   ```
   PORT=5000
   MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/bloodbank
   JWT_SECRET=your_jwt_secret_key
   NODE_ENV=production
   ```
4. Build the client:
   ```
   npm run build
   ```
5. Start the application:
   ```
   npm start
   ```

## Development Setup

1. Start the server in development mode:
   ```
   npm run dev:server
   ```
2. Start the client in development mode:
   ```
   npm run dev:client
   ```
3. Or start both concurrently:
   ```
   npm run dev
   ```

## Deployment to Vercel

This project is configured for deployment to Vercel:

1. Connect your GitHub repository to Vercel
2. Add environment variables in the Vercel dashboard
3. Deploy with the default settings

## License

ISC 