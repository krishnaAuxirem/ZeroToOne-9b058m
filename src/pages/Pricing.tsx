import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, TrendingUp, DollarSign, Zap, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const PLANS = [
  {
    name: 'Starter',
    price: { monthly: 0, yearly: 0 },
    desc: 'Perfect for aspiring entrepreneurs',
    features: ['Idea Submission (3/month)', 'Basic Market Analysis', '2 Mentor Sessions/month', 'Academy (5 courses)', 'Community Access', 'Basic Analytics'],
    color: 'border-border',
    cta: 'Get Started Free',
  },
  {
    name: 'Growth',
    price: { monthly: 999, yearly: 9990 },
    desc: 'For early-stage founders',
    features: ['Unlimited Idea Validation', 'AI Startup Copilot', 'Business Plan Builder', '10 Mentor Sessions/month', 'Investor Network Access', 'Advanced Analytics', 'Co-founder Matching'],
    color: 'border-blue-500',
    popular: true,
    cta: 'Start Growth Plan',
  },
  {
    name: 'Founder Pro',
    price: { monthly: 2999, yearly: 29990 },
    desc: 'For scaling startups',
    features: ['Everything in Growth', 'Unlimited Mentor Sessions', 'Pitch Deck AI Builder', 'Investor Direct Connect', 'Fundraising CRM', 'Priority Support 24/7', 'Custom Startup Analytics', 'Multi-startup management'],
    color: 'border-orange-500',
    cta: 'Go Founder Pro',
  },
  {
    name: 'Investor Pro',
    price: { monthly: 4999, yearly: 49990 },
    desc: 'For investors & VCs',
    features: ['Full Startup Database', 'Advanced Filters & Search', 'Direct Founder Connect', 'Portfolio Analytics Dashboard', 'Deal Flow CRM', 'Priority Placement', 'Verified Investor Badge'],
    color: 'border-green-500',
    cta: 'Start Investing',
  },
  {
    name: 'Enterprise',
    price: { monthly: 0, yearly: 0 },
    desc: 'For accelerators & incubators',
    features: ['Custom cohort management', 'White-label options', 'API access', 'Dedicated support', 'Custom reporting', 'SLA guarantee', 'Onboarding assistance'],
    color: 'border-purple-500',
    cta: 'Contact Sales',
    custom: true,
  },
];

const PricingPage = () => {
  const [yearly, setYearly] = useState(false);

  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      <section className="pt-28 pb-12 bg-gradient-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-blue-500/20 text-blue-300 text-sm font-semibold mb-4"><Sparkles className="w-3.5 h-3.5" /> Pricing</span>
            <h1 className="text-5xl font-bold text-white mb-4">Simple, transparent pricing</h1>
            <p className="text-white/60 text-xl max-w-2xl mx-auto mb-8">Start free. Scale as you grow. All prices in Indian Rupees ₹.</p>
            <div className="flex items-center justify-center gap-3">
              <span className={`text-sm ${!yearly ? 'text-white font-semibold' : 'text-white/50'}`}>Monthly</span>
              <button onClick={() => setYearly(!yearly)} className={`relative w-12 h-6 rounded-full transition-colors ${yearly ? 'bg-blue-600' : 'bg-white/20'}`}>
                <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${yearly ? 'left-7' : 'left-1'}`} />
              </button>
              <span className={`text-sm ${yearly ? 'text-white font-semibold' : 'text-white/50'}`}>Yearly <span className="text-green-400 font-bold">Save 17%</span></span>
            </div>
          </motion.div>
        </div>
      </section>
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {PLANS.map((plan, i) => (
              <motion.div key={plan.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className={`relative rounded-2xl border-2 ${plan.color} bg-card p-6 flex flex-col ${plan.popular ? 'ring-2 ring-blue-500 shadow-2xl shadow-blue-500/20' : ''}`}>
                {plan.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-blue-600 text-white text-xs font-bold whitespace-nowrap">Most Popular</div>}
                <h3 className="text-lg font-bold text-foreground mb-1">{plan.name}</h3>
                <p className="text-muted-foreground text-xs mb-4">{plan.desc}</p>
                <div className="mb-5">
                  {plan.custom ? (
                    <div>
                      <p className="text-2xl font-bold text-foreground">Custom</p>
                      <p className="text-muted-foreground text-xs">Contact for pricing</p>
                    </div>
                  ) : (
                    <div>
                      <span className="text-3xl font-bold text-foreground">
                        {plan.price.monthly === 0 ? 'Free' : `₹${(yearly ? plan.price.yearly : plan.price.monthly).toLocaleString('en-IN')}`}
                      </span>
                      {plan.price.monthly > 0 && <span className="text-muted-foreground text-sm">/{yearly ? 'yr' : 'mo'}</span>}
                    </div>
                  )}
                </div>
                <ul className="space-y-2.5 mb-6 flex-1">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" /> {f}
                    </li>
                  ))}
                </ul>
                <Link to={plan.custom ? '/contact' : '/register'} className={`block w-full text-center py-2.5 rounded-xl text-sm font-semibold transition-all ${plan.popular ? 'bg-blue-600 text-white hover:bg-blue-500' : 'border border-border text-foreground hover:bg-muted'}`}>
                  {plan.cta}
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="mt-12 p-8 rounded-2xl border border-border bg-card text-center">
            <h3 className="text-xl font-bold text-foreground mb-3">Need something custom?</h3>
            <p className="text-muted-foreground mb-6">We work with accelerators, incubators, and government programs. Let's build something together.</p>
            <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all">
              Talk to Sales <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default PricingPage;
