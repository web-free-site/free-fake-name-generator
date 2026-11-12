import { saveAs } from 'file-saver'
import { type FakeIdentity, IDENTITY_FIELDS } from './generateIdentity'

export function identitiesToJson(rows: FakeIdentity[]): string {
  return JSON.stringify(rows, null, 2)
}

export function identitiesToCsv(rows: FakeIdentity[]): string {
  const headers = IDENTITY_FIELDS.map((f) => f.key)
  const escape = (v: string) => {
    const s = String(v)
    if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`
    return s
  }
  const lines = [
    headers.join(','),
    ...rows.map((row) => headers.map((h) => escape(row[h])).join(',')),
  ]
  return lines.join('\n')
}

export function downloadJson(rows: FakeIdentity[], filename = 'fake-identities.json') {
  const blob = new Blob([identitiesToJson(rows)], { type: 'application/json;charset=utf-8' })
  saveAs(blob, filename)
}

export function downloadCsv(rows: FakeIdentity[], filename = 'fake-identities.csv') {
  const blob = new Blob([identitiesToCsv(rows)], { type: 'text/csv;charset=utf-8' })
  saveAs(blob, filename)
}

export function identityPlainText(row: FakeIdentity): string {
  return IDENTITY_FIELDS.map((f) => `${f.label}: ${row[f.key]}`).join('\n')
}
