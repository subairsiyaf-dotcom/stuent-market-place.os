'use client';

import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Tag, 
  Clock, 
  Plus, 
  AlertCircle, 
  CheckCircle2, 
  Mail, 
  Phone, 
  X, 
  Gift, 
  Filter, 
  Sparkles,
  UserCheck
} from 'lucide-react';
import { initialLostAndFound } from '@/data/mockData';
import { LostAndFoundItem } from '@/types';

export default function LostAndFoundPage() {
  const [items, setItems] = useState<LostAndFoundItem[]>(initialLostAndFound);
  const [activeTab, setActiveTab] = useState<'All' | 'Lost' | 'Found'>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Contact Modal
  const [contactItem, setContactItem] = useState<LostAndFoundItem | null>(null);

  // Report Form Modal
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState<'Lost' | 'Found'>('Lost');
  const [newCategory, setNewCategory] = useState<'Electronics' | 'Documents/ID' | 'Keys/Wallet' | 'Clothing' | 'Books' | 'Other'>('Electronics');
  const [newLocation, setNewLocation] = useState('');
  const [newContactPerson, setNewContactPerson] = useState('');
  const [newContactEmail, setNewContactEmail] = useState('');
  const [newReward, setNewReward] = useState('');
  const [newDescription, setNewDescription] = useState('');

  const categories = ['All', 'Electronics', 'Documents/ID', 'Keys/Wallet', 'Clothing', 'Books', 'Other'];

  const filteredItems = items.filter(item => {
    const matchesTab = activeTab === 'All' || item.type === activeTab;
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesCategory && matchesSearch;
  });

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newLocation) return;

    const newItem: LostAndFoundItem = {
      id: `laf-${Date.now()}`,
      title: newTitle,
      type: newType,
      category: newCategory,
      location: newLocation,
      dateReported: 'Oct 09, 2026',
      status: 'Active',
      contactPerson: newContactPerson || 'Alex Vance',
      contactEmail: newContactEmail || 'alex.v@campus.edu',
      description: newDescription || 'Reported via CampusMate Lost & Found Portal.',
      reward: newReward || undefined,
      image: newCategory === 'Electronics' 
        ? 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=600'
        : 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=600',
    };

    setItems([newItem, ...items]);
    setIsReportModalOpen(false);
    setNewTitle('');
    setNewLocation('');
    setNewDescription('');
  };

  const markResolved = (id: string) => {
    setItems(items.map(item => item.id === id ? { ...item, status: 'Resolved' } : item));
    if (contactItem && contactItem.id === id) {
      setContactItem({ ...contactItem, status: 'Resolved' });
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Top Header Card */}
      <div className="bg-gradient-to-r from-rose-700 via-pink-700 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-rose-100">
            <Search className="w-3.5 h-3.5 text-rose-300" /> Community Belonging Recovery
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Lost & Found Community Hub</h1>
          <p className="text-xs text-rose-100/90 max-w-xl">
            Report misplaced student IDs, electronics, keys or textbooks and help campus peers locate missing items.
          </p>
        </div>

        <button
          onClick={() => setIsReportModalOpen(true)}
          className="inline-flex items-center gap-2 bg-white text-rose-800 font-bold px-5 py-3 rounded-2xl text-xs shadow-lg hover:bg-rose-50 transition-all hover:scale-105"
        >
          <Plus className="w-4 h-4 text-rose-600" /> Report Lost / Found Item
        </button>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        
        {/* Status Tabs: All, Lost, Found */}
        <div className="flex items-center gap-2">
          {(['All', 'Lost', 'Found'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === tab
                  ? tab === 'Lost'
                    ? 'bg-rose-600 text-white shadow-sm'
                    : tab === 'Found'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab === 'Lost' && '🔴 '}
              {tab === 'Found' && '🟢 '}
              {tab} Items
            </button>
          ))}
        </div>

        {/* Categories & Search */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full sm:w-auto px-3.5 py-2 bg-slate-100 text-xs font-bold text-slate-700 rounded-xl border border-transparent outline-none focus:bg-white focus:ring-2 focus:ring-rose-500"
          >
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>

          <div className="relative w-full sm:w-60">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search reports or locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-100 rounded-xl text-xs outline-none focus:bg-white focus:ring-2 focus:ring-rose-500 border border-transparent"
            />
          </div>
        </div>

      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className={`bg-white rounded-3xl overflow-hidden border shadow-sm transition-all hover:shadow-md flex flex-col justify-between ${
              item.status === 'Resolved' ? 'opacity-65 border-slate-200 bg-slate-50' : 'border-slate-200'
            }`}
          >
            <div>
              <div className="relative h-44 w-full">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                
                <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-white text-[10px] font-extrabold uppercase tracking-wide shadow-md ${
                  item.type === 'Lost' ? 'bg-rose-600' : 'bg-emerald-600'
                }`}>
                  {item.type}
                </span>

                {item.reward && (
                  <span className="absolute top-3 right-3 bg-amber-500 text-white font-bold text-[10px] px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-md">
                    <Gift className="w-3 h-3" /> {item.reward}
                  </span>
                )}
              </div>

              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-semibold text-slate-500">{item.category}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {item.dateReported}</span>
                </div>

                <h3 className="text-base font-bold text-slate-900 leading-snug line-clamp-1">{item.title}</h3>
                
                <p className="text-xs text-slate-600 flex items-center gap-1 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" /> {item.location}
                </p>

                <p className="text-xs text-slate-500 line-clamp-2 pt-2 border-t border-slate-100">
                  {item.description}
                </p>
              </div>
            </div>

            <div className="p-5 pt-0 flex items-center justify-between gap-3">
              <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                item.status === 'Resolved' ? 'bg-slate-200 text-slate-600' : 'bg-rose-50 text-rose-700'
              }`}>
                Status: {item.status}
              </span>

              <button
                onClick={() => setContactItem(item)}
                className="px-4 py-2 bg-slate-900 hover:bg-rose-600 text-white font-bold rounded-xl text-xs transition-colors shadow-sm"
              >
                Contact Owner
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Contact Owner Modal */}
      {contactItem && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Mail className="w-5 h-5 text-rose-600" />
                Contact Reporter
              </h3>
              <button onClick={() => setContactItem(null)} className="p-1 text-slate-400 hover:bg-slate-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs">
              <div>
                <span className="text-slate-400 font-semibold block">Report Title</span>
                <span className="font-bold text-slate-900">{contactItem.title}</span>
              </div>
              <div>
                <span className="text-slate-400 font-semibold block">Reporter Name</span>
                <span className="font-bold text-slate-800">{contactItem.contactPerson}</span>
              </div>
              <div>
                <span className="text-slate-400 font-semibold block">Email Address</span>
                <span className="font-bold text-blue-600 underline">{contactItem.contactEmail}</span>
              </div>
            </div>

            <p className="text-xs text-slate-500">
              Please email the reporter with verification proof or details regarding where to hand over the item.
            </p>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              {contactItem.status === 'Active' && (
                <button
                  onClick={() => markResolved(contactItem.id)}
                  className="px-3 py-1.5 bg-emerald-100 text-emerald-800 font-bold rounded-xl text-xs hover:bg-emerald-200"
                >
                  Mark Item as Resolved ✓
                </button>
              )}
              <button
                onClick={() => setContactItem(null)}
                className="px-4 py-2 bg-slate-900 text-white font-bold rounded-xl text-xs"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Report Modal Form */}
      {isReportModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Plus className="w-5 h-5 text-rose-600" />
                Submit Lost or Found Report
              </h3>
              <button onClick={() => setIsReportModalOpen(false)} className="p-1 text-slate-400 hover:bg-slate-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleReportSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Report Type</label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as any)}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs outline-none font-bold"
                  >
                    <option value="Lost">🔴 Lost Item</option>
                    <option value="Found">🟢 Found Item</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs outline-none"
                  >
                    <option value="Electronics">Electronics</option>
                    <option value="Documents/ID">Documents / ID</option>
                    <option value="Keys/Wallet">Keys / Wallet</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Books">Books</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Item Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Black Leather Wallet with Student ID"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Last Known Location *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Science Block 2nd Floor Hallway"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Optional Reward</label>
                  <input
                    type="text"
                    placeholder="e.g. $20 Cash Reward"
                    value={newReward}
                    onChange={(e) => setNewReward(e.target.value)}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Detailed Description</label>
                <textarea
                  rows={3}
                  placeholder="Include identifying marks, stickers, color, time of day lost..."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsReportModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-rose-600 text-white shadow-md hover:bg-rose-700"
                >
                  Post Report
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
