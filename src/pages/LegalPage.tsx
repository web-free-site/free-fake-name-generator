import { FC } from 'react'
import { Locale } from '../i18n/messages'
import { SITE } from '../site'
import { AdSlot } from '../components/ads/AdSlot'

interface Props {
  locale: Locale
  kind: 'privacy' | 'terms' | 'about' | 'contact'
}

const copy: Record<string, { title: string; body: string[] }> = {
  privacy: {
    title: 'Privacy',
    body: [
      'Free Fake Name Generator runs entirely in your browser. We do not collect or store the identities you generate on our servers.',
      'Adsterra advertising scripts may use cookies when ads are enabled; refer to Adsterra’s policy for details.',
      `Questions: ${SITE.contactEmail}.`,
    ],
  },
  terms: {
    title: 'Terms of use',
    body: [
      'This tool is provided as-is for legitimate software testing and demonstrations. You must not use generated data for fraud, identity theft, or circumventing KYC.',
      'Do not expect government IDs or payment card numbers here — we deliberately omit them.',
      'Gentil M. may update these terms at any time.',
    ],
  },
  about: {
    title: 'About',
    body: [
      'Free Fake Name Generator is an alternative to fakedetail.com for developers who need synthetic personas: names, contact details, addresses, and job titles without server-side APIs.',
      'Identity logic is adapted from the open-source RandomAmericanGenerator project by B-52405, powered by the MIT-licensed @faker-js/faker library (Faker.js). The site shell and ad layout follow the web-free.site pattern used on Free Invoice Generator.',
      `Operator: Gentil M., Kigali, Rwanda — ${SITE.gentilUrl}`,
    ],
  },
  contact: {
    title: 'Contact',
    body: [`Email ${SITE.contactEmail} for corrections, partnerships, or abuse reports.`],
  },
}

export const LegalPage: FC<Props> = ({ kind }) => {
  const c = copy[kind]
  return (
    <article className="legal-page">
      <h1>{c.title}</h1>
      {c.body.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
      <AdSlot slot="content300x250" className="ad-content" />
    </article>
  )
}
