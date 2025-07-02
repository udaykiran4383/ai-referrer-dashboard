# AI Referrer Dashboard - Render Deployment Guide

## Prerequisites
- Render account
- Google Analytics API credentials
- GitHub repository with your code

## Deployment Steps

### 1. Backend Deployment (ai-referrer-backend)

1. **Create a new Web Service on Render**
   - Connect your GitHub repository
   - Name: `ai-referrer-backend`
   - Environment: `Node`
   - Plan: `Free`

2. **Build Configuration**
   - Build Command: `cd server && npm ci && npm run build`
   - Start Command: `cd server && npm start`

3. **Environment Variables**
   ```
   NODE_ENV=production
   PORT=3001
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   GOOGLE_REDIRECT_URI=https://ai-referrer-backend.onrender.com/api/auth/google/callback
   FRONTEND_URL=https://ai-referrer-dashboard.onrender.com
   ```

### 2. Frontend Deployment (ai-referrer-dashboard)

1. **Create a new Web Service on Render**
   - Connect your GitHub repository
   - Name: `ai-referrer-dashboard`
   - Environment: `Node`
   - Plan: `Free`

2. **Build Configuration**
   - Build Command: `npm ci --include=dev && npm run build`
   - Start Command: `npm start`

3. **Environment Variables**
   ```
   NODE_ENV=production
   PORT=3000
   NEXT_PUBLIC_API_URL=https://ai-referrer-backend.onrender.com/api
   NPM_CONFIG_PRODUCTION=false
   ```

## Google Analytics Setup

1. **Create Google Cloud Project**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one

2. **Enable Google Analytics API**
   - Go to APIs & Services > Library
   - Search for "Google Analytics Data API (GA4)"
   - Enable the API

3. **Create OAuth 2.0 Credentials**
   - Go to APIs & Services > Credentials
   - Click "Create Credentials" > "OAuth 2.0 Client IDs"
   - Application type: "Web application"
   - Authorized redirect URIs: `https://ai-referrer-backend.onrender.com/api/auth/google/callback`

4. **Get Your Credentials**
   - Copy the Client ID and Client Secret
   - Add them to your Render environment variables

## Important Notes

- **Deploy Backend First**: The frontend depends on the backend URL
- **CORS Configuration**: Backend is configured to allow requests from the frontend domain
- **Dependencies**: All dependencies are properly configured and tested
- **Build Process**: Both services use optimized build commands for production

## Troubleshooting

### Common Issues:
1. **Build Failures**: Ensure all dependencies are in package.json
2. **CORS Errors**: Check that FRONTEND_URL is correctly set
3. **Google Auth Issues**: Verify redirect URI matches exactly
4. **Port Issues**: Ensure PORT environment variables are set correctly

### Logs:
- Check Render logs for detailed error information
- Backend logs will show API request details
- Frontend logs will show build and runtime issues

## Post-Deployment

1. **Test Backend**: Visit `https://ai-referrer-backend.onrender.com/api/health`
2. **Test Frontend**: Visit `https://ai-referrer-dashboard.onrender.com`
3. **Test Authentication**: Try logging in with Google
4. **Test Analytics**: Verify data is loading correctly

## Security Notes

- Never commit API keys to your repository
- Use Render's environment variable system
- Enable HTTPS (automatic on Render)
- Monitor your API usage and costs 