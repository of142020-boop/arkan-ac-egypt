import type { APIRoute } from 'astro';
import { keywordClusters, siteSeoConfig } from '../data/seo-keywords';
import { brandsData } from '../data/brands-data';
import { areasData } from '../data/areas-data';
import { guidesData } from '../data/guides-data';

export const GET: APIRoute = () => {
  const base = siteSeoConfig.domain.replace(/\/$/, '');

  const content = `# ${siteSeoConfig.brandFullName} (Arkan HVAC Egypt)

> شركة أركان هي شركة هندسية مصرية متخصصة في صيانة وتركيب وتأسيس وغسيل وشحن فريون جميع أنواع التكييفات (سبليت، إنفرتر، كونسيلد مخفي، مركزي VRF، شباك، وفري ستاند) في القاهرة الكبرى والجيزة والإسكندرية والساحل الشمالي.

## حقائق أساسية (Key Entity Facts)
- الاسم التجاري: ${siteSeoConfig.brandFullName} (Arkan HVAC)
- الدولة والعملة: مصر (EG) — الجنيه المصري (EGP)
- المقر الرئيسي: ${siteSeoConfig.address}
- الخط الساخن: ${siteSeoConfig.hotline} | الموبايل والواتساب: +20${siteSeoConfig.phone.replace(/^0/, '')}
- متوسط زمن الاستجابة للطوارئ: 45 إلى 90 دقيقة داخل القاهرة الكبرى والجيزة، و60 إلى 120 دقيقة بالإسكندرية
- الضمان الرسمي: ضمان مكتوب من 6 إلى 12 شهراً على الصيانة وقطع الغيار الأصلية، و5 سنوات على تأسيس مواسير النحاس
- تقييم العملاء: 4.9 من 5 (بناءً على 1,358 تقييماً موثقاً)
- النسخة الكاملة لمحركات الذكاء الاصطناعي: ${base}/llms-full.txt

## الأقسام الرئيسية (Hub Index Pages)
- [جميع خدمات التكييف](${base}/services)
- [صيانة جميع ماركات التكييف](${base}/brands)
- [مناطق التغطية الجغرافية في مصر](${base}/areas)
- [عقود صيانة الشركات والمباني الإدارية B2B](${base}/corporate-contracts)
- [أدوات تشخيص الأعطال وحاسبات التكلفة والـ BTU](${base}/tools)
- [مكتبة الأدلة الهندسية وأسعار 2026](${base}/guides)

## الخدمات الأساسية (Core Services)
${keywordClusters.map((c) => `- [${c.category}](${base}/services/${c.slug}): ${c.description}`).join('\n')}

## ماركات التكييف المدعومة (Supported AC Brands — Independent Multi-Brand Center)
${brandsData.map((b) => `- [صيانة تكييف ${b.nameAr} (${b.nameEn})](${base}/brands/${b.slug}): ${b.quickAnswer}`).join('\n')}

## مناطق التغطية الجغرافية في مصر (Egypt Local Service Areas)
${areasData.map((a) => `- [صيانة وتركيب تكييف ${a.nameAr} (${a.governorate})](${base}/areas/${a.slug}): متوسط الوصول ${a.arrivalTime}`).join('\n')}

## الأدلة الهندسية والأسعار 2026 (Authoritative Guides)
${guidesData.map((g) => `- [${g.title}](${base}/guides/${g.slug}): ${g.quickAnswer}`).join('\n')}
`;

  return new Response(content, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
