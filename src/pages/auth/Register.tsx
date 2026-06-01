import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, User, Phone, Zap, ArrowRight, CheckCircle, Sparkles } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import logoImg from '@/assets/logo.png';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '', phone: '' });
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) return toast.error('Please accept the terms and conditions');
    if (form.password !== form.confirmPassword) return toast.error('Passwords do not match');
    if (form.password.length < 6) return toast.error('Password must be at least 6 characters');
    setIsLoading(true);
    const result = await register({ name: form.name, email: form.email, password: form.password, phone: form.phone });
    setIsLoading(false);
    if (result.success) {
      toast.success('Account created! Please login to continue.');
      navigate('/login');
    } else {
      toast.error(result.error || 'Registration failed');
    }
  };

  const perks = [
    'AI-powered startup validation',
    'Access to 500+ mentor network',
    'Investor matching platform',
    'Free Startup Academy courses',
  ];

  return (
    <div className="min-h-screen flex bg-gradient-hero">
      {/* Left Panel */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-transparent to-orange-900/20" />
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-blue-500/10"
              style={{
                width: Math.random() * 100 + 20,
                height: Math.random() * 100 + 20,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float ${4 + Math.random() * 4}s ease-in-out infinite ${Math.random() * 4}s`,
              }}
            />
          ))}
        </div>
        <div className="relative">
          <Link to="/" className="flex items-center gap-2">
            <img src={logoImg} alt="ZeroToOne" className="w-10 h-10 rounded-xl" />
            <span className="text-2xl font-bold text-white">Zero<span className="text-gradient">To</span>One</span>
          </Link>
        </div>
        <div className="relative">
          <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
            Your startup journey<br />starts here.
          </h2>
          <p className="text-white/60 text-lg mb-8">
            Join 50,000+ founders building the next generation of startups.
          </p>
          <div className="space-y-3">
            {perks.map((perk, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="flex items-center gap-3 text-white/80"
              >
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                {perk}
              </motion.div>
            ))}
          </div>
        </div>
        <div className="relative">
          <div className="flex items-center gap-3 p-4 glass rounded-xl">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=success" alt="" className="w-10 h-10 rounded-full bg-white/10" />
            <div>
              <p className="text-white text-sm font-medium">"Raised ₹12Cr in 6 months using ZeroToOne"</p>
              <p className="text-white/50 text-xs">Priya K. — Founder, KiddieCare</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel */}
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
            <h1 className="text-2xl font-bold text-white mb-1">Create your account</h1>
            <p className="text-white/50 text-sm mb-6">Start building your startup today. Free forever.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-white/60 mb-1.5">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                  <input
                    type="text"
                    placeholder="Arjun Sharma"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/25 focus:outline-none focus:border-blue-500 text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-white/60 mb-1.5">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                  <input
                    type="email"
                    placeholder="arjun@startup.com"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/25 focus:outline-none focus:border-blue-500 text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-white/60 mb-1.5">Phone (Optional)</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/25 focus:outline-none focus:border-blue-500 text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-white/60 mb-1.5">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                  <input
                    type={showPass ? 'text' : 'password'}
                    placeholder="Min. 6 characters"
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
              <div>
                <label className="block text-xs font-medium text-white/60 mb-1.5">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                  <input
                    type={showConfirm ? 'text' : 'password'}
                    placeholder="Repeat password"
                    value={form.confirmPassword}
                    onChange={e => setForm({ ...form, confirmPassword: e.target.value })}
                    required
                    className="w-full pl-10 pr-10 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/25 focus:outline-none focus:border-blue-500 text-sm"
                  />
                  <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60">
                    {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} className="mt-0.5 accent-blue-500" />
                <span className="text-xs text-white/50">
                  I agree to the{' '}
                  <Link to="/terms" className="text-blue-400 hover:underline">Terms & Conditions</Link>
                  {' '}and{' '}
                  <Link to="/privacy" className="text-blue-400 hover:underline">Privacy Policy</Link>
                </span>
              </label>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold text-sm hover:from-blue-500 hover:to-blue-400 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <><Zap className="w-4 h-4" /> Create Account <ArrowRight className="w-4 h-4" /></>
                )}
              </button>
            </form>

            <div className="relative my-5">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10" /></div>
              <div className="relative flex justify-center text-xs text-white/30 bg-transparent">
                <span className="px-3 bg-transparent">or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {['Google', 'LinkedIn'].map((provider) => (
                <button
                  key={provider}
                  onClick={() => toast.info(`${provider} login coming soon!`)}
                  className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white/70 text-sm hover:bg-white/10 hover:text-white transition-all"
                >
                  {provider}
                </button>
              ))}
            </div>

            <p className="text-center text-sm text-white/40 mt-5">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-400 font-medium hover:underline">Sign in</Link>
            </p>
          </div>

          {/* Demo Credentials */}
          <div className="mt-4 p-4 rounded-xl border border-white/10 bg-white/5">
            <p className="text-xs font-semibold text-white/50 mb-2">Demo Credentials (Login):</p>
            <div className="grid grid-cols-2 gap-1.5 text-xs text-white/40">
              <span>Founder: founder@zerotoone.com</span>
              <span>/ Founder123</span>
              <span>Mentor: mentor@zerotoone.com</span>
              <span>/ Mentor123</span>
              <span>Investor: investor@zerotoone.com</span>
              <span>/ Investor123</span>
              <span>Admin: admin@zerotoone.com</span>
              <span>/ Admin123</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
