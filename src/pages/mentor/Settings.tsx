import { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Bell, Shield, CreditCard, User, Globe, Moon, Sun, Trash2, Save, Eye, EyeOff } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { toast } from 'sonner';
import { useTheme } from '@/contexts/ThemeContext';

const MentorSettings = () => {
  const { isDark, toggleTheme } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [notifications, setNotifications] = useState({
    newBooking: true, sessionReminder: true, newMessage: true, weeklyReport: false, promotions: false,
  });
  const [form, setForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });

  const toggleNotif = (key: keyof typeof notifications) => setNotifications(prev => ({ ...prev, [key]: !prev[key] }));

  return (
    <DashboardLayout title="Settings">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Account Settings */}
        <div className="rounded-2xl border border-border bg-card p-6">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2"><User className="w-4 h-4" /> Account Settings</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-muted-foreground mb-1.5 block">Display Name</label>
                <input defaultValue="Priya Nair" className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:border-primary" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1.5 block">Email</label>
                <input defaultValue="mentor@zerotoone.com" type="email" className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:border-primary" />
              </div>
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block">Phone Number</label>
              <input defaultValue="+91 98765 43210" className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:border-primary" />
            </div>
            <button onClick={() => toast.success('Account settings saved!')} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all">
              <Save className="w-4 h-4" /> Save Changes
            </button>
          </div>
        </div>

        {/* Change Password */}
        <div className="rounded-2xl border border-border bg-card p-6">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2"><Shield className="w-4 h-4" /> Security</h3>
          <div className="space-y-4">
            {[
              { label: 'Current Password', key: 'currentPassword' },
              { label: 'New Password', key: 'newPassword' },
              { label: 'Confirm New Password', key: 'confirmPassword' },
            ].map(({ label, key }) => (
              <div key={key} className="relative">
                <label className="text-xs text-muted-foreground mb-1.5 block">{label}</label>
                <input type={showPassword ? 'text' : 'password'} value={form[key as keyof typeof form]} onChange={e => setForm({ ...form, [key]: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:border-primary pr-10" />
                <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-8 text-muted-foreground hover:text-foreground">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            ))}
            <button onClick={() => toast.success('Password changed successfully!')} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all">
              <Shield className="w-4 h-4" /> Update Password
            </button>
          </div>
        </div>

        {/* Notifications */}
        <div className="rounded-2xl border border-border bg-card p-6">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2"><Bell className="w-4 h-4" /> Notification Preferences</h3>
          <div className="space-y-4">
            {[
              { key: 'newBooking' as const, label: 'New Booking Alert', desc: 'Get notified when someone books a session' },
              { key: 'sessionReminder' as const, label: 'Session Reminder', desc: '30 min before each session' },
              { key: 'newMessage' as const, label: 'New Message', desc: 'Notify when founders message you' },
              { key: 'weeklyReport' as const, label: 'Weekly Summary Report', desc: 'Every Sunday evening' },
              { key: 'promotions' as const, label: 'Platform Promotions', desc: 'Feature announcements and tips' },
            ].map(({ key, label, desc }) => (
              <div key={key} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">{label}</p>
                  <p className="text-xs text-muted-foreground">{desc}</p>
                </div>
                <button onClick={() => toggleNotif(key)} className={`relative w-10 h-5 rounded-full transition-colors ${notifications[key] ? 'bg-primary' : 'bg-muted'}`}>
                  <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${notifications[key] ? 'left-5' : 'left-0.5'}`} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Appearance */}
        <div className="rounded-2xl border border-border bg-card p-6">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2"><Globe className="w-4 h-4" /> Appearance</h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Dark Mode</p>
              <p className="text-xs text-muted-foreground">Toggle between light and dark theme</p>
            </div>
            <button onClick={toggleTheme} className={`relative w-10 h-5 rounded-full transition-colors ${isDark ? 'bg-primary' : 'bg-muted'}`}>
              <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${isDark ? 'left-5' : 'left-0.5'}`} />
            </button>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6">
          <h3 className="font-semibold text-red-500 mb-2 flex items-center gap-2"><Trash2 className="w-4 h-4" /> Danger Zone</h3>
          <p className="text-sm text-muted-foreground mb-4">These actions are irreversible. Please proceed with caution.</p>
          <div className="flex gap-3">
            <button onClick={() => toast.error('Deactivate feature not available in demo')} className="px-4 py-2 rounded-xl border border-red-500/30 text-red-500 text-sm font-medium hover:bg-red-500/10 transition-all">
              Deactivate Account
            </button>
            <button onClick={() => toast.error('Delete feature not available in demo')} className="px-4 py-2 rounded-xl bg-red-500 text-white text-sm font-medium hover:bg-red-400 transition-all">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MentorSettings;
