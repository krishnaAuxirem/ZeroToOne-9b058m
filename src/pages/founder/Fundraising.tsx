import { useState } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, TrendingUp, Users, Building2, Search, Bookmark, Filter, ArrowRight, CheckCircle, Star, Mail, Globe } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { INVESTORS } from '@/lib/mockData';
import { toast } from 'sonner';

const PIPELINE = [
  { id: 1, investor: 'Deepak Goenka', firm: 'Nexus Ventures', stage: 'Intro Sent', date: 'May 30', notes: 'Warm intro from Arjun. Sent 2-pager.' },
  { id: 2, investor: 'Ananya Singh', firm: 'Blume Ventures', stage: 'First Meeting', date: 'Jun 3', notes: 'Call scheduled for 45 mins. Deck shared.' },
  { id: 3, investor: 'Ravi K.', firm: 'IndiaQuotient', stage: 'Due Diligence', date: 'Jun 10', notes: 'Sent data room. Team meeting next week.' },
];

const STAGES = ['Idea', 'Intro Sent', 'First Meeting', 'Due Diligence', 'Term Sheet', 'Closed'];

const FounderFundraising = () => {
  const [view, setView] = useState<'discover' | 'pipeline'>('pipeline');
  const [saved, setSaved] = useState<string[]>([]);
  const [search, setSearch] = useState('');

  const filtered = INVESTORS.filter(inv => !search || inv.name.toLowerCase().includes(search.toLowerCase()) || inv.firm.toLowerCase().includes(search.toLowerCase()));

  return (
    <DashboardLayout title="Fundraising CRM">
      <div className="space-y-6">
        {/* Fundraising Overview */}
        <div className="rounded-2xl bg-gradient-to-r from-green-700 to-emerald-800 p-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">{[...Array(6)].map((_, i) => <div key={i} className="absolute rounded-full bg-white" style={{ width: 60 + i * 20, height: 60 + i * 20, top: `${i * 15}%`, right: `${i * 8}%` }} />)}</div>
          <div className="relative">
            <p className="text-green-200 text-sm mb-1">Series A Round</p>
            <h1 className="text-2xl font-bold text-white">₹50 Crore Target</h1>
            <div className="flex items-center gap-6 mt-2 text-sm">
              <span className="text-green-200">Committed: <span className="text-white font-bold">₹0</span></span>
              <span className="text-green-200">Pipeline: <span className="text-white font-bold">3 investors</span></span>
              <span className="text-green-200">Stage: <span className="text-white font-bold">Active Fundraising</span></span>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          {[{ id: 'pipeline', label: 'My Pipeline' }, { id: 'discover', label: 'Discover Investors' }].map(t => (
            <button key={t.id} onClick={() => setView(t.id as any)} className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${view === t.id ? 'bg-primary text-primary-foreground' : 'border border-border text-muted-foreground'}`}>{t.label}</button>
          ))}
        </div>

        {view === 'pipeline' ? (
          <>
            {/* Pipeline Kanban */}
            <div className="overflow-x-auto pb-3">
              <div className="flex gap-4 min-w-[800px]">
                {STAGES.map(stage => {
                  const stageItems = PIPELINE.filter(p => p.stage === stage);
                  return (
                    <div key={stage} className="flex-1 min-w-[160px]">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-semibold text-muted-foreground uppercase">{stage}</span>
                        <span className="text-xs text-muted-foreground">{stageItems.length}</span>
                      </div>
                      <div className="space-y-2 min-h-[100px]">
                        {stageItems.map(item => (
                          <div key={item.id} className="p-3 rounded-xl border border-border bg-card text-xs">
                            <p className="font-semibold text-foreground">{item.investor}</p>
                            <p className="text-muted-foreground">{item.firm}</p>
                            <p className="text-muted-foreground mt-1 text-[10px]">{item.notes}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Pipeline Table */}
            <div className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground">Investor Pipeline</h3>
                <button onClick={() => toast.success('Opening add investor form...')} className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-semibold hover:bg-primary hover:text-white transition-all">+ Add Investor</button>
              </div>
              <div className="space-y-3">
                {PIPELINE.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-4 rounded-xl border border-border hover:border-primary/30 transition-all">
                    <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center flex-shrink-0">
                      <Building2 className="w-5 h-5 text-green-500" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-foreground text-sm">{item.investor}</p>
                      <p className="text-xs text-muted-foreground">{item.firm}</p>
                    </div>
                    <div className="text-center">
                      <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 text-xs font-semibold">{item.stage}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{item.date}</span>
                    <div className="flex gap-2">
                      <button onClick={() => toast.success('Sending follow-up...')} className="p-2 rounded-lg hover:bg-muted text-muted-foreground transition-all"><Mail className="w-3.5 h-3.5" /></button>
                      <button onClick={() => toast.success('Moving to next stage!')} className="px-3 py-1.5 rounded-xl bg-primary/10 text-primary text-xs font-medium hover:bg-primary hover:text-white transition-all">Advance</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search investors..." className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:border-primary" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filtered.map((inv, i) => (
                <motion.div key={inv.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                  className="p-5 rounded-2xl border border-border bg-card hover:border-green-500/30 transition-all">
                  <div className="flex items-start gap-3 mb-3">
                    <img src={inv.avatar} alt={inv.name} className="w-12 h-12 rounded-xl bg-muted" />
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-bold text-foreground">{inv.name}</h3>
                          <p className="text-xs text-muted-foreground">{inv.firm} · {inv.type}</p>
                        </div>
                        <button onClick={() => setSaved(prev => prev.includes(inv.id) ? prev.filter(x => x !== inv.id) : [...prev, inv.id])}
                          className={`p-1.5 rounded-lg ${saved.includes(inv.id) ? 'text-yellow-500' : 'text-muted-foreground hover:text-yellow-500'} transition-all`}>
                          <Bookmark className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {inv.sectors.map(s => <span key={s} className="px-2 py-0.5 rounded-lg bg-muted text-muted-foreground text-xs">{s}</span>)}
                  </div>
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="p-2 rounded-lg bg-muted/50 text-center">
                      <p className="text-xs font-bold text-foreground">{inv.portfolio}</p>
                      <p className="text-xs text-muted-foreground">Portfolio</p>
                    </div>
                    <div className="p-2 rounded-lg bg-muted/50 text-center">
                      <p className="text-xs font-bold text-foreground">₹{(inv.minTicket / 10000000).toFixed(0)}-{(inv.maxTicket / 10000000).toFixed(0)}Cr</p>
                      <p className="text-xs text-muted-foreground">Ticket Size</p>
                    </div>
                    <div className="p-2 rounded-lg bg-muted/50 text-center">
                      <p className="text-xs font-bold text-foreground">{inv.stage[0]}</p>
                      <p className="text-xs text-muted-foreground">Stage</p>
                    </div>
                  </div>
                  <button onClick={() => toast.success(`Pitch request sent to ${inv.name}!`)} className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-green-500 text-white text-sm font-semibold hover:bg-green-400 transition-all">
                    <ArrowRight className="w-4 h-4" /> Request Intro
                  </button>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default FounderFundraising;
