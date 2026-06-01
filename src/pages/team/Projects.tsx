import { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Users, TrendingUp, Clock, Calendar, MapPin, CheckCircle, Circle } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { toast } from 'sonner';

const PROJECTS = [
  { id: 1, name: 'EduVerse Platform v2.0', role: 'Senior Frontend Engineer', lead: 'Arjun Sharma', status: 'active', progress: 65, dueDate: 'Jul 15, 2025', team: 6, priority: 'high', description: 'Complete rebuild of student dashboard with AI-powered learning paths and new analytics.' },
  { id: 2, name: 'AI Recommendation Engine', role: 'Frontend Integration', lead: 'Rahul Kumar', status: 'active', progress: 40, dueDate: 'Aug 1, 2025', team: 4, priority: 'high', description: 'Integrate ML recommendations into the product discovery and course suggestion flows.' },
  { id: 3, name: 'B2B School Portal', role: 'Lead Frontend', lead: 'Priya Nair', status: 'planning', progress: 10, dueDate: 'Sep 1, 2025', team: 3, priority: 'medium', description: 'Dedicated portal for school administrators to manage student accounts and track progress.' },
  { id: 4, name: 'Mobile App MVP', role: 'React Native Dev', lead: 'Sneha Patel', status: 'completed', progress: 100, dueDate: 'May 30, 2025', team: 5, priority: 'high', description: 'Initial mobile app for iOS and Android covering core learning features.' },
];

const PRIORITY_COLOR: Record<string, string> = { high: 'bg-red-500/10 text-red-500', medium: 'bg-yellow-500/10 text-yellow-500', low: 'bg-green-500/10 text-green-500' };
const STATUS_COLOR: Record<string, string> = { active: 'bg-blue-500/10 text-blue-500', planning: 'bg-purple-500/10 text-purple-500', completed: 'bg-green-500/10 text-green-500' };

const TeamProjects = () => {
  const [filter, setFilter] = useState('all');
  const filtered = filter === 'all' ? PROJECTS : PROJECTS.filter(p => p.status === filter);

  return (
    <DashboardLayout title="Assigned Projects">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Active Projects', value: PROJECTS.filter(p => p.status === 'active').length.toString(), color: 'text-blue-500' },
            { label: 'Avg Progress', value: `${Math.round(PROJECTS.reduce((a, p) => a + p.progress, 0) / PROJECTS.length)}%`, color: 'text-green-500' },
            { label: 'Teams Involved', value: '3', color: 'text-purple-500' },
            { label: 'Completed', value: PROJECTS.filter(p => p.status === 'completed').length.toString(), color: 'text-orange-500' },
          ].map(s => (
            <div key={s.label} className="rounded-2xl border border-border bg-card p-4 text-center">
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex gap-2">
          {['all', 'active', 'planning', 'completed'].map(f => (
            <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-xl text-sm capitalize transition-all ${filter === f ? 'bg-primary text-primary-foreground' : 'border border-border text-muted-foreground'}`}>
              {f} ({f === 'all' ? PROJECTS.length : PROJECTS.filter(p => p.status === f).length})
            </button>
          ))}
        </div>

        {/* Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((proj, i) => (
            <motion.div key={proj.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
              className="p-6 rounded-2xl border border-border bg-card hover:border-primary/30 transition-all">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-bold text-foreground">{proj.name}</h3>
                  <p className="text-xs text-muted-foreground">Your role: {proj.role}</p>
                </div>
                <div className="flex gap-2">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${PRIORITY_COLOR[proj.priority]}`}>{proj.priority}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_COLOR[proj.status]}`}>{proj.status}</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{proj.description}</p>
              <div className="mb-3">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-semibold text-foreground">{proj.progress}%</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div className={`h-full rounded-full transition-all ${proj.progress === 100 ? 'bg-green-500' : 'bg-primary'}`} style={{ width: `${proj.progress}%` }} />
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />Due: {proj.dueDate}</span>
                <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{proj.team} members</span>
                <span className="flex items-center gap-1">Lead: {proj.lead}</span>
              </div>
              {proj.status !== 'completed' && (
                <button onClick={() => toast.success('Opening project workspace...')} className="mt-4 w-full py-2 rounded-xl bg-primary/10 text-primary text-xs font-semibold hover:bg-primary hover:text-white transition-all">
                  Open Workspace
                </button>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TeamProjects;
