'use client';

import { useState, useRef } from 'react';
import { Upload, CheckCircle, AlertCircle } from 'lucide-react';

interface Props { jobId: string; jobTitle: string; locale: string; }

export default function JobApplicationForm({ jobId, jobTitle, locale }: Props) {
  const isAr = locale === 'ar';
  const [form, setForm] = useState({ name: '', email: '', phone: '', coverLetter: '' });
  const [cv, setCv] = useState<File | null>(null);
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const fileRef = useRef<HTMLInputElement>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState('loading');
    const fd = new FormData();
    fd.append('jobId', jobId);
    fd.append('name', form.name);
    fd.append('email', form.email);
    fd.append('phone', form.phone);
    fd.append('coverLetter', form.coverLetter);
    if (cv) fd.append('cv', cv);
    try {
      const r = await fetch('/api/jobs/apply', { method: 'POST', body: fd });
      if (r.ok) setState('success');
      else setState('error');
    } catch { setState('error'); }
  };

  if (state === 'success') {
    return (
      <div className="rounded-2xl border border-[#34D399]/40 bg-[#34D399]/10 p-6 text-center">
        <CheckCircle size={40} className="text-[#34D399] mx-auto mb-3" />
        <h4 className="text-white font-bold text-lg mb-2">{isAr ? 'تم إرسال طلبك بنجاح! ✓' : 'Application Submitted! ✓'}</h4>
        <p className="text-slate-400 text-sm">{isAr ? 'سنتواصل معك قريباً على البريد الإلكتروني المذكور.' : 'We\'ll contact you soon at the provided email.'}</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-[#a855f7]/30 bg-[#a855f7]/5 p-6">
      <h4 className={`text-white font-bold text-lg mb-5 ${isAr ? 'text-right' : 'text-left'}`}>
        {isAr ? `التقدم لوظيفة: ${jobTitle}` : `Apply for: ${jobTitle}`}
      </h4>
      <form onSubmit={submit} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { key: 'name', label: isAr ? 'الاسم الكامل *' : 'Full Name *', type: 'text', required: true },
            { key: 'email', label: isAr ? 'البريد الإلكتروني *' : 'Email *', type: 'email', required: true },
            { key: 'phone', label: isAr ? 'رقم الهاتف' : 'Phone Number', type: 'tel', required: false },
          ].map(({ key, label, type, required }) => (
            <div key={key}>
              <label className={`block text-sm text-slate-400 mb-1 ${isAr ? 'text-right' : 'text-left'}`}>{label}</label>
              <input
                type={type}
                required={required}
                value={(form as any)[key]}
                onChange={e => setForm({ ...form, [key]: e.target.value })}
                dir={isAr ? 'rtl' : 'ltr'}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-slate-500 outline-none focus:border-[#a855f7]/60 focus:ring-1 focus:ring-[#a855f7]/20 transition-all text-sm"
              />
            </div>
          ))}
          {/* CV Upload */}
          <div>
            <label className={`block text-sm text-slate-400 mb-1 ${isAr ? 'text-right' : 'text-left'}`}>
              {isAr ? 'السيرة الذاتية (PDF/DOC) *' : 'CV / Resume (PDF/DOC) *'}
            </label>
            <button type="button" onClick={() => fileRef.current?.click()}
              className={`w-full h-[46px] border border-dashed border-[#a855f7]/40 rounded-xl flex items-center justify-center gap-2 text-sm transition-all hover:border-[#a855f7]/70 hover:bg-[#a855f7]/10 ${cv ? 'text-[#34D399] border-[#34D399]/40' : 'text-slate-400'}`}>
              <Upload size={16} />
              {cv ? cv.name.slice(0, 25) : (isAr ? 'اختر الملف' : 'Choose File')}
            </button>
            <input ref={fileRef} type="file" accept=".pdf,.doc,.docx" className="hidden"
              onChange={e => setCv(e.target.files?.[0] || null)} />
          </div>
        </div>

        <div>
          <label className={`block text-sm text-slate-400 mb-1 ${isAr ? 'text-right' : 'text-left'}`}>
            {isAr ? 'خطاب التقديم (اختياري)' : 'Cover Letter (Optional)'}
          </label>
          <textarea
            value={form.coverLetter}
            onChange={e => setForm({ ...form, coverLetter: e.target.value })}
            rows={4}
            dir={isAr ? 'rtl' : 'ltr'}
            placeholder={isAr ? 'أخبرنا لماذا أنت المرشح المناسب...' : 'Tell us why you\'re the right candidate...'}
            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-slate-500 outline-none focus:border-[#a855f7]/60 transition-all text-sm resize-none"
          />
        </div>

        {state === 'error' && (
          <div className="flex items-center gap-2 text-red-400 text-sm">
            <AlertCircle size={16} />
            {isAr ? 'حدث خطأ، يرجى المحاولة مرة أخرى.' : 'An error occurred. Please try again.'}
          </div>
        )}

        <div className={`flex ${isAr ? 'justify-end' : 'justify-start'}`}>
          <button type="submit" disabled={state === 'loading'}
            className="px-8 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-[#7c3aed] to-[#a855f7] hover:from-[#8b5cf6] hover:to-[#c084fc] shadow-lg shadow-[#7c3aed]/30 transition-all hover:-translate-y-0.5 disabled:opacity-50">
            {state === 'loading' ? (isAr ? 'جاري الإرسال...' : 'Submitting...') : (isAr ? 'إرسال الطلب' : 'Submit Application')}
          </button>
        </div>
      </form>
    </div>
  );
}
