import { describe, expect, it } from 'vitest'
import { generateBulk, generateIdentity } from './generateIdentity'

describe('generateIdentity', () => {
  it('returns expected fields without card or id numbers', () => {
    const row = generateIdentity({ countryCode: 'US', gender: 'female' })
    const json = JSON.stringify(row)
    expect(row.fullName).toMatch(/\S+\s+\S+/)
    expect(row.gender).toBe('Female')
    expect(json).not.toMatch(/credit|ssn|passport|luhn/i)
    expect(Object.keys(row)).not.toContain('creditCard')
  })

  it('bulk caps at 100', () => {
    expect(generateBulk(500, { countryCode: 'FR', gender: 'any' })).toHaveLength(100)
  })
})
