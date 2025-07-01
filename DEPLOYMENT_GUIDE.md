# Deployment Guide for AI Referrer Dashboard

## Deploy to Render

### Prerequisites
1. Google Cloud Console account with OAuth 2.0 credentials
2. Render account (free tier available)
3. GitHub repository with your code

### Step 1: Prepare Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the following APIs:
   - Google Analytics Data API
   - Google Analytics Reporting API
4. Create OAuth 2.0 credentials:
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth 2.0 Client IDs"
   - Application type: "Web application"
   - Add authorized redirect URIs:
     - `https://ai-referrer-backend.onrender.com/api/auth/callback`
5. Note down your Client ID and Client Secret

### Step 2: Deploy Backend Service

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New" → "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `ai-referrer-backend`
   - **Environment**: `Node`
   - **Build Command**: `cd server && npm install && npm run build`
   - **Start Command**: `cd server && npm start`
   - **Plan**: Free

5. Add Environment Variables:
   - `NODE_ENV`: `production`
   - `PORT`: `3001`
   - `GOOGLE_CLIENT_ID`: Your Google Client ID
   - `GOOGLE_CLIENT_SECRET`: Your Google Client Secret
   - `GOOGLE_REDIRECT_URI`: `https://ai-referrer-backend.onrender.com/api/auth/callback`
   - `FRONTEND_URL`: `https://ai-referrer-dashboard.onrender.com`

6. Click "Create Web Service"

### Step 3: Deploy Frontend Service

1. In Render Dashboard, click "New" → "Web Service"
2. Connect the same GitHub repository
3. Configure the service:
   - **Name**: `ai-referrer-dashboard`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: Free

4. Add Environment Variables:
   - `NODE_ENV`: `production`
   - `PORT`: `3000`
   - `NEXT_PUBLIC_API_URL`: `https://ai-referrer-backend.onrender.com/api`

5. Click "Create Web Service"

### Step 4: Update Google OAuth Redirect URI

1. Go back to Google Cloud Console
2. Update your OAuth 2.0 credentials
3. Add the production redirect URI: `https://ai-referrer-backend.onrender.com/api/auth/callback`

### Step 5: Test Deployment

1. Wait for both services to deploy (usually 5-10 minutes)
2. Visit your frontend URL: `https://ai-referrer-dashboard.onrender.com`
3. Test the authentication flow
4. Verify that analytics data loads correctly

## Alternative: Using render.yaml (Blue-Green Deployment)

If you want to use the `render.yaml` file for easier deployment:

1. Push your code to GitHub with the `render.yaml` file
2. In Render Dashboard, click "New" → "Blueprint"
3. Connect your repository
4. Render will automatically create both services based on the configuration

## Troubleshooting

### Common Issues

1. **Build Failures**:
   - Check that all dependencies are in package.json
   - Verify TypeScript compilation
   - Check build logs in Render dashboard

2. **Authentication Errors**:
   - Verify Google OAuth credentials are correct
   - Check redirect URIs match exactly
   - Ensure Google Analytics API is enabled

3. **CORS Errors**:
   - Verify FRONTEND_URL environment variable is set correctly
   - Check that the frontend URL matches the backend CORS configuration

4. **API Connection Issues**:
   - Verify NEXT_PUBLIC_API_URL points to the correct backend URL
   - Check that both services are running and healthy

### Health Checks

- Backend health check: `https://ai-referrer-backend.onrender.com/health`
- Frontend: `https://ai-referrer-dashboard.onrender.com`

## Cost Considerations

- **Free Tier**: Both services can run on Render's free tier
- **Limitations**: Free tier services sleep after 15 minutes of inactivity
- **Upgrade**: Consider paid plans for production use with better performance

## Security Notes

- Never commit environment variables to your repository
- Use Render's environment variable management
- Regularly rotate Google OAuth credentials
- Monitor service logs for security issues 