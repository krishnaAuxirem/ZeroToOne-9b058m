import { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Calendar, Plus, X, Save, Toggle } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { toast } from 'sonner';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const TIME_SLOTS = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM'];

type DayAvail = { enabled: boolean; start: string; end: string };

const MentorAvailability = () => {
  const [schedule, setSchedule] = useState<Record<string, DayAvail>>({
    Monday: { enabled: true, start: '10:00 AM', end: '5:00 PM' },
    Tuesday: { enabled: true, start: '10:00 AM', end: '5:00 PM' },
    Wednesday: { enabled: true, start: '11:00 AM', end: '6:00 PM' },
    Thursday: { enabled: true, start: '10:00 AM', end: '5:00 PM' },
    Friday: { enabled: false, start: '10:00 AM', end: '3:00 PM' },
    Saturday: { enabled: true, start: '9:00 AM', end: '1:00 PM' },
    Sunday: { enabled: false, start: '10:00 AM', end: '2:00 PM' },
  });

  const [bufferTime, setBufferTime] = useState('15');
  const [maxSessions, setMaxSessions] = useState('4');
  const [vacationMode, setVacationMode] = useState(false);

  const toggleDay = (day: string) => setSchedule(prev => ({ ...prev, [day]: { ...prev[day], enabled: !prev[day].enabled } }));
  const updateTime = (day: string, field: 'start' | 'end', value: string) => setSchedule(prev => ({ ...prev, [day]: { ...prev[day], [field]: value } }));

  const BLOCKED_DATES = ['Jun 15, 2025', 'Jun 20, 2025', 'Jul 1–5, 2025'];

  return (
    <DashboardLayout title="Availability">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Vacation Mode */}
        <div className={`rounded-2xl border p-5 transition-all ${vacationMode ? 'border-orange-500/50 bg-orange-500/5' : 'border-border bg-card'}`}>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-foreground">Vacation Mode</h3>
              <p className="text-sm text-muted-foreground mt-0.5">Pause all new bookings while you're away</p>
            </div>
            <button onClick={() => { setVacationMode(!vacationMode); toast.info(vacationMode ? 'Vacation mode disabled' : 'Vacation mode enabled — no new bookings will be accepted'); }}
              className={`relative w-12 h-6 rounded-full transition-colors ${vacationMode ? 'bg-orange-500' : 'bg-muted'}`}>
              <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${vacationMode ? 'left-7' : 'left-1'}`} />
            </button>
          </div>
        </div>

        {/* Weekly Schedule */}
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Weekly Availability</h3>
            <button onClick={() => toast.success('Schedule saved!')} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all">
              <Save className="w-4 h-4" /> Save Schedule
            </button>
          </div>
          <div className="space-y-3">
            {DAYS.map(day => (
              <div key={day} className={`flex items-center gap-4 p-3 rounded-xl border transition-all ${schedule[day].enabled ? 'border-primary/20 bg-primary/5' : 'border-border opacity-50'}`}>
                <button onClick={() => toggleDay(day)}
                  className={`relative w-10 h-5 rounded-full transition-colors flex-shrink-0 ${schedule[day].enabled ? 'bg-primary' : 'bg-muted'}`}>
                  <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${schedule[day].enabled ? 'left-5' : 'left-0.5'}`} />
                </button>
                <span className="text-sm font-medium text-foreground w-24 flex-shrink-0">{day}</span>
                {schedule[day].enabled ? (
                  <div className="flex items-center gap-2 flex-1">
                    <select value={schedule[day].start} onChange={e => updateTime(day, 'start', e.target.value)}
                      className="px-3 py-1.5 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:border-primary">
                      {TIME_SLOTS.map(t => <option key={t}>{t}</option>)}
                    </select>
                    <span className="text-muted-foreground text-sm">to</span>
                    <select value={schedule[day].end} onChange={e => updateTime(day, 'end', e.target.value)}
                      className="px-3 py-1.5 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:border-primary">
                      {TIME_SLOTS.map(t => <option key={t}>{t}</option>)}
                    </select>
                    <span className="text-xs text-muted-foreground ml-2">IST</span>
                  </div>
                ) : (
                  <span className="text-sm text-muted-foreground">Unavailable</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Session Settings */}
        <div className="rounded-2xl border border-border bg-card p-5">
          <h3 className="font-semibold text-foreground mb-4">Session Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block">Buffer time between sessions</label>
              <select value={bufferTime} onChange={e => setBufferTime(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:border-primary">
                {['0', '15', '30', '45', '60'].map(v => <option key={v} value={v}>{v === '0' ? 'No buffer' : `${v} minutes`}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block">Max sessions per day</label>
              <select value={maxSessions} onChange={e => setMaxSessions(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:border-primary">
                {['1', '2', '3', '4', '5', '6', '8'].map(v => <option key={v}>{v}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Blocked Dates */}
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Blocked Dates</h3>
            <button onClick={() => toast.success('Date blocking feature coming soon!')} className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-dashed border-border text-muted-foreground text-xs hover:border-primary/50 hover:text-primary transition-all">
              <Plus className="w-3.5 h-3.5" /> Block Dates
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {BLOCKED_DATES.map(d => (
              <span key={d} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 text-red-500 text-sm">
                <Calendar className="w-3.5 h-3.5" />{d}
                <button onClick={() => toast.success('Date unblocked!')}><X className="w-3 h-3" /></button>
              </span>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MentorAvailability;
