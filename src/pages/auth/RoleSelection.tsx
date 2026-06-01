import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Rocket, Star, TrendingUp, Users, ArrowRight, ShieldAlert, LogIn } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types';
import { toast } from 'sonner';
import logoImg from '@/assets/logo.png';

const ROLES = [
  {
    role: 'founder' as UserRole,
    icon: Rocket,
    label: 'Startup Founder',
    description: 'Validate ideas, build teams, raise funding, and scale your startup.',
    features: ['AI Idea Validation', 'Business Plan Builder', 'Investor Connect', 'Mentor Marketplace'],
    color: 'blue',
    gradient: 'from-blue-600/20 to-blue-600/5',
    border: 'border-blue-500/40',
  },
  {
    role: 'mentor' as UserRole,
    icon: Star,
    label: 'Mentor / Advisor',
    description: 'Share expertise, guide startups, and earn revenue from consultation.',
    features: ['Consultation Bookings', 'Revenue Dashboard', 'Startup Clinic', 'Session Management'],
    color: 'purple',
    gradient: 'from-purple-600/20 to-purple-600/5',
    border: 'border-purple-500/40',
  },
  {
    role: 'investor' as UserRole,
    icon: TrendingUp,
    label: 'Investor / VC',
    description: 'Discover high-quality deal flow, review pitches, and invest in the future.',
    features: ['Startup Discovery', 'Pitch Reviews', 'Portfolio Tracking', 'Founder Meetings'],
    color: 'green',
    gradient: 'from-green-600/20 to-green-600/5',
    border: 'border-green-500/40',
  },
  {
    role: 'team' as UserRole,
    icon: Users,
    label: 'Team Member',
    description: 'Collaborate on startup projects, manage tasks, and track milestones.',
    features: ['Task Management', 'Project Collaboration', 'Milestone Tracking', 'Team Chat'],
    color: 'orange',
    gradient: 'from-orange-600/20 to-orange-600/5',
    border: 'border-orange-500/40',
  },
];

const RoleSelection = () => {
  const { user, setRole, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Guard: must be authenticated (ProtectedRoute also handles this, but double-check)
  if (!isAuthenticated) {
    navigate('/login', { replace: true });
    return null;
  }

  const handleSelect = (role: UserRole) => {
    // Admin role cannot be self-assigned from role selection
    if (role === 'admin') {
      toast.error('Admin access requires special credentials. Please contact support.');
      return;
    }

    setRole(role);

    const paths: Record<string, string> = {
      founder: '/dashboard/founder',
      mentor: '/dashboard/mentor',
      investor: '/dashboard/investor',
      team: '/dashboard/team',
    };

    toast.success(`Welcome, ${role.charAt(0).toUpperCase() + role.slice(1)}! Redirecting to your dashboard...`);
    navigate(paths[role]);
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center py-16 px-4">
      <div className="max-w-5xl w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-4">
            <img src={logoImg} alt="ZeroToOne" className="w-12 h-12 rounded-xl" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-3">How are you building?</h1>
          <p className="text-white/50 text-lg max-w-lg mx-auto">
            Select your role to get a personalized dashboard experience.
          </p>
          {user && (
            <div className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
              <div className="w-2 h-2 rounded-full bg-green-400" />
              <span className="text-green-300 text-sm font-medium">Signed in as {user.name} · {user.email}</span>
            </div>
          )}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 xl:gap-5">
          {ROLES.map((r, i) => {
            const Icon = r.icon;
            return (
              <motion.button
                key={r.role}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => handleSelect(r.role)}
                className={`text-left p-6 rounded-2xl border ${r.border} bg-gradient-to-br ${r.gradient} hover:scale-[1.02] transition-all group relative overflow-hidden`}
              >
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br ${r.gradient}`} />
                <div className="relative">
                  <div className={`w-12 h-12 rounded-xl bg-${r.color}-500/20 flex items-center justify-center mb-4`}>
                    <Icon className={`w-6 h-6 text-${r.color}-400`} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{r.label}</h3>
                  <p className="text-white/50 text-sm mb-4 leading-relaxed">{r.description}</p>
                  <ul className="space-y-1.5 mb-5">
                    {r.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-xs text-white/60">
                        <div className={`w-1.5 h-1.5 rounded-full bg-${r.color}-400`} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className={`flex items-center gap-2 text-${r.color}-400 text-sm font-semibold group-hover:gap-3 transition-all`}>
                    Select this role <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Admin notice */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 flex items-center gap-3 p-4 rounded-xl border border-white/10 bg-white/5 text-white/40 text-sm"
        >
          <ShieldAlert className="w-4 h-4 text-red-400 flex-shrink-0" />
          <span>Admin access is not available via role selection. Admin accounts require dedicated credentials. <a href="/login" className="text-red-400 underline">Sign in with admin credentials</a>.</span>
        </motion.div>
      </div>
    </div>
  );
};

export default RoleSelection;
