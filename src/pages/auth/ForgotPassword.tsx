import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, CheckCircle, Zap } from 'lucide-react';
import { toast } from 'sonner';
import logoImg from '@/assets/logo.png';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setIsLoading(false);
    setSent(true);
    toast.success('Reset link sent! Check your email.');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-hero px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="glass-dark rounded-2xl p-8 border border-white/10">
          <div className="flex justify-center mb-6">
            <img src={logoImg} alt="ZeroToOne" className="w-12 h-12 rounded-xl" />
          </div>
          {!sent ? (
            <>
              <h1 className="text-2xl font-bold text-white text-center mb-2">Forgot Password?</h1>
              <p className="text-white/50 text-sm text-center mb-6">No worries. Enter your email and we'll send a reset link.</p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-white/60 mb-1.5">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/25 focus:outline-none focus:border-blue-500 text-sm"
                    />
                  </div>
                </div>
                <button type="submit" disabled={isLoading} className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-60">
                  {isLoading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Zap className="w-4 h-4" /> Send Reset Link</>}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center">
              <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-white mb-2">Check your email!</h2>
              <p className="text-white/50 text-sm mb-6">We've sent a password reset link to <span className="text-blue-400">{email}</span>. Check your inbox.</p>
              <button onClick={() => setSent(false)} className="text-blue-400 text-sm hover:underline">Didn't receive it? Resend</button>
            </div>
          )}
          <div className="mt-6 text-center">
            <Link to="/login" className="flex items-center justify-center gap-2 text-sm text-white/40 hover:text-white/70 transition-all">
              <ArrowLeft className="w-4 h-4" /> Back to Login
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
