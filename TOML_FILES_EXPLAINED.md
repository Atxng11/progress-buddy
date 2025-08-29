# TOML Files Explanation

## What are TOML files?

TOML files are **configuration files**, NOT environment variables. They tell the deployment platforms how to build and run your app.

## How they work:

### `netlify.toml` (Frontend - Netlify)
- **Location**: Root of your project (next to package.json)
- **What it does**: 
  - Tells Netlify to build with `npm run build`
  - Tells Netlify to serve files from the `dist` folder
  - Sets up URL redirects for single-page app routing
  - Sets environment variables for your frontend

- **How to use**: Just commit this file to your Git repository. When you deploy to Netlify, it automatically reads this file and follows the instructions.

### `server/railway.toml` (Backend - Railway)
- **Location**: Inside your `server` folder
- **What it does**:
  - Tells Railway this is a Node.js project
  - Tells Railway to start with `npm start`
  - Sets up health checks at `/api/health`

- **How to use**: Just commit this file to your Git repository. When you deploy to Railway, it automatically reads this file and follows the instructions.

## What you need to do:

1. ✅ **TOML files**: Already created - just commit them to Git
2. ⚙️ **Environment Variables**: Set these manually in the platform dashboards

### Railway Environment Variables (set in Railway dashboard):
```
NODE_ENV=production
EMAIL_USER=your-email@gmail.com  
EMAIL_PASS=your-app-password
FRONTEND_URL=https://your-netlify-app.netlify.app
```

### Netlify Environment Variables (set in Netlify dashboard):
```
VITE_API_URL=https://your-railway-app.railway.app/api
```

## Additional Files Created:

### `.nvmrc`
- Specifies Node.js version 20 for consistent development/deployment

### Updated `package.json` files
- Added Node.js engine requirements (>=20.0.0) to ensure compatibility

## Summary:
- **TOML files** = Configuration files (commit to Git)
- **Environment Variables** = Secret values (set in platform dashboards)
- **Node.js Version** = Now locked to version 20 for consistency