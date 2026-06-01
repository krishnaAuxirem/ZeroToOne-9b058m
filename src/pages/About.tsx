import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import heroImg from '@/assets/team-collaboration.jpg';
import { Rocket, Target, Heart, Globe, Award, Users } from 'lucide-react';

const AboutPage = () => (
  <div className="bg-background min-h-screen">
    <Navbar />
    <section className="pt-28 pb-16 bg-gradient-hero relative overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroImg} alt="" className="w-full h-full object-cover opacity-15" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A]/80 to-[#0F172A]" />
      </div>
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-blue-500/20 text-blue-300 text-sm font-semibold mb-4"><Rocket className="w-3.5 h-3.5" /> About ZeroToOne</span>
          <h1 className="text-5xl font-bold text-white mb-6">Building the infrastructure for India's next generation of founders</h1>
          <p className="text-white/60 text-xl max-w-3xl mx-auto">ZeroToOne was founded in 2024 with a simple belief: every great startup begins with a founder who had the courage to go from zero to one. We're here to make that journey less lonely, more informed, and better resourced.</p>
        </motion.div>
      </div>
    </section>
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold text-foreground mb-6" id="mission">Our Mission</h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">We believe India has the potential to produce the next generation of world-changing companies. Our mission is to democratize access to the knowledge, tools, networks, and capital that founders need to succeed.</p>
            <p className="text-muted-foreground leading-relaxed">We're building the platform we wish we had when we started — combining AI-powered tools with human expertise to give every founder an unfair advantage.</p>
          </motion.div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Rocket, label: 'Founded', value: '2024', color: 'blue' },
              { icon: Users, label: 'Founders Helped', value: '50,000+', color: 'green' },
              { icon: Globe, label: 'Cities', value: '50+', color: 'purple' },
              { icon: Award, label: 'Funding Raised', value: '₹500Cr+', color: 'orange' },
            ].map(({ icon: Icon, label, value, color }) => (
              <div key={label} className="p-5 rounded-2xl border border-border bg-card text-center">
                <div className={`w-10 h-10 rounded-xl bg-${color}-500/10 flex items-center justify-center mx-auto mb-3`}>
                  <Icon className={`w-5 h-5 text-${color}-500`} />
                </div>
                <p className="text-2xl font-bold text-foreground">{value}</p>
                <p className="text-xs text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: Target, title: 'Our Vision', desc: 'To be the platform that powers 10,000 successful startups across India and emerging markets by 2030.' },
            { icon: Heart, title: 'Our Values', desc: 'Founder-first. Authentic community. Radical transparency. Continuous learning. Integrity in everything we do.' },
            { icon: Globe, title: 'Our Impact', desc: 'We measure success by the number of founders who achieved their dream of building a meaningful company.' },
          ].map(({ icon: Icon, title, desc }) => (
            <motion.div key={title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="p-6 rounded-2xl border border-border bg-card">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <Icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
    <Footer />
  </div>
);

export default AboutPage;
