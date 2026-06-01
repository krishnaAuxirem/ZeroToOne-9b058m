import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Flag, CheckCircle, XCircle, Eye, AlertCircle, TrendingUp, Users } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { toast } from 'sonner';

const POSTS = [
  { id: 1, author: 'Rohit Verma', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=rohitv', content: 'Just closed our Series A! ₹8Cr from Sequoia. The ZeroToOne community was instrumental in connecting us with the right investors.', flags: 0, status: 'active', time: '2h ago', category: 'Milestone' },
  { id: 2, author: 'Anonymous User', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=anon', content: 'This platform is a scam! The AI copilot gives useless advice and the mentors are overpriced.', flags: 3, status: 'flagged', time: '3h ago', category: 'Complaint' },
  { id: 3, author: 'Priya Sharma', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=priyasha', content: 'Check out this FREE course on Coursera for startup marketing. Link: coursera.org/...', flags: 2, status: 'flagged', time: '5h ago', category: 'Spam' },
  { id: 4, author: 'Vikash Kumar', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=vikash', content: 'Question: How do you price a B2B SaaS product for Indian enterprises? Getting pushback on ₹5,000/user/month.', flags: 0, status: 'active', time: '1d ago', category: 'Question' },
];

const AdminCommunity = () => {
  const [posts, setPosts] = useState(POSTS);
  const [filter, setFilter] = useState('all');

  const handleApprove = (id: number) => {
    setPosts(p => p.map(post => post.id === id ? { ...post, status: 'active', flags: 0 } : post));
    toast.success('Post approved!');
  };

  const handleRemove = (id: number) => {
    setPosts(p => p.filter(post => post.id !== id));
    toast.success('Post removed from community');
  };

  const filtered = filter === 'all' ? posts : posts.filter(p => p.status === filter);

  return (
    <DashboardLayout title="Community Moderation">
      <div className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[{ label: 'Total Posts', value: posts.length.toString(), color: 'text-blue-500' }, { label: 'Flagged', value: posts.filter(p => p.status === 'flagged').length.toString(), color: 'text-red-500' }, { label: 'Active Posts', value: posts.filter(p => p.status === 'active').length.toString(), color: 'text-green-500' }, { label: 'Reports Pending', value: posts.reduce((a, p) => a + p.flags, 0).toString(), color: 'text-orange-500' }].map(s => (
            <div key={s.label} className="rounded-2xl border border-border bg-card p-4 text-center"><p className={`text-2xl font-bold ${s.color}`}>{s.value}</p><p className="text-xs text-muted-foreground mt-1">{s.label}</p></div>
          ))}
        </div>

        <div className="flex gap-2">
          {['all', 'active', 'flagged'].map(f => <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-xl text-sm capitalize transition-all ${filter === f ? 'bg-primary text-primary-foreground' : 'border border-border text-muted-foreground'}`}>{f} ({(f === 'all' ? posts : posts.filter(p => p.status === f)).length})</button>)}
        </div>

        <div className="space-y-4">
          {filtered.map((post, i) => (
            <motion.div key={post.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className={`p-5 rounded-2xl border bg-card transition-all ${post.status === 'flagged' ? 'border-red-500/30' : 'border-border'}`}>
              <div className="flex items-start gap-3 mb-3">
                <img src={post.avatar} alt={post.author} className="w-10 h-10 rounded-xl bg-muted flex-shrink-0" />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-foreground text-sm">{post.author}</span>
                    <span className="text-xs text-muted-foreground">{post.time}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs ${post.status === 'flagged' ? 'bg-red-500/10 text-red-500' : 'bg-green-500/10 text-green-500'}`}>{post.status}</span>
                    {post.flags > 0 && <span className="flex items-center gap-1 text-xs text-red-500"><Flag className="w-3 h-3" />{post.flags} reports</span>}
                  </div>
                  <p className="text-sm text-foreground mt-2 leading-relaxed">{post.content}</p>
                </div>
              </div>
              <div className="flex gap-2 justify-end">
                {post.status === 'flagged' && <button onClick={() => handleApprove(post.id)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-green-500 text-white text-xs font-semibold hover:bg-green-400"><CheckCircle className="w-3.5 h-3.5" /> Approve</button>}
                <button onClick={() => handleRemove(post.id)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-500 text-white text-xs font-semibold hover:bg-red-400"><XCircle className="w-3.5 h-3.5" /> Remove</button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminCommunity;
