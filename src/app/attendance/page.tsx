'use client';

import React, { useState } from 'react';
import { 
  Percent, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Plus, 
  History, 
  HelpCircle, 
  Calculator,
  UserCheck,
  Award,
  Sparkles
} from 'lucide-react';
import { initialAttendance } from '@/data/mockData';
import { AttendanceSubject } from '@/types';

export default function AttendancePage() {
  const [subjects, setSubjects] = useState<AttendanceSubject[]>(initialAttendance);
  const [targetMinPercentage, setTargetMinPercentage] = useState<number>(75);

  const totalAttendedAll = subjects.reduce((sum, s) => sum + s.attended, 0);
  const totalClassesAll = subjects.reduce((sum, s) => sum + s.total, 0);
  const overallPercentage = totalClassesAll > 0 
    ? Number(((totalAttendedAll / totalClassesAll) * 100).toFixed(1)) 
    : 0;

  const handleLogAttendance = (id: string, type: 'present' | 'absent') => {
    setSubjects(subjects.map(item => {
      if (item.id === id) {
        const nextAttended = type === 'present' ? item.attended + 1 : item.attended;
        const nextTotal = item.total + 1;
        return {
          ...item,
          attended: nextAttended,
          total: nextTotal,
          lastUpdated: 'Just now',
        };
      }
      return item;
    }));
  };

  // Helper Bunk Calculation
  const calculateBunkMargin = (attended: number, total: number, minPercent: number) => {
    const currentPct = (attended / total) * 100;
    const targetDecimal = minPercent / 100;

    if (currentPct >= minPercent) {
      // Safe to skip
      const safeToSkip = Math.floor((attended - targetDecimal * total) / targetDecimal);
      return {
        isSafe: true,
        count: Math.max(0, safeToSkip),
        message: safeToSkip > 0 ? `Safe to skip ${safeToSkip} lecture(s)` : 'On exact boundary (Do not miss)',
      };
    } else {
      // Must attend
      const mustAttend = Math.ceil((targetDecimal * total - attended) / (1 - targetDecimal));
      return {
        isSafe: false,
        count: Math.max(1, mustAttend),
        message: `Must attend next ${mustAttend} consecutive class(es)`,
      };
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Top Header Card */}
      <div className="bg-gradient-to-r from-teal-700 via-emerald-700 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-emerald-100">
            <Percent className="w-3.5 h-3.5 text-emerald-300" /> Smart Bunk & Attendance Calculator
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Attendance Analytics</h1>
          <p className="text-xs text-emerald-100/90 max-w-xl">
            Monitor lecture attendance per course, check exam eligibility, and calculate safe skips before missing a lecture.
          </p>
        </div>

        {/* Big Percentage Gauge */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 flex items-center gap-5 min-w-[240px]">
          <div className="relative w-16 h-16 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-white/20"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-emerald-300"
                strokeDasharray={`${overallPercentage}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <span className="absolute text-sm font-extrabold">{overallPercentage}%</span>
          </div>
          <div>
            <span className="text-[11px] font-bold text-emerald-200 uppercase tracking-wider">Overall Avg</span>
            <h4 className="text-lg font-bold text-white">
              {overallPercentage >= 75 ? 'Exam Eligible ✓' : 'Shortage Alert ⚠️'}
            </h4>
            <span className="text-[10px] text-emerald-100">Target: {targetMinPercentage}% minimum</span>
          </div>
        </div>
      </div>

      {/* Target Percentage Selector */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-2">
          <Calculator className="w-4 h-4 text-emerald-600" />
          <span className="font-bold text-slate-800">Minimum College Attendance Threshold:</span>
        </div>

        <div className="flex items-center gap-2">
          {[70, 75, 80, 85].map((val) => (
            <button
              key={val}
              onClick={() => setTargetMinPercentage(val)}
              className={`px-3 py-1 rounded-lg font-bold transition-all ${
                targetMinPercentage === val
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {val}%
            </button>
          ))}
        </div>
      </div>

      {/* Course Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjects.map((sub) => {
          const currentPct = Number(((sub.attended / sub.total) * 100).toFixed(1));
          const bunkInfo = calculateBunkMargin(sub.attended, sub.total, targetMinPercentage);

          return (
            <div
              key={sub.id}
              className={`bg-white rounded-3xl p-6 border shadow-sm space-y-4 flex flex-col justify-between transition-all hover:shadow-md ${
                bunkInfo.isSafe ? 'border-slate-200 hover:border-emerald-300' : 'border-rose-200 bg-rose-50/10'
              }`}
            >
              <div>
                {/* Course Header */}
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-800 font-bold text-xs">
                    {sub.courseCode}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                    bunkInfo.isSafe ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-700'
                  }`}>
                    {bunkInfo.isSafe ? 'Safe' : 'Shortage'}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 line-clamp-1">{sub.courseName}</h3>
                <p className="text-xs text-slate-500 mt-0.5">Faculty: {sub.faculty}</p>

                {/* Main Percentage Display & Progress Bar */}
                <div className="mt-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs text-slate-500 font-medium">Attended Stats</span>
                    <span className="text-xl font-extrabold text-slate-900">{currentPct}%</span>
                  </div>

                  <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        currentPct >= targetMinPercentage ? 'bg-emerald-500' : 'bg-rose-500'
                      }`}
                      style={{ width: `${Math.min(currentPct, 100)}%` }}
                    />
                  </div>

                  <div className="flex justify-between text-[11px] text-slate-500 font-medium pt-1">
                    <span>{sub.attended} Attended</span>
                    <span>{sub.total} Total Lectures</span>
                  </div>
                </div>

                {/* Bunk Predictor Box */}
                <div className={`mt-3 p-3 rounded-xl border text-xs flex items-center gap-2.5 ${
                  bunkInfo.isSafe
                    ? 'bg-emerald-50/70 border-emerald-200/80 text-emerald-800'
                    : 'bg-rose-50/70 border-rose-200/80 text-rose-800'
                }`}>
                  {bunkInfo.isSafe ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  )}
                  <span className="font-medium text-[11px] leading-tight">
                    {bunkInfo.message}
                  </span>
                </div>
              </div>

              {/* Quick Logger Buttons */}
              <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                <button
                  onClick={() => handleLogAttendance(sub.id, 'present')}
                  className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1 shadow-xs transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" /> Present
                </button>
                <button
                  onClick={() => handleLogAttendance(sub.id, 'absent')}
                  className="flex-1 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold rounded-xl text-xs flex items-center justify-center gap-1 transition-colors"
                >
                  <XCircle className="w-3.5 h-3.5" /> Absent
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
