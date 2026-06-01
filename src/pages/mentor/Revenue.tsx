import { useState } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, TrendingUp, CreditCard, Download, ArrowUpRight, Calendar } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { toast } from 'sonner';

const MONTHLY = [
  { month: 'Jan', sessions: 18, revenue: 67500 },
  { month: 'Feb', sessions: 22, revenue: 82500 },
  { month: 'Mar', sessions: 19, revenue: 71250 },
  { month: 'Apr', sessions: 28, revenue: 105000 },
  { month: 'May', sessions: 25, revenue: 93750 },
  { month: 'Jun', sessions: 31, revenue: 116250 },
];

const TRANSACTIONS = [
  { id: 1, founder: 'Karan Mehta', type: '1:1 Session', date: 'Jun 3, 2025', amount: 4500, status: 'completed' },
  { id: 2, founder: 'Neha Agarwal', type: '1:1 Session', date: 'Jun 5, 2025', amount: 3375, status: 'upcoming' },
  { id: 3, founder: 'Group Session', type: 'Group (11 seats)', date: 'May 27, 2025', amount: 10989, status: 'completed' },
  { id: 4, founder: 'Anjali Singh', type: '1:1 Session', date: 'May 28, 2025', amount: 4500, status: 'completed' },
  { id: 5, founder: 'Deepika Rao', type: '1:1 Session', date: 'May 22, 2025', amount: 6750, status: 'completed' },
  { id: 6, founder: 'Group Session', type: 'Group (9 seats)', date: 'May 13, 2025', amount: 11691, status: 'completed' },
];

const MentorRevenue = () => {
  const totalRevenue = MONTHLY.reduce((a, m) => a + m.revenue, 0);
  const totalSessions = MONTHLY.reduce((a, m) => a + m.sessions, 0);

  return (
    <DashboardLayout title="Revenue Dashboard">
      <div className="space-y-6">
        {/* Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Revenue (YTD)', value: `₹${(totalRevenue / 100000).toFixed(1)}L`, change: '+34%', color: 'text-green-500', bg: 'from-green-500/10 to-green-500/5' },
            { label: 'This Month', value: '₹1,16,250', change: '+24%', color: 'text-blue-500', bg: 'from-blue-500/10 to-blue-500/5' },
            { label: 'Avg Per Session', value: '₹3,750', change: '+8%', color: 'text-purple-500', bg: 'from-purple-500/10 to-purple-500/5' },
            { label: 'Pending Payout', value: '₹7,875', change: 'Next: Jun 15', color: 'text-orange-500', bg: 'from-orange-500/10 to-orange-500/5' },
          ].map(s => (
            <div key={s.label} className={`rounded-2xl border border-border bg-gradient-to-br ${s.bg} p-5`}>
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className="w-3 h-3 text-green-500" />
                <span className="text-xs text-green-500 font-medium">{s.change}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Revenue Chart */}
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Monthly Revenue Trend</h3>
            <button onClick={() => toast.success('Downloading report...')} className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border text-muted-foreground text-xs hover:bg-muted transition-all">
              <Download className="w-3.5 h-3.5" /> Export
            </button>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={MONTHLY}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
              <YAxis tickFormatter={v => `₹${(v / 1000).toFixed(0)}k`} tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
              <Tooltip formatter={(v: number) => [`₹${v.toLocaleString('en-IN')}`, 'Revenue']} contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 8, fontSize: 12 }} />
              <Area type="monotone" dataKey="revenue" stroke="#22c55e" strokeWidth={2} fill="url(#revGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Transactions */}
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Recent Transactions</h3>
            <button onClick={() => toast.success('Requesting payout...')} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-500 text-white text-sm font-semibold hover:bg-green-400 transition-all">
              <CreditCard className="w-4 h-4" /> Request Payout
            </button>
          </div>
          <div className="space-y-3">
            {TRANSACTIONS.map((tx, i) => (
              <div key={tx.id} className="flex items-center gap-4 p-4 rounded-xl border border-border hover:border-green-500/30 transition-all">
                <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center flex-shrink-0">
                  <DollarSign className="w-5 h-5 text-green-500" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-foreground">{tx.founder}</p>
                  <p className="text-xs text-muted-foreground">{tx.type} · {tx.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-500">+₹{tx.amount.toLocaleString('en-IN')}</p>
                  <span className={`text-xs ${tx.status === 'completed' ? 'text-green-500' : 'text-orange-500'}`}>{tx.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payout Info */}
        <div className="rounded-2xl border border-border bg-card p-5">
          <h3 className="font-semibold text-foreground mb-4">Payout Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: 'Payout Method', value: 'Bank Transfer (NEFT)', icon: CreditCard },
              { label: 'Next Payout Date', value: 'June 15, 2025', icon: Calendar },
              { label: 'Platform Fee', value: '20% (₹16 → ₹20 earned per ₹100)', icon: ArrowUpRight },
            ].map(({ label, value, icon: Icon }) => (
              <div key={label} className="flex items-start gap-3 p-4 rounded-xl bg-muted/50">
                <div className="w-8 h-8 rounded-lg bg-background flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{label}</p>
                  <p className="text-sm font-semibold text-foreground mt-0.5">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MentorRevenue;
