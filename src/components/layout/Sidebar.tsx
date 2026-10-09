'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  CheckSquare, 
  Percent, 
  CalendarDays, 
  Search, 
  ShoppingBag, 
  Sparkles,
  ChevronRight,
  Bookmark,
  Award
} from 'lucide-react';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen = true, onClose }) => {
  const pathname = usePathname();

  const navigationItems = [
    {
      name: 'Dashboard Overview',
      href: '/',
      icon: LayoutDashboard,
      badge: 'Main',
      badgeColor: 'bg-blue-100 text-blue-700',
    },
    {
      name: 'Assignments & Deadlines',
      href: '/assignments',
      icon: CheckSquare,
      badge: '4 Pending',
      badgeColor: 'bg-amber-100 text-amber-800',
    },
    {
      name: 'Attendance Monitor',
      href: '/attendance',
      icon: Percent,
      badge: '84.5%',
      badgeColor: 'bg-emerald-100 text-emerald-800',
    },
    {
      name: 'Campus Events',
      href: '/events',
      icon: CalendarDays,
      badge: 'Live',
      badgeColor: 'bg-indigo-100 text-indigo-700',
    },
    {
      name: 'Lost & Found Hub',
      href: '/lost-and-found',
      icon: Search,
      badge: '4 Active',
      badgeColor: 'bg-rose-100 text-rose-700',
    },
    {
      name: 'Student Marketplace',
      href: '/marketplace',
      icon: ShoppingBag,
      badge: 'Market',
      badgeColor: 'bg-purple-100 text-purple-700',
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-30 lg:hidden transition-opacity"
        />
      )}

      <aside
        className={`fixed lg:sticky top-16 left-0 z-30 h-[calc(100vh-4rem)] w-64 bg-white border-r border-slate-200 flex flex-col justify-between transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-4 space-y-6 overflow-y-auto">
          
          {/* Main Navigation Links */}
          <div className="space-y-1">
            <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              Navigation Menu
            </p>
            {navigationItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all group ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isActive ? 'bg-white/20 text-white' : item.badgeColor
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Quick Academic Summary Box */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-100 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-900 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                Academic Pulse
              </span>
              <span className="text-[10px] bg-indigo-200/60 text-indigo-800 font-semibold px-1.5 py-0.5 rounded">
                Sem 5
              </span>
            </div>
            
            <div className="space-y-2 text-xs">
              <div>
                <div className="flex justify-between text-slate-600 font-medium mb-1">
                  <span>Semester Goal</span>
                  <span className="font-bold text-slate-800">85% Target</span>
                </div>
                <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full" style={{ width: '84.5%' }} />
                </div>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 leading-tight">
              Keep attendance above 75% across all 5 registered courses to stay exam eligible.
            </p>
          </div>

        </div>

        {/* Footer info in sidebar */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Award className="w-4 h-4 text-amber-500" />
            <div>
              <p className="font-semibold text-slate-700">CampusMate 1.0 MVP</p>
              <p className="text-[10px] text-slate-400">Built for College Productivity</p>
            </div>
          </div>
        </div>

      </aside>
    </>
  );
};
