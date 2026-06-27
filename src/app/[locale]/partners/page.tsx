import { Metadata } from 'next';
import MainLayout from '@/components/layout/MainLayout';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Handshake } from 'lucide-react';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  return { title: locale === 'ar' ? 'شركاؤنا' : 'Our Partners' };
}

export default async function PartnersPage({ params: { locale } }: { params: { locale: string } }) {
  const partners = await prisma.partner.findMany({ orderBy: { order: 'asc' } });
  const isAr = locale === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  return (
    <MainLayout>
      <section className="bg-gradient-to-br from-brand-emerald to-brand-blue py-24 text-white text-center">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{isAr ? 'شركاؤنا الاستراتيجيون' : 'Our Strategic Partners'}</h1>
          <p className="text-xl text-green-100 max-w-2xl mx-auto">
            {isAr ? 'شراكات استراتيجية مع الجهات الحكومية والمهنية الرائدة في المملكة' : 'Strategic partnerships with leading government and professional bodies in the Kingdom'}
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {partners.map((p) => {
              const desc = isAr ? p.descriptionAr : p.descriptionEn;
              return (
                <div key={p.id} className="card text-center">
                  {p.logo ? (
                    <img src={p.logo} alt={p.name} className="h-16 object-contain mx-auto mb-4" />
                  ) : (
                    <div className="w-20 h-20 rounded-2xl bg-brand-gradient flex items-center justify-center mx-auto mb-4">
                      <Handshake size={32} className="text-white" />
                    </div>
                  )}
                  <h3 className="font-bold text-brand-dark mb-2">{p.name}</h3>
                  {desc && <p className="text-brand-gray text-sm">{desc}</p>}
                </div>
              );
            })}
          </div>

          <div className="bg-brand-light rounded-3xl p-12 text-center">
            <h2 className="text-2xl font-bold text-brand-dark mb-3">
              {isAr ? 'هل تريد أن تكون شريكنا؟' : 'Interested in Partnering with Us?'}
            </h2>
            <p className="text-brand-gray mb-6">
              {isAr ? 'نرحب بالشراكات الاستراتيجية التي تخدم قطاع الرعاية الصحية' : 'We welcome strategic partnerships that serve the healthcare sector'}
            </p>
            <Link href={`/${locale}/contact`} className="btn-gradient inline-flex items-center gap-2">
              {isAr ? 'تواصل للشراكة' : 'Get in Touch'} <Arrow size={18} />
            </Link>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
