import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Search, Eye, Edit3, UserX, UserCheck, Briefcase } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { toast } from 'sonner';

const TEAM_MEMBERS = [
  { id: 1, name: 'Sneha Patel', role: 'Senior Frontend Engineer', startup: 'EduVerse', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sneha', email: 'team@zerotoone.com', status: 'active', joinedAt: '2024-02-01', tasks: 24 },
  { id: 2, name: 'Rahul Kumar', role: 'Backend Engineer', startup: 'EduVerse', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=rahulk', email: 'rahul.k@eduverse.in', status: 'active', joinedAt: '2024-03-15', tasks: 18 },
  { id: 3, name: 'Anita Verma', role: 'UI/UX Designer', startup: 'HealthBridge', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=anita', email: 'anita@healthbridge.in', status: 'active', joinedAt: '2024-04-01', tasks: 12 },
  { id: 4, name: 'Karthik Nair', role: 'Data Scientist', startup: 'FinFlow', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=karthik', email: 'karthik@finflow.co', status: 'inactive', joinedAt: '2024-01-20', tasks: 6 },
  { id: 5, name: 'Shreya Mehta', role: 'Growth Manager', startup: 'TalentBridge', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=shreya', email: 'shreya@talentbridge.io', status: 'active', joinedAt: '2024-05-10', tasks: 9 },
];

const AdminTeamMembers = () => {
  const [search, setSearch] = useState('');
  const [banned, setBanned] = useState<number[]>([]);

  const filtered = TEAM_MEMBERS.filter(t => !search || t.name.toLowerCase().includes(search.toLowerCase()) || t.startup.toLowerCase().includes(search.toLowerCase()));

  return (
    <DashboardLayout title="Team Member Management">
      <div className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[{ label: 'Total Members', value: TEAM_MEMBERS.length.toString(), color: 'text-orange-500' }, { label: 'Active', value: TEAM_MEMBERS.filter(t => t.status === 'active').length.toString(), color: 'text-green-500' }, { label: 'Inactive', value: TEAM_MEMBERS.filter(t => t.status === 'inactive').length.toString(), color: 'text-red-500' }, { label: 'Startups Using', value: '3', color: 'text-blue-500' }].map(s => (
            <div key={s.label} className="rounded-2xl border border-border bg-card p-4 text-center"><p className={`text-2xl font-bold ${s.color}`}>{s.value}</p><p className="text-xs text-muted-foreground mt-1">{s.label}</p></div>
          ))}
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search team members..." className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:border-primary" />
        </div>

        <div className="space-y-3">
          {filtered.map((member, i) => (
            <motion.div key={member.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className={`flex items-center gap-4 p-5 rounded-2xl border border-border bg-card hover:border-primary/30 transition-all ${banned.includes(member.id) ? 'opacity-50' : ''}`}>
              <img src={member.avatar} alt={member.name} className="w-12 h-12 rounded-xl bg-muted flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-foreground">{member.name}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs ${member.status === 'active' ? 'bg-green-500/10 text-green-500' : 'bg-muted text-muted-foreground'}`}>{member.status}</span>
                </div>
                <p className="text-xs text-muted-foreground">{member.role} · {member.startup}</p>
              </div>
              <div className="flex items-center gap-6 text-sm">
                <div className="text-center"><p className="font-bold text-foreground">{member.tasks}</p><p className="text-xs text-muted-foreground">Tasks</p></div>
                <span className="text-xs text-muted-foreground">Joined {member.joinedAt}</span>
              </div>
              <div className="flex gap-2">
                <button onClick={() => toast.success('Viewing member profile...')} className="p-2 rounded-xl border border-border text-muted-foreground hover:text-foreground hover:bg-muted"><Eye className="w-4 h-4" /></button>
                <button onClick={() => { setBanned(p => p.includes(member.id) ? p.filter(x => x !== member.id) : [...p, member.id]); toast.info(banned.includes(member.id) ? 'Member reinstated' : `${member.name} banned`); }} className={`p-2 rounded-xl transition-all ${banned.includes(member.id) ? 'bg-green-500/10 text-green-500 border border-green-500/30' : 'border border-border text-muted-foreground hover:bg-red-500/10 hover:text-red-500'}`}>
                  {banned.includes(member.id) ? <UserCheck className="w-4 h-4" /> : <UserX className="w-4 h-4" />}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminTeamMembers;
