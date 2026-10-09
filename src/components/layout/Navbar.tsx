'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Bell, 
  Search, 
  User, 
  GraduationCap, 
  BookOpen, 
  Sparkles,
  Calendar,
  ShoppingBag,
  HelpCircle,
  Menu,
  X
} from 'lucide-react';
import { mockUser } from '@/data/mockData';

interface NavbarProps {
  onToggleSidebar?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const notifications = [
    { id: '1', title: 'Assignment Due Tomorrow', text: 'Database DBMS report due in 24h', time: '10m ago', unread: true },
    { id: '2', title: 'New Event Alert', text: 'HackGenesis 2026 starting this Friday', time: '2h ago', unread: true },
    { id: '3', title: 'Marketplace Inquiry', text: 'Michael replied about Dell Monitor', time: '1d ago', unread: false },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Left: Logo & Sidebar Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={onToggleSidebar}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 lg:hidden"
              aria-label="Toggle Sidebar"
            >
              <Menu className="w-6 h-6" />
            </button>
            
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl tracking-tight text-slate-900 flex items-center gap-1.5">
                  Campus<span className="text-blue-600">Mate</span>
                  <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded bg-blue-100 text-blue-700 tracking-wider">
                    MVP
                  </span>
                </span>
                <span className="text-xs text-slate-500 hidden sm:inline">Student Companion Portal</span>
              </div>
            </Link>
          </div>

          {/* Middle: Global Quick Search */}
          <div className="flex-1 max-w-md hidden md:block">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search assignments, events, lost items or marketplace..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm bg-slate-100 border border-transparent rounded-full focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all outline-none"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Right: Actions & User Avatar */}
          <div className="flex items-center gap-3">
            
            {/* Quick Campus Stats Badge */}
            <div className="hidden lg:flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 px-3 py-1 rounded-full text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Attendance: {mockUser.overallAttendance}% (Safe)
            </div>

            {/* Notification Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2.5 rounded-full text-slate-600 hover:text-blue-600 hover:bg-slate-100 transition-colors"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-rose-500 border-2 border-white" />
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-200 z-50 py-3 animate-in fade-in slide-in-from-top-2">
                  <div className="px-4 pb-2 border-b border-slate-100 flex items-center justify-between">
                    <span className="font-semibold text-slate-900 text-sm">Notifications</span>
                    <span className="text-xs font-medium text-blue-600 hover:underline cursor-pointer">Mark all read</span>
                  </div>
                  <div className="divide-y divide-slate-100 max-h-80 overflow-y-auto">
                    {notifications.map((n) => (
                      <div key={n.id} className={`p-3.5 hover:bg-slate-50 transition-colors ${n.unread ? 'bg-blue-50/40' : ''}`}>
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-xs font-semibold text-slate-900">{n.title}</h4>
                          <span className="text-[10px] text-slate-400 whitespace-nowrap">{n.time}</span>
                        </div>
                        <p className="text-xs text-slate-600 mt-1">{n.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* User Profile Badge */}
            <div className="flex items-center gap-3 pl-2 border-l border-slate-200">
              <img
                src={mockUser.avatar}
                alt={mockUser.name}
                className="w-9 h-9 rounded-full object-cover ring-2 ring-blue-500/20 shadow-sm"
              />
              <div className="hidden sm:flex flex-col">
                <span className="text-xs font-bold text-slate-900">{mockUser.name}</span>
                <span className="text-[10px] text-slate-500 font-medium">{mockUser.studentId}</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </header>
  );
};
