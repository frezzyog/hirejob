
import React from 'react';
import { supabase } from '../services/supabaseClient';
import {
    LayoutDashboard,
    Briefcase,
    MessageSquare,
    FileText,
    GraduationCap,
    Building2,
    Settings,
    TrendingUp,
    Target,
    Cpu,
    LogOut
} from 'lucide-react';
import { i18n } from '../services/i18n';

interface SidebarProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
    userProfile?: {
        name: string;
        email: string;
        avatar?: string;
    };
    isOpen: boolean;
    onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, userProfile, isOpen, onClose }) => {
    const menuItems = [
        { id: 'dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard', labelKm: 'ផ្ទាំងគ្រប់គ្រង' },
        { id: 'jobs', icon: <Briefcase size={20} />, label: i18n.t('jobs'), labelKm: 'ការងារ' },
        { id: 'applications', icon: <FileText size={20} />, label: 'My Applications', labelKm: 'ពាក្យសុំរបស់ខ្ញុំ' },
        { id: 'companies', icon: <Building2 size={20} />, label: 'Companies', labelKm: 'ក្រុមហ៊ុន' },
        { id: 'chat', icon: <MessageSquare size={20} />, label: i18n.t('hireAI'), labelKm: 'ជំនួយការ AI' },
        { id: 'interview-prep', icon: <GraduationCap size={20} />, label: 'Interview Prep', labelKm: 'ការត្រៀមសម្ភាសន៍' },
        { id: 'resume', icon: <Target size={20} />, label: 'Resume Builder', labelKm: 'បង្កើតប្រវត្តិរូប' },
    ];

    const currentLang = i18n.getLanguage();

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed md:sticky top-0 left-0 z-50 h-screen
                w-72 bg-white border-r border-slate-200/60
                flex flex-col transition-transform duration-300 ease-in-out
                ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
            `}>
                {/* Logo */}
                <div className="p-6 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                            <Cpu className="text-white" size={20} />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold tracking-tight text-slate-900">
                                HireJob<span className="text-indigo-600">.AI</span>
                            </h1>
                            <p className="text-xs text-slate-500 font-medium">Next-Gen Recruitment</p>
                        </div>
                    </div>
                </div>

                {/* User Profile Card */}
                {userProfile && (
                    <button
                        onClick={() => setActiveTab('profile')}
                        className={`w-full p-4 border-b border-slate-100 text-left hover:bg-slate-50 transition-colors ${activeTab === 'profile' ? 'bg-indigo-50/50' : ''}`}
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-400 to-violet-400 flex items-center justify-center text-white font-bold shadow-sm">
                                {userProfile.name?.charAt(0).toUpperCase() || 'U'}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-bold text-sm truncate text-slate-900">{userProfile.name || 'User'}</p>
                                <p className="text-xs text-slate-500 truncate">{userProfile.email}</p>
                            </div>
                        </div>
                    </button>
                )}

                {/* Navigation Menu */}
                <nav className="flex-1 overflow-y-auto p-4">
                    <div className="space-y-1">
                        {menuItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === item.id
                                    ? 'bg-indigo-50 text-indigo-600 font-bold shadow-sm'
                                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                                    }`}
                            >
                                {item.icon}
                                <span className="text-sm">{currentLang === 'km' ? item.labelKm : item.label}</span>
                            </button>
                        ))}
                    </div>
                </nav>

                {/* Bottom Actions */}
                <div className="p-4 border-t border-white/5">
                    <button
                        onClick={() => setActiveTab('profile')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all mb-2 ${activeTab === 'profile'
                            ? 'bg-indigo-50 text-indigo-600 font-bold'
                            : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                            }`}
                    >
                        <Settings size={20} />
                        <span className="text-sm">{currentLang === 'km' ? 'ការកំណត់' : 'Settings'}</span>
                    </button>
                    <button
                        onClick={() => supabase.auth.signOut()}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-all font-medium"
                    >
                        <LogOut size={20} />
                        <span className="text-sm">{currentLang === 'km' ? 'ចាកចេញ' : 'Sign Out'}</span>
                    </button>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
