# API-Football Setup Guide

## 🚨 IMPORTANT: You need an API key to see real data!

The app is currently not showing players because the API key is not configured. Follow these steps to get real football data:

## Step 1: Get Your API Key

1. Go to [API-Football Dashboard](https://dashboard.api-football.com/)
2. Sign up for a free account
3. Get your API key from the dashboard
4. The free plan includes 100 requests per day

## Step 2: Configure Your API Key

1. Open the `.env` file in your project root
2. Replace `your_api_key_here` with your actual API key:

```env
EXPO_PUBLIC_API_FOOTBALL_KEY=your_actual_api_key_here
```

## Step 3: Restart the App

1. Stop the development server (Ctrl+C)
2. Run `npm start` again
3. The app will now show real football data!

## What You'll See

Once configured, you'll see:
- ✅ **Player of the Week**: Top scorer from Premier League
- ✅ **Featured Players**: Real top scorers with stats
- ✅ **Trending Players**: Current trending players
- ✅ **Live Matches**: Real-time match data
- ✅ **Search**: Real leagues, teams, and matches

## API Features

The app uses these API endpoints:
- **Live Matches**: Real-time scores and match status
- **Top Scorers**: Player statistics and team info
- **Leagues**: Complete league information
- **Teams**: Team details and history

## Troubleshooting

If you still don't see data:
1. Check that your API key is correct
2. Make sure you've restarted the app after updating `.env`
3. Check the console for error messages
4. Verify your API key is active in the dashboard

## Free Plan Limits

- 100 requests per day
- All endpoints available
- Perfect for development and testing

Get your API key now and enjoy real football data! ⚽ 