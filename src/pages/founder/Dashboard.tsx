import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  DollarSign, Users, TrendingUp, Target, ArrowRight, Plus,
  CheckCircle, Clock, AlertCircle, Star, BarChart3, Zap, Rocket
} from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis
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

const COLORS = ['#3B82F6', '#F97316', '#8B5CF6', '#10B981'];

const FounderDashboard = () => {
  const { user } = useAuth();
  const [taskFilter, setTaskFilter] = useState('all');
  const startup = STARTUPS[0];

  const filteredTasks = taskFilter === 'all' ? TASKS : TASKS.filter(t => t.status === taskFilter);

  const statusIcon = (status: string) => {
    if (status === 'completed') return <CheckCircle className="w-4 h-4 text-green-500" />;
    if (status === 'in_progress') return <Clock className="w-4 h-4 text-blue-500" />;
    return <AlertCircle className="w-4 h-4 text-orange-400" />;
  };

  const priorityBadge = (priority: string) => (
    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
      priority === 'high' ? 'bg-red-500/10 text-red-500' :
      priority === 'medium' ? 'bg-orange-500/10 text-orange-500' :
      'bg-muted text-muted-foreground'
    }`}>{priority}</span>
  );

  return (
    <DashboardLayout title="Founder Dashboard">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 p-6 mb-6">
        <div className="absolute inset-0 opacity-10">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="absolute rounded-full bg-white" style={{ width: 40 + i * 15, height: 40 + i * 15, top: `${i * 10}%`, right: `${i * 8}%`, opacity: 0.1 }} />
          ))}
        </div>
        <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="text-blue-200 text-sm font-medium mb-1">Welcome back</p>
            <h1 className="text-2xl font-bold text-white">{user?.name || 'Founder'}</h1>
            <p className="text-blue-200 text-sm mt-1">Your startup <span className="text-white font-semibold">{startup.name}</span> is growing at <span className="text-green-300 font-bold">+{startup.metrics.growth}% YoY</span></p>
          </div>
          <div className="flex gap-3">
            <Link to="/dashboard/founder/ai-copilot" className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/20 hover:bg-white/30 text-white text-sm font-medium transition-all">
              <Zap className="w-4 h-4" /> Ask AI Copilot
            </Link>
            <Link to="/dashboard/founder/pitch-deck" className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-blue-700 text-sm font-bold hover:bg-blue-50 transition-all">
              <Rocket className="w-4 h-4" /> Build Pitch Deck
            </Link>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Monthly Revenue" value={`₹${(startup.metrics.mrr / 100000).toFixed(1)}L`} change="+18%" changeType="positive" icon={DollarSign} iconColor="text-green-500" gradient="from-green-500/10 to-green-500/5" delay={0} />
        <StatCard title="Total Users" value={startup.metrics.users.toLocaleString('en-IN')} change="+24%" changeType="positive" icon={Users} iconColor="text-blue-500" gradient="from-blue-500/10 to-blue-500/5" delay={0.1} />
        <StatCard title="YoY Growth" value={`${startup.metrics.growth}%`} change="+12pts" changeType="positive" icon={TrendingUp} iconColor="text-purple-500" gradient="from-purple-500/10 to-purple-500/5" delay={0.2} />
        <StatCard title="Funding Raised" value={`₹${(startup.fundingRaised / 10000000).toFixed(1)}Cr`} change="₹5Cr target" changeType="neutral" icon={Target} iconColor="text-orange-500" gradient="from-orange-500/10 to-orange-500/5" delay={0.3} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold text-foreground">Revenue vs Target</h2>
            <span className="text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full">Last 12 months</span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={CHART_DATA.revenueData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
              <YAxis tickFormatter={v => `₹${(v/100000).toFixed(0)}L`} tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
              <Tooltip formatter={(v: number) => [`₹${(v/100000).toFixed(1)}L`]} contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 12, fontSize: 12 }} />
              <Area type="monotone" dataKey="target" stroke="#F97316" strokeWidth={1.5} strokeDasharray="5 5" fill="none" name="Target" />
              <Area type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={2} fill="url(#revGrad)" name="Revenue" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Startup Health */}
        <div className="rounded-2xl border border-border bg-card p-5">
          <h2 className="font-semibold text-foreground mb-4">Startup Health Score</h2>
          <div className="flex items-center justify-center mb-2">
            <div className="relative w-28 h-28">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                <circle cx="50" cy="50" r="40" fill="none" stroke="hsl(var(--muted))" strokeWidth="10" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="#3B82F6" strokeWidth="10" strokeDasharray="251" strokeDashoffset={251 * (1 - 0.80)} strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-foreground">80</span>
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
                  <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-400" style={{ width: `${d.score}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Tasks */}
        <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-foreground">Tasks</h2>
            <div className="flex gap-2">
              {['all', 'todo', 'in_progress', 'completed'].map((f) => (
                <button key={f} onClick={() => setTaskFilter(f)} className={`px-3 py-1 rounded-lg text-xs capitalize transition-all ${taskFilter === f ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}>
                  {f.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-2.5">
            {filteredTasks.map((task) => (
              <div key={task.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-all group">
                {statusIcon(task.status)}
                <span className={`flex-1 text-sm ${task.status === 'completed' ? 'line-through text-muted-foreground' : 'text-foreground'}`}>{task.title}</span>
                {priorityBadge(task.priority)}
                <span className="text-xs text-muted-foreground">{task.due}</span>
              </div>
            ))}
          </div>
          <Link to="/dashboard/founder/tasks" className="flex items-center gap-1 text-xs text-primary mt-3 hover:underline">
            <Plus className="w-3.5 h-3.5" /> Add Task / View All
          </Link>
        </div>

        {/* Milestones */}
        <div className="rounded-2xl border border-border bg-card p-5">
          <h2 className="font-semibold text-foreground mb-4">Key Milestones</h2>
          <div className="space-y-4">
            {MILESTONES.map((m) => (
              <div key={m.title}>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-foreground font-medium line-clamp-1">{m.title}</span>
                  <span className="text-muted-foreground">{m.current} / {m.target}</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${m.progress}%` }}
                    transition={{ duration: 1 }}
                    className={`h-full rounded-full ${m.progress >= 80 ? 'bg-green-500' : m.progress >= 50 ? 'bg-blue-500' : 'bg-orange-500'}`}
                  />
                </div>
                <span className="text-xs text-muted-foreground">{m.progress}% complete</span>
              </div>
            ))}
          </div>
          <Link to="/dashboard/founder/milestones" className="flex items-center gap-1 text-xs text-primary mt-4 hover:underline">
            View All Milestones <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Growth */}
        <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-foreground">User Growth</h2>
            <BarChart3 className="w-4 h-4 text-muted-foreground" />
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={CHART_DATA.userGrowth.slice(-6)} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
              <YAxis tickFormatter={v => `${(v/1000).toFixed(0)}k`} tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
              <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 12, fontSize: 12 }} />
              <Bar dataKey="users" fill="#3B82F6" radius={[4, 4, 0, 0]} name="Users" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Activity Feed */}
        <div className="rounded-2xl border border-border bg-card p-5">
          <h2 className="font-semibold text-foreground mb-4">Activity Feed</h2>
          <div className="space-y-3">
            {ACTIVITY.map((a, i) => (
              <div key={i} className="flex gap-3">
                <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                  a.type === 'investor' ? 'bg-green-500' :
                  a.type === 'mentor' ? 'bg-yellow-500' :
                  a.type === 'team' ? 'bg-blue-500' :
                  a.type === 'milestone' ? 'bg-orange-500' : 'bg-purple-500'
                }`} />
                <div>
                  <p className="text-xs text-foreground">{a.text}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default FounderDashboard;
