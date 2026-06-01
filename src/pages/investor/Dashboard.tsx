import { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, DollarSign, Star, Globe, Search, Filter, Bookmark, ArrowRight, Building2, Users } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import DashboardLayout from '@/components/layout/DashboardLayout';
import StatCard from '@/components/features/StatCard';
import { STARTUPS } from '@/lib/mockData';
import { toast } from 'sonner';

const PORTFOLIO = [
  { name: 'EduVerse', invested: 5000000, currentValue: 8500000, stage: 'Series A', growth: 70, sector: 'EdTech' },
  { name: 'FinFlow', invested: 8000000, currentValue: 18000000, stage: 'Series B', growth: 125, sector: 'FinTech' },
  { name: 'TalentBridge', invested: 3000000, currentValue: 12000000, stage: 'Series A', growth: 300, sector: 'HRTech' },
];

const SECTOR_DATA = [
  { name: 'SaaS', value: 35 },
  { name: 'FinTech', value: 25 },
  { name: 'EdTech', value: 20 },
  { name: 'HealthTech', value: 12 },
  { name: 'Other', value: 8 },
];

const COLORS = ['#3B82F6', '#F97316', '#8B5CF6', '#10B981', '#EF4444'];

const InvestorDashboard = () => {
  const [savedStartups, setSavedStartups] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sectorFilter, setSectorFilter] = useState('All');

  const toggleSave = (id: string) => {
    setSavedStartups(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
    toast.success(savedStartups.includes(id) ? 'Removed from saved' : 'Startup saved!');
  };

  const filteredStartups = STARTUPS.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.industry.toLowerCase().includes(searchQuery.toLowerCase());
    const matchSector = sectorFilter === 'All' || s.industry === sectorFilter;
    return matchSearch && matchSector;
  });

  const totalInvested = PORTFOLIO.reduce((a, p) => a + p.invested, 0);
  const totalValue = PORTFOLIO.reduce((a, p) => a + p.currentValue, 0);
  const totalReturn = ((totalValue - totalInvested) / totalInvested * 100).toFixed(0);

  return (
    <DashboardLayout title="Investor Dashboard">
      {/* Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-green-700 to-emerald-800 p-6 mb-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {[...Array(8)].map((_, i) => <div key={i} className="absolute rounded-full bg-white" style={{ width: 80 + i * 20, height: 80 + i * 20, top: `${i * 12}%`, right: `${i * 8}%` }} />)}
        </div>
        <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="text-green-200 text-sm mb-1 flex items-center gap-1.5"><TrendingUp className="w-3.5 h-3.5" /> Portfolio Overview</p>
            <h1 className="text-2xl font-bold text-white">₹{(totalValue / 10000000).toFixed(1)}Cr Portfolio Value</h1>
            <p className="text-green-200 text-sm mt-1">Total Return: <span className="text-white font-bold">+{totalReturn}%</span> · {PORTFOLIO.length} active investments</p>
          </div>
          <button onClick={() => toast.success('Navigating to startup discovery...')} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-green-700 text-sm font-bold hover:bg-green-50 transition-all">
            <Globe className="w-4 h-4" /> Discover Startups
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Portfolio Value" value={`₹${(totalValue/10000000).toFixed(1)}Cr`} change={`+${totalReturn}%`} changeType="positive" icon={TrendingUp} iconColor="text-green-500" gradient="from-green-500/10 to-green-500/5" delay={0} />
        <StatCard title="Total Invested" value={`₹${(totalInvested/10000000).toFixed(1)}Cr`} change="3 investments" changeType="neutral" icon={DollarSign} iconColor="text-blue-500" gradient="from-blue-500/10 to-blue-500/5" delay={0.1} />
        <StatCard title="Startups Reviewed" value="47" change="+8 this week" changeType="positive" icon={Star} iconColor="text-yellow-500" gradient="from-yellow-500/10 to-yellow-500/5" delay={0.2} />
        <StatCard title="Deal Flow" value="12" change="Active pipeline" changeType="neutral" icon={Building2} iconColor="text-purple-500" gradient="from-purple-500/10 to-purple-500/5" delay={0.3} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Portfolio */}
        <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-5">
          <h2 className="font-semibold text-foreground mb-4">Portfolio Investments</h2>
          <div className="space-y-4">
            {PORTFOLIO.map((p, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="flex items-center gap-4 p-4 rounded-xl border border-border hover:border-green-500/30 transition-all">
                <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-green-500" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="font-semibold text-foreground text-sm">{p.name}</p>
                    <span className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-xs">{p.stage}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{p.sector}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-green-500">+{p.growth}%</p>
                  <p className="text-xs text-muted-foreground">₹{(p.currentValue/100000).toFixed(0)}L value</p>
                </div>
                <div className="h-10 w-24">
                  <div className="h-full rounded-lg bg-muted overflow-hidden flex items-end">
                    <div className="w-full bg-green-500/60 rounded-lg" style={{ height: `${Math.min(100, p.growth / 4)}%` }} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Sector Allocation */}
        <div className="rounded-2xl border border-border bg-card p-5">
          <h2 className="font-semibold text-foreground mb-4">Sector Allocation</h2>
          <div className="flex justify-center mb-4">
            <PieChart width={180} height={180}>
              <Pie data={SECTOR_DATA} cx={90} cy={90} innerRadius={50} outerRadius={80} dataKey="value">
                {SECTOR_DATA.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 8, fontSize: 12 }} />
            </PieChart>
          </div>
          <div className="space-y-2">
            {SECTOR_DATA.map((s, i) => (
              <div key={s.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ background: COLORS[i] }} />
                  <span className="text-muted-foreground text-xs">{s.name}</span>
                </div>
                <span className="font-semibold text-foreground text-xs">{s.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Startup Discovery */}
      <div className="rounded-2xl border border-border bg-card p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-foreground">Startup Discovery</h2>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search startups..." className="pl-8 pr-4 py-2 rounded-xl border border-border bg-background text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary w-40" />
            </div>
            <select value={sectorFilter} onChange={e => setSectorFilter(e.target.value)} className="px-3 py-2 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:border-primary">
              {['All', 'EdTech', 'FinTech', 'HealthTech', 'AgriTech', 'HRTech', 'CleanTech'].map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredStartups.slice(0, 6).map((startup, i) => (
            <motion.div key={startup.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="p-4 rounded-xl border border-border hover:border-green-500/30 transition-all group">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-bold text-foreground text-sm">{startup.name}</p>
                  <p className="text-xs text-muted-foreground">{startup.industry} · {startup.location}</p>
                </div>
                <button onClick={() => toggleSave(startup.id)} className={`p-1.5 rounded-lg transition-all ${savedStartups.includes(startup.id) ? 'text-yellow-500 bg-yellow-500/10' : 'text-muted-foreground hover:text-yellow-500'}`}>
                  <Bookmark className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{startup.tagline}</p>
              <div className="grid grid-cols-2 gap-2 mb-3">
                <div className="p-2 rounded-lg bg-muted/50 text-center">
                  <p className="text-xs font-bold text-foreground">₹{(startup.metrics.mrr/100000).toFixed(1)}L</p>
                  <p className="text-xs text-muted-foreground">MRR</p>
                </div>
                <div className="p-2 rounded-lg bg-muted/50 text-center">
                  <p className="text-xs font-bold text-green-500">+{startup.metrics.growth}%</p>
                  <p className="text-xs text-muted-foreground">Growth</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs">{startup.stage}</span>
                <button onClick={() => toast.success(`Request sent to ${startup.name}!`)} className="text-xs text-primary font-medium flex items-center gap-1 hover:gap-2 transition-all">
                  Connect <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default InvestorDashboard;
