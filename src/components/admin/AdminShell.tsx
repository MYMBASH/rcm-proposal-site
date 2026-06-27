'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard, Briefcase, Lightbulb, Users, Handshake,
  MessageSquare, Image, LogOut, Menu, X, ChevronRight,
  Settings, LayoutPanelTop, Star, Newspaper, Share2, UserPlus, Palette
} from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/services', label: 'Services', icon: Briefcase },
  { href: '/admin/solutions', label: 'Solutions', icon: Lightbulb },
  { href: '/admin/customers', label: 'Customers', icon: Users },
  { href: '/admin/partners', label: 'Partners', icon: Handshake },
  { href: '/admin/testimonials', label: 'Testimonials', icon: Star },
  { href: '/admin/news', label: 'News', icon: Newspaper },
  { href: '/admin/jobs', label: 'Jobs', icon: UserPlus },
  { href: '/admin/social-links', label: 'Social Links', icon: Share2 },
  { href: '/admin/banners', label: 'Banners', icon: LayoutPanelTop },
  { href: '/admin/contacts', label: 'Messages', icon: MessageSquare },
  { href: '/admin/media', label: 'Media', icon: Image },
  { href: '/admin/appearance', label: 'Appearance', icon: Palette },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    setLoggingOut(true);
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  }

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <aside className={cn(
        'flex flex-col bg-brand-dark transition-all duration-300 shrink-0',
        sidebarOpen ? 'w-60' : 'w-16'
      )}>
        <div className="flex items-center gap-3 h-16 px-4 border-b border-white/10">
          <div className="w-8 h-8 rounded-lg bg-brand-gradient flex items-center justify-center shrink-0">
            <span className="text-white font-bold text-sm">D</span>
          </div>
          {sidebarOpen && <span className="text-white font-bold text-sm">DigiMind Admin</span>}
        </div>

        <nav className="flex-1 py-4 overflow-y-auto">
          {NAV.map(({ href, label, icon: Icon, exact }) => {
            const active = exact ? pathname === href : pathname.startsWith(href) && href !== '/admin';
            return (
              <Link key={href} href={href}
                className={cn(
                  'flex items-center gap-3 mx-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-all',
                  active ? 'bg-brand-blue text-white' : 'text-gray-400 hover:bg-white/10 hover:text-white'
                )}
                title={!sidebarOpen ? label : undefined}>
                <Icon size={18} className="shrink-0" />
                {sidebarOpen && <span>{label}</span>}
                {sidebarOpen && active && <ChevronRight size={14} className="ms-auto" />}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-white/10">
          <button onClick={handleLogout} disabled={loggingOut}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:bg-red-500/20 hover:text-red-400 transition-all">
            <LogOut size={18} />
            {sidebarOpen && 'Logout'}
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
          <button onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 text-gray-500">
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div className="flex items-center gap-3">
            <a href="/ar" target="_blank"
              className="text-xs text-brand-gray hover:text-brand-blue border border-gray-200 rounded-lg px-3 py-1.5 transition-colors">
              Preview Site
            </a>
            <div className="w-8 h-8 rounded-full bg-brand-gradient flex items-center justify-center">
              <span className="text-white text-xs font-bold">A</span>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
