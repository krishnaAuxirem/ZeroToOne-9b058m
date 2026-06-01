import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, Search, Paperclip, Video, Phone } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';

const CONVERSATIONS = [
  { id: 1, name: 'Arjun Sharma', role: 'Founder', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=arjun', lastMessage: 'Dashboard PR is ready for review', time: '30m ago', unread: 1, online: true },
  { id: 2, name: 'Priya Nair', role: 'Mentor', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=priya', lastMessage: 'Great work on the sprint!', time: '2h ago', unread: 0, online: false },
  { id: 3, name: 'Rahul Kumar', role: 'Team Member', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=rahul', lastMessage: 'Need help with the API integration', time: '4h ago', unread: 2, online: true },
];

const MESSAGES = [
  { from: 'them', text: 'Hey! The dashboard PR is up. Can you review when you get a chance?', time: '9:30 AM' },
  { from: 'me', text: 'Sure! I\'ll look at it this afternoon.', time: '9:45 AM' },
  { from: 'them', text: 'Thanks! The main changes are in the analytics components.', time: '9:47 AM' },
  { from: 'me', text: 'Got it. I\'ll pay special attention to those.', time: '10:00 AM' },
  { from: 'them', text: 'Dashboard PR is ready for review', time: '10:05 AM' },
];

const TeamMessages = () => {
  const [active, setActive] = useState(1);
  const [input, setInput] = useState('');
  const [msgs, setMsgs] = useState(MESSAGES);
  const endRef = useRef<HTMLDivElement>(null);

  const send = () => {
    if (!input.trim()) return;
    setMsgs(p => [...p, { from: 'me', text: input, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    setInput('');
    setTimeout(() => endRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
  };

  const activeConvo = CONVERSATIONS.find(c => c.id === active);

  return (
    <DashboardLayout title="Messages">
      <div className="flex gap-0 rounded-2xl border border-border bg-card overflow-hidden" style={{ height: 'calc(100vh - 10rem)' }}>
        <div className="w-72 flex-shrink-0 border-r border-border flex flex-col">
          <div className="p-4 border-b border-border">
            <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" /><input placeholder="Search..." className="w-full pl-9 pr-3 py-2 rounded-xl bg-muted text-sm focus:outline-none" /></div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {CONVERSATIONS.map(c => (
              <button key={c.id} onClick={() => setActive(c.id)} className={`w-full flex items-center gap-3 p-4 text-left hover:bg-muted/50 ${active === c.id ? 'bg-primary/5 border-l-2 border-primary' : ''}`}>
                <div className="relative flex-shrink-0">
                  <img src={c.avatar} alt="" className="w-10 h-10 rounded-xl bg-muted" />
                  {c.online && <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-500 ring-2 ring-card" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between"><span className="text-sm font-semibold text-foreground">{c.name}</span><span className="text-xs text-muted-foreground">{c.time}</span></div>
                  <p className="text-xs text-muted-foreground truncate">{c.role} · {c.lastMessage}</p>
                </div>
                {c.unread > 0 && <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">{c.unread}</span>}
              </button>
            ))}
          </div>
        </div>
        <div className="flex-1 flex flex-col">
          <div className="flex items-center justify-between px-5 py-3 border-b border-border">
            <div className="flex items-center gap-3">
              <img src={activeConvo?.avatar} alt="" className="w-9 h-9 rounded-xl bg-muted" />
              <div><p className="text-sm font-semibold text-foreground">{activeConvo?.name}</p><p className="text-xs text-muted-foreground">{activeConvo?.role}</p></div>
            </div>
            <div className="flex gap-2">
              <button className="p-2 rounded-lg hover:bg-muted text-muted-foreground"><Video className="w-4 h-4" /></button>
              <button className="p-2 rounded-lg hover:bg-muted text-muted-foreground"><Phone className="w-4 h-4" /></button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {msgs.map((msg, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className={`flex ${msg.from === 'me' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs lg:max-w-md px-4 py-2.5 rounded-2xl text-sm ${msg.from === 'me' ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground'}`}>
                  {msg.text}<p className={`text-xs mt-1 ${msg.from === 'me' ? 'text-primary-foreground/60' : 'text-muted-foreground'}`}>{msg.time}</p>
                </div>
              </motion.div>
            ))}
            <div ref={endRef} />
          </div>
          <div className="p-4 border-t border-border flex gap-3">
            <button className="p-2 rounded-xl hover:bg-muted text-muted-foreground"><Paperclip className="w-4 h-4" /></button>
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} placeholder="Type a message..." className="flex-1 px-4 py-2.5 rounded-xl bg-muted text-sm focus:outline-none" />
            <button onClick={send} disabled={!input.trim()} className="p-2.5 rounded-xl bg-primary text-primary-foreground disabled:opacity-50"><Send className="w-4 h-4" /></button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TeamMessages;
