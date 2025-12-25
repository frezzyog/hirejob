
import React, { useState, useEffect } from 'react';
import { Moon, Sun, Languages, Menu, X, Cpu } from 'lucide-react';
import { i18n, Language } from '../services/i18n';
import Sidebar from './Sidebar';
import CareerInsights from './CareerInsights';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  userProfile?: {
    name: string;
    email: string;
    avatar?: string;
  };
}

const Layout: React.FC<LayoutProps> = ({
  children,
  activeTab,
  setActiveTab,
  isDarkMode,
  toggleDarkMode,
  userProfile
}) => {
  const [currentLang, setCurrentLang] = useState<Language>(i18n.getLanguage());
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = i18n.subscribe((lang) => {
      setCurrentLang(lang);
    });
    return unsubscribe;
  }, []);

  const toggleLanguage = () => {
    const newLang: Language = currentLang === 'en' ? 'km' : 'en';
    i18n.setLanguage(newLang);
  };

  return (
    <div className={`min-h-screen flex bg-[#f8fafc] text-slate-900 selection:bg-indigo-500/10`}>
      {/* Left Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setIsSidebarOpen(false);
        }}
        userProfile={userProfile}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-96 bg-hero-glow -z-10 opacity-20 pointer-events-none" />

        {/* Top Header Bar */}
        <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-slate-200/60 shadow-sm">
          <div className="px-4 md:px-6 h-16 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 -ml-2 rounded-xl hover:bg-slate-100 md:hidden text-slate-600"
              >
                <Menu size={24} />
              </button>
              <div className="flex items-center gap-3 md:hidden">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                  <Cpu size={16} className="text-white" />
                </div>
                <span className="font-black tracking-tighter">HireJob<span className="text-indigo-500">.AI</span></span>
              </div>
              <div className="hidden md:block">
                <h2 className="text-xl font-bold tracking-tight text-slate-900 capitalize">{activeTab.replace('-', ' ')}</h2>
                <p className="text-xs text-slate-500 font-medium">Next-Gen Recruitment Platform</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl hover:bg-slate-100 transition-colors text-sm font-bold text-slate-500 hover:text-slate-900"
              >
                <Languages size={16} />
                <span>{currentLang.toUpperCase()}</span>
              </button>
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-xl hover:bg-slate-100 transition-colors text-slate-400 hover:text-amber-500"
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          </div>
        </header>

        {/* Center Content Panel */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>

      {/* Right Insights Panel - Hidden on smaller screens */}
      <div className="hidden xl:block">
        <CareerInsights profileCompletion={75} />
      </div>
    </div>
  );
};

export default Layout;
