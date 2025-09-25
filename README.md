# SplitSmart Expense Tracker

## Overview
A full-stack expense tracking application with user authentication, built with React (frontend) and Node.js/Express (backend) using MySQL database.

## Local Development

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Database Setup
The backend uses MySQL. The database `split_smart` is created automatically when the server starts.

**Prerequisites:**
1. Install and start MySQL server
2. Update `backend/.env` with your MySQL credentials (default: root user, empty password)

### Backend
1. Navigate to backend directory: `cd backend`
2. Install dependencies: `npm install`
3. Copy `.env` file and update database credentials
4. Run in development mode: `npm run dev`
5. Or run in production mode: `npm start`

### Frontend
1. Install dependencies: `npm install`
2. Run: `npm run dev`

## Deployment

### Backend (Node.js/Express + MySQL)
Recommended platforms: Heroku, Railway, Render, DigitalOcean

1. **Heroku Deployment:**
   - Install Heroku CLI
   - `heroku create your-app-name`
   - Add MySQL addon: `heroku addons:create jawsdb:kitefin` (or similar MySQL addon)
   - Set environment variables: `heroku config:set JWT_SECRET=your-key NODE_ENV=production`
   - Commit code and push: `git push heroku main`

2. **Railway Deployment:**
   - Connect GitHub repo
   - Add MySQL database
   - Set environment variables in Railway dashboard
   - Deploy automatically

3. **Environment Variables:**
   - JWT_SECRET: Secure random string for JWT signing
   - DB_HOST: MySQL host
   - DB_USER: MySQL username
   - DB_PASSWORD: MySQL password
   - DB_NAME: MySQL database name
   - DB_PORT: MySQL port (default 3306)
   - CORS_ORIGINS: Frontend domains (comma-separated)
   - NODE_ENV: production/development

### Frontend (React/Vite)
Recommended: Vercel, Netlify

1. **Vercel:**
   - `npm install -g vercel`
   - `vercel --prod`
   - Update backend CORS to allow Vercel domain

2. **Build:**
   - `npm run build`
   - Deploy dist/ folder

## API Endpoints
- POST /api/register - User registration
- POST /api/login - User login
- GET /api/profile - Get user profile (requires auth)
- POST /api/logout - Logout (requires auth)
- GET /api/health - Health check

## Database
- Local: MySQL (create `split_smart` database)
- Production: MySQL (recommended) or other SQL databases

## Notes
- JWT tokens expire in 7 days
- Passwords are hashed with bcryptjs
- Update frontend API base URL in src/contexts/AuthContext.jsx for production backend URL
- Database tables are created automatically on server start
