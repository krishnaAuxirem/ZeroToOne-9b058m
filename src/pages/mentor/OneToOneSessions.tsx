import { useState } from 'react';
import { motion } from 'framer-motion';
import { Video, Clock, Star, MessageSquare, FileText, Play, CheckCircle } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { toast } from 'sonner';

const SESSIONS = [
  { id: 1, founder: 'Karan Mehta', startup: 'CodeCraft', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=karan', date: 'Jun 3, 2025', time: '3:00 PM', duration: 60, topic: 'Product Strategy & PMF', status: 'upcoming', notes: '', rating: null },
  { id: 2, founder: 'Neha Agarwal', startup: 'SkillUp', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=neha', date: 'Jun 5, 2025', time: '11:00 AM', duration: 45, topic: 'Fundraising Prep', status: 'upcoming', notes: '', rating: null },
  { id: 3, founder: 'Anjali Singh', startup: 'WellnessApp', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=anjali', date: 'May 28, 2025', time: '4:00 PM', duration: 60, topic: 'Go-to-Market Strategy', status: 'completed', notes: 'Covered distribution channels, pricing, and launch sequence. Action items: finalize pricing page, set up analytics.', rating: 5 },
  { id: 4, founder: 'Deepika Rao', startup: 'EduPilot', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=deepika', date: 'May 22, 2025', time: '3:00 PM', duration: 90, topic: 'B2B School Sales', status: 'completed', notes: 'Mapped decision-making process in schools. Identified 3 champions in each school. Budget cycle timing is crucial.', rating: 5 },
  { id: 5, founder: 'Nikhil Bose', startup: 'PayBridge', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=nikhilb', date: 'May 15, 2025', time: '2:00 PM', duration: 60, topic: 'Unit Economics Optimization', status: 'completed', notes: 'Reviewed CAC, LTV calculations. Need to reduce CAC by 30% by shifting to referral-led acquisition.', rating: 4 },
];

const MentorOneToOneSessions = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed'>('upcoming');
  const [expandedNotes, setExpandedNotes] = useState<number | null>(null);

  const filtered = SESSIONS.filter(s => s.status === activeTab);

  return (
    <DashboardLayout title="1:1 Sessions">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total 1:1 Sessions', value: '214', color: 'text-purple-500' },
            { label: 'Hours Mentored', value: '187h', color: 'text-blue-500' },
            { label: 'Avg Session Rating', value: '4.9', color: 'text-yellow-500' },
            { label: 'Repeat Founders', value: '68%', color: 'text-green-500' },
          ].map(s => (
            <div key={s.label} className="rounded-2xl border border-border bg-card p-4 text-center">
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2">
          {(['upcoming', 'completed'] as const).map(t => (
            <button key={t} onClick={() => setActiveTab(t)} className={`px-4 py-2 rounded-xl text-sm capitalize transition-all ${activeTab === t ? 'bg-primary text-primary-foreground' : 'border border-border text-muted-foreground'}`}>
              {t} ({SESSIONS.filter(s => s.status === t).length})
            </button>
          ))}
        </div>

        {/* Sessions */}
        <div className="space-y-4">
          {filtered.map((session, i) => (
            <motion.div key={session.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
              className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-start gap-4">
                <img src={session.avatar} alt={session.founder} className="w-12 h-12 rounded-xl bg-muted flex-shrink-0" />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-foreground">{session.founder}</span>
                      <span className="text-xs text-muted-foreground">· {session.startup}</span>
                    </div>
                    {session.rating && (
                      <div className="flex gap-0.5">
                        {[...Array(session.rating)].map((_, j) => <Star key={j} className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />)}
                      </div>
                    )}
                  </div>
                  <p className="text-sm font-medium text-foreground mb-2">{session.topic}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                    <span>{session.date} · {session.time}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{session.duration} min</span>
                    <span className="flex items-center gap-1"><Video className="w-3 h-3" />Video Call</span>
                  </div>
                  {session.notes && (
                    <div className="mt-2">
                      <button onClick={() => setExpandedNotes(expandedNotes === session.id ? null : session.id)} className="text-xs text-primary font-medium flex items-center gap-1">
                        <FileText className="w-3.5 h-3.5" /> {expandedNotes === session.id ? 'Hide' : 'View'} Session Notes
                      </button>
                      {expandedNotes === session.id && (
                        <p className="mt-2 text-xs text-muted-foreground bg-muted/50 rounded-xl p-3 leading-relaxed">{session.notes}</p>
                      )}
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  {session.status === 'upcoming' ? (
                    <>
                      <button onClick={() => toast.success('Joining video session...')} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600 text-white text-xs font-semibold hover:bg-purple-500 transition-all">
                        <Video className="w-3.5 h-3.5" /> Join Session
                      </button>
                      <button onClick={() => toast.success('Message sent!')} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border text-muted-foreground text-xs hover:bg-muted transition-all">
                        <MessageSquare className="w-3.5 h-3.5" /> Message
                      </button>
                    </>
                  ) : (
                    <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-green-500/10 text-green-500 text-xs font-semibold">
                      <CheckCircle className="w-3.5 h-3.5" /> Completed
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MentorOneToOneSessions;
