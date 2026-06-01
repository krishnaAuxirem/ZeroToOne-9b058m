import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckSquare, Target, Clock, AlertCircle, CheckCircle, Users, Calendar, Activity, TrendingUp } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import StatCard from '@/components/features/StatCard';
import { toast } from 'sonner';

const MY_TASKS = [
  { id: 1, title: 'Implement user authentication module', project: 'EduVerse', status: 'in_progress', priority: 'high', due: 'Jun 5', assignee: 'Sneha Patel' },
  { id: 2, title: 'Design new onboarding flow', project: 'EduVerse', status: 'todo', priority: 'medium', due: 'Jun 8', assignee: 'Sneha Patel' },
  { id: 3, title: 'Fix payment gateway bug #234', project: 'EduVerse', status: 'completed', priority: 'high', due: 'Done', assignee: 'Sneha Patel' },
  { id: 4, title: 'Write API documentation', project: 'EduVerse', status: 'todo', priority: 'low', due: 'Jun 12', assignee: 'Sneha Patel' },
  { id: 5, title: 'Code review: PR #89', project: 'EduVerse', status: 'in_progress', priority: 'medium', due: 'Jun 4', assignee: 'Sneha Patel' },
];

const TEAM_MEMBERS = [
  { name: 'Arjun Sharma', role: 'Founder/CEO', tasks: 12, completed: 8, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=arjun' },
  { name: 'Sneha Patel', role: 'Full-Stack Engineer', tasks: 15, completed: 11, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sneha' },
  { name: 'Rohit Kumar', role: 'Product Designer', tasks: 9, completed: 7, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=rohit' },
  { name: 'Priya Joshi', role: 'Marketing Lead', tasks: 11, completed: 6, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=priyaj' },
];

const MILESTONES = [
  { title: 'Beta Launch', date: 'Jun 30, 2025', status: 'in_progress', progress: 65 },
  { title: 'First 100 Paying Users', date: 'Jul 15, 2025', status: 'pending', progress: 40 },
  { title: 'Seed Round Close', date: 'Aug 1, 2025', status: 'pending', progress: 20 },
];

const TeamDashboard = () => {
  const [taskFilter, setTaskFilter] = useState<string>('all');

  const filtered = taskFilter === 'all' ? MY_TASKS : MY_TASKS.filter(t => t.status === taskFilter);
  const completedCount = MY_TASKS.filter(t => t.status === 'completed').length;
  const inProgressCount = MY_TASKS.filter(t => t.status === 'in_progress').length;
  const todoCount = MY_TASKS.filter(t => t.status === 'todo').length;

  const updateStatus = (id: number, newStatus: string) => {
    toast.success(`Task status updated to ${newStatus}`);
  };

  return (
    <DashboardLayout title="Team Dashboard">
      {/* Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-orange-600 to-amber-700 p-6 mb-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {[...Array(8)].map((_, i) => <div key={i} className="absolute rounded-full bg-white" style={{ width: 60 + i * 15, height: 60 + i * 15, top: `${i * 12}%`, right: `${i * 8}%` }} />)}
        </div>
        <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="text-orange-100 text-sm mb-1 flex items-center gap-1.5"><Users className="w-3.5 h-3.5" /> Team Member Portal</p>
            <h1 className="text-2xl font-bold text-white">EduVerse — Engineering Team</h1>
            <p className="text-orange-100 text-sm mt-1">Sprint 8 · <span className="text-white font-bold">{completedCount}/{MY_TASKS.length} tasks done</span> · Beta launch in 27 days</p>
          </div>
          <button onClick={() => toast.success('Joined standup meeting!')} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-orange-700 text-sm font-bold hover:bg-orange-50 transition-all">
            <Users className="w-4 h-4" /> Join Daily Standup
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="My Tasks" value={MY_TASKS.length} change={`${completedCount} done`} changeType="positive" icon={CheckSquare} iconColor="text-orange-500" gradient="from-orange-500/10 to-orange-500/5" delay={0} />
        <StatCard title="In Progress" value={inProgressCount} change="Active now" changeType="neutral" icon={Clock} iconColor="text-blue-500" gradient="from-blue-500/10 to-blue-500/5" delay={0.1} />
        <StatCard title="Completion Rate" value={`${Math.round((completedCount / MY_TASKS.length) * 100)}%`} change="This sprint" changeType="positive" icon={TrendingUp} iconColor="text-green-500" gradient="from-green-500/10 to-green-500/5" delay={0.2} />
        <StatCard title="Team Members" value={TEAM_MEMBERS.length} change="All active" changeType="positive" icon={Users} iconColor="text-purple-500" gradient="from-purple-500/10 to-purple-500/5" delay={0.3} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* My Tasks */}
        <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-foreground">My Tasks</h2>
            <div className="flex gap-1">
              {[
                { key: 'all', label: 'All', count: MY_TASKS.length },
                { key: 'todo', label: 'Todo', count: todoCount },
                { key: 'in_progress', label: 'Active', count: inProgressCount },
                { key: 'completed', label: 'Done', count: completedCount },
              ].map(f => (
                <button key={f.key} onClick={() => setTaskFilter(f.key)} className={`px-2.5 py-1 rounded-lg text-xs transition-all flex items-center gap-1 ${taskFilter === f.key ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                  {f.label} <span className={`${taskFilter === f.key ? 'bg-white/20' : 'bg-background'} px-1.5 rounded-full`}>{f.count}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-2.5">
            {filtered.map((task) => (
              <div key={task.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 group transition-all border border-transparent hover:border-border">
                <button onClick={() => updateStatus(task.id, task.status === 'completed' ? 'todo' : 'completed')} className="flex-shrink-0">
                  {task.status === 'completed' ? <CheckCircle className="w-4 h-4 text-green-500" /> : task.status === 'in_progress' ? <Clock className="w-4 h-4 text-blue-500" /> : <AlertCircle className="w-4 h-4 text-orange-400" />}
                </button>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm ${task.status === 'completed' ? 'line-through text-muted-foreground' : 'text-foreground'}`}>{task.title}</p>
                  <p className="text-xs text-muted-foreground">{task.project}</p>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0 ${task.priority === 'high' ? 'bg-red-500/10 text-red-500' : task.priority === 'medium' ? 'bg-orange-500/10 text-orange-500' : 'bg-muted text-muted-foreground'}`}>{task.priority}</span>
                <span className="text-xs text-muted-foreground flex-shrink-0">{task.due}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Team Overview */}
        <div className="rounded-2xl border border-border bg-card p-5">
          <h2 className="font-semibold text-foreground mb-4">Team Overview</h2>
          <div className="space-y-4">
            {TEAM_MEMBERS.map((member, i) => (
              <div key={i} className="flex items-center gap-3">
                <img src={member.avatar} alt={member.name} className="w-9 h-9 rounded-full bg-muted flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{member.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{member.role}</p>
                  <div className="mt-1 h-1.5 rounded-full bg-muted overflow-hidden">
                    <div className="h-full rounded-full bg-orange-500" style={{ width: `${(member.completed / member.tasks) * 100}%` }} />
                  </div>
                </div>
                <span className="text-xs text-muted-foreground flex-shrink-0">{member.completed}/{member.tasks}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Milestones */}
      <div className="rounded-2xl border border-border bg-card p-5">
        <h2 className="font-semibold text-foreground mb-4">Sprint Milestones</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {MILESTONES.map((m, i) => (
            <div key={i} className="p-4 rounded-xl border border-border hover:border-orange-500/30 transition-all">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-foreground text-sm">{m.title}</h3>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${m.status === 'in_progress' ? 'bg-blue-500/10 text-blue-500' : m.status === 'completed' ? 'bg-green-500/10 text-green-500' : 'bg-muted text-muted-foreground'}`}>{m.status.replace('_', ' ')}</span>
              </div>
              <div className="mb-2">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-semibold text-foreground">{m.progress}%</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${m.progress}%` }} transition={{ duration: 1 }} className={`h-full rounded-full ${m.progress >= 70 ? 'bg-green-500' : 'bg-orange-500'}`} />
                </div>
              </div>
              <p className="text-xs text-muted-foreground flex items-center gap-1"><Calendar className="w-3 h-3" /> Target: {m.date}</p>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TeamDashboard;
