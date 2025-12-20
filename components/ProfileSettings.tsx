
import React, { useState, useEffect } from 'react';
import { UserProfile, Education, Certificate } from '../types';
import { supabase } from '../services/supabaseClient';
import { Camera, Plus, X, Save, LogOut, Loader2, GraduationCap, Award, Trash2 } from 'lucide-react';

interface ProfileSettingsProps {
  userId?: string;
}

const ProfileSettings: React.FC<ProfileSettingsProps> = ({ userId }) => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [newSkill, setNewSkill] = useState('');

  const [newEducation, setNewEducation] = useState<Omit<Education, 'id'>>({ school: '', degree: '', field: '', year: '' });
  const [newCertificate, setNewCertificate] = useState<Omit<Certificate, 'id'>>({ name: '', issuer: '', year: '' });

  useEffect(() => {
    const fetchProfile = async () => {
      if (!userId) return;

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (data && !error) {
        setProfile(data as UserProfile);
      } else {
        // Create initial default profile state
        setProfile({
          id: userId,
          name: '',
          email: '',
          skills: [],
          education: [],
          certificates: [],
          experience_years: 0,
          expected_salary: 0,
          job_preferences: {
            types: [],
            locations: [],
            role_titles: []
          },
          bio: ''
        });
      }
      setLoading(false);
    };

    fetchProfile();
  }, [userId]);

  const addSkill = () => {
    if (profile && newSkill.trim() && !profile.skills.includes(newSkill.trim())) {
      setProfile({ ...profile, skills: [...profile.skills, newSkill.trim()] });
      setNewSkill('');
    }
  };

  const removeSkill = (skill: string) => {
    if (profile) {
      setProfile({ ...profile, skills: profile.skills.filter(s => s !== skill) });
    }
  };

  const addEducation = () => {
    if (profile && newEducation.school && newEducation.degree) {
      const education: Education = { ...newEducation, id: Date.now().toString() };
      setProfile({ ...profile, education: [...(profile.education || []), education] });
      setNewEducation({ school: '', degree: '', field: '', year: '' });
    }
  };

  const removeEducation = (id: string) => {
    if (profile) {
      setProfile({ ...profile, education: (profile.education || []).filter(e => e.id !== id) });
    }
  };

  const addCertificate = () => {
    if (profile && newCertificate.name && newCertificate.issuer) {
      const certificate: Certificate = { ...newCertificate, id: Date.now().toString() };
      setProfile({ ...profile, certificates: [...(profile.certificates || []), certificate] });
      setNewCertificate({ name: '', issuer: '', year: '' });
    }
  };

  const removeCertificate = (id: string) => {
    if (profile) {
      setProfile({ ...profile, certificates: (profile.certificates || []).filter(c => c.id !== id) });
    }
  };

  const handleSave = async () => {
    if (!profile || !userId) return;
    setSaving(true);

    const { error } = await supabase
      .from('profiles')
      .upsert({ ...profile, id: userId });

    if (error) {
      alert('Error saving profile: ' + error.message);
    } else {
      alert('Profile updated successfully!');
    }
    setSaving(false);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  if (loading || !profile) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <Loader2 className="animate-spin text-indigo-600" size={40} />
        <p className="text-slate-500 font-medium italic">Loading your profile...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8 pb-10 animate-in fade-in duration-500">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden ring-4 ring-indigo-50 dark:ring-indigo-900/20 shadow-xl">
            <img src={`https://picsum.photos/seed/${userId}/200/200`} alt="Profile" className="w-full h-full object-cover" />
          </div>
          <button className="absolute bottom-0 right-0 p-2 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition-colors border-2 border-white dark:border-slate-950">
            <Camera size={14} />
          </button>
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-bold">{profile.name || 'Set your name'}</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Managing account profile</p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <h3 className="text-lg font-bold flex items-center gap-2">
          Personal Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Full Name</label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="e.g. John Doe"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Experience (Years)</label>
            <input
              type="number"
              value={profile.experience_years}
              onChange={(e) => setProfile({ ...profile, experience_years: parseInt(e.target.value) || 0 })}
              className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Professional Bio</label>
            <textarea
              value={profile.bio}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 min-h-[100px] outline-none resize-none"
              placeholder="Tell us about your background and what you're looking for..."
            />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <h3 className="text-lg font-bold flex items-center gap-2">
          <GraduationCap className="text-indigo-600" size={20} />
          Education
        </h3>

        <div className="space-y-4">
          {(profile.education || []).map((edu) => (
            <div key={edu.id} className="flex justify-between items-start bg-slate-50 dark:bg-slate-800 p-4 rounded-xl">
              <div>
                <h4 className="font-bold text-sm">{edu.school}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">{edu.degree} in {edu.field}</p>
                <p className="text-xs text-slate-400">{edu.year}</p>
              </div>
              <button onClick={() => removeEducation(edu.id)} className="text-slate-400 hover:text-red-500 transition-colors">
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4 border border-slate-100 dark:border-slate-800 rounded-xl">
          <input
            type="text"
            placeholder="School / University"
            value={newEducation.school}
            onChange={(e) => setNewEducation({ ...newEducation, school: e.target.value })}
            className="bg-slate-50 dark:bg-slate-800 border-none rounded-lg px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-indigo-500"
          />
          <input
            type="text"
            placeholder="Degree (e.g. BSc)"
            value={newEducation.degree}
            onChange={(e) => setNewEducation({ ...newEducation, degree: e.target.value })}
            className="bg-slate-50 dark:bg-slate-800 border-none rounded-lg px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-indigo-500"
          />
          <input
            type="text"
            placeholder="Field of Study"
            value={newEducation.field}
            onChange={(e) => setNewEducation({ ...newEducation, field: e.target.value })}
            className="bg-slate-50 dark:bg-slate-800 border-none rounded-lg px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-indigo-500"
          />
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Year"
              value={newEducation.year}
              onChange={(e) => setNewEducation({ ...newEducation, year: e.target.value })}
              className="w-24 bg-slate-50 dark:bg-slate-800 border-none rounded-lg px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-indigo-500"
            />
            <button
              onClick={addEducation}
              disabled={!newEducation.school || !newEducation.degree}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg flex items-center justify-center gap-1 disabled:opacity-50"
            >
              <Plus size={16} /> Add
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <h3 className="text-lg font-bold flex items-center gap-2">
          <Award className="text-amber-500" size={20} />
          Certificates
        </h3>

        <div className="space-y-4">
          {(profile.certificates || []).map((cert) => (
            <div key={cert.id} className="flex justify-between items-start bg-slate-50 dark:bg-slate-800 p-4 rounded-xl">
              <div>
                <h4 className="font-bold text-sm">{cert.name}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">{cert.issuer}</p>
                <p className="text-xs text-slate-400">{cert.year}</p>
              </div>
              <button onClick={() => removeCertificate(cert.id)} className="text-slate-400 hover:text-red-500 transition-colors">
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4 border border-slate-100 dark:border-slate-800 rounded-xl">
          <input
            type="text"
            placeholder="Certificate Name"
            value={newCertificate.name}
            onChange={(e) => setNewCertificate({ ...newCertificate, name: e.target.value })}
            className="bg-slate-50 dark:bg-slate-800 border-none rounded-lg px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-indigo-500"
          />
          <input
            type="text"
            placeholder="Issuing Organization"
            value={newCertificate.issuer}
            onChange={(e) => setNewCertificate({ ...newCertificate, issuer: e.target.value })}
            className="bg-slate-50 dark:bg-slate-800 border-none rounded-lg px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-indigo-500"
          />
          <div className="flex gap-2 md:col-span-2">
            <input
              type="text"
              placeholder="Year"
              value={newCertificate.year}
              onChange={(e) => setNewCertificate({ ...newCertificate, year: e.target.value })}
              className="w-24 bg-slate-50 dark:bg-slate-800 border-none rounded-lg px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-indigo-500"
            />
            <button
              onClick={addCertificate}
              disabled={!newCertificate.name || !newCertificate.issuer}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg flex items-center justify-center gap-1 disabled:opacity-50"
            >
              <Plus size={16} /> Add Certificate
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <h3 className="text-lg font-bold">Skills & Expertise</h3>

        <div className="flex flex-wrap gap-2">
          {profile.skills.map(skill => (
            <span key={skill} className="flex items-center gap-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 px-3 py-1.5 rounded-full text-xs font-bold transition-all hover:bg-indigo-100">
              {skill}
              <button onClick={() => removeSkill(skill)} className="hover:text-red-500 transition-colors">
                <X size={12} />
              </button>
            </span>
          ))}
          {profile.skills.length === 0 && (
            <p className="text-xs text-slate-400 italic">No skills added yet.</p>
          )}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Add a new skill (e.g. React, Python)..."
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addSkill()}
            className="flex-1 bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
          />
          <button
            onClick={addSkill}
            className="bg-indigo-600 text-white p-2.5 rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 dark:shadow-none"
          >
            <Plus size={20} />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl transition-all shadow-xl shadow-indigo-100 dark:shadow-none disabled:opacity-50"
        >
          {saving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
          {saving ? 'Syncing...' : 'Save Profile Changes'}
        </button>
        <button
          onClick={handleSignOut}
          className="w-full flex items-center justify-center gap-2 text-slate-500 dark:text-slate-400 font-semibold py-4 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all border border-slate-200 dark:border-slate-800"
        >
          <LogOut size={20} />
          Sign Out of Account
        </button>
      </div>
    </div>
  );
};

export default ProfileSettings;
