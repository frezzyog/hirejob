
export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary_range: string;
  job_type: 'Full-time' | 'Part-time' | 'Remote' | 'Contract';
  experience_level: 'Entry' | 'Mid' | 'Senior' | 'Lead';
  description: string;
  skills_required: string[];
  posted_at: string;
  logo_url: string;
  telegram_link?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  skills: string[];
  experience_years: number;
  expected_salary: number;
  job_preferences: {
    types: string[];
    locations: string[];
    role_titles: string[];
  };
  bio: string;
}

export interface Application {
  id: string;
  job_id: string;
  user_id: string;
  status: 'pending' | 'reviewed' | 'interviewing' | 'rejected';
  applied_at: string;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface JobSearchParams {
  title?: string;
  location?: string;
  job_type?: string;
  min_salary?: number;
  experience_level?: string;
}
