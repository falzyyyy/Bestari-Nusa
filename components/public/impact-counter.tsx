"use client";

import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";
import { Leaf, Users, Handshake, MapPin } from "lucide-react";

interface ImpactCounterProps {
  label: string;
  value: number;
  suffix?: string;
  description?: string;
  icon?: string;
}

export default function ImpactCounter({
  label,
  value,
  suffix = "",
  description = "",
  icon = ""
}: ImpactCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 1200; // ms
    const increment = value / (duration / 16); // ~60fps

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, value]);

  // Map string icon names to Lucide elements
  const renderIcon = () => {
    const classStyle = "w-7 h-7 text-primary mb-2.5";
    switch (icon.toLowerCase()) {
      case "leaf":
        return <Leaf className={classStyle} />;
      case "users":
        return <Users className={classStyle} />;
      case "handshake":
        return <Handshake className={classStyle} />;
      case "map":
        return <MapPin className={classStyle} />;
      default:
        return <Leaf className={classStyle} />;
    }
  };

  return (
    <div
      ref={ref}
      className="flex flex-col items-center text-center p-6 rounded-2xl glass-card relative group hover:scale-[1.02] transition-transform duration-300"
    >
      <div className="p-3 bg-primary-soft/50 rounded-full mb-3 text-primary group-hover:rotate-12 transition-transform duration-300">
        {renderIcon()}
      </div>
      <span className="text-4xl md:text-5xl font-black tracking-tight text-primary-dark dark:text-primary">
        {count}
        {suffix}
      </span>
      <h4 className="text-base font-bold mt-2 text-foreground">
        {label}
      </h4>
      <p className="text-xs text-muted mt-1 leading-relaxed max-w-[200px]">
        {description}
      </p>
    </div>
  );
}
