import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Clock, User, Briefcase, CheckCircle, XCircle, MessageSquare, Filter } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { toast } from 'sonner';

const REQUESTS = [
  { id: 1, founder: 'Rohit Kumar', startup: 'LogiTrack', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=rohit', expertise: 'Operations Strategy', message: 'Looking for guidance on setting up logistics operations and expanding to 5 new cities within 6 months.', requested: '2 hours ago', duration: '60 min', budget: '₹4,500', urgent: true, stage: 'Seed' },
  { id: 2, founder: 'Priya Sharma', startup: 'HealthBuddy', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=priyasha', expertise: 'Product Roadmap Review', message: 'Need feedback on our Q3 roadmap and prioritization framework for our health-tech app.', requested: '5 hours ago', duration: '45 min', budget: '₹3,375', urgent: false, stage: 'Pre-Seed' },
  { id: 3, founder: 'Amit Patel', startup: 'FoodieBox', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=amitpatel', expertise: 'Fundraising Strategy', message: 'We are preparing for our seed round. Need help identifying the right investors and refining our pitch.', requested: '1 day ago', duration: '90 min', budget: '₹6,750', urgent: false, stage: 'Pre-Seed' },
  { id: 4, founder: 'Deepika Rao', startup: 'EduPilot', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=deepika', expertise: 'GTM Strategy', message: 'Planning our go-to-market for B2B school sales. Looking for an experienced mentor to review our strategy.', requested: '2 days ago', duration: '60 min', budget: '₹4,500', urgent: true, stage: 'Seed' },
  { id: 5, founder: 'Nikhil Bose', startup: 'PayBridge', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=nikhil', expertise: 'Unit Economics', message: 'Our CAC and LTV numbers need expert review. Would love a session focused on improving unit economics.', requested: '3 days ago', duration: '45 min', budget: '₹3,375', urgent: false, stage: 'Series A' },
];

type FilterType = 'all' | 'urgent' | 'pending';

const ConsultationRequests = () => {
  const [filter, setFilter] = useState<FilterType>('all');
  const [accepted, setAccepted] = useState<number[]>([]);
  const [declined, setDeclined] = useState<number[]>([]);

  const handleAccept = (id: number) => {
    setAccepted(prev => [...prev, id]);
    toast.success('Request accepted! Founder will be notified.');
  };
  const handleDecline = (id: number) => {
    setDeclined(prev => [...prev, id]);
    toast.info('Request declined.');
  };

  const filtered = REQUESTS.filter(r => {
    if (filter === 'urgent') return r.urgent;
    if (filter === 'pending') return !accepted.includes(r.id) && !declined.includes(r.id);
    return true;
  });

  const pendingCount = REQUESTS.filter(r => !accepted.includes(r.id) && !declined.includes(r.id)).length;

  return (
    <DashboardLayout title="Consultation Requests">
      <div className="space-y-6">
        {/* Header */}
        <div className="rounded-2xl bg-gradient-to-r from-purple-700 to-indigo-800 p-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">{[...Array(6)].map((_, i) => <div key={i} className="absolute rounded-full bg-white" style={{ width: 60 + i * 20, height: 60 + i * 20, top: `${i * 15}%`, right: `${i * 8}%` }} />)}</div>
          <div className="relative flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Bell className="w-4 h-4 text-purple-300" />
                <span className="text-purple-200 text-sm">Incoming Requests</span>
              </div>
              <h1 className="text-2xl font-bold text-white">{pendingCount} Pending Requests</h1>
              <p className="text-purple-200 text-sm mt-1">{REQUESTS.filter(r => r.urgent).length} marked urgent</p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className="px-4 py-2 rounded-xl bg-white/20 text-white text-sm">Response Rate: 94%</div>
              <div className="px-4 py-2 rounded-xl bg-white/20 text-white text-sm">Avg Response: 2.4h</div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2">
          {(['all', 'urgent', 'pending'] as FilterType[]).map(f => (
            <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-xl text-sm capitalize transition-all ${filter === f ? 'bg-primary text-primary-foreground' : 'border border-border text-muted-foreground hover:border-primary/50'}`}>
              {f === 'all' ? `All (${REQUESTS.length})` : f === 'urgent' ? `Urgent (${REQUESTS.filter(r => r.urgent).length})` : `Pending (${pendingCount})`}
            </button>
          ))}
        </div>

        {/* Request Cards */}
        <div className="space-y-4">
          {filtered.map((req, i) => {
            const isAccepted = accepted.includes(req.id);
            const isDeclined = declined.includes(req.id);
            return (
              <motion.div key={req.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className={`rounded-2xl border bg-card p-5 transition-all ${isAccepted ? 'border-green-500/30' : isDeclined ? 'border-red-500/20 opacity-60' : req.urgent ? 'border-red-500/30' : 'border-border'}`}>
                <div className="flex items-start gap-4">
                  <img src={req.avatar} alt={req.founder} className="w-12 h-12 rounded-xl bg-muted flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="font-bold text-foreground">{req.founder}</span>
                      <span className="text-muted-foreground text-sm">·</span>
                      <span className="text-sm text-primary">{req.startup}</span>
                      <span className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-xs">{req.stage}</span>
                      {req.urgent && <span className="px-2 py-0.5 rounded-full bg-red-500/10 text-red-500 text-xs font-semibold">Urgent</span>}
                      {isAccepted && <span className="px-2 py-0.5 rounded-full bg-green-500/10 text-green-500 text-xs font-semibold">Accepted</span>}
                      {isDeclined && <span className="px-2 py-0.5 rounded-full bg-red-500/10 text-red-500 text-xs font-semibold">Declined</span>}
                    </div>
                    <p className="text-xs font-semibold text-purple-400 mb-2">{req.expertise}</p>
                    <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{req.message}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {req.duration}</span>
                      <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5" /> {req.budget}</span>
                      <span>{req.requested}</span>
                    </div>
                  </div>
                  {!isAccepted && !isDeclined && (
                    <div className="flex flex-col gap-2 ml-4">
                      <button onClick={() => handleAccept(req.id)} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-500 text-white text-sm font-semibold hover:bg-green-400 transition-all">
                        <CheckCircle className="w-4 h-4" /> Accept
                      </button>
                      <button onClick={() => handleDecline(req.id)} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-red-500/30 text-red-500 text-sm hover:bg-red-500/10 transition-all">
                        <XCircle className="w-4 h-4" /> Decline
                      </button>
                      <button onClick={() => toast.success('Message sent!')} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border text-muted-foreground text-sm hover:bg-muted transition-all">
                        <MessageSquare className="w-4 h-4" /> Message
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ConsultationRequests;
