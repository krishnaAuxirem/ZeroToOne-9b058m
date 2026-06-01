import { useState } from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Briefcase, Code, Globe, Mail, MapPin, Search, Star, Check, X, Linkedin } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { toast } from 'sonner';

const CO_FOUNDERS = [
  { id: 1, name: 'Rahul Gupta', role: 'CTO / Technical Co-Founder', skills: ['React', 'Node.js', 'AWS', 'System Design'], experience: '8 years at Razorpay', location: 'Bangalore', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=rahulg', equity: '20-30%', availability: 'Full-time', match: 94, bio: 'Ex-Razorpay tech lead. Built payments infrastructure handling ₹10K Cr/day. Looking to co-found in FinTech or EdTech.' },
  { id: 2, name: 'Priyanka Joshi', role: 'CPO / Growth Co-Founder', skills: ['Product Management', 'Growth', 'Analytics', 'UX'], experience: '6 years at Swiggy', location: 'Mumbai', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=priyankaj', equity: '15-25%', availability: 'Full-time', match: 89, bio: 'Product leader who grew Swiggy Instamart from 0 to 2M users. Passionate about consumer internet problems.' },
  { id: 3, name: 'Vikash Sharma', role: 'CFO / Finance Co-Founder', skills: ['Financial Modeling', 'Fundraising', 'Unit Economics', 'VC relations'], experience: '10 years at McKinsey & Sequoia', location: 'Delhi', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=vikash', equity: '10-20%', availability: 'Part-time initially', match: 82, bio: 'Ex-consultant and VC associate. Can structure deals, manage cap table, and lead fundraising rounds.' },
  { id: 4, name: 'Sneha Reddy', role: 'CMO / Marketing Co-Founder', skills: ['Performance Marketing', 'Brand', 'Content', 'D2C'], experience: '7 years at Meesho & Myntra', location: 'Bangalore', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=snehar', equity: '15-25%', availability: 'Full-time', match: 76, bio: 'Built Meesho\'s social commerce marketing engine. Expert in CAC optimization and virality mechanics.' },
];

const FounderTeamBuilding = () => {
  const [view, setView] = useState<'cofounder' | 'team'>('cofounder');
  const [connected, setConnected] = useState<number[]>([]);
  const [search, setSearch] = useState('');

  const handleConnect = (id: number, name: string) => {
    setConnected(prev => [...prev, id]);
    toast.success(`Connection request sent to ${name}!`);
  };

  const OPEN_ROLES = [
    { role: 'Senior Frontend Engineer', skills: ['React', 'TypeScript', 'Tailwind'], salary: '₹18-25 LPA', type: 'Full-time', equity: '0.5-1%' },
    { role: 'Growth Marketing Manager', skills: ['SEO', 'Paid Ads', 'Analytics'], salary: '₹15-20 LPA', type: 'Full-time', equity: '0.2-0.5%' },
    { role: 'Data Scientist', skills: ['Python', 'ML', 'SQL'], salary: '₹20-30 LPA', type: 'Full-time', equity: '0.5-1%' },
    { role: 'B2B Sales Lead', skills: ['Enterprise Sales', 'CRM', 'Demo'], salary: '₹12-18 LPA + Commission', type: 'Full-time', equity: '0.1-0.3%' },
  ];

  return (
    <DashboardLayout title="Team Building">
      <div className="space-y-6">
        <div className="flex gap-2">
          <button onClick={() => setView('cofounder')} className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${view === 'cofounder' ? 'bg-primary text-primary-foreground' : 'border border-border text-muted-foreground'}`}>Co-Founder Matching</button>
          <button onClick={() => setView('team')} className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${view === 'team' ? 'bg-primary text-primary-foreground' : 'border border-border text-muted-foreground'}`}>Open Roles</button>
        </div>

        {view === 'cofounder' ? (
          <>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search co-founders by skills, role..." className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:border-primary" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {CO_FOUNDERS.filter(c => !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.role.toLowerCase().includes(search.toLowerCase())).map((cf, i) => (
                <motion.div key={cf.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                  className="p-6 rounded-2xl border border-border bg-card hover:border-primary/30 transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <img src={cf.avatar} alt={cf.name} className="w-12 h-12 rounded-xl bg-muted" />
                      <div>
                        <h3 className="font-bold text-foreground">{cf.name}</h3>
                        <p className="text-xs text-muted-foreground">{cf.role}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-black text-primary">{cf.match}%</div>
                      <p className="text-xs text-muted-foreground">match</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{cf.bio}</p>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {cf.skills.map(s => <span key={s} className="px-2 py-0.5 rounded-lg bg-muted text-muted-foreground text-xs">{s}</span>)}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{cf.location}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5" />Equity: {cf.equity}</span>
                    <span>·</span>
                    <span>{cf.availability}</span>
                  </div>
                  <div className="flex gap-2">
                    {connected.includes(cf.id) ? (
                      <span className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-500/10 text-green-500 text-sm font-semibold">
                        <Check className="w-4 h-4" /> Request Sent
                      </span>
                    ) : (
                      <button onClick={() => handleConnect(cf.id, cf.name)} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all">
                        <UserPlus className="w-4 h-4" /> Connect
                      </button>
                    )}
                    <button onClick={() => toast.success('Opening LinkedIn...')} className="p-2 rounded-xl border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-all">
                      <Linkedin className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-end">
              <button onClick={() => toast.success('Opening role creation form...')} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all">
                <UserPlus className="w-4 h-4" /> Post New Role
              </button>
            </div>
            {OPEN_ROLES.map((role, i) => (
              <motion.div key={role.role} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                className="flex items-start justify-between gap-4 p-5 rounded-2xl border border-border bg-card hover:border-primary/30 transition-all">
                <div className="flex-1">
                  <h3 className="font-bold text-foreground mb-1">{role.role}</h3>
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {role.skills.map(s => <span key={s} className="px-2 py-0.5 rounded-lg bg-muted text-muted-foreground text-xs">{s}</span>)}
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="text-green-500 font-semibold">{role.salary}</span>
                    <span>{role.type}</span>
                    <span>Equity: {role.equity}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => toast.success('Posting role to job board...')} className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all">
                    Post Role
                  </button>
                  <button onClick={() => toast.info('Edit mode coming soon')} className="px-4 py-2 rounded-xl border border-border text-muted-foreground text-sm hover:bg-muted transition-all">
                    Edit
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default FounderTeamBuilding;
