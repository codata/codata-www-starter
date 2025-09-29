#!/bin/bash

# CODATA Website Deployment Script for nginx/Apache
# Deploys pre-built files from gh-pages branch
# Usage: ./deploy.sh [web-root-path] [web-user]

set -e

WEB_ROOT=${1:-"/usr/share/nginx/html"}
WEB_USER=${2:-"root"}
REPO_URL="https://github.com/codata/codata-www-starter.git"
TEMP_DIR="/tmp/codata-www-starter-$(date +%s)"

echo "🚀 Deploying CODATA website..."
echo "📁 Web root: $WEB_ROOT"
echo "� Web user: $WEB_USER"
echo "�🔗 Repository: $REPO_URL"

# Create temporary directory
mkdir -p "$TEMP_DIR"

# Clone the gh-pages-root branch (contains built files for root domain)
echo "📥 Downloading latest build from gh-pages-root branch..."
git clone -b gh-pages-root --single-branch --depth 1 "$REPO_URL" "$TEMP_DIR"

# Check if we have files
if [ ! "$(ls -A $TEMP_DIR)" ]; then
    echo "❌ Error: gh-pages-root branch is empty or doesn't exist!"
    echo "   Make sure the GitHub Actions workflow has run successfully."
    exit 1
fi

# Backup existing files (optional)
if [ -d "$WEB_ROOT" ] && [ "$(ls -A $WEB_ROOT 2>/dev/null)" ]; then
    BACKUP_DIR="/tmp/codata-www-starter-backup-$(date +%Y%m%d-%H%M%S)"
    echo "� Backing up existing files to $BACKUP_DIR"
    sudo cp -r "$WEB_ROOT" "$BACKUP_DIR"
    echo "   (Backup will be automatically cleaned up in 7 days)"
fi

# Deploy to web server
echo "🚚 Deploying files..."
sudo rsync -av --delete --exclude='.git' "$TEMP_DIR/" "$WEB_ROOT/"

# Set proper permissions
echo "🔐 Setting permissions..."
sudo chown -R "$WEB_USER:$WEB_USER" "$WEB_ROOT"
sudo find "$WEB_ROOT" -type d -exec chmod 755 {} \;
sudo find "$WEB_ROOT" -type f -exec chmod 644 {} \;

# Cleanup
echo "🧹 Cleaning up..."
rm -rf "$TEMP_DIR"

# Clean old backups (older than 7 days)
find /tmp -name "codata-www-starter-backup-*" -type d -mtime +7 -exec rm -rf {} \; 2>/dev/null || true

echo "✅ Deployment complete!"
echo "🌐 Your CODATA website is now live!"
echo ""
echo "📊 Deployment summary:"
echo "   Source: gh-pages-root branch (pre-built for root domain)"
echo "   Target: $WEB_ROOT"
echo "   Owner: $WEB_USER"
echo "   Files: $(find "$WEB_ROOT" -type f | wc -l) files deployed"
echo ""
echo "💡 To update in the future, just run this script again!"
echo "   The latest build will be automatically downloaded from GitHub."