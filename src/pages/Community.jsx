import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { 
  MessageSquare, ThumbsUp, PlusCircle, Search, Tag, 
  Book, HelpCircle, Lightbulb, PackageOpen, Check, Send 
} from 'lucide-react';

export default function Community() {
  const { communityPosts, addCommunityPost, upvotePost, user, addNotification } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Form State
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Discussions');
  const [newContent, setNewContent] = useState('');
  const [newContact, setNewContact] = useState('');

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const newPost = {
      id: `post-${Date.now()}`,
      title: newTitle,
      category: newCategory,
      content: newContent,
      author: user ? user.name : "Student Member",
      date: "Just now",
      upvotes: 0,
      commentsCount: 0,
      contact: newContact
    };

    addCommunityPost(newPost);
    
    // Clear Form
    setNewTitle('');
    setNewContent('');
    setNewContact('');
    setShowAddForm(false);
  };

  const categories = ['All', 'Buy & Sell', 'Lost & Found', 'Discussions', 'Local Tips'];

  const filteredPosts = communityPosts.filter(post => {
    const matchTab = activeTab === 'All' || post.category === activeTab;
    const matchSearch = !searchQuery || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchTab && matchSearch;
  });

  const getCategoryIcon = (cat) => {
    if (cat === 'Buy & Sell') return <Book className="w-3.5 h-3.5" />;
    if (cat === 'Lost & Found') return <PackageOpen className="w-3.5 h-3.5" />;
    if (cat === 'Local Tips') return <Lightbulb className="w-3.5 h-3.5" />;
    return <HelpCircle className="w-3.5 h-3.5" />;
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 transition-all min-h-screen">
      
      {/* Title */}
      <div className="mb-8 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="font-outfit font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white">
            Student Community Bulletin
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            Buy & sell books, find lost items, discuss exam schedules, and share local tips.
          </p>
        </div>
        
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-5 py-3 rounded-2xl bg-primary-600 hover:bg-primary-500 text-white font-bold text-xs shadow-md shadow-primary-500/10 transition-all flex items-center justify-center space-x-1.5 self-start sm:self-center"
        >
          <PlusCircle className="w-4.5 h-4.5" />
          <span>Publish Post</span>
        </button>
      </div>

      {/* Write New Post Form Dropdown */}
      {showAddForm && (
        <div className="bg-white dark:bg-slate-900 border border-slate-250/60 dark:border-slate-800 rounded-3xl p-6 shadow-md mb-8 animate-in fade-in slide-in-from-top-4 duration-300">
          <h3 className="font-outfit font-extrabold text-base text-slate-850 dark:text-white mb-4">Create New Bulletin Post</h3>
          <form onSubmit={handleCreatePost} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2 space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Post Title</label>
                <input
                  type="text"
                  placeholder="e.g. Selling Chemistry lab notebook"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 rounded-xl px-4 py-2.5 text-xs text-slate-800 dark:text-slate-200 outline-none focus:border-primary-500"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 rounded-xl px-3 py-2.5 text-xs font-semibold outline-none focus:border-primary-500 cursor-pointer"
                >
                  <option value="Buy & Sell">Buy & Sell</option>
                  <option value="Lost & Found">Lost & Found</option>
                  <option value="Discussions">Discussions</option>
                  <option value="Local Tips">Local Tips</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Description Content</label>
              <textarea
                placeholder="Give details about books, items lost, location landmarks, or tips..."
                rows="4"
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 rounded-2xl px-4 py-3 text-xs text-slate-800 dark:text-slate-200 outline-none focus:border-primary-500"
                required
              />
            </div>

            <div className="space-y-1 max-w-sm">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Contact Info (Optional)</label>
              <input
                type="text"
                placeholder="e.g. Phone number or email"
                value={newContact}
                onChange={(e) => setNewContact(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 rounded-xl px-4 py-2.5 text-xs text-slate-800 dark:text-slate-200 outline-none focus:border-primary-500"
              />
            </div>

            <div className="flex space-x-2 pt-2">
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-bold text-xs transition-colors flex items-center space-x-1"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Publish Post</span>
              </button>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-[10px] font-bold hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Search and Category navigation bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[28px] p-4 shadow-sm mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
        
        {/* Search */}
        <div className="relative w-full md:max-w-xs">
          <input
            type="text"
            placeholder="Search bulletin..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 focus:border-primary-500 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-800 dark:text-slate-200 outline-none transition-colors"
          />
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
        </div>

        {/* Tab Scroller */}
        <div className="flex overflow-x-auto w-full md:w-auto no-scrollbar space-x-1.5 py-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                activeTab === cat
                  ? 'bg-slate-950 text-white dark:bg-slate-800'
                  : 'bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-100 dark:border-slate-850 text-slate-500 dark:text-slate-400'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

      </div>

      {/* Bulletins lists */}
      <div className="space-y-4">
        {filteredPosts.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-[28px] border border-slate-100 dark:border-slate-850 py-16 text-center shadow-sm">
            <p className="text-xs text-slate-400">No postings found matching your parameters. Click "Publish Post" to write one!</p>
          </div>
        ) : (
          filteredPosts.map((post) => (
            <div 
              key={post.id}
              className="bg-white dark:bg-slate-900 border border-slate-150/40 dark:border-slate-800 rounded-3xl p-5 shadow-sm hover:shadow-md transition-shadow space-y-4 relative overflow-hidden"
            >
              
              {/* Top Details */}
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-0.5 rounded-lg text-[9px] font-bold bg-primary-50 dark:bg-primary-950/30 text-primary-600 dark:text-primary-400 flex items-center space-x-1 border border-primary-100/30">
                      {getCategoryIcon(post.category)}
                      <span>{post.category}</span>
                    </span>
                    <span className="text-[10px] text-slate-400 font-semibold">{post.date}</span>
                  </div>
                  
                  <h3 className="font-outfit font-extrabold text-base text-slate-900 dark:text-white pt-1">
                    {post.title}
                  </h3>
                </div>

                <span className="text-[10px] text-slate-400 font-medium">By: {post.author}</span>
              </div>

              {/* Body */}
              <p className="text-xs text-slate-600 dark:text-slate-350 leading-relaxed">
                {post.content}
              </p>

              {/* Contact info overlay */}
              {post.contact && (
                <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-2xl border border-slate-100 dark:border-slate-850/60 text-[10px] font-bold text-slate-700 dark:text-slate-300 inline-flex items-center">
                  <span>Seller/Reporter Contact: {post.contact}</span>
                </div>
              )}

              {/* Actions Footer */}
              <div className="flex items-center space-x-4 pt-3 border-t border-slate-100 dark:border-slate-850 text-xs">
                
                {/* Upvotes */}
                <button
                  onClick={() => upvotePost(post.id)}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 dark:bg-slate-950 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-primary-500 font-bold transition-colors border border-slate-100 dark:border-slate-850"
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>{post.upvotes} Upvotes</span>
                </button>

                {/* Comments */}
                <button
                  onClick={() => addNotification(`Simulating discussions window opening for post: "${post.title}"`)}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 dark:bg-slate-950 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-primary-500 font-bold transition-colors border border-slate-100 dark:border-slate-850"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>{post.commentsCount} Comments</span>
                </button>

              </div>

            </div>
          ))
        )}
      </div>

    </div>
  );
}
