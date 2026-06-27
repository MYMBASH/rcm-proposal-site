'use client';

import { useState, useEffect } from 'react';
import AdminShell from '@/components/admin/AdminShell';

const ARABIC_FONTS = [
  { value: 'Tajawal', label: 'Tajawal (الافتراضي)' },
  { value: 'Cairo', label: 'Cairo' },
  { value: 'Almarai', label: 'Almarai' },
  { value: 'Noto Kufi Arabic', label: 'Noto Kufi Arabic' },
  { value: 'Readex Pro', label: 'Readex Pro' },
  { value: 'IBM Plex Arabic', label: 'IBM Plex Arabic' },
  { value: 'Lemonada', label: 'Lemonada' },
  { value: 'Noto Naskh Arabic', label: 'Noto Naskh Arabic' },
];

const ENGLISH_FONTS = [
  { value: 'Inter', label: 'Inter (الافتراضي)' },
  { value: 'Poppins', label: 'Poppins' },
  { value: 'Roboto', label: 'Roboto' },
  { value: 'Open Sans', label: 'Open Sans' },
  { value: 'Nunito', label: 'Nunito' },
  { value: 'Raleway', label: 'Raleway' },
  { value: 'Montserrat', label: 'Montserrat' },
  { value: 'DM Sans', label: 'DM Sans' },
];

export default function SettingsPage() {
  const [arFont, setArFont] = useState('Tajawal');
  const [enFont, setEnFont] = useState('Inter');
  const [siteName, setSiteName] = useState('DigiMind');
  const [sitePhone, setSitePhone] = useState('');
  const [siteEmail, setSiteEmail] = useState('');
  const [siteAddress, setSiteAddress] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch('/api/settings').then(r => r.json()).then((data: Record<string,string>) => {
      if (data.arabic_font) setArFont(data.arabic_font);
      if (data.english_font) setEnFont(data.english_font);
      if (data.site_name) setSiteName(data.site_name);
      if (data.site_phone) setSitePhone(data.site_phone);
      if (data.site_email) setSiteEmail(data.site_email);
      if (data.site_address) setSiteAddress(data.site_address);
    }).catch(() => {});
  }, []);

  const save = async () => {
    setSaving(true);
    await fetch('/api/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        arabic_font: arFont,
        english_font: enFont,
        site_name: siteName,
        site_phone: sitePhone,
        site_email: siteEmail,
        site_address: siteAddress,
      }),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <AdminShell>
      <div className="max-w-2xl space-y-8">
        <h1 className="text-2xl font-bold text-gray-900">إعدادات الموقع</h1>

        {/* General */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
          <h2 className="font-bold text-gray-800 text-lg border-b pb-2">معلومات عامة</h2>
          {[
            { label: 'اسم الموقع', val: siteName, set: setSiteName },
            { label: 'رقم الهاتف', val: sitePhone, set: setSitePhone },
            { label: 'البريد الإلكتروني', val: siteEmail, set: setSiteEmail },
            { label: 'العنوان', val: siteAddress, set: setSiteAddress },
          ].map(({ label, val, set }) => (
            <div key={label}>
              <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
              <input value={val} onChange={e => set(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          ))}
        </div>

        {/* Fonts */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
          <h2 className="font-bold text-gray-800 text-lg border-b pb-2">الخطوط</h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">خط اللغة العربية</label>
            <select value={arFont} onChange={e => setArFont(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              {ARABIC_FONTS.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
            </select>
            <p className="text-xs text-gray-400 mt-1">معاينة: <span style={{ fontFamily: arFont }}>بسم الله الرحمن الرحيم</span></p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">خط اللغة الإنجليزية</label>
            <select value={enFont} onChange={e => setEnFont(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              {ENGLISH_FONTS.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
            </select>
            <p className="text-xs text-gray-400 mt-1">Preview: <span style={{ fontFamily: enFont }}>The quick brown fox</span></p>
          </div>

          <div className="rounded-xl bg-amber-50 border border-amber-200 p-3 text-sm text-amber-700">
            ⚠️ بعد تغيير الخط، يجب إعادة تشغيل الخادم (npm run dev) لتطبيق الخط الجديد من Google Fonts.
          </div>
        </div>

        <button onClick={save} disabled={saving}
          className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 disabled:opacity-50 transition-colors">
          {saving ? 'جاري الحفظ...' : saved ? '✓ تم الحفظ!' : 'حفظ الإعدادات'}
        </button>
      </div>
    </AdminShell>
  );
}
