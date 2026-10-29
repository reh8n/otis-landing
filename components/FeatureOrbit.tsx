"use client";

import { useEffect, useRef, useSyncExternalStore, type ReactNode } from "react";

type Tile = { id: string; href?: string; kicker: string; title: string; copy: string; color: string; icon: ReactNode };

const icon = (d: string) => (
  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
    <path d={d} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const tiles: Tile[] = [
  { id: "sessions", href: "#sessions", kicker: "Isolated sessions", title: "Own worktree, branch and port", copy: "Ten agents in parallel, none in your checkout.", color: "#3d95ff", icon: icon("M6 3v12M18 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM18 9a9 9 0 0 1-9 9") },
  { id: "rooms", href: "#rooms", kicker: "Rooms and seats", title: "Claude Code and Codex, one room", copy: "Permissions live on the seat, not the agent.", color: "#8b7dff", icon: icon("M4 9h16M4 15h16M10 3 8 21M16 3l-2 18") },
  { id: "questions", href: "#inbox", kicker: "Questions tray", title: "Every question in one place", copy: "Grouped by who asks. Answer them all at once.", color: "#3dd6d0", icon: icon("M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3M12 17h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z") },
  { id: "inbox", href: "#inbox", kicker: "Needs You", title: "One queue across projects", copy: "Approvals, reviews and failed checks, never buried.", color: "#f5b33d", icon: icon("M22 12h-6l-2 3h-4l-2-3H2M5.5 5.1 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.5-6.9A2 2 0 0 0 16.8 4H7.2a2 2 0 0 0-1.7 1.1Z") },
  { id: "office", href: "#office", kicker: "Coding Mode", title: "A 3D office for your fleet", copy: "Editor, room and office in one window.", color: "#ff6b9a", icon: icon("M3 21h18M5 21V8l7-5 7 5v13M9 21v-6h6v6") },
  { id: "review", href: "#review", kicker: "Patch review", title: "Hunk by hunk, with checkpoints", copy: "Every change waits for you. Stale ones are refused.", color: "#3dd68c", icon: icon("M9 11l3 3 8-8M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h9") },
  { id: "workflows", href: "#workflows", kicker: "Workflows", title: "A room and office per workflow", copy: "On a throwaway branch, if you like.", color: "#d76bff", icon: icon("M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM17 14v6M14 17h6") },
  { id: "dashboard", kicker: "Agent dashboard", title: "Queue tasks, see the spend", copy: "Overview, activity, analytics and memory.", color: "#5b8cff", icon: icon("M3 3v18h18M7 15l4-4 3 3 5-6") },
  { id: "tools", kicker: "Custom tools", title: "Agents build the tools they need", copy: "Describe one; it appears and reloads as they work.", color: "#ff9f43", icon: icon("M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.4-.6-.6-2.4Z") },
];

const clamp = (v: number) => Math.min(1, Math.max(0, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

// Where each tile starts, far behind the screen. Fixed so server and client agree.
const starts = tiles.map((_, i) => {
  const a = (i / tiles.length) * Math.PI * 2 + 0.6;
  return { x: Math.cos(a) * 900, y: Math.sin(a) * 600, z: -2600 - i * 260, rx: i % 2 ? 50 : -40, ry: i % 3 ? -65 : 55 };
});

const reducedMotion = "(prefers-reduced-motion: reduce)";
const motionAllowed = () => !window.matchMedia(reducedMotion).matches;
const subscribeMotion = (onChange: () => void) => {
  const query = window.matchMedia(reducedMotion);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};

export default function FeatureOrbit() {
  const rootRef = useRef<HTMLElement>(null);
  const fieldRef = useRef<HTMLDivElement>(null);
  const tileRefs = useRef<(HTMLElement | null)[]>([]);
  // Static grid on the server and for reduced motion; the scroll show only runs live.
  const live = useSyncExternalStore(subscribeMotion, motionAllowed, () => false);

  useEffect(() => {
    if (!live) return;
    const root = rootRef.current!;
    const field = fieldRef.current!;
    let frame = 0;
    let size = { w: 0, h: 0, cols: 3, rows: 2, tile: 220, gap: 20, radius: 260 };

    const measure = () => {
      const w = field.clientWidth;
      const h = field.clientHeight;
      const cols = 3;
      const rows = Math.ceil(tiles.length / cols);
      const gap = w < 640 ? 10 : 16;
      const tile = Math.floor(Math.min(230, (w - gap * (cols - 1)) / cols, (h - gap * (rows - 1)) / rows));
      // Keep the whole ring, tiles included, inside the field.
      const radius = Math.max(60, Math.min(w, h) / 2 - tile * 0.46);
      size = { w, h, cols, rows, tile, gap, radius };
      root.style.setProperty("--tile", `${tile}px`);
      root.dataset.size = tile < 140 ? "tiny" : tile < 185 ? "compact" : "full";
    };

    const render = () => {
      frame = 0;
      const rect = root.getBoundingClientRect();
      const travel = rect.height - window.innerHeight;
      const p = clamp(-rect.top / Math.max(1, travel));
      const { cols, rows, tile, gap, radius } = size;
      const circleScale = Math.min(1, (radius * 2 * Math.PI) / tiles.length / tile) * 0.82;
      const spin = ease(clamp((p - 0.22) / 0.4)) * Math.PI * 1.5;
      const settle = ease(clamp((p - 0.6) / 0.3));

      tileRefs.current.forEach((el, i) => {
        if (!el) return;
        const fly = ease(clamp((p - i * 0.03) / 0.26));
        const s = starts[i];
        const theta = (i / tiles.length) * Math.PI * 2 - Math.PI / 2 + spin + (1 - fly) * 1.2;
        const cx = Math.cos(theta) * radius;
        const cy = Math.sin(theta) * radius;
        const gx = ((i % cols) - (cols - 1) / 2) * (tile + gap);
        const gy = (Math.floor(i / cols) - (rows - 1) / 2) * (tile + gap);

        const x = lerp(lerp(s.x, cx, fly), gx, settle);
        const y = lerp(lerp(s.y, cy, fly), gy, settle);
        const z = lerp(s.z, 0, fly);
        const rx = lerp(s.rx, 0, fly);
        const ry = lerp(s.ry, 0, fly);
        const rz = lerp(Math.sin(theta) * 10 * fly, 0, settle);
        const scale = lerp(circleScale, 1, settle);

        el.style.transform = `translate3d(${x}px, ${y}px, ${z}px) rotateX(${rx}deg) rotateY(${ry}deg) rotateZ(${rz}deg) scale(${scale})`;
        el.style.opacity = String(clamp(fly * 1.4));
        el.style.filter = fly < 1 ? `blur(${(1 - fly) * 8}px)` : "";
        el.classList.toggle("is-settled", settle > 0.98);
      });
      root.style.setProperty("--settle", settle.toFixed(3));
      root.style.setProperty("--spin", `${(spin * 180) / Math.PI}deg`);
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };
    const onResize = () => {
      measure();
      schedule();
    };

    measure();
    render();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(frame);
    };
  }, [live]);

  return (
    <section ref={rootRef} className={`orbit${live ? " is-live" : ""}`} id="features" aria-labelledby="orbit-title">
      <div className="orbit-sticky">
        <div className="orbit-head wrap">
          <p className="kicker">Features</p>
          <h2 id="orbit-title">Everything a fleet needs, in one app.</h2>
        </div>
        <div className="orbit-field" ref={fieldRef}>
          <div className="orbit-ring" aria-hidden="true" />
          <ul className="orbit-tiles">
            {tiles.map((t, i) => (
              <li key={t.id}>
                {(() => {
                  const Tag = t.href ? "a" : "div";
                  return (
                    <Tag
                      href={t.href}
                      className="orbit-tile"
                      ref={(el: HTMLElement | null) => {
                        tileRefs.current[i] = el;
                      }}
                      style={{ ["--c" as string]: t.color }}
                    >
                      <span className="orbit-icon">{t.icon}</span>
                      <span className="orbit-kicker">{t.kicker}</span>
                      <strong>{t.title}</strong>
                      <span className="orbit-copy">{t.copy}</span>
                    </Tag>
                  );
                })()}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
