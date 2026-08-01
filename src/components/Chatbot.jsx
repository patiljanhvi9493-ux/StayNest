import React, { useState, useEffect, useRef, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { 
  MessageSquare, X, Send, Bot, User, ArrowUpRight, Sparkles, 
  Compass, DollarSign, RefreshCw, AlertTriangle, ShieldCheck, Activity, MapPin 
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('chat'); // chat, match, planner, compare, scam

  // General Chat state
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "Hey! I am StayNest's Smart AI Assistant. 🏡\nHow can I help you today? You can ask me for rooms, PGs, messes, or roommates!",
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

  // Recommendation engine state
  const [matchBudget, setMatchBudget] = useState(8000);
  const [matchType, setMatchType] = useState('PG');
  const [matchGender, setMatchGender] = useState('Girls');
  const [matchedResults, setMatchedResults] = useState([]);

  // Budget Planner state
  const [plannerRent, setPlannerRent] = useState(7000);
  const [plannerFood, setPlannerFood] = useState(3000);
  const [plannerTravel, setPlannerTravel] = useState(1000);
  const [plannerAdvice, setPlannerAdvice] = useState('');

  // Rent Comparison state
  const [compRent, setCompRent] = useState('');
  const [compCity, setCompCity] = useState('Pune');
  const [compArea, setCompArea] = useState('Kothrud');
  const [compResult, setCompResult] = useState('');

  // Scam Detection state
  const [scamText, setScamText] = useState('');
  const [scamAnalysis, setScamAnalysis] = useState(null);
  const [scamLoading, setScamLoading] = useState(false);

  // Scroll chat bottom
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, activeTab]);

  // Generates bot replies
  const handleSend = (textToSend) => {
    const text = (textToSend || inputText).trim();
    if (!text) return;

    const userMsg = {
      sender: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');

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
    if (budgetMatch) budgetLimit = parseInt(budgetMatch[1]);

    // Parse City
    let cityQuery = null;
    if (lowercaseQuery.includes("pune")) cityQuery = "Pune";
    else if (lowercaseQuery.includes("mumbai")) cityQuery = "Mumbai";
    else if (lowercaseQuery.includes("kolhapur")) cityQuery = "Kolhapur";
    else if (lowercaseQuery.includes("sangli")) cityQuery = "Sangli";

    // Parse gender
    let genderQuery = null;
    if (lowercaseQuery.includes("girl") || lowercaseQuery.includes("female")) genderQuery = "Girls";
    else if (lowercaseQuery.includes("boy") || lowercaseQuery.includes("male")) genderQuery = "Boys";

    if (lowercaseQuery.includes("mess") || lowercaseQuery.includes("food") || lowercaseQuery.includes("tiffin")) {
      let filtered = messes;
      if (cityQuery) filtered = filtered.filter(m => m.city === cityQuery);
      if (lowercaseQuery.includes("delivery")) filtered = filtered.filter(m => m.deliveryAvailable);

      if (filtered.length > 0) {
        replyText = `I found ${filtered.length} mess options ${cityQuery ? `in ${cityQuery}` : ''}:`;
        recommendations = filtered.map(m => ({
          id: m.id,
          title: m.title,
          sub: `${m.type} • ₹${m.monthlyPrice}/mo • ${m.distance} km`,
          link: '/messes'
        }));
      } else {
        replyText = "Sorry, I couldn't find messes matching that. Try 'Veg Mess with delivery'.";
      }
    } else {
      let filtered = listings;
      if (cityQuery) filtered = filtered.filter(item => item.city === cityQuery);
      if (genderQuery) filtered = filtered.filter(item => item.gender === genderQuery || item.gender === 'Unisex');
      if (budgetLimit) filtered = filtered.filter(item => item.rent <= budgetLimit);

      if (filtered.length > 0) {
        replyText = `I recommend these verified stays ${cityQuery ? `in ${cityQuery}` : ''}:`;
        recommendations = filtered.slice(0, 3).map(item => ({
          id: item.id,
          title: item.title,
          sub: `${item.type} • ₹${item.rent}/mo • Safety: ${item.safetyScore}%`,
          link: `/rooms/${item.id}`
        }));
      } else {
        replyText = "I couldn't find matching rooms. Try broadening your budget filter.";
      }
    }

    return {
      sender: 'bot',
      text: replyText,
      recommendations,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestions
    };
  };

  // Run Recommendation Matcher
  const runRecommendationMatcher = () => {
    let matches = listings.filter(item => {
      const matchB = item.rent <= matchBudget;
      const matchT = item.type === matchType;
      const matchG = item.gender === matchGender || item.gender === 'Unisex';
      return matchB && matchT && matchG;
    });

    if (matches.length === 0) {
      matches = listings.filter(item => item.rent <= matchBudget + 1000).slice(0, 2);
    }
    setMatchedResults(matches.slice(0, 3));
  };

  // Run Budget Planner analysis
  const runBudgetPlanner = () => {
    const total = plannerRent + plannerFood + plannerTravel;
    if (total <= 9000) {
      setPlannerAdvice(`Super economical plan! You have ₹${12000 - total} savings cushion left. Perfect for students.`);
    } else if (total <= 13000) {
      setPlannerAdvice(`Moderate plan. Consider checking PG options that include food to save around ₹1,500/mo.`);
    } else {
      setPlannerAdvice(`Premium cost detected. We recommend flatsharing with roommates to reduce rent by 30%.`);
    }
  };

  // Run Rent Comparison
  const runRentComparison = () => {
    if (!compRent) return;
    const rentVal = parseInt(compRent);
    const avg = compCity === 'Mumbai' ? 12000 : compCity === 'Pune' ? 7500 : 4500;
    
    if (rentVal <= avg * 0.9) {
      setCompResult(`Green Alert: Underpriced! This room is ₹${avg - rentVal} cheaper than local averages for ${compArea}.`);
    } else if (rentVal <= avg * 1.15) {
      setCompResult(`Fair Price: Rent matches the local average for verified stays in ${compCity}.`);
    } else {
      setCompResult(`Overpriced Alert: This stay is priced higher than standard local listings. negotiate or check safety metrics.`);
    }
  };

  // Scam Detector
  const runScamDetection = () => {
    if (!scamText.trim()) return;
    setScamLoading(true);
    setTimeout(() => {
      const txt = scamText.toLowerCase();
      let score = 90; // base confidence
      const flags = [];

      if (txt.includes("upfront cash") || txt.includes("advance payment before visit") || txt.includes("gpay to book")) {
        score -= 40;
        flags.push("Requests advance booking deposit before showing property.");
      }
      if (txt.includes("no visit") || txt.includes("owner is out of station") || txt.includes("key will be couriered")) {
        score -= 30;
        flags.push("Refuses physical inspection visits.");
      }
      if (txt.includes("brokerage mandatory") || txt.includes("urgent booking required")) {
        score -= 10;
        flags.push("High pressure urgency strategy.");
      }

      setScamAnalysis({
        score,
        flags: flags.length > 0 ? flags : ["No critical red flags discovered in description!"]
      });
      setScamLoading(false);
    }, 800);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-primary-600 to-brand-rose-500 text-white shadow-xl shadow-primary-500/20 hover:scale-105 transition-all duration-300 animate-bounce-slow"
        >
          <Bot className="w-6 h-6" />
        </button>
      )}

      {/* Assistant overlay */}
      {isOpen && (
        <div className="w-[360px] sm:w-[400px] h-[550px] rounded-[32px] bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 shadow-2xl flex flex-col overflow-hidden animate-scale-in">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-900 to-indigo-950 p-4 text-white flex justify-between items-center flex-shrink-0">
            <div className="flex items-center space-x-2.5">
              <div className="p-2 rounded-xl bg-white/10 text-primary-400">
                <Sparkles className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h4 className="font-outfit font-black text-sm tracking-wide">StayNest AI Copilot</h4>
                <p className="text-[9px] text-slate-400">Smart accommodation recommendations & checks</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Module Selector Tabs */}
          <div className="flex border-b border-slate-100 dark:border-slate-800 text-[10px] font-bold overflow-x-auto no-scrollbar bg-slate-50 dark:bg-slate-950 p-1 gap-1">
            {[
              { id: 'chat', label: 'AI Chat' },
              { id: 'match', label: 'Match' },
              { id: 'planner', label: 'Planner' },
              { id: 'compare', label: 'Rent Check' },
              { id: 'scam', label: 'Scam Guard' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 rounded-lg flex-shrink-0 transition-colors ${
                  activeTab === tab.id 
                    ? 'bg-white dark:bg-slate-900 text-primary-600 dark:text-primary-400 border border-slate-200/40 dark:border-slate-850 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Body Panels */}
          <div className="flex-grow overflow-y-auto bg-slate-50/50 dark:bg-slate-950/20 p-4">
            
            {/* TAB 1: AI CHAT */}
            {activeTab === 'chat' && (
              <div className="h-full flex flex-col justify-between space-y-4">
                <div className="flex-grow overflow-y-auto space-y-4 pr-1">
                  {messages.map((msg, index) => (
                    <div key={index} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                      <div className={`rounded-2xl px-3.5 py-2.5 text-xs shadow-sm leading-relaxed max-w-[85%] ${
                        msg.sender === 'user'
                          ? 'bg-brand-rose-500 text-white rounded-tr-none'
                          : 'bg-white dark:bg-slate-900 border border-slate-150/40 dark:border-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none'
                      }`}>
                        <p className="whitespace-pre-line">{msg.text}</p>
                        
                        {msg.recommendations && msg.recommendations.length > 0 && (
                          <div className="mt-3 space-y-2 border-t border-slate-100 dark:border-slate-800 pt-2.5">
                            {msg.recommendations.map((rec) => (
                              <a
                                href={`#${rec.link}`}
                                key={rec.id}
                                onClick={() => setIsOpen(false)}
                                className="block p-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/50 dark:border-slate-800/80 hover:border-primary-500 transition-all text-slate-800 dark:text-slate-200"
                              >
                                <div className="flex justify-between items-center font-bold text-[10px]">
                                  <span className="truncate max-w-[180px]">{rec.title}</span>
                                  <ArrowUpRight className="w-3 h-3 text-primary-500" />
                                </div>
                                <p className="text-[9px] text-slate-400 mt-0.5">{rec.sub}</p>
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                      
                      {msg.suggestions && msg.suggestions.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-2.5 pl-2">
                          {msg.suggestions.map((suggest, i) => (
                            <button
                              key={i}
                              onClick={() => handleSend(suggest)}
                              className="text-[9px] font-semibold px-2.5 py-1 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:border-primary-500 hover:text-primary-600 transition-colors"
                            >
                              {suggest}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                <form
                  onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                  className="flex items-center space-x-2 pt-2 border-t border-slate-100 dark:border-slate-850"
                >
                  <input
                    type="text"
                    placeholder="Ask NestBot AI..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className="flex-grow bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-850 rounded-xl px-3.5 py-2 text-xs outline-none focus:border-primary-500"
                  />
                  <button type="submit" className="p-2 bg-primary-600 hover:bg-primary-500 text-white rounded-xl"><Send className="w-4 h-4" /></button>
                </form>
              </div>
            )}

            {/* TAB 2: ROOM RECOMMENDATION */}
            {activeTab === 'match' && (
              <div className="space-y-4 text-xs">
                <div className="bg-white dark:bg-slate-900 border border-slate-150/40 dark:border-slate-800 p-4.5 rounded-2xl space-y-4">
                  <h4 className="font-outfit font-black text-slate-850 dark:text-white">AI Property Matcher</h4>
                  
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase">
                      <span>Max Budget</span>
                      <span className="text-slate-800 dark:text-slate-200">₹{matchBudget}/mo</span>
                    </div>
                    <input type="range" min="3000" max="15000" step="500" value={matchBudget} onChange={(e) => setMatchBudget(parseInt(e.target.value))} className="w-full accent-primary-500 h-1" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase">Stay Style</label>
                      <select value={matchType} onChange={(e) => setMatchType(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-950 border rounded-lg p-1.5 outline-none">
                        <option value="PG">PG</option>
                        <option value="Room">Single Room</option>
                        <option value="Hostel">Hostel</option>
                        <option value="Flat">Flat</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase">Gender Preference</label>
                      <select value={matchGender} onChange={(e) => setMatchGender(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-950 border rounded-lg p-1.5 outline-none">
                        <option value="Girls">Girls Only</option>
                        <option value="Boys">Boys Only</option>
                        <option value="Unisex">Unisex</option>
                      </select>
                    </div>
                  </div>

                  <button onClick={runRecommendationMatcher} className="w-full py-2 bg-primary-600 hover:bg-primary-500 text-white rounded-xl font-bold shadow-sm">
                    Generate Smart Matches
                  </button>
                </div>

                {/* Match Results */}
                {matchedResults.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="font-bold text-[10px] uppercase tracking-wider text-slate-400 pl-1">SafeMatch recommendations:</h4>
                    {matchedResults.map(room => (
                      <div key={room.id} className="p-3 bg-white dark:bg-slate-900 border border-slate-150/45 dark:border-slate-800 rounded-xl flex items-center justify-between">
                        <div className="min-w-0">
                          <p className="font-bold text-slate-800 dark:text-white truncate">{room.title}</p>
                          <p className="text-[9px] text-slate-400">{room.area} • ₹{room.rent}/mo</p>
                        </div>
                        <a href={`#/rooms/${room.id}`} onClick={() => setIsOpen(false)} className="p-1.5 bg-slate-50 hover:bg-primary-50 text-slate-400 hover:text-primary-500 rounded-lg transition-colors"><ArrowUpRight className="w-4 h-4" /></a>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: BUDGET PLANNER */}
            {activeTab === 'planner' && (
              <div className="space-y-4 text-xs">
                <div className="bg-white dark:bg-slate-900 border border-slate-150/40 dark:border-slate-800 p-4.5 rounded-2xl space-y-4">
                  <h4 className="font-outfit font-black text-slate-850 dark:text-white">AI Student Budget Optimizer</h4>

                  <div className="space-y-3">
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase">
                        <span>Expected Rent</span>
                        <span>₹{plannerRent}</span>
                      </div>
                      <input type="range" min="3000" max="15000" step="500" value={plannerRent} onChange={(e) => setPlannerRent(parseInt(e.target.value))} className="w-full accent-primary-500 h-1" />
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase">
                        <span>Expected Mess Package</span>
                        <span>₹{plannerFood}</span>
                      </div>
                      <input type="range" min="1500" max="6000" step="250" value={plannerFood} onChange={(e) => setPlannerFood(parseInt(e.target.value))} className="w-full accent-primary-500 h-1" />
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase">
                        <span>Travel / Gas / Util</span>
                        <span>₹{plannerTravel}</span>
                      </div>
                      <input type="range" min="0" max="4000" step="250" value={plannerTravel} onChange={(e) => setPlannerTravel(parseInt(e.target.value))} className="w-full accent-primary-500 h-1" />
                    </div>
                  </div>

                  <button onClick={runBudgetPlanner} className="w-full py-2 bg-primary-600 hover:bg-primary-500 text-white rounded-xl font-bold shadow-sm">
                    Optimize Expenses
                  </button>
                </div>

                {plannerAdvice && (
                  <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-700 dark:text-indigo-300">
                    <h5 className="font-bold flex items-center mb-1"><DollarSign className="w-3.5 h-3.5 mr-1" /> AI Optimization Suggestion</h5>
                    <p className="leading-relaxed text-[11px]">{plannerAdvice}</p>
                  </div>
                )}
              </div>
            )}

            {/* TAB 4: RENT COMPARISON */}
            {activeTab === 'compare' && (
              <div className="space-y-4 text-xs">
                <div className="bg-white dark:bg-slate-900 border border-slate-150/40 dark:border-slate-800 p-4.5 rounded-2xl space-y-4">
                  <h4 className="font-outfit font-black text-slate-850 dark:text-white">AI Rent Value Evaluator</h4>

                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase">City</label>
                        <select value={compCity} onChange={(e) => setCompCity(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-950 border rounded-lg p-1.5 outline-none">
                          <option value="Pune">Pune</option>
                          <option value="Mumbai">Mumbai</option>
                          <option value="Kolhapur">Kolhapur</option>
                          <option value="Sangli">Sangli</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase">Locality Area</label>
                        <input type="text" placeholder="e.g. Kothrud" value={compArea} onChange={(e) => setCompArea(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-950 border rounded-lg p-1 px-2.5 outline-none" />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase">Offered Monthly Rent (₹)</label>
                      <input type="number" placeholder="e.g. 7500" value={compRent} onChange={(e) => setCompRent(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-950 border rounded-lg p-1 px-2.5 outline-none" />
                    </div>
                  </div>

                  <button onClick={runRentComparison} className="w-full py-2 bg-primary-600 hover:bg-primary-500 text-white rounded-xl font-bold shadow-sm">
                    Evaluate Rent Integrity
                  </button>
                </div>

                {compResult && (
                  <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300">
                    <h5 className="font-bold flex items-center mb-1"><CheckCircle className="w-3.5 h-3.5 mr-1" /> SafeMatch rent report</h5>
                    <p className="leading-relaxed text-[11px]">{compResult}</p>
                  </div>
                )}
              </div>
            )}

            {/* TAB 5: SCAM GUARD DETECTION */}
            {activeTab === 'scam' && (
              <div className="space-y-4 text-xs">
                <div className="bg-white dark:bg-slate-900 border border-slate-150/40 dark:border-slate-800 p-4.5 rounded-2xl space-y-4">
                  <h4 className="font-outfit font-black text-slate-850 dark:text-white">AI Scam Guard Scan</h4>
                  <p className="text-slate-400 text-[10px] leading-relaxed">
                    Paste mock stay descriptions or copy-pasted owner messages. We evaluate linguistic tricks used by non-verified brokers.
                  </p>

                  <textarea
                    placeholder="Paste listing text here (e.g., Send advance deposit to lock key, Owner out of station...)"
                    rows="3.5"
                    value={scamText}
                    onChange={(e) => setScamText(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 rounded-xl p-3 outline-none"
                  />

                  <button onClick={runScamDetection} className="w-full py-2 bg-primary-600 hover:bg-primary-500 text-white rounded-xl font-bold shadow-sm">
                    {scamLoading ? 'Scanning...' : 'Scan For Red Flags'}
                  </button>
                </div>

                {scamAnalysis && (
                  <div className={`p-4 rounded-xl border ${
                    scamAnalysis.score >= 80 
                      ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-700 dark:text-emerald-300'
                      : 'bg-rose-500/10 border-rose-500/20 text-rose-700 dark:text-rose-350'
                  }`}>
                    <h5 className="font-bold flex items-center mb-1">
                      <AlertTriangle className="w-3.5 h-3.5 mr-1" /> 
                      Stay Safety Score: {scamAnalysis.score}%
                    </h5>
                    <ul className="list-disc pl-4 space-y-1 mt-2 text-[10px]">
                      {scamAnalysis.flags.map((flg, index) => (
                        <li key={index}>{flg}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
