export type Locale = 'en' | 'fr'

const en = {
  siteName: 'Free Fake Name Generator',
  tagline: 'Random test identities — runs in your browser',
  generate: 'Generate identity',
  generateAnother: 'Generate new',
  randomNameGenerator: 'Random name',
  fakeIdentity: 'Full identity',
  country: 'Country',
  gender: 'Gender',
  genderAny: 'Any',
  genderMale: 'Male',
  genderFemale: 'Female',
  bulkCount: 'Bulk count',
  exportCsv: 'Download CSV',
  exportJson: 'Download JSON',
  copyAll: 'Copy all fields',
  copied: 'Copied',
  copyField: 'Copy',
  disclaimer:
    'For software testing and demos only. We never generate government IDs or credit card numbers that pass validation.',
  privacy: 'Privacy',
  terms: 'Terms',
  about: 'About',
  contact: 'Contact',
  byGentil: 'Gentil M.',
  language: 'Language',
  savedLocally: 'Generated in your browser only — nothing is sent to a server.',
  sponsored: 'Sponsored',
  howToTitle: 'How to use',
}

const fr: typeof en = {
  siteName: 'Générateur de faux noms gratuit',
  tagline: 'Identités aléatoires pour tests — dans votre navigateur',
  generate: 'Générer une identité',
  generateAnother: 'Nouvelle identité',
  randomNameGenerator: 'Nom aléatoire',
  fakeIdentity: 'Identité complète',
  country: 'Pays',
  gender: 'Genre',
  genderAny: 'Au hasard',
  genderMale: 'Homme',
  genderFemale: 'Femme',
  bulkCount: 'Quantité',
  exportCsv: 'Télécharger CSV',
  exportJson: 'Télécharger JSON',
  copyAll: 'Tout copier',
  copied: 'Copié',
  copyField: 'Copier',
  disclaimer:
    'Uniquement pour tests logiciels. Pas de numéros de carte bancaire ni de pièces d’identité réalistes.',
  privacy: 'Confidentialité',
  terms: 'Conditions',
  about: 'À propos',
  contact: 'Contact',
  byGentil: 'Gentil M.',
  language: 'Langue',
  savedLocally: 'Généré localement — rien n’est envoyé au serveur.',
  sponsored: 'Sponsorisé',
  howToTitle: 'Mode d’emploi',
}

export function t(locale: Locale, key: keyof typeof en): string {
  const table = locale === 'fr' ? fr : en
  return table[key]
}
