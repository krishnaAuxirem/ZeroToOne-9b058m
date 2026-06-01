import { useState } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Users, TrendingUp, Star, Calendar, MessageSquare, BarChart3, Clock, ArrowRight, Bell, CheckCircle, XCircle, Zap } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import DashboardLayout from '@/components/layout/DashboardLayout';
import StatCard from '@/components/features/StatCard';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const SESSIONS = [
  { id: 1, founder: 'Karan Mehta', startup: 'CodeCraft', date: 'Jun 3, 2025', time: '3:00 PM', type: '1:1', status: 'upcoming', topic: 'Product Strategy & PMF', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=karan' },
  { id: 2, founder: 'Neha Agarwal', startup: 'SkillUp', date: 'Jun 5, 2025', time: '11:00 AM', type: '1:1', status: 'upcoming', topic: 'Fundraising Preparation', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=neha' },
  { id: 3, founder: 'Vishal Rao', startup: 'DataPulse', date: 'May 30, 2025', time: '2:00 PM', type: 'Group', status: 'completed', topic: 'B2B Sales Playbook', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=vishal' },
  { id: 4, founder: 'Anjali Singh', startup: 'WellnessApp', date: 'May 28, 2025', time: '4:00 PM', type: '1:1', status: 'completed', topic: 'Go-to-Market Strategy', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=anjali' },
];

const REQUESTS = [
  { id: 1, founder: 'Rohit Kumar', startup: 'LogiTrack', expertise: 'Operations Strategy', requested: '2h ago', urgent: true, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=rohit' },
  { id: 2, founder: 'Priya Sharma', startup: 'HealthBuddy', expertise: 'Product Roadmap', requested: '5h ago', urgent: false, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=priyash' },
  { id: 3, founder: 'Amit Patel', startup: 'FoodieBox', expertise: 'Fundraising', requested: '1d ago', urgent: false, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=amitp' },
];

const REVENUE_DATA = [
  { month: 'Jan', earnings: 45000, sessions: 18 },
  { month: 'Feb', earnings: 67000, sessions: 22 },
  { month: 'Mar', earnings: 52000, sessions: 19 },
  { month: 'Apr', earnings: 89000, sessions: 28 },
  { month: 'May', earnings: 76000, sessions: 25 },
  { month: 'Jun', earnings: 92000, sessions: 31 },
];

const REVIEWS = [
  { founder: 'Karan Mehta', rating: 5, comment: 'Helped me pivot at exactly the right time. Game-changing session!', date: 'May 30', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=karan' },
  { founder: 'Neha Agarwal', rating: 5, comment: 'Practical, actionable advice that I could implement immediately.', date: 'May 25', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=neha' },
  { founder: 'Vishal Rao', rating: 4, comment: 'Very insightful on B2B sales. Helped understand enterprise cycles.', date: 'May 20', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=vishal' },
];

const SPARKLINE = [18, 22, 19, 28, 25, 31];
const SPARKLINE_REV = [45, 67, 52, 89, 76, 92];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.4, 0, 0.2, 1] } },
};

const MentorDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed'>('upcoming');
  const [requests, setRequests] = useState(REQUESTS);

  const handleAccept = (id: number) => {
    setRequests(prev => prev.filter(r => r.id !== id));
    toast.success('Request accepted! Session scheduled.');
  };
  const handleDecline = (id: number) => {
    setRequests(prev => prev.filter(r => r.id !== id));
    toast.info('Request declined.');
  };

  return (
    <DashboardLayout title="Dashboard">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        {/* ── Welcome Banner ── */}
        <motion.div variants={itemVariants}>
          <div className="relative overflow-hidden rounded-2xl p-6"
            style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.3) 0%, rgba(30,27,75,0.8) 50%, rgba(139,92,246,0.15) 100%)', border: '1px solid rgba(139,92,246,0.2)' }}
          >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #8B5CF6 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />
            <div className="absolute bottom-0 left-1/3 w-40 h-40 rounded-full opacity-5" style={{ background: 'radial-gradient(circle, #3B82F6 0%, transparent 70%)' }} />

            <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="relative flex-shrink-0">
                  <img src={user?.avatar} alt={user?.name} className="w-14 h-14 rounded-2xl ring-2 ring-purple-500/40" />
                  <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-[#1e1b4b]" />
                </div>
                <div>
                  <p className="text-purple-300 text-sm font-medium mb-0.5">Good morning 👋</p>
                  <h1 className="text-2xl font-bold text-white font-['Space_Grotesk']">{user?.name || 'Mentor'}</h1>
                  <p className="text-purple-200/60 text-sm mt-1">
                    <span className="text-white font-semibold">{requests.length} new requests</span> · <span className="text-white font-semibold">2 sessions</span> this week
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => toast.success('Availability updated!')}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all"
                  style={{ background: 'rgba(139,92,246,0.25)', border: '1px solid rgba(139,92,246,0.35)' }}
                >
                  <Calendar className="w-4 h-4" /> Set Availability
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => toast.success('Profile shared!')}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all"
                  style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}
                >
                  <Zap className="w-4 h-4" /> Share Profile
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── KPI Cards ── */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Sessions"
            value="287"
            change="+12 this month"
            changeType="positive"
            icon={Users}
            iconColor="text-purple-400"
            gradient="from-purple-500/12 to-purple-500/4"
            sparkline={SPARKLINE}
            delay={0}
          />
          <StatCard
            title="Monthly Revenue"
            value="₹92,000"
            change="+21.2%"
            changeType="positive"
            icon={DollarSign}
            iconColor="text-emerald-400"
            gradient="from-emerald-500/12 to-emerald-500/4"
            sparkline={SPARKLINE_REV}
            delay={0.05}
          />
          <StatCard
            title="Average Rating"
            value="4.9 ★"
            change="Top 5%"
            changeType="positive"
            icon={Star}
            iconColor="text-yellow-400"
            gradient="from-yellow-500/12 to-yellow-500/4"
            badge="ELITE"
            delay={0.1}
          />
          <StatCard
            title="Active Founders"
            value="24"
            change="+3 this week"
            changeType="positive"
            icon={TrendingUp}
            iconColor="text-blue-400"
            gradient="from-blue-500/12 to-blue-500/4"
            sparkline={[10, 14, 18, 20, 22, 24]}
            delay={0.15}
          />
        </motion.div>

        {/* ── Charts Row ── */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Revenue chart */}
          <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="font-semibold text-foreground text-sm font-['Space_Grotesk']">Monthly Earnings</h2>
                <p className="text-muted-foreground text-xs mt-0.5">Revenue trend over last 6 months</p>
              </div>
              <span className="px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-500 text-xs font-bold">+22% YTD</span>
            </div>
            <ResponsiveContainer width="100%" height={210}>
              <AreaChart data={REVENUE_DATA} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="earningsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.5} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
                <YAxis tickFormatter={v => `₹${(v / 1000).toFixed(0)}k`} tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
                <Tooltip
                  formatter={(v: number) => [`₹${v.toLocaleString('en-IN')}`, 'Earnings']}
                  contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 12, fontSize: 12, boxShadow: '0 8px 24px rgba(0,0,0,0.15)' }}
                />
                <Area type="monotone" dataKey="earnings" stroke="#8B5CF6" strokeWidth={2.5} fill="url(#earningsGrad)" dot={false} activeDot={{ r: 5, fill: '#8B5CF6', strokeWidth: 2, stroke: '#fff' }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Pending Requests */}
          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-foreground text-sm font-['Space_Grotesk']">Pending Requests</h2>
              {requests.length > 0 && (
                <motion.span
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="px-2.5 py-0.5 rounded-full bg-red-500/12 text-red-400 text-xs font-bold border border-red-500/20"
                >
                  {requests.length} new
                </motion.span>
              )}
            </div>
            <div className="space-y-3">
              {requests.length === 0 ? (
                <div className="flex flex-col items-center py-8 text-muted-foreground">
                  <CheckCircle className="w-8 h-8 mb-2 text-emerald-500/40" />
                  <p className="text-sm">All requests handled!</p>
                </div>
              ) : requests.map((r) => (
                <motion.div
                  key={r.id}
                  layout
                  exit={{ opacity: 0, x: -20 }}
                  className="p-3.5 rounded-xl border border-border hover:border-purple-500/25 transition-all group"
                >
                  <div className="flex items-center gap-2.5 mb-2">
                    <img src={r.avatar} alt={r.founder} className="w-8 h-8 rounded-full bg-muted flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground truncate">{r.founder}</p>
                      <p className="text-xs text-muted-foreground truncate">{r.startup}</p>
                    </div>
                    {r.urgent && (
                      <span className="px-2 py-0.5 bg-red-500/10 text-red-400 text-[10px] font-bold rounded-full border border-red-500/20 flex-shrink-0">
                        URGENT
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground/80 mb-2.5 px-0.5">
                    Needs help with: <span className="text-foreground/70">{r.expertise}</span>
                  </p>
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleAccept(r.id)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-purple-500/10 text-purple-400 text-xs font-semibold hover:bg-purple-500 hover:text-white transition-all border border-purple-500/20"
                    >
                      <CheckCircle className="w-3.5 h-3.5" /> Accept
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleDecline(r.id)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl border border-border text-muted-foreground text-xs hover:bg-red-500/8 hover:text-red-400 hover:border-red-500/20 transition-all"
                    >
                      <XCircle className="w-3.5 h-3.5" /> Decline
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── Sessions Table ── */}
        <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="font-semibold text-foreground text-sm font-['Space_Grotesk']">Sessions</h2>
              <p className="text-muted-foreground text-xs mt-0.5">Manage your upcoming and past sessions</p>
            </div>
            <div className="flex gap-1.5 p-1 rounded-xl bg-muted">
              {(['upcoming', 'completed'] as const).map((t) => (
                <motion.button
                  key={t}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setActiveTab(t)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                    activeTab === t
                      ? 'bg-card text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {t}
                </motion.button>
              ))}
            </div>
          </div>

          <div className="space-y-2.5">
            {SESSIONS.filter(s => s.status === activeTab).map((session, i) => (
              <motion.div
                key={session.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="flex items-center gap-4 p-4 rounded-xl border border-border hover:border-primary/20 hover:bg-muted/30 transition-all group"
              >
                <img src={session.avatar} alt={session.founder} className="w-10 h-10 rounded-xl bg-muted flex-shrink-0 ring-1 ring-border" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{session.founder}
                    <span className="text-muted-foreground font-normal"> — {session.startup}</span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">{session.topic}</p>
                </div>
                <div className="hidden md:block text-right flex-shrink-0">
                  <p className="text-xs font-medium text-foreground">{session.date}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{session.time} · {session.type}</p>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-semibold flex-shrink-0 ${
                  session.status === 'upcoming'
                    ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                    : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                }`}>
                  {session.status}
                </span>
                {session.status === 'upcoming' && (
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => toast.success('Joining session...')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-600 text-white text-xs font-semibold hover:bg-purple-500 transition-all flex-shrink-0"
                  >
                    <Zap className="w-3 h-3" /> Join
                  </motion.button>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Recent Reviews ── */}
        <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold text-foreground text-sm font-['Space_Grotesk']">Recent Reviews</h2>
            <button className="flex items-center gap-1.5 text-xs text-primary font-medium hover:underline">
              See all <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {REVIEWS.map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -3 }}
                className="p-4 rounded-xl bg-muted/50 border border-border hover:border-yellow-500/20 transition-all"
              >
                <div className="flex items-center gap-2 mb-3">
                  <img src={r.avatar} alt={r.founder} className="w-8 h-8 rounded-full bg-muted" />
                  <div>
                    <p className="text-xs font-semibold text-foreground">{r.founder}</p>
                    <p className="text-[11px] text-muted-foreground">{r.date}</p>
                  </div>
                  <div className="flex gap-0.5 ml-auto">
                    {[...Array(r.rating)].map((_, j) => (
                      <Star key={j} className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground italic leading-relaxed">"{r.comment}"</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Sessions Bar Chart ── */}
        <motion.div variants={itemVariants} className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="font-semibold text-foreground text-sm font-['Space_Grotesk']">Sessions per Month</h2>
              <p className="text-muted-foreground text-xs mt-0.5">Total sessions conducted over 6 months</p>
            </div>
            <span className="text-xs text-muted-foreground">6-month view</span>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={REVENUE_DATA} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.5} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 12, fontSize: 12, boxShadow: '0 8px 24px rgba(0,0,0,0.15)' }}
              />
              <Bar dataKey="sessions" fill="#8B5CF6" radius={[6, 6, 0, 0]} maxBarSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
};

export default MentorDashboard;
