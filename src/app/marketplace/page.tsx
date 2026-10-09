'use client';

import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Search, 
  Tag, 
  MapPin, 
  Star, 
  Plus, 
  Bookmark, 
  MessageSquare, 
  X, 
  CheckCircle2, 
  DollarSign, 
  Sparkles,
  UserCheck
} from 'lucide-react';
import { initialMarketplace } from '@/data/mockData';
import { MarketplaceItem } from '@/types';

export default function MarketplacePage() {
  const [items, setItems] = useState<MarketplaceItem[]>(initialMarketplace);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedCondition, setSelectedCondition] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<number>(300);

  // Chat / Buy Modal State
  const [activeItem, setActiveItem] = useState<MarketplaceItem | null>(null);
  const [chatMessage, setChatMessage] = useState<string>('');
  const [chatSent, setChatSent] = useState<boolean>(false);

  // List Item Modal State
  const [isListModalOpen, setIsListModalOpen] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState('');
  const [newPrice, setNewPrice] = useState(50);
  const [newCategory, setNewCategory] = useState<'Textbooks' | 'Electronics' | 'Dorm Gear' | 'Clothing' | 'Bicycles' | 'Lab Kits'>('Textbooks');
  const [newCondition, setNewCondition] = useState<'Brand New' | 'Like New' | 'Good' | 'Used'>('Like New');
  const [newLocation, setNewLocation] = useState('');
  const [newDescription, setNewDescription] = useState('');

  const categories = ['All', 'Textbooks', 'Electronics', 'Dorm Gear', 'Clothing', 'Bicycles', 'Lab Kits'];
  const conditions = ['All', 'Brand New', 'Like New', 'Good', 'Used'];

  const filteredItems = items.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesCondition = selectedCondition === 'All' || item.condition === selectedCondition;
    const matchesPrice = item.price <= maxPrice;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.sellerName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesCondition && matchesPrice && matchesSearch;
  });

  const toggleSaveItem = (id: string) => {
    setItems(items.map(item => item.id === id ? { ...item, isSaved: !item.isSaved } : item));
    if (activeItem && activeItem.id === id) {
      setActiveItem({ ...activeItem, isSaved: !activeItem.isSaved });
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage) return;
    setChatSent(true);
    setTimeout(() => {
      setChatSent(false);
      setChatMessage('');
    }, 3000);
  };

  const handleListItemSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newPrice) return;

    const newItem: MarketplaceItem = {
      id: `mkt-${Date.now()}`,
      title: newTitle,
      price: Number(newPrice),
      category: newCategory,
      condition: newCondition,
      sellerName: 'Alex Vance',
      sellerRating: 5.0,
      postedDate: 'Oct 09, 2026',
      location: newLocation || 'North Dorm Block B',
      image: newCategory === 'Electronics'
        ? 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=600'
        : 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=600',
      description: newDescription || 'Posted on CampusMate student marketplace.',
      isSaved: false,
    };

    setItems([newItem, ...items]);
    setIsListModalOpen(false);
    setNewTitle('');
    setNewPrice(50);
    setNewDescription('');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Top Header Card */}
      <div className="bg-gradient-to-r from-purple-800 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-purple-200">
            <ShoppingBag className="w-3.5 h-3.5 text-purple-300" /> Student Peer-to-Peer Exchange
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Student Marketplace</h1>
          <p className="text-xs text-purple-100/90 max-w-xl">
            Buy & sell textbooks, lab equipment, monitors, bikes, and dorm furniture directly with fellow classmates.
          </p>
        </div>

        <button
          onClick={() => setIsListModalOpen(true)}
          className="inline-flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white font-bold px-5 py-3 rounded-2xl text-xs shadow-lg transition-all hover:scale-105"
        >
          <Plus className="w-4 h-4" /> Sell an Item
        </button>
      </div>

      {/* Filters & Search Row */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Condition & Search */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <select
            value={selectedCondition}
            onChange={(e) => setSelectedCondition(e.target.value)}
            className="w-full sm:w-auto px-3.5 py-2 bg-slate-100 text-xs font-bold text-slate-700 rounded-xl outline-none"
          >
            {conditions.map(c => <option key={c} value={c}>Condition: {c}</option>)}
          </select>

          <div className="relative w-full sm:w-60">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search monitor, books, bike..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-100 rounded-xl text-xs outline-none focus:bg-white focus:ring-2 focus:ring-purple-500 border border-transparent"
            />
          </div>
        </div>

      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="relative h-48 w-full overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-lg text-emerald-400 font-extrabold text-xs">
                  ${item.price}
                </span>

                <button
                  onClick={() => toggleSaveItem(item.id)}
                  className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-colors ${
                    item.isSaved ? 'bg-purple-600 text-white' : 'bg-slate-900/60 text-white hover:bg-slate-900'
                  }`}
                >
                  <Bookmark className="w-4 h-4" />
                </button>

                <span className="absolute bottom-3 left-3 bg-purple-900/80 backdrop-blur-md px-2.5 py-0.5 rounded-md text-purple-200 text-[10px] font-semibold">
                  {item.condition}
                </span>
              </div>

              <div className="p-4 space-y-2">
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span className="font-semibold text-purple-700">{item.category}</span>
                  <span>{item.postedDate}</span>
                </div>

                <h3 
                  onClick={() => setActiveItem(item)}
                  className="text-sm font-bold text-slate-900 hover:text-purple-600 transition-colors cursor-pointer line-clamp-1"
                >
                  {item.title}
                </h3>

                <p className="text-xs text-slate-500 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-slate-400" /> {item.location}
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                  <span className="text-slate-600 font-medium">{item.sellerName}</span>
                  <span className="text-amber-500 font-bold flex items-center gap-0.5">
                    <Star className="w-3.5 h-3.5 fill-amber-400" /> {item.sellerRating}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 pt-0">
              <button
                onClick={() => setActiveItem(item)}
                className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 shadow-sm"
              >
                <MessageSquare className="w-3.5 h-3.5" /> Buy / Chat Seller
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Item Detail & Seller Chat Modal */}
      {activeItem && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl space-y-4 animate-in zoom-in-95">
            <div className="relative h-56 w-full">
              <img src={activeItem.image} alt={activeItem.title} className="w-full h-full object-cover" />
              <button onClick={() => setActiveItem(null)} className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/70 text-white">
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-4 bg-emerald-500 text-white font-extrabold text-sm px-3 py-1 rounded-lg">
                Price: ${activeItem.price}
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900">{activeItem.title}</h2>
                <p className="text-xs text-slate-500 mt-1">Condition: <strong className="text-purple-700">{activeItem.condition}</strong> | Pickup: {activeItem.location}</p>
              </div>

              <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                {activeItem.description}
              </p>

              {/* Chat Form */}
              <div className="pt-3 border-t border-slate-100 space-y-3">
                <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <MessageSquare className="w-4 h-4 text-purple-600" />
                  Send Instant Message to Seller ({activeItem.sellerName})
                </h4>

                {chatSent ? (
                  <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Message sent! The seller has been notified via campus chat.
                  </div>
                ) : (
                  <form onSubmit={handleSendMessage} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. Hi! Is this item still available for pickup today?"
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      className="flex-1 px-3.5 py-2 border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-purple-600 text-white font-bold rounded-xl text-xs hover:bg-purple-700"
                    >
                      Send
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* List Item Modal Form */}
      {isListModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Plus className="w-5 h-5 text-purple-600" />
                List an Item for Sale
              </h3>
              <button onClick={() => setIsListModalOpen(false)} className="p-1 text-slate-400 hover:bg-slate-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleListItemSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Item Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. TI-84 Plus CE Graphing Calculator"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Price ($ USD) *</label>
                  <input
                    type="number"
                    required
                    value={newPrice}
                    onChange={(e) => setNewPrice(Number(e.target.value))}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs outline-none"
                  >
                    <option value="Textbooks">Textbooks</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Dorm Gear">Dorm Gear</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Bicycles">Bicycles</option>
                    <option value="Lab Kits">Lab Kits</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Condition</label>
                  <select
                    value={newCondition}
                    onChange={(e) => setNewCondition(e.target.value as any)}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs outline-none"
                  >
                    <option value="Brand New">Brand New</option>
                    <option value="Like New">Like New</option>
                    <option value="Good">Good</option>
                    <option value="Used">Used</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Pickup Location</label>
                  <input
                    type="text"
                    placeholder="e.g. North Dorm Block A"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Item Description</label>
                <textarea
                  rows={3}
                  placeholder="Include specs, reason for selling, accessories included..."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsListModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-purple-600 text-white shadow-md hover:bg-purple-700"
                >
                  Publish Listing
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
