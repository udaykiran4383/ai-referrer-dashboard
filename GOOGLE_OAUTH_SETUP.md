# 🔧 Fix "Google hasn't verified this app" Error

This error occurs because your Google OAuth app is in development/testing mode. Follow these steps to fix it:

## 🚀 Quick Fix (Recommended for Development)

### Step 1: Create Environment File

Create `server/.env` with your Google OAuth credentials:

```bash
# Server Configuration
NODE_ENV=development
PORT=3001
FRONTEND_URL=http://localhost:3000

# Google OAuth Configuration
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
GOOGLE_REDIRECT_URI=http://localhost:3001/api/auth/google/callback
```

### Step 2: Set Up Google OAuth (Development Mode)

1. **Go to Google Cloud Console**
   - Visit: https://console.cloud.google.com/
   - Create a new project or select existing one

2. **Enable Google Analytics API**
   - Go to "APIs & Services" → "Library"
   - Search for "Google Analytics Data API (GA4)"
   - Click "Enable"

3. **Create OAuth 2.0 Credentials**
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth 2.0 Client IDs"
   - Application type: "Web application"
   - Name: "AI Referrer Dashboard (Development)"

4. **Configure OAuth Consent Screen**
   - Go to "APIs & Services" → "OAuth consent screen"
   - User Type: "External"
   - App name: "AI Referrer Dashboard"
   - User support email: Your email
   - Developer contact information: Your email

5. **Add Authorized Redirect URIs**
   - Development: `http://localhost:3001/api/auth/google/callback`
   - Production: `https://your-backend-domain.com/api/auth/google/callback`

6. **Add Test Users (Important!)**
   - In OAuth consent screen, go to "Test users"
   - Click "Add Users"
   - Add your email address and any other test users
   - **This is required for development mode**

7. **Copy Credentials**
   - Copy the Client ID and Client Secret
   - Add them to your `server/.env` file

### Step 3: Restart Servers

```bash
# Stop current servers (Ctrl+C)
# Then restart:

# Terminal 1: Backend
cd server && npm start

# Terminal 2: Frontend  
npm run dev
```

## 🔒 Production Setup (For Public Use)

If you want to make the app available to all users (not just test users):

### Step 1: Verify Your App

1. **Complete OAuth Consent Screen**
   - Add privacy policy URL
   - Add terms of service URL
   - Add app logo
   - Complete all required fields

2. **Submit for Verification**
   - Go to "OAuth consent screen"
   - Click "Submit for verification"
   - Google will review your app (can take weeks)

3. **Alternative: Use Internal App**
   - Change User Type to "Internal" (Google Workspace only)
   - No verification needed for internal users

### Step 2: Update Environment Variables

For production, update your environment variables:

```bash
# Production Environment
NODE_ENV=production
PORT=3001
FRONTEND_URL=https://your-frontend-domain.com
GOOGLE_CLIENT_ID=your_production_client_id
GOOGLE_CLIENT_SECRET=your_production_client_secret
GOOGLE_REDIRECT_URI=https://your-backend-domain.com/api/auth/google/callback
```

## 🐛 Troubleshooting

### Common Issues:

1. **"Google hasn't verified this app"**
   - ✅ **Solution**: Add your email as a test user in OAuth consent screen

2. **"Invalid redirect URI"**
   - ✅ **Solution**: Ensure redirect URI exactly matches in Google Console

3. **"Access denied"**
   - ✅ **Solution**: Enable Google Analytics API in your project

4. **"Client ID not found"**
   - ✅ **Solution**: Check environment variables are loaded correctly

### Debug Steps:

1. **Check Environment Variables**
   ```bash
   cd server
   node -e "console.log('Client ID:', process.env.GOOGLE_CLIENT_ID)"
   ```

2. **Check OAuth URL**
   ```bash
   curl http://localhost:3001/api/auth/google-auth-url
   ```

3. **Check Server Logs**
   - Look for OAuth-related errors in server console

## 📋 Checklist

- [ ] Google Cloud Project created
- [ ] Google Analytics Data API enabled
- [ ] OAuth 2.0 credentials created
- [ ] OAuth consent screen configured
- [ ] Test users added (for development)
- [ ] Redirect URIs configured
- [ ] Environment variables set
- [ ] Servers restarted

## 🎯 Quick Test

1. Visit: http://localhost:3000
2. Enter a valid GA4 Property ID
3. Click "Launch Dashboard"
4. Click "Connect with Google"
5. Sign in with your test user email
6. Should work without verification error!

## 📞 Need Help?

If you're still having issues:

1. **Check the server logs** for specific error messages
2. **Verify your Google Cloud Console** settings match this guide
3. **Ensure you're using a test user email** that you added to the OAuth consent screen
4. **Double-check environment variables** are loaded correctly

The key is adding your email as a test user in the OAuth consent screen - this bypasses the verification requirement for development! 