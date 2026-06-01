import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Bookmark, ArrowRight, MapPin, TrendingUp, Building2, X } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { STARTUPS } from '@/lib/mockData';
import { toast } from 'sonner';

const STAGE_FILTERS = ['All', 'Pre-Seed', 'Seed', 'Series A', 'Series B'];
const INDUSTRY_FILTERS = ['All', 'EdTech', 'FinTech', 'HealthTech', 'AgriTech', 'HRTech', 'CleanTech'];

const InvestorStartupDiscovery = () => {
  const [search, setSearch] = useState('');
  const [stage, setStage] = useState('All');
  const [industry, setIndustry] = useState('All');
  const [saved, setSaved] = useState<string[]>([]);
  const [minGrowth, setMinGrowth] = useState(0);

  const filtered = STARTUPS.filter(s => {
    const matchSearch = !search || s.name.toLowerCase().includes(search.toLowerCase());
    const matchStage = stage === 'All' || s.stage === stage;
    const matchIndustry = industry === 'All' || s.industry === industry;
    const matchGrowth = s.metrics.growth >= minGrowth;
    return matchSearch && matchStage && matchIndustry && matchGrowth;
  });

  return (
    <DashboardLayout title="Startup Discovery">
      <div className="space-y-6">
        {/* Filters */}
        <div className="rounded-2xl border border-border bg-card p-5">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2"><Filter className="w-4 h-4" />Discovery Filters</h3>
          <div className="flex flex-col md:flex-row gap-3 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, industry, location..." className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:border-primary" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Min Growth %</label>
              <input type="number" value={minGrowth} onChange={e => setMinGrowth(Number(e.target.value))} placeholder="0" className="px-3 py-2.5 rounded-xl border border-border bg-background text-sm w-28 focus:outline-none focus:border-primary" />
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mb-2">
            <span className="text-xs text-muted-foreground mr-1 mt-1">Stage:</span>
            {STAGE_FILTERS.map(f => <button key={f} onClick={() => setStage(f)} className={`px-3 py-1.5 rounded-full text-xs transition-all ${stage === f ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}>{f}</button>)}
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="text-xs text-muted-foreground mr-1 mt-1">Sector:</span>
            {INDUSTRY_FILTERS.map(f => <button key={f} onClick={() => setIndustry(f)} className={`px-3 py-1.5 rounded-full text-xs transition-all ${industry === f ? 'bg-green-500 text-white' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}>{f}</button>)}
          </div>
        </div>

        <p className="text-sm text-muted-foreground">{filtered.length} startups matching your criteria</p>

        {/* Startup Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map((startup, i) => (
            <motion.div key={startup.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="p-5 rounded-2xl border border-border bg-card hover:border-green-500/30 hover:shadow-xl transition-all">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-bold text-foreground">{startup.name}</h3>
                  <p className="text-xs text-muted-foreground">{startup.industry} · {startup.location}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs">{startup.stage}</span>
                  <button onClick={() => setSaved(prev => prev.includes(startup.id) ? prev.filter(x => x !== startup.id) : [...prev, startup.id])} className={`p-1.5 rounded-lg transition-all ${saved.includes(startup.id) ? 'text-yellow-500' : 'text-muted-foreground hover:text-yellow-500'}`}>
                    <Bookmark className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{startup.tagline}</p>
              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="p-2 rounded-lg bg-muted/50 text-center">
                  <p className="text-xs font-bold text-green-500">+{startup.metrics.growth}%</p>
                  <p className="text-xs text-muted-foreground">Growth</p>
                </div>
                <div className="p-2 rounded-lg bg-muted/50 text-center">
                  <p className="text-xs font-bold text-foreground">₹{(startup.metrics.mrr / 100000).toFixed(1)}L</p>
                  <p className="text-xs text-muted-foreground">MRR</p>
                </div>
                <div className="p-2 rounded-lg bg-muted/50 text-center">
                  <p className="text-xs font-bold text-foreground">{startup.teamSize}</p>
                  <p className="text-xs text-muted-foreground">Team</p>
                </div>
              </div>
              <div className="mb-3">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">Funding Progress</span>
                  <span className="text-foreground font-medium">{Math.round((startup.fundingRaised / startup.fundingNeeded) * 100)}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                  <div className="h-full rounded-full bg-green-500" style={{ width: `${(startup.fundingRaised / startup.fundingNeeded) * 100}%` }} />
                </div>
              </div>
              <button onClick={() => toast.success(`Sending intro request to ${startup.name}!`)} className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-green-500 text-white text-xs font-semibold hover:bg-green-400 transition-all">
                Request Intro <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default InvestorStartupDiscovery;
