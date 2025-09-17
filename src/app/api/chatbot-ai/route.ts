import { NextRequest, NextResponse } from 'next/server';

// Free AI fallback using Cohere (more reliable than Hugging Face)
async function getAIFallbackResponse(userMessage: string, conversationHistory?: any[]): Promise<string> {
  try {
    const apiKey = process.env.COHERE_API_KEY;
    if (!apiKey) {
      console.log('No Cohere API key found, using fallback response');
      return "I'm an AI assistant for Golden Heavy Duty Truck Repair. I can help with truck repair questions, scheduling, and emergency assistance. What can I help you with today?";
    }

    // Use Cohere's new Chat API - much more reliable
    const response = await fetch('https://api.cohere.ai/v1/chat', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: process.env.COHERE_MODEL || 'command-r7b-12-2024',
        message: userMessage,
        chat_history: conversationHistory || [],
        system_prompt: `You are the AI chatbot for Golden Heavy Duty Truck Repair in Hudson, CO. You are NOT Command or any other AI model. You are specifically designed to help customers with truck repair questions, scheduling appointments, getting quotes, and emergency assistance. 

Your identity: You are Golden Heavy Duty's AI assistant, created specifically for this truck repair business. You know about truck repair, our services, and can help customers get the assistance they need.

Business Information:
- Phone: (303) 304-9993
- Address: 806 Cedar St, Hudson, CO 80642
- Hours: Monday-Friday 9AM-9PM, Saturday-Sunday 9AM-5PM, 24/7 Emergency Service

Always be friendly and professional. Keep responses concise and helpful. When asked about yourself, say you are the AI assistant for Golden Heavy Duty Truck Repair. When asked for phone number, contact info, or how to reach us, provide our phone number (303) 304-9993.

IMPORTANT: Only suggest forms, appointments, or quotes when the user actually needs service or asks for them. For general questions, just answer conversationally. Don't push forms on users who are just asking questions or making small talk.`,
        max_tokens: 200,
        temperature: 0.7
      }),
    });

    if (!response.ok) {
      console.log(`Cohere API error: ${response.status} ${response.statusText}`);
      const errorText = await response.text();
      console.log('Error details:', errorText);
      return "I'm an AI assistant for Golden Heavy Duty Truck Repair. I can help with truck repair questions, scheduling, and emergency assistance. What can I help you with today?";
    }

    const data = await response.json();
    console.log('Cohere API response:', data);
    
    if (data && data.text) {
      const aiResponse = data.text.trim();
      
      if (aiResponse && aiResponse.length > 10) {
        return aiResponse;
      }
    }
    
    // Fallback if AI response is too short or invalid
    return "I'm an AI assistant for Golden Heavy Duty Truck Repair. I can help with truck repair questions, scheduling, and emergency assistance. What can I help you with today?";
    
  } catch (error) {
    console.error('AI fallback error:', error);
    return "I'm an AI assistant for Golden Heavy Duty Truck Repair. I can help with truck repair questions, scheduling, and emergency assistance. What can I help you with today?";
  }
}

export async function POST(request: NextRequest) {
  try {
    const { message, context, conversationHistory } = await request.json();

    // Conversational AI responses for truck repair context
    const responses = {
      greeting: [
        "Hey there! 👋 I'm your AI assistant for Golden Heavy Duty Truck Repair. I'm here 24/7 to help with any truck issues you might have. What's going on with your rig?",
        "Hi! I'm an AI assistant that specializes in truck repair. I can help diagnose issues, schedule service, or get you emergency help. What's happening with your truck?",
        "Hello! I'm an AI assistant for Golden Heavy Duty. I'm pretty good at understanding truck problems and can get you connected with our expert mechanics. What's troubling your truck?",
        "Hey! I'm an AI assistant that knows a thing or two about trucks. Whether it's a weird noise, won't start, or just needs maintenance - I'm here to help! What's up?"
      ],
      help: [
        "I'm an AI assistant, so I can't physically fix your truck, but I'm really good at understanding problems and getting you connected with our expert mechanics! Let me gather some details so I can help you properly.",
        "As an AI, I can help diagnose issues and connect you with the right people. Let me ask a few questions about your truck so I can get you the best help possible.",
        "I'm an AI assistant that specializes in truck repair knowledge. While I can't turn wrenches myself, I can definitely help figure out what's wrong and get you connected with our certified mechanics.",
        "I'm here as an AI assistant to help troubleshoot and connect you with our team. Let me gather some info about your truck so I can get you the right assistance."
      ],
      emergency: [
        "🚨 Oh no! That sounds urgent! As an AI, I can't physically help, but I can definitely get our emergency team dispatched to you right away. Let me gather some quick details so they know exactly what they're dealing with.",
        "🚨 Emergency situation! I'm an AI assistant, but I'm programmed to get you immediate help. Our 24/7 emergency team is standing by - let me get them your info ASAP!",
        "🚨 That sounds serious! I'm an AI that specializes in emergency dispatch. Let me quickly collect your details so our emergency team can get to you fast."
      ],
      engine: [
        "Engine trouble, huh? As an AI, I can't pop the hood myself, but I'm pretty good at understanding engine issues! Let me ask some questions so I can connect you with our engine specialists who can actually fix it.",
        "Engine problems are my specialty! Well, diagnosing them anyway - I'm an AI so I can't actually turn wrenches. But I can definitely help figure out what's wrong and get you connected with our certified engine mechanics.",
        "Ah, engine issues! I'm an AI assistant that knows engines pretty well. Let me gather some details about what's happening so I can get you connected with our engine experts who can actually fix it."
      ],
      transmission: [
        "Transmission problems are tricky! I'm an AI that understands transmissions, but I'll need to connect you with our transmission specialists who can actually work on it. Let me get some details first.",
        "Transmission trouble? I'm an AI assistant that knows transmissions inside and out (theoretically anyway!). Let me ask a few questions so I can get you connected with our transmission experts.",
        "Transmission issues can be complex! As an AI, I can help diagnose the problem, but I'll need to connect you with our certified transmission specialists for the actual repair."
      ],
      brake: [
        "Brake problems are serious business! I'm an AI that takes safety very seriously. Let me gather some details about your brake issue so I can get you connected with our brake specialists ASAP.",
        "Brake issues are critical! As an AI assistant, I can't physically check your brakes, but I can definitely help get you connected with our certified brake technicians who can.",
        "Safety first! I'm an AI that knows brakes are nothing to mess with. Let me get some details about your brake problem so I can connect you with our brake experts."
      ],
      tire: [
        "Tire issues? I'm an AI that knows tires can make or break your day! Let me gather some details about your tire problem so I can get you connected with our tire service team.",
        "Tire trouble! As an AI assistant, I can't change tires myself, but I can definitely help you get connected with our tire specialists who can get you back on the road.",
        "Tire problems are frustrating! I'm an AI that understands tire issues. Let me ask a few questions so I can connect you with our tire service experts."
      ],
      electrical: [
        "Electrical gremlins! I'm an AI that actually understands electrical systems pretty well! Let me gather some details about your electrical issue so I can connect you with our electrical specialists.",
        "Electrical problems can be mysterious! As an AI assistant, I'm good at troubleshooting electrical issues (in theory!). Let me get some info so I can connect you with our electrical experts.",
        "Electrical issues are tricky! I'm an AI that knows electrical systems, but I'll need to connect you with our certified electrical technicians who can actually fix it."
      ],
      quote: [
        "I'd love to help you get a free quote! As an AI, I can't give you exact prices, but I can definitely gather your info and connect you with our team who can give you a detailed estimate.",
        "Free quotes are my specialty! Well, gathering the info for them anyway. Let me ask some questions about your truck so I can get you connected with our team for an accurate estimate.",
        "Getting quotes is easy with me! I'm an AI that knows how to collect the right info. Let me gather some details about your truck so our team can give you a proper estimate."
      ],
      appointment: [
        "Perfect! Let's get you scheduled. As an AI, I can't actually book appointments myself, but I can gather your info and connect you with our scheduling team!",
        "Scheduling is simple! I'm an AI assistant that knows how to get you the best appointment times. Let me collect some details so I can connect you with our team.",
        "I'll help you find the perfect appointment time! Let me gather some info about your truck and service needs so I can get you connected with our scheduling team."
      ],
      location: [
        "We're located at 806 Cedar St, Hudson, CO 80642. We serve Hudson, Fort Collins, Greeley, and surrounding Colorado areas.",
        "Our shop is conveniently located off I-76 in Hudson, CO. We serve the entire Northern Colorado region.",
        "You can find us at 806 Cedar St in Hudson, CO. We're easily accessible from I-76 and serve the surrounding areas."
      ],
      hours: [
        "We're open Monday-Friday 9AM-9PM, Saturday-Sunday 9AM-5PM. We provide 24/7 emergency roadside assistance.",
        "Regular hours are Monday-Friday 9AM-9PM, weekends 9AM-5PM. Emergency service is available 24/7.",
        "Our shop hours are Monday-Friday 9AM-9PM, Saturday-Sunday 9AM-5PM. Emergency assistance is always available."
      ],
      phone: [
        "You can reach us at (303) 304-9993. We're available 24/7 for emergency roadside assistance!",
        "Our phone number is (303) 304-9993. Call us anytime for emergency service or to schedule an appointment.",
        "Give us a call at (303) 304-9993. We provide 24/7 emergency service and regular business hours support."
      ],
      fleet: [
        "Great! We specialize in fleet services. Let me get some details about your fleet and service needs.",
        "Our fleet services are comprehensive and cost-effective. I'll connect you with our fleet specialist.",
        "Fleet management is our expertise! Let me gather some information to provide you with the best fleet solution."
      ],
      default: [
        "I'm an AI assistant that specializes in truck repair, so I can help with most truck-related questions! While I can't physically fix your truck, I'm really good at understanding problems and getting you connected with our expert mechanics.",
        "As an AI, I'm here to help troubleshoot and connect you with our team! I can understand most truck issues and get you the right help. Let me gather some details about your situation.",
        "I'm an AI assistant that knows trucks pretty well! I can help diagnose issues and connect you with our certified mechanics. Let me ask a few questions so I can get you the best assistance.",
        "I'm here as an AI to help with your truck needs! I can't turn wrenches myself, but I'm great at understanding problems and getting you connected with our expert team.",
        "I'm an AI that specializes in truck repair knowledge! Let me gather some information about your truck so I can connect you with the right people who can actually help."
      ]
    };

    // Determine response category based on message content
    const messageLower = message.toLowerCase();
    let category = 'default';
    
    // Enhanced fuzzy intent detection
    const intentPatterns = {
      greeting: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening', 'greetings'],
      help: ['help', 'need help', 'assistance', 'problem', 'issue', 'broken', 'fix', 'repair', 'trouble', 'malfunction'],
      emergency: ['emergency', 'urgent', 'stuck', 'broken down', 'stranded', 'asap', 'immediately', 'help me', 'need help now', 'critical', 'desperate'],
      engine: ['engine', 'motor', 'won\'t start', 'cranks', 'stalls', 'overheating', 'smoke', 'knocking', 'rough idle'],
      transmission: ['transmission', 'gearbox', 'shifting', 'clutch', 'automatic', 'manual', 'gear', 'stuck in gear'],
      brake: ['brake', 'brakes', 'stopping', 'pedal', 'squeaking', 'grinding', 'soft pedal', 'pulling'],
      tire: ['tire', 'tyre', 'flat', 'blowout', 'tread', 'alignment', 'balancing', 'pressure'],
      electrical: ['electrical', 'wiring', 'battery', 'alternator', 'starter', 'lights', 'fuse', 'short circuit'],
      quote: ['price', 'cost', 'quote', 'estimate', 'how much', 'pricing', 'rates'],
      appointment: ['appointment', 'schedule', 'book', 'reserve', 'time slot', 'availability'],
      location: ['where', 'location', 'address', 'directions', 'find', 'located'],
      hours: ['hours', 'open', 'closed', 'business hours', 'operating hours', 'when open'],
      phone: ['phone', 'number', 'call', 'contact', 'telephone', 'reach', 'get in touch'],
      fleet: ['fleet', 'multiple', 'company', 'business', 'commercial', 'fleet management']
    };

    // Check for fuzzy matches with word boundaries to avoid false positives
    for (const [intent, patterns] of Object.entries(intentPatterns)) {
      if (patterns.some(pattern => {
        // Use word boundaries for exact word matches
        const regex = new RegExp(`\\b${pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
        return regex.test(messageLower);
      })) {
        category = intent;
        break;
      }
    }

    // Hybrid system: Use pre-written responses for critical intents, AI for others
    const criticalIntents = ['emergency', 'location', 'hours', 'phone', 'quote', 'appointment'];
    let finalResponse: string;
    let shouldShowForm: boolean;

    if (criticalIntents.includes(category)) {
      // Use pre-written responses for critical intents (reliable, safe)
      const categoryResponses = responses[category as keyof typeof responses];
      finalResponse = categoryResponses[Math.floor(Math.random() * categoryResponses.length)];
      shouldShowForm = ['emergency', 'quote', 'appointment'].includes(category);
    } else {
      // Use AI fallback for other categories (flexible, conversational)
      const aiResponse = await getAIFallbackResponse(message, conversationHistory);
      finalResponse = aiResponse;
      
      // Smart form detection - only show form if user actually needs service
      const serviceKeywords = ['appointment', 'quote', 'schedule', 'book', 'service', 'repair', 'fix', 'help me', 'need help', 'broken', 'issue', 'problem', 'engine', 'transmission', 'brake', 'tire', 'electrical'];
      const hasServiceKeywords = serviceKeywords.some(keyword => {
        const regex = new RegExp(`\\b${keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
        return regex.test(message.toLowerCase());
      });
      const aiSuggestsForm = aiResponse.toLowerCase().includes('form') || aiResponse.toLowerCase().includes('appointment') || aiResponse.toLowerCase().includes('quote');
      
      // Only show form if user is asking for actual service, not general questions
      const isGeneralQuestion = message.toLowerCase().includes('what model') || 
                               message.toLowerCase().includes('how are you') || 
                               message.toLowerCase().includes('who are you') ||
                               message.toLowerCase().includes('what are you') ||
                               message.toLowerCase().includes('tell me about');
      
      // Combine both user intent and AI suggestion for form detection
      shouldShowForm = (hasServiceKeywords || aiSuggestsForm) && !isGeneralQuestion;
    }

    return NextResponse.json({ 
      response: finalResponse,
      category,
      shouldShowForm,
      isAIResponse: !criticalIntents.includes(category)
    });

  } catch (error) {
    console.error('Error processing AI request:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
