import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { lead, businessPhone } = await req.json()

    // Get Twilio credentials from environment
    const accountSid = Deno.env.get('TWILIO_ACCOUNT_SID')
    const authToken = Deno.env.get('TWILIO_AUTH_TOKEN')
    const twilioPhone = Deno.env.get('TWILIO_PHONE_NUMBER')

    if (!accountSid || !authToken || !twilioPhone) {
      throw new Error('Twilio credentials not configured')
    }

    // Format SMS message
    const urgencyEmoji = {
      emergency: '🚨',
      urgent: '⚠️',
      routine: 'ℹ️'
    }

    const urgencyText = {
      emergency: 'EMERGENCY',
      urgent: 'URGENT',
      routine: 'ROUTINE'
    }

    let message = `${urgencyEmoji[lead.urgency || 'routine']} NEW ${urgencyText[lead.urgency || 'routine']} LEAD\n\n`
    
    message += `Name: ${lead.name}\n`
    message += `Phone: ${lead.phone}\n`
    
    if (lead.email) message += `Email: ${lead.email}\n`
    if (lead.truckMake) message += `Truck: ${lead.truckMake} ${lead.truckModel || ''}\n`
    if (lead.issue) message += `Issue: ${lead.issue}\n`
    if (lead.isFleet) message += `Fleet: ${lead.fleetSize || 'Yes'}\n`
    
    message += `\nType: ${lead.type.toUpperCase()}\n`
    message += `Time: ${new Date(lead.timestamp).toLocaleString()}\n`
    message += `Source: Chatbot\n\n`
    
    if (lead.urgency === 'emergency') {
      message += `🚨 CALL IMMEDIATELY: ${lead.phone}`
    } else {
      message += `📞 Call back: ${lead.phone}`
    }

    // Send SMS via Twilio
    const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`
    
    const formData = new URLSearchParams({
      From: twilioPhone,
      To: businessPhone,
      Body: message
    })

    const response = await fetch(twilioUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${btoa(`${accountSid}:${authToken}`)}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Twilio API error: ${response.status} ${errorText}`)
    }

    const result = await response.json()

    // Log the lead to Supabase for tracking
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { error: logError } = await supabase
      .from('chatbot_leads')
      .insert({
        lead_data: lead,
        notification_sent: true,
        notification_type: 'sms',
        twilio_message_sid: result.sid
      })

    if (logError) {
      console.error('Failed to log lead:', logError)
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'SMS notification sent successfully',
        twilioSid: result.sid
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )

  } catch (error) {
    console.error('SMS notification error:', error)
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})
