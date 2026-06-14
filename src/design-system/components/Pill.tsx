import React from "react";

interface PillProps {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}

export function Pill({ children, active = false, onClick }: PillProps) {
  return (
    <button
      onClick={onClick}
      className={[
        "rounded-xl px-4 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-primary/30",
        active
          ? "bg-primary text-primary-foreground"
          : "border border-border bg-card text-foreground hover:bg-muted",
      ].join(" ")}
    >
      {children}
    </button>
  );
}