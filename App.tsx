
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import JobCard from './components/JobCard';
import ChatAssistant from './components/ChatAssistant';
import ProfileSettings from './components/ProfileSettings';
import { Auth } from './components/Auth';
import { supabase } from './services/supabaseClient';
import { MOCK_JOBS } from './constants';
import { Job } from './types';
import { Search, Filter, Sparkles, TrendingUp, Heart, Loader2, Building2 } from 'lucide-react';
import StatsBar from './components/StatsBar';
import FeaturedCompanies from './components/FeaturedCompanies';
import MyApplications from './components/MyApplications';
import Companies from './components/Companies';
import InterviewPrep from './components/InterviewPrep';
import ResumeBuilder from './components/ResumeBuilder';

const App: React.FC = () => {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('jobs');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [jobs, setJobs] = useState<Job[]>(MOCK_JOBS);
  const [savedJobIds, setSavedJobIds] = useState<string[]>([]);
  const [appliedJobIds, setAppliedJobIds] = useState<string[]>([]);
  const [userSkills] = useState<string[]>(['React', 'TypeScript', 'Node.js', 'Java']); // Mock user skills

  // Calculate AI match score
  const calculateMatchScore = (job: Job): number => {
    const matchingSkills = job.skills_required.filter(skill =>
      userSkills.some(userSkill => userSkill.toLowerCase() === skill.toLowerCase())
    );
    return Math.min(95, Math.round((matchingSkills.length / job.skills_required.length) * 100));
  };

  useEffect(() => {
    // Initial session check
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Handle auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    const fetchJobs = async () => {
      if (!session) return;

      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .order('posted_at', { ascending: false });

      if (data && data.length > 0 && !error) {
        setJobs(data as Job[]);
      }
    };
    fetchJobs();
  }, [session]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const handleSaveJob = (id: string) => {
    setSavedJobIds(prev =>
      prev.includes(id) ? prev.filter(jid => jid !== id) : [...prev, id]
    );
  };

  const handleApplyJob = (id: string) => {
    if (!appliedJobIds.includes(id)) {
      setAppliedJobIds(prev => [...prev, id]);
      alert("Application sent successfully!");
    }
  };

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.skills_required.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 gap-4">
        <Loader2 className="animate-spin text-indigo-600" size={48} />
        <p className="text-slate-500 font-medium animate-pulse">Initializing Career Hub...</p>
      </div>
    );
  }

  if (!session) {
    return <Auth />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6 animate-in fade-in duration-500">
            {/* Stats Bar */}
            <StatsBar />

            {/* Featured Companies */}
            <FeaturedCompanies />

            {/* Top Matches Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold">Top Matches For You</h3>
                  <p className="text-sm text-slate-500">Based on your skills and preferences</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {jobs.slice(0, 6).map(job => (
                  <JobCard
                    key={job.id}
                    job={job}
                    isSaved={savedJobIds.includes(job.id)}
                    onSave={handleSaveJob}
                    onApply={handleApplyJob}
                    matchScore={calculateMatchScore(job)}
                  />
                ))}
              </div>
            </div>
          </div>
        );

      case 'jobs':
        return (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col gap-6">
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight">Discover Jobs</h1>
                <p className="text-slate-500 dark:text-slate-400 mt-1">
                  Showing {filteredJobs.length} opportunities for your profile.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type="text"
                    placeholder="Search roles, companies, or tech stack..."
                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl pl-12 pr-4 py-4 text-sm focus:ring-2 focus:ring-indigo-500 shadow-sm outline-none transition-all"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <button className="flex items-center justify-center gap-2 px-6 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm">
                  <Filter size={18} />
                  Filters
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {filteredJobs.map(job => (
                <JobCard
                  key={job.id}
                  job={job}
                  isSaved={savedJobIds.includes(job.id)}
                  onSave={handleSaveJob}
                  onApply={handleApplyJob}
                />
              ))}
            </div>

            {filteredJobs.length === 0 && (
              <div className="py-20 text-center space-y-4">
                <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto">
                  <Search size={24} className="text-slate-400" />
                </div>
                <h3 className="text-xl font-bold">No matches found</h3>
                <p className="text-slate-500 max-w-xs mx-auto">Try broadening your search or modifying your profile skills.</p>
              </div>
            )}
          </div>
        );

      case 'search':
        return (
          <div className="space-y-10 animate-in fade-in duration-500">
            <div className="text-center max-w-2xl mx-auto space-y-4">
              <h2 className="text-4xl font-black tracking-tight leading-tight">
                Explore Your <br />
                <span className="text-indigo-600">Career Horizon</span>
              </h2>
              <p className="text-slate-500 dark:text-slate-400">Discover top trending roles and companies looking for talent like you.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl text-white shadow-xl shadow-indigo-200 dark:shadow-none hover:scale-[1.02] transition-transform">
                <TrendingUp size={32} className="mb-4" />
                <h3 className="font-bold text-xl mb-2">Market Trends</h3>
                <ul className="space-y-2 text-indigo-100 text-sm">
                  <li>• React Native demand up 12%</li>
                  <li>• AI Engineer surge in SF</li>
                  <li>• Remote work stabilization</li>
                </ul>
              </div>
              <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm hover:scale-[1.02] transition-transform">
                <Sparkles size={32} className="text-amber-500 mb-4" />
                <h3 className="font-bold text-xl mb-2">Smart Picks</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">Our AI algorithm identified 8 roles that perfectly match your tech stack.</p>
              </div>
              <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm hover:scale-[1.02] transition-transform">
                <Search size={32} className="text-indigo-600 mb-4" />
                <h3 className="font-bold text-xl mb-2">Saved Criteria</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">"Senior Node.js, Remote, $160k+"</p>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-bold">Industry Leaders</h3>
              <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 no-scrollbar">
                {['Google', 'Meta', 'Netflix', 'Airbnb', 'Stripe', 'OpenAI'].map(company => (
                  <div key={company} className="flex-shrink-0 w-32 h-32 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col items-center justify-center gap-2 shadow-sm hover:border-indigo-300 transition-colors">
                    <img src={`https://picsum.photos/seed/${company}/64/64`} className="w-12 h-12 rounded-lg grayscale hover:grayscale-0 transition-all" alt={company} />
                    <span className="text-xs font-bold">{company}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'chat':
        return <ChatAssistant availableJobs={jobs} />;

      case 'saved':
        const savedJobs = jobs.filter(job => savedJobIds.includes(job.id));
        return (
          <div className="space-y-6 animate-in fade-in duration-500">
            <h1 className="text-3xl font-extrabold tracking-tight">Saved Opportunities</h1>
            {savedJobs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {savedJobs.map(job => (
                  <JobCard
                    key={job.id}
                    job={job}
                    isSaved={true}
                    onSave={handleSaveJob}
                    onApply={handleApplyJob}
                  />
                ))}
              </div>
            ) : (
              <div className="py-20 text-center space-y-4">
                <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto">
                  <Heart size={24} className="text-slate-400" />
                </div>
                <h3 className="text-xl font-bold">Your list is empty</h3>
                <p className="text-slate-500">Bookmarks will appear here for you to review later.</p>
              </div>
            )}
          </div>
        );

      case 'applications':
        return (
          <MyApplications
            jobs={jobs}
            appliedJobIds={appliedJobIds}
            onSave={handleSaveJob}
            savedJobIds={savedJobIds}
          />
        );

      case 'companies':
        return <Companies />;

      case 'interview-prep':
        return <InterviewPrep />;

      case 'resume':
        return <ResumeBuilder />;

      case 'profile':
        return <ProfileSettings userId={session.user.id} />;

      default:
        return null;
    }
  };

  return (
    <Layout
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      isDarkMode={isDarkMode}
      toggleDarkMode={toggleDarkMode}
    >
      {renderContent()}
    </Layout>
  );
};

export default App;
