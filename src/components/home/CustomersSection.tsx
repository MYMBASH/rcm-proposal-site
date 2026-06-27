import { prisma } from '@/lib/prisma';

export default async function CustomersSection({ locale }: { locale: string }) {
  const customers = await prisma.customer.findMany({ orderBy: { order: 'asc' } });
  const isAr = locale === 'ar';

  return (
    <section className="py-20 bg-brand-dark overflow-hidden">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-3">
            {isAr ? 'عملاؤنا يثقون بنا' : 'Trusted by Leading Facilities'}
          </h2>
          <p className="text-gray-400">
            {isAr
              ? 'نفخر بثقة المنشآت الصحية الكبرى في المملكة العربية السعودية'
              : 'We are proud to serve the Kingdom\'s leading healthcare facilities'}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {customers.map((c) => (
            <div
              key={c.id}
              className="bg-white/10 hover:bg-white/20 border border-white/10 rounded-2xl p-6 flex items-center justify-center transition-all duration-300 hover:scale-105"
            >
              {c.logo ? (
                <img src={c.logo} alt={c.name} className="h-10 object-contain filter brightness-0 invert" />
              ) : (
                <span className="text-white text-sm font-bold text-center leading-tight">{c.name}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
