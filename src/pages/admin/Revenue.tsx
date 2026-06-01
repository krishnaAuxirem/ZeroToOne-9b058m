import { motion } from 'framer-motion';
import { DollarSign, TrendingUp, CreditCard, Users, Download, ArrowUpRight } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { toast } from 'sonner';

const MONTHLY_REVENUE = [
  { month: 'Jan', subscription: 145000, sessions: 67500, courses: 32500 },
  { month: 'Feb', subscription: 198000, sessions: 82500, courses: 31500 },
  { month: 'Mar', subscription: 247000, sessions: 71250, courses: 42750 },
  { month: 'Apr', subscription: 312000, sessions: 105000, courses: 53000 },
  { month: 'May', subscription: 398000, sessions: 93750, courses: 48250 },
  { month: 'Jun', subscription: 498000, sessions: 116250, courses: 62750 },
];

const PLAN_DATA = [
  { name: 'Growth', value: 42 }, { name: 'Founder Pro', value: 28 }, { name: 'Investor Pro', value: 18 }, { name: 'Starter', value: 12 },
];

const COLORS = ['#3B82F6', '#F97316', '#22c55e', '#8B5CF6'];

const AdminRevenue = () => {
  const totalMRR = MONTHLY_REVENUE[MONTHLY_REVENUE.length - 1];
  const totalRevenue = totalMRR.subscription + totalMRR.sessions + totalMRR.courses;

  return (
    <DashboardLayout title="Revenue Monitoring">
      <div className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'MRR', value: `₹${(totalRevenue / 100000).toFixed(1)}L`, change: '+24%', color: 'text-green-500' },
            { label: 'ARR', value: `₹${(totalRevenue * 12 / 10000000).toFixed(1)}Cr`, change: 'Projected', color: 'text-blue-500' },
            { label: 'Paying Users', value: '18,420', change: '+12%', color: 'text-purple-500' },
            { label: 'ARPU', value: `₹${Math.round(totalRevenue / 18420)}`, change: '+8%', color: 'text-orange-500' },
          ].map(s => (
            <div key={s.label} className="rounded-2xl border border-border bg-card p-5">
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
              <div className="flex items-center gap-1 mt-2"><ArrowUpRight className="w-3 h-3 text-green-500" /><span className="text-xs text-green-500">{s.change}</span></div>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Revenue Breakdown by Stream</h3>
            <button onClick={() => toast.success('Downloading report...')} className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border text-muted-foreground text-xs hover:bg-muted"><Download className="w-3.5 h-3.5" /> Export</button>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={MONTHLY_REVENUE}>
              <defs>
                {[['subG', '#3B82F6'], ['sesG', '#8B5CF6'], ['crsG', '#22c55e']].map(([id, c]) => (
                  <linearGradient key={id} id={id} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={c} stopOpacity={0.3} /><stop offset="95%" stopColor={c} stopOpacity={0} />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
              <YAxis tickFormatter={v => `₹${(v / 100000).toFixed(0)}L`} tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
              <Tooltip formatter={(v: number) => [`₹${v.toLocaleString('en-IN')}`]} contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 8, fontSize: 12 }} />
              <Area type="monotone" dataKey="subscription" stroke="#3B82F6" fill="url(#subG)" strokeWidth={2} name="Subscriptions" />
              <Area type="monotone" dataKey="sessions" stroke="#8B5CF6" fill="url(#sesG)" strokeWidth={2} name="Sessions" />
              <Area type="monotone" dataKey="courses" stroke="#22c55e" fill="url(#crsG)" strokeWidth={2} name="Courses" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-border bg-card p-5">
            <h3 className="font-semibold text-foreground mb-4">Revenue by Plan</h3>
            <div className="flex items-center gap-6">
              <PieChart width={160} height={160}>
                <Pie data={PLAN_DATA} cx={80} cy={80} innerRadius={45} outerRadius={70} dataKey="value">
                  {PLAN_DATA.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                </Pie>
              </PieChart>
              <div className="space-y-2">
                {PLAN_DATA.map((p, i) => (
                  <div key={p.name} className="flex items-center gap-2 text-sm">
                    <div className="w-3 h-3 rounded-full" style={{ background: COLORS[i] }} />
                    <span className="text-muted-foreground text-xs">{p.name}</span>
                    <span className="font-bold text-foreground text-xs ml-auto">{p.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5">
            <h3 className="font-semibold text-foreground mb-4">Key Revenue Metrics</h3>
            <div className="space-y-4">
              {[
                { metric: 'Churn Rate', value: '3.8%', change: '-0.4% MoM', good: true },
                { metric: 'LTV', value: '₹18,400', change: '+12%', good: true },
                { metric: 'CAC', value: '₹1,200', change: '-8%', good: true },
                { metric: 'LTV:CAC Ratio', value: '15.3x', change: '+2.1x', good: true },
              ].map(m => (
                <div key={m.metric} className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
                  <span className="text-sm text-muted-foreground">{m.metric}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-foreground text-sm">{m.value}</span>
                    <span className={`text-xs ${m.good ? 'text-green-500' : 'text-red-500'}`}>{m.change}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminRevenue;
