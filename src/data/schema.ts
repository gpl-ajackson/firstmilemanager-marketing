export interface FaqItem {
  question: string;
  answer: string;
}

/** FAQPage structured data for a page's questions; Faq.astro shows the same items. */
export const faqSchema = (items: FaqItem[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer },
  })),
});
