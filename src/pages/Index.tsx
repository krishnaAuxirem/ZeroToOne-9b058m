import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, Play, Zap, Rocket, Star, TrendingUp, Users, BookOpen,
  CheckCircle, ChevronLeft, ChevronRight, Target, DollarSign,
  BarChart3, Globe, Award, Shield, MessageSquare, Mail,
  Sparkles, Bot, Map, Trophy, HelpCircle, GraduationCap, Network, Lightbulb
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
import planImg from '@/assets/business-planning.jpg';
import networkImg from '@/assets/networking-event.jpg';

const HERO_SLIDES = [
  {
    title: 'Build Your Startup From Zero',
    subtitle: 'AI-powered validation, planning, and execution',
    tag: 'Startup Builder',
    tagIcon: Rocket,
    image: heroImg,
    cta: 'Start Building',
    ctaLink: '/register',
  },
  {
    title: 'Validate Your Million-Dollar Idea',
    subtitle: 'Market analysis and opportunity scoring in minutes',
    tag: 'Idea Validation',
    tagIcon: Lightbulb,
    image: planImg,
    cta: 'Validate Now',
    ctaLink: '/idea-validation',
  },
  {
    title: 'Connect with Top Mentors',
    subtitle: '500+ experienced founders and industry experts',
    tag: 'Mentor Network',
    tagIcon: Star,
    image: mentorImg,
    cta: 'Find a Mentor',
    ctaLink: '/mentors',
  },
  {
    title: 'Raise Funding from 500+ Investors',
    subtitle: 'Angels, VCs, and family offices in one platform',
    tag: 'Fundraising',
    tagIcon: DollarSign,
    image: investorImg,
    cta: 'Meet Investors',
    ctaLink: '/investors',
  },
  {
    title: 'Build a World-Class Team',
    subtitle: 'Find co-founders, early employees, and advisors',
    tag: 'Team Building',
    tagIcon: Users,
    image: teamImg,
    cta: 'Build Your Team',
    ctaLink: '/register',
  },
  {
    title: 'AI-Powered Startup Copilot',
    subtitle: '24/7 strategic guidance for every challenge',
    tag: 'AI Assistant',
    tagIcon: Bot,
    image: aiImg,
    cta: 'Try AI Copilot',
    ctaLink: '/ai-copilot',
  },
  {
    title: 'Learn from Success Stories',
    subtitle: '1,000+ founders who raised funding and scaled',
    tag: 'Success Stories',
    tagIcon: Trophy,
    image: successImg,
    cta: 'Read Stories',
    ctaLink: '/success-stories',
  },
  {
    title: 'Network with Founders & Investors',
    subtitle: 'Exclusive events, meetups, and online community',
    tag: 'Community',
    tagIcon: Globe,
    image: networkImg,
    cta: 'Join Community',
    ctaLink: '/community',
  },
];

const STATS = [
  { label: 'Active Founders', value: 50000, suffix: '+' },
  { label: 'Funding Raised', value: 500, prefix: '₹', suffix: 'Cr+' },
  { label: 'Expert Mentors', value: 500, suffix: '+' },
  { label: 'Success Rate', value: 95, suffix: '%' },
];

const FEATURES = [
  { icon: Zap, title: 'AI Startup Copilot', desc: '24/7 AI advisor for strategy, product, fundraising, and growth', href: '/ai-copilot', color: 'blue' },
  { icon: Target, title: 'Idea Validation Engine', desc: 'AI-powered market analysis with opportunity scoring in minutes', href: '/idea-validation', color: 'orange' },
  { icon: BookOpen, title: 'Startup Academy', desc: '100+ courses and bootcamps from successful founders', href: '/startup-academy', color: 'purple' },
  { icon: Star, title: 'Mentor Marketplace', desc: 'Book 1:1 sessions with vetted industry experts', href: '/mentors', color: 'yellow' },
  { icon: TrendingUp, title: 'Investor Connect', desc: 'Get matched with the right investors for your stage', href: '/investors', color: 'green' },
  { icon: Users, title: 'Team Building', desc: 'Find co-founders and early team through skill-based matching', href: '/community', color: 'pink' },
];

const PROCESS_STEPS = [
  { step: '01', title: 'Validate Your Idea', desc: 'Submit your startup idea and get AI-powered market analysis, competitor mapping, and opportunity scoring.' },
  { step: '02', title: 'Build Your Plan', desc: 'Create investor-ready business plans, financial models, and product roadmaps with AI assistance.' },
  { step: '03', title: 'Build Your Team', desc: 'Find the perfect co-founder and early team through our skill-based matching algorithm.' },
  { step: '04', title: 'Learn & Execute', desc: 'Enroll in academy courses, book mentor sessions, and use execution tools to stay on track.' },
  { step: '05', title: 'Raise Funding', desc: 'Get matched with investors, build your pitch deck, and manage your fundraising pipeline.' },
  { step: '06', title: 'Scale & Grow', desc: 'Track KPIs, optimize growth strategies, and use AI to identify your next growth lever.' },
];

const PRICING = [
  {
    name: 'Starter',
    price: { monthly: 0, yearly: 0 },
    desc: 'Perfect for aspiring entrepreneurs',
    features: ['Idea Submission (3/month)', 'Basic Market Analysis', '2 Mentor Sessions', 'Academy (5 courses)', 'Community Access'],
    color: 'border-border',
    cta: 'Get Started Free',
  },
  {
    name: 'Growth',
    price: { monthly: 999, yearly: 9990 },
    desc: 'For early-stage founders',
    features: ['Unlimited Idea Validation', 'AI Startup Copilot', 'Business Plan Builder', '10 Mentor Sessions', 'Investor Network Access', 'Analytics Dashboard'],
    color: 'border-blue-500',
    popular: true,
    cta: 'Start Growth Plan',
  },
  {
    name: 'Founder Pro',
    price: { monthly: 2999, yearly: 29990 },
    desc: 'For scaling startups',
    features: ['Everything in Growth', 'Unlimited Mentor Sessions', 'Pitch Deck AI Builder', 'Investor Direct Connect', 'Co-Founder Matching', 'Priority Support', 'Custom Analytics'],
    color: 'border-orange-500',
    cta: 'Go Founder Pro',
  },
  {
    name: 'Investor Pro',
    price: { monthly: 4999, yearly: 49990 },
    desc: 'For investors & VCs',
    features: ['Full Startup Database', 'Advanced Filters', 'Direct Founder Connect', 'Portfolio Analytics', 'Deal Flow CRM', 'Priority Placement'],
    color: 'border-green-500',
    cta: 'Start Investing',
  },
];

const TRUSTED_LOGOS = ['Y Combinator', 'AngelList', 'Sequoia', 'NASSCOM', 'Startup India', 'TiE Global', 'SIDBI', 'iCreate'];

const PricingPage = () => {
  const [yearly, setYearly] = useState(false);
  return (
    <section id="pricing" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-500 text-sm font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" /> Pricing
          </span>
          <h2 className="text-4xl font-bold text-foreground mb-4">Simple, transparent pricing</h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-6">Start free. Scale as you grow. All prices in Indian Rupees ₹.</p>
          <div className="flex items-center justify-center gap-3">
            <span className={`text-sm ${!yearly ? 'text-foreground font-semibold' : 'text-muted-foreground'}`}>Monthly</span>
            <button
              onClick={() => setYearly(!yearly)}
              className={`relative w-12 h-6 rounded-full transition-colors ${yearly ? 'bg-blue-600' : 'bg-muted'}`}
            >
              <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${yearly ? 'left-7' : 'left-1'}`} />
            </button>
            <span className={`text-sm ${yearly ? 'text-foreground font-semibold' : 'text-muted-foreground'}`}>
              Yearly <span className="text-green-500 text-xs font-bold">Save 17%</span>
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRICING.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative rounded-2xl border-2 ${plan.color} bg-card p-6 ${plan.popular ? 'scale-[1.02] shadow-2xl shadow-blue-500/20' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-blue-600 text-white text-xs font-bold">Most Popular</div>
              )}
              <h3 className="text-lg font-bold text-foreground mb-1">{plan.name}</h3>
              <p className="text-muted-foreground text-xs mb-4">{plan.desc}</p>
              <div className="mb-5">
                <span className="text-3xl font-bold text-foreground">
                  {plan.price.monthly === 0 ? 'Free' : `₹${(yearly ? plan.price.yearly : plan.price.monthly).toLocaleString('en-IN')}`}
                </span>
                {plan.price.monthly > 0 && <span className="text-muted-foreground text-sm">/{yearly ? 'year' : 'month'}</span>}
              </div>
              <ul className="space-y-2.5 mb-6">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" /> {f}
                  </li>
                ))}
              </ul>
              <Link
                to="/register"
                className={`block w-full text-center py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  plan.popular
                    ? 'bg-blue-600 text-white hover:bg-blue-500'
                    : 'border border-border text-foreground hover:bg-muted'
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

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const slideRef = useRef<NodeJS.Timeout>();
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);

  useEffect(() => {
    slideRef.current = setInterval(() => setCurrentSlide(s => (s + 1) % HERO_SLIDES.length), 5000);
    return () => clearInterval(slideRef.current);
  }, []);

  const slide = HERO_SLIDES[currentSlide];
  const SlideTagIcon = slide.tagIcon;

  return (
    <div className="bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-hero">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <img src={slide.image} alt="" className="w-full h-full object-cover opacity-20 transition-all duration-1000" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] via-[#0F172A]/80 to-[#0F172A]/60" />
        </motion.div>

        {/* Particle effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(25)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: Math.random() * 6 + 2,
                height: Math.random() * 6 + 2,
                background: i % 3 === 0 ? '#3B82F6' : i % 3 === 1 ? '#F97316' : '#8B5CF6',
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.6 + 0.2,
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, 10, 0],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: 4 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 4,
              }}
            />
          ))}
        </div>

        {/* Floating cards */}
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-32 right-[8%] hidden xl:block"
        >
          <div className="glass rounded-2xl p-4 w-52 border border-white/10">
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-green-400" />
              </div>
              <div>
                <p className="text-white text-xs font-semibold">Funding Raised</p>
                <p className="text-green-400 text-xs">+24% this month</p>
              </div>
            </div>
            <p className="text-white text-xl font-bold">₹12.4 Cr</p>
          </div>
        </motion.div>
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
          className="absolute bottom-40 right-[12%] hidden xl:block"
        >
          <div className="glass rounded-2xl p-4 w-48 border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center">
                <Star className="w-3.5 h-3.5 text-blue-400" />
              </div>
              <p className="text-white text-xs font-semibold">New Mentor Match</p>
            </div>
            <p className="text-white/70 text-xs">Dr. Aisha Khan — 4.9</p>
            <p className="text-white/50 text-xs">B2B SaaS Expert</p>
          </div>
        </motion.div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl"
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-white/20 text-white/80 text-sm font-medium mb-6">
                <SlideTagIcon className="w-3.5 h-3.5" /> {slide.tag}
              </span>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                {slide.title}
              </h1>
              <p className="text-xl text-white/60 mb-8 max-w-xl">{slide.subtitle}</p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to={slide.ctaLink}
                  className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold hover:from-blue-500 hover:to-blue-400 transition-all glow-blue text-sm"
                >
                  <Zap className="w-4 h-4" /> {slide.cta} <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/startup-academy"
                  className="flex items-center gap-2 px-6 py-3.5 rounded-xl glass border border-white/20 text-white font-semibold hover:bg-white/10 transition-all text-sm"
                >
                  <Play className="w-4 h-4" /> Watch Demo
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Slide dots */}
          <div className="flex gap-2 mt-12">
            {HERO_SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`h-1.5 rounded-full transition-all ${i === currentSlide ? 'w-8 bg-blue-400' : 'w-2 bg-white/30'}`}
              />
            ))}
          </div>

          {/* Slide nav */}
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => setCurrentSlide(s => (s - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
              className="p-2 rounded-full glass border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setCurrentSlide(s => (s + 1) % HERO_SLIDES.length)}
              className="p-2 rounded-full glass border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* CTA rows */}
          <div className="flex flex-wrap gap-3 mt-8">
            {['Start Building Startup', 'Validate My Idea', 'Find Co-Founder', 'Meet Investors', 'Book Mentor'].map((cta) => (
              <Link key={cta} to="/register" className="px-4 py-2 rounded-full glass border border-white/10 text-white/60 hover:text-white hover:bg-white/10 text-xs transition-all">
                {cta}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-[#060d1f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {STATS.map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
                <p className="text-4xl font-bold text-white mb-1">
                  <AnimatedCounter end={stat.value} prefix={stat.prefix || ''} suffix={stat.suffix || ''} />
                </p>
                <p className="text-white/40 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted By */}
      <section className="py-12 border-y border-border bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-muted-foreground text-sm mb-8">Trusted by startups supported by</p>
          <div className="flex flex-wrap justify-center gap-8 items-center">
            {TRUSTED_LOGOS.map((logo) => (
              <div key={logo} className="text-muted-foreground/40 font-semibold text-sm hover:text-muted-foreground transition-all">{logo}</div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-500 text-sm font-semibold mb-4">
              <Sparkles className="w-3.5 h-3.5" /> Platform Features
            </span>
            <h2 className="text-4xl font-bold text-foreground mb-4">Everything you need to build your startup</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              One platform to validate your idea, build your team, learn from experts, and raise funding.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link to={f.href} className="group block p-6 rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all">
                    <div className={`w-12 h-12 rounded-xl bg-${f.color}-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className={`w-6 h-6 text-${f.color}-500`} />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{f.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
                    <div className="flex items-center gap-1 mt-4 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-all">
                      Explore <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* AI Copilot Feature */}
      <section className="py-24 bg-gradient-to-br from-[#060d1f] to-[#0F172A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-400 text-sm font-semibold mb-4">
                <Bot className="w-3.5 h-3.5" /> AI Startup Copilot
              </span>
              <h2 className="text-4xl font-bold text-white mb-6">Your 24/7 AI co-founder and strategic advisor</h2>
              <p className="text-white/60 text-lg mb-8 leading-relaxed">
                Get instant answers on business strategy, fundraising, product development, marketing, and growth — backed by data from 10,000+ successful startups.
              </p>
              <div className="space-y-3 mb-8">
                {['Business strategy and pivoting decisions', 'Fundraising preparation and pitch feedback', 'Product roadmap prioritization', 'Go-to-market strategy and growth hacks', 'Financial modeling and projections'].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-white/70 text-sm">
                    <CheckCircle className="w-4 h-4 text-blue-400 flex-shrink-0" /> {item}
                  </div>
                ))}
              </div>
              <Link to="/ai-copilot" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-500 transition-all">
                <Zap className="w-4 h-4" /> Try AI Copilot Free
              </Link>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="glass rounded-2xl p-6 border border-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <Zap className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold">AI Copilot</p>
                    <div className="flex gap-1">
                      {[...Array(3)].map((_, i) => (
                        <motion.div key={i} className="w-1 h-1 rounded-full bg-blue-400" animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }} />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    { from: 'user', text: 'How should I price my B2B SaaS product?' },
                    { from: 'ai', text: 'For early-stage B2B SaaS, I recommend starting with value-based pricing. Price 10x your cost structure. Common approaches: (1) Per-seat pricing for collaboration tools, (2) Usage-based for API products, (3) Outcome-based for enterprise. What\'s your primary customer segment?' },
                    { from: 'user', text: 'SMBs with 10-50 employees' },
                    { from: 'ai', text: 'Perfect. For SMBs at 10-50 scale, per-seat pricing works well. Target ₹3,000-8,000/seat/month. Start with annual contracts for cash flow. Your CAC should be <3 months of ACV. Want me to help build a pricing model?' },
                  ].map((msg, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.2 }}
                      className={`${msg.from === 'user' ? 'ml-8' : 'mr-8'}`}
                    >
                      <div className={`rounded-xl px-4 py-3 text-sm ${
                        msg.from === 'user'
                          ? 'bg-blue-600/20 text-white/80 text-right'
                          : 'glass border border-white/10 text-white/70'
                      }`}>
                        {msg.text}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-orange-500/10 text-orange-500 text-sm font-semibold mb-4">
              <Map className="w-3.5 h-3.5" /> How It Works
            </span>
            <h2 className="text-4xl font-bold text-foreground mb-4">From Zero to Funded in 6 steps</h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">A structured journey to take your startup from idea to investment-ready.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROCESS_STEPS.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative p-6 rounded-2xl border border-border bg-card group hover:border-primary/30 transition-all"
              >
                <div className="text-6xl font-black text-primary/5 absolute top-4 right-4 group-hover:text-primary/10 transition-colors">{step.step}</div>
                <span className="text-xs font-bold text-primary/60 mb-3 block">STEP {step.step}</span>
                <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mentor Preview */}
      <section className="py-24 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-yellow-500/10 text-yellow-500 text-sm font-semibold mb-2">
                <GraduationCap className="w-3.5 h-3.5" /> Expert Mentors
              </span>
              <h2 className="text-3xl font-bold text-foreground">Learn from the best founders</h2>
            </div>
            <Link to="/mentors" className="hidden md:flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all text-sm">
              View All Mentors <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MENTORS.slice(0, 3).map((mentor, i) => (
              <motion.div
                key={mentor.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl border border-border bg-card hover:border-primary/30 transition-all group"
              >
                <div className="flex items-start gap-4 mb-4">
                  <img src={mentor.avatar} alt={mentor.name} className="w-14 h-14 rounded-2xl bg-muted" />
                  <div>
                    <h3 className="font-bold text-foreground">{mentor.name}</h3>
                    <p className="text-xs text-muted-foreground">{mentor.title}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                      <span className="text-xs font-semibold text-foreground">{mentor.rating}</span>
                      <span className="text-xs text-muted-foreground">({mentor.sessions} sessions)</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {mentor.expertise.slice(0, 2).map((e) => (
                    <span key={e} className="px-2 py-1 rounded-lg bg-muted text-muted-foreground text-xs">{e}</span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-primary font-bold">₹{mentor.hourlyRate.toLocaleString('en-IN')}<span className="text-muted-foreground text-xs font-normal">/hr</span></span>
                  <Link to="/mentors" className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-all">
                    Book Session
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Startup Academy Preview */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-purple-500/10 text-purple-500 text-sm font-semibold mb-2">
                <BookOpen className="w-3.5 h-3.5" /> Startup Academy
              </span>
              <h2 className="text-3xl font-bold text-foreground">Learn from startup practitioners</h2>
            </div>
            <Link to="/startup-academy" className="hidden md:flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all text-sm">
              Browse All Courses <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {COURSES.slice(0, 3).map((course, i) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl border border-border bg-card overflow-hidden group hover:border-primary/30 transition-all"
              >
                <div className="aspect-video overflow-hidden">
                  <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">{course.category}</span>
                    <span className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-xs">{course.level}</span>
                  </div>
                  <h3 className="font-bold text-foreground mb-1 line-clamp-2 text-sm leading-tight">{course.title}</h3>
                  <p className="text-xs text-muted-foreground mb-3">by {course.instructor}</p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                    <span className="flex items-center gap-1"><Star className="w-3 h-3 text-yellow-500 fill-yellow-500" /> {course.rating}</span>
                    <span>{course.students.toLocaleString()} students</span>
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-primary font-bold">₹{course.price.toLocaleString('en-IN')}</span>
                    <Link to="/startup-academy" className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-semibold hover:bg-primary hover:text-white transition-all">
                      Enroll Now
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-24 bg-gradient-to-br from-[#060d1f] to-[#0F172A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-green-500/10 text-green-400 text-sm font-semibold mb-4">
              <Trophy className="w-3.5 h-3.5" /> Success Stories
            </span>
            <h2 className="text-4xl font-bold text-white mb-4">Founders who changed the game</h2>
            <p className="text-white/50 text-lg max-w-xl mx-auto">Real founders, real results. Built and funded on ZeroToOne.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SUCCESS_STORIES.slice(0, 6).map((story, i) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all"
              >
                <div className="flex items-center gap-3 mb-4">
                  <img src={story.avatar} alt={story.founder} className="w-12 h-12 rounded-full bg-white/10" />
                  <div>
                    <h4 className="text-white font-semibold text-sm">{story.founder}</h4>
                    <p className="text-white/50 text-xs">{story.startup} · {story.industry}</p>
                  </div>
                </div>
                <p className="text-white/60 text-sm mb-4 leading-relaxed">{story.description}</p>
                <div className="flex items-center justify-between pt-3 border-t border-white/10">
                  <div>
                    <p className="text-green-400 font-bold text-lg">{story.amount}</p>
                    <p className="text-white/40 text-xs">{story.round} Round · {story.year}</p>
                  </div>
                  <Award className="w-8 h-8 text-yellow-400/30" />
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/success-stories" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/20 text-white/70 hover:text-white hover:bg-white/5 transition-all text-sm">
              Read All Stories <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-foreground mb-4">What founders are saying</h2>
            <div className="flex justify-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />)}
            </div>
            <p className="text-muted-foreground">4.9/5 from 5,000+ reviews</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl border border-border bg-card"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, j) => <Star key={j} className="w-4 h-4 text-yellow-500 fill-yellow-500" />)}
                </div>
                <p className="text-foreground text-sm leading-relaxed mb-5 italic">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full bg-muted" />
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

      {/* Pricing */}
      <PricingPage />

      {/* FAQ */}
      <section className="py-24 bg-card/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-500 text-sm font-semibold mb-4">
              <HelpCircle className="w-3.5 h-3.5" /> FAQ
            </span>
            <h2 className="text-4xl font-bold text-foreground mb-4">Frequently asked questions</h2>
          </div>
          <div className="space-y-3">
            {FAQ_DATA.slice(0, 6).map((faq, i) => (
              <div key={i} className="rounded-2xl border border-border bg-card overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="font-semibold text-foreground text-sm">{faq.question}</span>
                  <ChevronRight className={`w-4 h-4 text-muted-foreground flex-shrink-0 transition-transform ${openFaq === i ? 'rotate-90' : ''}`} />
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-muted-foreground text-sm leading-relaxed">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link to="/faq" className="text-primary text-sm font-medium hover:underline">View all FAQs</Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="p-8 rounded-3xl bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-orange-600/10 border border-primary/20">
              <Mail className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-foreground mb-3">Stay ahead of the startup curve</h2>
              <p className="text-muted-foreground mb-6">Weekly insights, founder stories, funding news, and early access to new features.</p>
              <div className="flex gap-3 max-w-md mx-auto">
                <input type="email" placeholder="your@email.com" className="flex-1 px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:border-primary" />
                <button className="px-5 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-all flex items-center gap-2">
                  <Zap className="w-4 h-4" /> Subscribe
                </button>
              </div>
              <p className="text-muted-foreground text-xs mt-3">No spam. Unsubscribe anytime. 25,000+ founders already subscribed.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <div key={i} className="absolute rounded-full bg-blue-500/5" style={{
              width: 100 + Math.random() * 200,
              height: 100 + Math.random() * 200,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }} />
          ))}
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-blue-500/20 text-blue-300 text-sm font-semibold mb-4">
              <Rocket className="w-3.5 h-3.5" /> Start Today
            </span>
            <h2 className="text-5xl font-bold text-white mb-6">Ready to build your startup?</h2>
            <p className="text-white/60 text-xl mb-8">Join 50,000+ founders who chose ZeroToOne to validate, build, fund, and scale their startups.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/register" className="flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold text-lg hover:from-blue-500 hover:to-blue-400 transition-all glow-blue">
                <Rocket className="w-5 h-5" /> Start Building Free
              </Link>
              <Link to="/pricing" className="flex items-center gap-2 px-8 py-4 rounded-xl border border-white/20 text-white font-bold text-lg hover:bg-white/10 transition-all glass">
                View Pricing
              </Link>
            </div>
            <p className="text-white/30 text-sm mt-4">No credit card required. Start free forever.</p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
