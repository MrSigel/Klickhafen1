import { supabaseServer } from "./supabase";
import type {
  Ausgabe,
  Auswertung,
  Kunde,
  Posten,
  Projekt,
  Rechnung,
  RechnungPosten,
} from "./typen";

/** Summe einer Zahlenspalte, robust gegen null. */
function summe(zeilen: { betrag: number | null }[]): number {
  return zeilen.reduce((s, z) => s + Number(z.betrag ?? 0), 0);
}

/**
 * Die Geld-Auswertung — der Kern. Trennt eigenen Gewinn strikt von
 * durchlaufenden Posten (Kundengeld, z. B. Ads-Budget).
 *
 * Optional auf ein Projekt eingegrenzt.
 */
export async function auswertungLaden(projektId?: string): Promise<Auswertung> {
  const supabase = await supabaseServer();

  let postenQuery = supabase.from("posten").select("betrag, art, bezahlt");
  let ausgabenQuery = supabase.from("ausgaben").select("betrag, art");
  if (projektId) {
    postenQuery = postenQuery.eq("projekt_id", projektId);
    ausgabenQuery = ausgabenQuery.eq("projekt_id", projektId);
  }

  const [{ data: posten }, { data: ausgaben }] = await Promise.all([
    postenQuery,
    ausgabenQuery,
  ]);

  const p = posten ?? [];
  const a = ausgaben ?? [];

  const umsatzPosten = p.filter((x) => x.art === "umsatz");
  const umsatz = summe(umsatzPosten);
  const umsatzBezahlt = summe(umsatzPosten.filter((x) => x.bezahlt));
  const ausgabenEigen = summe(a.filter((x) => x.art === "eigen"));
  const durchlaufEin = summe(p.filter((x) => x.art === "durchlauf"));
  const durchlaufAus = summe(a.filter((x) => x.art === "durchlauf"));

  return {
    umsatz,
    umsatzBezahlt,
    umsatzOffen: umsatz - umsatzBezahlt,
    ausgabenEigen,
    gewinn: umsatz - ausgabenEigen,
    durchlaufEin,
    durchlaufAus,
    durchlaufOffen: durchlaufEin - durchlaufAus,
  };
}

export async function kundenLaden(): Promise<Kunde[]> {
  const supabase = await supabaseServer();
  const { data } = await supabase
    .from("kunden")
    .select("*")
    .order("erstellt", { ascending: false });
  return (data as Kunde[]) ?? [];
}

export async function kundeLaden(id: string): Promise<Kunde | null> {
  const supabase = await supabaseServer();
  const { data } = await supabase.from("kunden").select("*").eq("id", id).single();
  return (data as Kunde) ?? null;
}

export type ProjektMitKunde = Projekt & { kunde: { name: string } | null };

export async function projekteLaden(): Promise<ProjektMitKunde[]> {
  const supabase = await supabaseServer();
  const { data } = await supabase
    .from("projekte")
    .select("*, kunde:kunden(name)")
    .order("erstellt", { ascending: false });
  return (data as ProjektMitKunde[]) ?? [];
}

export type ProjektDetail = {
  projekt: ProjektMitKunde;
  posten: Posten[];
  ausgaben: Ausgabe[];
  auswertung: Auswertung;
};

export async function projektLaden(id: string): Promise<ProjektDetail | null> {
  const supabase = await supabaseServer();
  const { data: projekt } = await supabase
    .from("projekte")
    .select("*, kunde:kunden(name)")
    .eq("id", id)
    .single();
  if (!projekt) return null;

  const [{ data: posten }, { data: ausgaben }, auswertung] = await Promise.all([
    supabase.from("posten").select("*").eq("projekt_id", id).order("datum"),
    supabase.from("ausgaben").select("*").eq("projekt_id", id).order("datum"),
    auswertungLaden(id),
  ]);

  return {
    projekt: projekt as ProjektMitKunde,
    posten: (posten as Posten[]) ?? [],
    ausgaben: (ausgaben as Ausgabe[]) ?? [],
    auswertung,
  };
}

export async function ausgabenLaden(): Promise<Ausgabe[]> {
  const supabase = await supabaseServer();
  const { data } = await supabase
    .from("ausgaben")
    .select("*")
    .order("datum", { ascending: false });
  return (data as Ausgabe[]) ?? [];
}

export type RechnungMitKunde = Rechnung & { kunde: { name: string } | null };

export async function rechnungenLaden(): Promise<RechnungMitKunde[]> {
  const supabase = await supabaseServer();
  const { data } = await supabase
    .from("rechnungen")
    .select("*, kunde:kunden(name)")
    .order("datum", { ascending: false });
  return (data as RechnungMitKunde[]) ?? [];
}

export async function rechnungLaden(
  id: string,
): Promise<{ rechnung: RechnungMitKunde; posten: RechnungPosten[] } | null> {
  const supabase = await supabaseServer();
  const { data: rechnung } = await supabase
    .from("rechnungen")
    .select("*, kunde:kunden(name)")
    .eq("id", id)
    .single();
  if (!rechnung) return null;
  const { data: posten } = await supabase
    .from("rechnung_posten")
    .select("*")
    .eq("rechnung_id", id)
    .order("position");
  return {
    rechnung: rechnung as RechnungMitKunde,
    posten: (posten as RechnungPosten[]) ?? [],
  };
}

/** Nächste freie Rechnungsnummer im Format JAHR-NNN. */
export async function naechsteRechnungsnummer(jahr: number): Promise<string> {
  const supabase = await supabaseServer();
  const { data } = await supabase
    .from("rechnungen")
    .select("nummer")
    .like("nummer", `${jahr}-%`)
    .order("nummer", { ascending: false })
    .limit(1);
  const letzte = data?.[0]?.nummer as string | undefined;
  const n = letzte ? Number(letzte.split("-")[1]) + 1 : 1;
  return `${jahr}-${String(n).padStart(3, "0")}`;
}
