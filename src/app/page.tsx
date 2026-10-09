'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  CheckSquare, 
  Percent, 
  CalendarDays, 
  Search, 
  ShoppingBag, 
  ArrowRight, 
  Clock, 
  AlertCircle, 
  PlusCircle, 
  Sparkles,
  TrendingUp,
  MapPin,
  CheckCircle2,
  Calendar,
  Flame,
  UserCheck
} from 'lucide-react';
import { 
  mockUser, 
  initialAssignments, 
  initialAttendance, 
  initialEvents, 
  initialLostAndFound, 
  initialMarketplace 
} from '@/data/mockData';

export default function DashboardPage() {
  const [assignments, setAssignments] = useState(initialAssignments);
  const [events, setEvents] = useState(initialEvents);

  const pendingAssignments = assignments.filter(a => a.status === 'Pending' || a.status === 'Overdue');
  const urgentAssignment = pendingAssignments[0];

  const handleQuickRsvp = (id: string) => {
    setEvents(events.map(ev => ev.id === id ? { ...ev, isRsvped: !ev.isRsvped, rsvpsCount: ev.isRsvped ? ev.rsvpsCount - 1 : ev.rsvpsCount + 1 } : ev));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 text-white p-6 sm:p-8 shadow-xl shadow-blue-500/10">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-blue-100">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              Welcome Back to Campus!
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Hello, {mockUser.name} 👋
            </h1>
            <p className="text-sm text-blue-100/90 max-w-xl">
              You have <span className="font-bold underline text-white">{pendingAssignments.length} pending assignments</span> this week. Your overall attendance is currently at <span className="font-bold text-emerald-300">{mockUser.overallAttendance}%</span>.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap gap-2.5">
            <Link
              href="/assignments"
              className="inline-flex items-center gap-2 bg-white text-blue-700 px-4 py-2.5 rounded-xl font-bold text-xs shadow-md hover:bg-blue-50 transition-all hover:scale-105"
            >
              <PlusCircle className="w-4 h-4" />
              View Deadlines
            </Link>
            <Link
              href="/attendance"
              className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 text-white px-4 py-2.5 rounded-xl font-semibold text-xs border border-white/20 backdrop-blur-sm transition-all"
            >
              <UserCheck className="w-4 h-4" />
              Log Attendance
            </Link>
          </div>
        </div>

        {/* Decorative background shapes */}
        <div className="absolute -right-12 -bottom-16 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute right-48 -top-12 w-48 h-48 bg-indigo-500/20 rounded-full blur-xl pointer-events-none" />
      </div>

      {/* Core Metric Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        {/* Metric 1: Assignments */}
        <div className="glass-card p-5 rounded-2xl shadow-sm border border-slate-200/80 hover:shadow-md transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Pending Work</span>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <CheckSquare className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">{pendingAssignments.length}</span>
            <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
              {assignments.filter(a => a.priority === 'High').length} High Priority
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            Next due in 2 days
          </p>
        </div>

        {/* Metric 2: Attendance */}
        <div className="glass-card p-5 rounded-2xl shadow-sm border border-slate-200/80 hover:shadow-md transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Overall Attendance</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Percent className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">{mockUser.overallAttendance}%</span>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
              Safe (&gt;75%)
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            Safe to skip 2 classes
          </p>
        </div>

        {/* Metric 3: Events */}
        <div className="glass-card p-5 rounded-2xl shadow-sm border border-slate-200/80 hover:shadow-md transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Campus Events</span>
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <CalendarDays className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">{events.length}</span>
            <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full">
              1 Hackathon
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 text-amber-500" />
            142 RSVPs on HackGenesis
          </p>
        </div>

        {/* Metric 4: Marketplace */}
        <div className="glass-card p-5 rounded-2xl shadow-sm border border-slate-200/80 hover:shadow-md transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Student Market</span>
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">{initialMarketplace.length}</span>
            <span className="text-xs font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full">
              New Listings
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5 text-purple-500" />
            Textbooks & Electronics
          </p>
        </div>

      </div>

      {/* Urgent Deadline Banner & Quick Attendance Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Urgent Assignment Highlight */}
        {urgentAssignment && (
          <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm relative overflow-hidden flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full bg-rose-100 text-rose-700 font-extrabold text-[11px] uppercase tracking-wide flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> Next Due Task
                </span>
                <span className="text-xs font-semibold text-slate-400">{urgentAssignment.courseCode}</span>
              </div>
              <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-lg">
                Due: {urgentAssignment.dueDate}
              </span>
            </div>

            <div className="my-4 space-y-1">
              <h3 className="text-lg font-bold text-slate-900 hover:text-blue-600 cursor-pointer transition-colors">
                {urgentAssignment.title}
              </h3>
              <p className="text-xs text-slate-600 line-clamp-2">
                {urgentAssignment.description}
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs">
              <span className="text-slate-500">Max Score: <strong className="text-slate-800">{urgentAssignment.maxScore} pts</strong></span>
              <Link 
                href="/assignments" 
                className="inline-flex items-center gap-1.5 font-bold text-blue-600 hover:text-blue-700 hover:underline"
              >
                Submit / Details <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}

        {/* Attendance Safe Status Box */}
        <div className="bg-gradient-to-br from-emerald-500 to-teal-700 rounded-3xl p-6 text-white shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-100">Bunk Margin Safe</span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-300 animate-ping" />
            </div>
            <h4 className="text-2xl font-extrabold">CS308 Web Eng.</h4>
            <p className="text-xs text-emerald-100 mt-1">26 / 28 classes attended (92.8%)</p>
          </div>

          <div className="my-4 bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/20">
            <p className="text-xs text-emerald-50">
              💡 You can safely miss up to <strong className="text-white underline">5 more lectures</strong> without dipping below the mandatory 75% threshold!
            </p>
          </div>

          <Link
            href="/attendance"
            className="w-full text-center py-2.5 bg-white text-emerald-800 font-bold rounded-xl text-xs shadow-md hover:bg-emerald-50 transition-colors"
          >
            Check All Courses
          </Link>
        </div>

      </div>

      {/* Two-Column Grid: Campus Events & Lost & Found Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Campus Events Section */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <CalendarDays className="w-5 h-5 text-indigo-600" />
                Featured Campus Events
              </h2>
              <p className="text-xs text-slate-500">Upcoming hackathons, workshops & club meets</p>
            </div>
            <Link href="/events" className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1">
              View All <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-4">
            {events.slice(0, 2).map((ev) => (
              <div key={ev.id} className="flex flex-col sm:flex-row gap-4 p-3.5 rounded-2xl bg-slate-50/70 border border-slate-100 hover:border-indigo-200 transition-all">
                <img 
                  src={ev.image} 
                  alt={ev.title} 
                  className="w-full sm:w-28 h-28 sm:h-auto rounded-xl object-cover"
                />
                <div className="flex-1 flex flex-col justify-between space-y-2">
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700">
                        {ev.category}
                      </span>
                      <span className="text-[11px] text-slate-500 flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-400" /> {ev.date}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 mt-1 line-clamp-1">{ev.title}</h4>
                    <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-slate-400" /> {ev.location}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-slate-200/60">
                    <span className="text-[11px] text-slate-500 font-medium">
                      👥 {ev.rsvpsCount} Attending
                    </span>
                    <button
                      onClick={() => handleQuickRsvp(ev.id)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                        ev.isRsvped 
                          ? 'bg-indigo-600 text-white' 
                          : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'
                      }`}
                    >
                      {ev.isRsvped ? '✓ RSVPed' : 'Quick RSVP'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lost & Found Community Bar */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Search className="w-5 h-5 text-rose-600" />
                Recent Lost & Found Reports
              </h2>
              <p className="text-xs text-slate-500">Help fellow students recover their belongings</p>
            </div>
            <Link href="/lost-and-found" className="text-xs font-bold text-rose-600 hover:underline flex items-center gap-1">
              Hub <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {initialLostAndFound.slice(0, 3).map((item) => (
              <div key={item.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-3 hover:bg-slate-100/60 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs ${
                    item.type === 'Lost' ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'
                  }`}>
                    {item.type}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{item.title}</h4>
                    <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-slate-400" /> {item.location}
                    </p>
                  </div>
                </div>

                <Link
                  href="/lost-and-found"
                  className="px-2.5 py-1 text-[11px] font-semibold text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50"
                >
                  Details
                </Link>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Student Marketplace Spotlight */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold mb-1 border border-purple-500/30">
              <ShoppingBag className="w-3.5 h-3.5" /> Peer-to-Peer Campus Store
            </div>
            <h2 className="text-xl font-extrabold tracking-tight">Marketplace Recommendations</h2>
            <p className="text-xs text-slate-300">Save money on textbooks, monitors, dorm chairs & gear</p>
          </div>
          <Link
            href="/marketplace"
            className="self-start sm:self-auto px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-xl transition-all shadow-md"
          >
            Explore Market
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {initialMarketplace.map((item) => (
            <div key={item.id} className="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-3.5 space-y-3 hover:border-purple-500/50 transition-all group">
              <div className="relative h-36 rounded-xl overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-2 right-2 bg-slate-900/80 backdrop-blur-md px-2 py-0.5 rounded-md text-emerald-400 font-extrabold text-xs">
                  ${item.price}
                </span>
                <span className="absolute bottom-2 left-2 bg-purple-900/80 backdrop-blur-md px-2 py-0.5 rounded-md text-purple-200 font-semibold text-[10px]">
                  {item.condition}
                </span>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-100 line-clamp-1">{item.title}</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">Seller: {item.sellerName} (★ {item.sellerRating})</p>
              </div>

              <Link
                href="/marketplace"
                className="block text-center w-full py-1.5 bg-slate-700 hover:bg-purple-600 text-white rounded-lg text-xs font-semibold transition-colors"
              >
                Contact Seller
              </Link>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
