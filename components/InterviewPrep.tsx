import React from 'react';
import { BookOpen, CheckCircle, Code, MessageSquare, Video, BrainCircuit } from 'lucide-react';

const InterviewPrep: React.FC = () => {
    const modules = [
        {
            title: 'Behavioral Questions',
            description: 'Master the STAR method and common soft skill questions.',
            icon: <MessageSquare size={24} className="text-indigo-600" />,
            progress: 65,
            topics: ['Tell me about yourself', 'Handling conflict', 'Leadership experience']
        },
        {
            title: 'Technical Deep Dive',
            description: 'Core concepts for your tech stack (React, Node, etc.).',
            icon: <Code size={24} className="text-violet-600" />,
            progress: 30,
            topics: ['React Hooks', 'Event Loop', 'Database Design']
        },
        {
            title: 'System Design',
            description: 'Architecting scalable systems and understanding display tradeoffs.',
            icon: <BrainCircuit size={24} className="text-emerald-600" />,
            progress: 0,
            topics: ['Load Balancing', 'Caching Strategies', 'Microservices']
        },
        {
            title: 'Mock Interviews',
            description: 'Practice with AI or schedule peer-to-peer sessions.',
            icon: <Video size={24} className="text-rose-600" />,
            progress: 10,
            topics: ['AI Simulator', 'Peer Match', 'Record & Review']
        }
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-extrabold tracking-tight">Interview Prep</h1>
                <p className="text-slate-500 dark:text-slate-400 mt-1">
                    Ace your next interview with curated guides and practice tools.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {modules.map((module, index) => (
                    <div key={index} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
                        <div className="flex items-start justify-between mb-4">
                            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                                {module.icon}
                            </div>
                            <span className="text-xs font-bold bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-lg text-slate-600 dark:text-slate-300">
                                {module.progress}% Complete
                            </span>
                        </div>

                        <h3 className="text-lg font-bold mb-2">{module.title}</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 min-h-[40px]">
                            {module.description}
                        </p>

                        <div className="space-y-3 mb-6">
                            {module.topics.map((topic, i) => (
                                <div key={i} className="flex items-center gap-2 text-sm">
                                    <CheckCircle size={16} className={i === 0 && module.progress > 0 ? "text-green-500" : "text-slate-300 dark:text-slate-700"} />
                                    <span className={i === 0 && module.progress > 0 ? "text-slate-900 dark:text-slate-200" : "text-slate-500"}>{topic}</span>
                                </div>
                            ))}
                        </div>

                        <button className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-sm transition-colors">
                            Continue Learning
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InterviewPrep;
