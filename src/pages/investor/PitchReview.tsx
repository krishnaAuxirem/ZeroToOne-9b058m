import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Play, Star, CheckCircle, XCircle, MessageSquare, Download, Clock, Building2 } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { toast } from 'sonner';

const PITCHES = [
  { id: 1, startup: 'EduVerse', founder: 'Arjun Sharma', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=arjun', stage: 'Series A', ask: '₹50Cr', industry: 'EdTech', submittedDate: 'Jun 1, 2025', status: 'pending', deckPages: 14, mrr: '₹8.5L', growth: '340%', score: null },
  { id: 2, startup: 'HealthBridge', founder: 'Priya Kumar', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=priyak', stage: 'Seed', ask: '₹20Cr', industry: 'HealthTech', submittedDate: 'May 28, 2025', status: 'reviewed', deckPages: 12, mrr: '₹1.8L', growth: '210%', score: 82 },
  { id: 3, startup: 'AgriChain', founder: 'Ravi Patel', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ravip', stage: 'Pre-Seed', ask: '₹8Cr', industry: 'AgriTech', submittedDate: 'May 25, 2025', status: 'interested', deckPages: 10, mrr: '₹45K', growth: '85%', score: 74 },
  { id: 4, startup: 'ClimateWise', founder: 'Ananya Rao', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ananya', stage: 'Seed', ask: '₹25Cr', industry: 'CleanTech', submittedDate: 'May 20, 2025', status: 'passed', deckPages: 16, mrr: '₹3.8L', growth: '290%', score: 68 },
];

const STATUS_CONFIG = {
  pending: { label: 'Under Review', color: 'bg-yellow-500/10 text-yellow-500' },
  reviewed: { label: 'Reviewed', color: 'bg-blue-500/10 text-blue-500' },
  interested: { label: 'Interested', color: 'bg-green-500/10 text-green-500' },
  passed: { label: 'Passed', color: 'bg-red-500/10 text-red-500' },
};

const InvestorPitchReview = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [scores, setScores] = useState<Record<number, number>>({});

  const filtered = activeFilter === 'all' ? PITCHES : PITCHES.filter(p => p.status === activeFilter);

  return (
    <DashboardLayout title="Pitch Reviews">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Pitches', value: PITCHES.length.toString(), color: 'text-blue-500' },
            { label: 'Under Review', value: PITCHES.filter(p => p.status === 'pending').length.toString(), color: 'text-yellow-500' },
            { label: 'Interested', value: PITCHES.filter(p => p.status === 'interested').length.toString(), color: 'text-green-500' },
            { label: 'Avg Score', value: `${Math.round(PITCHES.filter(p => p.score).reduce((a, p) => a + (p.score || 0), 0) / PITCHES.filter(p => p.score).length)}/100`, color: 'text-purple-500' },
          ].map(s => (
            <div key={s.label} className="rounded-2xl border border-border bg-card p-4 text-center">
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 flex-wrap">
          {['all', 'pending', 'reviewed', 'interested', 'passed'].map(f => (
            <button key={f} onClick={() => setActiveFilter(f)} className={`px-4 py-2 rounded-xl text-sm capitalize transition-all ${activeFilter === f ? 'bg-primary text-primary-foreground' : 'border border-border text-muted-foreground'}`}>
              {f === 'all' ? `All (${PITCHES.length})` : `${f} (${PITCHES.filter(p => p.status === f).length})`}
            </button>
          ))}
        </div>

        {/* Pitch Cards */}
        <div className="space-y-4">
          {filtered.map((pitch, i) => (
            <motion.div key={pitch.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
              className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-start gap-4">
                <img src={pitch.avatar} alt={pitch.founder} className="w-12 h-12 rounded-xl bg-muted flex-shrink-0" />
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-foreground">{pitch.startup}</h3>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_CONFIG[pitch.status as keyof typeof STATUS_CONFIG].color}`}>
                          {STATUS_CONFIG[pitch.status as keyof typeof STATUS_CONFIG].label}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">by {pitch.founder} · {pitch.industry} · {pitch.stage}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-500 text-lg">{pitch.ask}</p>
                      <p className="text-xs text-muted-foreground">Seeking</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-3 mb-4">
                    {[{ label: 'MRR', value: pitch.mrr }, { label: 'Growth', value: `+${pitch.growth}` }, { label: 'Deck', value: `${pitch.deckPages} slides` }, { label: 'Submitted', value: pitch.submittedDate }].map(m => (
                      <div key={m.label} className="p-2 rounded-xl bg-muted/50 text-center">
                        <p className="text-xs font-semibold text-foreground">{m.value}</p>
                        <p className="text-xs text-muted-foreground">{m.label}</p>
                      </div>
                    ))}
                  </div>
                  {pitch.score && (
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs text-muted-foreground">AI Score:</span>
                      <div className="flex-1 max-w-32 h-1.5 rounded-full bg-muted overflow-hidden">
                        <div className="h-full rounded-full bg-green-500" style={{ width: `${pitch.score}%` }} />
                      </div>
                      <span className="text-xs font-bold text-green-500">{pitch.score}/100</span>
                    </div>
                  )}
                  <div className="flex gap-2 flex-wrap">
                    <button onClick={() => toast.success('Opening pitch deck...')} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary/10 text-primary text-xs font-semibold hover:bg-primary hover:text-white transition-all">
                      <Play className="w-3.5 h-3.5" /> View Deck
                    </button>
                    <button onClick={() => toast.success('Scheduling meeting...')} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-green-500/10 text-green-500 text-xs font-semibold hover:bg-green-500 hover:text-white transition-all">
                      <CheckCircle className="w-3.5 h-3.5" /> Interested
                    </button>
                    <button onClick={() => toast.info('Pass noted')} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-red-500/30 text-red-500 text-xs hover:bg-red-500/10 transition-all">
                      <XCircle className="w-3.5 h-3.5" /> Pass
                    </button>
                    <button onClick={() => toast.success('Opening messages...')} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border text-muted-foreground text-xs hover:bg-muted transition-all">
                      <MessageSquare className="w-3.5 h-3.5" /> Message
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default InvestorPitchReview;
