import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, DollarSign, PieChart, Globe, ArrowUpRight } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RPieChart, Pie, Cell } from 'recharts';
import DashboardLayout from '@/components/layout/DashboardLayout';

const PORTFOLIO_GROWTH = [
  { month: 'Jan', value: 200 }, { month: 'Feb', value: 220 }, { month: 'Mar', value: 215 },
  { month: 'Apr', value: 260 }, { month: 'May', value: 285 }, { month: 'Jun', value: 315 },
];

const SECTOR_DATA = [
  { name: 'SaaS', value: 35 }, { name: 'FinTech', value: 25 }, { name: 'EdTech', value: 20 },
  { name: 'HealthTech', value: 12 }, { name: 'Other', value: 8 },
];

const STAGE_DATA = [
  { stage: 'Pre-Seed', count: 8, value: 120 }, { stage: 'Seed', count: 14, value: 520 },
  { stage: 'Series A', count: 6, value: 1800 }, { stage: 'Series B+', count: 2, value: 2000 },
];

const COLORS = ['#3B82F6', '#F97316', '#8B5CF6', '#10B981', '#EF4444'];

const InvestorAnalytics = () => (
  <DashboardLayout title="Funding Analytics">
    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Portfolio Value', value: '₹31.5Cr', change: '+57%', color: 'text-green-500' },
          { label: 'Total Invested', value: '₹16Cr', change: '30 companies', color: 'text-blue-500' },
          { label: 'IRR (Blended)', value: '34%', change: 'Top quartile', color: 'text-purple-500' },
          { label: 'Exits', value: '2', change: '4.2x avg MOIC', color: 'text-orange-500' },
        ].map(s => (
          <div key={s.label} className="rounded-2xl border border-border bg-card p-5">
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
            <div className="flex items-center gap-1 mt-2"><ArrowUpRight className="w-3 h-3 text-green-500" /><span className="text-xs text-green-500">{s.change}</span></div>
          </div>
        ))}
      </div>

      {/* Portfolio Value Trend */}
      <div className="rounded-2xl border border-border bg-card p-5">
        <h3 className="font-semibold text-foreground mb-4">Portfolio Value Trend (₹Cr)</h3>
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={PORTFOLIO_GROWTH}>
            <defs><linearGradient id="pvG" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} /><stop offset="95%" stopColor="#22c55e" stopOpacity={0} /></linearGradient></defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
            <YAxis tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
            <Tooltip formatter={(v: number) => [`₹${v}Cr`]} contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 8, fontSize: 12 }} />
            <Area type="monotone" dataKey="value" stroke="#22c55e" strokeWidth={2} fill="url(#pvG)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sector Pie */}
        <div className="rounded-2xl border border-border bg-card p-5">
          <h3 className="font-semibold text-foreground mb-4">Sector Allocation</h3>
          <div className="flex items-center gap-6">
            <RPieChart width={180} height={180}>
              <Pie data={SECTOR_DATA} cx={90} cy={90} innerRadius={50} outerRadius={80} dataKey="value">
                {SECTOR_DATA.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
              </Pie>
            </RPieChart>
            <div className="space-y-2">
              {SECTOR_DATA.map((s, i) => (
                <div key={s.name} className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: COLORS[i] }} />
                  <span className="text-muted-foreground text-xs">{s.name}</span>
                  <span className="font-bold text-foreground text-xs ml-auto">{s.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stage Breakdown */}
        <div className="rounded-2xl border border-border bg-card p-5">
          <h3 className="font-semibold text-foreground mb-4">Portfolio by Stage</h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={STAGE_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="stage" tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} />
              <YAxis tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} />
              <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 8, fontSize: 12 }} />
              <Bar dataKey="count" fill="#3B82F6" radius={[6, 6, 0, 0]} name="Companies" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  </DashboardLayout>
);

export default InvestorAnalytics;
