import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckSquare, Plus, Calendar, Circle, CheckCircle2, Filter, Flag } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { toast } from 'sonner';

const TASKS = [
  { id: 1, title: 'Build student dashboard redesign', project: 'EduVerse v2.0', priority: 'high', status: 'in_progress', dueDate: 'Jun 10' },
  { id: 2, title: 'Integrate AI recommendation API', project: 'AI Engine', priority: 'high', status: 'in_progress', dueDate: 'Jun 15' },
  { id: 3, title: 'Fix login bug on Safari mobile', project: 'EduVerse v2.0', priority: 'medium', status: 'todo', dueDate: 'Jun 6' },
  { id: 4, title: 'Write unit tests for new components', project: 'EduVerse v2.0', priority: 'low', status: 'todo', dueDate: 'Jun 20' },
  { id: 5, title: 'Code review: payment module PR', project: 'B2B Portal', priority: 'medium', status: 'todo', dueDate: 'Jun 7' },
  { id: 6, title: 'Update design system components', project: 'EduVerse v2.0', priority: 'low', status: 'completed', dueDate: 'Jun 3' },
  { id: 7, title: 'Deploy staging environment', project: 'AI Engine', priority: 'high', status: 'completed', dueDate: 'Jun 2' },
];

const PRIORITY_COLORS: Record<string, string> = { high: 'bg-red-500/10 text-red-500', medium: 'bg-yellow-500/10 text-yellow-500', low: 'bg-green-500/10 text-green-500' };

const TeamTasks = () => {
  const [tasks, setTasks] = useState(TASKS);
  const [filter, setFilter] = useState('all');
  const [newTask, setNewTask] = useState('');
  const [showAdd, setShowAdd] = useState(false);

  const toggleTask = (id: number) => setTasks(p => p.map(t => t.id === id ? { ...t, status: t.status === 'completed' ? 'todo' : 'completed' } : t));

  const addTask = () => {
    if (!newTask.trim()) return;
    setTasks(p => [...p, { id: Date.now(), title: newTask, project: 'EduVerse v2.0', priority: 'medium', status: 'todo', dueDate: 'TBD' }]);
    setNewTask('');
    setShowAdd(false);
    toast.success('Task added!');
  };

  const filtered = filter === 'all' ? tasks : tasks.filter(t => t.status === filter);

  return (
    <DashboardLayout title="Tasks">
      <div className="space-y-6">
        {/* Summary */}
        <div className="grid grid-cols-3 gap-4">
          {[{ label: 'To Do', count: tasks.filter(t => t.status === 'todo').length, color: 'text-muted-foreground' }, { label: 'In Progress', count: tasks.filter(t => t.status === 'in_progress').length, color: 'text-blue-500' }, { label: 'Completed', count: tasks.filter(t => t.status === 'completed').length, color: 'text-green-500' }].map(s => (
            <div key={s.label} className="rounded-2xl border border-border bg-card p-4 text-center">
              <p className={`text-2xl font-bold ${s.color}`}>{s.count}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex gap-2">
            {['all', 'todo', 'in_progress', 'completed'].map(f => (
              <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1.5 rounded-xl text-xs capitalize transition-all ${filter === f ? 'bg-primary text-primary-foreground' : 'border border-border text-muted-foreground'}`}>{f.replace('_', ' ')}</button>
            ))}
          </div>
          <button onClick={() => setShowAdd(!showAdd)} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90">
            <Plus className="w-4 h-4" /> Add Task
          </button>
        </div>

        {showAdd && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="flex gap-3">
            <input value={newTask} onChange={e => setNewTask(e.target.value)} onKeyDown={e => e.key === 'Enter' && addTask()} placeholder="New task title..." className="flex-1 px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:border-primary" autoFocus />
            <button onClick={addTask} className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold">Add</button>
            <button onClick={() => setShowAdd(false)} className="px-4 py-2 rounded-xl border border-border text-muted-foreground text-sm">Cancel</button>
          </motion.div>
        )}

        <div className="space-y-2">
          {filtered.map((task, i) => (
            <motion.div key={task.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
              className={`flex items-center gap-4 p-4 rounded-xl border border-border bg-card hover:border-primary/30 transition-all ${task.status === 'completed' ? 'opacity-60' : ''}`}>
              <button onClick={() => toggleTask(task.id)} className={task.status === 'completed' ? 'text-green-500' : 'text-muted-foreground'}>
                {task.status === 'completed' ? <CheckCircle2 className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
              </button>
              <div className="flex-1">
                <p className={`text-sm font-medium ${task.status === 'completed' ? 'line-through text-muted-foreground' : 'text-foreground'}`}>{task.title}</p>
                <div className="flex gap-2 mt-0.5 text-xs text-muted-foreground">
                  <span>{task.project}</span>
                  <span>· Due: {task.dueDate}</span>
                </div>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${PRIORITY_COLORS[task.priority]}`}>{task.priority}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TeamTasks;
