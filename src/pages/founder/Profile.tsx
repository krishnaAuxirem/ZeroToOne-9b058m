import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Camera, Globe, Linkedin, Twitter, MapPin, Save, Edit3, Briefcase, Phone, Mail } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const FounderProfile = () => {
  const { user } = useAuth();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || 'Arjun Sharma',
    email: user?.email || 'founder@zerotoone.com',
    phone: '+91 99887 76655',
    bio: 'Serial entrepreneur with 2 exits. Currently building EduVerse — AI-powered personalized learning for K-12. Previously at BYJU\'s as PM. IIT Bombay alumnus. Passionate about making quality education accessible to every Indian child.',
    location: 'Bangalore, India',
    company: 'EduVerse',
    website: 'https://eduverse.in',
    linkedin: 'linkedin.com/in/arjunsharma',
    twitter: '@arjunsharma',
    stage: 'Series A',
    industry: 'EdTech',
    founded: '2023',
  });

  const SKILLS = ['Product Strategy', 'Fundraising', 'Team Building', 'EdTech', 'B2B Sales', 'Growth Marketing'];

  return (
    <DashboardLayout title="Founder Profile">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Cover & Avatar */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-border bg-card overflow-hidden">
          <div className="h-36 bg-gradient-to-r from-blue-700 to-purple-800 relative">
            <button className="absolute bottom-3 right-3 p-2 rounded-lg bg-black/30 text-white hover:bg-black/50 transition-all">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          <div className="px-6 pb-6">
            <div className="flex items-end justify-between -mt-10 mb-4">
              <div className="relative">
                <img src={user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name}`} alt="" className="w-20 h-20 rounded-2xl ring-4 ring-card bg-muted" />
                <button className="absolute -bottom-1 -right-1 p-1.5 rounded-lg bg-primary text-white">
                  <Camera className="w-3 h-3" />
                </button>
              </div>
              <button onClick={() => { setEditing(!editing); if (editing) toast.success('Profile saved!'); }} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all">
                {editing ? <><Save className="w-4 h-4" /> Save</> : <><Edit3 className="w-4 h-4" /> Edit Profile</>}
              </button>
            </div>

            {editing ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { label: 'Full Name', key: 'name' }, { label: 'Company', key: 'company' },
                    { label: 'Location', key: 'location' }, { label: 'Industry', key: 'industry' },
                    { label: 'Startup Stage', key: 'stage' }, { label: 'Founded Year', key: 'founded' },
                    { label: 'Website', key: 'website' }, { label: 'Phone', key: 'phone' },
                    { label: 'LinkedIn', key: 'linkedin' }, { label: 'Twitter', key: 'twitter' },
                  ].map(({ label, key }) => (
                    <div key={key}>
                      <label className="text-xs text-muted-foreground mb-1 block">{label}</label>
                      <input value={form[key as keyof typeof form]} onChange={e => setForm({ ...form, [key]: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:border-primary" />
                    </div>
                  ))}
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Bio</label>
                  <textarea value={form.bio} onChange={e => setForm({ ...form, bio: e.target.value })} rows={3} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:border-primary resize-none" />
                </div>
              </div>
            ) : (
              <div>
                <h2 className="text-xl font-bold text-foreground">{form.name}</h2>
                <p className="text-muted-foreground text-sm">Founder & CEO · {form.company}</p>
                <div className="flex flex-wrap items-center gap-3 mt-2 text-muted-foreground text-xs">
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{form.location}</span>
                  <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5" />{form.industry} · {form.stage}</span>
                  <span className="flex items-center gap-1"><Globe className="w-3.5 h-3.5" />{form.website}</span>
                </div>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{form.bio}</p>
                <div className="flex gap-3 mt-3 text-xs text-muted-foreground">
                  <a href="#" className="flex items-center gap-1 hover:text-primary transition-colors"><Linkedin className="w-3.5 h-3.5" />LinkedIn</a>
                  <a href="#" className="flex items-center gap-1 hover:text-primary transition-colors"><Twitter className="w-3.5 h-3.5" />{form.twitter}</a>
                  <a href="#" className="flex items-center gap-1 hover:text-primary transition-colors"><Mail className="w-3.5 h-3.5" />{form.email}</a>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Skills */}
        <div className="rounded-2xl border border-border bg-card p-5">
          <h3 className="font-semibold text-foreground mb-3">Skills & Expertise</h3>
          <div className="flex flex-wrap gap-2">
            {SKILLS.map(s => <span key={s} className="px-3 py-1.5 rounded-full bg-blue-500/10 text-blue-400 text-sm">{s}</span>)}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          {[{ label: 'Connections', value: '248' }, { label: 'Profile Views', value: '1,420' }, { label: 'Community Posts', value: '12' }].map(s => (
            <div key={s.label} className="rounded-2xl border border-border bg-card p-4 text-center">
              <p className="text-2xl font-bold text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default FounderProfile;
