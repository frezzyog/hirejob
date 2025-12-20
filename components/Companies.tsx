import React, { useState } from 'react';
import { CAMBODIAN_COMPANIES } from '../constants';
import { Search, MapPin, Briefcase, Building2, ExternalLink } from 'lucide-react';

const Companies: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredCompanies = CAMBODIAN_COMPANIES.filter(company =>
        company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        company.industry.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col gap-6">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight">Top Companies</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">
                        Explore opportunities at Cambodia's leading organizations.
                    </p>
                </div>

                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search companies by name or industry..."
                        className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl pl-12 pr-4 py-4 text-sm focus:ring-2 focus:ring-indigo-500 shadow-sm outline-none transition-all"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCompanies.map(company => (
                    <div key={company.id} className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all hover:border-indigo-200 dark:hover:border-indigo-800">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-xl p-2 flex items-center justify-center border border-slate-100 dark:border-slate-700">
                                <img
                                    src={company.logo}
                                    alt={company.name}
                                    className="w-full h-full object-cover rounded-lg grayscale group-hover:grayscale-0 transition-all"
                                />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg group-hover:text-indigo-600 transition-colors">{company.name}</h3>
                                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded inline-block">
                                    {company.industry}
                                </p>
                            </div>
                        </div>

                        <div className="space-y-3 mb-6">
                            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                                <MapPin size={16} className="text-slate-400" />
                                {company.location}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                                <Briefcase size={16} className="text-slate-400" />
                                {company.jobCount} open positions
                            </div>
                        </div>

                        <button className="w-full py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
                            View Profile
                            <ExternalLink size={14} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Companies;
