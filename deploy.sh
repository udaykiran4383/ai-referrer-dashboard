#!/bin/bash

# AI Referrer Dashboard Deployment Script
echo "🚀 Starting deployment preparation..."

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Git repository not found. Please initialize git and push to GitHub first."
    exit 1
fi

# Check if all required files exist
echo "📋 Checking required files..."

required_files=(
    "package.json"
    "server/package.json"
    "server/src/server.ts"
    "app/page.tsx"
    "render.yaml"
)

for file in "${required_files[@]}"; do
    if [ ! -f "$file" ]; then
        echo "❌ Missing required file: $file"
        exit 1
    fi
done

echo "✅ All required files found"

# Check if environment variables are documented
if [ ! -f "ENVIRONMENT_SETUP.md" ]; then
    echo "⚠️  Warning: ENVIRONMENT_SETUP.md not found. Please create it for environment variable documentation."
fi

# Check if deployment guide exists
if [ ! -f "DEPLOYMENT_GUIDE.md" ]; then
    echo "⚠️  Warning: DEPLOYMENT_GUIDE.md not found. Please create it for deployment instructions."
fi

echo ""
echo "🎯 Deployment Checklist:"
echo "1. ✅ Project structure verified"
echo "2. ⏳ Push code to GitHub repository"
echo "3. ⏳ Set up Google OAuth credentials"
echo "4. ⏳ Deploy backend service on Render"
echo "5. ⏳ Deploy frontend service on Render"
echo "6. ⏳ Configure environment variables"
echo "7. ⏳ Test the deployment"
echo ""
echo "📚 Next steps:"
echo "1. Push this code to your GitHub repository"
echo "2. Follow the instructions in DEPLOYMENT_GUIDE.md"
echo "3. Set up your Google OAuth credentials"
echo "4. Deploy both services on Render"
echo ""
echo "🔗 Useful links:"
echo "- Render Dashboard: https://dashboard.render.com/"
echo "- Google Cloud Console: https://console.cloud.google.com/"
echo "- Deployment Guide: DEPLOYMENT_GUIDE.md"
echo ""
echo "✨ Good luck with your deployment!" 