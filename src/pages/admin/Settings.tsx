import { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Bell, Shield, Globe, Save, Zap, Database, Mail, Trash2 } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useTheme } from '@/contexts/ThemeContext';
import { toast } from 'sonner';

const AdminSettings = () => {
  const { isDark, toggleTheme } = useTheme();
  const [platformSettings, setPlatformSettings] = useState({
    platformName: 'ZeroToOne',
    tagline: "India's #1 AI-Powered Startup Platform",
    supportEmail: 'support@zerotoone.in',
    maxUsersPerPlan: '1000',
    sessionCommission: '20',
    maintenanceMode: false,
    newRegistrations: true,
    twoFARequired: false,
  });

  const [notifications, setNotifications] = useState({
    newUserAlert: true, revenueAlert: true, systemAlert: true, weeklyReport: true,
  });

  const toggle = (key: keyof typeof platformSettings) => setPlatformSettings(p => ({ ...p, [key]: !p[key as keyof typeof p] }));

  return (
    <DashboardLayout title="Platform Settings">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Platform Config */}
        <div className="rounded-2xl border border-border bg-card p-6">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2"><Settings className="w-4 h-4" />Platform Configuration</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {[
              { label: 'Platform Name', key: 'platformName' },
              { label: 'Tagline', key: 'tagline' },
              { label: 'Support Email', key: 'supportEmail' },
              { label: 'Session Commission (%)', key: 'sessionCommission' },
            ].map(({ label, key }) => (
              <div key={key}>
                <label className="text-xs text-muted-foreground mb-1 block">{label}</label>
                <input value={platformSettings[key as keyof typeof platformSettings] as string} onChange={e => setPlatformSettings(p => ({ ...p, [key]: e.target.value }))} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:border-primary" />
              </div>
            ))}
          </div>
          <div className="space-y-3 mb-4">
            {[
              { key: 'maintenanceMode' as const, label: 'Maintenance Mode', desc: 'Temporarily take platform offline', warning: true },
              { key: 'newRegistrations' as const, label: 'New Registrations', desc: 'Allow new users to sign up', warning: false },
              { key: 'twoFARequired' as const, label: 'Require 2FA', desc: 'Enforce two-factor for all users', warning: false },
            ].map(({ key, label, desc, warning }) => (
              <div key={key} className={`flex items-center justify-between p-3 rounded-xl ${warning && platformSettings[key] ? 'bg-red-500/5 border border-red-500/20' : 'bg-muted/30'}`}>
                <div><p className="text-sm font-medium text-foreground">{label}</p><p className="text-xs text-muted-foreground">{desc}</p></div>
                <button onClick={() => toggle(key)} className={`relative w-10 h-5 rounded-full transition-colors ${platformSettings[key] ? (warning ? 'bg-red-500' : 'bg-primary') : 'bg-muted'}`}>
                  <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${platformSettings[key] ? 'left-5' : 'left-0.5'}`} />
                </button>
              </div>
            ))}
          </div>
          <button onClick={() => toast.success('Platform settings saved!')} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90"><Save className="w-4 h-4" /> Save Settings</button>
        </div>

        {/* Admin Notifications */}
        <div className="rounded-2xl border border-border bg-card p-6">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2"><Bell className="w-4 h-4" />Admin Notifications</h3>
          <div className="space-y-4">
            {[
              { key: 'newUserAlert' as const, label: 'New User Alerts', desc: 'Alert on significant user growth' },
              { key: 'revenueAlert' as const, label: 'Revenue Milestones', desc: 'Alert on MRR milestones' },
              { key: 'systemAlert' as const, label: 'System Alerts', desc: 'Errors and downtime notifications' },
              { key: 'weeklyReport' as const, label: 'Weekly Admin Report', desc: 'Platform health summary' },
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
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2"><Globe className="w-4 h-4" />Appearance</h3>
          <div className="flex items-center justify-between">
            <div><p className="text-sm font-medium text-foreground">Dark Mode</p><p className="text-xs text-muted-foreground">Toggle theme</p></div>
            <button onClick={toggleTheme} className={`relative w-10 h-5 rounded-full transition-colors ${isDark ? 'bg-primary' : 'bg-muted'}`}>
              <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${isDark ? 'left-5' : 'left-0.5'}`} />
            </button>
          </div>
        </div>

        {/* Database Actions */}
        <div className="rounded-2xl border border-border bg-card p-6">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2"><Database className="w-4 h-4" />System Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Clear Cache', icon: Zap, action: () => toast.success('Cache cleared!') },
              { label: 'Send Test Email', icon: Mail, action: () => toast.success('Test email sent!') },
              { label: 'Backup Database', icon: Database, action: () => toast.success('Backup initiated...') },
              { label: 'Export User Data', icon: Save, action: () => toast.success('Export started...') },
            ].map(({ label, icon: Icon, action }) => (
              <button key={label} onClick={action} className="flex items-center gap-2 px-4 py-3 rounded-xl border border-border text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-all">
                <Icon className="w-4 h-4" />{label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminSettings;
