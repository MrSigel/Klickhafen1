import { site } from "@/lib/site";
import { supabaseServer } from "./supabase";
import type { Einstellungen } from "./typen";

/**
 * Standardwerte, falls die Einstellungs-Tabelle noch nicht eingespielt ist oder
 * ein Feld leer bleibt. Bewusst mit echten Stammdaten belegt — so ergibt eine
 * Rechnung sofort Sinn, auch bevor Enrico etwas einträgt. E-Mail steht auf
 * kontakt@klickhafen.com (nicht die private Gmail aus dem SEO-Datensatz).
 */
export const EINSTELLUNGEN_DEFAULT: Einstellungen = {
  firma: site.name,
  eyebrow: "WEBDESIGN · RUHRGEBIET",
  logoZeigen: true,
  inhaber: `${site.person.vorname} ${site.person.nachname}`,
  strasse: site.adresse.strasse,
  plz: site.adresse.plz,
  ort: site.adresse.ort,
  email: "kontakt@klickhafen.com",
  telefon: site.telefon,
  web: site.domain,
  bankInhaber: null,
  iban: null,
  bic: null,
  bankName: null,
  kleinunternehmer: true,
  ustSatz: 19,
  ustId: null,
  steuernummer: null,
  zahlungszielTage: 14,
  rechnungFuss: null,
};

type Zeile = Record<string, unknown>;

/** Trimmt Strings; leere Werte werden zu null, damit Defaults greifen können. */
function txt(v: unknown): string | null {
  if (typeof v !== "string") return null;
  const t = v.trim();
  return t.length ? t : null;
}

/**
 * Lädt die eine Einstellungszeile (id = 1) und mappt sie auf den camelCase-Typ.
 * Fehlt die Tabelle (Migration noch nicht gelaufen) oder die Zeile, kommen die
 * Defaults zurück — die App läuft dadurch immer, nur eben mit Standardwerten.
 */
export async function einstellungenLaden(): Promise<Einstellungen> {
  try {
    const supabase = await supabaseServer();
    const { data, error } = await supabase
      .from("einstellungen")
      .select("*")
      .eq("id", 1)
      .maybeSingle();
    if (error || !data) return EINSTELLUNGEN_DEFAULT;

    const r = data as Zeile;
    const d = EINSTELLUNGEN_DEFAULT;
    return {
      firma: txt(r.firma) ?? d.firma,
      eyebrow: txt(r.eyebrow),
      logoZeigen: r.logo_zeigen !== false,
      inhaber: txt(r.inhaber) ?? d.inhaber,
      strasse: txt(r.strasse) ?? d.strasse,
      plz: txt(r.plz) ?? d.plz,
      ort: txt(r.ort) ?? d.ort,
      email: txt(r.email) ?? d.email,
      telefon: txt(r.telefon) ?? d.telefon,
      web: txt(r.web) ?? d.web,
      bankInhaber: txt(r.bank_inhaber),
      iban: txt(r.iban),
      bic: txt(r.bic),
      bankName: txt(r.bank_name),
      kleinunternehmer: r.kleinunternehmer !== false,
      ustSatz: Number.isFinite(Number(r.ust_satz)) ? Number(r.ust_satz) : d.ustSatz,
      ustId: txt(r.ust_id),
      steuernummer: txt(r.steuernummer),
      zahlungszielTage: Number.isFinite(Number(r.zahlungsziel_tage))
        ? Number(r.zahlungsziel_tage)
        : d.zahlungszielTage,
      rechnungFuss: txt(r.rechnung_fuss),
    };
  } catch {
    return EINSTELLUNGEN_DEFAULT;
  }
}
