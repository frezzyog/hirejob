
import React from 'react';
import { Cpu, Sparkles } from 'lucide-react';

const LoadingScreen: React.FC = () => {
    return (
        <div className="min-h-screen bg-[#05060f] flex flex-col items-center justify-center relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[600px] bg-hero-glow -z-10 opacity-30" />

            <div className="max-w-md w-full px-8 text-center space-y-8 animate-in fade-in zoom-in duration-700">
                <div className="relative inline-flex mb-8">
                    <div className="w-24 h-24 bg-indigo-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-indigo-500/40 relative z-10 animate-float">
                        <Cpu className="text-white" size={48} />
                    </div>
                    <div className="absolute -inset-4 bg-indigo-500/20 blur-2xl animate-pulse rounded-full" />
                </div>

                <div className="space-y-3">
                    <h2 className="text-4xl font-black text-white tracking-tight">
                        HireJob<span className="text-indigo-500">.AI</span>
                    </h2>
                    <div className="flex justify-center">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-wider">
                            <Sparkles size={14} />
                            Initializing Neural Network
                        </div>
                    </div>
                </div>

                <div className="relative w-full h-1 bg-white/5 rounded-full overflow-hidden">
                    <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-transparent via-indigo-500 to-transparent animate-[scan_2s_linear_infinite]" />
                </div>

                <div className="space-y-1">
                    <p className="text-sm font-bold text-slate-500 tracking-widest uppercase">Optimizing Matches...</p>
                    <p className="text-xs text-slate-700">Connecting to global talent pools</p>
                </div>
            </div>

            <div className="absolute bottom-10 left-10 pointer-events-none opacity-5">
                <h2 className="text-8xl font-black text-white">HIREJOB</h2>
            </div>
        </div>
    );
};

export default LoadingScreen;
