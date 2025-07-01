# Environment Setup for AI Referrer Dashboard

## Required Environment Variables

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Backend (server/.env)
```
NODE_ENV=development
PORT=3001
FRONTEND_URL=http://localhost:3000

# Google OAuth Configuration
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
GOOGLE_REDIRECT_URI=http://localhost:3001/api/auth/callback
```

## Production Environment Variables (Render)

### Backend Service
- `NODE_ENV`: production
- `PORT`: 3001
- `GOOGLE_CLIENT_ID`: Your Google OAuth Client ID
- `GOOGLE_CLIENT_SECRET`: Your Google OAuth Client Secret
- `GOOGLE_REDIRECT_URI`: https://ai-referrer-backend.onrender.com/api/auth/callback
- `FRONTEND_URL`: https://ai-referrer-dashboard.onrender.com

### Frontend Service
- `NODE_ENV`: production
- `PORT`: 3000
- `NEXT_PUBLIC_API_URL`: https://ai-referrer-backend.onrender.com/api

## Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google Analytics API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:
   - Development: `http://localhost:3001/api/auth/callback`
   - Production: `https://ai-referrer-backend.onrender.com/api/auth/callback` 