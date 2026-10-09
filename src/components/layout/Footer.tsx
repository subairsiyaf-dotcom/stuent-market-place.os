import React from 'react';
import { GraduationCap, Heart, Shield, HelpCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-xs">
              C
            </div>
            <span className="font-semibold text-slate-700">CampusMate Platform</span>
            <span>— Simplify your college workflow.</span>
          </div>

          <div className="flex items-center gap-6">
            <span className="hover:text-slate-800 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-800 cursor-pointer">Campus Guidelines</span>
            <span className="hover:text-slate-800 cursor-pointer flex items-center gap-1">
              <HelpCircle className="w-3.5 h-3.5" /> Support & Help
            </span>
          </div>

        </div>
      </div>
    </footer>
  );
};
