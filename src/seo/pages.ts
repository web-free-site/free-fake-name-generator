import { SITE } from '../site'
import { HOME_ARTICLE_SECTIONS, HOME_FAQ } from './homeArticle'
import homeStatic from './homeStaticSeo.json'

export interface SeoPage {
  path: string
  locale: 'en' | 'fr'
  title: string
  description: string
  h1: string
  keywords: string
  paragraphs: string[]
  articleSections?: { heading: string; paragraphs: string[]; steps?: string[] }[]
  faq: { q: string; a: string }[]
  focus?: 'home' | 'random-name' | 'full-identity'
}

export const SEO_PAGES: SeoPage[] = [
  {
    path: '/',
    locale: 'en',
    title: 'Free Fake Name Generator — random test names & emails (no sign-up)',
    description:
      'Free fake name generator for QA: random names, emails, phones, addresses, and jobs by country. Export CSV or JSON. Runs in your browser—nothing uploaded.',
    h1: homeStatic.h1,
    keywords: 'fake name generator, random name generator, fake identity, test data',
    focus: 'home',
    paragraphs: [homeStatic.lead],
    articleSections: HOME_ARTICLE_SECTIONS,
    faq: HOME_FAQ,
  },
  {
    path: '/random-name-generator',
    locale: 'en',
    title: 'Random Name Generator — fake first and last names by country',
    description:
      'Free random name generator with gender and country filters. Copy or bulk-export fake names for app testing.',
    h1: 'Random name generator (fake names for testing)',
    keywords: 'random name generator, fake names, name generator by country',
    focus: 'random-name',
    paragraphs: [
      'This random name generator page focuses on personal names. Select a country to match naming conventions, set gender if your test case needs it, and refresh until you have the profile you need.',
      'Copy the full name block or download CSV/JSON with names plus username and email fields for signup form tests.',
      'All generation happens in your browser; nothing is logged on our servers.',
    ],
    faq: [
      {
        q: 'Are these real people?',
        a: 'No. Names are algorithmically generated and may occasionally match real individuals by chance.',
      },
      { q: 'How do I bulk-generate names?', a: 'Set bulk count and click Download CSV or JSON.' },
    ],
  },
  {
    path: '/fake-identity-generator',
    locale: 'en',
    title: 'Fake Identity Generator — full test profiles (no ID cards)',
    description:
      'Build fake identity profiles with address, phone, email, job, and birthday. Safe fields only — no valid credit cards or government IDs.',
    h1: 'Fake identity generator for QA and staging',
    keywords: 'fake identity generator, test profile generator, synthetic identity',
    focus: 'full-identity',
    paragraphs: [
      'Need a complete persona for a checkout flow or HR demo? This fake identity generator bundles name, contact, address, and employment fields in one card.',
      'We intentionally exclude document numbers and payment cards that could pass validation checks. Stick to testing UI, validation rules, and integrations — not fraud.',
      'Export batches for seeding databases or share a single profile via copy-to-clipboard.',
    ],
    faq: [
      {
        q: 'Why are credit cards and SSNs missing?',
        a: 'To reduce misuse; this tool is for legitimate software testing only.',
      },
      {
        q: 'Can I pick gender?',
        a: 'Yes — male, female, or any.',
      },
    ],
  },
  {
    path: '/fr/generateur-faux-nom',
    locale: 'fr',
    title: 'Générateur de faux noms gratuit — identités de test',
    description:
      'Créez des faux noms et profils complets par pays et genre. Export CSV/JSON. 100 % dans le navigateur.',
    h1: 'Générateur de faux noms et identités',
    keywords: 'générateur faux nom, identité fictive, données de test',
    focus: 'home',
    paragraphs: [
      'Générez des profils fictifs pour vos tests logiciels : nom, e-mail, téléphone, adresse et métier. Choisissez le pays et le genre, copiez ou exportez en lot.',
      'Aucun numéro de carte bancaire ni pièce d’identité gouvernementale — uniquement des champs de contact adaptés aux démos.',
      'Alternative légère à fakedetail.com, sans inscription.',
    ],
    faq: [
      { q: 'Est-ce gratuit ?', a: 'Oui, sans compte.' },
      { q: 'Où sont les données ?', a: 'Uniquement dans votre navigateur.' },
    ],
  },
  {
    path: '/privacy',
    locale: 'en',
    title: 'Privacy — Free Fake Name Generator',
    description: 'Privacy policy for the free fake name generator.',
    h1: 'Privacy',
    keywords: 'privacy',
    paragraphs: ['We do not store generated identities on a server.'],
    faq: [],
  },
  {
    path: '/terms',
    locale: 'en',
    title: 'Terms — Free Fake Name Generator',
    description: 'Terms of use.',
    h1: 'Terms',
    keywords: 'terms',
    paragraphs: [],
    faq: [],
  },
  {
    path: '/about',
    locale: 'en',
    title: 'About — Free Fake Name Generator',
    description: 'About this open-source-based fake identity tool.',
    h1: 'About',
    keywords: 'about',
    paragraphs: [],
    faq: [],
  },
  {
    path: '/contact',
    locale: 'en',
    title: 'Contact — Free Fake Name Generator',
    description: 'Contact the operator.',
    h1: 'Contact',
    keywords: 'contact',
    paragraphs: [],
    faq: [],
  },
]

export function canonicalFor(path: string): string {
  const p = path === '/' ? '' : path.replace(/\/$/, '')
  return `${SITE.canonicalHost}${p || '/'}`
}

export function pageForPath(pathname: string): SeoPage {
  const normalized =
    pathname !== '/' && !pathname.endsWith('/') && SEO_PAGES.some((p) => p.path === pathname + '/')
      ? pathname + '/'
      : pathname
  return (
    SEO_PAGES.find((p) => p.path === normalized || p.path === pathname) ??
    SEO_PAGES.find((p) => p.path === '/')!
  )
}
