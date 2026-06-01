import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Calendar, Clock, Video, Plus, Globe, BookOpen, Star } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { toast } from 'sonner';

const GROUP_SESSIONS = [
  { id: 1, title: 'B2B SaaS Sales Playbook', date: 'Jun 10, 2025', time: '6:00 PM', duration: '90 min', maxParticipants: 15, registered: 11, topic: 'Enterprise Sales & Outbound Strategies', price: 999, status: 'open', level: 'Intermediate' },
  { id: 2, title: 'Fundraising Masterclass: Seed Round', date: 'Jun 17, 2025', time: '5:00 PM', duration: '120 min', maxParticipants: 20, registered: 18, topic: 'Investor targeting, pitch perfection, and term sheets', price: 1499, status: 'almost_full', level: 'Intermediate' },
  { id: 3, title: 'Product-Market Fit Workshop', date: 'Jun 24, 2025', time: '7:00 PM', duration: '90 min', maxParticipants: 12, registered: 5, topic: 'Frameworks to validate and measure PMF', price: 799, status: 'open', level: 'Beginner' },
  { id: 4, title: 'Go-to-Market Strategies for D2C', date: 'May 27, 2025', time: '6:00 PM', duration: '90 min', maxParticipants: 15, registered: 15, topic: 'CAC reduction and organic growth tactics', price: 999, status: 'completed', level: 'Beginner' },
  { id: 5, title: 'Unit Economics Deep Dive', date: 'May 13, 2025', time: '5:30 PM', duration: '120 min', maxParticipants: 10, registered: 9, topic: 'LTV, CAC, payback period optimization', price: 1299, status: 'completed', level: 'Advanced' },
];

const MentorGroupSessions = () => {
  const [showCreate, setShowCreate] = useState(false);
  const [newSession, setNewSession] = useState({ title: '', date: '', time: '', duration: '90', seats: '15', price: '' });

  const handleCreate = () => {
    if (!newSession.title || !newSession.date) { toast.error('Please fill all required fields'); return; }
    toast.success('Group session created! It will appear in the marketplace.');
    setShowCreate(false);
    setNewSession({ title: '', date: '', time: '', duration: '90', seats: '15', price: '' });
  };

  return (
    <DashboardLayout title="Group Sessions">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Group Sessions', value: '47', color: 'text-orange-500' },
            { label: 'Founders Reached', value: '612', color: 'text-purple-500' },
            { label: 'Avg Attendance', value: '87%', color: 'text-green-500' },
            { label: 'Revenue (Group)', value: '₹2.1L', color: 'text-blue-500' },
          ].map(s => (
            <div key={s.label} className="rounded-2xl border border-border bg-card p-4 text-center">
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Create Session Button */}
        <div className="flex justify-end">
          <button onClick={() => setShowCreate(!showCreate)} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all">
            <Plus className="w-4 h-4" /> Create Group Session
          </button>
        </div>

        {/* Create Form */}
        {showCreate && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-primary/30 bg-card p-6">
            <h3 className="font-semibold text-foreground mb-4">New Group Session</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="md:col-span-2">
                <label className="text-xs text-muted-foreground mb-1 block">Session Title *</label>
                <input value={newSession.title} onChange={e => setNewSession({ ...newSession, title: e.target.value })} placeholder="e.g., Fundraising Masterclass 101" className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:border-primary" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Date *</label>
                <input type="date" value={newSession.date} onChange={e => setNewSession({ ...newSession, date: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:border-primary" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Time</label>
                <input type="time" value={newSession.time} onChange={e => setNewSession({ ...newSession, time: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:border-primary" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Duration (min)</label>
                <input value={newSession.duration} onChange={e => setNewSession({ ...newSession, duration: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:border-primary" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Max Seats</label>
                <input value={newSession.seats} onChange={e => setNewSession({ ...newSession, seats: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:border-primary" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Price per Seat (₹)</label>
                <input value={newSession.price} onChange={e => setNewSession({ ...newSession, price: e.target.value })} placeholder="999" className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:border-primary" />
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={handleCreate} className="px-5 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all">Create Session</button>
              <button onClick={() => setShowCreate(false)} className="px-5 py-2 rounded-xl border border-border text-muted-foreground text-sm hover:bg-muted transition-all">Cancel</button>
            </div>
          </motion.div>
        )}

        {/* Sessions List */}
        <div className="space-y-4">
          {GROUP_SESSIONS.map((session, i) => {
            const fillPct = Math.round((session.registered / session.maxParticipants) * 100);
            return (
              <motion.div key={session.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                className="rounded-2xl border border-border bg-card p-5 hover:border-primary/30 transition-all">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-foreground">{session.title}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-xs ${session.status === 'open' ? 'bg-green-500/10 text-green-500' : session.status === 'almost_full' ? 'bg-orange-500/10 text-orange-500' : 'bg-muted text-muted-foreground'}`}>
                        {session.status === 'almost_full' ? 'Almost Full' : session.status === 'open' ? 'Open' : 'Completed'}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-xs">{session.level}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{session.topic}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                      <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{session.date}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{session.time} · {session.duration}</span>
                      <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{session.registered}/{session.maxParticipants} registered</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 max-w-32 h-1.5 rounded-full bg-muted overflow-hidden">
                        <div className="h-full rounded-full bg-primary" style={{ width: `${fillPct}%` }} />
                      </div>
                      <span className="text-xs text-muted-foreground">{fillPct}% filled</span>
                    </div>
                  </div>
                  <div className="text-right flex flex-col items-end gap-3">
                    <span className="text-xl font-bold text-green-500">₹{session.price}</span>
                    <span className="text-xs text-muted-foreground">per seat</span>
                    {session.status !== 'completed' && (
                      <button onClick={() => toast.success('Opening session management...')} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600 text-white text-xs font-semibold hover:bg-purple-500 transition-all">
                        <Video className="w-3.5 h-3.5" /> Manage
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MentorGroupSessions;
