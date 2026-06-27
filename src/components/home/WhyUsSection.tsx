'use client';

interface Feature {
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
  icon: string;
  color: string;
}

const FEATURES: Feature[] = [
  { titleAr: 'دقة عالية', titleEn: 'High Accuracy', descAr: 'دقة ترميز تصل إلى 98% مع فريق خبراء معتمدين دولياً', descEn: 'Coding accuracy up to 98% with internationally certified expert team', icon: '🎯', color: '#0EA5E9' },
  { titleAr: 'امتثال كامل', titleEn: 'Full Compliance', descAr: 'التزام تام بمعايير ICD-10 والمعايير الدولية للترميز الطبي', descEn: 'Full compliance with ICD-10 and international medical coding standards', icon: '✅', color: '#34D399' },
  { titleAr: 'تقارير فورية', titleEn: 'Real-Time Reports', descAr: 'لوحة تحكم تحليلية مع تقارير فورية ومؤشرات الأداء الرئيسية', descEn: 'Analytical dashboard with real-time reports and KPIs', icon: '📊', color: '#818cf8' },
  { titleAr: 'فريق معتمد', titleEn: 'Certified Team', descAr: 'فريق من الخبراء الحاصلين على شهادات AHIMA وAAPCوCBHI', descEn: 'Team of experts certified by AHIMA, AAPC and CBHI', icon: '🏆', color: '#f59e0b' },
  { titleAr: 'دعم 24/7', titleEn: '24/7 Support', descAr: 'دعم فني مستمر على مدار الساعة طوال أيام الأسبوع', descEn: 'Continuous 24/7 technical support throughout the week', icon: '🌐', color: '#ec4899' },
  { titleAr: 'تكامل سلس', titleEn: 'Seamless Integration', descAr: 'تكامل سلس مع أنظمة المستشفيات والمنشآت الصحية الحالية', descEn: 'Seamless integration with existing hospital and healthcare facility systems', icon: '🔗', color: '#f97316' },
];

export default function WhyUsSection({ locale }: { locale: string }) {
  const isAr = locale === 'ar';
  return (
    <section className="relative py-24 bg-[#060d1b] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#050d1a] via-[#060d1b] to-[#060d1b]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#1B3FAB]/5 rounded-full blur-[150px]" />
      <div className="relative z-10 container-custom">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 border border-white/10 bg-white/5 rounded-full px-4 py-2 text-sm text-slate-400 mb-4">
            {isAr ? 'لماذا ديجيمايند؟' : 'Why DigiMind?'}
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
            {isAr ? 'الفرق الذي يصنعه' : 'The Difference We'}{' '}
            <span className="bg-gradient-to-r from-[#0EA5E9] to-[#34D399] bg-clip-text text-transparent">
              {isAr ? 'ديجيمايند' : 'Make'}
            </span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            {isAr
              ? 'نحن نؤمن أن التميز في الرعاية الصحية يبدأ بالدقة في البيانات والترميز'
              : 'We believe that excellence in healthcare starts with accuracy in data and coding'}
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f) => (
            <div key={f.titleEn}
              className="group relative rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              style={{ '--accent': f.color } as React.CSSProperties}>
              <div className="absolute inset-x-0 bottom-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `linear-gradient(to right, transparent, ${f.color}, transparent)` }} />
              <div className="text-3xl mb-4">{f.icon}</div>
              <h3 className="text-lg font-bold text-white mb-2">
                {isAr ? f.titleAr : f.titleEn}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {isAr ? f.descAr : f.descEn}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
