# 📱 SMS & Email Notifications Setup Guide

## 🚀 Quick Setup (5 minutes)

### 1. **Twilio SMS Setup**
1. Go to [Twilio Console](https://console.twilio.com/)
2. Get your **Account SID** and **Auth Token**
3. Buy a phone number ($1/month)
4. Add to your `.env` file:
```bash
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_PHONE_NUMBER=+1234567890
```

### 2. **Resend Email Setup** (Optional)
1. Go to [Resend](https://resend.com/)
2. Get your API key
3. Add to your `.env` file:
```bash
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### 3. **Deploy Supabase Functions**
```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Link your project
supabase link --project-ref your-project-ref

# Deploy functions
supabase functions deploy send-sms-notification
supabase functions deploy send-email-notification
```

### 4. **Set Environment Variables in Supabase**
In your Supabase dashboard → Settings → Edge Functions:
```bash
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_PHONE_NUMBER=+1234567890
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### 5. **Run Database Schema**
```sql
-- Run the contents of supabase-chatbot-schema.sql in your Supabase SQL editor
```

## 📱 **How It Works**

### **SMS Notifications:**
- **Emergency leads** → Immediate SMS with 🚨
- **Appointment requests** → SMS with contact details
- **Quote requests** → SMS with customer info
- **Cost:** ~$0.0075 per SMS

### **Email Notifications:**
- **Professional HTML emails** with all lead details
- **Emergency alerts** with red styling
- **Clickable phone numbers** and email addresses
- **Cost:** Free (up to 3,000 emails/month)

### **Lead Tracking:**
- All leads stored in `chatbot_leads` table
- Notification status tracked
- Twilio/Resend IDs stored for reference

## 🎯 **Example SMS Messages**

**Emergency:**
```
🚨 NEW EMERGENCY LEAD

Name: John Smith
Phone: (303) 555-0123
Truck: Freightliner Cascadia
Issue: Engine won't start

Type: EMERGENCY
Time: 1/15/2024, 2:30:45 PM
Source: Chatbot

🚨 CALL IMMEDIATELY: (303) 555-0123
```

**Appointment:**
```
ℹ️ NEW ROUTINE LEAD

Name: Mike Johnson
Phone: (303) 555-0456
Email: mike@fleet.com
Truck: Kenworth T680
Issue: Brake inspection needed
Fleet: 25-50 trucks

Type: APPOINTMENT
Time: 1/15/2024, 2:35:12 PM
Source: Chatbot

📞 Call back: (303) 555-0456
```

## 🔧 **Testing**

1. **Test SMS:** Use the chatbot to submit an emergency request
2. **Test Email:** Submit a quote request
3. **Check Logs:** View `chatbot_leads` table in Supabase
4. **Monitor Costs:** Check Twilio dashboard for usage

## 💰 **Cost Breakdown**

- **Twilio SMS:** ~$0.0075 per message
- **Resend Email:** Free (3,000/month)
- **Supabase:** Free tier covers this usage
- **Total:** ~$5-20/month for typical business

## 🚨 **Emergency Features**

- **Instant notifications** for emergency requests
- **Priority messaging** with 🚨 emoji
- **Click-to-call** phone numbers
- **Location sharing** prompts
- **24/7 availability** emphasis

## 📊 **Admin Panel Integration**

The leads are automatically stored and can be viewed in your admin panel. Add this to your admin dashboard:

```typescript
// In your admin panel
const { data: leads } = await supabase
  .from('chatbot_leads')
  .select('*')
  .order('created_at', { ascending: false });
```

## 🔒 **Security**

- **RLS enabled** on all tables
- **API keys** stored securely in environment variables
- **Rate limiting** built into Twilio/Resend
- **No sensitive data** in client-side code

## 🎉 **You're Done!**

Your chatbot now sends instant SMS and email notifications for all leads. Emergency requests get immediate attention, and you'll never miss a potential customer again!

