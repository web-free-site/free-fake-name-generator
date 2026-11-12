# Free Fake Name Generator

Browser-based fake identity profiles for software testing — alternative to [fakedetail.com](https://fakedetail.com).

**Live URL:** https://free-fake-name-generator.web-free.site

## Features

- Random name, gender, birthday, username, email, phone, address, job, and company by **country** and **gender**
- Copy fields or export bulk **CSV / JSON** (up to 100 rows)
- SEO pages: `/random-name-generator`, `/fake-identity-generator`, French `/fr/generateur-faux-nom`
- No government IDs or credit card numbers that pass validation

## Upstream

- Identity generation logic adapted from [B-52405/RandomAmericanGenerator](https://github.com/B-52405/RandomAmericanGenerator)
- [faker-js/faker](https://github.com/faker-js/faker) (MIT) — see `LICENSE-UPSTREAM`
- Site shell pattern from [web-free-site/free-invoice-generator](https://github.com/web-free-site/free-invoice-generator)

## Develop

```bash
npm install
npm run dev
npm run build
npm test
```

Deploy is via Gentil's box (`wrangler.toml` included; do not deploy from CI).

## Pages

| Path | Purpose |
| --- | --- |
| `/` | Main English tool |
| `/random-name-generator` | Name-focused SEO landing |
| `/fake-identity-generator` | Full profile SEO landing |
| `/fr/generateur-faux-nom` | French |
| `/privacy`, `/terms`, `/about`, `/contact` | Legal |
