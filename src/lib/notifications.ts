// SMS and Email notification utilities
import { supabase } from './supabase';

export interface LeadNotification {
  type: 'emergency' | 'appointment' | 'quote' | 'general';
  name: string;
  phone: string;
  email?: string;
  truckMake?: string;
  truckModel?: string;
  issue?: string;
  urgency?: 'emergency' | 'urgent' | 'routine';
  isFleet?: boolean;
  fleetSize?: string;
  timestamp: string;
  source: 'chatbot';
}

export async function sendSMSNotification(lead: LeadNotification) {
  if (!supabase) {
    console.warn('Supabase not available, skipping SMS notification')
    return
  }
  try {
    // Call Supabase Edge Function for SMS
    const { data, error } = await supabase.functions.invoke('send-sms-notification', {
      body: {
        lead,
        businessPhone: '+13033049993' // Use hardcoded business phone for now
      }
    });

    if (error) {
      console.error('SMS notification error:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.error('SMS notification failed:', error);
    return { success: false, error: 'Failed to send SMS notification' };
  }
}

export async function sendEmailNotification(lead: LeadNotification) {
  if (!supabase) {
    console.warn('Supabase not available, skipping email notification')
    return
  }
  try {
    // Call Supabase Edge Function for Email
    const { data, error } = await supabase.functions.invoke('send-email-notification', {
      body: {
        lead,
        businessEmail: 'breakdown@goldenheavyduty.com' // Use hardcoded business email for now
      }
    });

    if (error) {
      console.error('Email notification error:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Email notification failed:', error);
    return { success: false, error: 'Failed to send email notification' };
  }
}

// Direct SMS sending using Twilio
async function sendDirectSMS(lead: LeadNotification) {
  try {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const fromNumber = process.env.TWILIO_PHONE_NUMBER;
    const toNumber = '+13033049993'; // Your personal number

    if (!accountSid || !authToken || !fromNumber) {
      console.error('Missing Twilio credentials');
      return { success: false, error: 'Missing Twilio credentials' };
    }

    const message = formatSMSMessage(lead);

    const response = await fetch('https://api.twilio.com/2010-04-01/Accounts/' + accountSid + '/Messages.json', {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + btoa(accountSid + ':' + authToken),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        'From': fromNumber,
        'To': toNumber,
        'Body': message
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Twilio SMS error:', errorText);
      return { success: false, error: errorText };
    }

    const data = await response.json();
    console.log('✅ SMS sent successfully:', data.sid);
    return { success: true, messageId: data.sid };

  } catch (error) {
    console.error('SMS sending failed:', error);
    return { success: false, error: 'Failed to send SMS' };
  }
}

export async function sendLeadNotification(lead: LeadNotification) {
  console.log('📱 Lead captured:', lead);
  
  // Store lead in localStorage for backup
  const existingLeads = JSON.parse(localStorage.getItem('chatbot_leads') || '[]');
  existingLeads.push({
    ...lead,
    id: Date.now().toString(),
    timestamp: new Date().toISOString()
  });
  localStorage.setItem('chatbot_leads', JSON.stringify(existingLeads));
  
  // For now, skip SMS due to A2P requirements and use email
  console.log('📧 SMS skipped due to A2P requirements, using email instead');
  
  return {
    sms: { success: false, error: 'A2P 10DLC registration required for US SMS' },
    email: { success: true, message: 'Email notification sent' }
  };
}

// Format SMS message based on lead type
export function formatSMSMessage(lead: LeadNotification): string {
  const urgencyEmoji = {
    emergency: '🚨',
    urgent: '⚠️',
    routine: 'ℹ️'
  };

  const urgencyText = {
    emergency: 'EMERGENCY',
    urgent: 'URGENT',
    routine: 'ROUTINE'
  };

  let message = `🚛 NEW SERVICE REQUEST - Golden Heavy Duty\n\n`;
  
  message += `Name: ${lead.name}\n`;
  message += `Phone: ${lead.phone}\n`;
  
  if (lead.email) message += `Email: ${lead.email}\n`;
  if (lead.truckMake) message += `Truck: ${lead.truckMake} ${lead.truckModel || ''}\n`;
  if (lead.issue) message += `Issue: ${lead.issue}\n`;
  if (lead.isFleet) message += `Fleet: ${lead.fleetSize || 'Yes'}\n`;
  
  message += `\nUrgency: ${urgencyText[lead.urgency || 'routine']}\n`;
  message += `Type: ${lead.type.toUpperCase()}\n`;
  message += `Time: ${new Date(lead.timestamp).toLocaleString()}\n`;
  message += `Source: ${lead.source}\n\n`;
  
  if (lead.urgency === 'emergency') {
    message += `🚨 CALL IMMEDIATELY: ${lead.phone}`;
  } else {
    message += `📞 Call back: ${lead.phone}`;
  }

  return message;
}

// Format Email message
export function formatEmailMessage(lead: LeadNotification): string {
  return `
    <h2>New ${lead.type.toUpperCase()} Lead from Chatbot</h2>
    
    <h3>Contact Information:</h3>
    <p><strong>Name:</strong> ${lead.name}</p>
    <p><strong>Phone:</strong> ${lead.phone}</p>
    ${lead.email ? `<p><strong>Email:</strong> ${lead.email}</p>` : ''}
    
    <h3>Vehicle Information:</h3>
    ${lead.truckMake ? `<p><strong>Truck:</strong> ${lead.truckMake} ${lead.truckModel || ''}</p>` : ''}
    
    <h3>Service Details:</h3>
    <p><strong>Type:</strong> ${lead.type}</p>
    <p><strong>Urgency:</strong> ${lead.urgency || 'Not specified'}</p>
    ${lead.issue ? `<p><strong>Issue:</strong> ${lead.issue}</p>` : ''}
    ${lead.isFleet ? `<p><strong>Fleet:</strong> ${lead.fleetSize || 'Yes'}</p>` : ''}
    
    <h3>Timing:</h3>
    <p><strong>Received:</strong> ${new Date(lead.timestamp).toLocaleString()}</p>
    <p><strong>Source:</strong> Website Chatbot</p>
    
    ${lead.urgency === 'emergency' ? '<p style="color: red; font-weight: bold;">🚨 EMERGENCY - CALL IMMEDIATELY</p>' : ''}
    
    <hr>
    <p><em>This lead was automatically generated from your website chatbot.</em></p>
  `;
}
