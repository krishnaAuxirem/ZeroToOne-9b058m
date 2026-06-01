import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldX, ArrowLeft, LogIn } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import logoImg from '@/assets/logo.png';

const AccessDenied = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const dashboardPaths: Record<string, string> = {
    founder: '/dashboard/founder',
    mentor: '/dashboard/mentor',
    investor: '/dashboard/investor',
    team: '/dashboard/team',
    admin: '/dashboard/admin',
  };

  const handleGoToDashboard = () => {
    if (user) {
      navigate(dashboardPaths[user.role] || '/role-selection');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full text-center"
      >
        <div className="glass-dark rounded-2xl p-10 border border-red-500/20">
          <div className="flex justify-center mb-6">
            <img src={logoImg} alt="ZeroToOne" className="w-10 h-10 rounded-xl" />
          </div>

          <div className="w-20 h-20 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center mx-auto mb-6">
            <ShieldX className="w-10 h-10 text-red-400" />
          </div>

          <h1 className="text-3xl font-bold text-white mb-2">403 — Access Denied</h1>
          <p className="text-white/50 text-sm mb-2">You don't have permission to access this page.</p>

          {user && (
            <p className="text-white/30 text-xs mb-6">
              Your current role is <span className="text-white/60 font-semibold capitalize">{user.role}</span>. This section requires a different role.
            </p>
          )}

          {!user && (
            <p className="text-white/30 text-xs mb-6">
              You are not signed in. Please log in to access restricted areas.
            </p>
          )}

          <div className="flex flex-col gap-3">
            <button
              onClick={handleGoToDashboard}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold text-sm hover:from-blue-500 hover:to-blue-400 transition-all flex items-center justify-center gap-2"
            >
              {isAuthenticated ? (
                <><ArrowLeft className="w-4 h-4" /> Go to My Dashboard</>
              ) : (
                <><LogIn className="w-4 h-4" /> Sign In</>
              )}
            </button>
            <button
              onClick={() => navigate('/')}
              className="w-full py-3 rounded-xl border border-white/10 text-white/50 text-sm hover:bg-white/5 hover:text-white/80 transition-all"
            >
              Return to Homepage
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AccessDenied;
