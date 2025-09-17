# Google Maps & Reviews Setup Guide

## 🗝️ API Key Setup

Your API key: `AIzaSyDJxXqKnS37YL02ObzRCUpG362jjlgYSL8`

## 📋 Google Cloud Console Configuration

### 1. Enable Required APIs
Go to [Google Cloud Console APIs](https://console.cloud.google.com/apis/library) and enable:

- ✅ **Places API** - For fetching Google Reviews
- ✅ **Maps JavaScript API** - For interactive maps with markers
- ✅ **Geocoding API** - For address to coordinates conversion
- ✅ **Maps Embed API** - For fallback embedded maps

### 2. Configure API Key Restrictions
In [API Keys section](https://console.cloud.google.com/apis/credentials):

**Application restrictions:**
- Select "HTTP referrers"
- Add these domains:
  - `localhost:3000/*` (development)
  - `yourdomain.com/*` (production)

**API restrictions:**
- Select "Restrict key"
- Choose these APIs:
  - Places API
  - Maps JavaScript API
  - Geocoding API
  - Maps Embed API

### 3. Billing Account
- Ensure billing is enabled (required for Google Maps APIs)
- Free tier includes $200/month credit

## 🔧 Environment Setup

Create a `.env.local` file in your project root:

```bash
# Google Places API Configuration
GOOGLE_PLACES_API_KEY=AIzaSyDJxXqKnS37YL02ObzRCUpG362jjlgYSL8
NEXT_PUBLIC_GOOGLE_PLACES_API_KEY=AIzaSyDJxXqKnS37YL02ObzRCUpG362jjlgYSL8
```

## 🎯 Features Implemented

### ✅ Google Reviews Integration
- Fetches live 5-star reviews from your Google My Business listing
- **Correct Place ID**: `ChIJK3AtkqE_bIcRhNNvo_WtrJg` (Golden Heavy Duty Repair)
- Displays review text, author, rating, and timestamp
- Fallback to curated reviews if API fails
- Links to your Google Maps listing

### ✅ Interactive Maps with Markers
- Custom markers for main location (golden) and service areas (gray)
- Clickable markers with info windows
- Responsive design with loading states
- Fallback to embedded map if JavaScript fails

### ✅ Service Areas Mapping
- 10+ service areas with accurate coordinates
- Visual coverage area representation
- Mobile-friendly interactive experience

## 🚀 What's Working Now

1. **Home Page**: "What Our Customers Say" section shows Google Reviews
2. **Service Areas Page**: Interactive map with location markers
3. **API Integration**: Server-side API route for fetching reviews
4. **Fallback Systems**: Graceful degradation if APIs fail

## 🔍 Testing

1. Start your development server: `npm run dev`
2. Visit `http://localhost:3000` to see Google Reviews
3. Visit `http://localhost:3000/service-areas` to see interactive map
4. Check browser console for any API errors

## 📊 Monitoring

Monitor your API usage in [Google Cloud Console](https://console.cloud.google.com/apis/dashboard):
- Places API calls
- Maps JavaScript API loads
- Geocoding requests

## 🛠️ Troubleshooting

**Reviews not loading?**
- Check API key restrictions
- Verify Places API is enabled
- Check browser console for errors

**Map not displaying?**
- Ensure Maps JavaScript API is enabled
- Check API key restrictions include your domain
- Verify billing account is active

**CORS errors?**
- Reviews are fetched server-side to avoid CORS issues
- Map loads client-side with proper API key

## 📈 Next Steps

1. **Add more service areas** - Update coordinates in `InteractiveGoogleMap.tsx`
2. **Customize map styling** - Modify map styles in the component
3. **Add review filtering** - Filter by rating or date
4. **Implement caching** - Cache reviews to reduce API calls
5. **Add analytics** - Track map interactions and review clicks

## 💡 Pro Tips

- Reviews are cached for better performance
- Map markers are optimized for mobile
- Fallback systems ensure site always works
- API key restrictions improve security
