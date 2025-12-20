
import React from 'react';
import { MapPin, DollarSign, Clock, Bookmark, ChevronRight, Send } from 'lucide-react';
import { Job } from '../types';
import { i18n } from '../services/i18n';
import AIMatchScore from './AIMatchScore';

interface JobCardProps {
  job: Job;
  isSaved?: boolean;
  onSave?: (id: string) => void;
  onApply?: (id: string) => void;
  matchScore?: number;
}

const JobCard: React.FC<JobCardProps> = ({ job, isSaved, onSave, onApply, matchScore }) => {
  return (
    <div className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all hover:border-indigo-200 dark:hover:border-indigo-900/50">
      {/* AI Match Score Badge */}
      {matchScore !== undefined && (
        <div className="absolute -top-3 -right-3 z-10">
          <AIMatchScore score={matchScore} size="small" />
        </div>
      )}
      <div className="flex justify-between items-start mb-4">
        <div className="flex gap-4">
          <img
            src={job.logo_url}
            alt={job.company}
            className="w-12 h-12 rounded-xl object-cover bg-slate-100"
          />
          <div>
            <h3 className="font-bold text-lg group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              {job.title}
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm">{job.company}</p>
          </div>
        </div>
        <button
          onClick={() => onSave?.(job.id)}
          className={`p-2 rounded-full transition-colors ${isSaved ? 'text-indigo-600 bg-indigo-50 dark:bg-indigo-900/30' : 'text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
        >
          <Bookmark size={20} fill={isSaved ? "currentColor" : "none"} />
        </button>
      </div>

      <div className="flex flex-wrap gap-3 mb-4">
        <div className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
          <MapPin size={14} />
          {job.location}
        </div>
        <div className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
          <DollarSign size={14} />
          {job.salary_range}
        </div>
        <div className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
          <Clock size={14} />
          {job.job_type}
        </div>
      </div>

      <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-2 mb-6 leading-relaxed">
        {job.description}
      </p>

      <div className="flex gap-3">
        {job.telegram_link ? (
          <>
            <button
              onClick={() => window.open(job.telegram_link, '_blank')}
              className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-2.5 rounded-xl text-sm transition-all flex items-center justify-center gap-2"
            >
              <Send size={16} />
              {i18n.t('applyTelegram')}
            </button>
            <button
              onClick={() => onApply?.(job.id)}
              className="px-4 py-2.5 rounded-xl border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 font-semibold text-sm hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors"
            >
              {i18n.t('applyNow')}
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => onApply?.(job.id)}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-xl text-sm transition-colors"
            >
              {i18n.t('applyNow')}
            </button>
            <button className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
              {i18n.t('viewDetails')}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default JobCard;
