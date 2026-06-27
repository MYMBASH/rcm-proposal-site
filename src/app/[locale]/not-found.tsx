import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';

export default function NotFound() {
  return (
    <MainLayout>
      <div className="min-h-[60vh] flex items-center justify-center text-center">
        <div>
          <div className="text-8xl font-bold gradient-text mb-4">404</div>
          <h1 className="text-2xl font-bold text-brand-dark mb-3">الصفحة غير موجودة</h1>
          <p className="text-brand-gray mb-8">عذراً، لم نتمكن من إيجاد الصفحة التي تبحث عنها.</p>
          <Link href="/ar" className="btn-gradient">العودة للرئيسية</Link>
        </div>
      </div>
    </MainLayout>
  );
}
