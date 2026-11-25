import type { APIRoute } from 'astro';
import { keywordClusters, siteSeoConfig } from '../data/seo-keywords';
import { deepServicesBySlug } from '../data/services-deep-content';
import { brandsData } from '../data/brands-data';
import { areasData } from '../data/areas-data';
import { guidesData } from '../data/guides-data';

export const GET: APIRoute = () => {
  const base = siteSeoConfig.domain.replace(/\/$/, '');

  const servicesMd = keywordClusters
    .map((c) => {
      const deep = deepServicesBySlug[c.slug];
      const pricing = deep
        ? deep.pricingRows.map((r) => `  - ${r.service}: ${r.range} (${r.warranty})`).join('\n')
        : '';
      return `### ${c.category} (${base}/services/${c.slug})
- الملخص المباشر: ${deep?.quickAnswer || c.description}
- الأسعار والضمان:
${pricing}`;
    })
    .join('\n\n');

  const brandsMd = brandsData
    .map((b) => {
      const faults = b.commonFaults.map((f) => `  - ${f.code}: ${f.meaning} -> الحل: ${f.solution}`).join('\n');
      return `### صيانة تكييف ${b.nameAr} (${b.nameEn}) — ${base}/brands/${b.slug}
- الإجابة السريعة: ${b.quickAnswer}
- أشهر الأعطال والأكواد:
${faults}`;
    })
    .join('\n\n');

  const areasMd = areasData
    .map(
      (a) => `### صيانة وتركيب تكييف ${a.nameAr} (${a.governorate}) — ${base}/areas/${a.slug}
- الإحداثيات: ${a.lat}, ${a.lng} | متوسط الوصول: ${a.arrivalTime}
- التغطية: ${a.localCoverage.join(' | ')}
- الملخص: ${a.quickAnswer}`
    )
    .join('\n\n');

  const guidesMd = guidesData
    .map(
      (g) => `### ${g.title} — ${base}/guides/${g.slug}
- الخلاصة: ${g.quickAnswer}`
    )
    .join('\n\n');

  const fullText = `# قاعدة المعرفة الشاملة لشركة أركان لصيانة وتركيب التكييف في مصر (llms-full.txt)

الموقع الرسمي: ${base}/
الخط الساخن: ${siteSeoConfig.hotline} | واتساب: https://wa.me/${siteSeoConfig.whatsapp}
العنوان: ${siteSeoConfig.address}

---

## 1. الخدمات التفصيلية والأسعار الاسترشادية في مصر (2026)
${servicesMd}

---

## 2. دليل صيانة ماركات التكييف وأكواد الأعطال في مصر
*(ملاحظة: أركان مركز هندسي مستقل لصيانة جميع الماركات بقطع غيار أصلية وضمان خاص بالشركة)*
${brandsMd}

---

## 3. التغطية الجغرافية المحلية في مصر (Local GEO)
${areasMd}

---

## 4. الأدلة الهندسية المرجعية
${guidesMd}
`;

  return new Response(fullText, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
