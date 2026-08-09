import type { MetadataRoute } from "next";
import { calculators } from "../lib/calculators";
import { countries } from "../lib/countries";
import { guides } from "../lib/guides";
import { absoluteUrl } from "../lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const core = ["", "/calculators", "/countries", "/guides", "/guides/apr-vs-interest-rate", "/guides/compound-interest", "/guides/savings-goals", "/about", "/methodology", "/editorial-policy", "/authors/numora-editorial-team", "/sources", "/corrections", "/partners", "/privacy", "/terms"];
  const routes = [...core, ...calculators.map(({ slug }) => `/calculators/${slug}`), ...countries.map(({ slug }) => `/countries/${slug}`), ...guides.map(({ slug }) => `/insights/${slug}`)];
  return routes.map((route, index) => ({ url: absoluteUrl(route || "/"), lastModified: new Date("2026-08-09"), changeFrequency: index < 4 ? "weekly" : "monthly", priority: index === 0 ? 1 : index < 4 ? .9 : route.startsWith("/calculators/") ? .85 : .65 }));
}
