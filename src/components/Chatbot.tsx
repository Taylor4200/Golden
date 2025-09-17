'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, 
  X, 
  Phone, 
  Wrench, 
  FileText, 
  HelpCircle,
  Truck,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { useSiteSettings } from '@/hooks/useSiteSettings';
import { sendLeadNotification, type LeadNotification } from '@/lib/notifications';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  type?: 'text' | 'options' | 'form' | 'emergency';
  options?: ChatOption[];
  formData?: Record<string, string>;
}

interface ChatOption {
  id: string;
  text: string;
  icon: React.ReactNode;
  action: string;
}

interface LeadData {
  name: string;
  phone: string;
  email: string;
  truckMake: string;
  truckModel: string;
  issue: string;
  isFleet: boolean;
  fleetSize?: string;
  preferredContact: 'phone' | 'email';
  urgency: 'emergency' | 'urgent' | 'routine';
}

export default function Chatbot() {
  const { settings } = useSiteSettings();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentStep, setCurrentStep] = useState('greeting');
  const [leadData, setLeadData] = useState<Partial<LeadData>>({});
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, currentStep]);

  const quickOptions: ChatOption[] = [
    {
      id: 'emergency',
      text: 'Emergency Roadside Service',
      icon: <AlertTriangle className="h-4 w-4" />,
      action: 'emergency'
    },
    {
      id: 'appointment',
      text: 'Book a Repair Appointment',
      icon: <Wrench className="h-4 w-4" />,
      action: 'appointment'
    },
    {
      id: 'quote',
      text: 'Get a Free Quote',
      icon: <FileText className="h-4 w-4" />,
      action: 'quote'
    },
    {
      id: 'faq',
      text: 'FAQs',
      icon: <HelpCircle className="h-4 w-4" />,
      action: 'faq'
    }
  ];

  const faqData = [
    {
      question: "What hours are you open?",
      answer: `We're open Monday-Friday 9AM-9PM, Saturday-Sunday 9AM-5PM. We provide 24/7 emergency roadside assistance.`
    },
    {
      question: "Do you service all makes and models?",
      answer: "Yes! We service all heavy-duty truck makes including Freightliner, Kenworth, Peterbilt, Volvo, Mack, International, and more. Our experienced mechanics work on all major brands."
    },
    {
      question: "Do you do DOT inspections?",
      answer: "Absolutely! We provide comprehensive DOT inspections to ensure your truck meets all federal safety regulations. We're certified to perform all required inspections."
    },
    {
      question: "Where are you located?",
      answer: `We're located at ${settings.address}. We serve Hudson, Fort Collins, Greeley, and surrounding Colorado areas.`
    },
    {
      question: "Do you offer fleet services?",
      answer: "Yes! We provide customized maintenance programs for fleets of all sizes. Contact us for fleet pricing and scheduled maintenance packages."
    },
    {
      question: "What's your emergency response time?",
      answer: "For emergency roadside service, we typically respond within 30-60 minutes in the Hudson area. Call us at " + settings.contactPhone + " for immediate assistance."
    }
  ];

  const addMessage = (text: string, isBot: boolean = true, type: 'text' | 'options' | 'form' | 'emergency' = 'text', options?: ChatOption[]) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isBot,
      timestamp: new Date(),
      type,
      options
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const simulateTyping = (text: string, delay: number = 1000) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      addMessage(text);
    }, delay);
  };

  const handleQuickOption = (action: string) => {
    addMessage(`Selected: ${quickOptions.find(opt => opt.id === action)?.text}`, false);
    
    switch (action) {
      case 'emergency':
        handleEmergency();
        break;
      case 'appointment':
        handleAppointment();
        break;
      case 'quote':
        handleQuote();
        break;
      case 'faq':
        handleFAQ();
        break;
    }
  };

  const handleEmergency = () => {
    // Send emergency notification immediately
    const emergencyLead: LeadNotification = {
      type: 'emergency',
      name: 'Emergency Contact',
      phone: 'Emergency Request',
      urgency: 'emergency',
      issue: 'Emergency roadside assistance requested via chatbot',
      timestamp: new Date().toISOString(),
      source: 'chatbot'
    };

    sendLeadNotification(emergencyLead).catch(error => {
      console.error('Failed to send emergency notification:', error);
    });

    addMessage(
      `🚨 **EMERGENCY ASSISTANCE**\n\nWe'll get you back on the road fast!\n\n📞 **Call us now:** ${settings.contactPhone}\n\n📍 **Our location:** ${settings.address}\n\nShare your location and truck issue - we'll dispatch help immediately.`,
      true,
      'emergency'
    );
  };

  const handleAppointment = () => {
    setCurrentStep('appointment_form');
    addMessage("Great! Let's get your repair appointment scheduled. Please fill out the form below:", true, 'form');
  };

  const handleQuote = () => {
    setCurrentStep('quote_form');
    addMessage("I'll help you get a free quote. Please fill out the form below:", true, 'form');
  };

  const handleFAQ = () => {
    const faqText = "Here are the most common questions:\n\n" + 
      faqData.map((faq, index) => 
        `**${index + 1}. ${faq.question}**\n${faq.answer}\n`
      ).join('\n') +
      "\nNeed more help? Just ask!";
    
    addMessage(faqText, true);
  };

  const handleFormSubmit = () => {
    if (currentStep === 'appointment_form' || currentStep === 'quote_form') {
      if (currentStep === 'appointment_form') {
        completeAppointment();
      } else {
        completeQuote();
      }
    }
  };

  const completeAppointment = async () => {
    const urgencyText = {
      'emergency': 'Emergency - Need help now',
      'urgent': 'Urgent - Within 24 hours', 
      'routine': 'Routine - Can wait a few days'
    };

    // Send notification
    const lead: LeadNotification = {
      type: 'appointment',
      name: leadData.name || '',
      phone: leadData.phone || '',
      email: leadData.email,
      truckMake: leadData.truckMake,
      truckModel: leadData.truckModel,
      issue: leadData.issue,
      urgency: leadData.urgency as 'emergency' | 'urgent' | 'routine',
      isFleet: leadData.isFleet,
      fleetSize: leadData.fleetSize,
      timestamp: new Date().toISOString(),
      source: 'chatbot'
    };

    try {
      await sendLeadNotification(lead);
    } catch (error) {
      console.error('Failed to send notification:', error);
    }

    addMessage(
      `✅ **Appointment Request Received!**\n\n**Name:** ${leadData.name}\n**Phone:** ${leadData.phone}\n**Truck:** ${leadData.truckMake} ${leadData.truckModel}\n**Issue:** ${leadData.issue}\n**Urgency:** ${urgencyText[leadData.urgency as keyof typeof urgencyText]}\n\nWe'll contact you within 15 minutes to confirm your appointment.\n\n📞 **Need immediate help?** Call ${settings.contactPhone}`,
      true
    );
    
    setCurrentStep('completed');
    setLeadData({});
  };

  const getIntelligentResponse = async (userMessage: string): Promise<{ response: string; shouldShowForm: boolean }> => {
    try {
      const response = await fetch('/api/chatbot-ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          context: 'truck_repair'
        }),
      });

      if (response.ok) {
        const data = await response.json();
        return {
          response: data.response,
          shouldShowForm: data.shouldShowForm
        };
      }
    } catch (error) {
      console.error('Error getting AI response:', error);
    }

    // Fallback response if API fails
    return {
      response: "I understand you need help. Let me gather some information so I can connect you with the right person on our team.",
      shouldShowForm: true
    };
  };

  const handleInputSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const input = inputRef.current;
    if (!input || !input.value.trim()) return;

    const userMessage = input.value.trim();
    addMessage(userMessage, false);
    input.value = '';

    // Handle different conversation steps
    if (currentStep === 'appointment_name') {
      setLeadData(prev => ({ ...prev, name: userMessage }));
      setTimeout(() => handleFormSubmit(), 500);
    } else if (currentStep === 'appointment_phone') {
      setLeadData(prev => ({ ...prev, phone: userMessage }));
      setTimeout(() => handleFormSubmit(), 500);
    } else if (currentStep === 'appointment_truck') {
      setLeadData(prev => ({ ...prev, truckMake: userMessage }));
      setTimeout(() => handleFormSubmit(), 500);
    } else if (currentStep === 'appointment_issue') {
      setLeadData(prev => ({ ...prev, issue: userMessage }));
      setTimeout(() => handleFormSubmit(), 500);
    } else {
      // Show typing indicator
      setIsTyping(true);
      
      try {
        // Get intelligent response from AI
        const aiResponse = await getIntelligentResponse(userMessage);
        
        // Hide typing indicator and show response
        setTimeout(() => {
          setIsTyping(false);
          addMessage(aiResponse.response, true);
          
          // Show form if AI suggests it
          if (aiResponse.shouldShowForm) {
            setTimeout(() => {
              setCurrentStep('appointment_form');
              addMessage("Please fill out this form so I can get you the help you need:", true, 'form');
            }, 1500);
          }
        }, 1000);
      } catch (error) {
        console.error('Error getting AI response:', error);
        setIsTyping(false);
        simulateTyping("I understand you need help. Let me gather some information so I can connect you with the right person on our team.", 1000);
      }
    }
  };

  const openChat = () => {
    setIsOpen(true);
    if (messages.length === 0) {
      setTimeout(() => {
        addMessage(
          `🚛 **Welcome to Golden Heavy Duty Truck Repair!**\n\nI'm here to help with your truck repair needs 24/7. Whether you need emergency service, want to schedule an appointment, or have questions about our services, I'm here to assist you.\n\nWhat can I help you with today?`,
          true,
          'options',
          quickOptions
        );
      }, 500);
    }
  };

  const closeChat = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      {!isOpen && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ 
            scale: 1,
            boxShadow: [
              "0 0 0 0 rgba(212, 175, 55, 0.7)",
              "0 0 0 10px rgba(212, 175, 55, 0)",
              "0 0 0 0 rgba(212, 175, 55, 0)"
            ]
          }}
          transition={{
            scale: { duration: 0.3 },
            boxShadow: { duration: 2, repeat: Infinity, ease: "easeOut" }
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={openChat}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 bg-gradient-to-r from-primary to-primary-dark text-white p-3 sm:p-4 rounded-full shadow-2xl hover:shadow-glow-lg transition-all duration-300 group"
        >
          <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6" />
          <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 sm:h-6 sm:w-6 flex items-center justify-center font-bold">
            !
          </div>
        </motion.button>
      )}

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-96 max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden"
          >
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-secondary to-gray-800 text-white p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-primary p-2 rounded-full">
                  <Truck className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Golden Heavy Duty</h3>
                  <p className="text-sm text-gray-300">24/7 Truck Repair</p>
                </div>
              </div>
              <button
                onClick={closeChat}
                className="text-gray-300 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Messages Container */}
            <div className="h-80 sm:h-96 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 bg-gray-50">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      message.isBot
                        ? 'bg-white border border-gray-200 text-gray-800'
                        : 'bg-primary text-white'
                    }`}
                  >
                    {message.type === 'text' && (
                      <p className="text-sm whitespace-pre-line">{message.text}</p>
                    )}
                    
                    {message.type === 'emergency' && (
                      <div className="text-sm">
                        <div className="whitespace-pre-line mb-3">{message.text}</div>
                        <div className="space-y-2">
                          <a
                            href={`tel:${settings.contactPhone}`}
                            className="flex items-center space-x-2 bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition-colors"
                          >
                            <Phone className="h-4 w-4" />
                            <span>Call Now</span>
                          </a>
                          <a
                            href="https://maps.app.goo.gl/17fM4NksrUF4bUg57"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-2 bg-gray-600 text-white px-3 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                          >
                            <MapPin className="h-4 w-4" />
                            <span>Get Directions</span>
                          </a>
                        </div>
                      </div>
                    )}

                    {message.type === 'options' && message.options && (
                      <div className="space-y-2">
                        <p className="text-sm mb-3">{message.text}</p>
                        <div className="grid grid-cols-1 gap-2">
                          {message.options.map((option) => (
                            <button
                              key={option.id}
                              onClick={() => handleQuickOption(option.action)}
                              className="flex items-center space-x-2 p-2 bg-gray-100 hover:bg-primary hover:text-white rounded-lg transition-colors text-left"
                            >
                              {option.icon}
                              <span className="text-sm">{option.text}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {message.type === 'form' && (
                      <div className="space-y-2">
                        <p className="text-sm mb-3">{message.text}</p>
                        <div className="bg-gray-50 p-3 rounded-lg space-y-3">
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Name *</label>
                            <input
                              type="text"
                              value={leadData.name || ''}
                              onChange={(e) => setLeadData(prev => ({ ...prev, name: e.target.value }))}
                              className="w-full p-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                              placeholder="Your full name"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Phone Number *</label>
                            <input
                              type="tel"
                              value={leadData.phone || ''}
                              onChange={(e) => setLeadData(prev => ({ ...prev, phone: e.target.value }))}
                              className="w-full p-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                              placeholder="(303) 555-0123"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
                            <input
                              type="email"
                              value={leadData.email || ''}
                              onChange={(e) => setLeadData(prev => ({ ...prev, email: e.target.value }))}
                              className="w-full p-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                              placeholder="your@email.com"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Truck Make & Model *</label>
                            <input
                              type="text"
                              value={`${leadData.truckMake || ''} ${leadData.truckModel || ''}`.trim()}
                              onChange={(e) => {
                                const [make, ...modelParts] = e.target.value.split(' ');
                                setLeadData(prev => ({ 
                                  ...prev, 
                                  truckMake: make || '', 
                                  truckModel: modelParts.join(' ') || '' 
                                }));
                              }}
                              className="w-full p-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                              placeholder="Freightliner Cascadia"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Issue Description *</label>
                            <textarea
                              value={leadData.issue || ''}
                              onChange={(e) => setLeadData(prev => ({ ...prev, issue: e.target.value }))}
                              className="w-full p-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                              placeholder="Describe the problem you're experiencing..."
                              rows={3}
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Urgency *</label>
                            <select
                              value={leadData.urgency || ''}
                              onChange={(e) => setLeadData(prev => ({ ...prev, urgency: e.target.value as 'emergency' | 'urgent' | 'routine' }))}
                              className="w-full p-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                            >
                              <option value="">Select urgency level</option>
                              <option value="emergency">Emergency - Need help now</option>
                              <option value="urgent">Urgent - Within 24 hours</option>
                              <option value="routine">Routine - Can wait a few days</option>
                            </select>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id="isFleet"
                              checked={leadData.isFleet || false}
                              onChange={(e) => setLeadData(prev => ({ ...prev, isFleet: e.target.checked }))}
                              className="rounded"
                            />
                            <label htmlFor="isFleet" className="text-xs text-gray-700">This is for a fleet vehicle</label>
                          </div>
                          {leadData.isFleet && (
                            <div>
                              <label className="block text-xs font-medium text-gray-700 mb-1">Fleet Size</label>
                              <select
                                value={leadData.fleetSize || ''}
                                onChange={(e) => setLeadData(prev => ({ ...prev, fleetSize: e.target.value }))}
                                className="w-full p-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                              >
                                <option value="">Select fleet size</option>
                                <option value="1-5">1-5 vehicles</option>
                                <option value="6-20">6-20 vehicles</option>
                                <option value="21-50">21-50 vehicles</option>
                                <option value="50+">50+ vehicles</option>
                              </select>
                            </div>
                          )}
                          <button
                            onClick={handleFormSubmit}
                            disabled={!leadData.name || !leadData.phone || !leadData.truckMake || !leadData.issue || !leadData.urgency}
                            className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                          >
                            {currentStep === 'appointment_form' ? 'Schedule Appointment' : 'Get Free Quote'}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-200 p-3 rounded-2xl">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            {currentStep !== 'completed' && (
              <form onSubmit={handleInputSubmit} className="p-3 sm:p-4 border-t border-gray-200 bg-white">
                <div className="flex space-x-2">
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Type your message..."
                    className="flex-1 p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm sm:text-base"
                    disabled={isTyping}
                  />
                  <button
                    type="submit"
                    disabled={isTyping}
                    className="bg-primary text-white p-2 sm:p-3 rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
