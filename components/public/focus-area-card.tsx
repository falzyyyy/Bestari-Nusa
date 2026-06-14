"use client";

import React from "react";
import { BookOpen, Map, ShieldAlert } from "lucide-react";

interface FocusAreaCardProps {
  title: string;
  description: string;
  iconName: string;
}

export default function FocusAreaCard({ title, description, iconName }: FocusAreaCardProps) {
  const renderIcon = () => {
    const classStyle = "w-6 h-6 text-primary";
    switch (iconName.toLowerCase()) {
      case "youth":
        return <BookOpen className={classStyle} />;
      case "research":
        return <Map className={classStyle} />;
      case "sustainability":
        return <ShieldAlert className={classStyle} />;
      default:
        return <BookOpen className={classStyle} />;
    }
  };

  return (
    <div className="flex flex-col p-8 rounded-2xl border border-border bg-card/60 backdrop-blur-sm shadow-sm hover:shadow-md hover:scale-[1.02] hover:border-primary/40 transition-all duration-300 group">
      <div className="w-12 h-12 rounded-xl bg-primary-soft/40 dark:bg-primary-soft/20 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
        {renderIcon()}
      </div>
      <h3 className="text-xl font-bold tracking-tight mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
        {title}
      </h3>
      <p className="text-sm text-muted leading-relaxed">
        {description}
      </p>
    </div>
  );
}
