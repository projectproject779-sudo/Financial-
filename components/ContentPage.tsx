import type { ReactNode } from "react";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

export function ContentPage({ eyebrow, title, lede, children }: { eyebrow: string; title: string; lede?: string; children: ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main className="content-page" id="main-content">
        <article className="shell content-page-inner">
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          {lede && <p className="lede">{lede}</p>}
          {children}
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
