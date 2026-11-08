import Link from "next/link";

/* ──────────────────────────────────────────────────────────────────────────
   The footer, shared by every page.

   Vision and mission are not pages of their own: they are sections of
   About us, so their links land on the anchors there.
   ────────────────────────────────────────────────────────────────────── */

const FOOTER_NAV = [
  { label: "About us", href: "/about-us/" },
  { label: "Our vision", href: "/about-us/#vision" },
  { label: "Our mission", href: "/about-us/#mission" },
  { label: "Our ventures", href: "/our-ventures/" },
  { label: "Our impact", href: "/our-impact/" },
  { label: "Contact", href: "/contact/" },
];

/* Supplied by the group, November 2026. The postal entry is a postcode
   (Port Harcourt), not a street address, so it is labelled as one. */
export const CONTACT = {
  email: "info@ekeregroup.org",
  phoneDisplay: "+234 (0)810 915 4135",
  phoneHref: "tel:+2348109154135",
  postcode: "500102",
};

/*
 * Held as a constant rather than read from `new Date()`. Next refuses to
 * prerender the current time, and a self-updating copyright year is not
 * worth making every page dynamic for. Bump it each January.
 */
const COPYRIGHT_YEAR = 2026;

const FOOTER_LEGAL = [
  { label: "Privacy", href: "/privacy/" },
  { label: "Terms", href: "/terms/" },
];

export function SiteFooter() {
  return (
    <footer className="night footer">
      <div className="shell">
        <div className="footer-grid">
          <div className="footer-mark">
            <p className="mark-word">Ekere Group</p>
            <p className="t-note">
              Port Harcourt · Rivers State
              <br />
              Federal Republic of Nigeria
            </p>
          </div>

          <nav className="footer-col footer-col--nav" aria-label="Footer">
            <p className="t-label">The group</p>
            <ul>
              {FOOTER_NAV.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer-col">
            <p className="t-label">Contact</p>
            <ul className="footer-contact">
              <li>
                <span className="t-label">Email</span>
                <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
              </li>
              <li>
                <span className="t-label">Telephone</span>
                <a href={CONTACT.phoneHref}>{CONTACT.phoneDisplay}</a>
              </li>
              <li>
                <span className="t-label">Postal code</span>
                <span className="footer-contact-value">
                  Port Harcourt {CONTACT.postcode}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-base">
          <p className="t-label">
            © {COPYRIGHT_YEAR} Ekere Group. All rights reserved.
          </p>
          <p className="t-label footer-legal">
            {FOOTER_LEGAL.map((item, index) => (
              <span key={item.href}>
                {index > 0 ? " · " : ""}
                <Link href={item.href}>{item.label}</Link>
              </span>
            ))}
          </p>
        </div>
      </div>
    </footer>
  );
}
