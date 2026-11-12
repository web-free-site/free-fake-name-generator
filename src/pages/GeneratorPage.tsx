import { FC, useCallback, useMemo, useState } from 'react'
import { Locale, t } from '../i18n/messages'
import { COUNTRIES, type GenderOption } from '../lib/countries'
import {
  type FakeIdentity,
  generateIdentity,
  generateBulk,
  IDENTITY_FIELDS,
} from '../lib/generateIdentity'
import { downloadCsv, downloadJson, identityPlainText } from '../lib/export'
import { JsonLd } from '../components/JsonLd'
import { pageForPath } from '../seo/pages'
import { AdSlot } from '../components/ads/AdSlot'

interface Props {
  locale: Locale
  seoPath: string
  focus?: 'home' | 'random-name' | 'full-identity'
}

export const GeneratorPage: FC<Props> = ({ locale, seoPath, focus = 'home' }) => {
  const seo = useMemo(() => pageForPath(seoPath), [seoPath])
  const [countryCode, setCountryCode] = useState('US')
  const [gender, setGender] = useState<GenderOption>('any')
  const [bulkCount, setBulkCount] = useState(10)
  const [identity, setIdentity] = useState<FakeIdentity>(() =>
    generateIdentity({ countryCode: 'US', gender: 'any' }),
  )
  const [toast, setToast] = useState('')

  const showToast = (msg: string) => {
    setToast(msg)
    window.setTimeout(() => setToast(''), 1400)
  }

  const regenerate = useCallback(() => {
    setIdentity(generateIdentity({ countryCode, gender }))
  }, [countryCode, gender])

  const onCopy = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value)
      showToast(t(locale, 'copied'))
    } catch {
      showToast('Copy failed')
    }
  }

  const copyAll = () => onCopy(identityPlainText(identity))

  const bulk = () => generateBulk(bulkCount, { countryCode, gender })

  const displayFields = useMemo(() => {
    if (focus === 'random-name') {
      return IDENTITY_FIELDS.filter((f) =>
        ['fullName', 'firstName', 'lastName', 'gender', 'username', 'email', 'country'].includes(f.key),
      )
    }
    return IDENTITY_FIELDS
  }, [focus])

  return (
    <article className="generator-page">
      <JsonLd page={seo} />
      <header className="generator-hero">
        <h1>{seo.h1}</h1>
        <p className="lead">{seo.paragraphs[0]}</p>
        <p className="disclaimer">{t(locale, 'disclaimer')}</p>
      </header>

      <AdSlot slot="betweenToolContent728x90" className="ad-mid" />

      <div className="generator-layout">
        <section className="generator-controls card" aria-label="Generator controls">
          <div className="field">
            <label htmlFor="country">{t(locale, 'country')}</label>
            <select
              id="country"
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
            >
              {COUNTRIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <span className="label">{t(locale, 'gender')}</span>
            <div className="radio-row" role="radiogroup" aria-label={t(locale, 'gender')}>
              {(
                [
                  ['any', t(locale, 'genderAny')],
                  ['male', t(locale, 'genderMale')],
                  ['female', t(locale, 'genderFemale')],
                ] as const
              ).map(([value, label]) => (
                <label key={value} className="radio">
                  <input
                    type="radio"
                    name="gender"
                    value={value}
                    checked={gender === value}
                    onChange={() => setGender(value)}
                  />
                  {label}
                </label>
              ))}
            </div>
          </div>
          <button type="button" className="btn btn-primary" onClick={regenerate}>
            {t(locale, 'generate')}
          </button>
          <div className="field">
            <label htmlFor="bulk">{t(locale, 'bulkCount')} (1–100)</label>
            <input
              id="bulk"
              type="number"
              min={1}
              max={100}
              value={bulkCount}
              onChange={(e) => setBulkCount(Number(e.target.value))}
            />
          </div>
          <div className="btn-row">
            <button type="button" className="btn" onClick={() => downloadCsv(bulk())}>
              {t(locale, 'exportCsv')}
            </button>
            <button type="button" className="btn" onClick={() => downloadJson(bulk())}>
              {t(locale, 'exportJson')}
            </button>
          </div>
        </section>

        <section className="generator-result card" aria-live="polite">
          <div className="result-header">
            <h2>{identity.fullName}</h2>
            <button type="button" className="btn btn-ghost" onClick={copyAll}>
              {t(locale, 'copyAll')}
            </button>
            <button type="button" className="btn btn-ghost" onClick={regenerate}>
              {t(locale, 'generateAnother')}
            </button>
          </div>
          <dl className="identity-grid">
            {displayFields.map((field) => (
              <div className="identity-row" key={field.key}>
                <dt>{field.label}</dt>
                <dd>
                  <span>{identity[field.key]}</span>
                  <button
                    type="button"
                    className="copy-chip"
                    onClick={() => onCopy(String(identity[field.key]))}
                  >
                    {t(locale, 'copyField')}
                  </button>
                </dd>
              </div>
            ))}
          </dl>
          <AdSlot slot="nativeBelowResult" className="ad-native" />
          <AdSlot slot="content468x60" className="ad-inline" />
        </section>
      </div>

      <AdSlot slot="content300x250" className="ad-content" />

      <section className="seo-content">
        <h2>{t(locale, 'howToTitle')}</h2>
        {seo.paragraphs.slice(1).map((p, i) => (
          <p key={i}>{p}</p>
        ))}
        {seo.faq.length > 0 ? (
          <>
            <h2>FAQ</h2>
            <dl className="faq">
              {seo.faq.map((f) => (
                <div key={f.q}>
                  <dt>{f.q}</dt>
                  <dd>{f.a}</dd>
                </div>
              ))}
            </dl>
          </>
        ) : null}
      </section>

      {toast ? <div className="toast" role="status">{toast}</div> : null}
    </article>
  )
}
