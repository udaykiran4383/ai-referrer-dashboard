# AI Referrer Dashboard - Vercel Deployment Guide

## Overview
This guide covers deploying your AI Referrer Dashboard to Vercel. We'll deploy the frontend to Vercel and the backend to a separate service (Render/Railway).

## Prerequisites
- Vercel account (free tier available)
- GitHub repository with your code
- Google Analytics API credentials
- Backend deployment service (Render/Railway)

## Step 1: Deploy Backend First

### Option A: Deploy Backend to Render (Recommended)
1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Create a new Web Service
3. Connect your GitHub repository
4. Configure:
   - **Name**: `ai-referrer-backend`
   - **Environment**: `Node`
   - **Build Command**: `cd server && npm ci && npm run build`
   - **Start Command**: `cd server && npm start`
   - **Plan**: Free

5. **Environment Variables**:
   ```
   NODE_ENV=production
   PORT=3001
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   GOOGLE_REDIRECT_URI=https://ai-referrer-backend.onrender.com/api/auth/google/callback
   FRONTEND_URL=https://your-vercel-app.vercel.app
   ```

### Option B: Deploy Backend to Railway
1. Go to [Railway](https://railway.app/)
2. Create new project from GitHub
3. Select your repository
4. Set root directory to `server`
5. Add environment variables as above

## Step 2: Deploy Frontend to Vercel

### Method 1: Vercel Dashboard (Recommended)
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Configure project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./` (leave empty)
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm ci`

5. **Environment Variables**:
   ```
   NEXT_PUBLIC_API_URL=https://ai-referrer-backend.onrender.com/api
   ```

6. Click "Deploy"

### Method 2: Vercel CLI
1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy from project directory:
   ```bash
   vercel
   ```

4. Follow the prompts and set environment variables

## Step 3: Google Analytics Setup

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
   - Add them to your backend environment variables

## Step 4: Update CORS Configuration

Make sure your backend allows requests from your Vercel domain:

```javascript
// In server/src/server.ts
app.use(cors({
  origin: [
    'https://your-vercel-app.vercel.app',
    'http://localhost:3000' // for local development
  ],
  credentials: true
}));
```

## Step 5: Test Deployment

1. **Test Backend**: Visit `https://ai-referrer-backend.onrender.com/api/health`
2. **Test Frontend**: Visit your Vercel URL
3. **Test Authentication**: Try logging in with Google
4. **Test Analytics**: Verify data is loading correctly

## Environment Variables Summary

### Backend (Render/Railway)
```
NODE_ENV=production
PORT=3001
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URI=https://ai-referrer-backend.onrender.com/api/auth/google/callback
FRONTEND_URL=https://your-vercel-app.vercel.app
```

### Frontend (Vercel)
```
NEXT_PUBLIC_API_URL=https://ai-referrer-backend.onrender.com/api
```

## Troubleshooting

### Common Issues:
1. **CORS Errors**: Ensure FRONTEND_URL matches your Vercel domain exactly
2. **Build Failures**: Check Vercel build logs for dependency issues
3. **API Connection**: Verify NEXT_PUBLIC_API_URL points to correct backend
4. **Google Auth**: Ensure redirect URI matches exactly

### Vercel-Specific:
1. **Function Timeout**: Increase maxDuration in vercel.json if needed
2. **Build Cache**: Clear build cache in Vercel dashboard if needed
3. **Environment Variables**: Ensure they're set correctly in Vercel dashboard

## Benefits of Vercel Deployment

- **Automatic HTTPS**: SSL certificates included
- **Global CDN**: Fast loading worldwide
- **Automatic Deployments**: Deploy on every git push
- **Preview Deployments**: Test changes before merging
- **Analytics**: Built-in performance monitoring
- **Edge Functions**: Serverless functions at the edge

## Cost Considerations

- **Vercel Free Tier**: 100GB bandwidth, 100GB storage
- **Render Free Tier**: Backend services with sleep after inactivity
- **Upgrade**: Consider paid plans for production use

## Security Notes

- Never commit API keys to your repository
- Use Vercel's environment variable system
- Enable HTTPS (automatic on Vercel)
- Monitor your API usage and costs 