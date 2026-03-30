import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot } from 'lucide-react';

const FloatingAIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const GEMINI_API_KEY = "AIzaSyCgrcZ8b8ZcHIUfWojfmRC5LN5NEkD9vLg";

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleToggleChat = () => {
    setIsOpen(!isOpen);
    // Add Burmese greeting if opening for the first time
    if (!isOpen && messages.length === 0) {
      setMessages([{
        text: "မင်္ဂလာပါ! ကျွန်တော်က Pyoe AI Assistant ပါ။ သင့်ခြံလုပ်ငန်းနှင့် ပတ်သက်ပြီး ကူညီပေးနိုင်ပါသည်။ ဘာကူညီပေးရမလဲ?",
        sender: 'ai'
      }]);
    }
  };

  const callGeminiAPI = async (userMessage) => {
    try {
      console.log('Calling Gemini API with message:', userMessage);

      // First, list available models
      /*
      console.log('Fetching available models...');
      const modelsResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${GEMINI_API_KEY}`);
      const modelsData = await modelsResponse.json();
      console.log('Available models:', modelsData);

      if (modelsData.models) {
        console.log('Model names:', modelsData.models.map(m => m.name));
        console.log('Models with generateContent support:', modelsData.models
          .filter(m => m.supportedGenerationMethods?.includes('generateContent'))
          .map(m => ({ name: m.name, methods: m.supportedGenerationMethods }))
        );
      }
      */

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are Pyoe AI Assistant, a helpful agricultural assistant for farmers in Myanmar. Respond in Burmese language only. Keep responses helpful and relevant to farming. User question: ${userMessage}`
            }]
          }]
        })
      });

      console.log('API Response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error:', errorText);
        throw new Error(`API Error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log('API Response data:', data);

      if (data.candidates && data.candidates[0] && data.candidates[0].content) {
        return data.candidates[0].content.parts[0].text;
      } else {
        console.error('Unexpected API response structure:', data);
        return 'ဝမ်းနည်းပါတယ်၊ API မှ မျှော်လင့်ထားသည့် အဖြေကို ရရှိမှု မရှိပါ။';
      }
    } catch (error) {
      console.error('Gemini API error:', error);
      // Fallback to mock responses for demo purposes
      const mockResponses = [
        'သင်၏ ခြံလုပ်ငန်းအတွက် အကြံပြုချက်များ လိုအပ်ပါက ကျွန်တော်က ကူညီပေးနိုင်ပါသည်။ သီးနှံအမျိုးအစားနှင့် ပြဿနာကို အသေးစိတ် ပြောပြပါ။',
        'ရာသီဥတုကို စောင့်ကြည့်ပြီး သီးနှံများကို ဂရုစိုက်ရန် အရေးကြီးပါသည်။ သင်၏ဒေသ၏ ရာသီဥတုအခြေအနေကို မှတ်သားထားပါ။',
        'သီးနှံရောဂါများကို စောစီးစွာ တွေ့ရှိခြင်းဖြင့် ဆုံးရှုံးမှုများကို လျှော့ချနိုင်ပါသည်။ အသားအရောင်ပြောင်းလဲခြင်း သို့မဟုတ် အရွက်များ ညှိုးနွမ်းခြင်းကို သတိပြုပါ။',
        'မြေဆီလွှာ စစ်ဆေးခြင်းသည် သီးနှံအထွက်ကို မြှင့်တင်ရန် အထောက်အကူဖြစ်ပါသည်။ မြေဆီလွှာ pH နှင့် အာဟာရဓာတ်များကို စစ်ဆေးကြည့်ပါ။'
      ];
      const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];
      return randomResponse;
    }
  };

  const handleSendMessage = async () => {
    if (inputValue.trim() === '' || isLoading) return;

    const newMessages = [...messages, { text: inputValue, sender: 'user' }];
    setMessages(newMessages);
    setInputValue('');
    setIsLoading(true);

    try {
      const aiResponse = await callGeminiAPI(inputValue);
      setMessages(prev => [...prev, { text: aiResponse, sender: 'ai' }]);
    } catch (error) {
      setMessages(prev => [...prev, { text: 'ဝမ်းနည်းပါတယ်၊ အမှားတစ်ခု ဖြစ်သွားပါတယ်။', sender: 'ai' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="fixed top-12 right-6 z-[9999999]">
        <motion.button
          onClick={handleToggleChat}
          className="bg-yellow-600 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-2xl"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isOpen ? <X className="w-8 h-8" /> : <Bot className="w-8 h-8" />}
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-24 right-6 w-[calc(100vw-48px)] max-w-sm h-3/5 max-h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden z-[9999998]"
          >
            {/* Header */}
            <div className="bg-yellow-600 text-white p-4 flex items-center space-x-3">
              <Bot className="w-6 h-6" />
              <h3 className="font-semibold text-lg">Pyoe AI Assistant</h3>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-4">
                {messages.map((msg, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex items-end space-x-2 ${msg.sender === 'user' ? 'justify-end' : ''}`}
                  >
                    {msg.sender === 'ai' && (
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                        <Bot className="w-5 h-5 text-gray-600" />
                      </div>
                    )}
                    <div
                      className={`max-w-xs px-4 py-3 rounded-2xl ${
                        msg.sender === 'user'
                          ? 'bg-yellow-600 text-white rounded-br-none'
                          : 'bg-gray-100 text-gray-900 rounded-bl-none'
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{msg.text}</p>
                    </div>
                  </motion.div>
                ))}
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-end space-x-2"
                  >
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                      <Bot className="w-5 h-5 text-gray-600" />
                    </div>
                    <div className="bg-gray-100 text-gray-900 px-4 py-3 rounded-2xl rounded-bl-none">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-gray-200">
              <div className="relative">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="မေးခွန်းမေးရန်..."
                  disabled={isLoading}
                  className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={isLoading || inputValue.trim() === ''}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingAIChat;