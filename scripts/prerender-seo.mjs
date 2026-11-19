import fs from 'node:fs'
import path from 'node:path'

const HOST = 'https://free-fake-name-generator.web-free.site'
const dist = path.resolve('dist')
const baseHtml = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')

const pages = [
  {
    path: '/random-name-generator',
    locale: 'en',
    title: 'Random Name Generator — fake names by country',
    description: 'Free random name generator with gender and country filters. Bulk CSV/JSON export.',
    h1: 'Random name generator',
    snippet:
      '<p>Generate random fake first and last names for signup forms and database seeds. Pick a country locale and optional gender.</p>',
  },
  {
    path: '/fake-identity-generator',
    locale: 'en',
    title: 'Fake Identity Generator — full test profiles',
    description: 'Fake identity generator with address, phone, email, and job. No government IDs or credit cards.',
    h1: 'Fake identity generator',
    snippet: '<p>Create synthetic personas for QA. Safe fields only; export up to 100 rows.</p>',
  },
  {
    path: '/fr/generateur-faux-nom',
    locale: 'fr',
    title: 'Générateur de faux noms gratuit',
    description: 'Identités fictives par pays et genre. Export CSV/JSON.',
    h1: 'Générateur de faux noms',
    snippet: '<p>Générez des profils de test dans votre navigateur.</p>',
  },
  {
    path: '/privacy',
    locale: 'en',
    title: 'Privacy — Free Fake Name Generator',
    description: 'Privacy policy.',
    h1: 'Privacy',
    snippet: '<p>We do not store generated identities on a server.</p>',
  },
  {
    path: '/terms',
    locale: 'en',
    title: 'Terms — Free Fake Name Generator',
    description: 'Terms of use.',
    h1: 'Terms',
    snippet: '<p>For legitimate testing only.</p>',
  },
  {
    path: '/about',
    locale: 'en',
    title: 'About — Free Fake Name Generator',
    description: 'About @faker-js/faker and upstream projects.',
    h1: 'About',
    snippet: '<p>Built with Faker.js and RandomAmericanGenerator patterns.</p>',
  },
  {
    path: '/contact',
    locale: 'en',
    title: 'Contact — Free Fake Name Generator',
    description: 'Contact Gentil M.',
    h1: 'Contact',
    snippet: '<p>Email gentil@quevvy.com</p>',
  },
]

function buildPage(page) {
  const url = HOST + page.path
  let html = baseHtml
  html = html.replace(/<html lang="[^"]*"/, `<html lang="${page.locale}"`)
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${page.title}</title>`)
  html = html.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${page.description}" />`,
  )
  if (!html.includes('rel="canonical"')) {
    html = html.replace('<script src="https://ref.web-free.site/r.js" defer></script>
</head>', `    <link rel="canonical" href="${url}" />\n  </head>`)
  } else {
    html = html.replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${url}" />`)
  }
  html = html.replace(/<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/, `<meta property="og:url" content="${url}" />`)
  html = html.replace(/<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/, `<meta property="og:title" content="${page.title}" />`)
  html = html.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:description" content="${page.description}" />`,
  )
  const seoBlock = `<section id="seo-prerender" class="seo-prerender"><h1>${page.h1}</h1>${page.snippet}</section>`
  html = html.replace('<div id="root"></div>', `${seoBlock}<div id="root"></div>`)
  return html
}

for (const page of pages) {
  const dir = path.join(dist, page.path.replace(/^\//, ''))
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(path.join(dir, 'index.html'), buildPage(page))
}

console.log('Prerendered', pages.length, 'route shells from Vite index.html')
