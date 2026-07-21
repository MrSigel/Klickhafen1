"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { supabaseBrowser } from "@/lib/admin/supabase-browser";

export function LogoutButton() {
  const router = useRouter();
  const [laeuft, setLaeuft] = useState(false);

  return (
    <button
      type="button"
      disabled={laeuft}
      onClick={async () => {
        setLaeuft(true);
        await supabaseBrowser().auth.signOut();
        router.replace("/admin/login");
        router.refresh();
      }}
      className="text-small text-ink-faint transition-colors hover:text-accent disabled:opacity-50"
    >
      {laeuft ? "…" : "Abmelden"}
    </button>
  );
}
