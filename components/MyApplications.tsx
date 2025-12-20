import React from 'react';
import { Job } from '../types';
import JobCard from './JobCard';
import { FileText, Loader2 } from 'lucide-react';

interface MyApplicationsProps {
    jobs: Job[];
    appliedJobIds: string[];
    onSave: (id: string) => void;
    savedJobIds: string[];
}

const MyApplications: React.FC<MyApplicationsProps> = ({ jobs, appliedJobIds, onSave, savedJobIds }) => {
    const appliedJobs = jobs.filter(job => appliedJobIds.includes(job.id));

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-extrabold tracking-tight">My Applications</h1>
                <p className="text-slate-500 dark:text-slate-400 mt-1">
                    Track the status of your {appliedJobs.length} active applications.
                </p>
            </div>

            {appliedJobs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {appliedJobs.map(job => (
                        <div key={job.id} className="relative group">
                            <div className="absolute -top-2 -right-2 z-10 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                                In Review
                            </div>
                            <JobCard
                                job={job}
                                isSaved={savedJobIds.includes(job.id)}
                                onSave={onSave}
                                onApply={() => { }} // Already applied
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="py-20 text-center space-y-4 bg-white dark:bg-slate-900 rounded-3xl border border-border">
                    <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto">
                        <FileText size={24} className="text-slate-400" />
                    </div>
                    <h3 className="text-xl font-bold">No applications yet</h3>
                    <p className="text-slate-500 max-w-xs mx-auto">Start applying to jobs to track your progress here.</p>
                </div>
            )}
        </div>
    );
};

export default MyApplications;
