import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import BubbleLink from "../../components/BubbleLink";
import { MessageReveal, TypewriterText } from "../../components/MotionText";
import { SiteFooter, SiteHeader } from "../../components/SiteChrome";
import { getProduct, products } from "../../lib/products";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  const title = `${product.name} | Otis`;
  const description = product.summary;
  return {
    title,
    description,
    openGraph: { title, description, type: "website", images: [] },
    twitter: { card: "summary", title, description, images: [] },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  return (
    <div className={`product-detail product-detail--${product.className}`}>
      <a className="skip-link" href="#main">Skip to content</a>
      <SiteHeader compact />
      <main id="main" className="product-detail__main">
        <section className="product-detail__hero">
          <MessageReveal as="p" className="eyebrow product-detail__eyebrow"><span className="status-dot" /> {product.index} · {product.label}</MessageReveal>
          <TypewriterText as="h1" text={product.name} accent={product.shortName} />
          <MessageReveal as="p" className="product-detail__promise" delay={220}>{product.promise}</MessageReveal>
          <MessageReveal className="product-detail__actions" delay={360}>
            <Link className="header-cta" href="/#waitlist">Join early access <span aria-hidden="true">↗</span></Link>
            <Link className="text-link" href="#roadmap">See the roadmap <span aria-hidden="true">↓</span></Link>
          </MessageReveal>
          <div className="product-detail__orb" aria-hidden="true"><span>{product.index}</span><strong>{product.shortName}</strong><small>{product.screen}</small></div>
        </section>

        <section className="detail-section">
          <MessageReveal as="p" className="section-kicker">What it does</MessageReveal>
          <TypewriterText text={"Focused by design.\nConnected by Otis."} />
          <div className="detail-grid">
            {product.capabilities.map((capability, index) => (
              <MessageReveal as="article" className="detail-card" delay={index * 90} key={capability.title}>
                <span>0{index + 1}</span><h3>{capability.title}</h3><p>{capability.copy}</p>
              </MessageReveal>
            ))}
          </div>
        </section>

        <section className="roadmap-section" id="roadmap">
          <div className="roadmap-heading"><MessageReveal as="p" className="section-kicker">On the roadmap</MessageReveal><TypewriterText text="What comes next." /></div>
          <div className="roadmap-list">
            {product.upcoming.map((feature, index) => (
              <MessageReveal as="article" delay={index * 100} key={feature.title}>
                <span>0{index + 1}</span><div><h3>{feature.title}</h3><p>{feature.copy}</p></div><small>{feature.status ?? "Planned"}</small>
              </MessageReveal>
            ))}
          </div>
        </section>

        <section className="next-product">
          <MessageReveal><p className="section-kicker">Keep exploring</p><h2>See how the rest of Otis fits together.</h2></MessageReveal>
          <div className="next-product__links">
            {products.filter((item) => item.slug !== product.slug).map((item) => (
              <BubbleLink className="next-product__card shine-link" href={`/${item.slug}`} key={item.slug}>
                <span className="card-shine" aria-hidden="true" /><small>{item.index}</small><strong>{item.name}</strong><span>{item.orbitCopy} ↗</span>
              </BubbleLink>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
