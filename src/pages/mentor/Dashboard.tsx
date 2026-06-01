import { useState } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Users, TrendingUp, Star, Calendar, MessageSquare, BarChart3, Clock } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import DashboardLayout from '@/components/layout/DashboardLayout';
import StatCard from '@/components/features/StatCard';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const SESSIONS = [
  { id: 1, founder: 'Karan Mehta', startup: 'CodeCraft', date: 'Jun 3, 2025', time: '3:00 PM', type: '1:1', status: 'upcoming', topic: 'Product Strategy & PMF' },
  { id: 2, founder: 'Neha Agarwal', startup: 'SkillUp', date: 'Jun 5, 2025', time: '11:00 AM', type: '1:1', status: 'upcoming', topic: 'Fundraising Preparation' },
  { id: 3, founder: 'Vishal Rao', startup: 'DataPulse', date: 'May 30, 2025', time: '2:00 PM', type: 'Group', status: 'completed', topic: 'B2B Sales Playbook' },
  { id: 4, founder: 'Anjali Singh', startup: 'WellnessApp', date: 'May 28, 2025', time: '4:00 PM', type: '1:1', status: 'completed', topic: 'Go-to-Market Strategy' },
];

const REQUESTS = [
  { id: 1, founder: 'Rohit Kumar', startup: 'LogiTrack', expertise: 'Operations Strategy', requested: '2 hours ago', urgent: true },
  { id: 2, founder: 'Priya Sharma', startup: 'HealthBuddy', expertise: 'Product Roadmap', requested: '5 hours ago', urgent: false },
  { id: 3, founder: 'Amit Patel', startup: 'FoodieBox', expertise: 'Fundraising', requested: '1 day ago', urgent: false },
];

const REVENUE_DATA = [
  { month: 'Jan', earnings: 45000 },
  { month: 'Feb', earnings: 67000 },
  { month: 'Mar', earnings: 52000 },
  { month: 'Apr', earnings: 89000 },
  { month: 'May', earnings: 76000 },
  { month: 'Jun', earnings: 92000 },
];

const REVIEWS = [
  { founder: 'Karan Mehta', rating: 5, comment: 'Dr. Aisha helped me pivot my business model at exactly the right time. Game-changing session!', date: 'May 30' },
  { founder: 'Neha Agarwal', rating: 5, comment: 'The best mentor I have had. Practical, actionable advice that I could implement immediately.', date: 'May 25' },
  { founder: 'Vishal Rao', rating: 4, comment: 'Very insightful session on B2B sales. Helped me understand enterprise sales cycles.', date: 'May 20' },
];

const MentorDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <DashboardLayout title="Mentor Dashboard">
      {/* Welcome */}
      <div className="rounded-2xl bg-gradient-to-r from-purple-700 to-indigo-800 p-6 mb-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="absolute rounded-full bg-white" style={{ width: 60 + i * 20, height: 60 + i * 20, top: `${i * 12}%`, right: `${i * 9}%` }} />
          ))}
        </div>
        <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="text-purple-200 text-sm mb-1">Welcome back</p>
            <h1 className="text-2xl font-bold text-white">{user?.name || 'Mentor'}</h1>
            <p className="text-purple-200 text-sm mt-1">You have <span className="text-white font-bold">3 pending requests</span> and <span className="text-white font-bold">2 sessions this week</span></p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => toast.success('Availability updated!')} className="px-4 py-2.5 rounded-xl bg-white/20 hover:bg-white/30 text-white text-sm font-medium transition-all flex items-center gap-2">
              <Calendar className="w-4 h-4" /> Set Availability
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Sessions" value="287" change="+12 this month" changeType="positive" icon={Users} iconColor="text-purple-500" gradient="from-purple-500/10 to-purple-500/5" delay={0} />
        <StatCard title="Monthly Revenue" value="₹92,000" change="+21%" changeType="positive" icon={DollarSign} iconColor="text-green-500" gradient="from-green-500/10 to-green-500/5" delay={0.1} />
        <StatCard title="Average Rating" value="4.9" change="Top 5%" changeType="positive" icon={Star} iconColor="text-yellow-500" gradient="from-yellow-500/10 to-yellow-500/5" delay={0.2} />
        <StatCard title="Active Founders" value="24" change="+3 this week" changeType="positive" icon={TrendingUp} iconColor="text-blue-500" gradient="from-blue-500/10 to-blue-500/5" delay={0.3} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-5">
          <h2 className="font-semibold text-foreground mb-4">Monthly Earnings</h2>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={REVENUE_DATA} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="earningsGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
              <YAxis tickFormatter={v => `₹${(v/1000).toFixed(0)}k`} tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
              <Tooltip formatter={(v: number) => [`₹${v.toLocaleString('en-IN')}`]} contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 12, fontSize: 12 }} />
              <Area type="monotone" dataKey="earnings" stroke="#8B5CF6" strokeWidth={2} fill="url(#earningsGrad)" name="Earnings" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Pending Requests */}
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-foreground">Consultation Requests</h2>
            <span className="px-2 py-0.5 rounded-full bg-red-500/10 text-red-500 text-xs font-bold">{REQUESTS.length} new</span>
          </div>
          <div className="space-y-3">
            {REQUESTS.map((r) => (
              <div key={r.id} className="p-3 rounded-xl border border-border hover:border-purple-500/30 transition-all">
                <div className="flex items-start justify-between mb-1.5">
                  <div>
                    <p className="text-sm font-semibold text-foreground">{r.founder}</p>
                    <p className="text-xs text-muted-foreground">{r.startup}</p>
                  </div>
                  {r.urgent && <span className="px-2 py-0.5 bg-red-500/10 text-red-500 text-xs rounded-full">Urgent</span>}
                </div>
                <p className="text-xs text-muted-foreground mb-2">{r.expertise}</p>
                <div className="flex gap-2">
                  <button onClick={() => toast.success('Request accepted!')} className="flex-1 py-1.5 rounded-lg bg-purple-500/10 text-purple-500 text-xs font-semibold hover:bg-purple-500 hover:text-white transition-all">Accept</button>
                  <button onClick={() => toast.info('Request declined')} className="flex-1 py-1.5 rounded-lg border border-border text-muted-foreground text-xs hover:bg-muted transition-all">Decline</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upcoming Sessions */}
      <div className="rounded-2xl border border-border bg-card p-5 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-foreground">Sessions</h2>
          <div className="flex gap-2">
            {['upcoming', 'completed'].map((t) => (
              <button key={t} onClick={() => setActiveTab(t)} className={`px-3 py-1 rounded-lg text-xs capitalize transition-all ${activeTab === t ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>{t}</button>
            ))}
          </div>
        </div>
        <div className="space-y-3">
          {SESSIONS.filter(s => s.status === activeTab).map((session) => (
            <div key={session.id} className="flex items-center gap-4 p-4 rounded-xl border border-border hover:border-primary/30 transition-all">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                <Calendar className="w-5 h-5 text-purple-500" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">{session.founder} — {session.startup}</p>
                <p className="text-xs text-muted-foreground">{session.topic}</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-medium text-foreground">{session.date}</p>
                <p className="text-xs text-muted-foreground">{session.time} · {session.type}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${session.status === 'upcoming' ? 'bg-blue-500/10 text-blue-500' : 'bg-green-500/10 text-green-500'}`}>
                {session.status}
              </span>
              {session.status === 'upcoming' && (
                <button onClick={() => toast.success('Joining session...')} className="px-3 py-1.5 rounded-lg bg-purple-600 text-white text-xs font-semibold hover:bg-purple-500 transition-all">
                  Join
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Reviews */}
      <div className="rounded-2xl border border-border bg-card p-5">
        <h2 className="font-semibold text-foreground mb-4">Recent Reviews</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {REVIEWS.map((r, i) => (
            <div key={i} className="p-4 rounded-xl bg-muted/50">
              <div className="flex gap-1 mb-2">
                {[...Array(r.rating)].map((_, j) => <Star key={j} className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />)}
              </div>
              <p className="text-sm text-muted-foreground italic mb-2">"{r.comment}"</p>
              <p className="text-xs font-semibold text-foreground">{r.founder} · {r.date}</p>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MentorDashboard;
