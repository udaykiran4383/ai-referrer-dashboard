# AI Referrer Dashboard

Track AI tool referrals in Google Analytics 4 with a privacy-first, enterprise-grade analytics solution.

## 🆕 Latest Updates

- ✅ **Fixed Property ID Bug**: No more duplicate property ID prompts after authentication
- ✅ **Improved OAuth Flow**: Streamlined authentication with automatic data loading
- ✅ **Enhanced UX**: Better loading states, success messages, and error handling
- ✅ **OAuth Setup Guide**: Complete guide to fix "Google hasn't verified this app" errors

## 🚀 Quick Start

### Prerequisites
- Google Analytics 4 property
- Google Cloud Console account
- Node.js 18+ and npm

### Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd ai-referrer-dashboard
   ```

2. **Install dependencies**
   ```bash
   # Install frontend dependencies
   npm install
   
   # Install backend dependencies
   cd server && npm install && cd ..
   ```

3. **Set up environment variables**
   ```bash
   # Frontend (.env.local)
   NEXT_PUBLIC_API_URL=http://localhost:3001/api
   
   # Backend (server/.env)
   NODE_ENV=development
   PORT=3001
   FRONTEND_URL=http://localhost:3000
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   GOOGLE_REDIRECT_URI=http://localhost:3001/api/auth/callback
   ```

4. **Set up Google OAuth**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Enable Google Analytics Data API
   - Create OAuth 2.0 credentials
   - Add redirect URI: `http://localhost:3001/api/auth/google/callback`
   - **Important**: Add your email as a test user in OAuth consent screen
   - **See**: [GOOGLE_OAUTH_SETUP.md](./GOOGLE_OAUTH_SETUP.md) for detailed instructions

5. **Run the development servers**
   ```bash
   # Terminal 1: Start backend
   cd server && npm run dev
   
   # Terminal 2: Start frontend
   npm run dev
   ```

6. **Visit the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001

## 🚀 Deploy to Render

### Option 1: Manual Deployment
Follow the detailed instructions in [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

### Option 2: Using Blueprint
1. Push your code to GitHub
2. In Render Dashboard, click "New" → "Blueprint"
3. Connect your repository
4. Render will automatically create both services using `render.yaml`

### Environment Variables for Production
See [ENVIRONMENT_SETUP.md](./ENVIRONMENT_SETUP.md) for complete environment variable documentation.

### Quick Setup Script
Run the setup script to create environment files:
```bash
./setup-env.sh
```

## 📊 Features

- **Privacy-First**: All data processing happens client-side
- **Zero Backend**: No data collection or storage
- **Instant Setup**: Just enter your GA4 Property ID
- **Visual Analytics**: Beautiful charts and insights
- **Export & Embed**: Download CSV reports or embed charts
- **AI Source Detection**: Automatically detects traffic from:
  - ChatGPT
  - Perplexity
  - Google Bard
  - Claude
  - Microsoft Copilot
  - You.com
  - And more

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend API   │    │  Google APIs    │
│   (Next.js)     │◄──►│   (Express)     │◄──►│  (Analytics)    │
│                 │    │                 │    │                 │
│ - React UI      │    │ - OAuth Proxy   │    │ - GA4 Data API  │
│ - Charts        │    │ - Rate Limiting │    │ - Analytics API │
│ - Export        │    │ - CORS          │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🔧 Configuration

### Google Analytics Setup
1. Ensure you have a GA4 property
2. Note your Property ID (numeric format, not G-XXXXXXXXXX)
3. Grant API access to your Google account

### OAuth Configuration
- **Client ID**: Your Google OAuth Client ID
- **Client Secret**: Your Google OAuth Client Secret
- **Redirect URI**: Must match exactly in Google Console

## 🛠️ Development

### Project Structure
```
├── app/                    # Next.js app directory
│   ├── dashboard/         # Dashboard pages
│   ├── page.tsx          # Landing page
│   └── layout.tsx        # Root layout
├── components/            # React components
│   ├── ui/               # UI components
│   └── *.tsx             # Feature components
├── server/               # Backend API
│   ├── src/              # TypeScript source
│   ├── package.json      # Backend dependencies
│   └── tsconfig.json     # TypeScript config
├── services/             # Frontend services
├── types/                # TypeScript types
└── render.yaml           # Render deployment config
```

### Available Scripts

**Frontend:**
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

**Backend:**
```bash
cd server
npm run dev          # Start development server
npm run build        # Build TypeScript
npm run start        # Start production server
```

## 🔒 Security

- **OAuth 2.0**: Secure Google authentication
- **Rate Limiting**: Prevents abuse
- **CORS**: Configured for production domains
- **Helmet**: Security headers
- **No Data Storage**: Credentials never stored

## 🐛 Troubleshooting

### Common Issues

1. **"Google hasn't verified this app" Error**
   - ✅ **Solution**: Add your email as a test user in OAuth consent screen
   - ✅ **See**: [GOOGLE_OAUTH_SETUP.md](./GOOGLE_OAUTH_SETUP.md) for complete guide

2. **Property ID Format**
   - Use numeric Property ID (123456789)
   - Not Measurement ID (G-XXXXXXXXXX)

3. **Authentication Errors**
   - Verify OAuth credentials
   - Check redirect URIs match exactly
   - Ensure Google Analytics API is enabled
   - Check port configuration (should be 3001)

4. **CORS Issues**
   - Verify FRONTEND_URL environment variable
   - Check domain configuration

5. **Build Failures**
   - Check TypeScript compilation
   - Verify all dependencies are installed

### Health Checks
- Backend: `GET /health`
- Frontend: Main page loads

## 📈 Performance

- **Caching**: 5-minute cache for analytics data
- **Rate Limiting**: 100 requests per 15 minutes
- **Optimized Queries**: Efficient GA4 API usage
- **Lazy Loading**: Components load on demand

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

- **Documentation**: Check the deployment guides
- **OAuth Issues**: See [GOOGLE_OAUTH_SETUP.md](./GOOGLE_OAUTH_SETUP.md)
- **Issues**: Create an issue on GitHub
- **Questions**: Check the troubleshooting section

---

**Made with ❤️ for the AI community** 