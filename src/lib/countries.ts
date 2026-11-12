import type { Faker } from '@faker-js/faker'
import {
  fakerEN_US,
  fakerEN_GB,
  fakerEN_AU,
  fakerEN_CA,
  fakerEN_IN,
  fakerFR,
  fakerDE,
  fakerES,
  fakerIT,
  fakerPT_BR,
  fakerNL,
  fakerPL,
  fakerSV,
  fakerNB_NO,
  fakerDA,
  fakerFI,
  fakerCS_CZ,
  fakerJA,
  fakerZH_CN,
  fakerKO,
  fakerTR,
  fakerAR,
  fakerID_ID,
  fakerUK,
  fakerEN,
} from '@faker-js/faker'

export type GenderOption = 'any' | 'male' | 'female'

export interface CountryOption {
  code: string
  label: string
  faker: Faker
}

export const COUNTRIES: CountryOption[] = [
  { code: 'US', label: 'United States', faker: fakerEN_US },
  { code: 'GB', label: 'United Kingdom', faker: fakerEN_GB },
  { code: 'CA', label: 'Canada', faker: fakerEN_CA },
  { code: 'AU', label: 'Australia', faker: fakerEN_AU },
  { code: 'IN', label: 'India', faker: fakerEN_IN },
  { code: 'FR', label: 'France', faker: fakerFR },
  { code: 'DE', label: 'Germany', faker: fakerDE },
  { code: 'ES', label: 'Spain', faker: fakerES },
  { code: 'IT', label: 'Italy', faker: fakerIT },
  { code: 'BR', label: 'Brazil', faker: fakerPT_BR },
  { code: 'NL', label: 'Netherlands', faker: fakerNL },
  { code: 'PL', label: 'Poland', faker: fakerPL },
  { code: 'SE', label: 'Sweden', faker: fakerSV },
  { code: 'NO', label: 'Norway', faker: fakerNB_NO },
  { code: 'DK', label: 'Denmark', faker: fakerDA },
  { code: 'FI', label: 'Finland', faker: fakerFI },
  { code: 'CZ', label: 'Czech Republic', faker: fakerCS_CZ },
  { code: 'JP', label: 'Japan', faker: fakerJA },
  { code: 'CN', label: 'China', faker: fakerZH_CN },
  { code: 'KR', label: 'South Korea', faker: fakerKO },
  { code: 'TR', label: 'Turkey', faker: fakerTR },
  { code: 'SA', label: 'Saudi Arabia', faker: fakerAR },
  { code: 'ID', label: 'Indonesia', faker: fakerID_ID },
  { code: 'UA', label: 'Ukraine', faker: fakerUK },
  { code: 'INT', label: 'International (English)', faker: fakerEN },
]

export function countryByCode(code: string): CountryOption {
  return COUNTRIES.find((c) => c.code === code) ?? COUNTRIES[0]
}
