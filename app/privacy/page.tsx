import type { Metadata } from "next";
import { MessageReveal, TypewriterText } from "../../components/MotionText";
import { SiteFooter, SiteHeader } from "../../components/SiteChrome";

export const metadata: Metadata = {
  title: "Privacy Policy | Otis",
  description: "How the Otis landing page handles waitlist and website data.",
  openGraph: { title: "Privacy Policy | Otis", description: "How the Otis landing page handles waitlist and website data.", images: [] },
  twitter: { card: "summary", title: "Privacy Policy | Otis", description: "How the Otis landing page handles waitlist and website data.", images: [] },
};

export default function PrivacyPage() {
  return (
    <div className="privacy-page">
      <a className="skip-link" href="#main">Skip to content</a>
      <SiteHeader compact />
      <main className="policy-shell" id="main">
        <MessageReveal as="p" className="eyebrow"><span className="status-dot" /> Draft for launch review</MessageReveal>
        <TypewriterText as="h1" text="Privacy, in plain language." accent="plain language." />
        <MessageReveal as="p" className="policy-intro" delay={220}>This policy explains what the Otis landing page collects today, why it is collected, and the choices available to you.</MessageReveal>

        <div className="policy-notice"><strong>Legal details still to add</strong><p>The operating legal name, jurisdiction, postal address, and privacy contact will be added before the site is opened publicly. This draft does not invent them.</p></div>

        <section className="policy-content">
          <article><h2>1. What we collect</h2><p>If you join the waitlist, we collect the email address you submit, a normalized lowercase copy used to prevent duplicate signups, the form location, and the time of signup. The landing page may also receive ordinary technical request data from its hosting providers, such as an IP address, browser details, and security logs.</p></article>
          <article><h2>2. Why we collect it</h2><p>We use waitlist information to provide requested Otis launch updates, manage early access, prevent duplicate records, protect the site, and understand whether the signup flow is operating correctly.</p></article>
          <article><h2>3. Where it is processed</h2><p>The site is hosted through Vercel and OpenAI Sites environments. Waitlist records are stored in the database connected to the environment where you submit the form. Those providers may process technical data under their own service terms.</p></article>
          <article><h2>4. Sharing</h2><p>We do not sell waitlist information. Data may be handled by hosting, database, security, and infrastructure providers only as needed to operate the site or meet legal obligations.</p></article>
          <article><h2>5. Retention and deletion</h2><p>Waitlist records are kept while Otis is preparing and operating early access, unless they are no longer needed or deletion is requested. A precise retention period and request channel will be added with the final legal contact details.</p></article>
          <article><h2>6. Your choices</h2><p>You can choose not to join the waitlist. Any launch email must include an unsubscribe path. Access, correction, and deletion requests will be handled through the privacy contact published before public launch.</p></article>
          <article><h2>7. Children</h2><p>The waitlist is not intended for children, and Otis does not knowingly request personal information from children through this page.</p></article>
          <article><h2>8. Changes</h2><p>This policy will be updated as the site, product availability, and legal operating details change. The effective date will be added when the final policy is approved.</p></article>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
