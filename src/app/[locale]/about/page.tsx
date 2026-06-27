import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import MainLayout from '@/components/layout/MainLayout';
import { Target, Eye, Shield, Award, Users } from 'lucide-react';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'about' });
  return { title: t('title'), description: t('description') };
}

export default async function AboutPage({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'about' });
  const isAr = locale === 'ar';

  const values = [
    { icon: Shield, titleAr: 'النزاهة', titleEn: 'Integrity', descAr: 'نلتزم بأعلى معايير الشفافية والأمانة في كل تعاملاتنا', descEn: 'We uphold the highest standards of transparency and honesty in all our dealings' },
    { icon: Award, titleAr: 'التميز', titleEn: 'Excellence', descAr: 'نسعى دائماً لتقديم أعلى جودة في كل خدمة نقدمها', descEn: 'We constantly strive to deliver the highest quality in every service we provide' },
    { icon: Users, titleAr: 'الشراكة', titleEn: 'Partnership', descAr: 'نبني علاقات شراكة حقيقية قائمة على الثقة المتبادلة', descEn: 'We build genuine partnerships grounded in mutual trust' },
    { icon: Target, titleAr: 'الابتكار', titleEn: 'Innovation', descAr: 'نواكب أحدث التطورات التقنية لنقدم حلولاً مبتكرة', descEn: 'We keep pace with the latest technological developments to deliver innovative solutions' },
  ];

  return (
    <MainLayout>
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-blue to-brand-teal py-24 text-white">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('title')}</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">{t('subtitle')}</p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className={isAr ? 'order-2' : 'order-1'}>
              <h2 className="text-3xl font-bold text-brand-dark mb-6">{isAr ? 'قصتنا' : 'Our Story'}</h2>
              <p className="text-brand-gray leading-relaxed mb-6">{t('description')}</p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { val: '2015', labelAr: 'سنة التأسيس', labelEn: 'Founded' },
                  { val: '50+', labelAr: 'منشأة صحية', labelEn: 'Healthcare Facilities' },
                  { val: '98%', labelAr: 'دقة الترميز', labelEn: 'Coding Accuracy' },
                  { val: '10+', labelAr: 'سنوات خبرة', labelEn: 'Years Experience' },
                ].map(({ val, labelAr, labelEn }) => (
                  <div key={val} className="bg-brand-light rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold gradient-text">{val}</div>
                    <div className="text-sm text-brand-gray mt-1">{isAr ? labelAr : labelEn}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className={`${isAr ? 'order-1' : 'order-2'} bg-brand-gradient rounded-3xl p-1`}>
              <div className="bg-white rounded-3xl p-8 space-y-6">
                {[
                  { icon: Target, titleKey: 'mission_title' as const, textKey: 'mission' as const },
                  { icon: Eye, titleKey: 'vision_title' as const, textKey: 'vision' as const },
                ].map(({ icon: Icon, titleKey, textKey }) => (
                  <div key={titleKey} className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-gradient flex items-center justify-center shrink-0">
                      <Icon size={18} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-brand-dark mb-1">{t(titleKey)}</h3>
                      <p className="text-brand-gray text-sm leading-relaxed">{t(textKey)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-brand-light">
        <div className="container-custom">
          <h2 className="section-title text-center mb-12">{t('values_title')}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon: Icon, titleAr, titleEn, descAr, descEn }) => (
              <div key={titleAr} className="card text-center">
                <div className="w-14 h-14 rounded-2xl bg-brand-gradient flex items-center justify-center mx-auto mb-4">
                  <Icon size={24} className="text-white" />
                </div>
                <h3 className="font-bold text-brand-dark mb-2">{isAr ? titleAr : titleEn}</h3>
                <p className="text-brand-gray text-sm leading-relaxed">{isAr ? descAr : descEn}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
