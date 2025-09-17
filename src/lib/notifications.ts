// SMS and Email notification utilities
import { createClient } from '@supabase/supabase-js';

// Create client-side Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

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
  try {
    // Call Supabase Edge Function for Email
    const { data, error } = await supabase.functions.invoke('send-email-notification', {
      body: {
        lead,
        businessEmail: 'info@goldenheavyduty.com' // Use hardcoded business email for now
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

export async function sendLeadNotification(lead: LeadNotification) {
  // For now, just log the lead and return success
  // This allows the chatbot to work without requiring Edge Functions to be deployed
  console.log('📱 Lead captured:', lead);
  
  // Store lead in localStorage for now (can be viewed in browser dev tools)
  const existingLeads = JSON.parse(localStorage.getItem('chatbot_leads') || '[]');
  existingLeads.push({
    ...lead,
    id: Date.now().toString(),
    timestamp: new Date().toISOString()
  });
  localStorage.setItem('chatbot_leads', JSON.stringify(existingLeads));
  
  // TODO: Uncomment when Edge Functions are deployed
  // const [smsResult, emailResult] = await Promise.allSettled([
  //   sendSMSNotification(lead),
  //   sendEmailNotification(lead)
  // ]);

  // return {
  //   sms: smsResult.status === 'fulfilled' ? smsResult.value : { success: false, error: 'SMS failed' },
  //   email: emailResult.status === 'fulfilled' ? emailResult.value : { success: false, error: 'Email failed' }
  // };

  return {
    sms: { success: true, message: 'Lead logged (SMS not configured yet)' },
    email: { success: true, message: 'Lead logged (Email not configured yet)' }
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

  let message = `${urgencyEmoji[lead.urgency || 'routine']} NEW ${urgencyText[lead.urgency || 'routine']} LEAD\n\n`;
  
  message += `Name: ${lead.name}\n`;
  message += `Phone: ${lead.phone}\n`;
  
  if (lead.email) message += `Email: ${lead.email}\n`;
  if (lead.truckMake) message += `Truck: ${lead.truckMake} ${lead.truckModel || ''}\n`;
  if (lead.issue) message += `Issue: ${lead.issue}\n`;
  if (lead.isFleet) message += `Fleet: ${lead.fleetSize || 'Yes'}\n`;
  
  message += `\nType: ${lead.type.toUpperCase()}\n`;
  message += `Time: ${new Date(lead.timestamp).toLocaleString()}\n`;
  message += `Source: Chatbot\n\n`;
  
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
