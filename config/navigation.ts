// Navigation structure and section IDs
export const sections = [
    { id: 'hero', key: 'nav.hero' },
    { id: 'mechanism', key: 'nav.mechanism' },
    { id: 'evidence', key: 'nav.evidence' },
    { id: 'product', key: 'nav.product' },
    { id: 'faq', key: 'nav.faq' },
    { id: 'contact', key: 'nav.contact' },
] as const;

export type SectionId = typeof sections[number]['id'];
