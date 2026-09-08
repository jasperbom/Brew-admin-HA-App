import { describe, it, expect } from 'vitest'
import {
  factuurMailBetaalVars,
  factuurMailKind,
  formatBetaalDatum,
  isFactuurBetaald,
} from '../factuurMail'

describe('factuurMailKind', () => {
  it('openstaande factuur → gewone factuurmail', () => {
    expect(factuurMailKind({status: 'open'})).toBe('factuur')
    expect(factuurMailKind({status: 'credit'})).toBe('factuur')
    expect(factuurMailKind(undefined)).toBe('factuur')
    expect(isFactuurBetaald({status: 'open'})).toBe(false)
  })

  it('betaalde factuur → de "al voldaan"-mail', () => {
    expect(factuurMailKind({status: 'betaald'})).toBe('factuur_betaald')
    expect(isFactuurBetaald({status: 'betaald'})).toBe(true)
  })
})

describe('formatBetaalDatum', () => {
  it('ISO-datum → dd-mm-jjjj', () => {
    expect(formatBetaalDatum('2026-09-03')).toBe('03-09-2026')
    expect(formatBetaalDatum('2026-09-03T14:22:10')).toBe('03-09-2026')
  })
  it('leeg blijft leeg, onparseerbaar gaat ongewijzigd door', () => {
    expect(formatBetaalDatum('')).toBe('')
    expect(formatBetaalDatum(undefined)).toBe('')
    expect(formatBetaalDatum('gisteren')).toBe('gisteren')
  })
})

describe('factuurMailBetaalVars', () => {
  it('openstaande factuur: geen betaalregel, geen betaalvelden', () => {
    const v = factuurMailBetaalVars({status: 'open', betaald_datum: '2026-09-01'})
    expect(v).toEqual({kind: 'factuur', betaalregel: '', betaaldatum: '', betaalwijze: ''})
  })

  it('WooCommerce-order: betaaldatum + methode uit de webshop', () => {
    const v = factuurMailBetaalVars({
      status: 'betaald',
      wc_betaald_datum: '2026-09-03T10:15:00',
      wc_betaal_methode: 'iDEAL',
      betaald_datum: '2026-09-05',
    })
    expect(v.kind).toBe('factuur_betaald')
    expect(v.betaaldatum).toBe('03-09-2026')
    expect(v.betaalwijze).toBe('iDEAL')
    expect(v.betaalregel).toContain('03-09-2026')
    expect(v.betaalregel).toContain('iDEAL')
    expect(v.betaalregel).not.toContain('{datum}')
    expect(v.betaalregel).not.toContain('{methode}')
  })

  it('betaald zonder WooCommerce-velden: boekhouddatum, zonder methode', () => {
    const v = factuurMailBetaalVars({status: 'betaald', betaald_datum: '2026-09-05'})
    expect(v.betaaldatum).toBe('05-09-2026')
    expect(v.betaalwijze).toBe('')
    expect(v.betaalregel).toContain('05-09-2026')
    expect(v.betaalregel).not.toContain('via')
  })

  it('betaald zonder enige datum: generieke regel', () => {
    const v = factuurMailBetaalVars({status: 'betaald'})
    expect(v.betaaldatum).toBe('')
    expect(v.betaalregel.length).toBeGreaterThan(0)
    expect(v.betaalregel).not.toContain('{')
  })
})
