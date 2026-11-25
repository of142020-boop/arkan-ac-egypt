import type { APIRoute } from 'astro';
import { keywordClusters, siteSeoConfig } from '../data/seo-keywords';
import { brandsData } from '../data/brands-data';
import { areasData } from '../data/areas-data';
import { guidesData } from '../data/guides-data';

export const GET: APIRoute = () => {
  const base = siteSeoConfig.domain.replace(/\/$/, '');
  const now = new Date().toISOString().split('T')[0];

  const urls = [
    { loc: `${base}/`, priority: '1.0', changefreq: 'daily' },
    { loc: `${base}/services`, priority: '0.95', changefreq: 'weekly' },
    { loc: `${base}/brands`, priority: '0.95', changefreq: 'weekly' },
    { loc: `${base}/areas`, priority: '0.9', changefreq: 'weekly' },
    { loc: `${base}/guides`, priority: '0.9', changefreq: 'weekly' },
    { loc: `${base}/corporate-contracts`, priority: '0.95', changefreq: 'weekly' },
    { loc: `${base}/tools`, priority: '0.9', changefreq: 'weekly' },
    ...keywordClusters.map((c) => ({
      loc: `${base}/services/${c.slug}`,
      priority: '0.9',
      changefreq: 'weekly',
    })),
    ...brandsData.map((b) => ({
      loc: `${base}/brands/${b.slug}`,
      priority: '0.9',
      changefreq: 'weekly',
    })),
    ...areasData.map((a) => ({
      loc: `${base}/areas/${a.slug}`,
      priority: '0.85',
      changefreq: 'weekly',
    })),
    ...guidesData.map((g) => ({
      loc: `${base}/guides/${g.slug}`,
      priority: '0.85',
      changefreq: 'monthly',
    })),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
