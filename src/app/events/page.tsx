'use client';

import React, { useState } from 'react';
import { 
  CalendarDays, 
  Search, 
  MapPin, 
  Clock, 
  Users, 
  Bookmark, 
  Share2, 
  Plus, 
  Calendar, 
  X, 
  Flame, 
  CheckCircle2, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { initialEvents } from '@/data/mockData';
import { CampusEvent } from '@/types';

export default function EventsPage() {
  const [events, setEvents] = useState<CampusEvent[]>(initialEvents);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Selected Event Modal State
  const [selectedEvent, setSelectedEvent] = useState<CampusEvent | null>(null);

  // Host Event Modal State
  const [isHostModalOpen, setIsHostModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<'Hackathon' | 'Workshop' | 'Cultural' | 'Sports' | 'Club' | 'Career'>('Workshop');
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newOrganizer, setNewOrganizer] = useState('');
  const [newDescription, setNewDescription] = useState('');

  const categories = ['All', 'Hackathon', 'Workshop', 'Cultural', 'Sports', 'Club', 'Career'];

  const filteredEvents = events.filter((ev) => {
    const matchesCategory = selectedCategory === 'All' || ev.category === selectedCategory;
    const matchesSearch = ev.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          ev.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          ev.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleRsvp = (id: string) => {
    setEvents(events.map(ev => {
      if (ev.id === id) {
        const nextRsvped = !ev.isRsvped;
        const nextCount = nextRsvped ? ev.rsvpsCount + 1 : ev.rsvpsCount - 1;
        return { ...ev, isRsvped: nextRsvped, rsvpsCount: nextCount };
      }
      return ev;
    }));

    if (selectedEvent && selectedEvent.id === id) {
      const nextRsvped = !selectedEvent.isRsvped;
      const nextCount = nextRsvped ? selectedEvent.rsvpsCount + 1 : selectedEvent.rsvpsCount - 1;
      setSelectedEvent({ ...selectedEvent, isRsvped: nextRsvped, rsvpsCount: nextCount });
    }
  };

  const toggleBookmark = (id: string) => {
    setEvents(events.map(ev => ev.id === id ? { ...ev, isBookmarked: !ev.isBookmarked } : ev));
    if (selectedEvent && selectedEvent.id === id) {
      setSelectedEvent({ ...selectedEvent, isBookmarked: !selectedEvent.isBookmarked });
    }
  };

  const handleHostEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newDate || !newLocation) return;

    const newEv: CampusEvent = {
      id: `evt-${Date.now()}`,
      title: newTitle,
      category: newCategory,
      date: newDate,
      time: newTime || '05:00 PM - 07:00 PM',
      location: newLocation,
      organizer: newOrganizer || 'Student Council',
      rsvpsCount: 1,
      isBookmarked: false,
      isRsvped: true,
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800',
      description: newDescription || 'Join us for an exciting campus session organized by students.',
    };

    setEvents([newEv, ...events]);
    setIsHostModalOpen(false);
    setNewTitle('');
    setNewDate('');
    setNewLocation('');
    setNewDescription('');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Top Header Card */}
      <div className="bg-gradient-to-r from-indigo-800 via-purple-800 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-indigo-200">
            <CalendarDays className="w-3.5 h-3.5 text-amber-300" /> Campus Life & Activities
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Events & Activity Feed</h1>
          <p className="text-xs text-indigo-100/90 max-w-xl">
            Discover upcoming hackathons, guest lectures, cultural fests, sports championships, and club workshops across campus.
          </p>
        </div>

        <button
          onClick={() => setIsHostModalOpen(true)}
          className="inline-flex items-center gap-2 bg-white text-indigo-900 font-bold px-5 py-3 rounded-2xl text-xs shadow-lg hover:bg-indigo-50 transition-all hover:scale-105"
        >
          <Plus className="w-4 h-4 text-indigo-600" /> Host an Event
        </button>
      </div>

      {/* Category Pills & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full lg:w-72">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search events, venue or clubs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-100 rounded-xl text-xs outline-none border border-transparent focus:bg-white focus:ring-2 focus:ring-indigo-500"
          />
        </div>

      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((ev) => (
          <div
            key={ev.id}
            className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div>
              {/* Event Cover Image */}
              <div className="relative h-48 w-full overflow-hidden">
                <img
                  src={ev.image}
                  alt={ev.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-white/90 backdrop-blur-md text-slate-900 text-[10px] font-extrabold uppercase tracking-wide">
                  {ev.category}
                </span>

                <button
                  onClick={() => toggleBookmark(ev.id)}
                  className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-colors ${
                    ev.isBookmarked ? 'bg-amber-500 text-white' : 'bg-slate-900/60 text-white hover:bg-slate-900'
                  }`}
                >
                  <Bookmark className="w-4 h-4" />
                </button>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[11px] font-semibold text-indigo-200 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> {ev.date}
                  </span>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-5 space-y-3">
                <h3 
                  onClick={() => setSelectedEvent(ev)}
                  className="text-base font-bold text-slate-900 hover:text-indigo-600 transition-colors cursor-pointer line-clamp-2"
                >
                  {ev.title}
                </h3>

                <div className="space-y-1 text-xs text-slate-500">
                  <p className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" /> {ev.time}
                  </p>
                  <p className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" /> {ev.location}
                  </p>
                  <p className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-slate-400 shrink-0" /> By {ev.organizer}
                  </p>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 pt-1 border-t border-slate-100">
                  {ev.description}
                </p>
              </div>
            </div>

            {/* Card Footer RSVP */}
            <div className="p-5 pt-0 flex items-center justify-between gap-3">
              <span className="text-xs font-bold text-slate-700">
                {ev.rsvpsCount} Students Attending
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedEvent(ev)}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-colors"
                >
                  Details
                </button>
                <button
                  onClick={() => toggleRsvp(ev.id)}
                  className={`px-4 py-1.5 rounded-xl font-bold text-xs transition-all ${
                    ev.isRsvped
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md'
                  }`}
                >
                  {ev.isRsvped ? '✓ Attending' : 'RSVP'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Event Details Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl space-y-4 animate-in zoom-in-95">
            <div className="relative h-56 w-full">
              <img src={selectedEvent.image} alt={selectedEvent.title} className="w-full h-full object-cover" />
              <button 
                onClick={() => setSelectedEvent(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/70 text-white hover:bg-slate-900"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-lg text-white font-bold text-xs">
                {selectedEvent.category}
              </div>
            </div>

            <div className="p-6 space-y-4">
              <h2 className="text-xl font-extrabold text-slate-900">{selectedEvent.title}</h2>

              <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <div>
                  <span className="text-slate-400 font-semibold block">Date & Time</span>
                  <span className="font-bold text-slate-800">{selectedEvent.date}, {selectedEvent.time}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold block">Location Venue</span>
                  <span className="font-bold text-slate-800">{selectedEvent.location}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold block">Organizer</span>
                  <span className="font-bold text-slate-800">{selectedEvent.organizer}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold block">Total RSVPs</span>
                  <span className="font-bold text-indigo-600">{selectedEvent.rsvpsCount} Confirmed</span>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">About This Event</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{selectedEvent.description}</p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <button
                  onClick={() => toggleBookmark(selectedEvent.id)}
                  className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5"
                >
                  <Bookmark className="w-4 h-4 text-slate-500" />
                  {selectedEvent.isBookmarked ? 'Bookmarked' : 'Save Event'}
                </button>

                <button
                  onClick={() => toggleRsvp(selectedEvent.id)}
                  className={`px-6 py-2.5 rounded-xl font-bold text-xs shadow-md transition-all ${
                    selectedEvent.isRsvped
                      ? 'bg-emerald-600 text-white'
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                  }`}
                >
                  {selectedEvent.isRsvped ? '✓ You are Attending' : 'Confirm RSVP'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Host Event Modal Form */}
      {isHostModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Plus className="w-5 h-5 text-indigo-600" />
                Host a Campus Event
              </h3>
              <button onClick={() => setIsHostModalOpen(false)} className="p-1 text-slate-400 hover:bg-slate-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleHostEvent} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Event Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. AI & ML Student Showcase"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs outline-none"
                  >
                    <option value="Workshop">Workshop</option>
                    <option value="Hackathon">Hackathon</option>
                    <option value="Cultural">Cultural</option>
                    <option value="Sports">Sports</option>
                    <option value="Club">Club</option>
                    <option value="Career">Career</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Event Date *</label>
                  <input
                    type="date"
                    required
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Venue / Location *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Auditorium B or Online Zoom"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Club / Host Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Coding Club"
                    value={newOrganizer}
                    onChange={(e) => setNewOrganizer(e.target.value)}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  placeholder="Outline schedule, prerequisites, guest speaker info..."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsHostModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-indigo-600 text-white shadow-md hover:bg-indigo-700"
                >
                  Publish Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
