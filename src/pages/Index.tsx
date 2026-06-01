import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import {
  ArrowRight, Play, Zap, Rocket, Star, TrendingUp, Users, BookOpen,
  CheckCircle, Target, DollarSign,
  BarChart3, Globe, Award, MessageSquare, Mail,
  Sparkles, Bot, Map, Trophy, HelpCircle, GraduationCap, ChevronDown,
  Activity, Shield, Layers, Cpu
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AnimatedCounter from '@/components/features/AnimatedCounter';
import { MENTORS, TESTIMONIALS, FAQ_DATA, SUCCESS_STORIES, COURSES } from '@/lib/mockData';
import heroImg from '@/assets/hero-startup.jpg';
import founderImg from '@/assets/founder-pitch.jpg';
import teamImg from '@/assets/team-collaboration.jpg';
import mentorImg from '@/assets/mentor-session.jpg';
import investorImg from '@/assets/investor-meeting.jpg';
import aiImg from '@/assets/ai-analytics.jpg';
import successImg from '@/assets/startup-success.jpg';

/* ─── Constants ───────────────────────────────── */
const STATS = [
  { label: 'Active Founders', value: 50000, suffix: '+', color: 'from-blue-500 to-blue-400', delay: 0 },
  { label: 'Funding Raised', value: 500, prefix: '₹', suffix: 'Cr+', color: 'from-emerald-500 to-emerald-400', delay: 150 },
  { label: 'Expert Mentors', value: 500, suffix: '+', color: 'from-purple-500 to-purple-400', delay: 300 },
  { label: 'Success Rate', value: 95, suffix: '%', color: 'from-orange-500 to-orange-400', delay: 450 },
];

const FEATURES = [
  { icon: Cpu, title: 'AI Startup Copilot', desc: '24/7 AI advisor trained on 10,000+ startup playbooks', href: '/ai-copilot', color: 'blue', tag: 'Most Used' },
  { icon: Target, title: 'Idea Validation Engine', desc: 'AI-powered market analysis with opportunity scoring', href: '/startup-academy', color: 'orange', tag: null },
  { icon: BookOpen, title: 'Startup Academy', desc: '100+ courses and bootcamps from successful founders', href: '/startup-academy', color: 'purple', tag: 'Popular' },
  { icon: Star, title: 'Mentor Marketplace', desc: 'Book 1:1 sessions with vetted industry veterans', href: '/mentors', color: 'yellow', tag: null },
  { icon: TrendingUp, title: 'Investor Connect', desc: 'Get matched with the right investors for your stage', href: '/investors', color: 'green', tag: null },
  { icon: Users, title: 'Team Building', desc: 'Find co-founders and early team via skill matching', href: '/community', color: 'pink', tag: null },
];

const PROCESS_STEPS = [
  { step: '01', title: 'Validate Your Idea', desc: 'Submit your startup idea and get AI-powered market analysis, competitor mapping, and opportunity scoring in minutes.', icon: Lightbulb, color: 'blue' },
  { step: '02', title: 'Build Your Plan', desc: 'Create investor-ready business plans, financial models, and product roadmaps with real-time AI assistance.', icon: FileText, color: 'purple' },
  { step: '03', title: 'Build Your Team', desc: 'Find the perfect co-founder and early team through our skill-based and culture-fit matching algorithm.', icon: Users, color: 'green' },
  { step: '04', title: 'Learn & Execute', desc: 'Enroll in academy courses, book mentor sessions, and use execution workspaces to stay on track.', icon: BookOpen, color: 'orange' },
  { step: '05', title: 'Raise Funding', desc: 'Get matched with investors, build your pitch deck with AI, and manage your fundraising pipeline end-to-end.', icon: DollarSign, color: 'emerald' },
  { step: '06', title: 'Scale & Grow', desc: 'Track KPIs with real-time dashboards, optimize growth strategies, and identify your next growth lever.', icon: TrendingUp, color: 'pink' },
];

const PRICING = [
  {
    name: 'Starter', price: { monthly: 0, yearly: 0 }, desc: 'Perfect for aspiring entrepreneurs',
    features: ['3 Idea Validations/month', 'Basic Market Analysis', '2 Mentor Sessions', '5 Academy Courses', 'Community Access'],
    color: 'border-border', cta: 'Get Started Free',
  },
  {
    name: 'Growth', price: { monthly: 999, yearly: 9990 }, desc: 'For early-stage founders',
    features: ['Unlimited Idea Validation', 'AI Startup Copilot', 'Business Plan Builder', '10 Mentor Sessions', 'Investor Network Access', 'Analytics Dashboard'],
    color: 'border-blue-500/60', popular: true, cta: 'Start Growth Plan',
  },
  {
    name: 'Founder Pro', price: { monthly: 2999, yearly: 29990 }, desc: 'For scaling startups',
    features: ['Everything in Growth', 'Unlimited Mentor Sessions', 'AI Pitch Deck Builder', 'Investor Direct Connect', 'Co-Founder Matching', 'Priority Support'],
    color: 'border-orange-500/60', cta: 'Go Founder Pro',
  },
  {
    name: 'Investor Pro', price: { monthly: 4999, yearly: 49990 }, desc: 'For investors & VCs',
    features: ['Full Startup Database', 'Advanced Filters', 'Direct Founder Connect', 'Portfolio Analytics', 'Deal Flow CRM', 'Priority Placement'],
    color: 'border-emerald-500/60', cta: 'Start Investing',
  },
];

const TICKER_ITEMS = [
  '🚀 EduVerse raises ₹12 Cr Seed round',
  '🎯 HealthBridge achieves 45K users milestone',
  '💰 FinFlow closes ₹35 Cr Series A',
  '🌱 AgriChain wins NASSCOM Startup Award',
  '⚡ 500+ mentors now on platform',
  '🏆 50,000+ founders building on ZeroToOne',
  '📈 ₹500 Cr+ total funding raised via platform',
  '🤖 AI Copilot handles 10,000+ queries daily',
];

const TRUSTED_LOGOS = ['Y Combinator', 'AngelList', 'Sequoia', 'NASSCOM', 'Startup India', 'TiE Global'];

// Needed imports referenced in PROCESS_STEPS
import { Lightbulb, FileText } from 'lucide-react';

/* ─── Floating Particle ────────────────────────── */
const Particle = ({ delay, size, x, y, color }: { delay: number; size: number; x: number; y: number; color: string }) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={{ width: size, height: size, background: color, left: `${x}%`, top: `${y}%` }}
    animate={{ y: [0, -25, 0], x: [0, 8, 0], opacity: [0.1, 0.5, 0.1] }}
    transition={{ duration: 5 + delay, repeat: Infinity, delay, ease: 'easeInOut' }}
  />
);

/* ─── Floating Card (Hero) ─────────────────────── */
const FloatingCard = ({ children, className, yAmt = 12, delay = 0 }: { children: React.ReactNode; className?: string; yAmt?: number; delay?: number }) => (
  <motion.div
    animate={{ y: [0, -yAmt, 0] }}
    transition={{ duration: 5 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
    className={className}
  >
    {children}
  </motion.div>
);

/* ─── Aurora Background ─────────────────────────── */
const AuroraBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <motion.div
      animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.6, 0.4] }}
      transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] rounded-full"
      style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 70%)' }}
    />
    <motion.div
      animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
      transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
      className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full"
      style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.18) 0%, transparent 70%)' }}
    />
    <motion.div
      animate={{ scale: [1, 1.08, 1], opacity: [0.2, 0.4, 0.2] }}
      transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 6 }}
      className="absolute top-[40%] right-[20%] w-[40%] h-[40%] rounded-full"
      style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%)' }}
    />
    {/* Grid overlay */}
    <div
      className="absolute inset-0 opacity-[0.025]"
      style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }}
    />
  </div>
);

/* ─── Pricing Section ──────────────────────────── */
const PricingSection = () => {
  const [yearly, setYearly] = useState(false);
  return (
    <section id="pricing" className="py-28 bg-background relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-border to-transparent" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/8 border border-blue-500/20 text-blue-500 text-sm font-semibold mb-5">
            <Sparkles className="w-3.5 h-3.5" /> Transparent Pricing
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 font-['Space_Grotesk']">
            Simple, honest pricing
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8">Start free. Scale as you grow. Prices in Indian Rupees ₹.</p>
          <div className="flex items-center justify-center gap-3">
            <span className={`text-sm ${!yearly ? 'text-foreground font-semibold' : 'text-muted-foreground'}`}>Monthly</span>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setYearly(!yearly)}
              className={`relative w-12 h-6 rounded-full transition-colors ${yearly ? 'bg-blue-600' : 'bg-muted'}`}
            >
              <motion.span
                animate={{ x: yearly ? 24 : 2 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-md"
              />
            </motion.button>
            <span className={`text-sm flex items-center gap-1.5 ${yearly ? 'text-foreground font-semibold' : 'text-muted-foreground'}`}>
              Yearly
              <motion.span
                animate={{ scale: yearly ? [1, 1.1, 1] : 1 }}
                className="text-emerald-500 text-xs font-bold"
              >Save 17%</motion.span>
            </span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {PRICING.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className={`relative rounded-2xl border-2 ${plan.color} bg-card p-6 transition-all duration-300 ${plan.popular ? 'shadow-2xl shadow-blue-500/15 ring-1 ring-blue-500/30' : ''}`}
            >
              {plan.popular && (
                <motion.div
                  animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-white text-xs font-bold"
                  style={{ background: 'linear-gradient(90deg, #2563eb, #7c3aed, #2563eb)', backgroundSize: '200% 100%' }}
                >
                  Most Popular
                </motion.div>
              )}
              <h3 className="text-lg font-bold text-foreground mb-1 font-['Space_Grotesk']">{plan.name}</h3>
              <p className="text-muted-foreground text-xs mb-5">{plan.desc}</p>
              <motion.div
                key={`${plan.name}-${yearly}`}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6"
              >
                <span className="text-3xl font-bold text-foreground font-['Space_Grotesk']">
                  {plan.price.monthly === 0 ? 'Free' : `₹${(yearly ? plan.price.yearly : plan.price.monthly).toLocaleString('en-IN')}`}
                </span>
                {plan.price.monthly > 0 && <span className="text-muted-foreground text-sm ml-1">/{yearly ? 'yr' : 'mo'}</span>}
              </motion.div>
              <ul className="space-y-2.5 mb-7">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" /> {f}
                  </li>
                ))}
              </ul>
              <Link
                to="/register"
                className={`block w-full text-center py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  plan.popular
                    ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-500 hover:to-blue-400 glow-blue-sm'
                    : 'border border-border text-foreground hover:bg-muted hover:border-primary/30'
                }`}
              >
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── Main Component ───────────────────────────── */
const Home = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const { scrollY } = useScroll();
  const heroParallax = useTransform(scrollY, [0, 600], [0, 180]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
  };

  return (
    <div className="bg-background overflow-x-hidden">
      <Navbar />

      {/* ══ HERO ══════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-aurora">
        <AuroraBackground />

        {/* Parallax image layer */}
        <motion.div style={{ y: heroParallax }} className="absolute inset-0 pointer-events-none">
          <img
            src={heroImg}
            alt=""
            className="w-full h-full object-cover opacity-[0.08]"
            style={{ filter: 'saturate(0.6)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#04091a]/60 to-[#04091a]" />
        </motion.div>

        {/* Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[
            { delay: 0, size: 4, x: 15, y: 20, color: 'rgba(59,130,246,0.7)' },
            { delay: 1, size: 3, x: 85, y: 15, color: 'rgba(139,92,246,0.7)' },
            { delay: 2, size: 5, x: 70, y: 70, color: 'rgba(16,185,129,0.6)' },
            { delay: 0.5, size: 3, x: 30, y: 80, color: 'rgba(249,115,22,0.6)' },
            { delay: 1.5, size: 4, x: 55, y: 35, color: 'rgba(59,130,246,0.5)' },
            { delay: 3, size: 3, x: 90, y: 55, color: 'rgba(236,72,153,0.5)' },
            { delay: 2.5, size: 6, x: 10, y: 60, color: 'rgba(139,92,246,0.4)' },
            { delay: 0.8, size: 3, x: 45, y: 90, color: 'rgba(34,197,94,0.5)' },
          ].map((p, i) => <Particle key={i} {...p} />)}
        </div>

        {/* Floating metric cards */}
        <FloatingCard
          className="absolute top-28 right-[6%] hidden xl:block"
          yAmt={14}
          delay={0}
        >
          <div className="glass rounded-2xl p-4 w-56 border border-white/10 shadow-2xl shadow-blue-500/10">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <p className="text-white/90 text-xs font-semibold">Round Closed</p>
                <p className="text-emerald-400 text-[11px]">EduVerse · Seed</p>
              </div>
            </div>
            <p className="text-white text-2xl font-bold font-['Space_Grotesk']">₹12.4 Cr</p>
            <div className="flex items-center gap-1.5 mt-2">
              <div className="live-dot w-2 h-2" />
              <p className="text-emerald-400 text-xs font-medium">Funded 2 days ago</p>
            </div>
          </div>
        </FloatingCard>

        <FloatingCard
          className="absolute bottom-48 right-[10%] hidden xl:block"
          yAmt={10}
          delay={1.5}
        >
          <div className="glass rounded-2xl p-3.5 w-52 border border-white/10 shadow-xl">
            <p className="text-white/50 text-[10px] font-semibold uppercase tracking-wider mb-2">Mentor Match</p>
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-sm">👩</div>
              <div>
                <p className="text-white text-sm font-semibold">Dr. Aisha Khan</p>
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  <span className="text-yellow-400 text-xs font-bold">4.9</span>
                  <span className="text-white/40 text-[11px]">B2B SaaS</span>
                </div>
              </div>
            </div>
          </div>
        </FloatingCard>

        <FloatingCard
          className="absolute top-48 left-[4%] hidden xl:block"
          yAmt={8}
          delay={0.8}
        >
          <div className="glass rounded-2xl p-3.5 w-44 border border-white/10 shadow-xl">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-3.5 h-3.5 text-blue-400" />
              <p className="text-white/60 text-[10px] font-semibold">Platform Activity</p>
            </div>
            <div className="space-y-1.5">
              {['Founder joined', 'Pitch reviewed', 'Session booked'].map((item, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" style={{ animationDelay: `${i * 0.3}s` }} />
                  <p className="text-white/50 text-[11px]">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </FloatingCard>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-4xl"
          >
            {/* Badge */}
            <motion.div variants={itemVariants} className="mb-8">
              <span className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-white/10 bg-white/5 text-white/80 text-sm font-medium backdrop-blur-sm">
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 rounded-full bg-emerald-400"
                />
                India's #1 AI-Powered Startup Platform
                <ArrowRight className="w-3.5 h-3.5 text-white/40" />
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-6 leading-[1.05] tracking-tight font-['Space_Grotesk']"
            >
              Build Your{' '}
              <span className="relative inline-block">
                <span className="text-gradient">Startup</span>
                <motion.span
                  className="absolute -bottom-2 left-0 right-0 h-[3px] rounded-full"
                  style={{ background: 'linear-gradient(90deg, #3B82F6, #F97316)' }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                />
              </span>
              <br />
              From Zero to{' '}
              <span className="text-gradient-purple">Funded</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className="text-xl text-white/55 mb-10 max-w-2xl leading-relaxed"
            >
              AI-powered validation, expert mentorship, investor matching, and execution tools — everything you need to go from idea to investment-ready in one platform.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mb-12">
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2.5 px-7 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold text-base hover:from-blue-500 hover:to-blue-400 transition-all glow-blue shadow-xl shadow-blue-500/25"
                >
                  <Rocket className="w-5 h-5" />
                  Start Building Free
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/startup-academy"
                  className="inline-flex items-center gap-2.5 px-7 py-4 rounded-xl glass border border-white/15 text-white font-semibold text-base hover:bg-white/10 transition-all"
                >
                  <Play className="w-4 h-4" />
                  Watch Demo
                </Link>
              </motion.div>
            </motion.div>

            {/* Social proof */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-6">
              <div className="flex -space-x-2.5">
                {['arjun', 'priya', 'vikram', 'sneha', 'rahul'].map((seed) => (
                  <img
                    key={seed}
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`}
                    className="w-8 h-8 rounded-full ring-2 ring-[#04091a] bg-white/10"
                    alt=""
                  />
                ))}
                <div className="w-8 h-8 rounded-full ring-2 ring-[#04091a] bg-blue-600/30 flex items-center justify-center">
                  <span className="text-[9px] text-blue-300 font-bold">50K+</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
                <span className="text-white/60 text-sm ml-1">4.9 from 5,000+ founders</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          animate={{ y: [0, 8, 0], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ opacity: heroOpacity as any }}
        >
          <span className="text-white/30 text-xs">Scroll to explore</span>
          <ChevronDown className="w-4 h-4 text-white/30" />
        </motion.div>
      </section>

      {/* ══ TICKER ════════════════════════════════ */}
      <div className="bg-blue-600/8 border-y border-blue-500/15 py-3 overflow-hidden">
        <div className="ticker-content gap-16">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-3 text-white/50 text-sm font-medium px-6 whitespace-nowrap">
              {item}
              <span className="w-1 h-1 rounded-full bg-white/20" />
            </span>
          ))}
        </div>
      </div>

      {/* ══ STATS ═════════════════════════════════ */}
      <section className="py-20 bg-[#04091a] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(rgba(59,130,246,0.06) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }} />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: 'spring', stiffness: 120 }}
                className="text-center group"
              >
                <div className={`text-4xl lg:text-5xl font-bold mb-2 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent font-['Space_Grotesk']`}>
                  <AnimatedCounter end={stat.value} prefix={stat.prefix || ''} suffix={stat.suffix || ''} startDelay={stat.delay} />
                </div>
                <p className="text-white/35 text-sm font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TRUSTED BY ════════════════════════════ */}
      <section className="py-10 border-b border-border bg-card/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-muted-foreground/50 text-xs font-semibold uppercase tracking-widest mb-7">Backed by founders from</p>
          <div className="flex flex-wrap justify-center gap-8 items-center">
            {TRUSTED_LOGOS.map((logo) => (
              <motion.div
                key={logo}
                whileHover={{ opacity: 1, scale: 1.05 }}
                className="text-muted-foreground/30 font-semibold text-sm transition-all hover:text-muted-foreground cursor-default"
              >
                {logo}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FEATURES BENTO ════════════════════════ */}
      <section className="py-28 bg-background relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/8 border border-blue-500/20 text-blue-500 text-sm font-semibold mb-5">
              <Layers className="w-3.5 h-3.5" /> Platform Features
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 font-['Space_Grotesk']">
              Everything you need to{' '}
              <span className="text-gradient">build fast</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              One platform to validate, build, fund, and scale your startup from day one.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f, i) => {
              const Icon = f.icon;
              const colorMap: Record<string, { bg: string; text: string; border: string; glow: string }> = {
                blue: { bg: 'from-blue-500/10 to-blue-500/3', text: 'text-blue-400', border: 'hover:border-blue-500/40', glow: 'group-hover:shadow-blue-500/10' },
                orange: { bg: 'from-orange-500/10 to-orange-500/3', text: 'text-orange-400', border: 'hover:border-orange-500/40', glow: 'group-hover:shadow-orange-500/10' },
                purple: { bg: 'from-purple-500/10 to-purple-500/3', text: 'text-purple-400', border: 'hover:border-purple-500/40', glow: 'group-hover:shadow-purple-500/10' },
                yellow: { bg: 'from-yellow-500/10 to-yellow-500/3', text: 'text-yellow-400', border: 'hover:border-yellow-500/40', glow: 'group-hover:shadow-yellow-500/10' },
                green: { bg: 'from-emerald-500/10 to-emerald-500/3', text: 'text-emerald-400', border: 'hover:border-emerald-500/40', glow: 'group-hover:shadow-emerald-500/10' },
                pink: { bg: 'from-pink-500/10 to-pink-500/3', text: 'text-pink-400', border: 'hover:border-pink-500/40', glow: 'group-hover:shadow-pink-500/10' },
              };
              const c = colorMap[f.color] || colorMap.blue;
              return (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -6 }}
                >
                  <Link
                    to={f.href}
                    className={`group block p-6 rounded-2xl border border-border bg-card ${c.border} transition-all duration-300 hover:shadow-xl ${c.glow} relative overflow-hidden`}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${c.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                    <div className="relative">
                      <div className="flex items-start justify-between mb-5">
                        <motion.div
                          whileHover={{ rotate: 8, scale: 1.1 }}
                          className={`w-11 h-11 rounded-xl bg-gradient-to-br ${c.bg} flex items-center justify-center border border-white/5`}
                        >
                          <Icon className={`w-5 h-5 ${c.text}`} />
                        </motion.div>
                        {f.tag && (
                          <span className={`text-[11px] px-2.5 py-1 rounded-full font-semibold bg-gradient-to-r ${c.bg} ${c.text} border border-white/8`}>
                            {f.tag}
                          </span>
                        )}
                      </div>
                      <h3 className={`text-base font-bold text-foreground mb-2 group-hover:${c.text} transition-colors font-['Space_Grotesk']`}>
                        {f.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4">{f.desc}</p>
                      <div className={`flex items-center gap-1.5 ${c.text} text-sm font-medium opacity-0 group-hover:opacity-100 transition-all translate-x-0 group-hover:translate-x-1 duration-300`}>
                        Explore <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ AI COPILOT SHOWCASE ════════════════════ */}
      <section className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-mesh pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#04091a] via-transparent to-[#04091a] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-semibold mb-6">
                <Bot className="w-3.5 h-3.5" /> AI Startup Copilot
              </span>
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight font-['Space_Grotesk']">
                Your 24/7 AI co-founder &<br />
                <span className="text-gradient">strategic advisor</span>
              </h2>
              <p className="text-white/50 text-lg mb-8 leading-relaxed">
                Get instant answers on business strategy, fundraising, product development, marketing, and growth — backed by data from 10,000+ successful startups.
              </p>
              <div className="space-y-3 mb-10">
                {[
                  'Business strategy and pivoting decisions',
                  'Fundraising preparation and pitch feedback',
                  'Product roadmap prioritization',
                  'Go-to-market strategy and growth hacks',
                ].map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3 text-white/65 text-sm"
                  >
                    <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-3 h-3 text-blue-400" />
                    </div>
                    {item}
                  </motion.div>
                ))}
              </div>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold hover:from-blue-500 hover:to-blue-400 transition-all glow-blue"
                >
                  <Zap className="w-4 h-4" /> Try AI Copilot Free
                </Link>
              </motion.div>
            </motion.div>

            {/* Chat UI */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="glass rounded-2xl border border-white/10 overflow-hidden shadow-2xl shadow-blue-500/10">
                {/* Chat header */}
                <div className="flex items-center gap-3 px-5 py-4 border-b border-white/8">
                  <div className="w-8 h-8 rounded-xl bg-blue-500/20 flex items-center justify-center">
                    <Cpu className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold">ZeroToOne AI Copilot</p>
                    <div className="flex items-center gap-1.5">
                      <div className="live-dot w-2 h-2" />
                      <p className="text-emerald-400 text-xs">Online · GPT-powered</p>
                    </div>
                  </div>
                </div>
                {/* Messages */}
                <div className="p-5 space-y-4">
                  {[
                    { from: 'user', text: 'How should I price my B2B SaaS product?' },
                    { from: 'ai', text: 'For early-stage B2B SaaS, value-based pricing works best. Target 10x your cost structure. For SMBs with 10-50 employees, ₹3,000–8,000/seat/month is competitive. Start with annual contracts for cash flow predictability.' },
                    { from: 'user', text: 'What CAC:LTV ratio should I aim for?' },
                    { from: 'ai', text: 'Aim for LTV:CAC ratio of at least 3:1. At your stage, a payback period under 12 months is healthy. If CAC exceeds 3 months of MRR, optimize your top-of-funnel channels first.' },
                  ].map((msg, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.15 }}
                      className={`${msg.from === 'user' ? 'flex justify-end' : 'flex justify-start'}`}
                    >
                      <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                        msg.from === 'user'
                          ? 'bg-blue-600/25 text-white/85 rounded-br-sm'
                          : 'bg-white/5 border border-white/8 text-white/65 rounded-bl-sm'
                      }`}>
                        {msg.text}
                      </div>
                    </motion.div>
                  ))}
                  {/* Typing indicator */}
                  <div className="flex gap-1.5 items-center px-1">
                    {[0, 1, 2].map(i => (
                      <motion.div
                        key={i}
                        className="w-2 h-2 rounded-full bg-blue-400/60"
                        animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.1, 0.8] }}
                        transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                      />
                    ))}
                  </div>
                </div>
                {/* Input */}
                <div className="px-5 py-4 border-t border-white/8">
                  <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/8">
                    <p className="text-white/25 text-sm flex-1">Ask anything about your startup...</p>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center flex-shrink-0"
                    >
                      <Zap className="w-3.5 h-3.5 text-white" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══ HOW IT WORKS ══════════════════════════ */}
      <section className="py-28 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/8 border border-orange-500/20 text-orange-500 text-sm font-semibold mb-5">
              <Map className="w-3.5 h-3.5" /> How It Works
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 font-['Space_Grotesk']">From Zero to Funded in 6 steps</h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">A structured journey to take your startup from idea to investment-ready.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PROCESS_STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -5 }}
                  className="relative p-6 rounded-2xl border border-border bg-card group hover:border-primary/25 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative">
                    <div className="flex items-start justify-between mb-5">
                      <div className="w-10 h-10 rounded-xl bg-primary/8 border border-primary/15 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <span className="text-5xl font-black text-primary/6 group-hover:text-primary/12 transition-colors font-['Space_Grotesk'] leading-none">
                        {step.step}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-foreground mb-2 font-['Space_Grotesk']">{step.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ MENTORS PREVIEW ═══════════════════════ */}
      <section className="py-28 bg-card/20 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-end justify-between mb-12"
          >
            <div>
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-yellow-500/8 border border-yellow-500/20 text-yellow-500 text-sm font-semibold mb-3">
                <GraduationCap className="w-3.5 h-3.5" /> Expert Mentors
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground font-['Space_Grotesk']">Learn from founders who did it</h2>
            </div>
            <Link to="/mentors" className="hidden md:flex items-center gap-2 text-primary text-sm font-semibold hover:gap-3 transition-all">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {MENTORS.slice(0, 3).map((mentor, i) => (
              <motion.div
                key={mentor.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="p-6 rounded-2xl border border-border bg-card hover:border-primary/25 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 group"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative flex-shrink-0">
                    <img src={mentor.avatar} alt={mentor.name} className="w-14 h-14 rounded-2xl bg-muted ring-1 ring-border" />
                    {mentor.available && (
                      <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-card" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-foreground text-sm truncate font-['Space_Grotesk']">{mentor.name}</h3>
                    <p className="text-xs text-muted-foreground truncate mt-0.5">{mentor.title}</p>
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                      <span className="text-xs font-bold text-foreground">{mentor.rating}</span>
                      <span className="text-muted-foreground/50 text-xs">·</span>
                      <span className="text-xs text-muted-foreground">{mentor.sessions} sessions</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {mentor.expertise.slice(0, 2).map((e) => (
                    <span key={e} className="px-2.5 py-1 rounded-lg bg-muted text-muted-foreground text-xs font-medium">{e}</span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-primary font-bold text-base">₹{mentor.hourlyRate.toLocaleString('en-IN')}</span>
                    <span className="text-muted-foreground text-xs ml-1">/hour</span>
                  </div>
                  <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                    <Link
                      to="/mentors"
                      className="px-4 py-2 rounded-xl bg-primary/10 text-primary text-xs font-semibold hover:bg-primary hover:text-white transition-all"
                    >
                      Book Session
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SUCCESS STORIES ═══════════════════════ */}
      <section className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-mesh pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#04091a] via-[#060e22]/90 to-[#04091a] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-semibold mb-5">
              <Trophy className="w-3.5 h-3.5" /> Success Stories
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-['Space_Grotesk']">Founders who changed the game</h2>
            <p className="text-white/40 text-lg max-w-xl mx-auto">Real founders, real funding, real results — built on ZeroToOne.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SUCCESS_STORIES.slice(0, 6).map((story, i) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                className="glass-card rounded-2xl p-6 border border-white/8 hover:border-white/16 transition-all duration-300 group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <img src={story.avatar} alt={story.founder} className="w-11 h-11 rounded-full bg-white/10 ring-1 ring-white/10" />
                  <div>
                    <h4 className="text-white font-semibold text-sm">{story.founder}</h4>
                    <p className="text-white/40 text-xs">{story.startup} · {story.industry}</p>
                  </div>
                </div>
                <p className="text-white/50 text-sm mb-5 leading-relaxed">{story.description}</p>
                <div className="flex items-center justify-between pt-4 border-t border-white/8">
                  <div>
                    <p className="text-emerald-400 font-bold text-xl font-['Space_Grotesk']">{story.amount}</p>
                    <p className="text-white/30 text-xs mt-0.5">{story.round} · {story.year}</p>
                  </div>
                  <motion.div whileHover={{ rotate: 15 }}>
                    <Award className="w-8 h-8 text-yellow-400/25 group-hover:text-yellow-400/50 transition-colors" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            <Link
              to="/success-stories"
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl border border-white/15 text-white/60 hover:text-white hover:bg-white/6 transition-all text-sm font-medium"
            >
              Read all success stories <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ══ TESTIMONIALS ══════════════════════════ */}
      <section className="py-28 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-3 font-['Space_Grotesk']">What founders are saying</h2>
            <div className="flex justify-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <motion.div key={i} initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }}>
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                </motion.div>
              ))}
            </div>
            <p className="text-muted-foreground text-sm">4.9 / 5 from 5,000+ verified reviews</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="p-6 rounded-2xl border border-border bg-card hover:border-primary/20 transition-all duration-300 group"
              >
                <div className="flex gap-0.5 mb-4">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-foreground text-sm leading-relaxed mb-6 italic">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full bg-muted ring-1 ring-border" />
                  <div>
                    <p className="font-semibold text-foreground text-sm">{t.name}</p>
                    <p className="text-muted-foreground text-xs">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PRICING ═══════════════════════════════ */}
      <PricingSection />

      {/* ══ FAQ ═══════════════════════════════════ */}
      <section className="py-28 bg-card/15 border-y border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/8 border border-blue-500/20 text-blue-500 text-sm font-semibold mb-5">
              <HelpCircle className="w-3.5 h-3.5" /> FAQ
            </span>
            <h2 className="text-4xl font-bold text-foreground font-['Space_Grotesk']">Frequently asked questions</h2>
          </motion.div>

          <div className="space-y-3">
            {FAQ_DATA.slice(0, 6).map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="rounded-2xl border border-border bg-card overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-muted/30 transition-all"
                >
                  <span className="font-semibold text-foreground text-sm pr-4">{faq.question}</span>
                  <motion.div
                    animate={{ rotate: openFaq === i ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex-shrink-0 text-muted-foreground"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-muted-foreground text-sm leading-relaxed">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-6">
            <Link to="/faq" className="text-primary text-sm font-medium hover:underline">View all FAQs →</Link>
          </div>
        </div>
      </section>

      {/* ══ NEWSLETTER ════════════════════════════ */}
      <section className="py-28 bg-background">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="p-8 lg:p-10 rounded-3xl border border-primary/15 bg-gradient-to-br from-blue-600/5 via-purple-600/3 to-orange-600/5 relative overflow-hidden">
              <div className="absolute inset-0 opacity-50 pointer-events-none" style={{
                background: 'radial-gradient(ellipse at center, rgba(59,130,246,0.08) 0%, transparent 70%)',
              }} />
              <div className="relative">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5"
                >
                  <Mail className="w-7 h-7 text-primary" />
                </motion.div>
                <h2 className="text-3xl font-bold text-foreground mb-3 font-['Space_Grotesk']">Stay ahead of the curve</h2>
                <p className="text-muted-foreground mb-8">Weekly founder insights, funding news, and early access to new features.</p>
                <div className="flex gap-3 max-w-sm mx-auto">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="flex-1 px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10"
                  />
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="px-5 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-all flex items-center gap-2 flex-shrink-0"
                  >
                    <Zap className="w-4 h-4" /> Subscribe
                  </motion.button>
                </div>
                <p className="text-muted-foreground/50 text-xs mt-4">No spam. 25,000+ founders subscribed. Unsubscribe anytime.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ FINAL CTA ═════════════════════════════ */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-aurora pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-blue-500/5"
              style={{
                width: 80 + (i * 17) % 200,
                height: 80 + (i * 17) % 200,
                top: `${(i * 23) % 100}%`,
                left: `${(i * 31) % 100}%`,
              }}
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 5 + i, repeat: Infinity, delay: i * 0.3 }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-blue-500/15 border border-blue-500/25 text-blue-300 text-sm font-semibold mb-8"
            >
              <Rocket className="w-4 h-4" /> Start Your Journey Today
            </motion.span>

            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight font-['Space_Grotesk']">
              Ready to build your<br />
              <span className="text-gradient">next unicorn?</span>
            </h2>

            <p className="text-white/50 text-xl mb-10 leading-relaxed">
              Join 50,000+ founders who chose ZeroToOne to validate, build, fund, and scale their startups.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold text-base hover:from-blue-500 hover:to-blue-400 transition-all glow-blue shadow-2xl shadow-blue-500/30"
                >
                  <Rocket className="w-5 h-5" /> Start Building Free
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/pricing"
                  className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl glass border border-white/15 text-white font-bold text-base hover:bg-white/10 transition-all"
                >
                  View Pricing
                </Link>
              </motion.div>
            </div>

            <p className="text-white/25 text-sm mt-6">No credit card required · Free forever plan · Cancel anytime</p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
