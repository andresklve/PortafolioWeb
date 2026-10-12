"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { useLanguage } from "./language-provider";

const ACCENT = "var(--accent)";
const CYAN = "var(--accent-2)";
const CORAL = "var(--accent-3)";

type ServiceKey = "auth" | "users" | "chat" | "posts" | "feed";

const services: { key: ServiceKey; port: number; cx: number; db: { label: string; cx: number } }[] = [
  { key: "auth", port: 3000, cx: 76, db: { label: "PostgreSQL", cx: 76 } },
  { key: "users", port: 3001, cx: 188, db: { label: "PostgreSQL", cx: 188 } },
  { key: "chat", port: 3003, cx: 300, db: { label: "MongoDB", cx: 300 } },
  { key: "posts", port: 3002, cx: 412, db: { label: "MongoDB", cx: 390 } },
  { key: "feed", port: 3004, cx: 524, db: { label: "Redis", cx: 548 } },
];

const SVC_Y = 130;
const SVC_H = 50;
const DB_Y = 290;

function Packet({ path, dur, begin = 0, color = ACCENT, r = 3 }: { path: string; dur: number; begin?: number; color?: string; r?: number }) {
  return (
    <circle className="packet" r={r} fill={color} style={{ filter: `drop-shadow(0 0 4px ${color})` }}>
      <animateMotion dur={`${dur}s`} begin={`${begin}s`} repeatCount="indefinite" path={path} />
    </circle>
  );
}

function Cylinder({ cx, y, label, active }: { cx: number; y: number; label: string; active: boolean }) {
  const w = 76;
  const x = cx - w / 2;
  const stroke = active ? ACCENT : "var(--line-strong)";
  return (
    <g style={{ transition: "opacity .3s" }}>
      <path
        d={`M${x} ${y + 6} v26 a${w / 2} 6 0 0 0 ${w} 0 v-26`}
        fill="var(--bg-2)"
        stroke={stroke}
        strokeWidth="1"
      />
      <ellipse cx={cx} cy={y + 6} rx={w / 2} ry="6" fill="var(--panel)" stroke={stroke} strokeWidth="1" />
      <text x={cx} y={y + 27} textAnchor="middle" className="fill-[var(--muted)] font-mono text-[9.5px]">
        {label}
      </text>
    </g>
  );
}

export function PiensaYaDiagram() {
  const { t } = useLanguage();
  const [hover, setHover] = useState<ServiceKey | null>(null);
  const dim = (k: ServiceKey | "bus") =>
    hover === null || hover === k || (k === "bus" && (hover === "posts" || hover === "feed")) ? 1 : 0.25;

  const clientPath = (cx: number) => `M300 58 C300 96 ${cx} 92 ${cx} ${SVC_Y}`;
  const eventPath = `M436 ${SVC_Y + SVC_H} V225 H500 V${SVC_Y + SVC_H}`;
  const feedToRedis = `M548 ${SVC_Y + SVC_H} V${DB_Y}`;

  return (
    <div className="relative">
      <svg viewBox="0 0 600 350" className="w-full" role="img" aria-label="PiensaYa architecture">
        <defs>
          <pattern id="dots" width="12" height="12" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.8" fill="rgba(255,255,255,0.07)" />
          </pattern>
        </defs>
        <rect width="600" height="350" fill="url(#dots)" />

        {/* cliente */}
        <g>
          <rect x="225" y="16" width="150" height="42" rx="10" fill="var(--panel)" stroke="var(--line-strong)" />
          <text x="300" y="35" textAnchor="middle" className="fill-[var(--fg)] text-[12px] font-semibold">
            Next.js client
          </text>
          <text x="300" y="49" textAnchor="middle" className="fill-[var(--dim)] font-mono text-[9px]">
            JWT · REST · Socket.IO
          </text>
        </g>

        {/* líneas cliente → servicios */}
        {services.map((s) => (
          <path
            key={s.key}
            d={clientPath(s.cx)}
            fill="none"
            stroke={s.key === "chat" ? CYAN : "var(--line-strong)"}
            strokeWidth="1"
            className={s.key === "chat" ? "flow-dash" : ""}
            opacity={dim(s.key)}
            style={{ transition: "opacity .3s" }}
          />
        ))}

        {/* servicio → base de datos */}
        {services.map((s) => {
          const x = s.key === "posts" ? 390 : s.key === "feed" ? 548 : s.cx;
          return (
            <line
              key={s.key}
              x1={x}
              x2={x}
              y1={SVC_Y + SVC_H}
              y2={DB_Y}
              stroke="var(--line-strong)"
              opacity={dim(s.key)}
              style={{ transition: "opacity .3s" }}
            />
          );
        })}

        {/* bus de eventos */}
        <g opacity={dim("bus")} style={{ transition: "opacity .3s" }}>
          <path d={eventPath} fill="none" stroke={CORAL} strokeWidth="1" className="flow-dash" />
          <rect x="418" y="212" width="100" height="27" rx="13.5" fill="var(--bg-2)" stroke={CORAL} />
          <text x="468" y="229" textAnchor="middle" className="fill-[var(--accent-3)] font-mono text-[10px]">
            RabbitMQ
          </text>
        </g>

        {/* servicios */}
        {services.map((s) => {
          const active = hover === s.key;
          return (
            <g
              key={s.key}
              onMouseEnter={() => setHover(s.key)}
              onMouseLeave={() => setHover(null)}
              className="cursor-pointer"
              opacity={dim(s.key)}
              style={{ transition: "opacity .3s" }}
            >
              <rect
                x={s.cx - 50}
                y={SVC_Y}
                width="100"
                height={SVC_H}
                rx="10"
                fill={active ? "rgba(196,245,66,0.08)" : "var(--panel)"}
                stroke={active ? ACCENT : "var(--line-strong)"}
                style={{ transition: "all .25s" }}
              />
              <text x={s.cx} y={SVC_Y + 22} textAnchor="middle" className="fill-[var(--fg)] text-[12px] font-semibold">
                {s.key}
              </text>
              <text x={s.cx} y={SVC_Y + 37} textAnchor="middle" className="fill-[var(--dim)] font-mono text-[9px]">
                :{s.port}
              </text>
            </g>
          );
        })}

        {/* bases de datos */}
        {services.map((s) => (
          <g key={s.key} opacity={dim(s.key)} style={{ transition: "opacity .3s" }}>
            <Cylinder cx={s.db.cx} y={DB_Y} label={s.db.label} active={hover === s.key} />
          </g>
        ))}

        {/* paquetes */}
        {services.map((s, i) =>
          s.key === "chat" ? null : <Packet key={s.key} path={clientPath(s.cx)} dur={2.2} begin={i * 0.45} />,
        )}
        <Packet path={clientPath(300)} dur={1.6} color={CYAN} />
        <Packet path={`M300 ${SVC_Y} C300 92 300 96 300 58`} dur={1.6} begin={0.8} color={CYAN} />
        <Packet path={eventPath} dur={2.4} color={CORAL} r={3.5} />
        <Packet path={eventPath} dur={2.4} begin={1.2} color={CORAL} r={3.5} />
        <Packet path={feedToRedis} dur={1.2} begin={0.4} color={CORAL} />
      </svg>

      <div className="mt-3 flex min-h-12 items-start gap-3 rounded-xl border border-line bg-bg-2/80 px-4 py-3 font-mono text-xs">
        <span className="text-accent">{hover ? `${hover}-service` : "~"}</span>
        <span className="text-muted">{hover ? t.projects.services[hover] : t.projects.hint}</span>
      </div>
    </div>
  );
}

export function ReclamaYaDiagram() {
  const { t } = useLanguage();
  const nodes = [
    { x: 8, label: t.projects.flow.citizen, sub: "web" },
    { x: 148, label: "Angular", sub: "SPA" },
    { x: 288, label: "Spring Boot", sub: "REST API" },
    { x: 428, label: "PostgreSQL", sub: "JPA" },
  ];
  const forward = "M128 62 H428";
  const back = "M428 92 H128";
  return (
    <svg viewBox="0 0 556 140" className="w-full" role="img" aria-label="ReclamaYa flow">
      {nodes.slice(0, -1).map((n, i) => (
        <g key={i}>
          <line x1={n.x + 120} x2={nodes[i + 1].x} y1="62" y2="62" stroke="var(--line-strong)" />
          <line x1={n.x + 120} x2={nodes[i + 1].x} y1="92" y2="92" stroke="var(--line-strong)" strokeDasharray="3 4" />
        </g>
      ))}
      {nodes.map((n, i) => (
        <motion.g
          key={i}
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.12 }}
        >
          <rect x={n.x} y="44" width="120" height="66" rx="12" fill="var(--panel)" stroke="var(--line-strong)" />
          <text x={n.x + 60} y="73" textAnchor="middle" className="fill-[var(--fg)] text-[12px] font-semibold">
            {n.label}
          </text>
          <text x={n.x + 60} y="90" textAnchor="middle" className="fill-[var(--dim)] font-mono text-[9.5px]">
            {n.sub}
          </text>
        </motion.g>
      ))}
      <text x="208" y="34" className="fill-[var(--accent-2)] font-mono text-[9.5px]">
        POST {"{ "}
        {t.projects.flow.report}
        {" }"}
      </text>
      <text x="350" y="128" className="fill-[var(--accent)] font-mono text-[9.5px]">
        ← JSON
      </text>
      <Packet path={forward} dur={2.4} color={CYAN} />
      <Packet path={back} dur={2.4} begin={1.2} color={ACCENT} />
    </svg>
  );
}

export function PortfolioDiagram() {
  const children = ["Hero", "About", "Stack", "Projects", "Journey", "Contact"];
  return (
    <svg viewBox="0 0 556 140" className="w-full" role="img" aria-label="Component tree">
      <rect x="208" y="6" width="140" height="30" rx="8" fill="var(--panel)" stroke="var(--line-strong)" />
      <text x="278" y="25" textAnchor="middle" className="fill-[var(--fg)] font-mono text-[10.5px]">
        app/page.tsx
      </text>
      {children.map((c, i) => {
        const cx = 46 + i * 92.8;
        return (
          <g key={c}>
            <motion.path
              d={`M278 36 C278 70 ${cx} 62 ${cx} 98`}
              fill="none"
              stroke="var(--accent)"
              strokeOpacity="0.6"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.2 + i * 0.1, ease: "easeInOut" }}
            />
            <motion.g
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 + i * 0.1 }}
              style={{ transformOrigin: `${cx}px 113px` }}
            >
              <rect x={cx - 42} y="98" width="84" height="30" rx="8" fill="var(--bg-2)" stroke="var(--line-strong)" />
              <text x={cx} y="117" textAnchor="middle" className="fill-[var(--muted)] font-mono text-[10px]">
                {`<${c} />`}
              </text>
            </motion.g>
          </g>
        );
      })}
    </svg>
  );
}
