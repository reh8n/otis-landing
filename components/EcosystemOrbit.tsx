"use client";

import Link from "next/link";
import { CSSProperties, MouseEvent, PointerEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { products } from "../lib/products";
import { startBubbleNavigation } from "./BubbleLink";

type Offset = { x: number; y: number };
type DragState = { slug: string; startX: number; startY: number } | null;

const EMPTY_OFFSETS = Object.fromEntries(products.map((product) => [product.slug, { x: 0, y: 0 }])) as Record<string, Offset>;

function concernFromOffset(offset: Offset) {
  return Math.min(1, Math.hypot(offset.x, offset.y) / 190);
}

export default function EcosystemOrbit() {
  const router = useRouter();
  const [offsets, setOffsets] = useState<Record<string, Offset>>(EMPTY_OFFSETS);
  const [dragging, setDragging] = useState<DragState>(null);
  const [springing, setSpringing] = useState<string | null>(null);
  const [worry, setWorry] = useState(0);
  const draggedRef = useRef(false);
  const springTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (springTimer.current) clearTimeout(springTimer.current);
  }, []);

  function startDrag(event: PointerEvent<HTMLAnchorElement>, slug: string) {
    if (event.button !== 0) return;
    if (springTimer.current) clearTimeout(springTimer.current);
    draggedRef.current = false;
    setSpringing(null);
    setDragging({ slug, startX: event.clientX - offsets[slug].x, startY: event.clientY - offsets[slug].y });
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function moveDrag(event: PointerEvent<HTMLAnchorElement>, slug: string) {
    if (!dragging || dragging.slug !== slug) return;
    const next = { x: event.clientX - dragging.startX, y: event.clientY - dragging.startY };
    if (Math.hypot(next.x, next.y) > 5) draggedRef.current = true;
    setOffsets((current) => ({ ...current, [slug]: next }));
    setWorry(concernFromOffset(next));
  }

  function releaseDrag(event: PointerEvent<HTMLAnchorElement>, slug: string) {
    if (!dragging || dragging.slug !== slug) return;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    setDragging(null);
    setSpringing(slug);
    setOffsets((current) => ({ ...current, [slug]: { x: 0, y: 0 } }));
    setWorry(0);
    springTimer.current = setTimeout(() => setSpringing(null), 920);
  }

  function openProduct(event: MouseEvent<HTMLAnchorElement>, href: string) {
    if (draggedRef.current) {
      event.preventDefault();
      draggedRef.current = false;
      return;
    }
    startBubbleNavigation(event, href, router.push);
  }

  const mood = worry > 0.72 ? "very worried" : worry > 0.35 ? "concerned" : worry > 0.05 ? "watchful" : "calm";

  return (
    <div className="ecosystem-orbit" aria-label="The Otis product ecosystem">
      <div className="orbit-line orbit-line--one" aria-hidden="true" />
      <div className="orbit-line orbit-line--two" aria-hidden="true" />
      <div className="orbit-core">
        <div
          className={`otis-mood-face${worry > 0.72 ? " is-very-worried" : ""}`}
          style={{ "--worry": worry } as CSSProperties}
          role="img"
          aria-label={`Otis looks ${mood}`}
        >
          <span className="mood-brow mood-brow--left" />
          <span className="mood-brow mood-brow--right" />
          <span className="mood-eye mood-eye--left" />
          <span className="mood-eye mood-eye--right" />
          <span className="mood-nose" />
          <span className="mood-mouth mood-mouth--smile" />
          <span className="mood-mouth mood-mouth--frown" />
        </div>
        <span>Otis</span>
        <small>{worry > 0.72 ? "Please bring that one back" : worry > 0.35 ? "Keeping an eye on it" : "Your intelligent operating layer"}</small>
      </div>

      {products.map((product) => {
        const offset = offsets[product.slug];
        const isDragging = dragging?.slug === product.slug;
        return (
          <Link
            href={`/${product.slug}`}
            draggable={false}
            key={product.slug}
            className={`orbit-card orbit-card--${product.className}${isDragging ? " is-dragging" : ""}${springing === product.slug ? " is-springing" : ""}`}
            style={{ "--drag-x": `${offset.x}px`, "--drag-y": `${offset.y}px` } as CSSProperties}
            onPointerDown={(event) => startDrag(event, product.slug)}
            onPointerMove={(event) => moveDrag(event, product.slug)}
            onPointerUp={(event) => releaseDrag(event, product.slug)}
            onPointerCancel={(event) => releaseDrag(event, product.slug)}
            onDragStart={(event) => event.preventDefault()}
            onClick={(event) => openProduct(event, `/${product.slug}`)}
            aria-label={`Explore ${product.name}. Drag to stretch the bubble, or click to open.`}
          >
            <span className="orbit-card__float">
              <span className="card-shine" aria-hidden="true" />
              <i>{product.index}</i>
              <span>{product.shortName}</span>
              <small>{product.orbitCopy}</small>
            </span>
          </Link>
        );
      })}
      <p className="orbit-hint">Drag a product bubble. Otis is watching.</p>
    </div>
  );
}
