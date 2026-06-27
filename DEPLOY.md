# دليل النشر على Vercel — DigiMind Website

## الخطوة 1: إنشاء قاعدة البيانات (Neon.tech - مجاني)

1. اذهب إلى [neon.tech](https://neon.tech) وأنشئ حساباً مجانياً
2. أنشئ مشروعاً جديداً باسم `digimind`
3. انسخ الـ **Connection String** (تبدأ بـ `postgresql://`)
4. احتفظ بها للخطوة 3

---

## الخطوة 2: رفع المشروع على Vercel

1. اذهب إلى [vercel.com](https://vercel.com) وسجّل دخول
2. اضغط **Add New → Project**
3. اختر **Upload** وارفع ملف `DigiMind_website.zip`
4. اضغط **Deploy** (سيفشل أول مرة لأن ENV vars ناقصة — هذا طبيعي)

---

## الخطوة 3: إضافة Environment Variables على Vercel

في Vercel → مشروعك → **Settings → Environment Variables** أضف:

| Key | Value |
|-----|-------|
| `DATABASE_URL` | الـ Connection String من Neon (الخطوة 1) |
| `SESSION_SECRET` | أي نص عشوائي طويل (32 حرف على الأقل) |
| `NEXT_PUBLIC_SITE_URL` | رابط موقعك على Vercel مثل `https://digimind.vercel.app` |

---

## الخطوة 4: إضافة Vercel Blob (لرفع الصور والملفات)

1. في Vercel → مشروعك → **Storage → Create Database → Blob**
2. اربطه بمشروعك
3. Vercel سيضيف `BLOB_READ_WRITE_TOKEN` تلقائياً

---

## الخطوة 5: إعادة النشر

في Vercel → **Deployments → Redeploy** (بعد إضافة كل ENV vars)

---

## الخطوة 6: إضافة البيانات الأولية (Seed)

بعد نجاح النشر، شغّل هذه الأوامر على جهازك المحلي:

```bash
# في مجلد المشروع
export DATABASE_URL="postgresql://..."   # نفس الـ Connection String
npx prisma db push                       # إنشاء الجداول
npm run db:seed                          # إضافة البيانات
```

---

## بيانات لوحة التحكم

- **الرابط:** `https://your-site.vercel.app/admin`
- **البريد:** `admin@digimind.sa`
- **كلمة المرور:** `Admin@DigiMind2025!`

> ⚠️ غيّر كلمة المرور فور الدخول من خلال لوحة التحكم → Settings

---

## استكشاف الأخطاء

**خطأ: `prisma generate` failed**
→ تأكد من إضافة `DATABASE_URL` في Vercel ENV vars

**خطأ: `BLOB_READ_WRITE_TOKEN` not found**  
→ تأكد من ربط Vercel Blob بمشروعك (الخطوة 4)

**الصفحات تظهر فارغة**  
→ نسيت تشغيل `db:seed` (الخطوة 6)
