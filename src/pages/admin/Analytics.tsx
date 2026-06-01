import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Users, Globe, Activity } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { CHART_DATA } from '@/lib/mockData';

const PLATFORM_METRICS = [
  { metric: 'Daily Active Users', value: '8,400', change: '+12%', color: 'text-blue-500' },
  { metric: 'Sessions per User', value: '4.2', change: '+0.4', color: 'text-purple-500' },
  { metric: 'Avg Time on Platform', value: '22 min', change: '+3 min', color: 'text-green-500' },
  { metric: 'Bounce Rate', value: '28%', change: '-4%', color: 'text-orange-500' },
];

const FEATURE_USAGE = [
  { feature: 'AI Copilot', usage: 68 },
  { feature: 'Idea Validation', usage: 54 },
  { feature: 'Mentor Booking', usage: 43 },
  { feature: 'Academy', usage: 38 },
  { feature: 'Community', usage: 32 },
  { feature: 'Investor Connect', usage: 24 },
];

const AdminAnalytics = () => (
  <DashboardLayout title="Platform Analytics">
    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {PLATFORM_METRICS.map(m => (
          <div key={m.metric} className="rounded-2xl border border-border bg-card p-5">
            <p className={`text-2xl font-bold ${m.color}`}>{m.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{m.metric}</p>
            <p className={`text-xs mt-1 ${m.change.startsWith('+') || m.change.startsWith('-4') ? 'text-green-500' : 'text-red-500'}`}>{m.change}</p>
          </div>
        ))}
      </div>

      {/* User Growth */}
      <div className="rounded-2xl border border-border bg-card p-5">
        <h3 className="font-semibold text-foreground mb-4">Platform User Growth</h3>
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={CHART_DATA.userGrowth}>
            <defs><linearGradient id="ugGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} /><stop offset="95%" stopColor="#3B82F6" stopOpacity={0} /></linearGradient></defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
            <YAxis tickFormatter={v => `${(v / 1000).toFixed(0)}k`} tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
            <Tooltip formatter={(v: number) => [v.toLocaleString(), 'Users']} contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 8, fontSize: 12 }} />
            <Area type="monotone" dataKey="users" stroke="#3B82F6" fill="url(#ugGrad)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Feature Usage + Revenue */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-border bg-card p-5">
          <h3 className="font-semibold text-foreground mb-4">Feature Usage (%)</h3>
          <div className="space-y-3">
            {FEATURE_USAGE.map(f => (
              <div key={f.feature}>
                <div className="flex justify-between text-xs mb-1"><span className="text-muted-foreground">{f.feature}</span><span className="font-semibold text-foreground">{f.usage}%</span></div>
                <div className="h-1.5 rounded-full bg-muted overflow-hidden"><div className="h-full rounded-full bg-primary" style={{ width: `${f.usage}%` }} /></div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5">
          <h3 className="font-semibold text-foreground mb-4">Revenue vs Target</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={CHART_DATA.revenueData.slice(0, 6)}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
              <YAxis tickFormatter={v => `₹${(v / 100000).toFixed(0)}L`} tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
              <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 8, fontSize: 12 }} />
              <Line type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={2} dot={false} name="Revenue" />
              <Line type="monotone" dataKey="target" stroke="#F97316" strokeWidth={2} strokeDasharray="4 4" dot={false} name="Target" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  </DashboardLayout>
);

export default AdminAnalytics;
