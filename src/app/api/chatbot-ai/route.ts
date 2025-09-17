import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { message, context } = await request.json();

    // Simple keyword-based AI responses for truck repair context
    const responses = {
      greeting: [
        "Hello! Welcome to Golden Heavy Duty Truck Repair. I'm here to help with all your truck repair needs. How can I assist you today?",
        "Hi there! Thanks for reaching out to Golden Heavy Duty. What can I help you with today?",
        "Hello! I'm here to help with your truck repair needs. Whether you need emergency service, want to schedule an appointment, or have questions, I'm here to assist you.",
        "Hi! Welcome to Golden Heavy Duty. I'm ready to help with any truck repair questions or services you need. What's going on with your truck?"
      ],
      help: [
        "I understand you need help. Let me gather some information so I can connect you with the right person on our team.",
        "I'm here to help! Let me collect some details about your truck and the issue so I can get you the assistance you need.",
        "I can definitely help you with that. Let me gather some information about your truck and service requirements.",
        "I'm ready to help! Let me get some details about your situation so I can connect you with the right specialist."
      ],
      emergency: [
        "🚨 I understand this is urgent! Let me get you help right away. Our emergency team is standing by.",
        "🚨 Emergency situation detected! I'm connecting you with our 24/7 emergency response team immediately.",
        "🚨 I see you need immediate assistance. Let me get our emergency team on the line for you right now."
      ],
      engine: [
        "I can help with your engine issue! Our certified engine specialists are available. Let me gather some details.",
        "Engine problems can be serious. I'll connect you with our engine repair experts who can diagnose the issue quickly.",
        "Our engine specialists have years of experience with all makes and models. Let me get you connected."
      ],
      transmission: [
        "Transmission issues need expert attention. I'll connect you with our transmission specialists right away.",
        "Our transmission experts can diagnose and repair all types of transmission problems. Let me gather some details.",
        "Transmission repairs are our specialty. I'll get you connected with the right technician for your truck."
      ],
      brake: [
        "Brake issues are safety-critical! I'll connect you with our brake system specialists immediately.",
        "Our brake experts can handle all brake system repairs and DOT compliance. Let me get you the help you need.",
        "Brake problems require immediate attention. I'll connect you with our certified brake technicians."
      ],
      tire: [
        "Tire service is one of our specialties! I can help you with mounting, balancing, alignment, and repairs.",
        "Our tire experts can handle all your wheel and tire needs. Let me gather some information about your situation.",
        "Tire issues can affect safety and fuel efficiency. I'll connect you with our tire service specialists."
      ],
      electrical: [
        "Electrical problems can be tricky to diagnose. Our electrical specialists have the latest diagnostic equipment.",
        "Our certified electricians can handle all electrical system issues. Let me get you connected with the right expert.",
        "Electrical diagnostics require specialized equipment. I'll connect you with our electrical system specialists."
      ],
      quote: [
        "I'd be happy to help you get a free quote! Let me collect some information about your truck and service needs.",
        "Our quotes are always free and detailed. I'll gather the information needed to give you an accurate estimate.",
        "Getting a quote is easy! Let me collect some details about your truck and the service you need."
      ],
      appointment: [
        "Perfect! Let's get you scheduled. I'll need a few details about your truck and the service you need.",
        "Scheduling is simple! Let me gather some information to get you the best appointment time.",
        "I'll help you find the perfect appointment time. Let me collect some details about your service needs."
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
      fleet: [
        "Great! We specialize in fleet services. Let me get some details about your fleet and service needs.",
        "Our fleet services are comprehensive and cost-effective. I'll connect you with our fleet specialist.",
        "Fleet management is our expertise! Let me gather some information to provide you with the best fleet solution."
      ],
      default: [
        "I understand you need help. Let me gather some information so I can connect you with the right person on our team.",
        "I'm here to help with your truck repair needs. Let me collect some details to get you the assistance you need.",
        "I can help you with that! Let me gather some information about your truck and service requirements.",
        "I'm ready to assist you with your truck repair needs. Let me get some details about your situation.",
        "I can definitely help you with that. Let me collect some information to get you the right assistance."
      ]
    };

    // Determine response category based on message content
    const messageLower = message.toLowerCase();
    let category = 'default';
    
    // Greeting responses
    if (messageLower.includes('hello') || messageLower.includes('hi') || messageLower.includes('hey') || messageLower.includes('good morning') || messageLower.includes('good afternoon') || messageLower.includes('good evening')) {
      category = 'greeting';
    }
    // Help requests
    else if (messageLower.includes('help') || messageLower.includes('need help') || messageLower.includes('assistance') || messageLower.includes('problem') || messageLower.includes('issue') || messageLower.includes('broken') || messageLower.includes('fix') || messageLower.includes('repair')) {
      category = 'help';
    }
    // Emergency keywords
    else if (messageLower.includes('emergency') || messageLower.includes('urgent') || messageLower.includes('stuck') || messageLower.includes('broken down')) {
      category = 'emergency';
    }
    // Service-related keywords
    else if (messageLower.includes('engine')) {
      category = 'engine';
    } else if (messageLower.includes('transmission')) {
      category = 'transmission';
    } else if (messageLower.includes('brake')) {
      category = 'brake';
    } else if (messageLower.includes('tire')) {
      category = 'tire';
    } else if (messageLower.includes('electrical')) {
      category = 'electrical';
    } else if (messageLower.includes('price') || messageLower.includes('cost') || messageLower.includes('quote')) {
      category = 'quote';
    } else if (messageLower.includes('appointment') || messageLower.includes('schedule') || messageLower.includes('book')) {
      category = 'appointment';
    } else if (messageLower.includes('where') || messageLower.includes('location') || messageLower.includes('address')) {
      category = 'location';
    } else if (messageLower.includes('hours') || messageLower.includes('open') || messageLower.includes('closed')) {
      category = 'hours';
    } else if (messageLower.includes('fleet') || messageLower.includes('multiple') || messageLower.includes('company')) {
      category = 'fleet';
    }
    // General service keywords that should trigger form
    else if (messageLower.includes('service') || messageLower.includes('work') || messageLower.includes('maintenance') || messageLower.includes('inspection') || messageLower.includes('diagnostic') || messageLower.includes('truck') || messageLower.includes('vehicle')) {
      category = 'help';
    }

    // Get random response from the appropriate category
    const categoryResponses = responses[category as keyof typeof responses];
    const randomResponse = categoryResponses[Math.floor(Math.random() * categoryResponses.length)];

    return NextResponse.json({ 
      response: randomResponse,
      category,
      shouldShowForm: ['help', 'emergency', 'engine', 'transmission', 'brake', 'tire', 'electrical', 'quote', 'appointment', 'fleet', 'default'].includes(category)
    });

  } catch (error) {
    console.error('Error processing AI request:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
