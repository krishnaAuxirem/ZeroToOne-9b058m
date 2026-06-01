import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { toast } from 'sonner';

const ContactPage = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    await new Promise(r => setTimeout(r, 1000));
    setSending(false);
    toast.success('Message sent! We will get back to you within 24 hours.');
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      <section className="pt-28 pb-12 bg-gradient-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-blue-500/20 text-blue-300 text-sm font-semibold mb-4"><Mail className="w-3.5 h-3.5" /> Contact</span>
            <h1 className="text-4xl font-bold text-white mb-4">Get in touch</h1>
            <p className="text-white/60 text-lg">Have a question? We would love to hear from you.</p>
          </motion.div>
        </div>
      </section>
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="space-y-6">
              {[
                { icon: Mail, title: 'Email', value: 'hello@zerotoone.in', sub: 'We respond within 24 hours' },
                { icon: Phone, title: 'Phone', value: '+91 90000 00000', sub: 'Mon-Fri, 9AM-6PM IST' },
                { icon: MapPin, title: 'Office', value: 'Koramangala, Bangalore', sub: '560034, Karnataka, India' },
              ].map(({ icon: Icon, title, value, sub }) => (
                <div key={title} className="flex gap-4 p-5 rounded-2xl border border-border bg-card">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{title}</p>
                    <p className="text-primary text-sm">{value}</p>
                    <p className="text-muted-foreground text-xs">{sub}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-8">
              <h2 className="text-xl font-bold text-foreground mb-6">Send us a message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1.5">Name</label>
                    <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} required placeholder="Arjun Sharma" className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm placeholder-muted-foreground focus:outline-none focus:border-primary" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1.5">Email</label>
                    <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required placeholder="arjun@startup.com" className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm placeholder-muted-foreground focus:outline-none focus:border-primary" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Subject</label>
                  <input value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} required placeholder="How can we help?" className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm placeholder-muted-foreground focus:outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Message</label>
                  <textarea value={form.message} onChange={e => setForm({...form, message: e.target.value})} required rows={5} placeholder="Tell us more about your question..." className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm placeholder-muted-foreground focus:outline-none focus:border-primary resize-none" />
                </div>
                <button type="submit" disabled={sending} className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-all disabled:opacity-60">
                  {sending ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Send className="w-4 h-4" /> Send Message</>}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ContactPage;
