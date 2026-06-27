'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminShell from '@/components/admin/AdminShell';
import { Save, Loader2, RotateCcw, Palette } from 'lucide-react';

const DEFAULTS = {
  color_primary:    '#1B3FAB',
  color_secondary:  '#0EA5E9',
  color_accent:     '#34D399',
  color_dark:       '#050d1a',
  color_bg:         '#060d1b',
  color_text:       '#f8fafc',
  color_nav_bg:     '#050d1a',
  color_nav_text:   '#ffffff',
  color_btn_text:   '#ffffff',
};

type ColorKey = keyof typeof DEFAULTS;
type ColorSettings = Record<ColorKey, string>;

const LABELS: Record<ColorKey, string> = {
  color_primary:   'Primary Blue (Buttons, Logo)',
  color_secondary: 'Secondary Blue (Accents)',
  color_accent:    'Accent Green',
  color_dark:      'Dark Background',
  color_bg:        'Page Background',
  color_text:      'Body Text',
  color_nav_bg:    'Header Background',
  color_nav_text:  'Header Text',
  color_btn_text:  'Button Text',
};

function isColorKey(key: string): key is ColorKey {
  return key in DEFAULTS;
}

export default function AppearancePage() {
  const [colors, setColors] = useState<ColorSettings>(DEFAULTS);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/settings').then(r => {
      if (r.status === 401) { router.push('/admin/login'); return; }
      return r.json();
    }).then(data => {
      if (!data) return;
      const merged: ColorSettings = { ...DEFAULTS };
      Object.entries(data as Record<string, unknown>).forEach(([key, value]) => {
        if (isColorKey(key) && typeof value === 'string') merged[key] = value;
      });
      setColors(merged);
    });
  }, []);

  async function save() {
    setSaving(true);
    await fetch('/api/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(colors),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function reset() { setColors(DEFAULTS); }

  return (
    <AdminShell>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
            <Palette size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Site Appearance</h1>
            <p className="text-sm text-gray-500">Customize colors for the entire website</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={reset} className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-sm hover:bg-gray-50">
            <RotateCcw size={15} /> Reset
          </button>
          <button onClick={save} disabled={saving}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl text-sm font-semibold hover:from-blue-700 transition-all">
            {saving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
            {saved ? 'Saved!' : saving ? 'Saving...' : 'Save Colors'}
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Color pickers */}
        <div className="bg-white rounded-2xl shadow border p-6">
          <h2 className="font-bold text-gray-800 mb-4">Brand Colors</h2>
          <div className="space-y-4">
            {(Object.entries(colors) as [ColorKey, string][]).map(([key, val]) => (
              <div key={key} className="flex items-center gap-4">
                <input
                  type="color"
                  value={val}
                  onChange={e => setColors(c => ({ ...c, [key]: e.target.value }))}
                  className="w-12 h-10 rounded-lg border border-gray-200 cursor-pointer p-0.5"
                />
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-800">{LABELS[key]}</div>
                  <div className="text-xs text-gray-400 font-mono">{val}</div>
                </div>
                <input
                  type="text"
                  value={val}
                  onChange={e => setColors(c => ({ ...c, [key]: e.target.value }))}
                  className="w-28 border rounded-lg px-2 py-1 text-xs font-mono focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Live preview */}
        <div className="bg-white rounded-2xl shadow border p-6">
          <h2 className="font-bold text-gray-800 mb-4">Live Preview</h2>
          <div className="rounded-xl overflow-hidden border border-gray-200 text-sm">
            {/* Mock header */}
            <div className="flex items-center justify-between px-4 py-3" style={{ background: colors.color_nav_bg }}>
              <div className="font-bold text-base" style={{ color: colors.color_nav_text }}>DigiMind</div>
              <div className="flex gap-3 text-xs" style={{ color: colors.color_nav_text }}>
                <span>Home</span><span>Services</span><span>Contact</span>
              </div>
              <div className="px-3 py-1 rounded-lg text-xs font-bold" style={{ background: colors.color_primary, color: colors.color_btn_text }}>
                Contact Us
              </div>
            </div>
            {/* Mock hero */}
            <div className="px-4 py-6 text-center" style={{ background: colors.color_dark }}>
              <div className="text-base font-black mb-1" style={{ color: colors.color_text }}>Medical Coding Solutions</div>
              <div className="text-xs mb-3" style={{ color: colors.color_secondary }}>Your Trusted Partner</div>
              <div className="flex gap-2 justify-center">
                <div className="px-4 py-1.5 rounded-lg text-xs font-bold" style={{ background: `linear-gradient(to right, ${colors.color_primary}, ${colors.color_secondary})`, color: colors.color_btn_text }}>
                  Get Started
                </div>
                <div className="px-4 py-1.5 rounded-lg text-xs font-bold border" style={{ borderColor: colors.color_secondary, color: colors.color_secondary }}>
                  Learn More
                </div>
              </div>
            </div>
            {/* Mock cards */}
            <div className="px-4 py-4" style={{ background: colors.color_bg }}>
              <div className="grid grid-cols-3 gap-2">
                {['ICD-10','RCM','PLICS'].map(s => (
                  <div key={s} className="rounded-lg p-2 text-center border border-white/10" style={{ background: colors.color_dark }}>
                    <div className="text-xs font-bold" style={{ color: colors.color_accent }}>✓</div>
                    <div className="text-xs mt-0.5" style={{ color: colors.color_text }}>{s}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-3 text-center">
            * Colors apply on next page reload after saving
          </p>
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-6 bg-blue-50 border border-blue-100 rounded-2xl p-4 text-sm text-blue-700">
        <strong>How it works:</strong> Colors are stored in the database. After saving, the site reads them via CSS variables on every page load.
        To apply immediately, refresh the frontend page after saving.
      </div>
    </AdminShell>
  );
}
