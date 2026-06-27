'use client';

import { useState, useRef, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { MessageCircle, X, Send, Bot } from 'lucide-react';

interface Message { role: 'user' | 'bot'; text: string; }

const FAQ_AR: { q: string; a: string }[] = [
  { q: 'ما هي خدماتكم؟', a: 'نقدم خدمات الترميز الطبي ICD-10، إدارة دورة الإيرادات (RCM)، نظام PLICS، المعلوماتية الصحية، التحول الرقمي، والتدريب المعتمد.' },
  { q: 'هل أنتم معتمدون؟', a: 'نعم، فريقنا معتمد من AHIMA وAAPCوCBHI وحاصل على موافقة وزارة الصحة السعودية.' },
  { q: 'كيف أتواصل معكم؟', a: 'يمكنك التواصل عبر صفحة "اتصل بنا" في الموقع، أو الاتصال المباشر. فريقنا متاح 24/7.' },
  { q: 'ما هي تكلفة الخدمات؟', a: 'تختلف الأسعار حسب حجم المنشأة ونوع الخدمة. تواصل معنا للحصول على عرض سعر مخصص مجاناً.' },
  { q: 'هل تقدمون تدريباً؟', a: 'نعم، نقدم برامج تدريب معتمدة دولياً في الترميز الطبي ICD-10 وAR-DRG وPLICS.' },
];

const FAQ_EN: { q: string; a: string }[] = [
  { q: 'What services do you offer?', a: 'We offer ICD-10 medical coding, Revenue Cycle Management (RCM), PLICS system, health informatics, digital transformation, and certified training.' },
  { q: 'Are you certified?', a: 'Yes, our team is AHIMA, AAPC, and CBAHI certified, with Saudi MOH approval.' },
  { q: 'How can I contact you?', a: 'Visit our Contact page or call us directly. Our team is available 24/7.' },
  { q: 'What are your prices?', a: 'Pricing varies by facility size and service type. Contact us for a free custom quote.' },
  { q: 'Do you offer training?', a: 'Yes, we offer internationally certified training programs in ICD-10, AR-DRG, and PLICS coding.' },
];

export default function ChatWidget() {
  const locale = useLocale();
  const isAr = locale === 'ar';
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const faqs = isAr ? FAQ_AR : FAQ_EN;

  useEffect(() => {
    if (open && messages.length === 0) {
      setTimeout(() => setMessages([{
        role: 'bot',
        text: isAr
          ? 'مرحباً بك في DigiMind! 👋 أنا مساعدك الذكي. كيف يمكنني مساعدتك اليوم؟'
          : "Welcome to DigiMind! 👋 I'm your AI assistant. How can I help you today?",
      }]), 500);
    }
  }, [open, isAr, messages.length]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const findAnswer = (q: string) => {
    const lower = q.toLowerCase();
    const match = faqs.find(f =>
      f.q.toLowerCase().split(' ').some(word => word.length > 2 && lower.includes(word))
    );
    return match?.a || (isAr
      ? 'شكراً على سؤالك! للمزيد من المعلومات التفصيلية، يُرجى التواصل مع فريقنا مباشرةً عبر صفحة "اتصل بنا".'
      : 'Thank you for your question! For more details, please contact our team directly via the Contact page.');
  };

  const send = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setInput('');
    setMessages(m => [...m, { role: 'user', text: userMsg }]);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages(m => [...m, { role: 'bot', text: findAnswer(userMsg) }]);
    }, 1000 + Math.random() * 500);
  };

  return (
    <div className={`fixed bottom-6 ${isAr ? 'left-6' : 'right-6'} z-50`}>
      {open && (
        <div className="mb-4 w-80 rounded-2xl border border-white/20 bg-[#0d1f3c] shadow-2xl shadow-black/50 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-[#1B3FAB] to-[#0EA5E9]">
            <div className="flex items-center gap-2">
              <Bot size={18} className="text-white" />
              <span className="text-white font-bold text-sm">DigiMind Assistant</span>
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            </div>
            <button onClick={() => setOpen(false)} className="text-white/70 hover:text-white"><X size={18} /></button>
          </div>
          <div className="h-72 overflow-y-auto p-3 space-y-3 bg-[#060d1b]">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? (isAr ? 'justify-start' : 'justify-end') : (isAr ? 'justify-end' : 'justify-start')}`}>
                <div className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${m.role === 'bot'
                  ? 'bg-white/10 text-slate-200 rounded-tl-sm'
                  : 'bg-gradient-to-br from-[#1B3FAB] to-[#0EA5E9] text-white rounded-tr-sm'
                }`} dir={isAr ? 'rtl' : 'ltr'}>
                  {m.text}
                </div>
              </div>
            ))}
            {typing && (
              <div className={`flex ${isAr ? 'justify-end' : 'justify-start'}`}>
                <div className="bg-white/10 rounded-2xl px-4 py-3 flex gap-1">
                  {[0, 1, 2].map(i => <span key={i} className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />)}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
          <div className="px-3 py-2 bg-[#060d1b] border-t border-white/5">
            <div className="flex flex-wrap gap-1.5">
              {faqs.slice(0, 3).map(f => (
                <button key={f.q} onClick={() => { setMessages(m => [...m, { role: 'user', text: f.q }]); setTyping(true); setTimeout(() => { setTyping(false); setMessages(m => [...m, { role: 'bot', text: f.a }]); }, 800); }}
                  className="text-xs px-2 py-1 rounded-full border border-white/10 bg-white/5 text-slate-400 hover:text-white hover:border-[#0EA5E9]/40 transition-colors">
                  {f.q.length > 20 ? f.q.slice(0, 20) + '...' : f.q}
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-2 p-3 border-t border-white/10 bg-[#060d1b]">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
              placeholder={isAr ? 'اكتب سؤالك...' : 'Type your question...'}
              dir={isAr ? 'rtl' : 'ltr'}
              className="flex-1 bg-white/10 border border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder-slate-500 outline-none focus:border-[#0EA5E9]/50"
            />
            <button onClick={send} className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#1B3FAB] to-[#0EA5E9] flex items-center justify-center hover:opacity-90 transition-opacity">
              <Send size={15} className="text-white" />
            </button>
          </div>
        </div>
      )}
      <button
        onClick={() => setOpen(!open)}
        className={`w-14 h-14 rounded-full bg-gradient-to-br from-[#1B3FAB] to-[#0EA5E9] shadow-lg shadow-[#1B3FAB]/40 flex items-center justify-center transition-all duration-300 hover:scale-110 ${open ? 'rotate-180' : ''}`}
      >
        {open ? <X size={24} className="text-white" /> : <MessageCircle size={24} className="text-white" />}
      </button>
    </div>
  );
}
