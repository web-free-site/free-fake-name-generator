import { countryByCode, type GenderOption } from './countries'

export interface FakeIdentity {
  countryCode: string
  country: string
  firstName: string
  lastName: string
  fullName: string
  gender: string
  birthday: string
  username: string
  email: string
  phone: string
  street: string
  city: string
  state: string
  zipCode: string
  jobTitle: string
  company: string
}

export interface GenerateOptions {
  countryCode: string
  gender: GenderOption
}

/** Adapted from B-52405/RandomAmericanGenerator generatePerson(); uses @faker-js/faker per locale. */
export function generateIdentity(options: GenerateOptions): FakeIdentity {
  const country = countryByCode(options.countryCode)
  const faker = country.faker

  const sexType =
    options.gender === 'any'
      ? faker.person.sexType()
      : options.gender === 'male'
        ? ('male' as const)
        : ('female' as const)

  const firstName = faker.person.firstName(sexType)
  const lastName = faker.person.lastName()
  const fullName = `${firstName} ${lastName}`
  const genderLabel = sexType === 'male' ? 'Male' : 'Female'

  const dob = faker.date.birthdate({ min: 18, max: 80, mode: 'age' })
  const birthday = dob.toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  })

  const username = faker.internet
    .username({ firstName, lastName })
    .toLowerCase()
    .replace(/[^a-z0-9._-]/g, '')
  const email = faker.internet.email({ firstName, lastName })
  const phone = faker.phone.number()

  const street = faker.location.streetAddress()
  const city = faker.location.city()
  let state = ''
  try {
    state = faker.location.state()
  } catch {
    state = ''
  }
  const zipCode = faker.location.zipCode()

  const jobTitle = faker.person.jobTitle()
  const company = faker.company.name()

  return {
    countryCode: country.code,
    country: country.label,
    firstName,
    lastName,
    fullName,
    gender: genderLabel,
    birthday,
    username,
    email,
    phone,
    street,
    city,
    state,
    zipCode,
    jobTitle,
    company,
  }
}

export function generateBulk(count: number, options: GenerateOptions): FakeIdentity[] {
  const safe = Math.min(Math.max(1, Math.floor(count)), 100)
  return Array.from({ length: safe }, () => generateIdentity(options))
}

export const IDENTITY_FIELDS: { key: keyof FakeIdentity; label: string }[] = [
  { key: 'fullName', label: 'Full name' },
  { key: 'firstName', label: 'First name' },
  { key: 'lastName', label: 'Last name' },
  { key: 'gender', label: 'Gender' },
  { key: 'birthday', label: 'Birthday' },
  { key: 'username', label: 'Username' },
  { key: 'email', label: 'Email' },
  { key: 'phone', label: 'Phone' },
  { key: 'street', label: 'Street' },
  { key: 'city', label: 'City' },
  { key: 'state', label: 'State / region' },
  { key: 'zipCode', label: 'Postal code' },
  { key: 'country', label: 'Country' },
  { key: 'jobTitle', label: 'Job title' },
  { key: 'company', label: 'Company' },
]
