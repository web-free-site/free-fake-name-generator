import { useMemo } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Layout } from './components/Layout'
import { GeneratorPage } from './pages/GeneratorPage'
import { LegalPage } from './pages/LegalPage'
import { Locale } from './i18n/messages'
import { RouteMeta } from './seo/Helmet'

function localeFromPath(path: string): Locale {
  return path.startsWith('/fr') ? 'fr' : 'en'
}

function App() {
  const location = useLocation()
  const locale = useMemo(() => localeFromPath(location.pathname), [location.pathname])

  const setLocale = (l: Locale) => {
    try {
      window.localStorage.setItem('freeFakeNameLocale', l)
    } catch {
      /* ignore */
    }
  }

  const showHomeBanner = ['/', '/fr', '/fr/generateur-faux-nom'].includes(location.pathname)

  return (
    <Layout locale={locale} onLocale={setLocale} showHomeBanner={showHomeBanner}>
      <RouteMeta />
      <Routes>
        <Route path="/" element={<GeneratorPage locale="en" seoPath="/" focus="home" />} />
        <Route
          path="/random-name-generator"
          element={<GeneratorPage locale="en" seoPath="/random-name-generator" focus="random-name" />}
        />
        <Route
          path="/fake-identity-generator"
          element={<GeneratorPage locale="en" seoPath="/fake-identity-generator" focus="full-identity" />}
        />
        <Route path="/fr" element={<GeneratorPage locale="fr" seoPath="/fr/generateur-faux-nom" focus="home" />} />
        <Route
          path="/fr/generateur-faux-nom"
          element={<GeneratorPage locale="fr" seoPath="/fr/generateur-faux-nom" focus="home" />}
        />
        <Route path="/privacy" element={<LegalPage locale={locale} kind="privacy" />} />
        <Route path="/terms" element={<LegalPage locale={locale} kind="terms" />} />
        <Route path="/about" element={<LegalPage locale={locale} kind="about" />} />
        <Route path="/contact" element={<LegalPage locale={locale} kind="contact" />} />
        <Route path="*" element={<GeneratorPage locale={locale} seoPath="/" focus="home" />} />
      </Routes>
    </Layout>
  )
}

export default App
