import React, { useState } from 'react';
import {
    Briefcase,
    Search,
    ArrowRight,
    Sparkles,
    Users,
    ShieldCheck,
    LineChart,
    Cpu,
    Zap,
    CheckCircle2,
    Globe,
    MessageSquare,
    Plus
} from 'lucide-react';

interface LandingPageProps {
    onGetStarted: () => void;
    onLogin: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted, onLogin }) => {
    const [selectedFeature, setSelectedFeature] = useState<any>(null);

    const features = [
        {
            title: "Real-Time Talent Predictions",
            desc: "Know exactly when to hire to get the best talent at the lowest cost.",
            icon: <LineChart size={24} className="text-indigo-400" />,
            details: "Our AI analyzes market trends, competitor hiring patterns, and talent availability to predict the perfect window for your next hire. Save up to 40% on sourcing costs by timing your recruitment perfectly."
        },
        {
            title: "Smart Role Optimization",
            desc: "AI suggests faster, cheaper, and more effective hiring strategies.",
            icon: <Zap size={24} className="text-indigo-400" />,
            details: "Automatically optimize job descriptions and requirements based on successful hires. Our AI identifies the exact skills that correlate with high performance in your specific company culture."
        },
        {
            title: "Dynamic Candidate Tracking",
            desc: "See your talent pool grow and evolve in real-time.",
            icon: <Users size={24} className="text-indigo-400" />,
            details: "Track candidates across multiple platforms and touchpoints. Get real-time updates as candidates update their skills, change roles, or show increased intent to move."
        },
        {
            title: "Personalized Hiring Alerts",
            desc: "Get instant notifications for top talent entering the market.",
            icon: <Globe size={24} className="text-indigo-400" />,
            details: "Stop losing great candidates to slow response times. Get high-priority alerts the moment a 'Perfect Match' candidate becomes available or shows interest in your industry."
        },
        {
            title: "Verified Background Checks",
            desc: "Instant AI-powered verification of skills and experience.",
            icon: <ShieldCheck size={24} className="text-indigo-400" />,
            details: "Reduce hire risk with automated, blockchain-verified skill assessments and employment history checks. Instant verification saves weeks of manual effort."
        },
        {
            title: "AI Interview Assistant",
            desc: "Automated screening that sounds human and saves weeks of time.",
            icon: <MessageSquare size={24} className="text-indigo-400" />,
            details: "Scale your first-round interviews effortlessly. Our AI assistant conducts natural-sounding audio and text interviews, ranking candidates based on technical and soft skills."
        },
        {
            title: "One-Click Contracts",
            desc: "Generate secure, legally compliant contracts in seconds.",
            icon: <Zap size={24} className="text-indigo-400" />,
            details: "Streamline the final stage of hiring. Automatically generate personalized, legally-reviewed employment contracts that can be signed digitally in minutes."
        },
        {
            title: "Seamless Integration",
            desc: "Connect with your favorite tools like Slack, Jira, and more.",
            icon: <CheckCircle2 size={24} className="text-indigo-400" />,
            details: "Integrate HireJob AI directly into your existing workflow. Sync with Slack for notifications, Jira for task management, and your favorite ATS for candidate flow."
        }
    ];

    const FeatureModal = ({ feature, onClose }: { feature: any, onClose: () => void }) => (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" onClick={onClose} />
            <div className="relative glass-card bg-[#0a0b1e] border border-white/10 p-10 rounded-[2.5rem] max-w-2xl w-full animate-in zoom-in-95 fade-in duration-300">
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 p-2 rounded-xl hover:bg-white/5 transition-colors text-slate-400 hover:text-white"
                >
                    <Plus className="rotate-45" size={24} />
                </button>
                <div className="space-y-8">
                    <div className="w-16 h-16 bg-indigo-600/20 border border-indigo-500/30 rounded-2xl flex items-center justify-center">
                        {React.cloneElement(feature.icon as React.ReactElement<{ size?: number }>, { size: 32 })}
                    </div>
                    <div className="space-y-4">
                        <h2 className="text-4xl font-black tracking-tight text-white">{feature.title}</h2>
                        <p className="text-xl text-indigo-400 font-medium">{feature.desc}</p>
                        <div className="h-px w-full bg-gradient-to-r from-indigo-500/50 via-indigo-500/10 to-transparent" />
                        <p className="text-slate-400 leading-relaxed text-lg">
                            {feature.details}
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <button
                            onClick={onGetStarted}
                            className="button-primary flex-1 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 group"
                        >
                            Get Started Now
                            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button
                            onClick={onClose}
                            className="flex-1 py-4 rounded-2xl border border-white/10 hover:bg-white/5 transition-all font-bold text-slate-300"
                        >
                            Later
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
    return (
        <div className="min-h-screen bg-[#05060f] text-white selection:bg-indigo-500/30">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 glass-dark border-b border-white/5">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                            <Cpu className="text-white" size={24} />
                        </div>
                        <span className="text-2xl font-black tracking-tighter">HireJob<span className="text-indigo-500">.AI</span></span>
                    </div>

                    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
                        <a href="#home" className="hover:text-white transition-colors">Home</a>
                        <a href="#features" className="hover:text-white transition-colors">Features</a>
                        <a href="#how-it-works" className="hover:text-white transition-colors">How it works</a>
                        <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={onLogin}
                            className="px-4 py-2 text-sm font-semibold hover:text-indigo-400 transition-colors text-white"
                        >
                            Log In
                        </button>
                        <button
                            onClick={onGetStarted}
                            className="button-primary px-6 py-2.5 rounded-xl text-sm font-bold shadow-xl shadow-indigo-500/10"
                        >
                            Contact Us
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section id="home" className="relative pt-40 pb-20 px-6 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-hero-glow -z-10 opacity-50" />

                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-wider">
                            <Sparkles size={14} />
                            Fly Smarter With HireJob.Ai
                        </div>

                        <h1 className="text-6xl md:text-7xl font-black tracking-tighter leading-none text-white">
                            Save Time & Money <br />
                            <span className="text-accent-gradient">On Every Hire</span> 💼
                        </h1>

                        <p className="text-xl text-slate-400 max-w-lg leading-relaxed">
                            Discover the top talent, get personalized role recommendations, and build teams effortlessly with our AI-powered platform.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={onGetStarted}
                                className="button-primary flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-lg font-bold group"
                            >
                                Search Jobs Now
                                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="flex -space-x-2">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="w-10 h-10 rounded-full border-2 border-[#05060f] bg-slate-800 overflow-hidden">
                                        <img src={`https://i.pravatar.cc/100?u=${i}`} alt="user" />
                                    </div>
                                ))}
                            </div>
                            <p className="text-sm text-slate-500">
                                <span className="text-indigo-400 font-bold">90% Users Satisfied</span> <br />
                                Top 5% talent saved 30+ hours last month
                            </p>
                        </div>
                    </div>

                    <div className="relative">
                        {/* Main Visual: Free-floating Circular Orbit */}
                        <div className="aspect-square flex flex-col items-center justify-center relative animate-float">
                            <div className="w-full h-full flex items-center justify-center relative">
                                {/* Shared Centers: Both the Hub and Orbit orbit have the exact same center point */}
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    {/* Central AI Hub (The HireJob Logo) */}
                                    <div className="relative z-10 p-8 bg-indigo-600/10 border-2 border-white/5 rounded-[3.5rem] flex flex-col items-center justify-center shadow-2xl backdrop-blur-3xl transition-transform hover:scale-105 pointer-events-auto animate-orbit-center">
                                        <div className="flex items-center gap-4">
                                            <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
                                                <Cpu className="text-white" size={32} />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-3xl font-black tracking-tighter text-white leading-none">HireJob<span className="text-indigo-500">.AI</span></span>
                                                <span className="text-[9px] font-black tracking-[0.4em] text-indigo-400 uppercase mt-1">Neural Network</span>
                                            </div>
                                        </div>
                                        <div className="absolute -inset-6 border-2 border-indigo-500/5 rounded-[4.5rem] animate-spin-slow" />
                                        <div className="absolute -inset-10 border border-indigo-500/5 rounded-[5rem] animate-spin-slow [animation-direction:reverse] [animation-duration:25s]" />
                                    </div>

                                    {/* Glow Backdrop */}
                                    <div className="absolute w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[140px] animate-pulse-scanner -z-10" />
                                </div>

                                {/* Orbiting Brand Logos */}
                                <div className="orbit-container w-full h-full">
                                    <div className="orbit-item animate-orbit" style={{ animationDelay: '0s' }}>
                                        <img src="/logos/ababank.png" alt="ABA Bank" className="p-1" />
                                    </div>
                                    <div className="orbit-item animate-orbit" style={{ animationDelay: '-7.5s' }}>
                                        <img src="/logos/smart.png" alt="Smart" className="p-1" />
                                    </div>
                                    <div className="orbit-item animate-orbit" style={{ animationDelay: '-15s' }}>
                                        <img src="/logos/wingbank.png" alt="Wing Bank" className="p-1" />
                                    </div>
                                    <div className="orbit-item animate-orbit" style={{ animationDelay: '-22.5s' }}>
                                        <img src="/logos/princebank.png" alt="Prince Bank" className="p-1" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Floating Elements */}
                        <div className="absolute -top-10 -right-4 glass p-6 rounded-3xl w-64 animate-float [animation-delay:-1s]">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-indigo-600/20 border border-indigo-500/30 rounded-full flex items-center justify-center">
                                    <ShieldCheck className="text-indigo-400" size={20} />
                                </div>
                                <div>
                                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Best Match Found</p>
                                    <p className="text-sm font-bold">Senior React dev</p>
                                    <p className="text-xs text-indigo-400 font-medium">Saved 28% Using AI Prediction</p>
                                </div>
                            </div>
                        </div>

                        <div className="absolute -bottom-6 -left-10 glass p-6 rounded-3xl w-72 animate-float [animation-delay:-2s]">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Your AI Rank</p>
                                    <p className="text-3xl font-black text-indigo-400">12,400</p>
                                </div>
                                <div className="px-2 py-1 bg-green-500/10 text-green-400 border border-green-500/20 rounded text-[10px] font-bold">
                                    Top 1%
                                </div>
                            </div>
                            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                                <div className="w-[85%] h-full bg-indigo-500" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trusted By Section */}
            <section className="py-12 border-y border-white/5 bg-[#05060f] relative overflow-hidden">
                <div className="flex items-center gap-8 animate-marquee whitespace-nowrap">
                    {[1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6].map((i, index) => (
                        <div key={index} className="flex items-center gap-3 px-8 grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all cursor-default">
                            <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
                                <Cpu size={16} className="text-white" />
                            </div>
                            <span className="text-xl font-black tracking-tighter uppercase whitespace-nowrap">
                                {['Google', 'Meta', 'OpenAI', 'Microsoft', 'Nvidia', 'Tesla'][i - 1]}
                            </span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Features Grid */}
            <section id="features" className="py-24 px-6 bg-[#08091a]">
                <div className="max-w-7xl mx-auto space-y-16">
                    <div className="text-center space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-400 text-xs font-bold uppercase tracking-wider">
                            AI Features Section
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black tracking-tight max-w-2xl mx-auto">
                            AI-Powered Recruitment, <br />
                            <span className="text-indigo-500">Hire Effortlessly</span> With HireJob
                        </h2>
                        <p className="text-slate-500 max-w-lg mx-auto">
                            Enjoy seamless talent sourcing, smarter role predictions, and personalized rewards powered by HireJob AI for smoother journeys.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature, index) => (
                            <FeatureCard
                                key={index}
                                icon={feature.icon}
                                title={feature.title}
                                desc={feature.desc}
                                active={index === 1}
                                onLearnMore={() => setSelectedFeature(feature)}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section id="how-it-works" className="py-24 px-6 relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[600px] bg-indigo-600/5 blur-[120px] -z-10" />
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20 space-y-4">
                        <h2 className="text-4xl md:text-5xl font-black tracking-tight">How It <span className="text-indigo-500">Works</span></h2>
                        <p className="text-slate-500 max-w-lg mx-auto italic">Deploying AI to accelerate your career growth in 3 steps.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-12 relative">
                        {/* Connecting Line */}
                        <div className="hidden md:block absolute top-[60px] left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-indigo-500/0 via-indigo-500/20 to-indigo-500/0" />

                        <StepCard
                            number="01"
                            title="Sync Identity"
                            desc="Connect your GitHub, LinkedIn, or CV to create your AI-enhanced professional profile."
                            icon={<Users size={24} />}
                        />
                        <StepCard
                            number="02"
                            title="AI Matchmaking"
                            desc="Our neural network analyzes 2,000+ data points to find your 95% match score roles."
                            icon={<Zap size={24} />}
                        />
                        <StepCard
                            number="03"
                            title="Start Mission"
                            desc="Apply with one click and track your interview pipeline through our real-time cockpit."
                            icon={<ArrowRight size={24} />}
                        />
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className="py-24 px-6 bg-[#08091a] relative">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16 space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-400 text-xs font-bold uppercase tracking-wider">
                            Choose Your Plan
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black tracking-tight">Flexible <span className="text-indigo-500">Pricing</span></h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <PricingCard
                            tier="Starter"
                            price="0"
                            features={["3 Applications/Mo", "Basic AI Filter", "Profile Search", "Public Dashboard"]}
                        />
                        <PricingCard
                            tier="Pro"
                            price="29"
                            active={true}
                            features={["Unlimited Applications", "Advanced AI Matchmaking", "Interview Prep AI", "Priority Verification"]}
                        />
                        <PricingCard
                            tier="Enterprise"
                            price="199"
                            features={["Custom Recruiting Pipeline", "Dedicated Account Manager", "API Access", "SSO Integration"]}
                        />
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section id="features" className="py-24 px-6 bg-[#08091a]">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16 space-y-4">
                        <h2 className="text-4xl font-bold text-white">AI-Powered Recruitment</h2>
                        <p className="text-slate-400 max-w-2xl mx-auto font-medium">
                            Leverage cutting-edge artificial intelligence to transform your hiring workflow and build your dream team.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <FAQItem
                            question="How accurate is the AI match score?"
                            answer="Our match score is trained on over 10 million successful hires and currently maintains a 94% accuracy rate based on skills, culture fit, and career trajectory."
                        />
                        <FAQItem
                            question="Is my data secure with HireJob AI?"
                            answer="We use military-grade AES-256 encryption. Your professional data is only visible to verified recruiters you choose to interact with."
                        />
                        <FAQItem
                            question="Can I use HireJob for free?"
                            answer="Yes! Our Starter plan allows you to browse all public jobs and apply to up to 3 positions per month without any cost."
                        />
                    </div>
                </div>
            </section>

            {/* Enhanced Footer */}
            <footer className="pt-24 pb-12 px-6 border-t border-white/5 bg-[#05060f] relative z-10">
                <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 mb-16">
                    <div className="space-y-6">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                                <Cpu className="text-white" size={24} />
                            </div>
                            <span className="text-2xl font-black tracking-tighter">HireJob<span className="text-indigo-500">.AI</span></span>
                        </div>
                        <p className="text-sm text-slate-500 leading-relaxed">
                            Pioneering the future of recruitment with advanced neural networks and human-centric design.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6 text-white uppercase tracking-widest text-xs">Terminal</h4>
                        <ul className="space-y-4 text-sm text-slate-500">
                            <li><a href="#" className="hover:text-indigo-400 transition-colors">Explore Jobs</a></li>
                            <li><a href="#" className="hover:text-indigo-400 transition-colors">Match Score</a></li>
                            <li><a href="#" className="hover:text-indigo-400 transition-colors">Career Path</a></li>
                            <li><a href="#" className="hover:text-indigo-400 transition-colors">Skill Verify</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6 text-white uppercase tracking-widest text-xs">Resources</h4>
                        <ul className="space-y-4 text-sm text-slate-500">
                            <li><a href="#" className="hover:text-indigo-400 transition-colors">Documentation</a></li>
                            <li><a href="#" className="hover:text-indigo-400 transition-colors">API Status</a></li>
                            <li><a href="#" className="hover:text-indigo-400 transition-colors">Hiring Blog</a></li>
                            <li><a href="#" className="hover:text-indigo-400 transition-colors">Tech Stack</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6 text-white uppercase tracking-widest text-xs">Legal</h4>
                        <ul className="space-y-4 text-sm text-slate-500">
                            <li><a href="#" className="hover:text-indigo-400 transition-colors">Privacy Protocol</a></li>
                            <li><a href="#" className="hover:text-indigo-400 transition-colors">Terms of Service</a></li>
                            <li><a href="#" className="hover:text-indigo-400 transition-colors">Cookie Policy</a></li>
                            <li><a href="#" className="hover:text-indigo-400 transition-colors">Compliance</a></li>
                        </ul>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 pt-12 border-t border-white/5">
                    <p className="text-xs text-slate-600 font-medium">
                        © 2025 HireJob.AI Recruitment Technologies. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-slate-500">
                        <a href="#" className="hover:text-white transition-colors text-xs font-bold uppercase tracking-widest">Twitter</a>
                        <a href="#" className="hover:text-white transition-colors text-xs font-bold uppercase tracking-widest">LinkedIn</a>
                        <a href="#" className="hover:text-white transition-colors text-xs font-bold uppercase tracking-widest">Discord</a>
                    </div>
                </div>
            </footer>

            {/* Centered Branding Backdrop */}
            <div className="fixed inset-0 flex items-center justify-center pointer-events-none -z-10 hidden lg:flex overflow-hidden">
                <h1 className="text-[25vw] font-black tracking-tighter text-white/[0.03] select-none whitespace-nowrap animate-pulse-slow">
                    HIREJOB AI
                </h1>
            </div>

            {selectedFeature && (
                <FeatureModal
                    feature={selectedFeature}
                    onClose={() => setSelectedFeature(null)}
                />
            )}
        </div>
    );
};

const FeatureCard: React.FC<{
    icon: React.ReactNode,
    title: string,
    desc: string,
    iconBg?: string,
    active?: boolean,
    onLearnMore?: () => void
}> = ({ icon, title, desc, iconBg = "bg-white/5", active = false, onLearnMore }) => (
    <div className={`p-8 rounded-3xl glass-card group transition-all duration-500 min-h-[220px] flex flex-col justify-between ${active ? 'bg-indigo-600/10 border-indigo-500/40' : ''}`}>
        <div>
            <div className={`w-12 h-12 ${iconBg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                {icon}
            </div>
            <h3 className="text-lg font-bold mb-3 group-hover:text-indigo-400 transition-colors uppercase tracking-tight">{title}</h3>
            <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">{desc}</p>
        </div>
        <button
            onClick={(e) => {
                e.preventDefault();
                onLearnMore?.();
            }}
            className="w-fit flex items-center gap-2 text-xs font-bold text-indigo-400 hover:text-white transition-colors mt-4"
        >
            Learn more <ArrowRight size={14} />
        </button>
    </div>
);

const StepCard: React.FC<{
    number: string,
    title: string,
    desc: string,
    icon: React.ReactNode
}> = ({ number, title, desc, icon }) => (
    <div className="relative z-10 text-center space-y-6 group">
        <div className="w-20 h-20 bg-indigo-600 rounded-[2rem] flex items-center justify-center mx-auto shadow-2xl shadow-indigo-500/20 group-hover:scale-110 transition-transform duration-500 relative">
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#05060f] border border-indigo-500/40 rounded-full flex items-center justify-center text-[10px] font-black text-indigo-400">
                {number}
            </div>
            {icon}
        </div>
        <div className="space-y-2">
            <h3 className="text-xl font-bold">{title}</h3>
            <p className="text-sm text-slate-500 leading-relaxed px-4">{desc}</p>
        </div>
    </div>
);

const PricingCard: React.FC<{
    tier: string,
    price: string,
    features: string[],
    active?: boolean
}> = ({ tier, price, features, active = false }) => (
    <div className={`p-10 rounded-[2.5rem] glass-card flex flex-col items-center text-center space-y-8 relative overflow-hidden group ${active ? 'bg-indigo-600/10 border-indigo-500/40' : ''}`}>
        {active && (
            <div className="absolute top-6 right-6 px-3 py-1 bg-indigo-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full">
                Most Popular
            </div>
        )}
        <div className="space-y-2">
            <h3 className="text-xl font-bold uppercase tracking-widest text-slate-400">{tier}</h3>
            <div className="flex items-baseline justify-center">
                <span className="text-5xl font-black">${price}</span>
                <span className="text-slate-500 text-sm font-medium ml-1">/mo</span>
            </div>
        </div>
        <ul className="space-y-4 w-full text-sm text-slate-400 font-medium">
            {features.map((f, i) => (
                <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 size={16} className="text-indigo-500 flex-shrink-0" />
                    <span>{f}</span>
                </li>
            ))}
        </ul>
        <button className={`w-full py-4 rounded-2xl font-bold transition-all ${active ? 'button-primary shadow-xl shadow-indigo-500/20' : 'bg-white/5 hover:bg-white/10'}`}>
            Initialize {tier}
        </button>
    </div>
);

const FAQItem: React.FC<{
    question: string,
    answer: string
}> = ({ question, answer }) => (
    <div className="p-6 rounded-2xl glass-dark border border-white/5 hover:border-white/10 transition-all cursor-pointer group">
        <h3 className="text-lg font-bold mb-2 group-hover:text-indigo-400 transition-colors flex justify-between items-center">
            {question}
            <Plus size={18} className="text-slate-600 group-hover:rotate-45 transition-transform" />
        </h3>
        <p className="text-sm text-slate-500 leading-relaxed">{answer}</p>
    </div>
);

export default LandingPage;