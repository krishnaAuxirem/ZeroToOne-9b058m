import { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, Plus, Edit3, Trash2, Eye, Search, FileText, CheckCircle, X } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { BLOG_POSTS } from '@/lib/mockData';
import { toast } from 'sonner';

const AdminBlogs = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [featured, setFeatured] = useState<string[]>(BLOG_POSTS.filter(b => b.featured).map(b => b.id));

  const filtered = BLOG_POSTS.filter(b => (!search || b.title.toLowerCase().includes(search.toLowerCase())) && (filter === 'all' || (filter === 'featured' && featured.includes(b.id))));

  return (
    <DashboardLayout title="Blog Management">
      <div className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[{ label: 'Total Posts', value: BLOG_POSTS.length.toString(), color: 'text-blue-500' }, { label: 'Featured', value: featured.length.toString(), color: 'text-yellow-500' }, { label: 'Total Views', value: `${BLOG_POSTS.reduce((a, b) => a + b.views, 0).toLocaleString()}`, color: 'text-green-500' }, { label: 'Total Likes', value: `${BLOG_POSTS.reduce((a, b) => a + b.likes, 0).toLocaleString()}`, color: 'text-purple-500' }].map(s => (
            <div key={s.label} className="rounded-2xl border border-border bg-card p-4 text-center"><p className={`text-2xl font-bold ${s.color}`}>{s.value}</p><p className="text-xs text-muted-foreground mt-1">{s.label}</p></div>
          ))}
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="relative flex-1 max-w-sm"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" /><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search posts..." className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:border-primary" /></div>
          <div className="flex gap-2">
            {['all', 'featured'].map(f => <button key={f} onClick={() => setFilter(f)} className={`px-3 py-2 rounded-xl text-xs capitalize transition-all ${filter === f ? 'bg-primary text-primary-foreground' : 'border border-border text-muted-foreground'}`}>{f}</button>)}
          </div>
          <button onClick={() => toast.success('Opening blog editor...')} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90"><Plus className="w-4 h-4" /> New Post</button>
        </div>

        <div className="space-y-3">
          {filtered.map((post, i) => (
            <motion.div key={post.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="flex items-center gap-4 p-5 rounded-2xl border border-border bg-card hover:border-primary/30 transition-all">
              <img src={post.thumbnail} alt={post.title} className="w-24 h-16 rounded-xl object-cover flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-foreground text-sm line-clamp-1">{post.title}</span>
                  {featured.includes(post.id) && <span className="px-2 py-0.5 rounded-full bg-yellow-500/10 text-yellow-500 text-xs">Featured</span>}
                </div>
                <p className="text-xs text-muted-foreground">by {post.author} · {post.category} · {post.readTime} · {post.publishedAt}</p>
                <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                  <span>{post.views.toLocaleString()} views</span>
                  <span>{post.likes.toLocaleString()} likes</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => toast.success('Opening post...')} className="p-2 rounded-xl border border-border text-muted-foreground hover:text-foreground hover:bg-muted"><Eye className="w-4 h-4" /></button>
                <button onClick={() => toast.success('Opening editor...')} className="p-2 rounded-xl border border-border text-muted-foreground hover:text-foreground hover:bg-muted"><Edit3 className="w-4 h-4" /></button>
                <button onClick={() => { setFeatured(p => p.includes(post.id) ? p.filter(x => x !== post.id) : [...p, post.id]); toast.success(featured.includes(post.id) ? 'Unfeatured' : 'Featured!'); }} className={`px-3 py-1.5 rounded-xl text-xs transition-all ${featured.includes(post.id) ? 'bg-yellow-500/10 text-yellow-500' : 'border border-border text-muted-foreground hover:bg-muted'}`}>
                  {featured.includes(post.id) ? '★ Unfeature' : '☆ Feature'}
                </button>
                <button onClick={() => toast.error('Post deleted!')} className="p-2 rounded-xl border border-red-500/20 text-red-500 hover:bg-red-500/10"><Trash2 className="w-4 h-4" /></button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminBlogs;
