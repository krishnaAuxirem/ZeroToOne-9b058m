import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Users, Star, Clock, DollarSign, Globe, Award } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis } from 'recharts';
import DashboardLayout from '@/components/layout/DashboardLayout';

const MONTHLY_SESSIONS = [
  { month: 'Jan', sessions: 18, revenue: 67500 },
  { month: 'Feb', sessions: 22, revenue: 82500 },
  { month: 'Mar', sessions: 19, revenue: 71250 },
  { month: 'Apr', sessions: 28, revenue: 105000 },
  { month: 'May', sessions: 25, revenue: 93750 },
  { month: 'Jun', sessions: 31, revenue: 116250 },
];

const TOPIC_DATA = [
  { topic: 'Fundraising', sessions: 78 },
  { topic: 'Product', sessions: 65 },
  { topic: 'GTM', sessions: 54 },
  { topic: 'Sales', sessions: 43 },
  { topic: 'Operations', sessions: 32 },
  { topic: 'Finance', sessions: 15 },
];

const RADAR_DATA = [
  { metric: 'Responsiveness', score: 95 },
  { metric: 'Expertise', score: 92 },
  { metric: 'Clarity', score: 88 },
  { metric: 'Actionability', score: 90 },
  { metric: 'Value', score: 94 },
  { metric: 'Engagement', score: 86 },
];

const FOUNDER_STAGES = [
  { stage: 'Idea Stage', count: 38, pct: 27 },
  { stage: 'Pre-Seed', count: 52, pct: 37 },
  { stage: 'Seed', count: 34, pct: 24 },
  { stage: 'Series A+', count: 17, pct: 12 },
];

const MentorAnalytics = () => (
  <DashboardLayout title="Analytics">
    <div className="space-y-6">
      {/* KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Sessions (All Time)', value: '287', icon: Users, color: 'text-purple-500', bg: 'from-purple-500/10 to-purple-500/5' },
          { label: 'Revenue (All Time)', value: '₹5.4L', icon: DollarSign, color: 'text-green-500', bg: 'from-green-500/10 to-green-500/5' },
          { label: 'Avg Rating', value: '4.9 / 5', icon: Star, color: 'text-yellow-500', bg: 'from-yellow-500/10 to-yellow-500/5' },
          { label: 'Profile Views', value: '3,284', icon: Globe, color: 'text-blue-500', bg: 'from-blue-500/10 to-blue-500/5' },
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className={`rounded-2xl border border-border bg-gradient-to-br ${bg} p-5`}>
            <Icon className={`w-5 h-5 ${color} mb-2`} />
            <p className={`text-2xl font-bold ${color}`}>{value}</p>
            <p className="text-xs text-muted-foreground mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Session & Revenue Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-border bg-card p-5">
          <h3 className="font-semibold text-foreground mb-4">Sessions per Month</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={MONTHLY_SESSIONS}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
              <YAxis tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
              <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 8, fontSize: 12 }} />
              <Bar dataKey="sessions" fill="#8B5CF6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5">
          <h3 className="font-semibold text-foreground mb-4">Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={MONTHLY_SESSIONS}>
              <defs>
                <linearGradient id="revA" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
              <YAxis tickFormatter={v => `₹${v / 1000}k`} tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
              <Tooltip formatter={(v: number) => [`₹${v.toLocaleString('en-IN')}`]} contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 8, fontSize: 12 }} />
              <Area type="monotone" dataKey="revenue" stroke="#22c55e" strokeWidth={2} fill="url(#revA)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Topics & Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="rounded-2xl border border-border bg-card p-5">
          <h3 className="font-semibold text-foreground mb-4">Sessions by Topic</h3>
          <div className="space-y-3">
            {TOPIC_DATA.map(({ topic, sessions }) => (
              <div key={topic}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">{topic}</span>
                  <span className="font-medium text-foreground">{sessions}</span>
                </div>
                <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                  <div className="h-full rounded-full bg-purple-500" style={{ width: `${(sessions / 78) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5">
          <h3 className="font-semibold text-foreground mb-4">Performance Radar</h3>
          <ResponsiveContainer width="100%" height={200}>
            <RadarChart data={RADAR_DATA}>
              <PolarGrid stroke="hsl(var(--border))" />
              <PolarAngleAxis dataKey="metric" tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} />
              <Radar dataKey="score" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.3} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5">
          <h3 className="font-semibold text-foreground mb-4">Founders by Stage</h3>
          <div className="space-y-3">
            {FOUNDER_STAGES.map(({ stage, count, pct }) => (
              <div key={stage}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">{stage}</span>
                  <span className="font-medium text-foreground">{count} ({pct}%)</span>
                </div>
                <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                  <div className="h-full rounded-full bg-blue-500" style={{ width: `${pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Badges */}
      <div className="rounded-2xl border border-border bg-card p-5">
        <h3 className="font-semibold text-foreground mb-4">Achievements & Badges</h3>
        <div className="flex flex-wrap gap-3">
          {[
            { badge: 'Top Mentor', desc: 'Top 5% on platform', color: 'text-yellow-500 bg-yellow-500/10' },
            { badge: '200+ Sessions', desc: 'Mentored 200+ founders', color: 'text-purple-500 bg-purple-500/10' },
            { badge: '4.9 Stars', desc: 'Maintained avg 4.9 rating', color: 'text-blue-500 bg-blue-500/10' },
            { badge: 'Quick Responder', desc: 'Replies within 2h', color: 'text-green-500 bg-green-500/10' },
          ].map(b => (
            <div key={b.badge} className={`flex items-center gap-2 px-4 py-2.5 rounded-xl ${b.color}`}>
              <Award className="w-4 h-4" />
              <div>
                <p className="text-sm font-bold">{b.badge}</p>
                <p className="text-xs opacity-70">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </DashboardLayout>
);

export default MentorAnalytics;
