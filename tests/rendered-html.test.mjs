import assert from "node:assert/strict";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the finished Numora homepage", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();
  assert.match(html, /<title>Numora/);
  assert.match(html, /Make your money/);
  assert.match(html, /Loan calculator/);
  assert.match(html, /Compound interest/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/i);
});

test("server-renders a dedicated calculator route", async () => {
  const response = await render("/mortgage-calculator");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Mortgage calculator/);
  assert.match(html, /Plan a home purchase/);
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
  assert.match(guideHtml, /Numora Editorial Team/);
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

test("serves crawler discovery files", async () => {
  const robotsResponse = await render("/robots.txt");
  assert.equal(robotsResponse.status, 200);
  const robots = await robotsResponse.text();
  assert.match(robots, /Allow: \//);
  assert.match(robots, /Sitemap: http:\/\/localhost:3000\/sitemap\.xml/);

  const sitemapResponse = await render("/sitemap.xml");
  assert.equal(sitemapResponse.status, 200);
  const sitemap = await sitemapResponse.text();
  assert.match(sitemap, /\/loan-calculator/);
  assert.match(sitemap, /\/methodology/);
  assert.match(sitemap, /\/calculators\/fire-number/);
  assert.match(sitemap, /\/countries\/australia/);
  assert.match(sitemap, /\/insights\/inflation-and-real-returns/);
});
