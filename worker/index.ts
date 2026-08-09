/** Cloudflare Worker entry point for Numora. */
import handler from "vinext/server/app-router-entry";

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
}

const RESTRICTED_AD_REGIONS = new Set([
  "AT", "BE", "BG", "CH", "CY", "CZ", "DE", "DK", "EE", "ES", "FI", "FR", "GB", "GR", "HR", "HU",
  "IE", "IS", "IT", "LI", "LT", "LU", "LV", "MT", "NL", "NO", "PL", "PT", "RO", "SE", "SI", "SK",
]);

const PRIMARY_ORIGIN = "https://www.nexusvault.lat";
const ALTERNATE_HOSTS = new Set([
  "nexusvault.lat",
  "numora-money-tools.projectproject779.workers.dev",
]);

function getCanonicalRedirect(request: Request): Response | undefined {
  const url = new URL(request.url);
  const isApexAdsFile = url.hostname === "nexusvault.lat" && url.pathname === "/ads.txt";
  const needsCanonicalHost = ALTERNATE_HOSTS.has(url.hostname) && !isApexAdsFile;
  const needsHttps = url.hostname === "www.nexusvault.lat" && url.protocol !== "https:";

  if (!needsCanonicalHost && !needsHttps) return undefined;

  const canonicalUrl = new URL(`${url.pathname}${url.search}`, PRIMARY_ORIGIN);
  return Response.redirect(canonicalUrl.toString(), 308);
}

function getRequestCountry(request: Request): string | undefined {
  const cloudflareProperties: unknown = Reflect.get(request, "cf");
  if (typeof cloudflareProperties !== "object" || cloudflareProperties === null || !("country" in cloudflareProperties)) return undefined;
  const country = cloudflareProperties.country;
  return typeof country === "string" ? country.toUpperCase() : undefined;
}

const worker = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const redirect = getCanonicalRedirect(request);
    if (redirect) return withSecurityHeaders(redirect, request);

    const response = await handler.fetch(request, env, ctx);
    return withSecurityHeaders(response, request);
  },
};

function withSecurityHeaders(response: Response, request: Request): Response {
  const headers = new Headers(response.headers);
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("X-Frame-Options", "SAMEORIGIN");
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=(), payment=()");
  if (new URL(request.url).protocol === "https:") {
    headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  }
  if ((headers.get("Content-Type") ?? "").toLowerCase().startsWith("text/html")) {
    const country = getRequestCountry(request);
    const adRegion = country && !RESTRICTED_AD_REGIONS.has(country) ? "standard" : "restricted";
    headers.append("Set-Cookie", `numora-ad-region=${adRegion}; Max-Age=2592000; Path=/; SameSite=Lax; Secure`);
    headers.append("Vary", "CF-IPCountry");
  }
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
}

export default worker;
