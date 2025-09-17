# Environment Setup Instructions

## 🔧 **Create .env.local file**

Create a file named `.env.local` in your project root with:

```bash
# Google Places API Configuration
GOOGLE_PLACES_API_KEY=AIzaSyDJxXqKnS37YL02ObzRCUpG362jjlgYSL8
NEXT_PUBLIC_GOOGLE_PLACES_API_KEY=AIzaSyDJxXqKnS37YL02ObzRCUpG362jjlgYSL8

# Supabase Configuration (if you have these)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

## 🚨 **Important Notes**

1. **Restart your development server** after creating `.env.local`
2. **Client-side variables** must start with `NEXT_PUBLIC_`
3. **Server-side variables** don't need the prefix

## 🔍 **Troubleshooting Google Maps**

If Google Maps still fails to load:

1. **Check API Key Restrictions** in Google Cloud Console:
   - Go to [API Keys](https://console.cloud.google.com/apis/credentials)
   - Click on your API key
   - Under "Application restrictions", add:
     - `localhost:3000/*` (for development)
     - `yourdomain.com/*` (for production)

2. **Verify APIs are enabled**:
   - Places API
   - Maps JavaScript API
   - Geocoding API

3. **Check billing account** is linked to your project

## 🎯 **What Should Work Now**

- ✅ Text centering fixed on service areas page
- ✅ Google Maps with fallback embedded map
- ✅ Better error messages for debugging
- ✅ Live Google Reviews integration
- ✅ Proper API key handling
