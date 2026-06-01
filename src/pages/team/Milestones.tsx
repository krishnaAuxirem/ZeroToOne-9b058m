import { motion } from 'framer-motion';
import { Target, CheckCircle, Clock, Calendar, TrendingUp, AlertCircle } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { toast } from 'sonner';

const MILESTONES = [
  { id: 1, title: 'Launch Student Dashboard v2.0', project: 'EduVerse Platform', targetDate: 'Jul 15, 2025', progress: 65, status: 'in_progress', tasks: { total: 24, done: 16 }, priority: 'high', description: 'Complete redesign of student-facing dashboard with adaptive learning paths and parent reporting.' },
  { id: 2, title: 'Ship AI Recommendation Feature', project: 'AI Engine', targetDate: 'Aug 1, 2025', progress: 40, status: 'in_progress', tasks: { total: 18, done: 7 }, priority: 'high', description: 'Fully integrated ML-driven content recommendations across the learning platform.' },
  { id: 3, title: 'Onboard 5 School Partners', project: 'B2B School Portal', targetDate: 'Sep 30, 2025', progress: 20, status: 'at_risk', tasks: { total: 30, done: 6 }, priority: 'medium', description: 'Technical integration and onboarding of first 5 school clients on the B2B portal.' },
  { id: 4, title: 'Mobile App v1.0 Release', project: 'Mobile App', targetDate: 'May 30, 2025', progress: 100, status: 'completed', tasks: { total: 42, done: 42 }, priority: 'high', description: 'Initial iOS and Android app covering core learning features for K-12 students.' },
  { id: 5, title: 'Performance Optimization', project: 'EduVerse Platform', targetDate: 'Aug 15, 2025', progress: 15, status: 'todo', tasks: { total: 10, done: 0 }, priority: 'low', description: 'Achieve <2s load times across all pages and 95+ Lighthouse scores.' },
];

const STATUS_CONFIG: Record<string, { label: string; color: string; icon: typeof CheckCircle }> = {
  completed: { label: 'Completed', color: 'bg-green-500/10 text-green-500', icon: CheckCircle },
  in_progress: { label: 'In Progress', color: 'bg-blue-500/10 text-blue-500', icon: Clock },
  at_risk: { label: 'At Risk', color: 'bg-red-500/10 text-red-500', icon: AlertCircle },
  todo: { label: 'Upcoming', color: 'bg-muted text-muted-foreground', icon: Calendar },
};

const TeamMilestones = () => (
  <DashboardLayout title="Milestones">
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Milestones', value: MILESTONES.length.toString(), color: 'text-foreground' },
          { label: 'On Track', value: MILESTONES.filter(m => m.status === 'in_progress').length.toString(), color: 'text-blue-500' },
          { label: 'At Risk', value: MILESTONES.filter(m => m.status === 'at_risk').length.toString(), color: 'text-red-500' },
          { label: 'Completed', value: MILESTONES.filter(m => m.status === 'completed').length.toString(), color: 'text-green-500' },
        ].map(s => (
          <div key={s.label} className="rounded-2xl border border-border bg-card p-4 text-center">
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Timeline */}
      <div className="space-y-4">
        {MILESTONES.map((m, i) => {
          const StatusIcon = STATUS_CONFIG[m.status].icon;
          return (
            <motion.div key={m.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
              className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${STATUS_CONFIG[m.status].color}`}>
                    <StatusIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">{m.title}</h3>
                    <p className="text-xs text-muted-foreground">{m.project}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_CONFIG[m.status].color}`}>{STATUS_CONFIG[m.status].label}</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{m.description}</p>
              <div className="mb-3">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">{m.tasks.done}/{m.tasks.total} tasks complete</span>
                  <span className="font-semibold text-foreground">{m.progress}%</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div className={`h-full rounded-full ${m.status === 'completed' ? 'bg-green-500' : m.status === 'at_risk' ? 'bg-red-500' : 'bg-primary'}`} style={{ width: `${m.progress}%` }} />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Calendar className="w-3.5 h-3.5" />
                  Target: {m.targetDate}
                </div>
                {m.status !== 'completed' && (
                  <button onClick={() => toast.success('Opening milestone details...')} className="text-xs text-primary font-medium hover:underline">View Tasks</button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  </DashboardLayout>
);

export default TeamMilestones;
