
import React from 'react';
import { Sparkles } from 'lucide-react';

interface AIMatchScoreProps {
    score: number;
    size?: 'small' | 'medium' | 'large';
}

const AIMatchScore: React.FC<AIMatchScoreProps> = ({ score, size = 'medium' }) => {
    const getScoreColor = () => {
        if (score >= 85) return 'from-green-500 to-emerald-500';
        if (score >= 70) return 'from-blue-500 to-indigo-500';
        if (score >= 50) return 'from-amber-500 to-orange-500';
        return 'from-slate-400 to-slate-500';
    };

    const getSize = () => {
        switch (size) {
            case 'small':
                return 'w-14 h-14 text-xs';
            case 'large':
                return 'w-24 h-24 text-xl';
            default:
                return 'w-18 h-18 text-sm';
        }
    };

    return (
        <div className="relative group">
            <div className={`${getSize()} rounded-full bg-gradient-to-br ${getScoreColor()} p-0.5 shadow-lg`}>
                <div className="w-full h-full bg-white dark:bg-slate-900 rounded-full flex flex-col items-center justify-center">
                    <Sparkles size={12} className="text-indigo-600 mb-0.5" />
                    <span className="font-bold bg-gradient-to-br ${getScoreColor()} bg-clip-text text-transparent">
                        {score}%
                    </span>
                </div>
            </div>

            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-slate-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xl z-10">
                AI Match Score
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900"></div>
            </div>
        </div>
    );
};

export default AIMatchScore;
