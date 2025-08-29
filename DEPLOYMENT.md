# Deployment Guide for Progress Buddy

This guide will help you deploy your Progress Buddy app with the frontend on Netlify and the backend on Railway.

## Prerequisites

- Git repository with your code
- Railway account (https://railway.app)
- Netlify account (https://netlify.com)

## Backend Deployment (Railway)

### Step 1: Deploy to Railway

1. Go to [Railway.app](https://railway.app) and sign in
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Railway will automatically detect it's a Node.js project

### Step 2: Configure Environment Variables

In your Railway project dashboard, go to Variables and add:

```
NODE_ENV=production
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
FRONTEND_URL=https://your-netlify-app.netlify.app
```

### Step 3: Set Root Directory

In Railway Settings:
- Set "Root Directory" to `server`
- This ensures Railway deploys from the server folder

### Step 4: Get Your API URL

Once deployed, copy your Railway app URL (e.g., `https://your-app-name.up.railway.app`)

## Frontend Deployment (Netlify)

### Step 1: Update Netlify Configuration

In your `netlify.toml` file, replace the placeholder URLs:

```toml
[context.production.environment]
  VITE_API_URL = "https://your-railway-app-url.railway.app/api"

[context.branch-deploy.environment]
  VITE_API_URL = "https://your-railway-app-url.railway.app/api"
```

### Step 2: Deploy to Netlify

1. Go to [Netlify.com](https://netlify.com) and sign in
2. Click "New site from Git"
3. Select your repository
4. Netlify will automatically detect the build settings from `netlify.toml`

### Step 3: Update Railway CORS Settings

Go back to Railway and update your `FRONTEND_URL` environment variable with your actual Netlify URL:

```
FRONTEND_URL=https://your-actual-netlify-app.netlify.app
```

## Environment Variables Summary

### Railway (Backend)
```
NODE_ENV=production
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
FRONTEND_URL=https://your-netlify-app.netlify.app
```

### Netlify (Frontend)
```
VITE_API_URL=https://your-railway-app.railway.app/api
```

## Testing Your Deployment

1. Visit your Netlify app URL
2. Try creating a new activity/goal
3. Test logging progress
4. If you've set up email credentials, test the notification feature

## Troubleshooting

### Common Issues:

1. **CORS Errors**: Make sure `FRONTEND_URL` in Railway matches your Netlify URL exactly
2. **API Connection Issues**: Verify `VITE_API_URL` in Netlify points to your Railway API
3. **Database Issues**: Railway automatically persists the SQLite database
4. **Email Issues**: Use Gmail App Passwords, not your regular password

### Checking Logs:

- **Railway**: Check logs in your Railway dashboard
- **Netlify**: Check build logs and function logs in Netlify dashboard

## Updates and Redeployment

- **Backend**: Push to your repository, Railway auto-deploys
- **Frontend**: Push to your repository, Netlify auto-deploys and rebuilds

Your Progress Buddy app should now be fully deployed and accessible worldwide!