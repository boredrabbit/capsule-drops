#!/bin/bash

# Capsule Drops Deploy Script
# Deploys to Netlify via their drop API

SITE_ID="tangerine-haupia-038440"
FILE="/Users/pmw/Desktop/capsule-drops-repo/index.html"

if [ ! -f "$FILE" ]; then
    echo "❌ Error: index.html not found"
    exit 1
fi

echo "🚀 Deploying Capsule Drops to Netlify..."

# Use Netlify's drop API to redeploy
curl -X POST \
  -F "files=@$FILE" \
  https://api.netlify.com/api/v1/sites/$SITE_ID/deploys \
  --silent --show-error

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Deploy successful!"
    echo "🌐 Live at: https://tangerine-haupia-038440.netlify.app/"
else
    echo "❌ Deploy failed. Check your connection."
fi
