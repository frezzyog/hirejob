
import React from 'react';
import { TrendingUp, DollarSign, Target, Award, ChevronRight } from 'lucide-react';

interface CareerInsightsProps {
    userSkills?: string[];
    profileCompletion?: number;
}

const CareerInsights: React.FC<CareerInsightsProps> = ({
    userSkills = ['React', 'TypeScript'],
    profileCompletion = 65
}) => {
    const salaryInsights = [
        { role: 'Senior Developer', range: '$2,000 - $3,500', trend: '+12%' },
        { role: 'UI/UX Designer', range: '$800 - $1,500', trend: '+8%' },
        { role: 'Data Analyst', range: '$1,000 - $1,800', trend: '+15%' },
    ];

    const recommendedSkills = [
        { name: 'Next.js', demand: 'High', color: 'text-green-600' },
        { name: 'Python', demand: 'Very High', color: 'text-emerald-600' },
        { name: 'AWS', demand: 'High', color: 'text-green-600' },
    ];

    const getCompletionColor = () => {
        if (profileCompletion >= 80) return 'text-green-600';
        if (profileCompletion >= 50) return 'text-amber-600';
        return 'text-red-600';
    };

    return (
        <div className="w-80 bg-slate-50 dark:bg-slate-950 border-l border-slate-200 dark:border-slate-800 h-screen sticky top-0 overflow-y-auto p-6 space-y-6">
            {/* Profile Strength */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-sm border border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between mb-3">
                    <h4 className="font-bold text-sm flex items-center gap-2">
                        <Target size={16} className="text-indigo-600" />
                        Profile Strength
                    </h4>
                    <span className={`text-lg font-bold ${getCompletionColor()}`}>
                        {profileCompletion}%
                    </span>
                </div>

                <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2 mb-3">
                    <div
                        className={`h-2 rounded-full transition-all ${profileCompletion >= 80 ? 'bg-green-500' :
                                profileCompletion >= 50 ? 'bg-amber-500' : 'bg-red-500'
                            }`}
                        style={{ width: `${profileCompletion}%` }}
                    />
                </div>

                <button className="text-xs text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1">
                    Complete your profile
                    <ChevronRight size={14} />
                </button>
            </div>

            {/* Salary Insights for Cambodia */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-sm border border-slate-200 dark:border-slate-800">
                <h4 className="font-bold text-sm flex items-center gap-2 mb-4">
                    <DollarSign size={16} className="text-green-600" />
                    Salary Trends (Cambodia)
                </h4>

                <div className="space-y-3">
                    {salaryInsights.map((insight, index) => (
                        <div key={index} className="pb-3 border-b border-slate-100 dark:border-slate-800 last:border-0 last:pb-0">
                            <div className="flex items-start justify-between mb-1">
                                <p className="text-xs font-semibold">{insight.role}</p>
                                <span className="text-[10px] text-green-600 font-bold bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded">
                                    {insight.trend}
                                </span>
                            </div>
                            <p className="text-xs text-slate-500">{insight.range} USD/month</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Recommended Skills to Learn */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-sm border border-slate-200 dark:border-slate-800">
                <h4 className="font-bold text-sm flex items-center gap-2 mb-4">
                    <TrendingUp size={16} className="text-violet-600" />
                    Skills in Demand
                </h4>

                <div className="space-y-2">
                    {recommendedSkills.map((skill, index) => (
                        <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-800">
                            <span className="text-xs font-medium">{skill.name}</span>
                            <span className={`text-[10px] font-bold ${skill.color}`}>
                                {skill.demand}
                            </span>
                        </div>
                    ))}
                </div>

                <button className="mt-3 text-xs text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1">
                    View learning paths
                    <ChevronRight size={14} />
                </button>
            </div>

            {/* Quick Stats */}
            <div className="bg-gradient-to-br from-indigo-500 to-violet-600 rounded-2xl p-5 text-white shadow-lg">
                <div className="flex items-center gap-2 mb-3">
                    <Award size={18} />
                    <h4 className="font-bold text-sm">This Week</h4>
                </div>
                <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                        <span className="opacity-90">Profile Views</span>
                        <span className="font-bold">247</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="opacity-90">Applications</span>
                        <span className="font-bold">12</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="opacity-90">Saves</span>
                        <span className="font-bold">8</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CareerInsights;
