import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Camera, Globe, Linkedin, Twitter, MapPin, Save, Edit3, Briefcase, DollarSign } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const InvestorProfile = () => {
  const { user } = useAuth();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || 'Vikram Mehta',
    firm: 'BlueSky Ventures',
    type: 'VC Fund',
    location: 'Delhi, India',
    bio: 'Partner at BlueSky Ventures. Invested in 30+ startups across SaaS, FinTech, and EdTech. Former Goldman Sachs VP. IIM Ahmedabad alumnus. Thesis: Capital-efficient, defensible B2B businesses.',
    website: 'https://blueskyventures.in',
    linkedin: 'linkedin.com/in/vikrammehta',
    twitter: '@vikrammehta',
    portfolio: '30',
    minTicket: '50L',
    maxTicket: '5Cr',
    stages: 'Seed, Series A',
    sectors: 'SaaS, FinTech, EdTech',
  });

  return (
    <DashboardLayout title="Investor Profile">
      <div className="max-w-3xl mx-auto space-y-6">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-border bg-card overflow-hidden">
          <div className="h-36 bg-gradient-to-r from-green-700 to-emerald-800 relative">
            <button className="absolute bottom-3 right-3 p-2 rounded-lg bg-black/30 text-white hover:bg-black/50"><Camera className="w-4 h-4" /></button>
          </div>
          <div className="px-6 pb-6">
            <div className="flex items-end justify-between -mt-10 mb-4">
              <div className="relative">
                <img src={user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=vikram`} alt="" className="w-20 h-20 rounded-2xl ring-4 ring-card bg-muted" />
                <button className="absolute -bottom-1 -right-1 p-1.5 rounded-lg bg-primary text-white"><Camera className="w-3 h-3" /></button>
              </div>
              <button onClick={() => { setEditing(!editing); if (editing) toast.success('Profile saved!'); }} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90">
                {editing ? <><Save className="w-4 h-4" /> Save</> : <><Edit3 className="w-4 h-4" /> Edit</>}
              </button>
            </div>
            {editing ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(form).map(([key, val]) => (
                  <div key={key} className={key === 'bio' ? 'md:col-span-2' : ''}>
                    <label className="text-xs text-muted-foreground mb-1 block capitalize">{key.replace(/([A-Z])/g, ' $1')}</label>
                    {key === 'bio' ? <textarea value={val} onChange={e => setForm({ ...form, [key]: e.target.value })} rows={3} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:border-primary resize-none" /> : <input value={val} onChange={e => setForm({ ...form, [key]: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:border-primary" />}
                  </div>
                ))}
              </div>
            ) : (
              <div>
                <h2 className="text-xl font-bold text-foreground">{form.name}</h2>
                <p className="text-muted-foreground text-sm">{form.type} · {form.firm}</p>
                <div className="flex flex-wrap gap-3 mt-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{form.location}</span>
                  <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5" />{form.portfolio} portfolio cos</span>
                  <span className="flex items-center gap-1"><DollarSign className="w-3.5 h-3.5" />₹{form.minTicket}–₹{form.maxTicket}</span>
                </div>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{form.bio}</p>
              </div>
            )}
          </div>
        </motion.div>

        <div className="grid grid-cols-3 gap-4">
          {[{ label: 'Portfolio Companies', value: form.portfolio }, { label: 'Preferred Stages', value: form.stages }, { label: 'Focus Sectors', value: form.sectors }].map(s => (
            <div key={s.label} className="rounded-2xl border border-border bg-card p-4 text-center">
              <p className="text-sm font-bold text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-border bg-card p-5">
          <h3 className="font-semibold text-foreground mb-3">Investment Thesis</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">Focus on capital-efficient, product-led businesses with strong unit economics at Seed and Series A. Preference for B2B SaaS and FinTech with global potential. Typical check size ₹50L–₹5Cr. Board seat at Series A.</p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default InvestorProfile;
