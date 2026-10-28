"use client";

import { useEffect, useState } from "react";
import { launchVideo } from "../lib/site";

type Frame = {
  id: string;
  label: string;
  caption: string;
  light: string;
  dark?: string;
  width: number;
  height: number;
};

const frames: Frame[] = [
  {
    id: "agents",
    label: "Agents",
    caption: "Every agent, its branch, its port and its checks on one screen.",
    light: "/product/agents-full",
    dark: "/product/agents-full-dark",
    width: 1800,
    height: 1154,
  },
  {
    id: "rooms",
    label: "Rooms",
    caption: "A room of agents working one problem. @mention who should answer.",
    light: "/product/agent-chat",
    width: 1800,
    height: 1154,
  },
  {
    id: "ports",
    label: "Ports",
    caption: "One house per port. See who is running where, and evacuate in a click.",
    light: "/product/neighborhood",
    dark: "/product/neighborhood-dark",
    width: 1800,
    height: 819,
  },
];

const intervalMs = 5200;

function Shot({ frame, eager }: { frame: Frame; eager: boolean }) {
  return (
    <picture>
      {frame.dark ? (
        <source
          media="(prefers-color-scheme: dark)"
          srcSet={`${frame.dark}-960.jpg 960w, ${frame.dark}.jpg 1800w`}
          sizes="(max-width: 1180px) 100vw, 1120px"
        />
      ) : null}
      <img
        src={`${frame.light}.jpg`}
        srcSet={`${frame.light}-960.jpg 960w, ${frame.light}.jpg 1800w`}
        sizes="(max-width: 1180px) 100vw, 1120px"
        width={frame.width}
        height={frame.height}
        alt={`Otis IDE ${frame.label} screen. ${frame.caption}`}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={eager ? "high" : "auto"}
      />
    </picture>
  );
}

export default function ProductStage() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (launchVideo.src || paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setActive((i) => (i + 1) % frames.length), intervalMs);
    return () => window.clearInterval(timer);
  }, [paused]);

  if (launchVideo.src) {
    return (
      <div className="stage">
        <div className="stage-window stage-window--video">
          <video
            src={launchVideo.src}
            poster={launchVideo.poster ?? undefined}
            autoPlay
            muted
            loop
            playsInline
            controls
            aria-label="Otis IDE launch film"
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className="stage"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="stage-window">
        <div className="stage-frames">
          {frames.map((frame, i) => (
            <div
              key={frame.id}
              className={`stage-frame${i === active ? " is-active" : ""}${frame.height < 1000 ? " is-wide" : ""}`}
              aria-hidden={i !== active}
            >
              <Shot frame={frame} eager={i === 0} />
            </div>
          ))}
        </div>
      </div>
      <div className="stage-tabs" role="tablist" aria-label="Product screens">
        {frames.map((frame, i) => (
          <button
            key={frame.id}
            type="button"
            role="tab"
            aria-selected={i === active}
            className={i === active ? "is-active" : undefined}
            onClick={() => setActive(i)}
          >
            <span className="stage-tab-label">{frame.label}</span>
            <span className="stage-tab-progress" aria-hidden="true">
              <i key={`${active}-${paused}`} />
            </span>
          </button>
        ))}
      </div>
      <p className="stage-caption" aria-live="polite">{frames[active].caption}</p>
    </div>
  );
}
