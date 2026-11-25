export interface EditorialSection {
  id: string;
  h2: string;
  paragraphs: string[];
  h3Blocks?: {
    h3: string;
    paragraphs: string[];
    bullets?: string[];
  }[];
  bullets?: string[];
  callout?: {
    type: 'tip' | 'warning' | 'fact';
    title: string;
    text: string;
  };
  table?: {
    caption: string;
    headers: string[];
    rows: string[][];
  };
}

export interface LongformSeoEnhancement {
  slug: string;
  seoTitle: string;
  metaDescription: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  semanticEntities: string[];
  readTime: string;
  sections: EditorialSection[];
  extraFaqs: { question: string; answer: string }[];
}
