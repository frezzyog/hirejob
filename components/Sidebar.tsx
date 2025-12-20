
import React from 'react';
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
                w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800
                flex flex-col transition-transform duration-300 ease-in-out
                ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
            `}>
                {/* Logo */}
                <div className="p-6 border-b border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-xl flex items-center justify-center shadow-lg">
                            <Briefcase className="text-white" size={20} />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                                {i18n.t('appName')}
                            </h1>
                            <p className="text-xs text-slate-500">Cambodia Jobs</p>
                        </div>
                    </div>
                </div>

                {/* User Profile Card */}
                {userProfile && (
                    <button
                        onClick={() => setActiveTab('profile')}
                        className={`w-full p-4 border-b border-slate-200 dark:border-slate-800 text-left hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors ${activeTab === 'profile' ? 'bg-indigo-50 dark:bg-indigo-900/30' : ''}`}
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-400 to-violet-400 flex items-center justify-center text-white font-bold shadow-sm">
                                {userProfile.name?.charAt(0).toUpperCase() || 'U'}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-semibold text-sm truncate text-slate-900 dark:text-slate-100">{userProfile.name || 'User'}</p>
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
                                    ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-semibold shadow-sm'
                                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                                    }`}
                            >
                                {item.icon}
                                <span className="text-sm">{currentLang === 'km' ? item.labelKm : item.label}</span>
                            </button>
                        ))}
                    </div>
                </nav>

                {/* Bottom Actions */}
                <div className="p-4 border-t border-slate-200 dark:border-slate-800">
                    <button
                        onClick={() => setActiveTab('profile')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'profile'
                            ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-semibold'
                            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                            }`}
                    >
                        <Settings size={20} />
                        <span className="text-sm">{currentLang === 'km' ? 'ការកំណត់' : 'Settings'}</span>
                    </button>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
