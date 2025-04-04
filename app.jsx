import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Send, X, MessageSquare, Home } from 'lucide-react';

// AI Chatbot Component
const AIChatbot = ({ darkMode, onClose }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (inputText.trim()) {
      const userMessage = {
        text: inputText,
        isUser: true,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, userMessage]);
      setInputText('');
      setIsLoading(true);
      
      try {
        // Simulate Gemini API call (in a real implementation, you would call the actual API)
        const response = await fetchGeminiResponse(inputText);
        
        setTimeout(() => {
          setMessages(prev => [...prev, {
            text: response,
            isUser: false,
            timestamp: new Date()
          }]);
          setIsLoading(false);
        }, 700);
      } catch (error) {
        console.error("Error fetching AI response:", error);
        setMessages(prev => [...prev, {
          text: "Sorry, I encountered an error processing your request. Please try again.",
          isUser: false,
          timestamp: new Date()
        }]);
        setIsLoading(false);
      }
    }
  };

  // This function simulates a call to the Gemini API
  // In production, you would replace this with actual API integration
  const fetchGeminiResponse = async (userInput) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate different responses based on user input context
    const input = userInput.toLowerCase();
    
    if (input.includes("license") || input.includes("renewal")) {
      return "Based on your inquiry about licenses, I can help you with the renewal process. You'll need your current license number, a valid ID proof, and address verification. Would you like me to guide you through the online renewal process or help you schedule an in-person appointment?";
    } else if (input.includes("tax") || input.includes("payment")) {
      return "Regarding your tax payment inquiry, I can assist with property taxes, business taxes, and utility payments. The CivicConnect platform offers secure payment options with receipts delivered to your email. Would you like information about payment deadlines or available payment methods?";
    } else if (input.includes("permit") || input.includes("application")) {
      return "For permit applications, I can provide guidance based on your specific needs. Building permits, event permits, and business permits each have different requirements. Could you specify which type of permit you're interested in applying for so I can provide the most relevant information?";
    } else if (input.includes("help") || input.includes("service")) {
      return "I'm here to help with any city services! Popular requests include license renewals, tax payments, permit applications, utility services, and public records. What specific service are you looking for assistance with today?";
    } else if (input.includes("contact") || input.includes("support")) {
      return "You can reach CivicConnect support at help@civicconnect.gov or call our toll-free number 1-800-CIVIC-HELP (1-800-242-4243). Our support hours are Monday through Friday, 8 AM to 6 PM. Would you prefer to schedule a callback instead?";
    } else {
      return "Thank you for your message. As a CivicConnect assistant, I'm here to help with city services like license renewals, permit applications, tax payments, and accessing public records. Could you please provide more details about what you're looking for so I can assist you better?";
    }
  };

  const toggleVoiceRecognition = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window).webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
      };

      if (!isListening) {
        recognition.start();
      } else {
        recognition.stop();
      }
    } else {
      alert('Voice recognition is not supported in your browser.');
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    if (onClose) {
      onClose();
    }
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 p-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-200"
        >
          <MessageSquare className="h-6 w-6" />
        </button>
      )}

      {isOpen && (
        <div className={`fixed bottom-6 right-6 w-96 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-xl border ${darkMode ? 'border-gray-700' : 'border-gray-200'} z-50`}>
          <div className={`p-4 ${darkMode ? 'bg-gray-700' : 'bg-blue-600'} rounded-t-lg flex justify-between items-center`}>
            <h3 className="font-semibold text-white">CivicConnect AI Assistant</h3>
            <div className="flex space-x-2">
              <button
                onClick={handleClose}
                className={`p-1 rounded-full ${darkMode ? 'hover:bg-gray-600' : 'hover:bg-blue-700'}`}
                title="Return to home page"
              >
                <Home className="h-5 w-5 text-white" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className={`p-1 rounded-full ${darkMode ? 'hover:bg-gray-600' : 'hover:bg-blue-700'}`}
                title="Minimize chat"
              >
                <X className="h-5 w-5 text-white" />
              </button>
            </div>
          </div>

          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className={`text-center py-8 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                <p className="mb-2">👋 Welcome to CivicConnect!</p>
                <p>How can I help you with city services today?</p>
              </div>
            )}
            
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    message.isUser
                      ? 'bg-blue-600 text-white'
                      : darkMode
                        ? 'bg-gray-700 text-gray-200'
                        : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p>{message.text}</p>
                  <p className={`text-xs mt-1 ${message.isUser ? 'text-blue-100' : darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className={`max-w-[80%] rounded-lg px-4 py-2 ${
                  darkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-900'
                }`}>
                  <div className="flex space-x-2">
                    <div className="h-2 w-2 bg-blue-600 rounded-full animate-bounce"></div>
                    <div className="h-2 w-2 bg-blue-600 rounded-full animate-bounce delay-75"></div>
                    <div className="h-2 w-2 bg-blue-600 rounded-full animate-bounce delay-150"></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          <div className={`p-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your message..."
                className={`flex-1 px-4 py-2 rounded-lg ${
                  darkMode
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                } border focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              <button
                onClick={toggleVoiceRecognition}
                className={`p-2 rounded-lg ${
                  isListening
                    ? 'bg-red-500 hover:bg-red-600'
                    : 'bg-blue-600 hover:bg-blue-700'
                } text-white transition-colors duration-200`}
                title={isListening ? "Stop voice input" : "Start voice input"}
              >
                {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
              </button>
              <button
                onClick={handleSend}
                disabled={!inputText.trim() || isLoading}
                className={`p-2 rounded-lg ${
                  !inputText.trim() || isLoading
                    ? 'bg-blue-400'
                    : 'bg-blue-600 hover:bg-blue-700'
                } text-white transition-colors duration-200`}
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-2 text-xs text-center text-gray-500">
              Powered by Gemini AI
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Main Civic Tech Platform Component
const CivicTechPlatform = () => {
  const [activeService, setActiveService] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const services = [
    {
      id: 1,
      title: 'License Renewal',
      description: 'Renew your driver\'s license, business permits, and professional credentials',
      icon: '🪪',
      color: 'bg-blue-100'
    },
    {
      id: 2,
      title: 'Property Tax Payment',
      description: 'Pay your property taxes securely online',
      icon: '🏠',
      color: 'bg-green-100'
    },
    {
      id: 3,
      title: 'Utility Bill Payment',
      description: 'Pay water, electricity, and other utility bills',
      icon: '💡',
      color: 'bg-yellow-100'
    },
    {
      id: 4,
      title: 'Building Permits',
      description: 'Apply for new building permits or check existing ones',
      icon: '🏗️',
      color: 'bg-purple-100'
    },
    {
      id: 5,
      title: 'Public Records',
      description: 'Access birth certificates, marriage licenses, and other vital records',
      icon: '📄',
      color: 'bg-red-100'
    },
    {
      id: 6,
      title: 'Vehicle Registration',
      description: 'Register or renew your vehicle registration',
      icon: '🚗',
      color: 'bg-indigo-100'
    }
  ];

  const filteredServices = searchQuery 
    ? services.filter(service => 
        service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : services;

  const handleChatbotClose = () => {
    setIsChatbotOpen(false);
    // Optionally scroll to top or focus on a specific element
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Header */}
      <header className={`${darkMode ? 'bg-gray-800' : 'bg-blue-600'} text-white p-4 shadow-md`}>
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">CivicConnect</h1>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-md hover:bg-opacity-80"
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
            <button className="px-4 py-2 bg-white text-blue-600 rounded-md font-medium hover:bg-blue-50">Sign In</button>
            <button className="p-2 text-white hover:bg-opacity-80 rounded-md">
              <span>🔔</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className={`${darkMode ? 'bg-gray-800' : 'bg-blue-700'} text-white py-12`}>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Your City Services, Simplified</h2>
          <p className="text-xl mb-8">Access government services quickly and easily, all in one place.</p>
          
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search for city services..." 
              className={`w-full p-4 rounded-md ${darkMode ? 'bg-gray-700 text-white placeholder-gray-400' : 'text-gray-800'} shadow-lg`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className={`absolute right-3 top-3 ${darkMode ? 'bg-gray-600' : 'bg-blue-600'} text-white p-2 rounded-md`}>
              🔍
            </button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12 container mx-auto px-4">
        <h2 className={`text-2xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Popular Services</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div 
              key={service.id} 
              className={`${darkMode ? 'bg-gray-800 hover:bg-gray-700' : service.color + ' hover:shadow-lg'} rounded-lg p-6 shadow-md transition cursor-pointer`}
              onClick={() => setActiveService(service)}
            >
              <div className="text-3xl mb-4">{service.icon}</div>
              <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>{service.title}</h3>
              <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>{service.description}</p>
              <button className={`mt-4 ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-white hover:bg-gray-50 text-blue-600'} px-4 py-2 rounded-md shadow font-medium`}>
                Access Service
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Service Modal */}
      {activeService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white'} rounded-lg max-w-2xl w-full p-6`}>
            <div className="flex justify-between items-start mb-4">
              <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{activeService.title}</h3>
              <button 
                onClick={() => setActiveService(null)}
                className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-500 hover:text-gray-700'}`}
              >
                ✖
              </button>
            </div>
            <div className="mb-6">
              <p className={darkMode ? 'text-gray-300 mb-4' : 'text-gray-600 mb-4'}>{activeService.description}</p>
              
              {activeService.id === 1 && (
                <div className="space-y-4">
                  <h4 className={`font-semibold text-lg ${darkMode ? 'text-white' : ''}`}>License Types</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button className={`p-4 border ${darkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-200 hover:bg-blue-50'} rounded-md text-left`}>
                      <span className="font-medium">Driver's License</span>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Renew or replace your driver's license</p>
                    </button>
                    <button className={`p-4 border ${darkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-200 hover:bg-blue-50'} rounded-md text-left`}>
                      <span className="font-medium">Business License</span>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Renew your business operating permit</p>
                    </button>
                    <button className={`p-4 border ${darkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-200 hover:bg-blue-50'} rounded-md text-left`}>
                      <span className="font-medium">Professional License</span>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Renew professional certifications</p>
                    </button>
                    <button className={`p-4 border ${darkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-200 hover:bg-blue-50'} rounded-md text-left`}>
                      <span className="font-medium">Special Permits</span>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Event permits, parking permits, etc.</p>
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="flex justify-end">
              <button 
                className={`px-4 py-2 ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} rounded-md mr-2`}
                onClick={() => setActiveService(null)}
              >
                Cancel
              </button>
              <button className={`px-4 py-2 ${darkMode ? 'bg-blue-700 hover:bg-blue-800' : 'bg-blue-600 hover:bg-blue-700'} text-white rounded-md`}>
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AI Chatbot */}
      <AIChatbot darkMode={darkMode} onClose={handleChatbotClose} />

      {/* Footer */}
      <footer className={`${darkMode ? 'bg-gray-800' : 'bg-gray-800'} text-white py-8`}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">CivicConnect</h3>
              <p>Making government services accessible for everyone in our community.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:underline">About Us</a></li>
                <li><a href="#" className="hover:underline">Contact</a></li>
                <li><a href="#" className="hover:underline">Accessibility</a></li>
                <li><a href="#" className="hover:underline">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact Information</h4>
              <p>123 City Hall Lane</p>
              <p>Anytown, ST 12345</p>
              <p>Phone: (555) 123-4567</p>
              <p>Email: help@civicconnect.gov</p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center">
            <p>&copy; 2025 CivicConnect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
