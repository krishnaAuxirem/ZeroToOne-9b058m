import { motion } from 'framer-motion';
import { Activity, TrendingUp, CheckCircle, Clock, Award, BarChart3 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import DashboardLayout from '@/components/layout/DashboardLayout';

const WEEKLY_TASKS = [
  { day: 'Mon', completed: 8, total: 10 },
  { day: 'Tue', completed: 12, total: 12 },
  { day: 'Wed', completed: 6, total: 9 },
  { day: 'Thu', completed: 15, total: 15 },
  { day: 'Fri', completed: 9, total: 11 },
  { day: 'Sat', completed: 3, total: 4 },
  { day: 'Sun', completed: 0, total: 0 },
];

const MONTHLY_VELOCITY = [
  { week: 'W1', points: 42 }, { week: 'W2', points: 56 }, { week: 'W3', points: 48 }, { week: 'W4', points: 63 },
];

const CONTRIBUTIONS = [
  { category: 'Code Reviews', count: 24, color: 'bg-blue-500' },
  { category: 'PRs Merged', count: 18, color: 'bg-green-500' },
  { category: 'Bugs Fixed', count: 12, color: 'bg-red-500' },
  { category: 'Features Built', count: 8, color: 'bg-purple-500' },
  { category: 'Docs Written', count: 5, color: 'bg-orange-500' },
];

const TeamProgress = () => {
  const totalCompleted = WEEKLY_TASKS.reduce((a, d) => a + d.completed, 0);
  const totalTasks = WEEKLY_TASKS.reduce((a, d) => a + d.total, 0);
  const completionRate = Math.round((totalCompleted / totalTasks) * 100);

  return (
    <DashboardLayout title="Progress Tracking">
      <div className="space-y-6">
        {/* KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Tasks This Week', value: `${totalCompleted}/${totalTasks}`, color: 'text-blue-500' },
            { label: 'Completion Rate', value: `${completionRate}%`, color: 'text-green-500' },
            { label: 'Story Points', value: '63', color: 'text-purple-500' },
            { label: 'Streak', value: '12 days', color: 'text-orange-500' },
          ].map(s => (
            <div key={s.label} className="rounded-2xl border border-border bg-card p-4 text-center">
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Weekly Task Completion */}
        <div className="rounded-2xl border border-border bg-card p-5">
          <h3 className="font-semibold text-foreground mb-4">Daily Task Completion</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={WEEKLY_TASKS}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
              <YAxis tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
              <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 8, fontSize: 12 }} />
              <Bar dataKey="total" fill="hsl(var(--muted))" radius={[4, 4, 0, 0]} name="Total" />
              <Bar dataKey="completed" fill="#3B82F6" radius={[4, 4, 0, 0]} name="Completed" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Velocity + Contributions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-border bg-card p-5">
            <h3 className="font-semibold text-foreground mb-4">Sprint Velocity</h3>
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={MONTHLY_VELOCITY}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="week" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
                <YAxis tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
                <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 8, fontSize: 12 }} />
                <Line type="monotone" dataKey="points" stroke="#8B5CF6" strokeWidth={2} dot={{ fill: '#8B5CF6' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5">
            <h3 className="font-semibold text-foreground mb-4">My Contributions (This Month)</h3>
            <div className="space-y-3">
              {CONTRIBUTIONS.map(c => (
                <div key={c.category}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">{c.category}</span>
                    <span className="font-semibold text-foreground">{c.count}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                    <div className={`h-full rounded-full ${c.color}`} style={{ width: `${(c.count / 24) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="rounded-2xl border border-border bg-card p-5">
          <h3 className="font-semibold text-foreground mb-4">Recent Achievements</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { badge: '12-Day Streak', color: 'text-orange-500 bg-orange-500/10' },
              { badge: 'Sprint Hero', color: 'text-blue-500 bg-blue-500/10' },
              { badge: '100% This Week', color: 'text-green-500 bg-green-500/10' },
              { badge: 'Top Reviewer', color: 'text-purple-500 bg-purple-500/10' },
            ].map(b => (
              <div key={b.badge} className={`flex items-center gap-2 p-3 rounded-xl ${b.color}`}>
                <Award className="w-4 h-4 flex-shrink-0" />
                <span className="text-xs font-semibold">{b.badge}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TeamProgress;
