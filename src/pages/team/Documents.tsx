import { useState } from 'react';
import { motion } from 'framer-motion';
import { FolderOpen, File, FileText, Search, Upload, Download, Plus, Grid, List, Clock } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { toast } from 'sonner';

const DOCUMENTS = [
  { id: 1, name: 'EduVerse v2.0 PRD', type: 'doc', project: 'EduVerse Platform', size: '1.2 MB', updatedAt: 'Jun 2, 2025', sharedWith: 8, icon: FileText },
  { id: 2, name: 'Sprint 12 Planning Sheet', type: 'sheet', project: 'EduVerse Platform', size: '320 KB', updatedAt: 'Jun 1, 2025', sharedWith: 5, icon: File },
  { id: 3, name: 'AI Engine Technical Spec', type: 'doc', project: 'AI Engine', size: '2.1 MB', updatedAt: 'May 30, 2025', sharedWith: 4, icon: FileText },
  { id: 4, name: 'Design System v3.0', type: 'figma', project: 'EduVerse Platform', size: '8.4 MB', updatedAt: 'May 28, 2025', sharedWith: 12, icon: File },
  { id: 5, name: 'Q2 OKRs & KPIs', type: 'sheet', project: 'All Projects', size: '540 KB', updatedAt: 'May 25, 2025', sharedWith: 15, icon: File },
  { id: 6, name: 'B2B School Portal Wireframes', type: 'figma', project: 'B2B Portal', size: '5.6 MB', updatedAt: 'May 22, 2025', sharedWith: 6, icon: File },
  { id: 7, name: 'API Documentation v2', type: 'doc', project: 'AI Engine', size: '890 KB', updatedAt: 'May 20, 2025', sharedWith: 8, icon: FileText },
];

const TYPE_COLORS: Record<string, string> = { doc: 'text-blue-500 bg-blue-500/10', sheet: 'text-green-500 bg-green-500/10', figma: 'text-purple-500 bg-purple-500/10' };

const TeamDocuments = () => {
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');

  const filtered = DOCUMENTS.filter(d => !search || d.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <DashboardLayout title="Documents">
      <div className="space-y-6">
        {/* Actions */}
        <div className="flex items-center justify-between gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search documents..." className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:border-primary" />
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setViewMode('list')} className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-primary/10 text-primary' : 'hover:bg-muted text-muted-foreground'}`}><List className="w-4 h-4" /></button>
            <button onClick={() => setViewMode('grid')} className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-primary/10 text-primary' : 'hover:bg-muted text-muted-foreground'}`}><Grid className="w-4 h-4" /></button>
            <button onClick={() => toast.success('Upload modal opening...')} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90">
              <Upload className="w-4 h-4" /> Upload
            </button>
          </div>
        </div>

        {viewMode === 'list' ? (
          <div className="rounded-2xl border border-border bg-card overflow-hidden">
            <div className="grid grid-cols-[1fr_160px_100px_80px_120px] gap-4 px-5 py-3 border-b border-border bg-muted/30">
              {['Name', 'Project', 'Size', 'Shared', 'Updated'].map(h => <span key={h} className="text-xs font-semibold text-muted-foreground uppercase">{h}</span>)}
            </div>
            <div className="divide-y divide-border">
              {filtered.map((doc, i) => (
                <motion.div key={doc.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
                  className="grid grid-cols-[1fr_160px_100px_80px_120px] gap-4 px-5 py-3.5 items-center hover:bg-muted/30 transition-all cursor-pointer" onClick={() => toast.success(`Opening ${doc.name}...`)}>
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${TYPE_COLORS[doc.type]}`}>
                      <doc.icon className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium text-foreground">{doc.name}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{doc.project}</span>
                  <span className="text-xs text-muted-foreground">{doc.size}</span>
                  <span className="text-xs text-muted-foreground">{doc.sharedWith} people</span>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />{doc.updatedAt}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((doc, i) => (
              <motion.div key={doc.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="p-4 rounded-2xl border border-border bg-card hover:border-primary/30 transition-all cursor-pointer" onClick={() => toast.success(`Opening ${doc.name}...`)}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${TYPE_COLORS[doc.type]}`}>
                  <doc.icon className="w-5 h-5" />
                </div>
                <p className="font-semibold text-foreground text-sm mb-1 line-clamp-2">{doc.name}</p>
                <p className="text-xs text-muted-foreground mb-2">{doc.size} · {doc.sharedWith} people</p>
                <p className="text-xs text-muted-foreground">{doc.updatedAt}</p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default TeamDocuments;
