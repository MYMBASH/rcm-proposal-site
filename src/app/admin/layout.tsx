import '../globals.css';

export const dynamic = 'force-dynamic';

export const metadata = { title: { default: 'DigiMind Admin', template: '%s | Admin' } };
export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-arabic bg-slate-50">{children}</body>
    </html>
  );
}
