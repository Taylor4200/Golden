-- Chatbot leads tracking table
CREATE TABLE public.chatbot_leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_data JSONB NOT NULL,
  notification_sent BOOLEAN DEFAULT FALSE,
  notification_type TEXT, -- 'sms', 'email', 'both'
  twilio_message_sid TEXT,
  resend_email_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add RLS for chatbot_leads
ALTER TABLE public.chatbot_leads ENABLE ROW LEVEL SECURITY;

-- Allow read access for authenticated users (admin panel)
CREATE POLICY "Enable read access for authenticated users" ON public.chatbot_leads 
FOR SELECT USING (auth.role() = 'authenticated');

-- Allow insert for all users (chatbot submissions)
CREATE POLICY "Enable insert for all users" ON public.chatbot_leads 
FOR INSERT WITH CHECK (true);

-- Allow update for authenticated users (admin updates)
CREATE POLICY "Enable update for authenticated users" ON public.chatbot_leads 
FOR UPDATE USING (auth.role() = 'authenticated');

-- Create index for better performance
CREATE INDEX idx_chatbot_leads_created_at ON public.chatbot_leads(created_at DESC);
CREATE INDEX idx_chatbot_leads_notification_sent ON public.chatbot_leads(notification_sent);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_chatbot_leads_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger for chatbot_leads table
CREATE TRIGGER update_chatbot_leads_updated_at
BEFORE UPDATE ON public.chatbot_leads
FOR EACH ROW
EXECUTE FUNCTION update_chatbot_leads_updated_at();

-- Sample data structure for lead_data JSONB field:
-- {
--   "type": "appointment|quote|emergency|general",
--   "name": "John Doe",
--   "phone": "+1234567890",
--   "email": "john@example.com",
--   "truckMake": "Freightliner",
--   "truckModel": "Cascadia",
--   "issue": "Engine won't start",
--   "urgency": "emergency|urgent|routine",
--   "isFleet": true,
--   "fleetSize": "10-50 trucks",
--   "timestamp": "2024-01-01T12:00:00Z",
--   "source": "chatbot"
-- }
