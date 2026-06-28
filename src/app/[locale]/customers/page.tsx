import { Metadata } from 'next';
import MainLayout from '@/components/layout/MainLayout';
import { hasPostgresDatabaseUrl, prisma } from '@/lib/prisma';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  return { title: locale === 'ar' ? 'عملاؤنا' : 'Our Customers' };
}

export default async function CustomersPage({ params: { locale } }: { params: { locale: string } }) {
  const customers = hasPostgresDatabaseUrl()
    ? await prisma.customer.findMany({ orderBy: { order: 'asc' } }).catch(() => [])
    : [];
  const isAr = locale === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  return (
    <MainLayout>
      <section className="bg-gradient-to-br from-brand-blue to-brand-blue-mid py-24 text-white text-center">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{isAr ? 'عملاؤنا' : 'Our Customers'}</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            {isAr ? 'نفخر بثقة المنشآت الصحية الكبرى في المملكة العربية السعودية' : "We're proud to serve the Kingdom's leading healthcare facilities"}
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {customers.map((c) => (
              <div key={c.id} className="card text-center flex flex-col items-center justify-center min-h-[120px]">
                {c.logo ? (
                  <img src={c.logo} alt={c.name} className="h-12 object-contain mb-3" />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-brand-gradient flex items-center justify-center mb-3">
                    <span className="text-white text-xl font-bold">{c.name.charAt(0)}</span>
                  </div>
                )}
                <span className="text-sm font-semibold text-brand-dark text-center">{c.name}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 text-center bg-brand-gradient rounded-3xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">
              {isAr ? 'انضم إلى قائمة عملائنا الناجحين' : 'Join Our Success Story'}
            </h2>
            <p className="text-white/80 mb-6 max-w-lg mx-auto">
              {isAr ? 'تواصل معنا اليوم لمعرفة كيف يمكننا مساعدة منشأتك الصحية' : 'Contact us today to learn how we can help your healthcare facility'}
            </p>
            <Link href={`/${locale}/contact`} className="inline-flex items-center gap-2 bg-white text-brand-blue font-bold px-8 py-3 rounded-xl hover:bg-gray-100 transition-colors">
              {isAr ? 'تواصل معنا' : 'Contact Us'} <Arrow size={18} />
            </Link>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
