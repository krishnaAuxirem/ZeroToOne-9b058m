import { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Search, CheckCircle, XCircle, Eye, Shield, DollarSign } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { INVESTORS } from '@/lib/mockData';
import { toast } from 'sonner';

const AdminInvestors = () => {
  const [search, setSearch] = useState('');
  const [verified, setVerified] = useState<string[]>(['i1', 'i2', 'i3']);

  const filtered = INVESTORS.filter(inv => !search || inv.name.toLowerCase().includes(search.toLowerCase()) || inv.firm.toLowerCase().includes(search.toLowerCase()));

  return (
    <DashboardLayout title="Investor Verification">
      <div className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[{ label: 'Total Investors', value: INVESTORS.length.toString(), color: 'text-green-500' }, { label: 'Verified', value: verified.length.toString(), color: 'text-blue-500' }, { label: 'Pending', value: (INVESTORS.length - verified.length).toString(), color: 'text-yellow-500' }, { label: 'Total Committed', value: '₹425Cr', color: 'text-purple-500' }].map(s => (
            <div key={s.label} className="rounded-2xl border border-border bg-card p-4 text-center"><p className={`text-2xl font-bold ${s.color}`}>{s.value}</p><p className="text-xs text-muted-foreground mt-1">{s.label}</p></div>
          ))}
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search investors..." className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:border-primary" />
        </div>

        <div className="space-y-3">
          {filtered.map((inv, i) => (
            <motion.div key={inv.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="flex items-center gap-4 p-5 rounded-2xl border border-border bg-card hover:border-primary/30 transition-all">
              <img src={inv.avatar} alt={inv.name} className="w-12 h-12 rounded-xl bg-muted flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-foreground">{inv.name}</span>
                  {verified.includes(inv.id) && <Shield className="w-3.5 h-3.5 text-blue-500" />}
                  <span className="text-xs text-muted-foreground">· {inv.firm} · {inv.type}</span>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {inv.sectors.map(s => <span key={s} className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-xs">{s}</span>)}
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="text-center"><p className="font-bold text-foreground text-xs">{inv.portfolio}</p><p className="text-xs text-muted-foreground">Portfolio</p></div>
                <div className="text-center"><p className="font-bold text-green-500 text-xs">₹{(inv.minTicket / 10000000).toFixed(0)}-{(inv.maxTicket / 10000000).toFixed(0)}Cr</p><p className="text-xs text-muted-foreground">Ticket</p></div>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${verified.includes(inv.id) ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'}`}>{verified.includes(inv.id) ? 'Verified' : 'Pending'}</span>
              </div>
              <div className="flex gap-2">
                {!verified.includes(inv.id) ? (
                  <>
                    <button onClick={() => { setVerified(p => [...p, inv.id]); toast.success(`${inv.name} verified!`); }} className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-green-500 text-white text-xs font-semibold hover:bg-green-400"><CheckCircle className="w-3.5 h-3.5" /> Verify</button>
                    <button onClick={() => toast.info('Rejected')} className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-red-500/30 text-red-500 text-xs"><XCircle className="w-3.5 h-3.5" /> Reject</button>
                  </>
                ) : (
                  <button onClick={() => toast.success('Viewing investor profile...')} className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-border text-muted-foreground text-xs hover:bg-muted"><Eye className="w-3.5 h-3.5" /> View</button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminInvestors;
