// Utilities for generating URL-friendly slugs and tracking links

/**
 * Convert an arbitrary string to a URL-friendly slug.
 * Examples:
 *  - "DXB-LHR Flight 789" -> "dxb-lhr-flight-789"
 *  - "Dubai to London" -> "dubai-to-london"
 */
export function createUrlSlug(text) {
  if (!text) return "";
  return String(text)
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '');
}

/**
 * Build a tracking URL given a base and a flight name
 * Example: buildTrackUrl('https://yoursite.com/track', 'DXB-LHR Flight 789')
 *  -> 'https://yoursite.com/track/dxb-lhr-flight-789'
 */
export function buildTrackUrl(baseUrl, flightName) {
  const base = baseUrl?.replace(/\/$/, '') || '';
  const slug = createUrlSlug(flightName);
  return `${base}/${slug}`;
}


