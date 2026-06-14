import React from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";

interface TopNavbarProps {
  title?: string;
  subtitle?: string;
  showBack?: boolean;
  onBack?: () => void;
  rightActionLabel?: string;
  onRightAction?: () => void;
}

export function TopNavbar({
  title = "Smovioo",
  subtitle,
  showBack = false,
  onBack,
  rightActionLabel,
  onRightAction,
}: TopNavbarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const isProfilePage = location.pathname === '/app/profile';

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2.5 md:px-6">
        <div className="flex items-center gap-2.5">
          {showBack ? (
            <button
              onClick={onBack ?? (() => navigate(-1))}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-foreground transition hover:bg-muted active:scale-95"
            >
              <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          ) : (
            <Link to="/app/home" className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm transition active:scale-95">
              <span className="text-xs font-bold">S</span>
            </Link>
          )}
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold tracking-tight text-foreground">{title}</div>
            {subtitle && (
              <div className="truncate text-[11px] text-muted-foreground">{subtitle}</div>
            )}
            {!subtitle && (
              <div className="text-[11px] text-muted-foreground">Smart smoothie guidance</div>
            )}
          </div>
        </div>

        {rightActionLabel ? (
          <button
            onClick={onRightAction}
            className="rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-semibold text-foreground transition hover:bg-muted active:scale-95"
          >
            {rightActionLabel}
          </button>
        ) : !isProfilePage ? (
          <Link
            to="/app/profile"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition hover:bg-muted hover:text-foreground active:scale-95"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="8" r="3" />
              <path d="M5.5 19c1.5-2.5 3.8-3.8 6.5-3.8s5 1.3 6.5 3.8" strokeLinecap="round" />
            </svg>
          </Link>
        ) : null}
      </div>
    </header>
  );
}
