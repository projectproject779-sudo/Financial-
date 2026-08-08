import type { MetadataRoute } from "next";
import { headers } from "next/headers";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const incomingHeaders = await headers();
  const host = incomingHeaders.get("x-forwarded-host") ?? incomingHeaders.get("host") ?? "localhost:3000";
  const protocol = incomingHeaders.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  const base = `${protocol}://${host}`;
  const routes = ["", "/loan-calculator", "/mortgage-calculator", "/compound-interest-calculator", "/savings-goal-calculator", "/investment-return-calculator", "/guides/apr-vs-interest-rate", "/guides/compound-interest", "/guides/savings-goals", "/about", "/methodology", "/privacy", "/terms"];
  return routes.map((route, index) => ({ url: `${base}${route}`, changeFrequency: index < 6 ? "weekly" : "monthly", priority: index === 0 ? 1 : index < 6 ? .9 : .6 }));
}
