#!/bin/bash

echo "🔧 AI Referrer Dashboard - Environment Setup"
echo "============================================="
echo ""

# Check if .env file exists
if [ ! -f "server/.env" ]; then
    echo "📝 Creating server/.env file..."
    cat > server/.env << EOF
# Server Configuration
NODE_ENV=development
PORT=3001
FRONTEND_URL=http://localhost:3000

# Google OAuth Configuration
# Get these from Google Cloud Console: https://console.cloud.google.com/
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
GOOGLE_REDIRECT_URI=http://localhost:3001/api/auth/google/callback

# Supabase Configuration (optional)
SUPABASE_URL=your_supabase_url_here
SUPABASE_ANON_KEY=your_supabase_anon_key_here
EOF
    echo "✅ Created server/.env file"
else
    echo "✅ server/.env file already exists"
fi

echo ""
echo "📋 Next Steps:"
echo "1. Go to https://console.cloud.google.com/"
echo "2. Create a new project or select existing one"
echo "3. Enable Google Analytics Data API (GA4)"
echo "4. Create OAuth 2.0 credentials"
echo "5. Configure OAuth consent screen"
echo "6. Add your email as a test user"
echo "7. Update the GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in server/.env"
echo ""
echo "📖 See GOOGLE_OAUTH_SETUP.md for detailed instructions"
echo ""
echo "🚀 After setup, restart your servers:"
echo "   Terminal 1: cd server && npm start"
echo "   Terminal 2: npm run dev" 