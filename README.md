# DigiMind Website

موقع شركة DigiMind لحلول الترميز الطبي والتحول الرقمي للمنشآت الصحية في المملكة العربية السعودية.

**Tech Stack:** Next.js 14 (App Router) · TypeScript · Tailwind CSS · Prisma ORM · SQLite · next-intl

---

## 🚀 التشغيل المحلي (Local Development)

### المتطلبات
- Node.js 18+
- npm 9+

### الخطوات

```bash
# 1. تثبيت الحزم
npm install

# 2. إنشاء قاعدة البيانات وتطبيق الـ schema
npx prisma migrate dev --name init

# 3. تعبئة البيانات الأولية (خدمات، حلول، عملاء، مستخدم admin...)
npm run db:seed

# 4. تشغيل خادم التطوير
npm run dev
```

الموقع يعمل الآن على: **http://localhost:3000**

- الموقع بالعربي: http://localhost:3000/ar
- الموقع بالإنجليزي: http://localhost:3000/en
- لوحة التحكم: http://localhost:3000/admin
- بيانات دخول لوحة التحكم:
  - البريد: `admin@digimind.sa`
  - كلمة المرور: `Admin@DigiMind2025!`

> **مهم:** غيّر كلمة المرور فور أول تسجيل دخول في بيئة الإنتاج.

---

## ⚙️ ملف البيئة (.env)

انسخ `.env.example` إلى `.env` وعدّل القيم:

```env
# قاعدة البيانات (SQLite محلياً)
DATABASE_URL="file:./dev.db"

# بيانات مسؤول النظام
ADMIN_EMAIL="admin@digimind.sa"
ADMIN_PASSWORD="Admin@DigiMind2025!"

# مفتاح الجلسة (32 حرف عشوائياً على الأقل)
SESSION_SECRET="replace-with-long-random-string-min-32-chars-here"

# رابط الموقع
NEXT_PUBLIC_SITE_URL="https://digimind.sa"
```

لتوليد `SESSION_SECRET` آمن:
```bash
openssl rand -base64 32
```

---

## 🗄️ إدارة قاعدة البيانات

```bash
# مشاهدة قاعدة البيانات عبر واجهة مرئية
npm run db:studio

# إعادة ضبط قاعدة البيانات من الصفر
npm run db:reset

# تطبيق migration جديد
npx prisma migrate dev --name اسم_التغيير
```

### التبديل إلى PostgreSQL (وقت النشر)

في ملف `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

ثم في `.env`:
```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DATABASE_NAME"
```

ثم نفّذ:
```bash
npx prisma migrate deploy
npm run db:seed
```

---

## 🏗️ بناء نسخة الإنتاج (Production Build)

```bash
# بناء المشروع
npm run build

# تشغيل نسخة الإنتاج محلياً للاختبار
npm start
```

---

## 🌐 النشر على Vercel (يُنفّذه المستخدم)

1. ادفع المشروع إلى GitHub/GitLab
2. افتح [vercel.com](https://vercel.com) وسجّل الدخول
3. أنشئ مشروعاً جديداً واختر الـ repository
4. في قسم "Environment Variables" أضف:
   - `DATABASE_URL` ← رابط قاعدة PostgreSQL (مثل Neon أو Supabase)
   - `SESSION_SECRET` ← مفتاح عشوائي
   - `NEXT_PUBLIC_SITE_URL` ← رابط الدومين
5. انقر Deploy
6. بعد النشر نفّذ في Vercel CLI:
   ```bash
   vercel env pull .env.production
   npx prisma migrate deploy
   npm run db:seed
   ```

---

## 🖥️ النشر على VPS (يُنفّذه المستخدم)

```bash
# على الخادم
git clone <repo-url> /var/www/digimind
cd /var/www/digimind
npm install --production
npx prisma migrate deploy
npm run db:seed
npm run build

# تشغيل مستمر عبر PM2
npm install -g pm2
pm2 start npm --name "digimind" -- start
pm2 save
pm2 startup
```

ثم اضبط Nginx كـ reverse proxy:
```nginx
server {
  listen 80;
  server_name digimind.sa www.digimind.sa;
  location / {
    proxy_pass http://localhost:3000;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
  }
}
```

---

## 📁 هيكل المشروع

```
DigiMind-Website-Final/
├── prisma/
│   ├── schema.prisma        # كل كيانات قاعدة البيانات
│   └── seed.ts              # البيانات الأولية
├── messages/
│   ├── ar.json              # ترجمات عربية
│   └── en.json              # ترجمات إنجليزية
├── src/
│   ├── app/
│   │   ├── [locale]/        # صفحات الموقع (AR + EN)
│   │   │   ├── page.tsx     # الرئيسية
│   │   │   ├── about/       # من نحن
│   │   │   ├── services/    # الخدمات + [slug]
│   │   │   ├── solutions/   # الحلول + [slug]
│   │   │   ├── customers/   # العملاء
│   │   │   ├── partners/    # الشركاء
│   │   │   └── contact/     # تواصل معنا
│   │   ├── admin/           # لوحة التحكم (محمية)
│   │   │   ├── login/       # صفحة الدخول
│   │   │   ├── services/    # إدارة الخدمات
│   │   │   ├── solutions/   # إدارة الحلول
│   │   │   ├── customers/   # إدارة العملاء
│   │   │   ├── partners/    # إدارة الشركاء
│   │   │   ├── contacts/    # رسائل التواصل
│   │   │   └── media/       # مكتبة الوسائط
│   │   └── api/             # API Routes
│   ├── components/
│   │   ├── layout/          # Header, Footer, MainLayout
│   │   ├── home/            # أقسام الصفحة الرئيسية
│   │   ├── admin/           # AdminShell, CrudTable
│   │   └── shared/          # ContactForm
│   └── lib/
│       ├── prisma.ts        # Prisma client
│       ├── auth.ts          # Session auth
│       └── utils.ts         # Utilities
├── BRAND.md                 # دليل الهوية البصرية
├── .env.example             # نموذج ملف البيئة
└── tailwind.config.ts       # ألوان العلامة التجارية
```

---

## 🔒 الأمان

- المصادقة: iron-session (HTTP-only cookies) + bcrypt (hashing)
- لا توجد مكتبة مصادقة خارجية (JWT/NextAuth)
- الـ admin routes محمية بالـ session في كل API call
- الصور تُحوَّل تلقائياً إلى WebP وتُحفظ في `/public/uploads`

---

## 🌍 دعم اللغتين

| المسار | اللغة |
|--------|-------|
| `/ar/...` | العربية (RTL) - افتراضي |
| `/en/...` | الإنجليزية (LTR) |

- `sitemap.xml` يُولَّد تلقائياً بـ hreflang للغتين
- `robots.txt` يمنع الزحف على `/admin` و `/api`
