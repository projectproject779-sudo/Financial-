import type { AnchorHTMLAttributes } from "react";

type SafeLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string;
};

/**
 * A normal document link. Vinext's current client router can fail to handle
 * Next Link clicks in production, while the server-rendered routes are valid.
 */
export default function SafeLink({ href, children, ...props }: SafeLinkProps) {
  return <a {...props} href={href}>{children}</a>;
}
