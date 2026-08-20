"use client";

import Link from "next/link";
import { MouseEvent, ReactNode } from "react";
import { useRouter } from "next/navigation";

type ViewTransitionDocument = Document & {
  startViewTransition?: (update: () => void) => { finished: Promise<void> };
};

export function startBubbleNavigation(
  event: MouseEvent<HTMLElement>,
  href: string,
  push: (href: string) => void,
) {
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  const rect = event.currentTarget.getBoundingClientRect();
  const x = event.clientX || rect.left + rect.width / 2;
  const y = event.clientY || rect.top + rect.height / 2;
  const root = document.documentElement;
  root.style.setProperty("--transition-x", `${x}px`);
  root.style.setProperty("--transition-y", `${y}px`);
  const transitionDocument = document as ViewTransitionDocument;
  if (transitionDocument.startViewTransition) {
    transitionDocument.startViewTransition(() => push(href));
  } else if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    push(href);
  } else {
    root.classList.remove("bubble-transitioning");
    void root.offsetWidth;
    root.classList.add("bubble-transitioning");
    window.setTimeout(() => {
      push(href);
      window.setTimeout(() => root.classList.remove("bubble-transitioning"), 480);
    }, 260);
  }
}

export default function BubbleLink({
  href,
  className = "",
  children,
  ariaLabel,
}: {
  href: string;
  className?: string;
  children: ReactNode;
  ariaLabel?: string;
}) {
  const router = useRouter();
  return (
    <Link
      href={href}
      className={className}
      aria-label={ariaLabel}
      onClick={(event) => startBubbleNavigation(event, href, router.push)}
    >
      {children}
    </Link>
  );
}
