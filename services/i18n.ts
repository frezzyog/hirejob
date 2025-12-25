// Simple i18n service for English and Khmer language support

export type Language = 'en' | 'km';

export const translations = {
    en: {
        // Header
        appName: 'HireJob AI',

        // Navigation
        jobs: 'Jobs',
        explore: 'Explore',
        hireAI: 'HireAI',
        saved: 'Saved',
        profile: 'Profile',

        // Jobs Page
        discoverJobs: 'Discover Jobs',
        showingOpportunities: 'Showing {count} opportunities for your profile.',
        searchPlaceholder: 'Search roles, companies, or tech stack...',
        filters: 'Filters',
        noMatches: 'No matches found',
        noMatchesDesc: 'Try broadening your search or modifying your profile skills.',

        // Job Card
        applyNow: 'Apply Now',
        applyTelegram: 'Apply via Telegram',
        viewDetails: 'View Details',

        // Explore Page
        exploreCareer: 'Explore Your',
        careerHorizon: 'Career Horizon',
        exploreDesc: 'Discover top trending roles and companies looking for talent like you.',
        marketTrends: 'Market Trends',
        smartPicks: 'Smart Picks',
        savedCriteria: 'Saved Criteria',
        industryLeaders: 'Industry Leaders',

        // Saved Page
        savedOpportunities: 'Saved Opportunities',
        listEmpty: 'Your list is empty',
        bookmarksDesc: 'Bookmarks will appear here for you to review later.',

        // Auth
        signIn: 'Sign In',
        signUp: 'Sign Up',
        email: 'Email',
        password: 'Password',
    },
    km: {
        // Header
        appName: 'ហៃអេអាយ',

        // Navigation
        jobs: 'ការងារ',
        explore: 'ស្វែងរក',
        hireAI: 'ជំនួយការ',
        saved: 'រក្សាទុក',
        profile: 'ប្រវត្តិរូប',

        // Jobs Page
        discoverJobs: 'ស្វែងរកការងារ',
        showingOpportunities: 'កំពុងបង្ហាញឱកាស {count} សម្រាប់ប្រវត្តិរូបរបស់អ្នក។',
        searchPlaceholder: 'ស្វែងរកតួនាទី ក្រុមហ៊ុន ឬបច្ចេកវិទ្យា...',
        filters: 'តម្រង',
        noMatches: 'រកមិនឃើញ',
        noMatchesDesc: 'សូមព្យាយាមពង្រីកការស្វែងរករបស់អ្នក ឬកែប្រែជំនាញ។',

        // Job Card
        applyNow: 'ដាក់ពាក្យឥឡូវ',
        applyTelegram: 'ដាក់ពាក្យតាម Telegram',
        viewDetails: 'មើលព័ត៌មានលម្អិត',

        // Explore Page
        exploreCareer: 'ស្វែងរកអាជីព',
        careerHorizon: 'របស់អ្នក',
        exploreDesc: 'ស្វែងរកតួនាទីពេញនិយម និងក្រុមហ៊ុនកំពុងស្វែងរកទេពកោសល្យដូចអ្នក។',
        marketTrends: 'និន្នាការទីផ្សារ',
        smartPicks: 'ជម្រើសឆ្លាត',
        savedCriteria: 'លក្ខខណ្ឌរក្សាទុក',
        industryLeaders: 'ក្រុមហ៊ុនឈានមុខ',

        // Saved Page
        savedOpportunities: 'ឱកាសដែលបានរក្សាទុក',
        listEmpty: 'បញ្ជីរបស់អ្នកទទេ',
        bookmarksDesc: 'ការចំណាំនឹងបង្ហាញនៅទីនេះសម្រាប់ពិនិត្យមើលពេលក្រោយ។',

        // Auth
        signIn: 'ចូលគណនី',
        signUp: 'បង្កើតគណនី',
        email: 'អ៊ីមែល',
        password: 'ពាក្យសម្ងាត់',
    }
};

class I18nService {
    private currentLanguage: Language = 'en';
    private listeners: Array<(lang: Language) => void> = [];

    constructor() {
        // Load saved language preference
        const saved = localStorage.getItem('language') as Language;
        if (saved && (saved === 'en' || saved === 'km')) {
            this.currentLanguage = saved;
        }
    }

    getLanguage(): Language {
        return this.currentLanguage;
    }

    setLanguage(lang: Language) {
        this.currentLanguage = lang;
        localStorage.setItem('language', lang);
        this.listeners.forEach(listener => listener(lang));
    }

    t(key: string, params?: Record<string, any>): string {
        const keys = key.split('.');
        let value: any = translations[this.currentLanguage];

        for (const k of keys) {
            value = value?.[k];
        }

        if (typeof value !== 'string') {
            return key;
        }

        // Replace parameters
        if (params) {
            return value.replace(/\{(\w+)\}/g, (_, paramKey) => params[paramKey] || '');
        }

        return value;
    }

    subscribe(listener: (lang: Language) => void) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }
}

export const i18n = new I18nService();
