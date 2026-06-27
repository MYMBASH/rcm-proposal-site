'use client';
import { useState } from 'react';
import { Loader2, Send, CheckCircle } from 'lucide-react';

interface Props { locale: string; }

export default function ContactForm({ locale }: Props) {
  const isAr = locale === 'ar';
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', message: '' });

  const L = {
    name: isAr ? 'الاسم الكامل' : 'Full Name',
    email: isAr ? 'البريد الإلكتروني' : 'Email Address',
    phone: isAr ? 'رقم الجوال' : 'Phone Number',
    company: isAr ? 'اسم المنشأة' : 'Organization Name',
    message: isAr ? 'رسالتك' : 'Your Message',
    submit: isAr ? 'إرسال الرسالة' : 'Send Message',
    success: isAr ? 'تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.' : 'Your message was sent successfully! We will be in touch soon.',
    error: isAr ? 'حدث خطأ. يرجى المحاولة مرة أخرى.' : 'An error occurred. Please try again.',
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="text-center py-12">
        <CheckCircle size={56} className="text-brand-emerald mx-auto mb-4" />
        <p className="text-brand-dark font-semibold text-lg">{L.success}</p>
      </div>
    );
  }

  const inputClass = 'w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-brand-dark focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10 transition-all';

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-brand-gray uppercase tracking-wide mb-1.5">{L.name} *</label>
          <input required className={inputClass} placeholder={L.name} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-brand-gray uppercase tracking-wide mb-1.5">{L.email} *</label>
          <input required type="email" className={inputClass} placeholder={L.email} value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-brand-gray uppercase tracking-wide mb-1.5">{L.phone}</label>
          <input type="tel" className={inputClass} placeholder="+966 5X XXX XXXX" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-brand-gray uppercase tracking-wide mb-1.5">{L.company}</label>
          <input className={inputClass} placeholder={L.company} value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} />
        </div>
      </div>
      <div>
        <label className="block text-xs font-semibold text-brand-gray uppercase tracking-wide mb-1.5">{L.message} *</label>
        <textarea required rows={5} className={inputClass} placeholder={L.message} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
      </div>
      {status === 'error' && <p className="text-red-500 text-sm bg-red-50 rounded-lg px-4 py-2">{L.error}</p>}
      <button type="submit" disabled={status === 'loading'} className="btn-gradient w-full py-4 text-base disabled:opacity-60 disabled:cursor-not-allowed">
        {status === 'loading' ? <Loader2 size={20} className="animate-spin" /> : <Send size={18} />}
        {status === 'loading' ? (isAr ? 'جارٍ الإرسال...' : 'Sending...') : L.submit}
      </button>
    </form>
  );
}
