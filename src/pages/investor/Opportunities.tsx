import { motion } from 'framer-motion';
import { TrendingUp, Star, Clock, Bookmark, ArrowRight, Building2 } from 'lucide-react';
import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { STARTUPS } from '@/lib/mockData';
import { toast } from 'sonner';

const InvestorOpportunities = () => {
  const [saved, setSaved] = useState<string[]>([]);

  const HOT = STARTUPS.slice(0, 3);
  const DEALS = STARTUPS.slice(1, 5);

  return (
    <DashboardLayout title="Investment Opportunities">
      <div className="space-y-6">
        {/* Hot Deals Banner */}
        <div className="rounded-2xl bg-gradient-to-r from-orange-600 to-red-700 p-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">{[...Array(5)].map((_, i) => <div key={i} className="absolute rounded-full bg-white" style={{ width: 60 + i * 20, height: 60 + i * 20, top: `${i * 18}%`, right: `${i * 9}%` }} />)}</div>
          <div className="relative">
            <h1 className="text-xl font-bold text-white mb-1">🔥 Featured Opportunities This Week</h1>
            <p className="text-orange-200 text-sm">Curated based on your investment thesis and portfolio</p>
          </div>
        </div>

        {/* Featured */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {HOT.map((s, i) => (
            <motion.div key={s.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
              className="p-5 rounded-2xl border-2 border-orange-500/30 bg-gradient-to-br from-orange-500/5 to-card">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-bold text-foreground">{s.name}</h3>
                  <p className="text-xs text-muted-foreground">{s.industry} · {s.stage}</p>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-500 text-xs font-semibold">Featured</span>
              </div>
              <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{s.tagline}</p>
              <div className="flex items-center gap-3 text-xs mb-4">
                <span className="text-green-500 font-bold">+{s.metrics.growth}% growth</span>
                <span className="text-muted-foreground">₹{(s.metrics.mrr / 100000).toFixed(1)}L MRR</span>
              </div>
              <button onClick={() => toast.success('Requesting intro...')} className="w-full py-2 rounded-xl bg-orange-500 text-white text-xs font-bold hover:bg-orange-400 transition-all">View Opportunity</button>
            </motion.div>
          ))}
        </div>

        {/* All Curated Deals */}
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Curated for Your Thesis</h3>
            <button onClick={() => toast.info('Updating preferences...')} className="text-xs text-primary font-medium">Update preferences</button>
          </div>
          <div className="space-y-4">
            {DEALS.map((deal, i) => (
              <div key={deal.id} className="flex items-center gap-4 p-4 rounded-xl border border-border hover:border-primary/30 transition-all">
                <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-5 h-5 text-green-500" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-foreground text-sm">{deal.name}</span>
                    <span className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-xs">{deal.stage}</span>
                    <span className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-xs">{deal.industry}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{deal.tagline}</p>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-green-500 font-bold">+{deal.metrics.growth}%</span>
                  <span className="text-foreground font-medium">₹{(deal.fundingNeeded / 10000000).toFixed(0)}Cr ask</span>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setSaved(p => p.includes(deal.id) ? p.filter(x => x !== deal.id) : [...p, deal.id])} className={`p-2 rounded-lg transition-all ${saved.includes(deal.id) ? 'text-yellow-500' : 'text-muted-foreground hover:text-yellow-500'}`}><Bookmark className="w-4 h-4" /></button>
                  <button onClick={() => toast.success('Requesting intro...')} className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-all">View <ArrowRight className="w-3 h-3" /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default InvestorOpportunities;
