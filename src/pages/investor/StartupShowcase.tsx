import { useState } from 'react';
import { motion } from 'framer-motion';
import { Rocket, Search, Bookmark, TrendingUp, MapPin, Users, ArrowRight } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { STARTUPS } from '@/lib/mockData';
import { toast } from 'sonner';

const InvestorStartupShowcase = () => {
  const [search, setSearch] = useState('');
  const [saved, setSaved] = useState<string[]>([]);
  const [industryFilter, setIndustryFilter] = useState('All');

  const INDUSTRIES = ['All', 'EdTech', 'FinTech', 'HealthTech', 'AgriTech', 'HRTech', 'CleanTech'];
  const filtered = STARTUPS.filter(s => (!search || s.name.toLowerCase().includes(search.toLowerCase())) && (industryFilter === 'All' || s.industry === industryFilter));

  return (
    <DashboardLayout title="Startup Showcase">
      <div className="space-y-6">
        {/* Hero */}
        <div className="rounded-2xl bg-gradient-to-r from-blue-700 to-purple-800 p-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">{[...Array(5)].map((_, i) => <div key={i} className="absolute rounded-full bg-white" style={{ width: 60 + i * 30, height: 60 + i * 30, top: `${i * 18}%`, right: `${i * 9}%` }} />)}</div>
          <div className="relative">
            <h1 className="text-xl font-bold text-white mb-1">India's Most Promising Startups</h1>
            <p className="text-blue-200 text-sm">Curated showcase of investment-ready startups across sectors</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" /><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search startups..." className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:border-primary" /></div>
        </div>
        <div className="flex gap-2 flex-wrap">
          {INDUSTRIES.map(f => <button key={f} onClick={() => setIndustryFilter(f)} className={`px-3 py-1.5 rounded-full text-xs transition-all ${industryFilter === f ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}>{f}</button>)}
        </div>

        <p className="text-sm text-muted-foreground">{filtered.length} startups in showcase</p>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map((startup, i) => (
            <motion.div key={startup.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="p-6 rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-xl transition-all">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-bold text-foreground">{startup.name}</h3>
                  <p className="text-xs text-muted-foreground">{startup.industry}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs">{startup.stage}</span>
                  <button onClick={() => setSaved(p => p.includes(startup.id) ? p.filter(x => x !== startup.id) : [...p, startup.id])} className={`p-1.5 rounded-lg ${saved.includes(startup.id) ? 'text-yellow-500' : 'text-muted-foreground hover:text-yellow-500'} transition-all`}>
                    <Bookmark className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <p className="text-sm text-foreground font-medium mb-1">{startup.tagline}</p>
              <p className="text-xs text-muted-foreground mb-4 line-clamp-2">{startup.description}</p>
              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="p-2 rounded-lg bg-muted/50 text-center"><p className="text-xs font-bold text-green-500">+{startup.metrics.growth}%</p><p className="text-xs text-muted-foreground">Growth</p></div>
                <div className="p-2 rounded-lg bg-muted/50 text-center"><p className="text-xs font-bold text-foreground">₹{(startup.metrics.mrr / 100000).toFixed(1)}L</p><p className="text-xs text-muted-foreground">MRR</p></div>
                <div className="p-2 rounded-lg bg-muted/50 text-center"><p className="text-xs font-bold text-foreground">{startup.teamSize}</p><p className="text-xs text-muted-foreground">Team</p></div>
              </div>
              <div className="mb-4">
                <div className="flex justify-between text-xs mb-1"><span className="text-muted-foreground">Funding Progress</span><span className="font-medium">{Math.round((startup.fundingRaised / startup.fundingNeeded) * 100)}%</span></div>
                <div className="h-1.5 rounded-full bg-muted overflow-hidden"><div className="h-full rounded-full bg-green-500" style={{ width: `${(startup.fundingRaised / startup.fundingNeeded) * 100}%` }} /></div>
                <div className="flex justify-between text-xs mt-1 text-muted-foreground"><span>₹{(startup.fundingRaised / 10000000).toFixed(1)}Cr raised</span><span>Goal: ₹{(startup.fundingNeeded / 10000000).toFixed(1)}Cr</span></div>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-border">
                <span className="text-xs text-muted-foreground flex items-center gap-1"><MapPin className="w-3 h-3" />{startup.location}</span>
                <button onClick={() => toast.success(`Connecting with ${startup.name}...`)} className="flex items-center gap-1 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-all">
                  View Pitch <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default InvestorStartupShowcase;
