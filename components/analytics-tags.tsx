import Script from 'next/script'

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID
const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID
const GOOGLE_ADS_WHATSAPP_LABEL = process.env.NEXT_PUBLIC_GOOGLE_ADS_WHATSAPP_LABEL

export function AnalyticsTags() {
  return (
    <>
      {GTM_ID && (
        <>
          <Script id="gtm-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
            `}
          </Script>
          <Script
            id="gtm-loader"
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`}
          />
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
              title="Google Tag Manager"
            />
          </noscript>
        </>
      )}

      {GOOGLE_ADS_ID && (
        <>
          <Script id="google-ads-gtag" strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`} />
          <Script id="google-ads-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GOOGLE_ADS_ID}');
              window.addEventListener('whatsapp_conversion', function () {
                ${GOOGLE_ADS_WHATSAPP_LABEL ? `gtag('event', 'conversion', { send_to: '${GOOGLE_ADS_ID}/${GOOGLE_ADS_WHATSAPP_LABEL}' });` : ''}
              });
            `}
          </Script>
        </>
      )}
    </>
  )
}
