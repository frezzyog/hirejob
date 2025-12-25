
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
            color: 'text-indigo-400',
            bgColor: 'bg-indigo-500/10'
        },
        {
            label: 'Companies Hiring',
            labelKm: 'ក្រុមហ៊ុនកំពុងជ្រើសរើស',
            value: defaultStats.companiesHiring.toLocaleString(),
            icon: <Building2 size={18} />,
            color: 'text-indigo-400',
            bgColor: 'bg-indigo-500/10'
        },
        {
            label: 'Total Jobs',
            labelKm: 'ការងារសរុប',
            value: `${defaultStats.totalJobs.toLocaleString()}+`,
            icon: <Briefcase size={18} />,
            color: 'text-indigo-400',
            bgColor: 'bg-indigo-500/10'
        },
        {
            label: 'Active Job Seekers',
            labelKm: 'អ្នកស្វែងរកការងារ',
            value: `${(defaultStats.activeUsers / 1000).toFixed(1)}K`,
            icon: <Users size={18} />,
            color: 'text-indigo-400',
            bgColor: 'bg-indigo-500/10'
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {statItems.map((stat, index) => (
                <div
                    key={index}
                    className="glass-card rounded-2xl p-5 transition-all hover:border-indigo-500/30"
                >
                    <div className="flex items-start justify-between">
                        <div className="flex-1">
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
                            <p className="text-3xl font-black text-white">{stat.value}</p>
                        </div>
                        <div className={`${stat.bgColor} ${stat.color} p-2.5 rounded-xl border border-white/5`}>
                            {stat.icon}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default StatsBar;
