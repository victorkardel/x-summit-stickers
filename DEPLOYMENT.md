# Cloudflare Workers Deployment Guide

This guide will help you deploy your X Summit Sticker Album to Cloudflare Workers.

## Prerequisites

1. **Cloudflare Account**: Sign up at [cloudflare.com](https://dash.cloudflare.com/sign-up)
2. **GitHub Repository**: Your code should be pushed to GitHub
3. **Wrangler CLI**: Already installed in this project

## Step 1: Get Your Cloudflare Credentials

### Get your Account ID:
1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Select any website or go to Workers & Pages
3. Your Account ID is visible in the right sidebar

### Create an API Token:
1. Go to [API Tokens](https://dash.cloudflare.com/profile/api-tokens)
2. Click "Create Token"
3. Use the "Edit Cloudflare Workers" template
4. Configure:
   - **Permissions**: Account > Cloudflare Workers Scripts > Edit
   - **Account Resources**: Include > Your Account
5. Click "Continue to summary" and then "Create Token"
6. **Copy the token immediately** (you won't see it again!)

## Step 2: Configure GitHub Secrets

1. Go to your GitHub repository
2. Navigate to **Settings** > **Secrets and variables** > **Actions**
3. Click **New repository secret** and add:

   - **Name**: `CLOUDFLARE_API_TOKEN`
     - **Value**: Paste your API token from Step 1

   - **Name**: `CLOUDFLARE_ACCOUNT_ID`
     - **Value**: Paste your Account ID from Step 1

## Step 3: Deploy

### Option A: Deploy via GitHub Actions (Recommended)

1. Push your code to the `main` branch:
   ```bash
   git add .
   git commit -m "Setup Cloudflare deployment"
   git push origin main
   ```

2. GitHub Actions will automatically:
   - Build your application
   - Deploy to Cloudflare Workers
   - You can monitor progress in the "Actions" tab

### Option B: Deploy Manually

1. Login to Cloudflare:
   ```bash
   pnpm wrangler login
   ```

2. Deploy:
   ```bash
   pnpm deploy
   ```

## Step 4: Access Your App

After deployment, Wrangler will provide a URL like:
```
https://x-summit-sticker-album.YOUR_SUBDOMAIN.workers.dev
```

Visit this URL to see your deployed sticker album!

## Local Development with Cloudflare

Test your app locally with Cloudflare Workers environment:

```bash
pnpm preview:cloudflare
```

This runs Wrangler in dev mode, simulating the Cloudflare Workers environment.

## Updating Your Deployment

Just push to the `main` branch, and GitHub Actions will automatically redeploy:

```bash
git add .
git commit -m "Update sticker album"
git push origin main
```

## Custom Domain (Optional)

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/) > Workers & Pages
2. Select your worker
3. Go to **Settings** > **Domains & Routes**
4. Click **Add Custom Domain**
5. Enter your domain and follow the instructions

## Troubleshooting

### Build Fails
- Check the GitHub Actions logs in the "Actions" tab
- Ensure all dependencies are in `package.json`
- Run `pnpm build` locally to test

### Deployment Fails
- Verify your API token has the correct permissions
- Check that Account ID is correct
- Ensure you haven't exceeded Cloudflare's free tier limits

### App Not Loading
- Check the Wrangler output for the deployed URL
- Look for errors in the Cloudflare Dashboard > Workers & Pages > Your Worker > Logs

## Cloudflare Workers Free Tier Limits

- 100,000 requests/day
- 10ms CPU time per request
- More than enough for a personal sticker album!

For higher limits, check out [Cloudflare Workers Pricing](https://workers.cloudflare.com/).

## Support

If you encounter issues:
1. Check [TanStack Start Docs](https://tanstack.com/start)
2. Visit [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
3. Review the original [deployment gist](https://gist.github.com/slawton3/509f61c8e764e544d063cdd93b53c363)
