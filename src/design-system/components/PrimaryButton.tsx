import React from "react";

interface PrimaryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export function PrimaryButton({ children, onClick }: PrimaryButtonProps) {
  return (
    <button
      onClick={onClick}
      className="rounded-2xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90 active:scale-[0.98]"
    >
      {children}
    </button>
  );
}
