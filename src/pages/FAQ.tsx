import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, HelpCircle } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { FAQ_DATA } from '@/lib/mockData';

const FAQPage = () => {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      <section className="pt-28 pb-12 bg-gradient-hero">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-blue-500/20 text-blue-300 text-sm font-semibold mb-4"><HelpCircle className="w-3.5 h-3.5" /> FAQ</span>
            <h1 className="text-4xl font-bold text-white mb-4">Frequently Asked Questions</h1>
            <p className="text-white/60 text-lg">Find answers to common questions about ZeroToOne.</p>
          </motion.div>
        </div>
      </section>
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          {FAQ_DATA.map((faq, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="rounded-2xl border border-border bg-card overflow-hidden">
              <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left">
                <span className="font-semibold text-foreground">{faq.question}</span>
                <ChevronRight className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform ${open === i ? 'rotate-90' : ''}`} />
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                    <p className="px-5 pb-5 text-muted-foreground text-sm leading-relaxed">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default FAQPage;
