"use client";

import Image, { type StaticImageData } from "next/image";
import { useReducedMotion } from "motion/react";
import { useEffect, useId, useRef, useState } from "react";

/** Foto a color normal que se distorsiona (ondas + separación RGB) al pasar el cursor. */
export function GlitchPhoto({ src, alt }: { src: StaticImageData; alt: string }) {
  const reduce = useReducedMotion();
  const filterId = `distort-${useId().replace(/:/g, "")}`;
  const turbulenceRef = useRef<SVGFETurbulenceElement>(null);
  const displaceRef = useRef<SVGFEDisplacementMapElement>(null);
  const hoverRef = useRef(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!active || reduce) return;
    let frame = 0;
    let strength = 0;
    let t = 0;
    const loop = () => {
      t += 1;
      strength += ((hoverRef.current ? 1 : 0) - strength) * 0.08;
      // pulsos irregulares para que la distorsión se sienta "viva"
      const burst = Math.random() < 0.06 ? 2.2 : 1;
      const scale = strength * (14 + Math.sin(t / 6) * 8) * burst;
      displaceRef.current?.setAttribute("scale", scale.toFixed(2));
      turbulenceRef.current?.setAttribute(
        "baseFrequency",
        `${(0.006 + Math.sin(t / 40) * 0.003).toFixed(4)} ${(0.04 + Math.cos(t / 23) * 0.025).toFixed(4)}`,
      );
      if (!hoverRef.current && strength < 0.01) {
        displaceRef.current?.setAttribute("scale", "0");
        setActive(false);
        return;
      }
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, [active, reduce]);

  const image = (className: string, extra?: React.CSSProperties) => (
    <Image
      src={src}
      alt=""
      fill
      sizes="380px"
      aria-hidden
      className={`object-cover object-[60%_40%] ${className}`}
      style={extra}
    />
  );

  return (
    <div
      className="glitch relative h-full w-full"
      data-active={active || undefined}
      onPointerEnter={() => {
        hoverRef.current = true;
        setActive(true);
      }}
      onPointerLeave={() => {
        hoverRef.current = false;
      }}
    >
      <svg className="absolute size-0" aria-hidden>
        <filter id={filterId} x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence ref={turbulenceRef} type="fractalNoise" baseFrequency="0.006 0.04" numOctaves="2" seed="3" result="noise" />
          <feDisplacementMap ref={displaceRef} in="SourceGraphic" in2="noise" scale="0" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      <div className="absolute inset-0" style={active && !reduce ? { filter: `url(#${filterId})` } : undefined}>
        <Image
          src={src}
          alt={alt}
          fill
          priority
          placeholder="blur"
          sizes="380px"
          className="object-cover object-[60%_40%] transition-transform duration-700 [.glitch:hover_&]:scale-[1.04]"
        />
        {/* canales desplazados (aberración cromática) */}
        {!reduce && (
          <>
            {image("glitch-layer glitch-r", { mixBlendMode: "screen" })}
            {image("glitch-layer glitch-c", { mixBlendMode: "screen" })}
          </>
        )}
      </div>
    </div>
  );
}
