import Link from "@/components/SafeLink";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";

export default function NotFound() {
  return <><SiteHeader /><main className="content-page" id="main-content"><div className="shell content-page-inner"><p className="eyebrow">404</p><h1>That page does not add up.</h1><p className="lede">The link may be outdated, but your next calculation is one click away.</p><p><Link className="button primary" href="/">Back to Numora →</Link></p></div></main><SiteFooter /></>;
}
