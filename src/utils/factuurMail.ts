/**
 * factuurMail.ts — welke mailtekst hoort bij een verkoopfactuur?
 *
 * Een factuur die al voldaan is (webshoporder die in WooCommerce is
 * afgerekend, kassaverkoop, handmatig afgevinkt) krijgt een eigen mailtekst:
 * vragen om geld dat al binnen is, is de kortste weg naar een verwarde klant.
 * Deze module bepaalt het template-kind (`factuur` of `factuur_betaald`) en
 * levert de betaalvariabelen ({betaalregel}, {betaaldatum}, {betaalwijze})
 * voor de mailtekst — één implementatie voor de boekhoud- én de
 * bestellingenpagina.
 */
import { t } from '../i18n'

export type FactuurMailKind = 'factuur' | 'factuur_betaald'

/** De velden van een verkoopfactuur die de mailtekst nodig heeft. */
export interface FactuurBetaalVelden {
  status?: string
  /** Betaaldatum uit WooCommerce (`date_paid`), gekopieerd van de order. */
  wc_betaald_datum?: string | null
  /** Betaalmethode uit WooCommerce (`payment_method_title`). */
  wc_betaal_methode?: string | null
  /** Betaaldatum zoals in de boekhouding gezet (bankkoppeling, vinkje). */
  betaald_datum?: string | null
  /** Handmatig vastgelegde betaalwijze. */
  betaalwijze?: string | null
}

export interface FactuurMailBetaalVars {
  kind: FactuurMailKind
  /** Leeg zolang de factuur niet betaald is. */
  betaalregel: string
  /** Betaaldatum als dd-mm-jjjj, leeg als onbekend. */
  betaaldatum: string
  /** Betaalwijze (bijv. "iDEAL"), leeg als onbekend. */
  betaalwijze: string
}

export const isFactuurBetaald = (factuur: FactuurBetaalVelden | null | undefined): boolean =>
  factuur?.status === 'betaald'

export const factuurMailKind = (factuur: FactuurBetaalVelden | null | undefined): FactuurMailKind =>
  isFactuurBetaald(factuur) ? 'factuur_betaald' : 'factuur'

/** Datum in de notatie van de overige mailvariabelen (dd-mm-jjjj). */
export function formatBetaalDatum(datum: string | null | undefined): string {
  const d = (datum || '').trim()
  if (!d) return ''
  const parsed = new Date(d)
  if (Number.isNaN(parsed.getTime())) return d
  return parsed.toLocaleDateString('nl-NL', {day: '2-digit', month: '2-digit', year: 'numeric'})
}

/**
 * Betaalvariabelen voor de factuurmail. Bij een openstaande factuur zijn
 * `betaalregel`, `betaaldatum` en `betaalwijze` leeg en is het kind `factuur`.
 * Bij een betaalde factuur gaat de WooCommerce-informatie vóór op de
 * boekhoudvelden: die zegt precies wanneer en waarmee de klant heeft betaald.
 */
export function factuurMailBetaalVars(factuur: FactuurBetaalVelden | null | undefined): FactuurMailBetaalVars {
  const kind = factuurMailKind(factuur)
  if (kind !== 'factuur_betaald') return {kind, betaalregel: '', betaaldatum: '', betaalwijze: ''}
  const betaaldatum = formatBetaalDatum(factuur?.wc_betaald_datum || factuur?.betaald_datum)
  const betaalwijze = String(factuur?.wc_betaal_methode || factuur?.betaalwijze || '').trim()
  const betaalregel = betaaldatum && betaalwijze
    ? t('mail_betaalregel_op_via').replace('{datum}', betaaldatum).replace('{methode}', betaalwijze)
    : betaaldatum
      ? t('mail_betaalregel_op').replace('{datum}', betaaldatum)
      : t('mail_betaalregel')
  return {kind, betaalregel, betaaldatum, betaalwijze}
}
