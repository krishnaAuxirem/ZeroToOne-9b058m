import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, MapPin, Star, Edit3, Camera, Briefcase, Globe, Linkedin, Twitter, Save, Plus, X } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const EXPERTISE_OPTIONS = ['B2B SaaS', 'FinTech', 'EdTech', 'Growth Marketing', 'Fundraising', 'Product Strategy', 'Tech Architecture', 'Operations', 'Legal', 'HR Strategy', 'Sales', 'AI/ML'];

const MentorProfile = () => {
  const { user } = useAuth();
  const [editing, setEditing] = useState(false);
  const [expertiseTags, setExpertiseTags] = useState(['B2B SaaS', 'Product Strategy', 'Fundraising']);
  const [form, setForm] = useState({
    name: user?.name || 'Priya Nair',
    title: 'Startup Advisor & Former CTO',
    bio: 'Former CTO at a unicorn startup with 12+ years of experience. Mentor to 50+ founders across EdTech, FinTech, and SaaS. Passionate about helping early-stage founders build products that scale.',
    company: 'Independent Advisor',
    location: 'Mumbai, India',
    website: 'https://priyanair.in',
    linkedin: 'linkedin.com/in/priyanair',
    twitter: '@priyanair',
    hourlyRate: '4500',
    experience: '12',
    languages: 'English, Hindi, Marathi',
  });

  const removeTag = (tag: string) => setExpertiseTags(prev => prev.filter(t => t !== tag));
  const addTag = (tag: string) => { if (!expertiseTags.includes(tag)) setExpertiseTags(prev => [...prev, tag]); };

  return (
    <DashboardLayout title="My Profile">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header Card */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-border bg-card overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-purple-700 to-indigo-800 relative">
            <button className="absolute bottom-3 right-3 p-2 rounded-lg bg-black/30 text-white hover:bg-black/50 transition-all">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          <div className="px-6 pb-6 relative">
            <div className="flex items-end justify-between -mt-12 mb-4">
              <div className="relative">
                <img src={user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name}`} alt={user?.name} className="w-20 h-20 rounded-2xl ring-4 ring-card bg-muted" />
                <button className="absolute -bottom-1 -right-1 p-1.5 rounded-lg bg-primary text-white">
                  <Camera className="w-3 h-3" />
                </button>
              </div>
              <button onClick={() => { setEditing(!editing); if (editing) toast.success('Profile saved!'); }} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all">
                {editing ? <><Save className="w-4 h-4" /> Save Changes</> : <><Edit3 className="w-4 h-4" /> Edit Profile</>}
              </button>
            </div>
            {editing ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">Full Name</label>
                    <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:border-primary" />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">Title</label>
                    <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:border-primary" />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">Company</label>
                    <input value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:border-primary" />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">Location</label>
                    <input value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:border-primary" />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">Hourly Rate (₹)</label>
                    <input value={form.hourlyRate} onChange={e => setForm({ ...form, hourlyRate: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:border-primary" />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">Years of Experience</label>
                    <input value={form.experience} onChange={e => setForm({ ...form, experience: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:border-primary" />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Bio</label>
                  <textarea value={form.bio} onChange={e => setForm({ ...form, bio: e.target.value })} rows={3} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:border-primary resize-none" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">Website</label>
                    <input value={form.website} onChange={e => setForm({ ...form, website: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:border-primary" />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">LinkedIn</label>
                    <input value={form.linkedin} onChange={e => setForm({ ...form, linkedin: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:border-primary" />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">Twitter</label>
                    <input value={form.twitter} onChange={e => setForm({ ...form, twitter: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:border-primary" />
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <h2 className="text-xl font-bold text-foreground">{form.name}</h2>
                <p className="text-muted-foreground text-sm">{form.title} · {form.company}</p>
                <div className="flex items-center gap-4 mt-2 text-muted-foreground text-xs">
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{form.location}</span>
                  <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-yellow-500" />4.9 rating</span>
                  <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5" />{form.experience} yrs exp</span>
                </div>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{form.bio}</p>
                <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                  <a href={form.website} className="flex items-center gap-1 hover:text-primary transition-colors"><Globe className="w-3.5 h-3.5" />Website</a>
                  <a href="#" className="flex items-center gap-1 hover:text-primary transition-colors"><Linkedin className="w-3.5 h-3.5" />LinkedIn</a>
                  <a href="#" className="flex items-center gap-1 hover:text-primary transition-colors"><Twitter className="w-3.5 h-3.5" />Twitter</a>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Sessions', value: '287', color: 'text-purple-500' },
            { label: 'Founders Helped', value: '94', color: 'text-blue-500' },
            { label: 'Avg Rating', value: '4.9', color: 'text-yellow-500' },
            { label: 'Hourly Rate', value: `₹${form.hourlyRate}`, color: 'text-green-500' },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl border border-border bg-card p-4 text-center">
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Expertise */}
        <div className="rounded-2xl border border-border bg-card p-5">
          <h3 className="font-semibold text-foreground mb-4">Areas of Expertise</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {expertiseTags.map(tag => (
              <span key={tag} className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-purple-500/10 text-purple-400 text-sm">
                {tag}
                {editing && <button onClick={() => removeTag(tag)}><X className="w-3 h-3" /></button>}
              </span>
            ))}
          </div>
          {editing && (
            <div className="flex flex-wrap gap-2">
              {EXPERTISE_OPTIONS.filter(o => !expertiseTags.includes(o)).map(opt => (
                <button key={opt} onClick={() => addTag(opt)} className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-dashed border-border text-muted-foreground text-xs hover:border-purple-500/50 hover:text-purple-400 transition-all">
                  <Plus className="w-3 h-3" />{opt}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Profile Completion */}
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-foreground">Profile Completion</h3>
            <span className="text-purple-500 font-bold text-sm">85%</span>
          </div>
          <div className="h-2 rounded-full bg-muted overflow-hidden mb-4">
            <div className="h-full bg-purple-500 rounded-full" style={{ width: '85%' }} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {[
              { task: 'Add profile photo', done: true },
              { task: 'Write bio', done: true },
              { task: 'Add expertise tags', done: true },
              { task: 'Set availability', done: true },
              { task: 'Link social profiles', done: false },
              { task: 'Add certifications', done: false },
            ].map((item) => (
              <div key={item.task} className={`flex items-center gap-2 text-sm ${item.done ? 'text-muted-foreground line-through' : 'text-foreground'}`}>
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${item.done ? 'bg-green-500 border-green-500' : 'border-border'}`}>
                  {item.done && <div className="w-2 h-2 bg-white rounded-full" />}
                </div>
                {item.task}
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MentorProfile;
