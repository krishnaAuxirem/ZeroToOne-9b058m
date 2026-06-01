import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Search, Users, Plus, Heart, Share2, Bookmark, ThumbsUp, Send } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { toast } from 'sonner';

const POSTS = [
  { id: 1, author: 'Rohan Malhotra', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=rohan', startup: 'LogiTrack', time: '2h ago', content: 'Just closed our pre-seed round of ₹3.5Cr! Thank you to ZeroToOne community for the connections. The journey from idea to funded in 4 months was only possible because of the support here 🙏', likes: 124, comments: 34, bookmarks: 18, category: 'Milestone' },
  { id: 2, author: 'Priya Krishnan', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=priyak', startup: 'KiddieCare', time: '5h ago', content: 'Question for the community: At what MRR did you start hiring a dedicated sales person? Currently at ₹2.5L MRR but struggling to decide between hiring sales vs. product engineer first.', likes: 67, comments: 42, bookmarks: 31, category: 'Question' },
  { id: 3, author: 'Ishita Shah', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ishita', startup: 'MindCare', time: '1d ago', content: 'Sharing our GTM playbook for health-tech in India. Key insight: Hospital partnerships take 6-9 months but D2C through Instagram can get you to ₹10L MRR in 6 months. Full thread 👇', likes: 218, comments: 61, bookmarks: 95, category: 'Resource' },
  { id: 4, author: 'Vikash Sharma', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=vikash', startup: 'EduPilot', time: '2d ago', content: 'After 50 customer discovery calls, here are my key learnings about the Indian K-12 edtech parent persona. Thread for fellow edtech founders:', likes: 156, comments: 28, bookmarks: 72, category: 'Learning' },
];

const DISCUSSIONS = [
  { title: 'Best banks for startup current accounts in India?', replies: 23, active: '1h ago' },
  { title: 'ESOP structure for early employees — what worked for you?', replies: 47, active: '3h ago' },
  { title: 'How to get your first 100 B2B customers without sales?', replies: 89, active: '5h ago' },
  { title: 'Bootstrapped vs Funded — sharing our experience', replies: 34, active: '8h ago' },
];

const FounderCommunity = () => {
  const [liked, setLiked] = useState<number[]>([]);
  const [bookmarked, setBookmarked] = useState<number[]>([]);
  const [newPost, setNewPost] = useState('');

  return (
    <DashboardLayout title="Community">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Feed */}
        <div className="lg:col-span-2 space-y-4">
          {/* Compose */}
          <div className="rounded-2xl border border-border bg-card p-4">
            <textarea value={newPost} onChange={e => setNewPost(e.target.value)} rows={3} placeholder="Share a milestone, ask a question, or post a resource for the community..." className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary resize-none mb-3" />
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                {['Milestone', 'Question', 'Resource', 'Learning'].map(tag => (
                  <button key={tag} className="px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs hover:bg-primary/10 hover:text-primary transition-all">{tag}</button>
                ))}
              </div>
              <button onClick={() => { if (!newPost.trim()) return; toast.success('Post published!'); setNewPost(''); }} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all">
                <Send className="w-4 h-4" /> Post
              </button>
            </div>
          </div>

          {/* Posts */}
          {POSTS.map((post, i) => (
            <motion.div key={post.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
              className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-start gap-3 mb-3">
                <img src={post.avatar} alt={post.author} className="w-10 h-10 rounded-xl bg-muted flex-shrink-0" />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-foreground text-sm">{post.author}</span>
                    <span className="text-xs text-muted-foreground">· {post.startup}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs ${post.category === 'Milestone' ? 'bg-green-500/10 text-green-500' : post.category === 'Question' ? 'bg-blue-500/10 text-blue-500' : post.category === 'Resource' ? 'bg-purple-500/10 text-purple-500' : 'bg-yellow-500/10 text-yellow-500'}`}>{post.category}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{post.time}</span>
                </div>
              </div>
              <p className="text-sm text-foreground leading-relaxed mb-4">{post.content}</p>
              <div className="flex items-center gap-4 pt-3 border-t border-border">
                <button onClick={() => setLiked(prev => prev.includes(post.id) ? prev.filter(x => x !== post.id) : [...prev, post.id])}
                  className={`flex items-center gap-1.5 text-sm transition-all ${liked.includes(post.id) ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}>
                  <ThumbsUp className="w-4 h-4" /> {post.likes + (liked.includes(post.id) ? 1 : 0)}
                </button>
                <button onClick={() => toast.success('Opening comments...')} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-all">
                  <MessageSquare className="w-4 h-4" /> {post.comments}
                </button>
                <button onClick={() => setBookmarked(prev => prev.includes(post.id) ? prev.filter(x => x !== post.id) : [...prev, post.id])}
                  className={`flex items-center gap-1.5 text-sm transition-all ${bookmarked.includes(post.id) ? 'text-yellow-500' : 'text-muted-foreground hover:text-yellow-500'}`}>
                  <Bookmark className="w-4 h-4" /> {post.bookmarks}
                </button>
                <button onClick={() => toast.success('Link copied!')} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-all ml-auto">
                  <Share2 className="w-4 h-4" /> Share
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Hot Discussions */}
          <div className="rounded-2xl border border-border bg-card p-5">
            <h3 className="font-semibold text-foreground mb-4">Hot Discussions</h3>
            <div className="space-y-3">
              {DISCUSSIONS.map((d, i) => (
                <div key={i} className="cursor-pointer hover:bg-muted/50 -mx-2 px-2 py-2 rounded-xl transition-all" onClick={() => toast.success('Opening discussion...')}>
                  <p className="text-sm text-foreground font-medium mb-1">{d.title}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <MessageSquare className="w-3 h-3" />{d.replies} replies · {d.active}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Community Stats */}
          <div className="rounded-2xl border border-border bg-card p-5">
            <h3 className="font-semibold text-foreground mb-4">Community</h3>
            <div className="space-y-3 text-sm">
              {[{ label: 'Active Founders', value: '12,400' }, { label: 'Posts This Week', value: '847' }, { label: 'Questions Answered', value: '94%' }, { label: 'Members Online', value: '234' }].map(s => (
                <div key={s.label} className="flex justify-between">
                  <span className="text-muted-foreground">{s.label}</span>
                  <span className="font-bold text-foreground">{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default FounderCommunity;
