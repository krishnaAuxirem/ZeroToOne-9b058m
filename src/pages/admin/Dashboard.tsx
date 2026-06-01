import { motion } from 'framer-motion';
import { Users, TrendingUp, DollarSign, BarChart3, AlertCircle, CheckCircle, UserPlus, Shield } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import DashboardLayout from '@/components/layout/DashboardLayout';
import StatCard from '@/components/features/StatCard';
import { toast } from 'sonner';

const USER_GROWTH = [
  { month: 'Jan', founders: 3200, mentors: 180, investors: 95 },
  { month: 'Feb', founders: 4800, mentors: 220, investors: 120 },
  { month: 'Mar', founders: 6500, mentors: 290, investors: 155 },
  { month: 'Apr', founders: 9200, mentors: 350, investors: 190 },
  { month: 'May', founders: 12400, mentors: 420, investors: 240 },
  { month: 'Jun', founders: 16000, mentors: 500, investors: 285 },
];

const REVENUE_DATA = [
  { month: 'Jan', revenue: 245000 }, { month: 'Feb', revenue: 312000 },
  { month: 'Mar', revenue: 428000 }, { month: 'Apr', revenue: 521000 },
  { month: 'May', revenue: 698000 }, { month: 'Jun', revenue: 845000 },
];

const RECENT_ACTIVITY = [
  { type: 'signup', text: 'New founder registered: Priya Sharma (HealthBuddy)', time: '2 min ago', urgent: false },
  { type: 'report', text: 'Blog post flagged for review: "Startup Funding Guide"', time: '15 min ago', urgent: true },
  { type: 'mentor', text: 'New mentor verification request: Dr. Amit Desai', time: '1h ago', urgent: false },
  { type: 'payment', text: 'Revenue milestone: ₹50L MRR achieved!', time: '2h ago', urgent: false },
  { type: 'report', text: 'Community post reported by 3 users', time: '3h ago', urgent: true },
];

const AdminDashboard = () => (
  <DashboardLayout title="Admin Dashboard">
    <div className="space-y-6">
      {/* Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-red-700 to-rose-800 p-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">{[...Array(6)].map((_, i) => <div key={i} className="absolute rounded-full bg-white" style={{ width: 60 + i * 20, height: 60 + i * 20, top: `${i * 15}%`, right: `${i * 8}%` }} />)}</div>
        <div className="relative">
          <p className="text-red-200 text-sm mb-1">ZeroToOne Admin Console</p>
          <h1 className="text-2xl font-bold text-white">Platform Overview</h1>
          <p className="text-red-200 text-sm mt-1"><span className="text-white font-bold">2 urgent items</span> need your attention today</p>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Users" value="50,000+" change="+18% MoM" changeType="positive" icon={Users} iconColor="text-blue-500" gradient="from-blue-500/10 to-blue-500/5" delay={0} />
        <StatCard title="MRR" value="₹8.45L" change="+22% MoM" changeType="positive" icon={DollarSign} iconColor="text-green-500" gradient="from-green-500/10 to-green-500/5" delay={0.1} />
        <StatCard title="Sessions This Month" value="1,248" change="+31% YoY" changeType="positive" icon={BarChart3} iconColor="text-purple-500" gradient="from-purple-500/10 to-purple-500/5" delay={0.2} />
        <StatCard title="Pending Reviews" value="7" change="2 urgent" changeType="negative" icon={AlertCircle} iconColor="text-orange-500" gradient="from-orange-500/10 to-orange-500/5" delay={0.3} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-border bg-card p-5">
          <h3 className="font-semibold text-foreground mb-4">User Growth by Role</h3>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={USER_GROWTH}>
              <defs>
                {[['founderG', '#3B82F6'], ['mentorG', '#8B5CF6'], ['investorG', '#22c55e']].map(([id, color]) => (
                  <linearGradient key={id} id={id} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={color} stopOpacity={0.3} /><stop offset="95%" stopColor={color} stopOpacity={0} />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
              <YAxis tickFormatter={v => `${(v / 1000).toFixed(0)}k`} tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
              <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 8, fontSize: 12 }} />
              <Area type="monotone" dataKey="founders" stroke="#3B82F6" fill="url(#founderG)" strokeWidth={2} name="Founders" />
              <Area type="monotone" dataKey="mentors" stroke="#8B5CF6" fill="url(#mentorG)" strokeWidth={2} name="Mentors" />
              <Area type="monotone" dataKey="investors" stroke="#22c55e" fill="url(#investorG)" strokeWidth={2} name="Investors" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5">
          <h3 className="font-semibold text-foreground mb-4">Monthly Revenue (₹)</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={REVENUE_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
              <YAxis tickFormatter={v => `₹${(v / 100000).toFixed(1)}L`} tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
              <Tooltip formatter={(v: number) => [`₹${v.toLocaleString('en-IN')}`]} contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 8, fontSize: 12 }} />
              <Bar dataKey="revenue" fill="#ef4444" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="rounded-2xl border border-border bg-card p-5">
        <h3 className="font-semibold text-foreground mb-4">Recent Platform Activity</h3>
        <div className="space-y-3">
          {RECENT_ACTIVITY.map((a, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
              className={`flex items-center gap-3 p-3 rounded-xl border ${a.urgent ? 'border-red-500/20 bg-red-500/5' : 'border-border'}`}>
              {a.urgent ? <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" /> : <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />}
              <p className="flex-1 text-sm text-foreground">{a.text}</p>
              <span className="text-xs text-muted-foreground flex-shrink-0">{a.time}</span>
              {a.urgent && <button onClick={() => toast.success('Item reviewed!')} className="px-3 py-1 rounded-lg bg-red-500 text-white text-xs font-semibold hover:bg-red-400 transition-all">Review</button>}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </DashboardLayout>
);

export default AdminDashboard;
