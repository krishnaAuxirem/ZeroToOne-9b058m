import { useState } from 'react';
import { motion } from 'framer-motion';
import { Rocket, Search, Eye, CheckCircle, XCircle, TrendingUp, Building2, BarChart3 } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { STARTUPS } from '@/lib/mockData';
import { toast } from 'sonner';

const AdminFounders = () => {
  const [search, setSearch] = useState('');
  const [stageFilter, setStageFilter] = useState('all');
  const [featured, setFeatured] = useState<string[]>(['s1', 's4']);

  const FOUNDERS_DATA = [
    { name: 'Arjun Sharma', company: 'EduVerse', stage: 'Series A', status: 'active', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=arjun', email: 'founder@zerotoone.com', mrr: '₹8.5L', growth: '340%', joinedAt: '2024-01-15', startup: STARTUPS[0] },
    { name: 'Priya Kumar', company: 'HealthBridge', stage: 'Seed', status: 'active', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=priyak', email: 'priya.k@gmail.com', mrr: '₹1.8L', growth: '210%', joinedAt: '2024-03-10', startup: STARTUPS[1] },
    { name: 'Ravi Patel', company: 'AgriChain', stage: 'Pre-Seed', status: 'pending', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ravip', email: 'ravi@agrichain.in', mrr: '₹45K', growth: '85%', joinedAt: '2024-04-20', startup: STARTUPS[2] },
    { name: 'Ananya Rao', company: 'ClimateWise', stage: 'Seed', status: 'active', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ananya', email: 'ananya@climatewise.in', mrr: '₹3.8L', growth: '290%', joinedAt: '2024-05-05', startup: STARTUPS[4] },
  ];

  const filtered = FOUNDERS_DATA.filter(f => (!search || f.name.toLowerCase().includes(search.toLowerCase()) || f.company.toLowerCase().includes(search.toLowerCase())) && (stageFilter === 'all' || f.stage === stageFilter));

  return (
    <DashboardLayout title="Founder Management">
      <div className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[{ label: 'Total Founders', value: '12,400', color: 'text-blue-500' }, { label: 'Active This Month', value: '8,200', color: 'text-green-500' }, { label: 'New This Week', value: '340', color: 'text-purple-500' }, { label: 'Pending Review', value: '12', color: 'text-orange-500' }].map(s => (
            <div key={s.label} className="rounded-2xl border border-border bg-card p-4 text-center">
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" /><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search founders..." className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:border-primary" /></div>
          <div className="flex gap-2">
            {['all', 'Pre-Seed', 'Seed', 'Series A'].map(s => <button key={s} onClick={() => setStageFilter(s)} className={`px-3 py-2 rounded-xl text-xs transition-all ${stageFilter === s ? 'bg-primary text-primary-foreground' : 'border border-border text-muted-foreground'}`}>{s}</button>)}
          </div>
        </div>

        <div className="space-y-3">
          {filtered.map((f, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="flex items-center gap-4 p-5 rounded-2xl border border-border bg-card hover:border-primary/30 transition-all">
              <img src={f.avatar} alt={f.name} className="w-12 h-12 rounded-xl bg-muted flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-foreground">{f.name}</span>
                  <span className="text-xs text-muted-foreground">· {f.company}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs ${f.status === 'active' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'}`}>{f.status}</span>
                </div>
                <p className="text-xs text-muted-foreground">{f.email} · Joined {f.joinedAt}</p>
              </div>
              <div className="flex items-center gap-6 text-sm">
                <div className="text-center"><p className="font-bold text-green-500">{f.mrr}</p><p className="text-xs text-muted-foreground">MRR</p></div>
                <div className="text-center"><p className="font-bold text-blue-500">+{f.growth}</p><p className="text-xs text-muted-foreground">Growth</p></div>
                <span className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-xs">{f.stage}</span>
              </div>
              <div className="flex gap-2">
                <button onClick={() => toast.success('Opening founder profile...')} className="p-2 rounded-xl border border-border text-muted-foreground hover:text-foreground hover:bg-muted"><Eye className="w-4 h-4" /></button>
                <button onClick={() => setFeatured(p => p.includes(f.company) ? p.filter(x => x !== f.company) : [...p, f.company])} className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${featured.includes(f.company) ? 'bg-yellow-500/10 text-yellow-500' : 'border border-border text-muted-foreground hover:bg-muted'}`}>
                  {featured.includes(f.company) ? '★ Featured' : '☆ Feature'}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminFounders;
