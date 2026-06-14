import React from "react";

interface SecondaryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export function SecondaryButton({ children, onClick }: SecondaryButtonProps) {
  return (
    <button
      onClick={onClick}
      className="rounded-2xl border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-muted active:scale-[0.98]"
    >
      {children}
    </button>
  );
}
