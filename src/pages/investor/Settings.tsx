import { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Bell, Shield, Eye, Save, Trash2 } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useTheme } from '@/contexts/ThemeContext';
import { toast } from 'sonner';

const InvestorSettings = () => {
  const { isDark, toggleTheme } = useTheme();
  const [notifications, setNotifications] = useState({ newPitch: true, meetingReminder: true, portfolioAlert: true, weeklyReport: false });
  const [dealPrefs, setDealPrefs] = useState({ minTicket: '50', maxTicket: '500', stages: 'Seed, Series A', sectors: 'SaaS, FinTech, EdTech' });

  return (
    <DashboardLayout title="Settings">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Account */}
        <div className="rounded-2xl border border-border bg-card p-6">
          <h3 className="font-semibold text-foreground mb-4">Account Information</h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div><label className="text-xs text-muted-foreground mb-1 block">Name</label><input defaultValue="Vikram Mehta" className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:border-primary" /></div>
            <div><label className="text-xs text-muted-foreground mb-1 block">Email</label><input defaultValue="investor@zerotoone.com" className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:border-primary" /></div>
            <div><label className="text-xs text-muted-foreground mb-1 block">Firm Name</label><input defaultValue="BlueSky Ventures" className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:border-primary" /></div>
            <div><label className="text-xs text-muted-foreground mb-1 block">Phone</label><input defaultValue="+91 98765 43210" className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:border-primary" /></div>
          </div>
          <button onClick={() => toast.success('Account saved!')} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90"><Save className="w-4 h-4" /> Save</button>
        </div>

        {/* Deal Preferences */}
        <div className="rounded-2xl border border-border bg-card p-6">
          <h3 className="font-semibold text-foreground mb-4">Deal Flow Preferences</h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            {Object.entries(dealPrefs).map(([key, val]) => (
              <div key={key}><label className="text-xs text-muted-foreground mb-1 block capitalize">{key.replace(/([A-Z])/g, ' $1')}</label><input value={val} onChange={e => setDealPrefs(p => ({ ...p, [key]: e.target.value }))} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:border-primary" /></div>
            ))}
          </div>
          <button onClick={() => toast.success('Preferences updated! Discovery will refresh.')} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90"><Save className="w-4 h-4" /> Update Preferences</button>
        </div>

        {/* Notifications */}
        <div className="rounded-2xl border border-border bg-card p-6">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2"><Bell className="w-4 h-4" />Notifications</h3>
          <div className="space-y-4">
            {[
              { key: 'newPitch' as const, label: 'New Pitch Submission', desc: 'Startups matching your thesis' },
              { key: 'meetingReminder' as const, label: 'Meeting Reminders', desc: '30 min before scheduled calls' },
              { key: 'portfolioAlert' as const, label: 'Portfolio Alerts', desc: 'Key metrics changes in portfolio' },
              { key: 'weeklyReport' as const, label: 'Weekly Summary', desc: 'Deal flow and portfolio digest' },
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

        {/* Appearance */}
        <div className="rounded-2xl border border-border bg-card p-6">
          <h3 className="font-semibold text-foreground mb-4">Appearance</h3>
          <div className="flex items-center justify-between">
            <div><p className="text-sm font-medium text-foreground">Dark Mode</p><p className="text-xs text-muted-foreground">Toggle theme</p></div>
            <button onClick={toggleTheme} className={`relative w-10 h-5 rounded-full transition-colors ${isDark ? 'bg-primary' : 'bg-muted'}`}>
              <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${isDark ? 'left-5' : 'left-0.5'}`} />
            </button>
          </div>
        </div>

        {/* Danger */}
        <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6">
          <h3 className="font-semibold text-red-500 mb-3 flex items-center gap-2"><Trash2 className="w-4 h-4" />Danger Zone</h3>
          <div className="flex gap-3">
            <button onClick={() => toast.error('Not available in demo')} className="px-4 py-2 rounded-xl border border-red-500/30 text-red-500 text-sm font-medium hover:bg-red-500/10">Deactivate</button>
            <button onClick={() => toast.error('Not available in demo')} className="px-4 py-2 rounded-xl bg-red-500 text-white text-sm font-medium hover:bg-red-400">Delete Account</button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default InvestorSettings;
