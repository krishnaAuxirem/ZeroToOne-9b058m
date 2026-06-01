import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  DollarSign, Users, TrendingUp, Target, ArrowRight, Plus,
  CheckCircle, Clock, AlertCircle, Star, BarChart3, Zap, Rocket
} from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer
} from 'recharts';
import DashboardLayout from '@/components/layout/DashboardLayout';
import StatCard from '@/components/features/StatCard';
import { useAuth } from '@/contexts/AuthContext';
import { CHART_DATA, STARTUPS } from '@/lib/mockData';

const TASKS = [
  { id: 1, title: 'Finalize Q3 investor deck', status: 'in_progress', priority: 'high', due: 'Today' },
  { id: 2, title: 'Review term sheet from Nexus Ventures', status: 'todo', priority: 'high', due: 'Tomorrow' },
  { id: 3, title: 'Submit DPIIT startup registration', status: 'completed', priority: 'medium', due: 'Done' },
  { id: 4, title: 'Schedule CTO interview (3 candidates)', status: 'in_progress', priority: 'medium', due: 'Jun 5' },
  { id: 5, title: 'Update financial model for Series A', status: 'todo', priority: 'high', due: 'Jun 8' },
  { id: 6, title: 'Beta launch product to 100 users', status: 'completed', priority: 'high', due: 'Done' },
];

const MILESTONES = [
  { title: 'Reach 1,000 paying users', progress: 73, target: '1,000', current: '730' },
  { title: 'MRR ₹10 Lakhs', progress: 85, target: '₹10L', current: '₹8.5L' },
  { title: 'Hire 5 engineers', progress: 60, target: '5', current: '3' },
  { title: 'Close Seed Round', progress: 40, target: '₹2Cr', current: '₹80L' },
];

const ACTIVITY = [
  { text: 'Investor Deepak Goenka viewed your pitch deck', time: '2 hours ago', type: 'investor' },
  { text: 'Mentor Dr. Aisha Khan confirmed session for tomorrow', time: '5 hours ago', type: 'mentor' },
  { text: 'New co-founder match: Rohan Verma (CTO profile)', time: '1 day ago', type: 'team' },
  { text: 'Idea Validation Report generated for EduVerse v2', time: '2 days ago', type: 'ai' },
  { text: 'Revenue milestone ₹5L MRR achieved!', time: '3 days ago', type: 'milestone' },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.4, 0, 0.2, 1] } },
};

const FounderDashboard = () => {
  const { user } = useAuth();
  const [taskFilter, setTaskFilter] = useState('all');
  const startup = STARTUPS[0];

  const filteredTasks = taskFilter === 'all' ? TASKS : TASKS.filter(t => t.status === taskFilter);

  const statusIcon = (status: string) => {
    if (status === 'completed') return <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />;
    if (status === 'in_progress') return <Clock className="w-4 h-4 text-blue-500 flex-shrink-0" />;
    return <AlertCircle className="w-4 h-4 text-orange-400 flex-shrink-0" />;
  };

  const priorityBadge = (priority: string) => (
    <span className={`px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0 ${
      priority === 'high' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
      priority === 'medium' ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' :
      'bg-muted text-muted-foreground'
    }`}>{priority}</span>
  );

  const activityDot = (type: string) => {
    const map: Record<string, string> = {
      investor: 'bg-emerald-400',
      mentor: 'bg-yellow-400',
      team: 'bg-blue-400',
      ai: 'bg-purple-400',
      milestone: 'bg-orange-400',
    };
    return map[type] || 'bg-muted-foreground';
  };

  return (
    <DashboardLayout title="Dashboard">
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">

        {/* Welcome Banner */}
        <motion.div variants={itemVariants}>
          <div
            className="relative overflow-hidden rounded-2xl p-6"
            style={{
              background: 'linear-gradient(135deg, rgba(37,99,235,0.35) 0%, rgba(15,23,74,0.9) 50%, rgba(88,28,235,0.2) 100%)',
              border: '1px solid rgba(59,130,246,0.2)',
            }}
          >
            <div className="absolute top-0 right-0 w-72 h-72 rounded-full opacity-[0.07]"
              style={{ background: 'radial-gradient(circle, #3B82F6 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />
            <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="relative flex-shrink-0">
                  <img src={user?.avatar} alt={user?.name} className="w-14 h-14 rounded-2xl ring-2 ring-blue-500/40" />
                  <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-[#0f1749]" />
                </div>
                <div>
                  <p className="text-blue-300 text-sm font-medium mb-0.5">Welcome back</p>
                  <h1 className="text-2xl font-bold text-white font-['Space_Grotesk']">{user?.name || 'Founder'}</h1>
                  <p className="text-blue-200/60 text-sm mt-1">
                    <span className="text-white font-semibold">{startup.name}</span> is growing at{' '}
                    <span className="text-emerald-300 font-bold">+{startup.metrics.growth}% YoY</span>
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    to="/dashboard/founder/ai-copilot"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all"
                    style={{ background: 'rgba(59,130,246,0.25)', border: '1px solid rgba(59,130,246,0.35)' }}
                  >
                    <Zap className="w-4 h-4" /> Ask AI Copilot
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    to="/dashboard/founder/fundraising"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-blue-700 text-sm font-bold hover:bg-blue-50 transition-all"
                  >
                    <Rocket className="w-4 h-4" /> Fundraising
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* KPI Cards */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Monthly Revenue" value={`₹${(startup.metrics.mrr / 100000).toFixed(1)}L`} change="+18%" changeType="positive" icon={DollarSign} iconColor="text-emerald-400" gradient="from-emerald-500/12 to-emerald-500/4" sparkline={[4.5, 5.2, 4.8, 6.2, 7.1, 8.5]} delay={0} />
          <StatCard title="Total Users" value={startup.metrics.users.toLocaleString('en-IN')} change="+24%" changeType="positive" icon={Users} iconColor="text-blue-400" gradient="from-blue-500/12 to-blue-500/4" sparkline={[85, 92, 95, 104, 115, 125]} delay={0.05} />
          <StatCard title="YoY Growth" value={`${startup.metrics.growth}%`} change="+12 pts" changeType="positive" icon={TrendingUp} iconColor="text-purple-400" gradient="from-purple-500/12 to-purple-500/4" badge="STRONG" delay={0.1} />
          <StatCard title="Funding Raised" value={`₹${(startup.fundingRaised / 10000000).toFixed(1)}Cr`} change="₹5Cr target" changeType="neutral" icon={Target} iconColor="text-orange-400" gradient="from-orange-500/12 to-orange-500/4" delay={0.15} />
        </motion.div>

        {/* Revenue Chart + Startup Health */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="font-semibold text-foreground text-sm font-['Space_Grotesk']">Revenue vs Target</h2>
                <p className="text-muted-foreground text-xs mt-0.5">Last 12 months performance</p>
              </div>
              <span className="px-3 py-1 rounded-lg bg-muted text-muted-foreground text-xs">12 months</span>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={CHART_DATA.revenueData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#3B82F6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.5} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
                <YAxis tickFormatter={v => `₹${(v / 100000).toFixed(0)}L`} tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
                <Tooltip formatter={(v: number) => [`₹${(v / 100000).toFixed(1)}L`]} contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 12, fontSize: 12, boxShadow: '0 8px 24px rgba(0,0,0,0.15)' }} />
                <Area type="monotone" dataKey="target" stroke="#F97316" strokeWidth={1.5} strokeDasharray="5 5" fill="none" name="Target" />
                <Area type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={2.5} fill="url(#revGrad)" name="Revenue" dot={false} activeDot={{ r: 5, fill: '#3B82F6', strokeWidth: 2, stroke: '#fff' }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Health Score */}
          <div className="rounded-2xl border border-border bg-card p-5">
            <h2 className="font-semibold text-foreground text-sm font-['Space_Grotesk'] mb-4">Startup Health Score</h2>
            <div className="flex items-center justify-center mb-4">
              <div className="relative w-28 h-28">
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                  <circle cx="50" cy="50" r="38" fill="none" stroke="hsl(var(--muted))" strokeWidth="8" />
                  <motion.circle
                    cx="50" cy="50" r="38" fill="none" stroke="#3B82F6" strokeWidth="8"
                    strokeDasharray="238" strokeLinecap="round"
                    initial={{ strokeDashoffset: 238 }}
                    animate={{ strokeDashoffset: 238 * (1 - 0.80) }}
                    transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold text-foreground font-['Space_Grotesk']">80</span>
                  <span className="text-xs text-muted-foreground">/ 100</span>
                </div>
              </div>
            </div>
            <div className="space-y-2.5">
              {CHART_DATA.startupHealthData.map((d) => (
                <div key={d.metric}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">{d.metric}</span>
                    <span className="font-semibold text-foreground">{d.score}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${d.score}%` }}
                      transition={{ duration: 1, delay: 0.3 }}
                      className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-400"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Tasks + Milestones */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-semibold text-foreground text-sm font-['Space_Grotesk']">Tasks</h2>
                <p className="text-muted-foreground text-xs mt-0.5">{TASKS.filter(t => t.status !== 'completed').length} pending</p>
              </div>
              <div className="flex gap-1.5 p-1 rounded-xl bg-muted">
                {['all', 'todo', 'in_progress', 'completed'].map((f) => (
                  <button
                    key={f}
                    onClick={() => setTaskFilter(f)}
                    className={`px-2.5 py-1 rounded-lg text-xs capitalize transition-all ${taskFilter === f ? 'bg-card text-foreground shadow-sm font-semibold' : 'text-muted-foreground hover:text-foreground'}`}
                  >
                    {f.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-1.5">
              {filteredTasks.map((task, i) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/40 transition-all group cursor-default"
                >
                  {statusIcon(task.status)}
                  <span className={`flex-1 text-sm min-w-0 truncate ${task.status === 'completed' ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                    {task.title}
                  </span>
                  {priorityBadge(task.priority)}
                  <span className="text-xs text-muted-foreground flex-shrink-0">{task.due}</span>
                </motion.div>
              ))}
            </div>
            <Link to="/dashboard/founder/execution-workspace" className="flex items-center gap-1.5 text-xs text-primary mt-3 hover:underline font-medium">
              <Plus className="w-3.5 h-3.5" /> Add Task / View All
            </Link>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5">
            <h2 className="font-semibold text-foreground text-sm font-['Space_Grotesk'] mb-4">Key Milestones</h2>
            <div className="space-y-4">
              {MILESTONES.map((m, i) => (
                <motion.div
                  key={m.title}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-foreground font-medium truncate mr-2">{m.title}</span>
                    <span className="text-muted-foreground flex-shrink-0">{m.current}/{m.target}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${m.progress}%` }}
                      transition={{ duration: 1, delay: i * 0.15 }}
                      className={`h-full rounded-full ${m.progress >= 80 ? 'bg-emerald-500' : m.progress >= 50 ? 'bg-blue-500' : 'bg-orange-500'}`}
                    />
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-1">{m.progress}% complete</p>
                </motion.div>
              ))}
            </div>
            <Link to="/dashboard/founder/startup-validation" className="flex items-center gap-1.5 text-xs text-primary mt-4 hover:underline font-medium">
              View all milestones <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </motion.div>

        {/* User Growth + Activity */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="font-semibold text-foreground text-sm font-['Space_Grotesk']">User Growth</h2>
                <p className="text-muted-foreground text-xs mt-0.5">Monthly active users</p>
              </div>
              <BarChart3 className="w-4 h-4 text-muted-foreground" />
            </div>
            <ResponsiveContainer width="100%" height={170}>
              <BarChart data={CHART_DATA.userGrowth.slice(-6)} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.5} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
                <YAxis tickFormatter={v => `${(v / 1000).toFixed(0)}k`} tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 12, fontSize: 12, boxShadow: '0 8px 24px rgba(0,0,0,0.15)' }} />
                <Bar dataKey="users" fill="#3B82F6" radius={[6, 6, 0, 0]} maxBarSize={40} name="Users" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5">
            <h2 className="font-semibold text-foreground text-sm font-['Space_Grotesk'] mb-4">Activity Feed</h2>
            <div className="space-y-3">
              {ACTIVITY.map((a, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="flex gap-3"
                >
                  <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${activityDot(a.type)}`} />
                  <div>
                    <p className="text-xs text-foreground leading-relaxed">{a.text}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{a.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
};

export default FounderDashboard;
