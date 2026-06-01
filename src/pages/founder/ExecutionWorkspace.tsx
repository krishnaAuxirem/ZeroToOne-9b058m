import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckSquare, Plus, Calendar, Flag, MoreVertical, Circle, CheckCircle2, Clock, Target } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { toast } from 'sonner';

const TASKS_DATA = [
  { id: 1, title: 'Finalize Series A pitch deck', status: 'in_progress', priority: 'high', dueDate: 'Jun 5, 2025', category: 'Fundraising', assignee: 'Arjun' },
  { id: 2, title: 'Schedule 10 investor intro calls', status: 'todo', priority: 'high', dueDate: 'Jun 10, 2025', category: 'Fundraising', assignee: 'Arjun' },
  { id: 3, title: 'Build financial model for Series A', status: 'completed', priority: 'high', dueDate: 'May 30, 2025', category: 'Finance', assignee: 'Sneha' },
  { id: 4, title: 'Launch B2B school pilot program', status: 'in_progress', priority: 'medium', dueDate: 'Jun 20, 2025', category: 'Product', assignee: 'Rahul' },
  { id: 5, title: 'Hire Senior Frontend Engineer', status: 'todo', priority: 'medium', dueDate: 'Jun 30, 2025', category: 'Hiring', assignee: 'Arjun' },
  { id: 6, title: 'Set up analytics dashboard', status: 'todo', priority: 'low', dueDate: 'Jul 5, 2025', category: 'Product', assignee: 'Sneha' },
  { id: 7, title: 'Write blog post: PMF journey', status: 'completed', priority: 'low', dueDate: 'May 25, 2025', category: 'Marketing', assignee: 'Priya' },
  { id: 8, title: 'Legal: ESOP pool setup', status: 'in_progress', priority: 'high', dueDate: 'Jun 8, 2025', category: 'Legal', assignee: 'Arjun' },
];

const STATUS_COLORS: Record<string, string> = { todo: 'text-muted-foreground', in_progress: 'text-blue-500', completed: 'text-green-500' };
const PRIORITY_COLORS: Record<string, string> = { high: 'bg-red-500/10 text-red-500', medium: 'bg-yellow-500/10 text-yellow-500', low: 'bg-green-500/10 text-green-500' };

const FounderExecutionWorkspace = () => {
  const [filter, setFilter] = useState('all');
  const [tasks, setTasks] = useState(TASKS_DATA);
  const [newTask, setNewTask] = useState('');
  const [showAdd, setShowAdd] = useState(false);

  const toggleTask = (id: number) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status: t.status === 'completed' ? 'todo' : 'completed' } : t));
  };

  const addTask = () => {
    if (!newTask.trim()) return;
    setTasks(prev => [...prev, { id: Date.now(), title: newTask, status: 'todo', priority: 'medium', dueDate: 'TBD', category: 'General', assignee: 'Arjun' }]);
    setNewTask('');
    setShowAdd(false);
    toast.success('Task added!');
  };

  const filtered = filter === 'all' ? tasks : tasks.filter(t => t.status === filter);

  const counts = {
    all: tasks.length,
    todo: tasks.filter(t => t.status === 'todo').length,
    in_progress: tasks.filter(t => t.status === 'in_progress').length,
    completed: tasks.filter(t => t.status === 'completed').length,
  };

  return (
    <DashboardLayout title="Execution Workspace">
      <div className="space-y-6">
        {/* Progress */}
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-foreground">Weekly Progress</h3>
            <span className="text-sm font-bold text-primary">{Math.round((counts.completed / tasks.length) * 100)}% complete</span>
          </div>
          <div className="h-2.5 rounded-full bg-muted overflow-hidden mb-3">
            <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-green-500 transition-all" style={{ width: `${Math.round((counts.completed / tasks.length) * 100)}%` }} />
          </div>
          <div className="flex gap-6 text-sm">
            {[{ label: 'To Do', count: counts.todo, color: 'text-muted-foreground' }, { label: 'In Progress', count: counts.in_progress, color: 'text-blue-500' }, { label: 'Done', count: counts.completed, color: 'text-green-500' }].map(s => (
              <div key={s.label} className="flex items-center gap-1.5">
                <span className={`font-bold ${s.color}`}>{s.count}</span>
                <span className="text-muted-foreground text-xs">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Actions & Filters */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex gap-2">
            {[{ id: 'all', label: `All (${counts.all})` }, { id: 'todo', label: `To Do (${counts.todo})` }, { id: 'in_progress', label: `In Progress (${counts.in_progress})` }, { id: 'completed', label: `Done (${counts.completed})` }].map(f => (
              <button key={f.id} onClick={() => setFilter(f.id)} className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${filter === f.id ? 'bg-primary text-primary-foreground' : 'border border-border text-muted-foreground'}`}>{f.label}</button>
            ))}
          </div>
          <button onClick={() => setShowAdd(!showAdd)} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all">
            <Plus className="w-4 h-4" /> Add Task
          </button>
        </div>

        {/* Add Task */}
        {showAdd && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="flex gap-3">
            <input value={newTask} onChange={e => setNewTask(e.target.value)} onKeyDown={e => e.key === 'Enter' && addTask()} placeholder="Task title..." className="flex-1 px-4 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:border-primary" autoFocus />
            <button onClick={addTask} className="px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90">Add</button>
            <button onClick={() => setShowAdd(false)} className="px-4 py-2.5 rounded-xl border border-border text-muted-foreground text-sm">Cancel</button>
          </motion.div>
        )}

        {/* Task List */}
        <div className="space-y-2">
          {filtered.map((task, i) => (
            <motion.div key={task.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
              className={`flex items-center gap-4 p-4 rounded-xl border border-border bg-card hover:border-primary/30 transition-all ${task.status === 'completed' ? 'opacity-60' : ''}`}>
              <button onClick={() => toggleTask(task.id)} className={`flex-shrink-0 ${STATUS_COLORS[task.status]}`}>
                {task.status === 'completed' ? <CheckCircle2 className="w-5 h-5" /> : task.status === 'in_progress' ? <Circle className="w-5 h-5 border-2 border-blue-500 rounded-full text-transparent" /> : <Circle className="w-5 h-5" />}
              </button>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium ${task.status === 'completed' ? 'line-through text-muted-foreground' : 'text-foreground'}`}>{task.title}</p>
                <div className="flex items-center gap-3 mt-0.5 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{task.dueDate}</span>
                  <span>{task.category}</span>
                  <span>· {task.assignee}</span>
                </div>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0 ${PRIORITY_COLORS[task.priority]}`}>{task.priority}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default FounderExecutionWorkspace;
