import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, MapPin, DollarSign, Briefcase, TrendingUp, Star, Bookmark, Network } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { INVESTORS } from '@/lib/mockData';
import { toast } from 'sonner';

const STAGE_FILTERS = ['All', 'Pre-Seed', 'Seed', 'Series A', 'Series B'];
const TYPE_FILTERS = ['All', 'VC Fund', 'Micro VC', 'Angel Fund', 'Angel Network', 'Growth Fund'];

const InvestorsPage = () => {
  const [search, setSearch] = useState('');
  const [stage, setStage] = useState('All');
  const [type, setType] = useState('All');
  const [saved, setSaved] = useState<string[]>([]);

  const toggleSave = (id: string) => {
    setSaved(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
    toast.success(saved.includes(id) ? 'Removed from saved' : 'Investor saved!');
  };

  const filtered = INVESTORS.filter(inv => {
    const matchSearch = inv.name.toLowerCase().includes(search.toLowerCase()) || inv.firm.toLowerCase().includes(search.toLowerCase());
    const matchStage = stage === 'All' || inv.stage.includes(stage);
    const matchType = type === 'All' || inv.type === type;
    return matchSearch && matchStage && matchType;
  });

  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      <section className="pt-28 pb-16 bg-gradient-hero relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-green-500/20 text-green-300 text-sm font-semibold mb-4"><Network className="w-3.5 h-3.5" /> Investor Network</span>
            <h1 className="text-5xl font-bold text-white mb-4">Connect with 500+ investors</h1>
            <p className="text-white/60 text-xl max-w-2xl mx-auto">Angels, micro VCs, and growth funds looking for the next big Indian startup.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-8 border-b border-border bg-card/30 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search investors or firms..." className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm placeholder-muted-foreground focus:outline-none focus:border-primary" />
            </div>
          </div>
          <div className="flex gap-2 flex-wrap mt-3">
            <div className="flex gap-1">
              {STAGE_FILTERS.map(s => <button key={s} onClick={() => setStage(s)} className={`px-3 py-1.5 rounded-full text-xs transition-all ${stage === s ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}>{s}</button>)}
            </div>
            <div className="flex gap-1 ml-4">
              {TYPE_FILTERS.slice(0, 3).map(t => <button key={t} onClick={() => setType(t)} className={`px-3 py-1.5 rounded-full text-xs transition-all ${type === t ? 'bg-green-500 text-white' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}>{t}</button>)}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-muted-foreground text-sm mb-6">{filtered.length} investors found</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((inv, i) => (
              <motion.div key={inv.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="p-6 rounded-2xl border border-border bg-card hover:border-green-500/30 hover:shadow-xl transition-all group">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3">
                    <img src={inv.avatar} alt={inv.name} className="w-14 h-14 rounded-2xl bg-muted" />
                    <div>
                      <h3 className="font-bold text-foreground">{inv.name}</h3>
                      <p className="text-sm text-primary font-medium">{inv.firm}</p>
                      <span className="inline-block px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-xs mt-1">{inv.type}</span>
                    </div>
                  </div>
                  <button onClick={() => toggleSave(inv.id)} className={`p-1.5 rounded-lg transition-all ${saved.includes(inv.id) ? 'text-yellow-500 bg-yellow-500/10' : 'text-muted-foreground hover:text-yellow-500'}`}>
                    <Bookmark className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{inv.bio}</p>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="p-2.5 rounded-xl bg-muted/50 text-center">
                    <p className="text-sm font-bold text-foreground">{inv.portfolio}</p>
                    <p className="text-xs text-muted-foreground">Portfolio</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-muted/50 text-center">
                    <p className="text-sm font-bold text-foreground">₹{(inv.minTicket/100000).toFixed(0)}L–{(inv.maxTicket/10000000).toFixed(0)}Cr</p>
                    <p className="text-xs text-muted-foreground">Ticket Size</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {inv.stage.map(s => <span key={s} className="px-2 py-0.5 rounded-full bg-green-500/10 text-green-500 text-xs font-medium">{s}</span>)}
                  {inv.sectors.slice(0, 2).map(s => <span key={s} className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-xs">{s}</span>)}
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <p className="text-xs text-muted-foreground flex items-center gap-1"><MapPin className="w-3 h-3" /> {inv.location}</p>
                  <button onClick={() => toast.success(`Connection request sent to ${inv.name}!`)} className="px-4 py-2 rounded-xl bg-green-600 text-white text-xs font-semibold hover:bg-green-500 transition-all">
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

export default InvestorsPage;
