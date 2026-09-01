type AnalyticsValue = string | number | boolean | undefined;

type AnalyticsPayload = Record<string, AnalyticsValue>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, AnalyticsValue>>;
    gtag?: (...args: unknown[]) => void;
  }
}

export function getCampaignContext() {
  const params = new URLSearchParams(window.location.search);
  return {
    source: params.get("utm_source") || undefined,
    medium: params.get("utm_medium") || undefined,
    campaign: params.get("utm_campaign") || undefined,
  };
}

export function trackEvent(event: string, payload: AnalyticsPayload = {}) {
  const entry = {
    event,
    page_path: window.location.pathname,
    timestamp: new Date().toISOString(),
    ...getCampaignContext(),
    ...payload,
  };
  window.dataLayer ??= [];
  window.dataLayer.push(entry);
  window.gtag?.("event", event, payload);
  window.dispatchEvent(new CustomEvent("ar1:analytics", { detail: entry }));
}
