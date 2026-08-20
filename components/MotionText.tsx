"use client";

import { CSSProperties, ElementType, ReactNode, useEffect, useRef, useState } from "react";

export function TypewriterText({
  as = "h2",
  text,
  accent,
  className = "",
  id,
}: {
  as?: "h1" | "h2";
  text: string;
  accent?: string;
  className?: string;
  id?: string;
}) {
  const Tag = as;
  const accentStart = accent ? text.lastIndexOf(accent) : -1;
  const tokens = Array.from(text.matchAll(/\n| +|[^\n ]+/g), (match) => ({ token: match[0], index: match.index }));
  const ref = useRef<HTMLHeadingElement | null>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const Observer = (window as Window & { IntersectionObserver?: typeof IntersectionObserver }).IntersectionObserver;
    if (!Observer) {
      const fallback = setTimeout(() => setStarted(true), 0);
      return () => clearTimeout(fallback);
    }
    const observer = new Observer(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setStarted(true);
        observer.disconnect();
      },
      { threshold: 0.18 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag id={id} ref={ref} className={`typewriter-text${started ? " is-typing" : ""} ${className}`.trim()} aria-label={text.replaceAll("\n", " ")}>
      <span aria-hidden="true">
        {tokens.map(({ token, index: startIndex }, tokenIndex) => {
          if (token === "\n") {
            return <br key={`break-${tokenIndex}`} />;
          }
          if (/^ +$/.test(token)) {
            return <span className="type-space" key={`space-${tokenIndex}`}>{token}</span>;
          }
          return (
            <span className="type-word" key={`${token}-${tokenIndex}`}>
              {Array.from(token).map((character, localIndex) => {
                const index = startIndex + localIndex;
                return (
                  <span
                    className={`type-char${accentStart >= 0 && index >= accentStart ? " type-char--accent" : ""}`}
                    style={{ "--char-index": index } as CSSProperties}
                    key={`${character}-${index}`}
                  >
                    {character}
                  </span>
                );
              })}
            </span>
          );
        })}
        <span className="type-caret" />
      </span>
    </Tag>
  );
}

export function MessageReveal({
  as = "div",
  children,
  className = "",
  delay = 0,
  ariaLabel,
}: {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  delay?: number;
  ariaLabel?: string;
}) {
  const Tag = as;
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const Observer = (window as Window & { IntersectionObserver?: typeof IntersectionObserver }).IntersectionObserver;
    if (!Observer) {
      const fallback = setTimeout(() => setVisible(true), 0);
      return () => clearTimeout(fallback);
    }
    const observer = new Observer(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setVisible(true);
        observer.disconnect();
      },
      { threshold: 0.16 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`message-reveal${visible ? " is-visible" : ""} ${className}`.trim()}
      style={{ "--message-delay": `${delay}ms` } as CSSProperties}
      aria-label={ariaLabel}
    >
      {children}
    </Tag>
  );
}
