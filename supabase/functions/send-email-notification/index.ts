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
    const { lead, businessEmail } = await req.json()

    // Get Resend API key from environment
    const resendApiKey = Deno.env.get('RESEND_API_KEY')

    if (!resendApiKey) {
      throw new Error('Resend API key not configured')
    }

    // Format email message
    const urgencyColor = {
      emergency: '#dc2626',
      urgent: '#ea580c',
      routine: '#2563eb'
    }

    const urgencyText = {
      emergency: 'EMERGENCY',
      urgent: 'URGENT',
      routine: 'ROUTINE'
    }

    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>New ${lead.type} Lead - Golden Heavy Duty</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #1f2937; color: white; padding: 20px; text-align: center; }
          .content { background: #f9fafb; padding: 20px; }
          .urgent { background: ${urgencyColor[lead.urgency || 'routine']}; color: white; padding: 10px; text-align: center; font-weight: bold; }
          .section { margin: 20px 0; }
          .label { font-weight: bold; color: #374151; }
          .value { margin-left: 10px; }
          .footer { background: #e5e7eb; padding: 15px; text-align: center; font-size: 12px; color: #6b7280; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🚛 Golden Heavy Duty Truck Repair</h1>
            <h2>New ${lead.type.toUpperCase()} Lead</h2>
          </div>
          
          <div class="urgent">
            ${lead.urgency === 'emergency' ? '🚨 EMERGENCY - CALL IMMEDIATELY' : `${urgencyText[lead.urgency || 'routine']} - Respond Soon`}
          </div>
          
          <div class="content">
            <div class="section">
              <h3>📞 Contact Information</h3>
              <p><span class="label">Name:</span><span class="value">${lead.name}</span></p>
              <p><span class="label">Phone:</span><span class="value"><a href="tel:${lead.phone}">${lead.phone}</a></span></p>
              ${lead.email ? `<p><span class="label">Email:</span><span class="value"><a href="mailto:${lead.email}">${lead.email}</a></span></p>` : ''}
            </div>
            
            ${lead.truckMake ? `
            <div class="section">
              <h3>🚛 Vehicle Information</h3>
              <p><span class="label">Truck:</span><span class="value">${lead.truckMake} ${lead.truckModel || ''}</span></p>
            </div>
            ` : ''}
            
            <div class="section">
              <h3>🔧 Service Details</h3>
              <p><span class="label">Type:</span><span class="value">${lead.type}</span></p>
              <p><span class="label">Urgency:</span><span class="value">${lead.urgency || 'Not specified'}</span></p>
              ${lead.issue ? `<p><span class="label">Issue:</span><span class="value">${lead.issue}</span></p>` : ''}
              ${lead.isFleet ? `<p><span class="label">Fleet:</span><span class="value">${lead.fleetSize || 'Yes'}</span></p>` : ''}
            </div>
            
            <div class="section">
              <h3>⏰ Timing</h3>
              <p><span class="label">Received:</span><span class="value">${new Date(lead.timestamp).toLocaleString()}</span></p>
              <p><span class="label">Source:</span><span class="value">Website Chatbot</span></p>
            </div>
            
            ${lead.urgency === 'emergency' ? `
            <div class="section" style="background: #fef2f2; border: 2px solid #dc2626; padding: 15px; border-radius: 8px;">
              <h3 style="color: #dc2626;">🚨 EMERGENCY ACTION REQUIRED</h3>
              <p><strong>Call immediately:</strong> <a href="tel:${lead.phone}" style="color: #dc2626; font-weight: bold;">${lead.phone}</a></p>
            </div>
            ` : ''}
          </div>
          
          <div class="footer">
            <p>This lead was automatically generated from your website chatbot.</p>
            <p>Golden Heavy Duty Truck Repair | <a href="https://maps.app.goo.gl/iPsAmeqCzYmESgeT8" style="color: #d4af37;">806 Cedar St, Hudson, CO 80642</a></p>
          </div>
        </div>
      </body>
      </html>
    `

    // Send email via Resend
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Golden Heavy Duty <noreply@goldenheavyduty.com>',
        to: [businessEmail],
        subject: `🚛 ${lead.urgency === 'emergency' ? 'EMERGENCY' : 'New'} ${lead.type} Lead - ${lead.name}`,
        html: emailHtml,
        reply_to: lead.email || businessEmail
      })
    })

    if (!resendResponse.ok) {
      const errorText = await resendResponse.text()
      throw new Error(`Resend API error: ${resendResponse.status} ${errorText}`)
    }

    const result = await resendResponse.json()

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
        notification_type: 'email',
        resend_email_id: result.id
      })

    if (logError) {
      console.error('Failed to log lead:', logError)
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Email notification sent successfully',
        resendId: result.id
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )

  } catch (error) {
    console.error('Email notification error:', error)
    
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
