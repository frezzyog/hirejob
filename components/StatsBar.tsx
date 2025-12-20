
import React from 'react';
import { TrendingUp, Users, Briefcase, Building2 } from 'lucide-react';

interface StatsBarProps {
    stats?: {
        newJobsToday?: number;
        companiesHiring?: number;
        activeUsers?: number;
        totalJobs?: number;
    };
}

const StatsBar: React.FC<StatsBarProps> = ({ stats }) => {
    const defaultStats = {
        newJobsToday: stats?.newJobsToday || 1200,
        companiesHiring: stats?.companiesHiring || 450,
        activeUsers: stats?.activeUsers || 12500,
        totalJobs: stats?.totalJobs || 8400,
    };

    const statItems = [
        {
            label: 'New Jobs Today',
            labelKm: 'ការងារថ្មីថ្ងៃនេះ',
            value: `${defaultStats.newJobsToday.toLocaleString()}+`,
            icon: <TrendingUp size={18} />,
            color: 'text-green-600 dark:text-green-400',
            bgColor: 'bg-green-50 dark:bg-green-900/20'
        },
        {
            label: 'Companies Hiring',
            labelKm: 'ក្រុមហ៊ុនកំពុងជ្រើសរើស',
            value: defaultStats.companiesHiring.toLocaleString(),
            icon: <Building2 size={18} />,
            color: 'text-indigo-600 dark:text-indigo-400',
            bgColor: 'bg-indigo-50 dark:bg-indigo-900/20'
        },
        {
            label: 'Total Jobs',
            labelKm: 'ការងារសរុប',
            value: `${defaultStats.totalJobs.toLocaleString()}+`,
            icon: <Briefcase size={18} />,
            color: 'text-violet-600 dark:text-violet-400',
            bgColor: 'bg-violet-50 dark:bg-violet-900/20'
        },
        {
            label: 'Active Job Seekers',
            labelKm: 'អ្នកស្វែងរកការងារ',
            value: `${(defaultStats.activeUsers / 1000).toFixed(1)}K`,
            icon: <Users size={18} />,
            color: 'text-amber-600 dark:text-amber-400',
            bgColor: 'bg-amber-50 dark:bg-amber-900/20'
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {statItems.map((stat, index) => (
                <div
                    key={index}
                    className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm hover:shadow-md transition-all"
                >
                    <div className="flex items-start justify-between">
                        <div className="flex-1">
                            <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">{stat.label}</p>
                            <p className="text-2xl font-bold">{stat.value}</p>
                        </div>
                        <div className={`${stat.bgColor} ${stat.color} p-2 rounded-lg`}>
                            {stat.icon}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default StatsBar;
