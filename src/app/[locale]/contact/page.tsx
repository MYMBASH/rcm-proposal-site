import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import MainLayout from '@/components/layout/MainLayout';
import ContactForm from '@/components/shared/ContactForm';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'contact' });
  return { title: t('title') };
}

export default async function ContactPage({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'contact' });
  const isAr = locale === 'ar';

  const info = [
    { icon: Phone, label: isAr ? 'الهاتف' : 'Phone', value: '+966 11 000 0000', href: 'tel:+966110000000' },
    { icon: Mail, label: isAr ? 'البريد الإلكتروني' : 'Email', value: 'info@digimind.sa', href: 'mailto:info@digimind.sa' },
    { icon: MapPin, label: t('address'), value: isAr ? 'الرياض، المملكة العربية السعودية' : 'Riyadh, Saudi Arabia', href: null },
    { icon: Clock, label: t('working_hours'), value: t('working_hours_val'), href: null },
  ];

  return (
    <MainLayout>
      <section className="bg-gradient-to-br from-brand-blue to-brand-teal py-24 text-white">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('title')}</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">{t('subtitle')}</p>
        </div>
      </section>

      <section className="py-20 bg-brand-light">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <div className="bg-white rounded-3xl p-8 shadow-card">
              <h2 className="text-2xl font-bold text-brand-dark mb-6">
                {isAr ? 'أرسل لنا رسالة' : 'Send Us a Message'}
              </h2>
              <ContactForm locale={locale} />
            </div>

            {/* Info */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-brand-dark mb-6">{t('info_title')}</h2>
                <div className="space-y-4">
                  {info.map(({ icon: Icon, label, value, href }) => (
                    <div key={label} className="flex items-start gap-4 bg-white rounded-2xl p-5 shadow-sm">
                      <div className="w-10 h-10 rounded-xl bg-brand-gradient flex items-center justify-center shrink-0">
                        <Icon size={18} className="text-white" />
                      </div>
                      <div>
                        <div className="text-xs text-brand-gray font-semibold uppercase tracking-wide">{label}</div>
                        {href ? (
                          <a href={href} className="text-brand-dark font-medium hover:text-brand-blue transition-colors mt-0.5 block">{value}</a>
                        ) : (
                          <div className="text-brand-dark font-medium mt-0.5">{value}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Map placeholder */}
              <div className="bg-brand-gradient rounded-2xl p-1">
                <div className="bg-white rounded-2xl p-8 text-center">
                  <MapPin size={40} className="text-brand-blue mx-auto mb-3" />
                  <p className="text-brand-dark font-semibold">{isAr ? 'الرياض، المملكة العربية السعودية' : 'Riyadh, Saudi Arabia'}</p>
                  <a
                    href="https://maps.google.com/?q=Riyadh,Saudi+Arabia"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-blue text-sm hover:underline mt-2 inline-block"
                  >
                    {isAr ? 'افتح في خرائط جوجل' : 'Open in Google Maps'}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
