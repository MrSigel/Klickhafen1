import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // @react-pdf/renderer (Rechnungs-PDFs im Admin) darf nicht in das
  // Server-Bundle gezogen werden — sonst bricht der Turbopack-Build. Als
  // externes Node-Paket behandeln.
  serverExternalPackages: ["@react-pdf/renderer"],
};

export default nextConfig;
