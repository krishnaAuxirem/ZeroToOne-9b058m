import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Globe, BookOpen, Users, Edit3, Trash2, Eye, Plus, Search } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { toast } from 'sonner';

const CONTENT_ITEMS = [
  { id: 1, title: 'ZeroToOne Platform Homepage', type: 'Page', status: 'published', lastEdited: 'Jun 1, 2025', author: 'Rahul Gupta' },
  { id: 2, title: 'About Us Page', type: 'Page', status: 'published', lastEdited: 'May 28, 2025', author: 'Rahul Gupta' },
  { id: 3, title: 'Pricing Page Content', type: 'Page', status: 'draft', lastEdited: 'May 25, 2025', author: 'Rahul Gupta' },
  { id: 4, title: 'Startup Academy Overview', type: 'Landing', status: 'published', lastEdited: 'May 20, 2025', author: 'Rahul Gupta' },
  { id: 5, title: 'Success Stories Collection', type: 'Collection', status: 'published', lastEdited: 'May 15, 2025', author: 'Rahul Gupta' },
  { id: 6, title: 'FAQ Documentation', type: 'Page', status: 'review', lastEdited: 'May 10, 2025', author: 'Sneha Patel' },
  { id: 7, title: 'Mentor Marketplace Onboarding Guide', type: 'Guide', status: 'published', lastEdited: 'May 5, 2025', author: 'Priya Nair' },
];

const STATUS_COLORS: Record<string, string> = { published: 'bg-green-500/10 text-green-500', draft: 'bg-muted text-muted-foreground', review: 'bg-yellow-500/10 text-yellow-500' };

const AdminContent = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const filtered = CONTENT_ITEMS.filter(c => (!search || c.title.toLowerCase().includes(search.toLowerCase())) && (filter === 'all' || c.status === filter));

  return (
    <DashboardLayout title="Content Management">
      <div className="space-y-6">
        <div className="grid grid-cols-3 gap-4">
          {[{ label: 'Published', value: CONTENT_ITEMS.filter(c => c.status === 'published').length.toString(), color: 'text-green-500' }, { label: 'Drafts', value: CONTENT_ITEMS.filter(c => c.status === 'draft').length.toString(), color: 'text-muted-foreground' }, { label: 'Under Review', value: CONTENT_ITEMS.filter(c => c.status === 'review').length.toString(), color: 'text-yellow-500' }].map(s => (
            <div key={s.label} className="rounded-2xl border border-border bg-card p-4 text-center"><p className={`text-2xl font-bold ${s.color}`}>{s.value}</p><p className="text-xs text-muted-foreground mt-1">{s.label}</p></div>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="relative flex-1"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" /><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search content..." className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:border-primary" /></div>
          <div className="flex gap-2">{['all', 'published', 'draft', 'review'].map(f => <button key={f} onClick={() => setFilter(f)} className={`px-3 py-2 rounded-xl text-xs capitalize transition-all ${filter === f ? 'bg-primary text-primary-foreground' : 'border border-border text-muted-foreground'}`}>{f}</button>)}</div>
          <button onClick={() => toast.success('Opening content editor...')} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90"><Plus className="w-4 h-4" /> New</button>
        </div>

        <div className="rounded-2xl border border-border bg-card overflow-hidden">
          <div className="divide-y divide-border">
            {filtered.map((item, i) => (
              <motion.div key={item.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
                className="flex items-center gap-4 px-5 py-4 hover:bg-muted/20 transition-all">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground text-sm">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.type} · by {item.author} · {item.lastEdited}</p>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[item.status]}`}>{item.status}</span>
                <div className="flex gap-2">
                  <button onClick={() => toast.success('Previewing...')} className="p-2 rounded-xl border border-border text-muted-foreground hover:text-foreground hover:bg-muted"><Eye className="w-3.5 h-3.5" /></button>
                  <button onClick={() => toast.success('Opening editor...')} className="p-2 rounded-xl border border-border text-muted-foreground hover:text-foreground hover:bg-muted"><Edit3 className="w-3.5 h-3.5" /></button>
                  <button onClick={() => toast.error('Content deleted!')} className="p-2 rounded-xl border border-red-500/20 text-red-500 hover:bg-red-500/10"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminContent;
