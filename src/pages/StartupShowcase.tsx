import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, Filter, MapPin, TrendingUp, Users, DollarSign, Rocket } from 'lucide-react';
import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { STARTUPS } from '@/lib/mockData';
import { toast } from 'sonner';

const STAGE_FILTERS = ['All', 'Pre-Seed', 'Seed', 'Series A', 'Series B'];
const INDUSTRY_FILTERS = ['All', 'EdTech', 'FinTech', 'HealthTech', 'AgriTech', 'HRTech', 'CleanTech'];

const StartupShowcasePage = () => {
  const [search, setSearch] = useState('');
  const [stage, setStage] = useState('All');
  const [industry, setIndustry] = useState('All');

  const filtered = STARTUPS.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.tagline.toLowerCase().includes(search.toLowerCase());
    const matchStage = stage === 'All' || s.stage === stage;
    const matchIndustry = industry === 'All' || s.industry === industry;
    return matchSearch && matchStage && matchIndustry;
  });

  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      <section className="pt-28 pb-12 bg-gradient-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-orange-500/20 text-orange-300 text-sm font-semibold mb-4"><Rocket className="w-3.5 h-3.5" /> Startup Showcase</span>
            <h1 className="text-5xl font-bold text-white mb-4">India's most promising startups</h1>
            <p className="text-white/60 text-xl max-w-2xl mx-auto">Discover, connect, and invest in the next generation of Indian startups building for the world.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-8 border-b border-border bg-card/30 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search startups..." className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm placeholder-muted-foreground focus:outline-none focus:border-primary" />
            </div>
          </div>
          <div className="flex gap-2 flex-wrap mt-3">
            {STAGE_FILTERS.map(s => <button key={s} onClick={() => setStage(s)} className={`px-3 py-1.5 rounded-full text-xs transition-all ${stage === s ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}>{s}</button>)}
            <div className="w-px bg-border mx-1" />
            {INDUSTRY_FILTERS.map(i => <button key={i} onClick={() => setIndustry(i)} className={`px-3 py-1.5 rounded-full text-xs transition-all ${industry === i ? 'bg-orange-500 text-white' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}>{i}</button>)}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-muted-foreground text-sm mb-6">{filtered.length} startups found</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((startup, i) => (
              <motion.div key={startup.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="p-6 rounded-2xl border border-border bg-card hover:border-orange-500/30 hover:shadow-xl transition-all group">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-foreground text-lg">{startup.name}</h3>
                    <p className="text-sm text-muted-foreground">{startup.industry}</p>
                  </div>
                  <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">{startup.stage}</span>
                </div>
                <p className="text-sm text-foreground font-medium mb-1">{startup.tagline}</p>
                <p className="text-sm text-muted-foreground mb-5 line-clamp-2">{startup.description}</p>
                <div className="grid grid-cols-3 gap-2 mb-5">
                  <div className="p-2 rounded-lg bg-muted/50 text-center">
                    <p className="text-xs font-bold text-green-500">+{startup.metrics.growth}%</p>
                    <p className="text-xs text-muted-foreground">Growth</p>
                  </div>
                  <div className="p-2 rounded-lg bg-muted/50 text-center">
                    <p className="text-xs font-bold text-foreground">₹{(startup.metrics.mrr/100000).toFixed(1)}L</p>
                    <p className="text-xs text-muted-foreground">MRR</p>
                  </div>
                  <div className="p-2 rounded-lg bg-muted/50 text-center">
                    <p className="text-xs font-bold text-foreground">{startup.teamSize}</p>
                    <p className="text-xs text-muted-foreground">Team</p>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">Funding Progress</span>
                    <span className="font-medium text-foreground">{Math.round((startup.fundingRaised / startup.fundingNeeded) * 100)}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div className="h-full rounded-full bg-green-500" style={{ width: `${Math.round((startup.fundingRaised / startup.fundingNeeded) * 100)}%` }} />
                  </div>
                  <div className="flex justify-between text-xs mt-1 text-muted-foreground">
                    <span>₹{(startup.fundingRaised/10000000).toFixed(1)}Cr raised</span>
                    <span>Goal: ₹{(startup.fundingNeeded/10000000).toFixed(1)}Cr</span>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <p className="text-xs text-muted-foreground flex items-center gap-1"><MapPin className="w-3 h-3" /> {startup.location}</p>
                  <button onClick={() => toast.success(`Connected with ${startup.name}!`)} className="px-4 py-2 rounded-xl bg-orange-500 text-white text-xs font-semibold hover:bg-orange-400 transition-all">
                    Connect
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default StartupShowcasePage;
