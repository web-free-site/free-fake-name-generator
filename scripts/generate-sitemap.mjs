import fs from 'node:fs'
import path from 'node:path'

const HOST = 'https://free-fake-name-generator.web-free.site'
const paths = [
  "/how-to-generate-test-user-data-for-qa",
  "/how-to-create-dummy-names-for-a-demo",
  '/',
  '/random-name-generator',
  '/fake-identity-generator',
  '/fr/generateur-faux-nom',
  '/privacy',
  '/terms',
  '/about',
  '/contact',
]

const urls = paths
  .map(
    (p) => `  <url>
    <loc>${HOST}${p === '/' ? '/' : p}</loc>
    <changefreq>weekly</changefreq>
    <priority>${p === '/' ? '1.0' : '0.8'}</priority>
  </url>`,
  )
  .join('\n')

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`

fs.writeFileSync(path.join('dist', 'sitemap.xml'), xml)
console.log('Wrote sitemap.xml')
