import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Search, Circle, Video, Phone, MoreVertical, Paperclip } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';

const CONVERSATIONS = [
  { id: 1, name: 'Karan Mehta', startup: 'CodeCraft', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=karan', lastMessage: 'Thank you so much for the session!', time: '2m ago', unread: 2, online: true },
  { id: 2, name: 'Neha Agarwal', startup: 'SkillUp', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=neha', lastMessage: 'Can we reschedule to next week?', time: '1h ago', unread: 1, online: false },
  { id: 3, name: 'Vishal Rao', startup: 'DataPulse', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=vishal', lastMessage: 'Implemented the sales framework!', time: '3h ago', unread: 0, online: true },
  { id: 4, name: 'Anjali Singh', startup: 'WellnessApp', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=anjali', lastMessage: 'The GTM strategy is working great', time: '1d ago', unread: 0, online: false },
  { id: 5, name: 'Deepika Rao', startup: 'EduPilot', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=deepika', lastMessage: 'Ready for our next session', time: '2d ago', unread: 0, online: false },
];

const CHAT_HISTORY: Record<number, { from: 'me' | 'them'; text: string; time: string }[]> = {
  1: [
    { from: 'them', text: 'Hi! Just wanted to say the session was incredibly valuable. Already started implementing the positioning changes.', time: '10:30 AM' },
    { from: 'me', text: 'Great to hear! Remember: nail the problem statement first before going into features. How did the customer call go?', time: '10:45 AM' },
    { from: 'them', text: 'It went really well! They resonated with our new messaging. Might be a pilot customer.', time: '11:00 AM' },
    { from: 'me', text: 'Excellent! Push for a paid pilot, even at ₹5k/month. Paid validation is 10x more valuable than free.', time: '11:05 AM' },
    { from: 'them', text: 'Thank you so much for the session!', time: '11:10 AM' },
  ],
};

const MentorMessages = () => {
  const [activeConvo, setActiveConvo] = useState(1);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState(CHAT_HISTORY[1]);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { from: 'me', text: input, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    setInput('');
  };

  const activeConvoData = CONVERSATIONS.find(c => c.id === activeConvo);

  return (
    <DashboardLayout title="Messages">
      <div className="flex gap-0 rounded-2xl border border-border bg-card overflow-hidden" style={{ height: 'calc(100vh - 10rem)' }}>
        {/* Sidebar */}
        <div className="w-72 flex-shrink-0 border-r border-border flex flex-col">
          <div className="p-4 border-b border-border">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input placeholder="Search conversations..." className="w-full pl-9 pr-3 py-2 rounded-xl bg-muted text-sm text-foreground placeholder-muted-foreground focus:outline-none" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {CONVERSATIONS.map(c => (
              <button key={c.id} onClick={() => setActiveConvo(c.id)} className={`w-full flex items-center gap-3 p-4 text-left hover:bg-muted/50 transition-all ${activeConvo === c.id ? 'bg-primary/5 border-l-2 border-primary' : ''}`}>
                <div className="relative flex-shrink-0">
                  <img src={c.avatar} alt={c.name} className="w-10 h-10 rounded-xl bg-muted" />
                  {c.online && <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-500 ring-2 ring-card" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-foreground truncate">{c.name}</span>
                    <span className="text-xs text-muted-foreground">{c.time}</span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{c.startup} · {c.lastMessage}</p>
                </div>
                {c.unread > 0 && <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center flex-shrink-0">{c.unread}</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Chat */}
        <div className="flex-1 flex flex-col">
          <div className="flex items-center justify-between px-5 py-3 border-b border-border">
            <div className="flex items-center gap-3">
              <img src={activeConvoData?.avatar} alt="" className="w-9 h-9 rounded-xl bg-muted" />
              <div>
                <p className="text-sm font-semibold text-foreground">{activeConvoData?.name}</p>
                <p className="text-xs text-muted-foreground">{activeConvoData?.startup} · {activeConvoData?.online ? 'Online' : 'Offline'}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-all"><Video className="w-4 h-4" /></button>
              <button className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-all"><Phone className="w-4 h-4" /></button>
              <button className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-all"><MoreVertical className="w-4 h-4" /></button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {messages.map((msg, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className={`flex ${msg.from === 'me' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs lg:max-w-md px-4 py-2.5 rounded-2xl text-sm ${msg.from === 'me' ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground'}`}>
                  {msg.text}
                  <p className={`text-xs mt-1 ${msg.from === 'me' ? 'text-primary-foreground/60' : 'text-muted-foreground'}`}>{msg.time}</p>
                </div>
              </motion.div>
            ))}
            <div ref={endRef} />
          </div>

          <div className="p-4 border-t border-border flex items-center gap-3">
            <button className="p-2 rounded-xl hover:bg-muted text-muted-foreground transition-all"><Paperclip className="w-4 h-4" /></button>
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMessage()} placeholder="Type a message..." className="flex-1 px-4 py-2.5 rounded-xl bg-muted text-sm text-foreground placeholder-muted-foreground focus:outline-none" />
            <button onClick={sendMessage} disabled={!input.trim()} className="p-2.5 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-all"><Send className="w-4 h-4" /></button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MentorMessages;
