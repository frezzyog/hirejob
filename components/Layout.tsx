
import React, { useState, useEffect } from 'react';
import { Moon, Sun, Languages, Menu, X } from 'lucide-react';
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
    <div className={`min-h-screen flex ${isDarkMode ? 'dark' : ''}`}>
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
      <div className="flex-1 flex flex-col bg-slate-50 dark:bg-slate-950 min-w-0">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
          <div className="px-4 md:px-6 h-16 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 -ml-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 md:hidden"
              >
                <Menu size={24} className="text-slate-600 dark:text-slate-400" />
              </button>
              <div>
                <h2 className="text-xl font-bold capitalize truncate">{activeTab.replace('-', ' ')}</h2>
                <p className="text-xs text-slate-500 hidden sm:block">Find your dream job in Cambodia</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-sm font-medium"
              >
                <Languages size={16} />
                <span>{currentLang.toUpperCase()}</span>
              </button>
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                {isDarkMode ? <Sun size={20} className="text-amber-400" /> : <Moon size={20} className="text-slate-600" />}
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
