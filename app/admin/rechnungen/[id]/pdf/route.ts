import { NextResponse, type NextRequest } from "next/server";
import { aktuellerNutzer } from "@/lib/admin/supabase";
import { rechnungDatenLaden } from "@/lib/admin/rechnung-daten";
import { rechnungPdf } from "@/lib/admin/rechnung-pdf";

export const dynamic = "force-dynamic";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await aktuellerNutzer())) {
    return NextResponse.redirect(new URL("/admin/login", _request.url));
  }
  const { id } = await params;
  const geladen = await rechnungDatenLaden(id);
  if (!geladen) return new NextResponse("Nicht gefunden", { status: 404 });

  const pdf = await rechnungPdf(geladen.daten);
  return new Response(new Uint8Array(pdf), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename=Rechnung-${geladen.daten.nummer}.pdf`,
    },
  });
}
