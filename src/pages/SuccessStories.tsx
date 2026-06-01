import { motion } from 'framer-motion';
import { Award, DollarSign, TrendingUp, ArrowRight, Trophy } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { SUCCESS_STORIES } from '@/lib/mockData';
import successImg from '@/assets/startup-success.jpg';

const SuccessStoriesPage = () => {
  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      <section className="pt-28 pb-16 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={successImg} alt="" className="w-full h-full object-cover opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0F172A]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-yellow-500/20 text-yellow-300 text-sm font-semibold mb-4"><Trophy className="w-3.5 h-3.5" /> Success Stories</span>
            <h1 className="text-5xl font-bold text-white mb-4">Founders who changed the game</h1>
            <p className="text-white/60 text-xl max-w-2xl mx-auto">Real founders, real results. They started on ZeroToOne and changed their industries.</p>
            <div className="flex gap-8 justify-center mt-10 text-center">
              {[
                { value: '₹500Cr+', label: 'Total Funding Raised' },
                { value: '1,000+', label: 'Funded Startups' },
                { value: '85%', label: 'Still Operating' },
              ].map((s) => (
                <div key={s.label} className="glass rounded-xl px-6 py-4">
                  <p className="text-2xl font-bold text-white">{s.value}</p>
                  <p className="text-white/50 text-xs">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SUCCESS_STORIES.map((story, i) => (
              <motion.div key={story.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="p-6 rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-xl transition-all group">
                <div className="flex items-center gap-3 mb-4">
                  <img src={story.avatar} alt={story.founder} className="w-12 h-12 rounded-2xl bg-muted" />
                  <div>
                    <h3 className="font-bold text-foreground">{story.founder}</h3>
                    <p className="text-sm text-primary">{story.startup}</p>
                    <span className="text-xs text-muted-foreground">{story.industry} · {story.year}</span>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-5">{story.description}</p>
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div>
                    <p className="text-2xl font-bold text-green-500">{story.amount}</p>
                    <p className="text-xs text-muted-foreground">{story.round} Round</p>
                  </div>
                  <Award className="w-10 h-10 text-yellow-400/30" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default SuccessStoriesPage;
