import type { MetadataRoute } from "next";
import { headers } from "next/headers";
import { calculators } from "../lib/calculators";
import { countries } from "../lib/countries";
import { guides } from "../lib/guides";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const incomingHeaders = await headers();
  const host = incomingHeaders.get("x-forwarded-host") ?? incomingHeaders.get("host") ?? "localhost:3000";
  const protocol = incomingHeaders.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  const base = `${protocol}://${host}`;
  const core = ["", "/calculators", "/countries", "/guides", "/loan-calculator", "/mortgage-calculator", "/compound-interest-calculator", "/savings-goal-calculator", "/investment-return-calculator", "/guides/apr-vs-interest-rate", "/guides/compound-interest", "/guides/savings-goals", "/about", "/methodology", "/editorial-policy", "/authors/numora-editorial-team", "/sources", "/corrections", "/partners", "/privacy", "/terms"];
  const routes = [...core, ...calculators.map(({ slug }) => `/calculators/${slug}`), ...countries.map(({ slug }) => `/countries/${slug}`), ...guides.map(({ slug }) => `/insights/${slug}`)];
  return routes.map((route, index) => ({ url: `${base}${route}`, lastModified: new Date("2026-08-09"), changeFrequency: index < 4 ? "weekly" : "monthly", priority: index === 0 ? 1 : index < 4 ? .9 : route.startsWith("/calculators/") ? .85 : .65 }));
}
