import React, { useState, useEffect, useRef, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { MessageSquare, X, Send, Bot, User, ArrowUpRight, Sparkles } from 'lucide-react';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "Hey there! I am StayNest's Smart Assistant. 🏡\nHow can I help you today? You can ask me for rooms, PGs, messes, or roommates!",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestions: [
        "Rooms in Pune under ₹9000",
        "Girls PG near college",
        "Best Mess with delivery",
        "Find roommate under ₹5000"
      ]
    }
  ]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null);
  
  const { listings, messes, roommates } = useContext(AppContext);

  // Scroll to bottom on new message
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = (textToSend) => {
    const text = (textToSend || inputText).trim();
    if (!text) return;

    // Add user message
    const userMsg = {
      sender: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');

    // Process Bot Response after small delay
    setTimeout(() => {
      const response = generateBotResponse(text);
      setMessages(prev => [...prev, response]);
    }, 800);
  };

  const generateBotResponse = (query) => {
    const lowercaseQuery = query.toLowerCase();
    let replyText = "";
    let recommendations = [];
    const suggestions = [];

    // Parse Budget
    let budgetLimit = null;
    const budgetMatch = lowercaseQuery.match(/(?:under|below|less than|₹|rs\.?\s?)(\d+)/);
    if (budgetMatch) {
      budgetLimit = parseInt(budgetMatch[1]);
    }

    // Parse City
    let cityQuery = null;
    if (lowercaseQuery.includes("pune")) cityQuery = "Pune";
    else if (lowercaseQuery.includes("mumbai")) cityQuery = "Mumbai";
    else if (lowercaseQuery.includes("kolhapur")) cityQuery = "Kolhapur";
    else if (lowercaseQuery.includes("sangli")) cityQuery = "Sangli";
    else if (lowercaseQuery.includes("bangalore")) cityQuery = "Bangalore";
    else if (lowercaseQuery.includes("hyderabad")) cityQuery = "Hyderabad";

    // Parse gender
    let genderQuery = null;
    if (lowercaseQuery.includes("girl") || lowercaseQuery.includes("female") || lowercaseQuery.includes("women")) genderQuery = "Girls";
    else if (lowercaseQuery.includes("boy") || lowercaseQuery.includes("male") || lowercaseQuery.includes("men")) genderQuery = "Boys";

    // Parse category: Mess / Roommate / Room
    if (lowercaseQuery.includes("mess") || lowercaseQuery.includes("food") || lowercaseQuery.includes("tiffin") || lowercaseQuery.includes("meal")) {
      // Searching Messes
      let filtered = messes;
      if (cityQuery) filtered = filtered.filter(m => m.city === cityQuery);
      if (lowercaseQuery.includes("delivery")) filtered = filtered.filter(m => m.deliveryAvailable);
      if (lowercaseQuery.includes("veg") && !lowercaseQuery.includes("non")) filtered = filtered.filter(m => m.type === 'Veg' || m.type === 'Both');

      if (filtered.length > 0) {
        replyText = `I found ${filtered.length} mess options ${cityQuery ? `in ${cityQuery}` : ''}:`;
        recommendations = filtered.map(m => ({
          id: m.id,
          title: m.title,
          sub: `${m.type} • ₹${m.monthlyPrice}/mo • ${m.distance} km`,
          type: 'mess',
          link: '/messes'
        }));
      } else {
        replyText = "Sorry, I couldn't find any messes matching that description. Try searching 'Best Mess in Pune' or 'Veg Mess with delivery'.";
      }
    } else if (lowercaseQuery.includes("roommate") || lowercaseQuery.includes("partner") || lowercaseQuery.includes("flatmate")) {
      // Searching Roommates
      let filtered = roommates;
      if (genderQuery) filtered = filtered.filter(r => r.gender === genderQuery);
      if (budgetLimit) filtered = filtered.filter(r => r.budget <= budgetLimit);

      if (filtered.length > 0) {
        replyText = `Here are some roommates seeking partners ${genderQuery ? `(${genderQuery})` : ''} that match:`;
        recommendations = filtered.map(r => ({
          id: r.id,
          title: r.name,
          sub: `${r.college || r.company} • Budget: ₹${r.budget}/mo`,
          type: 'roommate',
          link: '/roommates'
        }));
      } else {
        replyText = "I couldn't find roommates matching those filters. Try searching 'Boys roommates' or 'Roommates under ₹6000'.";
      }
    } else {
      // Searching Accommodations (default)
      let filtered = listings;
      
      if (cityQuery) filtered = filtered.filter(item => item.city === cityQuery);
      if (genderQuery) filtered = filtered.filter(item => item.gender === genderQuery || item.gender === 'Unisex');
      if (budgetLimit) filtered = filtered.filter(item => item.rent <= budgetLimit);
      if (lowercaseQuery.includes("wifi")) filtered = filtered.filter(item => item.amenities.includes("WiFi"));
      if (lowercaseQuery.includes("ac")) filtered = filtered.filter(item => item.amenities.includes("AC"));

      if (filtered.length > 0) {
        replyText = `Based on your request, I recommend these verified properties ${cityQuery ? `in ${cityQuery}` : ''}${budgetLimit ? ` under ₹${budgetLimit}` : ''}:`;
        recommendations = filtered.slice(0, 3).map(item => ({
          id: item.id,
          title: item.title,
          sub: `${item.type} • ₹${item.rent}/mo • ${item.distance} km from college • Safety: ${item.safetyScore}%`,
          type: 'room',
          link: `/rooms/${item.id}`
        }));
      } else {
        replyText = "I couldn't find any rooms matching your search. Try broadening your budget or changing the city filter. \n\nTip: Ask me for 'Rooms in Pune under 10000 with WiFi'.";
      }
    }

    if (recommendations.length === 0) {
      suggestions.push("Rooms in Pune", "Messes in Kolhapur", "Boys roommates under ₹5000");
    }

    return {
      sender: 'bot',
      text: replyText,
      recommendations,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestions
    };
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-primary-600 to-brand-rose-500 hover:from-primary-500 hover:to-brand-rose-400 text-white shadow-xl shadow-primary-500/20 hover:scale-105 transition-all duration-300 animate-bounce-slow"
          aria-label="Open Chatbot"
        >
          <MessageSquare className="w-6 h-6" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-[350px] sm:w-[380px] h-[520px] rounded-3xl bg-white dark:bg-slate-900 shadow-2xl border border-slate-100 dark:border-slate-800 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-primary-600 to-brand-rose-500 p-4 text-white flex justify-between items-center">
            <div className="flex items-center space-x-2.5">
              <div className="p-2 rounded-xl bg-white/10 backdrop-blur-md">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-outfit font-bold text-sm tracking-wide">NestBot AI</h4>
                <p className="text-[10px] text-white/80 flex items-center">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-1 animate-pulse" /> Online Assistant
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg hover:bg-white/10 text-white/80 hover:text-white transition-colors"
              aria-label="Close Chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Log */}
          <div className="flex-grow p-4 overflow-y-auto space-y-4 bg-slate-50/50 dark:bg-slate-950/40">
            {messages.map((msg, index) => (
              <div key={index} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                
                {/* Message Bubble */}
                <div className={`flex items-start max-w-[85%] space-x-2 ${msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`p-1.5 rounded-lg text-white mt-1 hidden sm:block ${
                    msg.sender === 'user' ? 'bg-brand-rose-500' : 'bg-primary-600'
                  }`}>
                    {msg.sender === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                  </div>

                  <div className={`rounded-2xl px-3.5 py-2.5 text-xs shadow-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-brand-rose-500 text-white rounded-tr-none'
                      : 'bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none'
                  }`}>
                    <p className="whitespace-pre-line">{msg.text}</p>

                    {/* Chatbot Live Recommendations */}
                    {msg.recommendations && msg.recommendations.length > 0 && (
                      <div className="mt-3 space-y-2 border-t border-slate-100 dark:border-slate-800 pt-2.5">
                        {msg.recommendations.map((rec) => (
                          <a
                            href={`#${rec.link}`}
                            key={rec.id}
                            onClick={() => setIsOpen(false)}
                            className="block p-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/50 dark:border-slate-800/80 hover:border-primary-500 transition-all text-slate-800 dark:text-slate-200"
                          >
                            <div className="flex justify-between items-center">
                              <span className="font-bold text-[10px] truncate max-w-[180px]">{rec.title}</span>
                              <ArrowUpRight className="w-3 h-3 text-primary-500" />
                            </div>
                            <p className="text-[9px] text-slate-400 mt-0.5">{rec.sub}</p>
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Suggestions Pills */}
                {msg.suggestions && msg.suggestions.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2.5 pl-7">
                    {msg.suggestions.map((suggest, i) => (
                      <button
                        key={i}
                        onClick={() => handleSend(suggest)}
                        className="text-[10px] font-semibold px-2.5 py-1 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:border-primary-500 hover:text-primary-600 transition-colors"
                      >
                        {suggest}
                      </button>
                    ))}
                  </div>
                )}
                
                {/* Time tag */}
                <span className="text-[9px] text-slate-400 mt-1 pl-7 pr-7 block">
                  {msg.time}
                </span>

              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Info bar */}
          <div className="px-4 py-1.5 bg-primary-50 dark:bg-primary-950/20 border-t border-slate-100 dark:border-slate-800 text-[10px] text-primary-600 dark:text-primary-400 flex items-center font-medium">
            <Sparkles className="w-3 h-3 mr-1 text-primary-500" /> Powered by StayNest Local search Index.
          </div>

          {/* Chat input */}
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex items-center space-x-2"
          >
            <input
              type="text"
              placeholder="Ask anything..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-grow bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 rounded-xl px-3.5 py-2 text-xs text-slate-800 dark:text-slate-200 outline-none focus:border-primary-500 transition-colors"
            />
            <button
              type="submit"
              className="p-2 rounded-xl bg-primary-600 hover:bg-primary-500 text-white transition-colors"
              aria-label="Send Message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}

    </div>
  );
}
