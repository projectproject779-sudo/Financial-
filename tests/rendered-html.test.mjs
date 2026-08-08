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
});
