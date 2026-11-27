/**
 * Injects crawler-visible homepage SEO into dist/index.html after Vite build.
 * Uses the same copy as src/seo/homeStaticSeo.json (single source with the React app).
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const distIndex = path.join(root, 'dist', 'index.html')
const homeSeo = JSON.parse(
  fs.readFileSync(path.join(root, 'src', 'seo', 'homeStaticSeo.json'), 'utf8'),
)

const HOST = 'https://free-fake-name-generator.web-free.site'

function escHtml(s) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function buildHomeSeoHtml(data) {
  const sections = data.articleSections
    .map((section) => {
      const paras = section.paragraphs.map((p) => `      <p>${escHtml(p)}</p>`).join('\n')
      const steps = section.steps?.length
        ? `      <ol class="seo-steps">\n${section.steps.map((s) => `        <li>${escHtml(s)}</li>`).join('\n')}\n      </ol>`
        : ''
      return `    <section>
      <h3>${escHtml(section.heading)}</h3>
${paras}
${steps}
    </section>`
    })
    .join('\n')

  const faq = data.faq
    .map(
      (f) => `      <div>
        <dt>${escHtml(f.q)}</dt>
        <dd>${escHtml(f.a)}</dd>
      </div>`,
    )
    .join('\n')

  return `<section id="seo-prerender" class="seo-prerender" aria-hidden="true">
  <article class="generator-page seo-content">
    <header class="generator-hero">
      <h1>${escHtml(data.h1)}</h1>
      <p class="lead">${escHtml(data.lead)}</p>
    </header>
    <h2>How to use</h2>
    <p class="seo-hub-links">Part of the <a href="${escHtml(data.hubRef)}">Web Free</a> tool network. For a longer walkthrough, see the <a href="${escHtml(data.guideUrl)}">fake name and email generator for QA guide</a>.</p>
${sections}
    <h2>Frequently asked questions</h2>
    <dl class="faq">
${faq}
    </dl>
  </article>
</section>`
}

function buildHeadJsonLd(data, description) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Free Fake Name Generator',
        url: `${HOST}/`,
        description,
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'Any',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      },
      {
        '@type': 'FAQPage',
        mainEntity: data.faq.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  }
}

export function injectHomeStatic(html, { description }) {
  let out = html
  if (out.includes('id="seo-prerender"')) {
    out = out.replace(/<section id="seo-prerender"[\s\S]*?<\/section>\s*/, '')
  }
  const block = buildHomeSeoHtml(homeSeo)
  out = out.replace('<div id="root"></div>', `${block}\n    <div id="root"></div>`)

  const ld = JSON.stringify(buildHeadJsonLd(homeSeo, description))
  if (/<script type="application\/ld\+json">[\s\S]*?<\/script>/.test(out)) {
    out = out.replace(
      /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
      `<script type="application/ld+json">${ld}</script>`,
    )
  } else {
    out = out.replace('</head>', `    <script type="application/ld+json">${ld}</script>\n  </head>`)
  }
  return out
}

export function injectHomeStaticDist() {
  if (!fs.existsSync(distIndex)) {
    console.warn('inject-home-static: dist/index.html not found, skipping')
    return
  }
  let html = fs.readFileSync(distIndex, 'utf8')
  const descMatch = html.match(/<meta\s+name="description"\s+content="([^"]*)"\s*\/?>/)
  const description =
    descMatch?.[1] ??
    'Free fake name generator for QA: random names, emails, phones, addresses, and jobs by country.'
  html = injectHomeStatic(html, { description })
  fs.writeFileSync(distIndex, html)
  console.log('inject-home-static: updated dist/index.html with static SEO + FAQPage JSON-LD')
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  injectHomeStaticDist()
}
