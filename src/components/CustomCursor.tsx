import { useEffect, useRef } from "react";
import "./CustomCursor.css";

const isTouch = () => typeof window !== "undefined" && ("ontouchstart" in window || navigator.maxTouchPoints > 0);

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);
  const requestRef = useRef<number | null>(null);
  const mouse = useRef({ x: typeof window !== "undefined" ? window.innerWidth / 2 : 0, y: typeof window !== "undefined" ? window.innerHeight / 2 : 0 });
  const pos = useRef({ x: mouse.current.x, y: mouse.current.y });

  useEffect(() => {
    if (typeof window === "undefined" || isTouch()) return;

    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      if (cursorRef.current) cursorRef.current.style.opacity = "1";
      if (dotRef.current) dotRef.current.style.opacity = "1";
    };

    const onMouseDown = () => cursorRef.current?.classList.add("cursor--down");
    const onMouseUp = () => cursorRef.current?.classList.remove("cursor--down");

    const onOver = (e: Event) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      if (target.closest("a, button, input, textarea, [data-cursor]")) {
        cursorRef.current?.classList.add("cursor--hover");
      }
    };
    const onOut = (e: Event) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      if (target.closest("a, button, input, textarea, [data-cursor]")) {
        cursorRef.current?.classList.remove("cursor--hover");
      }
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    const render = () => {
      pos.current.x += (mouse.current.x - pos.current.x) * 0.15;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.15;
      if (cursorRef.current) cursorRef.current.style.transform = `translate3d(${pos.current.x - 16}px, ${pos.current.y - 16}px, 0)`;
      if (dotRef.current) dotRef.current.style.transform = `translate3d(${mouse.current.x - 3}px, ${mouse.current.y - 3}px, 0)`;
      requestRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, []);

  if (typeof window !== "undefined" && isTouch()) return null;

  return (
    <>
      <div ref={cursorRef} className="custom-cursor" />
      <div ref={dotRef} className="custom-cursor-dot" />
    </>
  );
}
