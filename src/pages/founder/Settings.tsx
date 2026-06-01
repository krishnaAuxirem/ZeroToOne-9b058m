import { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Bell, Shield, CreditCard, Eye, EyeOff, Save, Trash2, Globe, Moon } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useTheme } from '@/contexts/ThemeContext';
import { toast } from 'sonner';

const FounderSettings = () => {
  const { isDark, toggleTheme } = useTheme();
  const [showPass, setShowPass] = useState(false);
  const [notifications, setNotifications] = useState({
    investorActivity: true, mentorMessages: true, communityReplies: true, weeklyDigest: true, platformUpdates: false,
  });
  const [privacy, setPrivacy] = useState({
    publicProfile: true, showMetrics: false, showInvestors: true,
  });

  const toggleN = (k: keyof typeof notifications) => setNotifications(p => ({ ...p, [k]: !p[k] }));
  const toggleP = (k: keyof typeof privacy) => setPrivacy(p => ({ ...p, [k]: !p[k] }));

  return (
    <DashboardLayout title="Settings">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Account */}
        <div className="rounded-2xl border border-border bg-card p-6">
          <h3 className="font-semibold text-foreground mb-4">Account Information</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><label className="text-xs text-muted-foreground mb-1 block">Name</label><input defaultValue="Arjun Sharma" className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:border-primary" /></div>
              <div><label className="text-xs text-muted-foreground mb-1 block">Email</label><input defaultValue="founder@zerotoone.com" className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:border-primary" /></div>
            </div>
            <button onClick={() => toast.success('Account updated!')} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90"><Save className="w-4 h-4" /> Save</button>
          </div>
        </div>

        {/* Security */}
        <div className="rounded-2xl border border-border bg-card p-6">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2"><Shield className="w-4 h-4" /> Security</h3>
          <div className="space-y-4">
            {['Current Password', 'New Password', 'Confirm Password'].map(label => (
              <div key={label} className="relative">
                <label className="text-xs text-muted-foreground mb-1 block">{label}</label>
                <input type={showPass ? 'text' : 'password'} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:border-primary pr-10" />
                <button onClick={() => setShowPass(!showPass)} className="absolute right-3 top-8 text-muted-foreground">{showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button>
              </div>
            ))}
            <div className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
              <div><p className="text-sm font-medium text-foreground">Two-Factor Authentication</p><p className="text-xs text-muted-foreground">Add an extra layer of security</p></div>
              <button onClick={() => toast.success('2FA setup coming soon!')} className="px-3 py-1.5 rounded-lg border border-border text-sm text-muted-foreground hover:bg-muted transition-all">Enable</button>
            </div>
            <button onClick={() => toast.success('Password changed!')} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90"><Shield className="w-4 h-4" /> Update Password</button>
          </div>
        </div>

        {/* Notifications */}
        <div className="rounded-2xl border border-border bg-card p-6">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2"><Bell className="w-4 h-4" /> Notifications</h3>
          <div className="space-y-4">
            {[
              { key: 'investorActivity' as const, label: 'Investor Activity', desc: 'When investors view your profile' },
              { key: 'mentorMessages' as const, label: 'Mentor Messages', desc: 'Messages from mentors' },
              { key: 'communityReplies' as const, label: 'Community Replies', desc: 'Replies on your posts' },
              { key: 'weeklyDigest' as const, label: 'Weekly Digest', desc: 'Platform summary every Monday' },
              { key: 'platformUpdates' as const, label: 'Platform Updates', desc: 'New feature announcements' },
            ].map(({ key, label, desc }) => (
              <div key={key} className="flex items-center justify-between">
                <div><p className="text-sm font-medium text-foreground">{label}</p><p className="text-xs text-muted-foreground">{desc}</p></div>
                <button onClick={() => toggleN(key)} className={`relative w-10 h-5 rounded-full transition-colors ${notifications[key] ? 'bg-primary' : 'bg-muted'}`}>
                  <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${notifications[key] ? 'left-5' : 'left-0.5'}`} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Privacy */}
        <div className="rounded-2xl border border-border bg-card p-6">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2"><Eye className="w-4 h-4" /> Privacy</h3>
          <div className="space-y-4">
            {[
              { key: 'publicProfile' as const, label: 'Public Profile', desc: 'Anyone can view your profile' },
              { key: 'showMetrics' as const, label: 'Show Startup Metrics', desc: 'Display MRR/users to investors' },
              { key: 'showInvestors' as const, label: 'Visible to Investors', desc: 'Appear in investor discovery' },
            ].map(({ key, label, desc }) => (
              <div key={key} className="flex items-center justify-between">
                <div><p className="text-sm font-medium text-foreground">{label}</p><p className="text-xs text-muted-foreground">{desc}</p></div>
                <button onClick={() => toggleP(key)} className={`relative w-10 h-5 rounded-full transition-colors ${privacy[key] ? 'bg-primary' : 'bg-muted'}`}>
                  <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${privacy[key] ? 'left-5' : 'left-0.5'}`} />
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

        {/* Danger Zone */}
        <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6">
          <h3 className="font-semibold text-red-500 mb-2 flex items-center gap-2"><Trash2 className="w-4 h-4" />Danger Zone</h3>
          <div className="flex gap-3">
            <button onClick={() => toast.error('Not available in demo')} className="px-4 py-2 rounded-xl border border-red-500/30 text-red-500 text-sm font-medium hover:bg-red-500/10 transition-all">Deactivate Account</button>
            <button onClick={() => toast.error('Not available in demo')} className="px-4 py-2 rounded-xl bg-red-500 text-white text-sm font-medium hover:bg-red-400 transition-all">Delete Account</button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default FounderSettings;
