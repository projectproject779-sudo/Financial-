import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render(path = "/", country, origin = "http://localhost") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const request = new Request(`${origin}${path}`, { headers: { accept: "text/html" } });
  if (country) Reflect.defineProperty(request, "cf", { value: { country } });

  return worker.fetch(
    request,
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the finished Numora homepage", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();
  assert.match(html, /<title>[^<]*Numora<\/title>/);
  assert.match(html, /Make your money/);
  assert.match(html, /Loan calculator/);
  assert.match(html, /Compound interest/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/i);
  assert.match(html, /<link rel="canonical" href="https:\/\/www\.nexusvault\.lat\/?"/);
});

test("consolidates alternate hosts on the primary production domain", async () => {
  const apex = await render("/calculators?category=debt", undefined, "https://nexusvault.lat");
  assert.equal(apex.status, 308);
  assert.equal(apex.headers.get("location"), "https://www.nexusvault.lat/calculators?category=debt");

  const workersDev = await render("/guides", undefined, "https://numora-money-tools.projectproject779.workers.dev");
  assert.equal(workersDev.status, 308);
  assert.equal(workersDev.headers.get("location"), "https://www.nexusvault.lat/guides");

  const adsFile = await render("/ads.txt", undefined, "https://nexusvault.lat");
  assert.equal(adsFile.status, 200);
});

test("renders internal navigation as document links", async () => {
  const response = await render();
  const html = await response.text();
  assert.match(html, /<a[^>]+href="\/calculators"[^>]*>Calculators<\/a>/);

  const headerSource = await readFile(
    new URL("../components/SiteHeader.tsx", import.meta.url),
    "utf8",
  );
  const safeLinkSource = await readFile(
    new URL("../components/SafeLink.tsx", import.meta.url),
    "utf8",
  );
  assert.match(headerSource, /components\/SafeLink/);
  assert.doesNotMatch(headerSource, /next\/link/);
  assert.match(safeLinkSource, /return <a [^>]*href=\{href\}>\{children\}<\/a>/);
});

test("publishes the generated stylesheet as a Cloudflare static asset", async () => {
  const config = JSON.parse(
    await readFile(new URL("../dist/server/wrangler.json", import.meta.url), "utf8"),
  );
  assert.equal(config.assets?.run_worker_first, false);

  const response = await render();
  const html = await response.text();
  const stylesheetHref = html.match(/<link[^>]+rel="stylesheet"[^>]+href="([^"]+\.css)"/)?.[1];
  assert.ok(stylesheetHref, "homepage must link its generated stylesheet");
  await access(new URL(`../dist/client${stylesheetHref}`, import.meta.url));
});

test("redirects a legacy calculator route to the canonical page", async () => {
  const legacyResponse = await render("/mortgage-calculator");
  assert.equal(legacyResponse.status, 308);
  assert.equal(legacyResponse.headers.get("location"), "/calculators/mortgage-payment");

  const response = await render("/calculators/mortgage-payment");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Mortgage payment calculator/);
  assert.match(html, /principal and interest/i);
});

test("server-renders the scalable calculator library and live model", async () => {
  const library = await render("/calculators");
  assert.equal(library.status, 200);
  const libraryHtml = await library.text();
  assert.match(libraryHtml, /24 free planning tools/i);
  assert.match(libraryHtml, /Debt payoff/);
  assert.match(libraryHtml, /FIRE number/);

  const calculator = await render("/calculators/credit-card-payoff");
  assert.equal(calculator.status, 200);
  const calculatorHtml = await calculator.text();
  assert.match(calculatorHtml, /Credit card payoff calculator/);
  assert.match(calculatorHtml, /Official sources/);
  assert.match(calculatorHtml, /Formula and assumptions disclosed/);
});

test("publishes local country context and in-depth guides", async () => {
  const country = await render("/countries/india");
  assert.equal(country.status, 200);
  assert.match(await country.text(), /Clearer money decisions in[\s\S]*India/);

  const guide = await render("/insights/compare-loans-by-total-cost");
  assert.equal(guide.status, 200);
  const guideHtml = await guide.text();
  assert.match(guideHtml, /like-for-like comparison/i);
  assert.match(guideHtml, /Shuxrat Asliddinov/);

  const seoGuide = await render("/insights/car-affordability-total-cost");
  assert.equal(seoGuide.status, 200);
  const seoGuideHtml = await seoGuide.text();
  assert.match(seoGuideHtml, /total ownership cost/i);
  assert.match(seoGuideHtml, /href="\/calculators\/auto-loan"/);
  assert.match(seoGuideHtml, /"about":\{"@type":"WebApplication"/);

  const calculator = await render("/calculators/auto-loan");
  assert.equal(calculator.status, 200);
  const calculatorHtml = await calculator.text();
  assert.match(calculatorHtml, /Guides for this calculator/);
  assert.match(calculatorHtml, /href="\/insights\/car-affordability-total-cost"/);

  const guideDirectory = await render("/guides");
  assert.equal(guideDirectory.status, 200);
  assert.match(await guideDirectory.text(), />23<\/strong>/);
});

test("publishes a transparent accountable founder profile", async () => {
  const response = await render("/authors/numora-editorial-team");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Shuxrat Asliddinov/);
  assert.match(html, /not as a licensed financial adviser/i);
});

test("publishes trust content and security headers", async () => {
  const response = await render("/methodology");
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("x-content-type-options"), "nosniff");
  assert.equal(response.headers.get("x-frame-options"), "SAMEORIGIN");
  const html = await response.text();
  assert.match(html, /How Numora calculations work/);
  assert.match(html, /fixed-rate amortization formula/);
});

test("fails advertising closed when region is unknown and allows a standard region", async () => {
  const unknownRegion = await render("/methodology");
  assert.match(unknownRegion.headers.get("set-cookie") ?? "", /numora-ad-region=restricted/);
  assert.match(unknownRegion.headers.get("vary") ?? "", /CF-IPCountry/i);

  const standardRegion = await render("/methodology", "US");
  assert.match(standardRegion.headers.get("set-cookie") ?? "", /numora-ad-region=standard/);

  const regulatedRegion = await render("/methodology", "GB");
  assert.match(regulatedRegion.headers.get("set-cookie") ?? "", /numora-ad-region=restricted/);
});

test("serves crawler discovery files", async () => {
  const robotsResponse = await render("/robots.txt");
  assert.equal(robotsResponse.status, 200);
  const robots = await robotsResponse.text();
  assert.match(robots, /Allow: \//);
  assert.match(robots, /Host: https:\/\/www\.nexusvault\.lat/);
  assert.match(robots, /Sitemap: https:\/\/www\.nexusvault\.lat\/sitemap\.xml/);

  const sitemapResponse = await render("/sitemap.xml");
  assert.equal(sitemapResponse.status, 200);
  const sitemap = await sitemapResponse.text();
  assert.match(sitemap, /<loc>https:\/\/www\.nexusvault\.lat\//);
  assert.doesNotMatch(sitemap, /localhost|workers\.dev|vercel\.app/);
  assert.match(sitemap, /\/calculators\/loan-payment/);
  assert.doesNotMatch(sitemap, /<loc>[^<]*\/loan-calculator<\/loc>/);
  assert.match(sitemap, /\/methodology/);
  assert.match(sitemap, /\/calculators\/fire-number/);
  assert.match(sitemap, /\/countries\/australia/);
  assert.match(sitemap, /\/insights\/inflation-and-real-returns/);
  assert.match(sitemap, /\/insights\/car-affordability-total-cost/);
  assert.match(sitemap, /\/insights\/fire-number-assumptions/);
  assert.equal((sitemap.match(/<url>/g) ?? []).length, 65);

  const adsResponse = await render("/ads.txt");
  assert.equal(adsResponse.status, 200);
  assert.match(adsResponse.headers.get("content-type") ?? "", /^text\/plain\b/i);
  assert.match(adsResponse.headers.get("cache-control") ?? "", /no-store/i);
  assert.match(await adsResponse.text(), /Advertising is not enabled/);
});
