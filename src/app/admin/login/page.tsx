'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Loader2, Lock } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        router.push('/admin');
      } else {
        const d = await res.json();
        setError(d.error === 'Invalid credentials' ? 'البريد الإلكتروني أو كلمة المرور غير صحيحة' : 'حدث خطأ');
      }
    } catch {
      setError('فشل الاتصال بالخادم');
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-blue to-brand-teal flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 backdrop-blur mb-4">
            <Lock size={28} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">لوحة تحكم DigiMind</h1>
          <p className="text-blue-200 mt-1 text-sm">أدخل بيانات الدخول للمتابعة</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-brand-dark mb-2">البريد الإلكتروني</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                placeholder="admin@digimind.sa"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-brand-dark mb-2">كلمة المرور</label>
              <div className="relative">
                <input
                  type={show ? 'text' : 'password'}
                  required
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm pe-12 focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10"
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute inset-y-0 end-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {show ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">{error}</div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-gradient w-full py-3.5 text-base disabled:opacity-60"
            >
              {loading ? <Loader2 size={20} className="animate-spin" /> : null}
              {loading ? 'جارٍ تسجيل الدخول...' : 'تسجيل الدخول'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
