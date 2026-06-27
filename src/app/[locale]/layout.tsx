import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n';
import '../globals.css';
import { hasPostgresDatabaseUrl, prisma } from '@/lib/prisma';
import HtmlDirSync from '@/components/layout/HtmlDirSync';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'hero' });
  return {
    title: {
      default: 'DigiMind | ديجيمايند',
      template: '%s | DigiMind',
    },
    description: t('subtitle'),
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://digimind.sa'),
    alternates: {
      languages: {
        ar: '/ar',
        en: '/en',
      },
    },
    openGraph: {
      type: 'website',
      locale: locale === 'ar' ? 'ar_SA' : 'en_US',
      siteName: 'DigiMind',
    },
    themeColor: '#1B3FAB',
    icons: { icon: '/favicon.ico' },
  };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!locales.includes(locale as (typeof locales)[number])) notFound();
  const messages = await getMessages();
  const isRtl = locale === 'ar';

  // Load color settings for CSS variables
  let cssVars = '';
  if (hasPostgresDatabaseUrl()) try {
    const settings = await prisma.siteSetting.findMany({
      where: { key: { startsWith: 'color_' } },
    });
    if (settings.length > 0) {
      const varMap: Record<string, string> = {
        color_primary: '--color-primary',
        color_secondary: '--color-secondary',
        color_accent: '--color-accent',
        color_dark: '--color-dark',
        color_bg: '--color-bg',
        color_text: '--color-text',
        color_nav_bg: '--color-nav-bg',
        color_nav_text: '--color-nav-text',
        color_btn_text: '--color-btn-text',
      };
      const vars = settings
        .filter(s => varMap[s.key])
        .map(s => `${varMap[s.key]}: ${s.value};`)
        .join(' ');
      if (vars) cssVars = `:root { ${vars} }`;
    }
  } catch {}

  return (
    <html lang={locale} dir={isRtl ? 'rtl' : 'ltr'} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Tajawal:wght@300;400;500;700;800&display=swap"
          rel="stylesheet"
        />
        {cssVars && <style dangerouslySetInnerHTML={{ __html: cssVars }} />}
      </head>
      <body className={isRtl ? 'font-arabic' : 'font-sans'}>
        <NextIntlClientProvider messages={messages}>
          <HtmlDirSync />
          <div className="site-root" dir={isRtl ? 'rtl' : 'ltr'}>
            {children}
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
