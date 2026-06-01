import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, ArrowRight, Zap } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import logoImg from '@/assets/logo.png';
import heroImg from '@/assets/hero-startup.jpg';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [remember, setRemember] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname;

  // Role-to-dashboard map for users that already have a role assigned
  const dashboardPaths: Record<string, string> = {
    founder: '/dashboard/founder',
    mentor: '/dashboard/mentor',
    investor: '/dashboard/investor',
    team: '/dashboard/team',
    admin: '/dashboard/admin',
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const result = await login(form.email, form.password);
    setIsLoading(false);
    if (result.success) {
      toast.success('Welcome back!');
      // If there was an intended destination (from ProtectedRoute), go there
      if (from && from !== '/login' && from !== '/role-selection') {
        navigate(from, { replace: true });
      } else {
        // Demo users have pre-assigned roles — send them straight to their dashboard
        // New users go to role-selection to pick their role
        // We re-read from localStorage since state updates asynchronously
        try {
          const stored = localStorage.getItem('zerotoone_user');
          if (stored) {
            const u = JSON.parse(stored);
            if (u.role && dashboardPaths[u.role]) {
              // Admin always goes to admin dashboard directly
              // Other demo users with assigned roles go to their dashboard
              // Newly registered users (role defaults to 'founder') go to role-selection
              const isNewUser = u.id && u.id.startsWith('user_');
              if (isNewUser) {
                navigate('/role-selection', { replace: true });
              } else {
                navigate(dashboardPaths[u.role], { replace: true });
              }
            } else {
              navigate('/role-selection', { replace: true });
            }
          } else {
            navigate('/role-selection', { replace: true });
          }
        } catch {
          navigate('/role-selection', { replace: true });
        }
      }
    } else {
      toast.error(result.error || 'Login failed');
    }
  };

  const demoCredentials = [
    { role: 'Founder', email: 'founder@zerotoone.com', password: 'Founder123', color: 'blue' },
    { role: 'Mentor', email: 'mentor@zerotoone.com', password: 'Mentor123', color: 'purple' },
    { role: 'Investor', email: 'investor@zerotoone.com', password: 'Investor123', color: 'green' },
    { role: 'Admin', email: 'admin@zerotoone.com', password: 'Admin123', color: 'red' },
  ];

  const fillDemo = (email: string, password: string) => {
    setForm({ email, password });
    toast.info('Demo credentials filled. Click Login to continue.');
  };

  return (
    <div className="min-h-screen flex bg-gradient-hero">
      {/* Left - Image */}
      <div className="hidden lg:block w-1/2 relative overflow-hidden">
        <img src={heroImg} alt="Startup" className="w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] via-[#0F172A]/50 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-center p-16">
          <Link to="/" className="flex items-center gap-2 mb-12">
            <img src={logoImg} alt="ZeroToOne" className="w-10 h-10 rounded-xl" />
            <span className="text-2xl font-bold text-white">Zero<span className="text-gradient">To</span>One</span>
          </Link>
          <h2 className="text-5xl font-bold text-white mb-6 leading-tight">
            Welcome back,<br /><span className="text-gradient">Founder.</span>
          </h2>
          <p className="text-white/60 text-lg mb-10">
            Your startup dashboard is waiting. Let's build something great today.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: '50,000+', sub: 'Founders' },
              { label: '₹500Cr+', sub: 'Funding Raised' },
              { label: '500+', sub: 'Mentors' },
              { label: '95%', sub: 'Success Rate' },
            ].map((stat) => (
              <div key={stat.label} className="glass rounded-xl p-4">
                <p className="text-2xl font-bold text-white">{stat.label}</p>
                <p className="text-white/50 text-sm">{stat.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right - Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="glass-dark rounded-2xl p-8 border border-white/10">
            <div className="flex items-center gap-2 mb-6 lg:hidden">
              <img src={logoImg} alt="ZeroToOne" className="w-8 h-8 rounded-lg" />
              <span className="text-xl font-bold text-white">Zero<span className="text-gradient">To</span>One</span>
            </div>
            <h1 className="text-2xl font-bold text-white mb-1">Sign in to your account</h1>
            <p className="text-white/50 text-sm mb-6">Enter your credentials to access the dashboard.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-white/60 mb-1.5">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/25 focus:outline-none focus:border-blue-500 text-sm"
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-xs font-medium text-white/60">Password</label>
                  <Link to="/forgot-password" className="text-xs text-blue-400 hover:underline">Forgot password?</Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                  <input
                    type={showPass ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={form.password}
                    onChange={e => setForm({ ...form, password: e.target.value })}
                    required
                    className="w-full pl-10 pr-10 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/25 focus:outline-none focus:border-blue-500 text-sm"
                  />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60">
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} className="accent-blue-500" />
                <span className="text-sm text-white/50">Remember me for 30 days</span>
              </label>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold text-sm hover:from-blue-500 hover:to-blue-400 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <><Zap className="w-4 h-4" /> Sign In <ArrowRight className="w-4 h-4" /></>
                )}
              </button>
            </form>

            <div className="relative my-5">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10" /></div>
              <span className="relative flex justify-center text-xs text-white/30 px-3">or sign in with</span>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-5">
              {['Google', 'LinkedIn'].map((p) => (
                <button key={p} onClick={() => toast.info(`${p} SSO coming soon`)} className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white/70 text-sm hover:bg-white/10 hover:text-white transition-all">
                  {p}
                </button>
              ))}
            </div>

            <p className="text-center text-sm text-white/40">
              Don't have an account?{' '}
              <Link to="/register" className="text-blue-400 font-medium hover:underline">Create one free</Link>
            </p>
          </div>

          {/* Demo Credentials */}
          <div className="mt-4 p-4 rounded-xl border border-white/10 bg-white/5">
            <p className="text-xs font-semibold text-white/50 mb-3">Quick Demo Access:</p>
            <div className="grid grid-cols-2 gap-2">
              {demoCredentials.map((cred) => (
                <button
                  key={cred.role}
                  onClick={() => fillDemo(cred.email, cred.password)}
                  className="px-3 py-2 rounded-lg border border-white/10 text-xs text-white/60 hover:text-white hover:bg-white/10 transition-all text-left"
                >
                  <span className="font-semibold text-white/80">{cred.role}</span>
                  <br />
                  <span className="text-white/40">{cred.email}</span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
