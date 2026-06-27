import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding DigiMind database...');

  // ── Admin User ──────────────────────────────────────────
  const passwordHash = await bcrypt.hash('Admin@DigiMind2025!', 12);
  await prisma.adminUser.upsert({
    where: { email: 'admin@digimind.sa' },
    update: {},
    create: { email: 'admin@digimind.sa', passwordHash, name: 'DigiMind Admin' },
  });

  // ── Site Settings ───────────────────────────────────────
  const settings = [
    { key: 'phone', value: '+966 11 000 0000' },
    { key: 'email', value: 'info@digimind.sa' },
    { key: 'address_ar', value: 'الرياض، المملكة العربية السعودية' },
    { key: 'address_en', value: 'Riyadh, Saudi Arabia' },
    { key: 'linkedin', value: 'https://linkedin.com/company/digimind-sa' },
    { key: 'twitter', value: 'https://twitter.com/digimind_sa' },
    { key: 'whatsapp', value: '+966500000000' },
  ];
  for (const s of settings) {
    await prisma.siteSetting.upsert({ where: { key: s.key }, update: { value: s.value }, create: s });
  }

  // ── Services ────────────────────────────────────────────
  await prisma.service.deleteMany();
  const services = [
    {
      slug: 'medical-coding',
      titleAr: 'الترميز الطبي ICD-10',
      titleEn: 'ICD-10 Medical Coding',
      descriptionAr: 'خدمات الترميز الطبي الدقيق وفق معايير ICD-10 لضمان أعلى مستوى من الجودة والامتثال في المطالبات الطبية، وتقليل نسبة الرفض وزيادة الإيرادات.',
      descriptionEn: 'Accurate ICD-10 medical coding services ensuring the highest quality and compliance in medical claims, reducing rejection rates and maximizing revenue.',
      icon: 'FileText', order: 1, status: 'published',
    },
    {
      slug: 'rcm',
      titleAr: 'إدارة دورة الإيرادات (RCM)',
      titleEn: 'Revenue Cycle Management (RCM)',
      descriptionAr: 'حلول متكاملة لإدارة دورة الإيرادات من التسجيل حتى التحصيل، لضمان تدفق مالي مستقر وتقليل المطالبات المرفوضة.',
      descriptionEn: 'End-to-end revenue cycle management solutions from registration to collection, ensuring stable cash flow and minimizing claim denials.',
      icon: 'TrendingUp', order: 2, status: 'published',
    },
    {
      slug: 'plics',
      titleAr: 'نظام PLICS للتكاليف',
      titleEn: 'PLICS Costing System',
      descriptionAr: 'تطبيق نظام حساب تكاليف المريض (PLICS) وفق متطلبات وزارة الصحة السعودية لتحقيق الشفافية المالية وترشيد الموارد.',
      descriptionEn: 'Implementing Patient-Level Information Costing System (PLICS) per Saudi MOH requirements for financial transparency and resource optimization.',
      icon: 'BarChart3', order: 3, status: 'published',
    },
    {
      slug: 'health-informatics',
      titleAr: 'نظم المعلومات الصحية',
      titleEn: 'Health Information Systems',
      descriptionAr: 'تصميم وتطبيق نظم المعلومات الصحية الشاملة لربط الأقسام الطبية والإدارية بكفاءة عالية ضمن بيئة رقمية متكاملة.',
      descriptionEn: 'Designing and implementing comprehensive health information systems to efficiently connect medical and administrative departments in an integrated digital environment.',
      icon: 'Database', order: 4, status: 'published',
    },
    {
      slug: 'digital-transformation',
      titleAr: 'التحول الرقمي الصحي',
      titleEn: 'Healthcare Digital Transformation',
      descriptionAr: 'قيادة رحلة التحول الرقمي للمنشآت الصحية السعودية، من التخطيط الاستراتيجي حتى التنفيذ والتدريب وضمان الجودة.',
      descriptionEn: 'Leading the digital transformation journey for Saudi healthcare facilities, from strategic planning to implementation, training, and quality assurance.',
      icon: 'Zap', order: 5, status: 'published',
    },
    {
      slug: 'training',
      titleAr: 'التدريب والتطوير المهني',
      titleEn: 'Training & Professional Development',
      descriptionAr: 'برامج تدريبية متخصصة في الترميز الطبي وإدارة المعلومات الصحية، معتمدة ومصممة لرفع كفاءة الكوادر الطبية والإدارية.',
      descriptionEn: 'Specialized training programs in medical coding and health information management, certified and designed to enhance medical and administrative staff capabilities.',
      icon: 'GraduationCap', order: 6, status: 'published',
    },
  ];
  for (const s of services) {
    await prisma.service.create({ data: s });
  }

  // ── Solutions ───────────────────────────────────────────
  await prisma.solution.deleteMany();
  const solutions = [
    {
      slug: 'coding-audit',
      titleAr: 'مراجعة وتدقيق الترميز',
      titleEn: 'Coding Audit & Review',
      descriptionAr: 'خدمة مراجعة وتدقيق شاملة لملفات الترميز الطبي، تكشف الأخطاء وتوصي بالتصحيحات لضمان الامتثال واسترداد الإيرادات.',
      descriptionEn: 'Comprehensive coding audit and review service that identifies errors and recommends corrections to ensure compliance and revenue recovery.',
      icon: 'Search', order: 1, status: 'published',
    },
    {
      slug: 'drg-optimization',
      titleAr: 'تحسين تصنيف DRG',
      titleEn: 'DRG Classification Optimization',
      descriptionAr: 'تحليل وتحسين تصنيفات المجموعات التشخيصية المرتبطة (DRG) لضمان التعويض العادل والدقيق من شركات التأمين والجهات الحكومية.',
      descriptionEn: 'Analysis and optimization of Diagnosis-Related Group (DRG) classifications to ensure accurate and fair reimbursement from insurers and government entities.',
      icon: 'Target', order: 2, status: 'published',
    },
    {
      slug: 'compliance',
      titleAr: 'الامتثال والجودة',
      titleEn: 'Compliance & Quality',
      descriptionAr: 'ضمان امتثال المنشأة الصحية لمتطلبات الترميز الطبي وفق معايير اعتماد CBAHI والهيئة السعودية للتخصصات الصحية.',
      descriptionEn: 'Ensuring healthcare facility compliance with medical coding requirements per CBAHI and Saudi Commission for Health Specialties accreditation standards.',
      icon: 'ShieldCheck', order: 3, status: 'published',
    },
    {
      slug: 'analytics',
      titleAr: 'تحليلات البيانات الصحية',
      titleEn: 'Healthcare Data Analytics',
      descriptionAr: 'لوحات بيانات تفاعلية وتقارير تحليلية متقدمة تحوّل بيانات الترميز إلى رؤى استراتيجية تدعم القرارات الإدارية والطبية.',
      descriptionEn: 'Interactive dashboards and advanced analytical reports that transform coding data into strategic insights supporting administrative and clinical decisions.',
      icon: 'PieChart', order: 4, status: 'published',
    },
  ];
  for (const s of solutions) {
    await prisma.solution.create({ data: s });
  }

  // ── Customers ───────────────────────────────────────────
  await prisma.customer.deleteMany();
  const customers = [
    { name: 'مستشفى الملك فهد', order: 1 },
    { name: 'مستشفى الأمل', order: 2 },
    { name: 'مجموعة المستشفيات السعودية', order: 3 },
    { name: 'مستشفى الحياة الوطني', order: 4 },
    { name: 'مركز الأورام التخصصي', order: 5 },
    { name: 'مستشفى العليا', order: 6 },
    { name: 'مستشفى الوطني', order: 7 },
    { name: 'مركز الرعاية الأولية', order: 8 },
  ];
  for (const c of customers) {
    await prisma.customer.create({ data: c });
  }

  // ── Partners ────────────────────────────────────────────
  await prisma.partner.deleteMany();
  const partners = [
    { name: 'وزارة الصحة السعودية', descriptionAr: 'شريك حكومي رسمي', descriptionEn: 'Official government partner', order: 1 },
    { name: 'الهيئة السعودية للتخصصات الصحية', descriptionAr: 'جهة اعتماد', descriptionEn: 'Accreditation body', order: 2 },
    { name: 'CBAHI', descriptionAr: 'معهد اعتماد المستشفيات', descriptionEn: 'Hospital accreditation body', order: 3 },
    { name: 'AHIMA', descriptionAr: 'الجمعية الأمريكية لإدارة المعلومات الصحية', descriptionEn: 'American Health Information Management Association', order: 4 },
  ];
  for (const p of partners) {
    await prisma.partner.create({ data: p });
  }

  // ── Banners ─────────────────────────────────────────────
  await prisma.banner.deleteMany();
  await prisma.banner.create({
    data: {
      titleAr: 'الشريك الموثوق في الرعاية الصحية الرقمية',
      titleEn: 'Your Trusted Digital Healthcare Partner',
      subtitleAr: 'حلول ترميز طبي دقيقة ومعتمدة دولياً',
      subtitleEn: 'Accurate and internationally certified medical coding solutions',
      linkUrl: '/contact',
      order: 1,
      active: true,
    },
  });

  // ── Testimonials ────────────────────────────────────────
  await prisma.testimonial.deleteMany();
  const testimonials = [
    {
      nameAr: 'د. أحمد الشمري',
      nameEn: 'Dr. Ahmed Al-Shamri',
      roleAr: 'مدير المعلومات الصحية',
      roleEn: 'Health Information Director',
      companyAr: 'مستشفى الملك فهد',
      companyEn: 'King Fahd Hospital',
      contentAr: 'ديجيمايند غيّرت طريقة عملنا بالكامل. دقة الترميز ارتفعت إلى 98% وانخفض معدل رفض المطالبات بشكل ملحوظ خلال أول ثلاثة أشهر.',
      contentEn: 'DigiMind completely transformed our operations. Coding accuracy rose to 98% and claim rejection rates dropped significantly within the first three months.',
      rating: 5, order: 1, status: 'published',
    },
    {
      nameAr: 'أ. سارة القحطاني',
      nameEn: 'Sara Al-Qahtani',
      roleAr: 'مسؤولة التحصيل والفوترة',
      roleEn: 'Billing & Collection Manager',
      companyAr: 'مجموعة المستشفيات السعودية',
      companyEn: 'Saudi Hospitals Group',
      contentAr: 'الفريق محترف جداً وملتزم بالمواعيد. ساعدونا في تطبيق نظام PLICS بنجاح وحصلنا على اعتماد وزارة الصحة في وقت قياسي.',
      contentEn: 'Highly professional team, committed to deadlines. They helped us successfully implement the PLICS system and we received MOH accreditation in record time.',
      rating: 5, order: 2, status: 'published',
    },
    {
      nameAr: 'م. خالد العتيبي',
      nameEn: 'Khalid Al-Otaibi',
      roleAr: 'المدير المالي',
      roleEn: 'Chief Financial Officer',
      companyAr: 'مستشفى الحياة الوطني',
      companyEn: 'Al-Hayat National Hospital',
      contentAr: 'استثمار ممتاز. عملنا مع ديجيمايند على RCM وفي أقل من 6 أشهر تحسّن تدفق الإيرادات بنسبة 35%. أنصح بهم بشدة.',
      contentEn: 'Excellent investment. We worked with DigiMind on RCM and in less than 6 months, revenue flow improved by 35%. Highly recommended.',
      rating: 5, order: 3, status: 'published',
    },
    {
      nameAr: 'د. منى الدوسري',
      nameEn: 'Dr. Mona Al-Dosari',
      roleAr: 'رئيسة قسم جودة البيانات',
      roleEn: 'Head of Data Quality',
      companyAr: 'مركز الأورام التخصصي',
      companyEn: 'Oncology Specialty Center',
      contentAr: 'التدريب الذي قدمه فريق ديجيمايند لفريقنا كان استثنائياً. الآن لدينا معايدين معتمدين داخلياً وهذا وفّر علينا تكاليف كبيرة.',
      contentEn: 'The training DigiMind provided to our team was exceptional. We now have in-house certified coders, which has saved us significant costs.',
      rating: 5, order: 4, status: 'published',
    },
  ];
  for (const t of testimonials) {
    await prisma.testimonial.create({ data: t });
  }

  // ── News Posts ──────────────────────────────────────────
  await prisma.newsPost.deleteMany();
  const newsPosts = [
    {
      slug: 'digimind-cbahi-partnership-2025',
      titleAr: 'ديجيمايند تحصل على اعتماد CBAHI لخدمات الترميز الطبي',
      titleEn: 'DigiMind Receives CBAHI Accreditation for Medical Coding Services',
      summaryAr: 'أعلنت شركة ديجيمايند عن حصولها على الاعتماد الرسمي من المركز السعودي لاعتماد المنشآت الصحية (CBAHI) لخدمات الترميز الطبي وإدارة المعلومات الصحية.',
      summaryEn: 'DigiMind announced receiving official accreditation from the Saudi Center for Healthcare Accreditation (CBAHI) for medical coding and health information management services.',
      contentAr: 'يُعدّ هذا الاعتماد تأكيداً على التزام ديجيمايند بأعلى معايير الجودة في قطاع الرعاية الصحية السعودي. يشمل الاعتماد خدمات الترميز الطبي ICD-10، إدارة دورة الإيرادات، ونظام PLICS.',
      contentEn: 'This accreditation confirms DigiMind commitment to the highest quality standards in the Saudi healthcare sector. The accreditation covers ICD-10 medical coding, revenue cycle management, and the PLICS system.',
      category: 'announcement',
      status: 'published',
      publishedAt: '2025-03-15T10:00:00Z',
    },
    {
      slug: 'healthcare-digital-transformation-forum-2025',
      titleAr: 'ديجيمايند تشارك في منتدى التحول الرقمي الصحي 2025',
      titleEn: 'DigiMind Participates in Healthcare Digital Transformation Forum 2025',
      summaryAr: 'شاركت ديجيمايند كمتحدث رئيسي في منتدى التحول الرقمي الصحي المنعقد في الرياض، وعرضت أحدث حلولها في مجال الذكاء الاصطناعي والترميز الطبي.',
      summaryEn: 'DigiMind participated as a keynote speaker at the Healthcare Digital Transformation Forum held in Riyadh, showcasing its latest AI and medical coding solutions.',
      contentAr: 'قدّم المدير التنفيذي لديجيمايند عرضاً تفصيلياً حول مستقبل الترميز الطبي في ظل تقنيات الذكاء الاصطناعي، وأثر التحول الرقمي على دقة المطالبات والإيرادات.',
      contentEn: 'DigiMind CEO delivered a detailed presentation on the future of medical coding with AI technologies and the impact of digital transformation on claims accuracy and revenue.',
      category: 'events',
      status: 'published',
      publishedAt: '2025-02-20T09:00:00Z',
    },
    {
      slug: 'plics-success-story-2025',
      titleAr: 'قصة نجاح: تطبيق PLICS في مستشفى الحياة الوطني',
      titleEn: 'Success Story: PLICS Implementation at Al-Hayat National Hospital',
      summaryAr: 'نجحت ديجيمايند في تطبيق نظام PLICS في مستشفى الحياة الوطني خلال 90 يوماً فقط، محققةً توفيراً في التكاليف يتجاوز 20%.',
      summaryEn: 'DigiMind successfully implemented the PLICS system at Al-Hayat National Hospital in just 90 days, achieving cost savings exceeding 20%.',
      contentAr: 'يُعدّ مشروع PLICS في مستشفى الحياة الوطني من أبرز مشاريع ديجيمايند. تم تطبيق النظام بالكامل خلال 90 يوماً مع تدريب 45 موظفاً وتحقيق نسبة دقة 99.2% في حسابات التكاليف.',
      contentEn: 'The PLICS project at Al-Hayat National Hospital is one of DigiMind most notable projects. The system was fully implemented in 90 days, with 45 staff trained and 99.2% accuracy achieved in cost calculations.',
      category: 'news',
      status: 'published',
      publishedAt: '2025-01-10T08:00:00Z',
    },
    {
      slug: 'new-icd-11-training-program',
      titleAr: 'إطلاق برنامج التدريب على ICD-11 للمرحلة الانتقالية',
      titleEn: 'Launch of ICD-11 Transition Training Program',
      summaryAr: 'أطلقت ديجيمايند برنامجاً تدريبياً متخصصاً للاستعداد للانتقال من ICD-10 إلى ICD-11، معتمداً من الهيئة السعودية للتخصصات الصحية.',
      summaryEn: 'DigiMind launched a specialized training program to prepare for the transition from ICD-10 to ICD-11, accredited by the Saudi Commission for Health Specialties.',
      contentAr: 'يشمل البرنامج التدريبي 40 ساعة تدريبية موزعة على أسبوعين، ويتناول أبرز التغييرات في ICD-11 وكيفية التعامل معها على أرض الواقع.',
      contentEn: 'The training program includes 40 hours distributed over two weeks, covering the major changes in ICD-11 and how to apply them in practice.',
      category: 'announcement',
      status: 'published',
      publishedAt: '2024-12-05T11:00:00Z',
    },
  ];
  for (const n of newsPosts) {
    await prisma.newsPost.create({ data: n });
  }

  // ── Social Links ────────────────────────────────────────
  await prisma.socialLink.deleteMany();
  const socialLinks = [
    { platform: 'linkedin', url: 'https://linkedin.com/company/digimind-sa', order: 1, active: true },
    { platform: 'twitter', url: 'https://twitter.com/digimind_sa', order: 2, active: true },
    { platform: 'instagram', url: 'https://instagram.com/digimind.sa', order: 3, active: true },
    { platform: 'whatsapp', url: 'https://wa.me/966500000000', order: 4, active: true },
    { platform: 'youtube', url: 'https://youtube.com/@digimind_sa', order: 5, active: true },
  ];
  for (const s of socialLinks) {
    await prisma.socialLink.create({ data: s });
  }

  // ── Job Postings ────────────────────────────────────────
  await prisma.jobPosting.deleteMany();
  const jobs = [
    {
      titleAr: 'مرمّز طبي معتمد ICD-10',
      titleEn: 'Certified ICD-10 Medical Coder',
      descriptionAr: 'نبحث عن مرمّز طبي معتمد من AHIMA أو AAPC لديه خبرة لا تقل عن سنتين في الترميز الطبي ICD-10 في البيئة السعودية.',
      descriptionEn: 'We are looking for an AHIMA or AAPC certified medical coder with at least 2 years of ICD-10 experience in the Saudi healthcare environment.',
      locationAr: 'الرياض، المملكة العربية السعودية',
      locationEn: 'Riyadh, Saudi Arabia',
      type: 'full-time', status: 'open',
    },
    {
      titleAr: 'محلل بيانات الرعاية الصحية',
      titleEn: 'Healthcare Data Analyst',
      descriptionAr: 'مطلوب محلل بيانات متخصص في قطاع الرعاية الصحية لتحليل بيانات الترميز وإعداد التقارير الاستراتيجية لعملائنا.',
      descriptionEn: 'A data analyst specialized in the healthcare sector is required to analyze coding data and prepare strategic reports for our clients.',
      locationAr: 'الرياض، المملكة العربية السعودية',
      locationEn: 'Riyadh, Saudi Arabia',
      type: 'full-time', status: 'open',
    },
    {
      titleAr: 'مستشار RCM أول',
      titleEn: 'Senior RCM Consultant',
      descriptionAr: 'نبحث عن مستشار أول في إدارة دورة الإيرادات لديه خبرة 5+ سنوات في قطاع الرعاية الصحية السعودية وإلمام تام بمتطلبات شركات التأمين.',
      descriptionEn: 'We are looking for a Senior Revenue Cycle Management Consultant with 5+ years of experience in Saudi healthcare and full knowledge of insurance company requirements.',
      locationAr: 'الرياض، المملكة العربية السعودية',
      locationEn: 'Riyadh, Saudi Arabia',
      type: 'full-time', status: 'open',
    },
  ];
  for (const j of jobs) {
    await prisma.jobPosting.create({ data: j });
  }

  // ── Menu Items ──────────────────────────────────────────
  await prisma.menuItem.deleteMany();
  const navItems = [
    { labelAr: 'الرئيسية', labelEn: 'Home', url: '/', order: 1 },
    { labelAr: 'من نحن', labelEn: 'About', url: '/about', order: 2 },
    { labelAr: 'الخدمات', labelEn: 'Services', url: '/services', order: 3 },
    { labelAr: 'الحلول', labelEn: 'Solutions', url: '/solutions', order: 4 },
    { labelAr: 'عملاؤنا', labelEn: 'Customers', url: '/customers', order: 5 },
    { labelAr: 'شركاؤنا', labelEn: 'Partners', url: '/partners', order: 6 },
    { labelAr: 'الأخبار', labelEn: 'News', url: '/news', order: 7 },
    { labelAr: 'وظائف', labelEn: 'Careers', url: '/careers', order: 8 },
    { labelAr: 'تواصل معنا', labelEn: 'Contact', url: '/contact', order: 9 },
  ];
  for (const item of navItems) {
    await prisma.menuItem.create({ data: item });
  }

  console.log('Database seeded successfully!');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
