import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, TrendingUp, DollarSign, Shield, BarChart3, Plus, Edit, Trash2, CheckCircle, XCircle, Eye, Search, Filter } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import DashboardLayout from '@/components/layout/DashboardLayout';
import StatCard from '@/components/features/StatCard';
import { BLOG_POSTS, MENTORS, DEMO_USERS } from '@/lib/mockData';
import { toast } from 'sonner';

const PLATFORM_STATS = [
  { month: 'Jan', users: 8200, revenue: 980000 },
  { month: 'Feb', users: 11400, revenue: 1340000 },
  { month: 'Mar', users: 15600, revenue: 1820000 },
  { month: 'Apr', users: 22000, revenue: 2600000 },
  { month: 'May', users: 31000, revenue: 3400000 },
  { month: 'Jun', users: 42000, revenue: 4800000 },
];

const PENDING_VERIFICATIONS = [
  { id: 1, name: 'Dr. Meera Joshi', type: 'Mentor', applied: '2 days ago', expertise: 'FinTech', status: 'pending' },
  { id: 2, name: 'Rahul Kapoor', type: 'Investor', applied: '3 days ago', firm: 'Alpha Fund', status: 'pending' },
  { id: 3, name: 'TechVision Startup', type: 'Startup', applied: '1 day ago', industry: 'SaaS', status: 'pending' },
  { id: 4, name: 'Priya Sharma', type: 'Mentor', applied: '4 days ago', expertise: 'Marketing', status: 'pending' },
];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<'users' | 'blog' | 'verifications'>('users');
  const [searchQuery, setSearchQuery] = useState('');
  const [verifications, setVerifications] = useState(PENDING_VERIFICATIONS);
  const [blogs, setBlogs] = useState(BLOG_POSTS);

  const handleVerify = (id: number, action: 'approve' | 'reject') => {
    setVerifications(prev => prev.map(v => v.id === id ? { ...v, status: action === 'approve' ? 'approved' : 'rejected' } : v));
    toast.success(action === 'approve' ? 'Account approved and notified!' : 'Account rejected');
  };

  const handleDeleteBlog = (id: string) => {
    setBlogs(prev => prev.filter(b => b.id !== id));
    toast.success('Blog post deleted');
  };

  const filteredUsers = DEMO_USERS.filter(u => u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.email.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <DashboardLayout title="Admin Dashboard">
      {/* Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-red-700 to-rose-800 p-6 mb-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {[...Array(8)].map((_, i) => <div key={i} className="absolute rounded-full bg-white" style={{ width: 70 + i * 15, height: 70 + i * 15, top: `${i * 12}%`, right: `${i * 8}%` }} />)}
        </div>
        <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="text-red-100 text-sm mb-1 flex items-center gap-1.5"><Shield className="w-3.5 h-3.5" /> Platform Administration</p>
            <h1 className="text-2xl font-bold text-white">ZeroToOne Admin Panel</h1>
            <p className="text-red-100 text-sm mt-1"><span className="text-white font-bold">4 pending verifications</span> · <span className="text-white font-bold">50,000+ total users</span></p>
          </div>
          <button onClick={() => toast.success('Generating platform report...')} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-red-700 text-sm font-bold hover:bg-red-50 transition-all">
            <BarChart3 className="w-4 h-4" /> Generate Report
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Users" value="50,247" change="+2.4k this week" changeType="positive" icon={Users} iconColor="text-blue-500" gradient="from-blue-500/10 to-blue-500/5" delay={0} />
        <StatCard title="Platform Revenue" value="₹48L" change="+22% MoM" changeType="positive" icon={DollarSign} iconColor="text-green-500" gradient="from-green-500/10 to-green-500/5" delay={0.1} />
        <StatCard title="Active Startups" value="3,847" change="+180 this month" changeType="positive" icon={TrendingUp} iconColor="text-orange-500" gradient="from-orange-500/10 to-orange-500/5" delay={0.2} />
        <StatCard title="Verified Mentors" value="487" change="4 pending review" changeType="neutral" icon={Shield} iconColor="text-purple-500" gradient="from-purple-500/10 to-purple-500/5" delay={0.3} />
      </div>

      {/* Platform Growth */}
      <div className="rounded-2xl border border-border bg-card p-5 mb-6">
        <h2 className="font-semibold text-foreground mb-4">Platform Growth</h2>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={PLATFORM_STATS} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="usersGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="revGrad2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
            <YAxis yAxisId="left" tickFormatter={v => `${(v/1000).toFixed(0)}k`} tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
            <YAxis yAxisId="right" orientation="right" tickFormatter={v => `₹${(v/100000).toFixed(0)}L`} tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
            <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 12, fontSize: 12 }} />
            <Area yAxisId="left" type="monotone" dataKey="users" stroke="#EF4444" strokeWidth={2} fill="url(#usersGrad)" name="Users" />
            <Area yAxisId="right" type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={2} fill="url(#revGrad2)" name="Revenue" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-4">
        {([
          { key: 'verifications', label: 'Verifications', count: verifications.filter(v => v.status === 'pending').length },
          { key: 'users', label: 'Users' },
          { key: 'blog', label: 'Blog Management' },
        ] as const).map(t => (
          <button key={t.key} onClick={() => setActiveTab(t.key)} className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all ${activeTab === t.key ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}>
            {t.label}
            {'count' in t && t.count > 0 && <span className="w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">{t.count}</span>}
          </button>
        ))}
      </div>

      {/* Verifications */}
      {activeTab === 'verifications' && (
        <div className="rounded-2xl border border-border bg-card p-5">
          <h2 className="font-semibold text-foreground mb-4">Pending Verifications</h2>
          <div className="space-y-3">
            {verifications.map((v) => (
              <div key={v.id} className="flex items-center gap-4 p-4 rounded-xl border border-border hover:border-primary/30 transition-all">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${v.type === 'Mentor' ? 'bg-yellow-500/10' : v.type === 'Investor' ? 'bg-green-500/10' : 'bg-blue-500/10'}`}>
                  <Shield className={`w-5 h-5 ${v.type === 'Mentor' ? 'text-yellow-500' : v.type === 'Investor' ? 'text-green-500' : 'text-blue-500'}`} />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-foreground text-sm">{v.name}</p>
                  <p className="text-xs text-muted-foreground">{v.type} · Applied {v.applied}</p>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-xs ${
                  v.status === 'pending' ? 'bg-orange-500/10 text-orange-500' :
                  v.status === 'approved' ? 'bg-green-500/10 text-green-500' :
                  'bg-red-500/10 text-red-500'
                }`}>{v.status}</span>
                {v.status === 'pending' && (
                  <div className="flex gap-2">
                    <button onClick={() => handleVerify(v.id, 'approve')} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/10 text-green-500 hover:bg-green-500 hover:text-white text-xs font-semibold transition-all">
                      <CheckCircle className="w-3.5 h-3.5" /> Approve
                    </button>
                    <button onClick={() => handleVerify(v.id, 'reject')} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white text-xs font-semibold transition-all">
                      <XCircle className="w-3.5 h-3.5" /> Reject
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Users */}
      {activeTab === 'users' && (
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-foreground">User Management</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search users..." className="pl-8 pr-4 py-2 rounded-xl border border-border bg-background text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary w-48" />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  {['Name', 'Email', 'Role', 'Location', 'Joined', 'Actions'].map(h => (
                    <th key={h} className="pb-3 text-left text-xs font-semibold text-muted-foreground">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-muted/30 transition-all">
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-2.5">
                        <img src={u.avatar} alt={u.name} className="w-8 h-8 rounded-full bg-muted" />
                        <span className="text-sm font-medium text-foreground">{u.name}</span>
                      </div>
                    </td>
                    <td className="py-3 pr-4 text-xs text-muted-foreground">{u.email}</td>
                    <td className="py-3 pr-4">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${
                        u.role === 'founder' ? 'bg-blue-500/10 text-blue-500' :
                        u.role === 'mentor' ? 'bg-yellow-500/10 text-yellow-500' :
                        u.role === 'investor' ? 'bg-green-500/10 text-green-500' :
                        u.role === 'admin' ? 'bg-red-500/10 text-red-500' :
                        'bg-orange-500/10 text-orange-500'
                      }`}>{u.role}</span>
                    </td>
                    <td className="py-3 pr-4 text-xs text-muted-foreground">{u.location}</td>
                    <td className="py-3 pr-4 text-xs text-muted-foreground">{u.createdAt}</td>
                    <td className="py-3">
                      <div className="flex gap-2">
                        <button onClick={() => toast.info(`Viewing ${u.name}'s profile`)} className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-all"><Eye className="w-3.5 h-3.5" /></button>
                        <button onClick={() => toast.info(`Editing ${u.name}'s account`)} className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-all"><Edit className="w-3.5 h-3.5" /></button>
                        <button onClick={() => toast.error(`Are you sure? This would delete ${u.name}`)} className="p-1.5 rounded-lg hover:bg-red-500/10 text-muted-foreground hover:text-red-500 transition-all"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Blog */}
      {activeTab === 'blog' && (
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-foreground">Blog Management</h2>
            <button onClick={() => toast.success('Opening blog editor...')} className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-all">
              <Plus className="w-4 h-4" /> New Post
            </button>
          </div>
          <div className="space-y-3">
            {blogs.map((post) => (
              <div key={post.id} className="flex items-center gap-4 p-4 rounded-xl border border-border hover:border-primary/30 transition-all">
                <img src={post.thumbnail} alt={post.title} className="w-16 h-10 rounded-lg object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground text-sm truncate">{post.title}</p>
                  <p className="text-xs text-muted-foreground">{post.author} · {post.publishedAt} · {post.views.toLocaleString()} views</p>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-xs">{post.category}</span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${post.featured ? 'bg-orange-500/10 text-orange-500' : 'bg-green-500/10 text-green-500'}`}>{post.featured ? 'Featured' : 'Published'}</span>
                <div className="flex gap-2">
                  <button onClick={() => toast.info('Opening editor...')} className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-all"><Edit className="w-3.5 h-3.5" /></button>
                  <button onClick={() => handleDeleteBlog(post.id)} className="p-1.5 rounded-lg hover:bg-red-500/10 text-muted-foreground hover:text-red-500 transition-all"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default AdminDashboard;
