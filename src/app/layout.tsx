'use client';

import React, { useState } from 'react';
import '@/app/globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <html lang="en">
      <head>
        <title>CampusMate — Student Platform</title>
        <meta name="description" content="All-in-one student productivity platform for assignments, attendance, events, lost-and-found and marketplace." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-slate-50 min-h-screen text-slate-900 font-sans antialiased">
        <div className="min-h-screen flex flex-col">
          <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
          
          <div className="flex-1 flex max-w-7xl w-full mx-auto">
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            
            <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden min-w-0">
              {children}
            </main>
          </div>

          <Footer />
        </div>
      </body>
    </html>
  );
}
