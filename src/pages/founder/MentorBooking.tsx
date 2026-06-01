import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Star, Calendar, Search, Filter, MapPin, ArrowRight, Bookmark, Clock } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { MENTORS } from '@/lib/mockData';
import { toast } from 'sonner';

const MY_BOOKINGS = [
  { mentorId: 'm1', date: 'Jun 5, 2025', time: '11:00 AM', topic: 'Fundraising Prep', status: 'upcoming' },
  { mentorId: 'm2', date: 'May 28, 2025', time: '3:00 PM', topic: 'Growth Strategy', status: 'completed' },
];

const EXPERTISE_FILTERS = ['All', 'B2B SaaS', 'Fundraising', 'Product Strategy', 'Growth Marketing', 'FinTech', 'Legal', 'HR'];

const FounderMentorBooking = () => {
  const [view, setView] = useState<'browse' | 'bookings'>('browse');
  const [search, setSearch] = useState('');
  const [expertise, setExpertise] = useState('All');
  const [saved, setSaved] = useState<string[]>([]);

  const filtered = MENTORS.filter(m => {
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase()) || m.title.toLowerCase().includes(search.toLowerCase());
    const matchExpertise = expertise === 'All' || m.expertise.includes(expertise);
    return matchSearch && matchExpertise;
  });

  return (
    <DashboardLayout title="Mentor Booking">
      <div className="space-y-6">
        {/* Tabs */}
        <div className="flex gap-2">
          {[{ id: 'browse', label: 'Browse Mentors' }, { id: 'bookings', label: `My Bookings (${MY_BOOKINGS.length})` }].map(t => (
            <button key={t.id} onClick={() => setView(t.id as any)} className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${view === t.id ? 'bg-primary text-primary-foreground' : 'border border-border text-muted-foreground'}`}>{t.label}</button>
          ))}
        </div>

        {view === 'browse' ? (
          <>
            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search mentors..." className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary" />
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              {EXPERTISE_FILTERS.map(f => (
                <button key={f} onClick={() => setExpertise(f)} className={`px-3 py-1.5 rounded-full text-xs transition-all ${expertise === f ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}>{f}</button>
              ))}
            </div>

            {/* Mentor Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtered.map((mentor, i) => (
                <motion.div key={mentor.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                  className="p-6 rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all">
                  <div className="flex items-start gap-3 mb-4">
                    <img src={mentor.avatar} alt={mentor.name} className="w-14 h-14 rounded-2xl bg-muted" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-bold text-foreground">{mentor.name}</h3>
                          <p className="text-xs text-muted-foreground">{mentor.title}</p>
                        </div>
                        <button onClick={() => setSaved(prev => prev.includes(mentor.id) ? prev.filter(x => x !== mentor.id) : [...prev, mentor.id])}
                          className={`p-1.5 rounded-lg transition-all ${saved.includes(mentor.id) ? 'text-yellow-500' : 'text-muted-foreground hover:text-yellow-500'}`}>
                          <Bookmark className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                        <span className="text-xs font-semibold text-foreground">{mentor.rating}</span>
                        <span className="text-xs text-muted-foreground">({mentor.sessions} sessions)</span>
                        <span className={`w-2 h-2 rounded-full ${mentor.available ? 'bg-green-500' : 'bg-muted'}`} />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {mentor.expertise.map(e => <span key={e} className="px-2 py-0.5 rounded-lg bg-muted text-muted-foreground text-xs">{e}</span>)}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                    <MapPin className="w-3.5 h-3.5" />{mentor.location}
                    <span>·</span>
                    <Clock className="w-3.5 h-3.5" />{mentor.available ? 'Available now' : 'Next week'}
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <div>
                      <span className="text-lg font-bold text-primary">₹{mentor.hourlyRate.toLocaleString('en-IN')}</span>
                      <span className="text-xs text-muted-foreground">/hr</span>
                    </div>
                    <button onClick={() => toast.success(`Booking session with ${mentor.name}!`)}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-all">
                      Book Session <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        ) : (
          <div className="space-y-4">
            {MY_BOOKINGS.map((booking, i) => {
              const mentor = MENTORS.find(m => m.id === booking.mentorId);
              if (!mentor) return null;
              return (
                <div key={i} className="flex items-center gap-4 p-5 rounded-2xl border border-border bg-card hover:border-primary/30 transition-all">
                  <img src={mentor.avatar} alt={mentor.name} className="w-12 h-12 rounded-xl bg-muted" />
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">{mentor.name}</p>
                    <p className="text-xs text-muted-foreground">{booking.topic}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-foreground">{booking.date} · {booking.time}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${booking.status === 'upcoming' ? 'bg-blue-500/10 text-blue-500' : 'bg-green-500/10 text-green-500'}`}>{booking.status}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default FounderMentorBooking;
