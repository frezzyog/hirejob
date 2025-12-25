
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
    <div className="group relative bg-white rounded-2xl p-6 transition-all hover:border-indigo-500/40 border border-slate-200/60 shadow-sm hover:shadow-md">
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
            <h3 className="font-bold text-lg text-slate-900 group-hover:text-indigo-600 transition-colors">
              {job.title}
            </h3>
            <p className="text-slate-500 text-sm font-medium">{job.company}</p>
          </div>
        </div>
        <button
          onClick={() => onSave?.(job.id)}
          className={`p-2 rounded-xl transition-all ${isSaved ? 'text-indigo-600 bg-indigo-50' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-900'
            }`}
        >
          <Bookmark size={20} fill={isSaved ? "currentColor" : "none"} />
        </button>
      </div>

      <div className="flex flex-wrap gap-3 mb-5">
        <div className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl bg-slate-50 text-slate-600 border border-slate-100">
          <MapPin size={14} className="text-indigo-600" />
          {job.location}
        </div>
        <div className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl bg-slate-50 text-slate-600 border border-slate-100">
          <DollarSign size={14} className="text-indigo-600" />
          {job.salary_range}
        </div>
        <div className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl bg-slate-50 text-slate-600 border border-slate-100">
          <Clock size={14} className="text-indigo-600" />
          {job.job_type}
        </div>
      </div>

      <p className="text-slate-400 text-sm line-clamp-2 mb-6 leading-relaxed">
        {job.description}
      </p>

      <div className="flex gap-3">
        {job.telegram_link ? (
          <>
            <button
              onClick={() => window.open(job.telegram_link, '_blank')}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-2xl text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/10"
            >
              <Send size={16} />
              {i18n.t('applyTelegram')}
            </button>
            <button
              onClick={() => onApply?.(job.id)}
              className="px-4 py-3 rounded-2xl border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50 transition-all"
            >
              {i18n.t('applyNow')}
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => onApply?.(job.id)}
              className="flex-1 button-primary text-white font-bold py-3 rounded-2xl text-sm transition-all shadow-lg shadow-indigo-500/10"
            >
              {i18n.t('applyNow')}
            </button>
            <button className="px-4 py-3 rounded-2xl border border-white/10 text-slate-300 font-bold text-sm hover:bg-white/5 transition-all">
              {i18n.t('viewDetails')}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default JobCard;
