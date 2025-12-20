
import React from 'react';
import { Building2, ChevronRight } from 'lucide-react';

const CAMBODIAN_COMPANIES = [
    { id: 1, name: 'ABA Bank', logo: 'https://picsum.photos/seed/aba/100/100', jobCount: 45 },
    { id: 2, name: 'Wing Bank', logo: 'https://picsum.photos/seed/wing/100/100', jobCount: 32 },
    { id: 3, name: 'Chip Mong Group', logo: 'https://picsum.photos/seed/chipmong/100/100', jobCount: 28 },
    { id: 4, name: 'Grab Cambodia', logo: 'https://picsum.photos/seed/grab/100/100', jobCount: 15 },
    { id: 5, name: 'Cellcard', logo: 'https://picsum.photos/seed/cellcard/100/100', jobCount: 22 },
    { id: 6, name: 'Sabay Digital', logo: 'https://picsum.photos/seed/sabay/100/100', jobCount: 12 },
    { id: 7, name: 'Smart Axiata', logo: 'https://picsum.photos/seed/smart/100/100', jobCount: 18 },
    { id: 8, name: 'Canadia Bank', logo: 'https://picsum.photos/seed/canadia/100/100', jobCount: 25 },
];

interface FeaturedCompaniesProps {
    onCompanyClick?: (companyName: string) => void;
}

const FeaturedCompanies: React.FC<FeaturedCompaniesProps> = ({ onCompanyClick }) => {
    return (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <Building2 size={20} className="text-indigo-600" />
                    <h3 className="text-lg font-bold">Featured Companies</h3>
                </div>
                <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1">
                    View All
                    <ChevronRight size={16} />
                </button>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-2 -mx-2 px-2 scrollbar-hide">
                {CAMBODIAN_COMPANIES.map((company) => (
                    <button
                        key={company.id}
                        onClick={() => onCompanyClick?.(company.name)}
                        className="flex-shrink-0 group"
                    >
                        <div className="w-24 flex flex-col items-center gap-2">
                            <div className="w-20 h-20 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl p-2 flex items-center justify-center group-hover:border-indigo-300 dark:group-hover:border-indigo-600 transition-all shadow-sm group-hover:shadow-md">
                                <img
                                    src={company.logo}
                                    alt={company.name}
                                    className="w-full h-full object-cover rounded-xl grayscale group-hover:grayscale-0 transition-all"
                                />
                            </div>
                            <div className="text-center">
                                <p className="text-xs font-semibold truncate w-24">{company.name}</p>
                                <p className="text-[10px] text-slate-500">{company.jobCount} jobs</p>
                            </div>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default FeaturedCompanies;
