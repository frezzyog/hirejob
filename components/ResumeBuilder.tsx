import React, { useState } from 'react';
import { FileText, Download, Eye, PenTool, Plus } from 'lucide-react';

const ResumeBuilder: React.FC = () => {
    const [activeTemplate, setActiveTemplate] = useState('modern');

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight">Resume Builder</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">
                        Create a professional resume in minutes using AI-powered templates.
                    </p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                        <Eye size={18} />
                        Preview
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold transition-colors shadow-lg shadow-indigo-200 dark:shadow-none">
                        <Download size={18} />
                        Export PDF
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Editor Column */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                            <PenTool size={20} className="text-indigo-600" />
                            Personal Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-slate-500">Full Name</label>
                                <input type="text" className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="John Doe" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-slate-500">Professional Title</label>
                                <input type="text" className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Senior Software Engineer" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-slate-500">Email</label>
                                <input type="email" className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="john@example.com" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-slate-500">Phone</label>
                                <input type="tel" className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="+855 12 345 678" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold flex items-center gap-2">
                                <Briefcase size={20} className="text-violet-600" />
                                Experience
                            </h3>
                            <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-indigo-600">
                                <Plus size={20} />
                            </button>
                        </div>
                        <div className="space-y-4">
                            <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h4 className="font-bold text-sm">Senior Frontend Developer</h4>
                                        <p className="text-xs text-slate-500">TechCorp Cambodia • 2021 - Present</p>
                                    </div>
                                    <button className="text-xs text-indigo-600 font-medium">Edit</button>
                                </div>
                                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                                    Led the migration of legacy codebase to React.js, improving loading time by 40%. Mentored 3 junior developers.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Templates Column */}
                <div className="space-y-6">
                    <h3 className="font-bold text-lg">Templates</h3>
                    <div className="grid grid-cols-2 gap-4">
                        {['Modern', 'Minimal', 'Creative', 'Professional'].map(template => (
                            <button
                                key={template}
                                onClick={() => setActiveTemplate(template.toLowerCase())}
                                className={`aspect-[3/4] rounded-xl border-2 transition-all overflow-hidden relative group ${activeTemplate === template.toLowerCase()
                                    ? 'border-indigo-600 ring-4 ring-indigo-100 dark:ring-indigo-900/30'
                                    : 'border-slate-200 dark:border-slate-700 hover:border-indigo-300'
                                    }`}
                            >
                                <div className="absolute inset-0 bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-400">
                                    {template}
                                </div>
                                {activeTemplate === template.toLowerCase() && (
                                    <div className="absolute top-2 right-2 w-4 h-4 bg-indigo-600 rounded-full text-white flex items-center justify-center">
                                        <CheckCircle size={10} />
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

// Start of Briefcase icon fix since it was missing in imports but used
import { Briefcase, CheckCircle } from 'lucide-react';

export default ResumeBuilder;
