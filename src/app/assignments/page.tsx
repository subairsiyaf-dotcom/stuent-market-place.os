'use client';

import React, { useState } from 'react';
import { 
  CheckSquare, 
  Search, 
  Filter, 
  Plus, 
  Calendar, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  X, 
  FileText, 
  Grid, 
  List,
  Sparkles
} from 'lucide-react';
import { initialAssignments } from '@/data/mockData';
import { Assignment } from '@/types';

export default function AssignmentsPage() {
  const [assignments, setAssignments] = useState<Assignment[]>(initialAssignments);
  const [activeStatusFilter, setActiveStatusFilter] = useState<'All' | 'Pending' | 'Submitted' | 'Overdue'>('All');
  const [courseFilter, setCourseFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  
  // Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCourseCode, setNewCourseCode] = useState('CS302');
  const [newDueDate, setNewDueDate] = useState('');
  const [newPriority, setNewPriority] = useState<'High' | 'Medium' | 'Low'>('Medium');
  const [newDescription, setNewDescription] = useState('');
  const [newMaxScore, setNewMaxScore] = useState(100);

  // Filtered Logic
  const filteredAssignments = assignments.filter((item) => {
    const matchesStatus = activeStatusFilter === 'All' || item.status === activeStatusFilter;
    const matchesCourse = courseFilter === 'All' || item.courseCode === courseFilter;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesCourse && matchesSearch;
  });

  const toggleStatus = (id: string) => {
    setAssignments(assignments.map(item => {
      if (item.id === id) {
        const nextStatus = item.status === 'Submitted' ? 'Pending' : 'Submitted';
        return { ...item, status: nextStatus };
      }
      return item;
    }));
  };

  const handleAddAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newDueDate) return;

    const newEntry: Assignment = {
      id: `asgn-${Date.now()}`,
      title: newTitle,
      courseCode: newCourseCode,
      courseName: newCourseCode === 'CS302' ? 'Database Management Systems' : 'Web Engineering',
      dueDate: newDueDate,
      priority: newPriority,
      status: 'Pending',
      description: newDescription || 'Standard course coursework assignment.',
      maxScore: Number(newMaxScore),
    };

    setAssignments([newEntry, ...assignments]);
    setIsAddModalOpen(false);
    setNewTitle('');
    setNewDueDate('');
    setNewDescription('');
  };

  const coursesList = Array.from(new Set(assignments.map(a => a.courseCode)));

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Top Header & Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold mb-2">
            <CheckSquare className="w-3.5 h-3.5" /> Deadlines & Tasks
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Assignments Tracker</h1>
          <p className="text-xs text-slate-500 mt-1">Keep track of coursework, project submissions and lab reports.</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs shadow-md shadow-blue-500/20 transition-all hover:scale-105"
          >
            <Plus className="w-4 h-4" /> Add Assignment
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {(['All', 'Pending', 'Submitted', 'Overdue'] as const).map((status) => {
            const count = status === 'All' 
              ? assignments.length 
              : assignments.filter(a => a.status === status).length;
            const isActive = activeStatusFilter === status;
            return (
              <button
                key={status}
                onClick={() => setActiveStatusFilter(status)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {status}
                <span className={`px-1.5 py-0.2 rounded-md text-[10px] ${
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search & Select Course */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 md:w-60">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-slate-100 rounded-xl text-xs focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none border border-transparent"
            />
          </div>

          <select
            value={courseFilter}
            onChange={(e) => setCourseFilter(e.target.value)}
            className="px-3 py-1.5 bg-slate-100 text-xs font-bold text-slate-700 rounded-xl outline-none border border-transparent focus:bg-white focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All Courses</option>
            {coursesList.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <div className="flex items-center bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg ${viewMode === 'grid' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-500'}`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg ${viewMode === 'table' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-500'}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* Grid or Table View of Assignments */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAssignments.map((item) => (
            <div
              key={item.id}
              className={`bg-white rounded-3xl p-6 border transition-all shadow-sm flex flex-col justify-between hover:shadow-md ${
                item.status === 'Submitted'
                  ? 'border-emerald-200 bg-emerald-50/20'
                  : item.status === 'Overdue'
                  ? 'border-rose-200 bg-rose-50/20'
                  : 'border-slate-200 hover:border-blue-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-700 font-bold text-xs">
                    {item.courseCode}
                  </span>

                  <div className="flex items-center gap-2">
                    {item.priority === 'High' && (
                      <span className="px-2 py-0.5 rounded-md bg-rose-100 text-rose-700 text-[10px] font-extrabold uppercase">
                        High Priority
                      </span>
                    )}
                    {item.priority === 'Medium' && (
                      <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 text-[10px] font-bold uppercase">
                        Medium
                      </span>
                    )}
                    {item.priority === 'Low' && (
                      <span className="px-2 py-0.5 rounded-md bg-blue-100 text-blue-700 text-[10px] font-bold uppercase">
                        Low
                      </span>
                    )}
                  </div>
                </div>

                <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug">{item.title}</h3>
                <p className="text-xs text-slate-600 line-clamp-3 mb-4 leading-relaxed">{item.description}</p>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" /> Due: {item.dueDate}
                  </span>
                  <span className="font-bold text-slate-700">{item.maxScore} pts</span>
                </div>

                <button
                  onClick={() => toggleStatus(item.id)}
                  className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                    item.status === 'Submitted'
                      ? 'bg-emerald-600 text-white shadow-sm hover:bg-emerald-700'
                      : item.status === 'Overdue'
                      ? 'bg-rose-600 text-white hover:bg-rose-700'
                      : 'bg-slate-100 text-slate-700 hover:bg-blue-600 hover:text-white'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  {item.status === 'Submitted' ? 'Marked as Completed ✓' : 'Mark Completed'}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Table View */
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200">
                <th className="p-4">Course</th>
                <th className="p-4">Assignment Title</th>
                <th className="p-4">Due Date</th>
                <th className="p-4">Priority</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredAssignments.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-4 font-bold text-slate-800">{item.courseCode}</td>
                  <td className="p-4 font-semibold text-slate-900 max-w-xs truncate">{item.title}</td>
                  <td className="p-4 text-slate-600">{item.dueDate}</td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      item.priority === 'High' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {item.priority}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      item.status === 'Submitted' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => toggleStatus(item.id)}
                      className="px-3 py-1.5 bg-blue-50 text-blue-700 font-bold rounded-lg hover:bg-blue-600 hover:text-white transition-colors"
                    >
                      Toggle
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Assignment Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-5 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                Add New Coursework Assignment
              </h3>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddAssignment} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Assignment Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Lab Report 3 - Distributed Locks"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Course Code</label>
                  <select
                    value={newCourseCode}
                    onChange={(e) => setNewCourseCode(e.target.value)}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs outline-none"
                  >
                    <option value="CS302">CS302 Database Systems</option>
                    <option value="CS304">CS304 Operating Systems</option>
                    <option value="CS308">CS308 Web Engineering</option>
                    <option value="MATH201">MATH201 Applied Math</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Due Date *</label>
                  <input
                    type="date"
                    required
                    value={newDueDate}
                    onChange={(e) => setNewDueDate(e.target.value)}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Priority</label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value as any)}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs outline-none"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Max Score (Points)</label>
                  <input
                    type="number"
                    value={newMaxScore}
                    onChange={(e) => setNewMaxScore(Number(e.target.value))}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Description / Instructions</label>
                <textarea
                  rows={3}
                  placeholder="Provide key requirements, formatting details or submission portal links..."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-blue-600 text-white shadow-md hover:bg-blue-700"
                >
                  Save Assignment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
