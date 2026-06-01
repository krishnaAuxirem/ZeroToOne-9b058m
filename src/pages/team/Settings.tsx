import { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Bell, Shield, Save, Trash2, Eye } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useTheme } from '@/contexts/ThemeContext';
import { toast } from 'sonner';

const TeamSettings = () => {
  const { isDark, toggleTheme } = useTheme();
  const [notifications, setNotifications] = useState({ taskAssigned: true, prReview: true, mentionAlert: true, sprintUpdate: true, dailyDigest: false });

  return (
    <DashboardLayout title="Settings">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="rounded-2xl border border-border bg-card p-6">
          <h3 className="font-semibold text-foreground mb-4">Account</h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div><label className="text-xs text-muted-foreground mb-1 block">Name</label><input defaultValue="Sneha Patel" className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:border-primary" /></div>
            <div><label className="text-xs text-muted-foreground mb-1 block">Email</label><input defaultValue="team@zerotoone.com" className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:border-primary" /></div>
            <div><label className="text-xs text-muted-foreground mb-1 block">Role / Title</label><input defaultValue="Senior Frontend Engineer" className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:border-primary" /></div>
            <div><label className="text-xs text-muted-foreground mb-1 block">Timezone</label><input defaultValue="IST (UTC+5:30)" className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:border-primary" /></div>
          </div>
          <button onClick={() => toast.success('Settings saved!')} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90"><Save className="w-4 h-4" /> Save</button>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2"><Bell className="w-4 h-4" />Notifications</h3>
          <div className="space-y-4">
            {[
              { key: 'taskAssigned' as const, label: 'Task Assigned', desc: 'When a task is assigned to me' },
              { key: 'prReview' as const, label: 'PR Review Request', desc: 'Code review notifications' },
              { key: 'mentionAlert' as const, label: 'Mentions', desc: 'When someone @mentions me' },
              { key: 'sprintUpdate' as const, label: 'Sprint Updates', desc: 'Sprint start, end, and changes' },
              { key: 'dailyDigest' as const, label: 'Daily Digest', desc: 'Daily summary of activities' },
            ].map(({ key, label, desc }) => (
              <div key={key} className="flex items-center justify-between">
                <div><p className="text-sm font-medium text-foreground">{label}</p><p className="text-xs text-muted-foreground">{desc}</p></div>
                <button onClick={() => setNotifications(p => ({ ...p, [key]: !p[key] }))} className={`relative w-10 h-5 rounded-full transition-colors ${notifications[key] ? 'bg-primary' : 'bg-muted'}`}>
                  <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${notifications[key] ? 'left-5' : 'left-0.5'}`} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6">
          <h3 className="font-semibold text-foreground mb-4">Appearance</h3>
          <div className="flex items-center justify-between">
            <div><p className="text-sm font-medium text-foreground">Dark Mode</p><p className="text-xs text-muted-foreground">Toggle theme</p></div>
            <button onClick={toggleTheme} className={`relative w-10 h-5 rounded-full transition-colors ${isDark ? 'bg-primary' : 'bg-muted'}`}>
              <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${isDark ? 'left-5' : 'left-0.5'}`} />
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6">
          <h3 className="font-semibold text-red-500 mb-3 flex items-center gap-2"><Trash2 className="w-4 h-4" />Danger Zone</h3>
          <button onClick={() => toast.error('Not available in demo')} className="px-4 py-2 rounded-xl border border-red-500/30 text-red-500 text-sm font-medium hover:bg-red-500/10">Leave Workspace</button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TeamSettings;
