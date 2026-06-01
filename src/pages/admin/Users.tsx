import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Search, Filter, Edit3, Trash2, Shield, Eye, UserCheck, UserX, MoreVertical } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { DEMO_USERS } from '@/lib/mockData';
import { toast } from 'sonner';

const ALL_USERS = [
  ...DEMO_USERS,
  { id: '6', email: 'priya.k@gmail.com', name: 'Priya Krishnan', role: 'founder' as const, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=priyak', bio: '', company: 'KiddieCare', location: 'Mumbai', skills: [], createdAt: '2024-03-10' },
  { id: '7', email: 'rohan.m@gmail.com', name: 'Rohan Malhotra', role: 'founder' as const, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=rohan', bio: '', company: 'LogiTrack', location: 'Delhi', skills: [], createdAt: '2024-04-20' },
  { id: '8', email: 'dr.amit@mail.com', name: 'Dr. Amit Desai', role: 'mentor' as const, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=amit', bio: '', company: 'TechScale', location: 'Pune', skills: [], createdAt: '2024-02-15' },
];

const ROLE_COLORS: Record<string, string> = { founder: 'bg-blue-500/10 text-blue-500', mentor: 'bg-purple-500/10 text-purple-500', investor: 'bg-green-500/10 text-green-500', team: 'bg-orange-500/10 text-orange-500', admin: 'bg-red-500/10 text-red-500' };

const AdminUsers = () => {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [banned, setBanned] = useState<string[]>([]);

  const filtered = ALL_USERS.filter(u => {
    const matchSearch = !search || u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === 'all' || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  return (
    <DashboardLayout title="User Management">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {[
            { role: 'All', count: ALL_USERS.length, color: 'text-foreground' },
            { role: 'Founders', count: ALL_USERS.filter(u => u.role === 'founder').length, color: 'text-blue-500' },
            { role: 'Mentors', count: ALL_USERS.filter(u => u.role === 'mentor').length, color: 'text-purple-500' },
            { role: 'Investors', count: ALL_USERS.filter(u => u.role === 'investor').length, color: 'text-green-500' },
            { role: 'Team', count: ALL_USERS.filter(u => u.role === 'team').length, color: 'text-orange-500' },
          ].map(s => (
            <div key={s.role} className="rounded-xl border border-border bg-card p-3 text-center">
              <p className={`text-xl font-bold ${s.color}`}>{s.count}</p>
              <p className="text-xs text-muted-foreground">{s.role}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search users..." className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:border-primary" />
          </div>
          <div className="flex gap-2">
            {['all', 'founder', 'mentor', 'investor', 'team', 'admin'].map(r => (
              <button key={r} onClick={() => setRoleFilter(r)} className={`px-3 py-2 rounded-xl text-xs capitalize transition-all ${roleFilter === r ? 'bg-primary text-primary-foreground' : 'border border-border text-muted-foreground'}`}>{r}</button>
            ))}
          </div>
        </div>

        {/* Users Table */}
        <div className="rounded-2xl border border-border bg-card overflow-hidden">
          <div className="grid grid-cols-[1fr_180px_120px_100px_120px] gap-4 px-5 py-3 border-b border-border bg-muted/30">
            {['User', 'Company', 'Role', 'Joined', 'Actions'].map(h => <span key={h} className="text-xs font-semibold text-muted-foreground uppercase">{h}</span>)}
          </div>
          <div className="divide-y divide-border">
            {filtered.map((user, i) => (
              <motion.div key={user.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                className={`grid grid-cols-[1fr_180px_120px_100px_120px] gap-4 px-5 py-4 items-center hover:bg-muted/20 transition-all ${banned.includes(user.id) ? 'opacity-40' : ''}`}>
                <div className="flex items-center gap-3 min-w-0">
                  <img src={user.avatar} alt="" className="w-9 h-9 rounded-xl bg-muted flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">{user.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground truncate">{user.company || '—'}</span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize w-fit ${ROLE_COLORS[user.role]}`}>{user.role}</span>
                <span className="text-xs text-muted-foreground">{user.createdAt}</span>
                <div className="flex items-center gap-1.5">
                  <button onClick={() => toast.success(`Viewing ${user.name}'s profile...`)} className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-all"><Eye className="w-3.5 h-3.5" /></button>
                  <button onClick={() => toast.success(`Editing ${user.name}...`)} className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-all"><Edit3 className="w-3.5 h-3.5" /></button>
                  <button onClick={() => { setBanned(p => p.includes(user.id) ? p.filter(x => x !== user.id) : [...p, user.id]); toast.info(banned.includes(user.id) ? `${user.name} unbanned` : `${user.name} banned`); }} className={`p-1.5 rounded-lg transition-all ${banned.includes(user.id) ? 'bg-green-500/10 text-green-500 hover:bg-green-500/20' : 'hover:bg-red-500/10 text-muted-foreground hover:text-red-500'}`}>
                    {banned.includes(user.id) ? <UserCheck className="w-3.5 h-3.5" /> : <UserX className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminUsers;
