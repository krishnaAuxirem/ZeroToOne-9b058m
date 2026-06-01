import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Target, TrendingUp, CheckCircle, AlertCircle, Zap, BarChart3, Users, Globe, Star } from 'lucide-react';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { toast } from 'sonner';

const VALIDATION_CRITERIA = [
  { metric: 'Market Size', score: 82, desc: 'Large and growing market opportunity' },
  { metric: 'Problem Severity', score: 90, desc: 'High pain point with limited alternatives' },
  { metric: 'Feasibility', score: 75, desc: 'Technically achievable within 12 months' },
  { metric: 'Competition', score: 68, desc: 'Fragmented market with differentiation possible' },
  { metric: 'Timing', score: 85, desc: 'Strong market tailwinds favor this now' },
  { metric: 'Monetization', score: 78, desc: 'Clear path to revenue at scale' },
];

const RADAR_DATA = VALIDATION_CRITERIA.map(v => ({ metric: v.metric, score: v.score }));

const COMPETITORS = [
  { name: 'Competitor A', mrr: '₹45L', users: '12,000', raised: '₹8Cr', weakness: 'Poor mobile UX' },
  { name: 'Competitor B', mrr: '₹28L', users: '7,500', raised: '₹3Cr', weakness: 'Limited integrations' },
  { name: 'Competitor C', mrr: '₹12L', users: '3,200', raised: 'Bootstrapped', weakness: 'Only B2C focus' },
];

const FounderStartupValidation = () => {
  const [ideaText, setIdeaText] = useState('');
  const [validating, setValidating] = useState(false);
  const [validated, setValidated] = useState(true);

  const overallScore = Math.round(VALIDATION_CRITERIA.reduce((a, v) => a + v.score, 0) / VALIDATION_CRITERIA.length);

  const runValidation = async () => {
    if (!ideaText.trim()) { toast.error('Please describe your startup idea first'); return; }
    setValidating(true);
    await new Promise(r => setTimeout(r, 2000));
    setValidating(false);
    setValidated(true);
    toast.success('Idea validation complete! Score: 80/100');
  };

  return (
    <DashboardLayout title="Startup Validation">
      <div className="space-y-6">
        {/* Input Section */}
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center flex-shrink-0">
              <Lightbulb className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <h2 className="font-bold text-foreground">AI Idea Validation Engine</h2>
              <p className="text-sm text-muted-foreground">Describe your startup idea and get instant analysis across 6 key dimensions</p>
            </div>
          </div>
          <textarea value={ideaText} onChange={e => setIdeaText(e.target.value)} rows={4} placeholder="Describe your startup idea: What problem does it solve? Who is your target customer? How does it make money?..." className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm placeholder-muted-foreground focus:outline-none focus:border-primary resize-none mb-4" />
          <button onClick={runValidation} disabled={validating} className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-orange-600 to-orange-500 text-white font-semibold hover:from-orange-500 hover:to-orange-400 transition-all disabled:opacity-60">
            {validating ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Analyzing...</> : <><Zap className="w-4 h-4" /> Validate My Idea</>}
          </button>
        </div>

        {validated && (
          <>
            {/* Score Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="rounded-2xl border border-border bg-card p-6 text-center">
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                    <circle cx="60" cy="60" r="50" fill="none" stroke="hsl(var(--muted))" strokeWidth="12" />
                    <circle cx="60" cy="60" r="50" fill="none" stroke="#f97316" strokeWidth="12" strokeDasharray={`${2 * Math.PI * 50 * overallScore / 100} 999`} strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-black text-foreground">{overallScore}</span>
                    <span className="text-xs text-muted-foreground">/100</span>
                  </div>
                </div>
                <p className="font-bold text-foreground text-lg">Overall Score</p>
                <p className="text-sm text-muted-foreground mt-1">Strong Validation</p>
                <div className="flex items-center justify-center gap-1 mt-2">
                  {[...Array(4)].map((_, i) => <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />)}
                  <Star className="w-4 h-4 text-muted-foreground" />
                </div>
              </div>
              <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-5">
                <h3 className="font-semibold text-foreground mb-3">Validation Radar</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <RadarChart data={RADAR_DATA}>
                    <PolarGrid stroke="hsl(var(--border))" />
                    <PolarAngleAxis dataKey="metric" tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} />
                    <Radar dataKey="score" stroke="#f97316" fill="#f97316" fillOpacity={0.25} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Criteria Breakdown */}
            <div className="rounded-2xl border border-border bg-card p-5">
              <h3 className="font-semibold text-foreground mb-4">Validation Breakdown</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {VALIDATION_CRITERIA.map((v, i) => (
                  <motion.div key={v.metric} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                    className="flex items-start gap-3 p-4 rounded-xl border border-border">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-sm font-bold ${v.score >= 80 ? 'bg-green-500/10 text-green-500' : v.score >= 70 ? 'bg-yellow-500/10 text-yellow-500' : 'bg-red-500/10 text-red-500'}`}>
                      {v.score}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-semibold text-foreground">{v.metric}</span>
                        {v.score >= 80 ? <CheckCircle className="w-4 h-4 text-green-500" /> : <AlertCircle className="w-4 h-4 text-yellow-500" />}
                      </div>
                      <p className="text-xs text-muted-foreground">{v.desc}</p>
                      <div className="mt-2 h-1.5 rounded-full bg-muted overflow-hidden">
                        <div className={`h-full rounded-full ${v.score >= 80 ? 'bg-green-500' : v.score >= 70 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{ width: `${v.score}%` }} />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Competitor Landscape */}
            <div className="rounded-2xl border border-border bg-card p-5">
              <h3 className="font-semibold text-foreground mb-4">Competitor Landscape</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      {['Competitor', 'Est. MRR', 'Users', 'Raised', 'Key Weakness'].map(h => <th key={h} className="text-left text-xs font-semibold text-muted-foreground py-2 pr-6">{h}</th>)}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {COMPETITORS.map(c => (
                      <tr key={c.name} className="hover:bg-muted/30 transition-colors">
                        <td className="py-3 pr-6 font-medium text-foreground">{c.name}</td>
                        <td className="py-3 pr-6 text-green-500 font-semibold">{c.mrr}</td>
                        <td className="py-3 pr-6 text-muted-foreground">{c.users}</td>
                        <td className="py-3 pr-6 text-muted-foreground">{c.raised}</td>
                        <td className="py-3 pr-6 text-orange-500 text-xs">{c.weakness}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Recommendations */}
            <div className="rounded-2xl border border-green-500/20 bg-green-500/5 p-5">
              <h3 className="font-semibold text-green-400 mb-3 flex items-center gap-2"><CheckCircle className="w-4 h-4" /> AI Recommendations</h3>
              <div className="space-y-2">
                {['Focus on B2B segment first — higher willingness to pay and lower churn than B2C', 'Differentiate on integrations — existing competitors have weak APIs', 'Start in Bangalore/Mumbai tech ecosystem before expanding', 'Aim for 10 paid pilots in the first 60 days — prioritize revenue validation'].map(rec => (
                  <div key={rec} className="flex items-start gap-2 text-sm text-green-300">
                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-500" />
                    {rec}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default FounderStartupValidation;
