import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Search, CheckCircle, XCircle, Eye, Shield } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { MENTORS } from '@/lib/mockData';
import { toast } from 'sonner';

const AdminMentors = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [verified, setVerified] = useState<string[]>(['m1', 'm2', 'm3', 'm4', 'm5', 'm6']);
  const [suspended, setSuspended] = useState<string[]>([]);

  const PENDING = [
    { id: 'mp1', name: 'Dr. Amit Desai', title: 'Tech CTO & Architecture Expert', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=amit2', expertise: ['Tech Architecture', 'AI/ML'], sessions: 0, rating: null, status: 'pending', submittedAt: 'Jun 1, 2025' },
  ];

  const ALL = [...MENTORS.map(m => ({ ...m, status: 'active' })), ...PENDING];
  const filtered = ALL.filter(m => (!search || m.name.toLowerCase().includes(search.toLowerCase())) && (filter === 'all' || filter === m.status));

  return (
    <DashboardLayout title="Mentor Verification">
      <div className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[{ label: 'Total Mentors', value: ALL.length.toString(), color: 'text-purple-500' }, { label: 'Active', value: MENTORS.length.toString(), color: 'text-green-500' }, { label: 'Pending Review', value: PENDING.length.toString(), color: 'text-yellow-500' }, { label: 'Suspended', value: suspended.length.toString(), color: 'text-red-500' }].map(s => (
            <div key={s.label} className="rounded-2xl border border-border bg-card p-4 text-center"><p className={`text-2xl font-bold ${s.color}`}>{s.value}</p><p className="text-xs text-muted-foreground mt-1">{s.label}</p></div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" /><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search mentors..." className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:border-primary" /></div>
          <div className="flex gap-2">{['all', 'active', 'pending'].map(f => <button key={f} onClick={() => setFilter(f)} className={`px-3 py-2 rounded-xl text-xs capitalize transition-all ${filter === f ? 'bg-primary text-primary-foreground' : 'border border-border text-muted-foreground'}`}>{f}</button>)}</div>
        </div>

        <div className="space-y-3">
          {filtered.map((mentor, i) => (
            <motion.div key={mentor.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className={`flex items-center gap-4 p-5 rounded-2xl border border-border bg-card hover:border-primary/30 transition-all ${suspended.includes(mentor.id) ? 'opacity-50' : ''}`}>
              <img src={mentor.avatar} alt={mentor.name} className="w-12 h-12 rounded-xl bg-muted flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-foreground">{mentor.name}</span>
                  {verified.includes(mentor.id) && <Shield className="w-3.5 h-3.5 text-blue-500" />}
                  <span className={`px-2 py-0.5 rounded-full text-xs ${mentor.status === 'active' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'}`}>{mentor.status}</span>
                </div>
                <p className="text-xs text-muted-foreground">{mentor.title}</p>
              </div>
              <div className="flex items-center gap-4 text-sm">
                {'rating' in mentor && mentor.rating && <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />{mentor.rating}</span>}
                {'sessions' in mentor && <span className="text-xs text-muted-foreground">{mentor.sessions} sessions</span>}
                {'hourlyRate' in mentor && <span className="text-xs text-green-500 font-semibold">₹{mentor.hourlyRate?.toLocaleString('en-IN')}/hr</span>}
              </div>
              <div className="flex gap-2">
                {mentor.status === 'pending' && (
                  <>
                    <button onClick={() => { setVerified(p => [...p, mentor.id]); toast.success(`${mentor.name} verified!`); }} className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-green-500 text-white text-xs font-semibold hover:bg-green-400"><CheckCircle className="w-3.5 h-3.5" /> Approve</button>
                    <button onClick={() => toast.info('Rejection noted')} className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-red-500/30 text-red-500 text-xs hover:bg-red-500/10"><XCircle className="w-3.5 h-3.5" /> Reject</button>
                  </>
                )}
                {mentor.status === 'active' && (
                  <button onClick={() => { setSuspended(p => p.includes(mentor.id) ? p.filter(x => x !== mentor.id) : [...p, mentor.id]); toast.info(suspended.includes(mentor.id) ? 'Mentor reinstated' : `${mentor.name} suspended`); }} className={`px-3 py-1.5 rounded-xl text-xs transition-all ${suspended.includes(mentor.id) ? 'bg-green-500/10 text-green-500 hover:bg-green-500/20' : 'border border-border text-muted-foreground hover:bg-red-500/10 hover:text-red-500'}`}>
                    {suspended.includes(mentor.id) ? 'Reinstate' : 'Suspend'}
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminMentors;
