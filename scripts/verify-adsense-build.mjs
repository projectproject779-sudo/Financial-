import assert from "node:assert/strict";

const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "";
const slot = process.env.NEXT_PUBLIC_ADSENSE_SLOT ?? "";

assert.match(client, /^ca-pub-\d{16}$/, "production AdSense client is missing or invalid");
assert.match(slot, /^\d{10}$/, "production AdSense slot is missing or invalid");

const workerUrl = new URL("../dist/server/index.js", import.meta.url);
workerUrl.searchParams.set("verify-adsense", `${process.pid}-${Date.now()}`);
const { default: worker } = await import(workerUrl.href);

async function render(path) {
  const request = new Request(`https://numora.example${path}`, {
    headers: { accept: "text/html" },
  });
  Reflect.defineProperty(request, "cf", { value: { country: "US" } });
  return worker.fetch(
    request,
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

const adsResponse = await render("/ads.txt");
assert.equal(adsResponse.status, 200);
assert.match(await adsResponse.text(), new RegExp(`google\\.com, ${client.replace("ca-", "")}, DIRECT`));

const pageResponse = await render("/calculators/loan-payment");
assert.equal(pageResponse.status, 200);
const pageHtml = await pageResponse.text();
assert.match(pageHtml, new RegExp(`google-adsense-account[^>]+${client}`));
assert.match(pageHtml, new RegExp(slot));

console.log("AdSense production build verified.");
