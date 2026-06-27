'use client';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { Phone, Mail, MapPin, Linkedin, Twitter, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  const t = useTranslations('footer');
  const tn = useTranslations('nav');
  const locale = useLocale();
  const year = new Date().getFullYear();

  const links = [
    { key: 'home', href: '/' },
    { key: 'about', href: '/about' },
    { key: 'services', href: '/services' },
    { key: 'solutions', href: '/solutions' },
    { key: 'customers', href: '/customers' },
    { key: 'partners', href: '/partners' },
    { key: 'contact', href: '/contact' },
  ];

  return (
    <footer className="bg-brand-dark text-white">
      {/* CTA Banner */}
      <div className="bg-brand-gradient">
        <div className="container-custom py-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            {locale === 'ar' ? 'هل أنت مستعد لتحويل منشأتك الصحية رقمياً؟' : 'Ready to digitally transform your healthcare facility?'}
          </h2>
          <p className="text-white/80 mb-6 text-lg">
            {locale === 'ar' ? 'تواصل مع فريق الخبراء لدينا اليوم' : 'Connect with our expert team today'}
          </p>
          <Link href={`/${locale}/contact`} className="inline-flex items-center gap-2 bg-white text-brand-blue font-bold px-8 py-3 rounded-xl hover:bg-gray-100 transition-colors">
            {locale === 'ar' ? 'ابدأ الآن' : 'Get Started'}
            <ArrowUpRight size={18} />
          </Link>
        </div>
      </div>

      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="mb-4" dir="ltr">
              <svg viewBox="0 0 420 100" xmlns="http://www.w3.org/2000/svg" className="w-44 h-11">
                <defs>
                  <linearGradient id="footerGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#2563EB"/>
                    <stop offset="50%" stopColor="#0EA5E9"/>
                    <stop offset="100%" stopColor="#34D399"/>
                  </linearGradient>
                </defs>
                <rect x="10" y="15" width="14" height="70" rx="7" fill="white"/>
                <path d="M24 20 Q90 20 90 50 Q90 80 24 80" stroke="url(#footerGrad)" strokeWidth="14" fill="none" strokeLinecap="round"/>
                <text x="105" y="62" fontFamily="Inter, sans-serif" fontWeight="700" fontSize="36" fill="white">DigiMind</text>
              </svg>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">{t('description')}</p>
            <div className="flex gap-3 mt-6">
              <a href="https://linkedin.com/company/digimind-sa" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/10 hover:bg-brand-blue transition-colors flex items-center justify-center">
                <Linkedin size={18} />
              </a>
              <a href="https://twitter.com/digimind_sa" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/10 hover:bg-brand-blue transition-colors flex items-center justify-center">
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-white mb-5">{t('quick_links')}</h3>
            <ul className="space-y-3">
              {links.map(({ key, href }) => (
                <li key={key}>
                  <Link href={`/${locale}${href}`} className="text-gray-400 hover:text-brand-mint text-sm transition-colors">
                    {tn(key as any)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-white mb-5">{t('contact_us')}</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone size={16} className="text-brand-mint mt-0.5 shrink-0" />
                <a href="tel:+966110000000" className="text-gray-400 hover:text-white text-sm transition-colors">
                  +966 11 000 0000
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={16} className="text-brand-mint mt-0.5 shrink-0" />
                <a href="mailto:info@digimind.sa" className="text-gray-400 hover:text-white text-sm transition-colors">
                  info@digimind.sa
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-brand-mint mt-0.5 shrink-0" />
                <span className="text-gray-400 text-sm">
                  {locale === 'ar' ? 'الرياض، المملكة العربية السعودية' : 'Riyadh, Saudi Arabia'}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © {year} DigiMind. {t('rights')}.
          </p>
          <div className="flex gap-4">
            <Link href={`/${locale}/privacy`} className="text-gray-400 hover:text-white text-sm transition-colors">{t('privacy')}</Link>
            <Link href={`/${locale}/terms`} className="text-gray-400 hover:text-white text-sm transition-colors">{t('terms')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
