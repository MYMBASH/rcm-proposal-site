import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import AdminShell from '@/components/admin/AdminShell';
import { Briefcase, Lightbulb, Users, Handshake, MessageSquare, Image } from 'lucide-react';

export default async function AdminDashboard() {
  const session = await getSession();
  if (!session.isAdmin) redirect('/admin/login');

  const [services, solutions, customers, partners, contacts, media] = await Promise.all([
    prisma.service.count(),
    prisma.solution.count(),
    prisma.customer.count(),
    prisma.partner.count(),
    prisma.contactSubmission.count({ where: { status: 'new' } }),
    prisma.mediaAsset.count(),
  ]);

  const recentContacts = await prisma.contactSubmission.findMany({ orderBy: { createdAt: 'desc' }, take: 5 });

  const stats = [
    { label: 'الخدمات', value: services, icon: Briefcase, color: 'bg-brand-blue' },
    { label: 'الحلول', value: solutions, icon: Lightbulb, color: 'bg-brand-teal' },
    { label: 'العملاء', value: customers, icon: Users, color: 'bg-brand-emerald' },
    { label: 'الشركاء', value: partners, icon: Handshake, color: 'bg-brand-blue-mid' },
    { label: 'رسائل جديدة', value: contacts, icon: MessageSquare, color: 'bg-red-500' },
    { label: 'الوسائط', value: media, icon: Image, color: 'bg-purple-500' },
  ];

  return (
    <AdminShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-brand-dark">لوحة التحكم</h1>
          <p className="text-brand-gray text-sm mt-1">مرحباً بك في لوحة إدارة موقع DigiMind</p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {stats.map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="bg-white rounded-2xl p-4 shadow-card">
              <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center mb-3`}>
                <Icon size={18} className="text-white" />
              </div>
              <div className="text-2xl font-bold text-brand-dark">{value}</div>
              <div className="text-xs text-brand-gray mt-0.5">{label}</div>
            </div>
          ))}
        </div>

        {/* Recent contacts */}
        <div className="bg-white rounded-2xl shadow-card p-6">
          <h2 className="font-bold text-brand-dark mb-4">آخر الرسائل</h2>
          {recentContacts.length === 0 ? (
            <p className="text-brand-gray text-sm">لا توجد رسائل</p>
          ) : (
            <div className="space-y-3">
              {recentContacts.map((c) => (
                <div key={c.id} className="flex items-start gap-4 p-3 rounded-xl bg-slate-50">
                  <div className="w-8 h-8 rounded-full bg-brand-gradient flex items-center justify-center shrink-0">
                    <span className="text-white text-xs font-bold">{c.name.charAt(0)}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-brand-dark">{c.name}</span>
                      {c.status === 'new' && (
                        <span className="text-xs bg-red-100 text-red-600 rounded-full px-2 py-0.5 font-medium">جديد</span>
                      )}
                    </div>
                    <p className="text-xs text-brand-gray truncate">{c.email}</p>
                    <p className="text-sm text-brand-dark mt-1 line-clamp-1">{c.message}</p>
                  </div>
                  <span className="text-xs text-brand-gray shrink-0">
                    {new Date(c.createdAt).toLocaleDateString('ar-SA')}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminShell>
  );
}
