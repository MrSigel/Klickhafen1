import Script from "next/script";
import { site } from "@/lib/site";

/**
 * Google-Tag (gtag.js) für Google-Ads-Conversion-Tracking — mit Google
 * Consent Mode v2. WICHTIG: Standard ist „denied", d. h. VOR der Einwilligung
 * werden keine für Werbung nötigen Cookies gesetzt und Werbe-Identifikatoren
 * werden reduziert (ads_data_redaction). Erst wenn der Nutzer im Consent-Banner
 * zustimmt (components/analytics/Consent.tsx → gtag('consent','update')), darf
 * Google messen. Eine frühere Zustimmung wird aus localStorage übernommen.
 *
 * Nur im öffentlichen (site)-Layout eingebunden — der /admin-Bereich bekommt
 * kein Tracking.
 */
export function GoogleTag() {
  const id = site.googleTagId;
  if (!id) return null;

  return (
    <>
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('consent', 'default', {
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            analytics_storage: 'denied',
            wait_for_update: 500
          });
          gtag('set', 'ads_data_redaction', true);
          gtag('set', 'url_passthrough', true);
          try {
            if (localStorage.getItem('kh-consent') === 'granted') {
              gtag('consent', 'update', {
                ad_storage: 'granted',
                ad_user_data: 'granted',
                ad_personalization: 'granted',
                analytics_storage: 'granted'
              });
            }
          } catch (e) {}
          gtag('js', new Date());
          gtag('config', '${id}');
        `}
      </Script>
      <Script
        id="gtag-src"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
      />
    </>
  );
}
