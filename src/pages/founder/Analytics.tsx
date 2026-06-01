import { motion } from 'framer-motion';
import { TrendingUp, Users, DollarSign, BarChart3, Activity, ArrowUpRight, Globe } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { CHART_DATA } from '@/lib/mockData';

const FounderAnalytics = () => (
  <DashboardLayout title="Analytics">
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'MRR', value: '₹8.5L', change: '+22%', color: 'text-green-500', bg: 'from-green-500/10 to-green-500/5' },
          { label: 'Total Users', value: '1,25,000', change: '+18%', color: 'text-blue-500', bg: 'from-blue-500/10 to-blue-500/5' },
          { label: 'Paid Subscribers', value: '18,000', change: '+15%', color: 'text-purple-500', bg: 'from-purple-500/10 to-purple-500/5' },
          { label: 'Churn Rate', value: '4.2%', change: '-0.8%', color: 'text-orange-500', bg: 'from-orange-500/10 to-orange-500/5' },
        ].map(s => (
          <div key={s.label} className={`rounded-2xl border border-border bg-gradient-to-br ${s.bg} p-5`}>
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
            <div className="flex items-center gap-1 mt-2">
              <ArrowUpRight className={`w-3 h-3 ${s.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`} />
              <span className={`text-xs font-medium ${s.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>{s.change} MoM</span>
            </div>
          </div>
        ))}
      </div>

      {/* Revenue Chart */}
      <div className="rounded-2xl border border-border bg-card p-5">
        <h3 className="font-semibold text-foreground mb-4">Revenue vs Target</h3>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={CHART_DATA.revenueData}>
            <defs>
              <linearGradient id="revG" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="tgtG" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#F97316" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#F97316" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
            <YAxis tickFormatter={v => `₹${(v / 100000).toFixed(0)}L`} tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
            <Tooltip formatter={(v: number) => [`₹${v.toLocaleString('en-IN')}`]} contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 8, fontSize: 12 }} />
            <Area type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={2} fill="url(#revG)" name="Revenue" />
            <Area type="monotone" dataKey="target" stroke="#F97316" strokeWidth={2} strokeDasharray="4 4" fill="url(#tgtG)" name="Target" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* User Growth + Weekly Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-border bg-card p-5">
          <h3 className="font-semibold text-foreground mb-4">User Growth</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={CHART_DATA.userGrowth}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
              <YAxis tickFormatter={v => `${(v / 1000).toFixed(0)}k`} tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
              <Tooltip formatter={(v: number) => [v.toLocaleString(), 'Users']} contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 8, fontSize: 12 }} />
              <Line type="monotone" dataKey="users" stroke="#8B5CF6" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5">
          <h3 className="font-semibold text-foreground mb-4">Weekly Activity</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={CHART_DATA.weeklyActivity}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
              <YAxis tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
              <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 8, fontSize: 12 }} />
              <Bar dataKey="tasks" fill="#3B82F6" radius={[4, 4, 0, 0]} name="Tasks" />
              <Bar dataKey="meetings" fill="#F97316" radius={[4, 4, 0, 0]} name="Meetings" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Health Metrics */}
      <div className="rounded-2xl border border-border bg-card p-5">
        <h3 className="font-semibold text-foreground mb-4">Startup Health Score</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {CHART_DATA.startupHealthData.map(({ metric, score }) => (
            <div key={metric} className="p-4 rounded-xl bg-muted/50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">{metric}</span>
                <span className={`text-sm font-bold ${score >= 80 ? 'text-green-500' : score >= 70 ? 'text-yellow-500' : 'text-red-500'}`}>{score}</span>
              </div>
              <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                <div className={`h-full rounded-full ${score >= 80 ? 'bg-green-500' : score >= 70 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{ width: `${score}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </DashboardLayout>
);

export default FounderAnalytics;
