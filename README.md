# Boostly Glow Forge - منصة ميديا ترند للتسويق الرقمي 🚀

## نظرة عامة على المشروع
- **الاسم**: Boostly Glow Forge
- **الهدف**: منصة متكاملة لإدارة الحملات التسويقية الرقمية وتحليل الأداء لشركة ميديا ترند
- **التقنيات**: Hono Framework + TypeScript + TailwindCSS + Cloudflare Pages

## الميزات الرئيسية ✨

### ✅ ميزات مكتملة
1. **الصفحة الرئيسية المتطورة**
   - عرض احترافي للخدمات
   - احصائيات الشركة المبهرة
   - قسم التحليلات المباشر
   - عرض آخر الحملات النشطة

2. **لوحة التحكم Dashboard**
   - إحصائيات في الوقت الفعلي
   - رسوم بيانية لأداء الحملات
   - توزيع الميزانية
   - آخر النشاطات

3. **API Endpoints**
   - `/api/campaigns` - إدارة الحملات
   - `/api/analytics` - بيانات التحليلات
   - `/api/services` - عرض الخدمات

4. **التصميم العصري**
   - تصميم Responsive متجاوب
   - دعم كامل للغة العربية RTL
   - أنيميشن وتأثيرات احترافية

## URLs والروابط 🌐

### Development URLs
- **الموقع الرئيسي**: https://3000-iflho9rl3j0i9uf37vcx3-6532622b.e2b.dev
- **لوحة التحكم**: https://3000-iflho9rl3j0i9uf37vcx3-6532622b.e2b.dev/dashboard

### API Endpoints
- `GET /api/campaigns` - جلب جميع الحملات
- `POST /api/campaigns` - إنشاء حملة جديدة
- `GET /api/analytics` - جلب بيانات التحليلات
- `GET /api/services` - جلب قائمة الخدمات

## هيكل البيانات 📊

### نموذج الحملة (Campaign)
```javascript
{
  id: number,
  name: string,
  status: 'active' | 'scheduled' | 'completed',
  budget: number,
  spent: number,
  impressions: number,
  clicks: number,
  conversions: number
}
```

### نموذج التحليلات (Analytics)
```javascript
{
  totalRevenue: number,
  totalSpend: number,
  roi: number,
  totalCampaigns: number,
  activeCampaigns: number,
  totalClients: number,
  performance: {
    labels: string[],
    revenue: number[],
    spend: number[]
  }
}
```

## دليل الاستخدام 📖

### للمستخدمين
1. **زيارة الموقع**: افتح الصفحة الرئيسية لعرض الخدمات والحملات
2. **لوحة التحكم**: اضغط على زر "لوحة التحكم" في الـ navigation
3. **عرض الحملات**: تصفح قسم الحملات لمتابعة الأداء
4. **التحليلات**: شاهد الرسوم البيانية والإحصائيات المباشرة

### للمطورين
```bash
# تشغيل المشروع محلياً
npm run build
pm2 start ecosystem.config.cjs

# التطوير
npm run dev:sandbox

# البناء للإنتاج
npm run build

# نشر على Cloudflare
npm run deploy
```

## الميزات القادمة 🔮
- [ ] ربط قاعدة بيانات D1 للحفظ الدائم
- [ ] نظام تسجيل دخول وصلاحيات
- [ ] إضافة نظام الفواتير والمدفوعات
- [ ] تكامل مع APIs السوشيال ميديا
- [ ] تقارير PDF قابلة للتنزيل
- [ ] نظام الإشعارات والتنبيهات
- [ ] Chat bot للدعم الفوري

## خطوات التطوير التالية 🎯
1. **إعداد D1 Database** - إنشاء قاعدة البيانات وجداول الحملات والعملاء
2. **نظام المصادقة** - إضافة تسجيل دخول آمن باستخدام JWT
3. **تكامل APIs** - ربط Facebook, Instagram, Google Ads APIs
4. **نظام التقارير** - إنشاء تقارير تفصيلية قابلة للتصدير
5. **Dashboard متقدم** - إضافة المزيد من الرسوم البيانية والفلاتر

## معلومات النشر 🚀
- **المنصة**: Cloudflare Pages
- **الحالة**: ✅ نشط (Development)
- **التقنيات**: Hono + TypeScript + TailwindCSS + Chart.js
- **آخر تحديث**: 28 سبتمبر 2025

## الفريق 👥
- **المطور**: إسماعيل
- **الشركة**: ميديا ترند للتسويق الرقمي

## الترخيص
© 2024 Boostly Glow Forge - ميديا ترند. جميع الحقوق محفوظة.