import reportData from './arkan-keywords-report.json';

export interface KeywordItem {
  keyword: string;
  volume: number;
  competition: string;
  intent: string;
  bidLow: number | null;
  bidHigh: number | null;
}

export interface KeywordCluster {
  slug: string;
  id: string;
  category: string;
  title: string;
  description: string;
  keywordCount: number;
  monthlySearchVolume: number;
  primaryKeyword: string;
  topKeywords: KeywordItem[];
  targetSection: string;
}

const clusterMeta: Record<
  string,
  { slug: string; id: string; title: string; description: string; targetSection: string }
> = {
  'صيانة ماركات التكييف في مصر': {
    slug: 'ac-brands-maintenance',
    id: 'ac-brands',
    title: 'صيانة جميع ماركات التكييف في مصر (كاريير، شارب، إل جي، ميديا، يونيون إير)',
    description:
      'مركز أركان لصيانة تكييف شارب وكاريير وإل جي وميديا ويونيون إير وفريش وجري وتورنيدو في مصر بقطع غيار أصلية وفنيين معتمدين وضمان رسمي مكتوب.',
    targetSection: '#services',
  },
  'صيانة وإصلاح التكييف العام': {
    slug: 'ac-maintenance-egypt',
    id: 'ac-maintenance',
    title: 'شركة صيانة تكييفات وفني تكييف معتمد في مصر 24/7',
    description:
      'أقوى شركة صيانة وتصليح تكييفات في مصر، نوفر فني تكييف محترف يصلك خلال ساعتين لصيانة التكييف المنزلي والسبليت والإنفرتر بأفضل سعر وضمان.',
    targetSection: '#services',
  },
  'التكييف المركزي والكونسيلد وVRF': {
    slug: 'central-concealed-ac',
    id: 'central-concealed',
    title: 'توريد وتركيب وصيانة التكييف المركزي والكونسيلد وVRF في مصر',
    description:
      'حلول هندسية متكاملة لتأسيس وتركيب وصيانة التكييف الكونسيلد المخفي والتكييف المركزي وأنظمة VRF والتشيلر للفلل والشركات والمصانع في مصر.',
    targetSection: '#projects',
  },
  'أعطال التكييف والأكواد وقطع الغيار': {
    slug: 'ac-faults-codes',
    id: 'ac-faults',
    title: 'إصلاح جميع أعطال التكييف وأكواد الخطأ وتغيير قطع الغيار الأصلية',
    description:
      'تشخيص وإصلاح أعطال التكييف الشارب وكاريير وميديا ويونيون إير (ضعف التبريد، تسريب المياه، أكواد E1/F1، تغيير الكباس والكباستور والبوردة الإلكترونية).',
    targetSection: '#services',
  },
  'تنظيف وغسيل التكييف': {
    slug: 'ac-cleaning-washing',
    id: 'ac-cleaning',
    title: 'تنظيف وغسيل التكييف بالمنزل بدون فك بأحدث مضخات التعقيم',
    description:
      'خدمة غسيل وتنظيف التكييفات السبليت والمركزي والكونسيلد باستخدام الكيس الواقي ومواد التعقيم الآمنة لاستعادة قوة التبريد وتوفير الكهرباء.',
    targetSection: '#services',
  },
  'التركيب والتأسيس والفك والنقل': {
    slug: 'ac-installation-piping',
    id: 'ac-installation',
    title: 'تركيب وفك ونقل وتأسيس مواسير التكييف النحاس في مصر',
    description:
      'أعلى معايير الدقة في تركيب التكييفات الجديدة وفك ونقل التكييف وتأسيس مواسير النحاس وصرف التكييف المدفون قبل التشطيب والمحارة.',
    targetSection: '#projects',
  },
  'شحن الفريون وكشف التسريب': {
    slug: 'ac-freon-charging',
    id: 'ac-freon',
    title: 'شحن فريون التكييف الأصلي R410a وR22 وكشف تسريب الفريون بالنيتروجين',
    description:
      'شحن فريون تكييف أمريكي وهندي أصلي بالوزن القياسي مع فحص وكشف أماكن تسريب الفريون بدقة وضمان على الشحنة في جميع مناطق مصر.',
    targetSection: '#services',
  },
  'المناطق والمحافظات في مصر': {
    slug: 'egypt-service-areas',
    id: 'egypt-areas',
    title: 'فني صيانة وتركيب تكييف في القاهرة والجيزة والإسكندرية وجميع المناطق',
    description:
      'تغطية فورية لخدمات صيانة وتركيب التكييف في مدينة نصر، التجمع الخامس، القاهرة الجديدة، الشيخ زايد، 6 أكتوبر، المعادي، مصر الجديدة، المهندسين والإسكندرية.',
    targetSection: '#contact',
  },
};

export const keywordStats = reportData.totals;

export const keywordClusters: KeywordCluster[] = reportData.serviceClusters
  .filter((c) => clusterMeta[c.group])
  .map((c) => {
    const meta = clusterMeta[c.group];
    return {
      slug: meta.slug,
      id: meta.id,
      category: c.group,
      title: meta.title,
      description: meta.description,
      keywordCount: c.count,
      monthlySearchVolume: c.totalVolume,
      primaryKeyword: c.topKeywords[0]?.keyword || c.group,
      topKeywords: c.topKeywords,
      targetSection: meta.targetSection,
    };
  });

export const topEgyptServiceKeywords: KeywordItem[] = reportData.topServiceKeywords;

export const siteSeoConfig = {
  brandName: 'أركان',
  brandFullName: 'أركان لصيانة وتركيب التكييف في مصر',
  brandTagline: 'ARKAN HVAC & AIR CONDITIONING EGYPT',
  domain: 'https://arkan-ac.eg',
  phone: '01098765432',
  hotline: '19876',
  whatsapp: '201098765432',
  email: 'info@arkan-ac.eg',
  address: 'التجمع الخامس، القاهرة الجديدة، محافظة القاهرة، مصر',
  defaultTitle:
    'أركان لصيانة وتركيب التكييف في مصر | فني تكييف معتمد، شحن فريون، تكييف كونسيلد ومركزي',
  defaultDescription:
    'شركة أركان الأولى لصيانة التكييفات وتركيب وتأسيس التكييف في مصر (سبليت، كونسيلد، مركزي VRF). فني تكييف خلال ساعتين لصيانة شارب وكاريير وإل جي وميديا ويونيون إير، غسيل وتنظيف التكييف وشحن فريون أصلي بضمان معتمد.',
  primaryKeywords: reportData.topServiceKeywords.slice(0, 40).map((k) => k.keyword),
  supportedBrands: [
    'صيانة تكييف شارب (Sharp)',
    'صيانة تكييف كاريير (Carrier)',
    'صيانة تكييف إل جي (LG)',
    'صيانة تكييف ميديا (Midea)',
    'صيانة تكييف يونيون إير (Unionaire)',
    'صيانة تكييف فريش (Fresh)',
    'صيانة تكييف تورنيدو (Tornado)',
    'صيانة تكييف جري (Gree)',
    'صيانة تكييف هاير (Haier)',
    'صيانة تكييف دايكن (Daikin)',
  ],
  serviceAreas: [
    'صيانة تكييف مدينة نصر ومصر الجديدة',
    'صيانة تكييف التجمع الخامس والقاهرة الجديدة',
    'صيانة تكييف الشيخ زايد و 6 أكتوبر',
    'صيانة تكييف المعادي والمقطم',
    'صيانة تكييف المهندسين والدقي والزمالك',
    'صيانة تكييف الشروق ومدينتي والرحاب',
    'تكييف مركزي العاصمة الإدارية الجديدة',
    'صيانة تكييف الإسكندرية والساحل الشمالي',
  ],
};
