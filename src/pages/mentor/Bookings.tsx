import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, Video, CheckCircle, XCircle, Filter, Plus } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { toast } from 'sonner';

const BOOKINGS = [
  { id: 1, founder: 'Karan Mehta', startup: 'CodeCraft', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=karan', date: 'Jun 3, 2025', time: '3:00 PM', duration: '60 min', topic: 'Product Strategy & PMF', type: '1:1', status: 'upcoming', price: 4500 },
  { id: 2, founder: 'Neha Agarwal', startup: 'SkillUp', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=neha', date: 'Jun 5, 2025', time: '11:00 AM', duration: '45 min', topic: 'Fundraising Preparation', type: '1:1', status: 'upcoming', price: 3375 },
  { id: 3, founder: 'Vishal Rao', startup: 'DataPulse', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=vishal', date: 'Jun 10, 2025', time: '2:00 PM', duration: '90 min', topic: 'B2B Sales Playbook Workshop', type: 'Group', status: 'upcoming', price: 6750 },
  { id: 4, founder: 'Anjali Singh', startup: 'WellnessApp', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=anjali', date: 'May 28, 2025', time: '4:00 PM', duration: '60 min', topic: 'Go-to-Market Strategy', type: '1:1', status: 'completed', price: 4500 },
  { id: 5, founder: 'Deepika Rao', startup: 'EduPilot', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=deepika', date: 'May 25, 2025', time: '5:00 PM', duration: '60 min', topic: 'GTM for B2B EdTech', type: '1:1', status: 'completed', price: 4500 },
  { id: 6, founder: 'Nikhil Bose', startup: 'PayBridge', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=nikhilb', date: 'May 20, 2025', time: '12:00 PM', duration: '60 min', topic: 'Unit Economics Review', type: '1:1', status: 'cancelled', price: 4500 },
];

const MentorBookings = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed' | 'cancelled'>('upcoming');

  const filtered = BOOKINGS.filter(b => b.status === activeTab);
  const upcomingCount = BOOKINGS.filter(b => b.status === 'upcoming').length;

  return (
    <DashboardLayout title="Bookings">
      <div className="space-y-6">
        {/* Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Upcoming Sessions', value: `${upcomingCount}`, color: 'text-blue-500', bg: 'from-blue-500/10 to-blue-500/5' },
            { label: 'This Month', value: '12', color: 'text-purple-500', bg: 'from-purple-500/10 to-purple-500/5' },
            { label: 'Revenue (Jun)', value: '₹54,000', color: 'text-green-500', bg: 'from-green-500/10 to-green-500/5' },
            { label: 'Cancellation Rate', value: '3%', color: 'text-orange-500', bg: 'from-orange-500/10 to-orange-500/5' },
          ].map((s) => (
            <div key={s.label} className={`rounded-2xl border border-border bg-gradient-to-br ${s.bg} p-4`}>
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            {(['upcoming', 'completed', 'cancelled'] as const).map(t => (
              <button key={t} onClick={() => setActiveTab(t)} className={`px-4 py-2 rounded-xl text-sm capitalize transition-all ${activeTab === t ? 'bg-primary text-primary-foreground' : 'border border-border text-muted-foreground hover:border-primary/50'}`}>
                {t} ({BOOKINGS.filter(b => b.status === t).length})
              </button>
            ))}
          </div>
          <button onClick={() => toast.success('Opening calendar...')} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-muted text-muted-foreground text-sm hover:bg-muted/80 transition-all">
            <Calendar className="w-4 h-4" /> View Calendar
          </button>
        </div>

        {/* Booking List */}
        <div className="space-y-3">
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <Calendar className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>No {activeTab} bookings</p>
            </div>
          ) : filtered.map((booking, i) => (
            <motion.div key={booking.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
              className="flex items-center gap-4 p-5 rounded-2xl border border-border bg-card hover:border-primary/30 transition-all">
              <img src={booking.avatar} alt={booking.founder} className="w-11 h-11 rounded-xl bg-muted flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="font-semibold text-foreground text-sm">{booking.founder}</span>
                  <span className="text-xs text-muted-foreground">· {booking.startup}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs ${booking.type === 'Group' ? 'bg-orange-500/10 text-orange-500' : 'bg-purple-500/10 text-purple-500'}`}>{booking.type}</span>
                </div>
                <p className="text-xs text-foreground font-medium">{booking.topic}</p>
              </div>
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{booking.date}</span>
                </div>
                <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{booking.time} · {booking.duration}</span>
                </div>
                <span className="font-bold text-green-500 text-sm">₹{booking.price.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${booking.status === 'upcoming' ? 'bg-blue-500/10 text-blue-500' : booking.status === 'completed' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                  {booking.status}
                </span>
                {booking.status === 'upcoming' && (
                  <button onClick={() => toast.success('Joining video session...')} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-600 text-white text-xs font-semibold hover:bg-purple-500 transition-all">
                    <Video className="w-3.5 h-3.5" /> Join
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

export default MentorBookings;
