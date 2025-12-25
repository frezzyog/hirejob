
import React from 'react';
import { Building2, ChevronRight } from 'lucide-react';
import { CAMBODIAN_COMPANIES } from '../constants';

interface FeaturedCompaniesProps {
    onCompanyClick?: (companyName: string) => void;
}

const FeaturedCompanies: React.FC<FeaturedCompaniesProps> = ({ onCompanyClick }) => {
    return (
        <div className="glass-dark border border-white/5 rounded-3xl p-8 relative overflow-hidden">
            <div className="scan-line opacity-10" />
            <div className="flex items-center justify-between mb-8 relative">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center border border-indigo-500/20">
                        <Building2 size={22} className="text-indigo-400" />
                    </div>
                    <h3 className="text-xl font-black text-white">Market Leaders</h3>
                </div>
                <button className="text-xs font-bold text-indigo-400 hover:text-white transition-colors flex items-center gap-2 uppercase tracking-wider">
                    Analyze All
                    <ChevronRight size={14} />
                </button>
            </div>

            <div className="flex gap-6 overflow-x-auto pb-4 -mx-2 px-2 no-scrollbar relative">
                {CAMBODIAN_COMPANIES.map((company) => (
                    <button
                        key={company.id}
                        onClick={() => onCompanyClick?.(company.name)}
                        className="flex-shrink-0 group"
                    >
                        <div className="w-28 flex flex-col items-center gap-4">
                            <div className="w-24 h-24 glass-card rounded-2xl p-3 flex items-center justify-center transition-all group-hover:scale-110 group-hover:border-indigo-500/40 group-hover:bg-white/5">
                                <img
                                    src={company.logo}
                                    alt={company.name}
                                    className="w-full h-full object-cover rounded-xl filter grayscale group-hover:grayscale-0 transition-all opacity-80 group-hover:opacity-100"
                                />
                            </div>
                            <div className="text-center">
                                <p className="text-sm font-bold truncate w-28 text-slate-300 group-hover:text-indigo-400 transition-colors uppercase tracking-tight">{company.name}</p>
                                <p className="text-[10px] text-slate-600 font-bold">{company.jobCount} POSITIONS</p>
                            </div>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default FeaturedCompanies;
