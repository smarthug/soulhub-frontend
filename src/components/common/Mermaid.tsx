import { useEffect, useRef } from "react";
import mermaid from "mermaid";

mermaid.initialize({ startOnLoad: false, theme: "default" });

export default function Mermaid({ chart }: { chart: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    mermaid.render(`mmd-${Math.random().toString(36).slice(2)}`, chart).then(({ svg }) => {
      ref.current!.innerHTML = svg;
    });
  }, [chart]);
  return <div ref={ref} className="rounded-2xl border bg-white p-4 overflow-auto" />;
}