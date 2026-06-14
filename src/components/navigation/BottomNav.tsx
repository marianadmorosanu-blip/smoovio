import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

type TabKey = "home" | "explore" | "favorites" | "profile";

const TABS: { key: TabKey; label: string; to: string; icon: React.ReactNode }[] = [
  {
    key: "home",
    label: "Home",
    to: "/app/home",
    icon: (
      <svg viewBox="0 0 24 24" className="h-[20px] w-[20px]" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M3 10.5 12 3l9 7.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M5.5 9.5V20a1 1 0 0 0 1 1h4.5v-6h2v6h4.5a1 1 0 0 0 1-1V9.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    key: "explore",
    label: "Explore",
    to: "/app/explore",
    icon: (
      <svg viewBox="0 0 24 24" className="h-[20px] w-[20px]" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="11" cy="11" r="6.5" />
        <path d="M16 16l5 5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    key: "favorites",
    label: "Favorites",
    to: "/app/favorites",
    icon: (
      <svg viewBox="0 0 24 24" className="h-[20px] w-[20px]" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 20.5s-6.5-4.2-8.5-8A5.3 5.3 0 0 1 12 6a5.3 5.3 0 0 1 8.5 6.5c-2 3.8-8.5 8-8.5 8Z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    key: "profile",
    label: "Profile",
    to: "/app/profile",
    icon: (
      <svg viewBox="0 0 24 24" className="h-[20px] w-[20px]" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="8" r="3.25" />
        <path d="M5 19c1.6-2.7 4.1-4 7-4s5.4 1.3 7 4" strokeLinecap="round" />
      </svg>
    ),
  },
];

export function BottomNav() {
  const location = useLocation();
  const path = location.pathname;

  const activeTab = TABS.find((t) => path.startsWith(t.to))?.key ?? "home";

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 pb-[env(safe-area-inset-bottom)]">
      <div className="mx-auto max-w-lg px-3 pb-2.5">
        <div className="rounded-[26px] border border-border/50 bg-card/90 px-1 py-1 shadow-[0_8px_32px_hsl(var(--foreground)/0.06)] backdrop-blur-2xl">
          <div className="grid grid-cols-4 items-end">
            {TABS.map((tab) => {
              const active = activeTab === tab.key;
              return (
                <Link
                  key={tab.key}
                  to={tab.to}
                  className={cn(
                    "flex flex-col items-center justify-center rounded-[20px] py-2 transition-all",
                    active
                      ? "text-primary"
                      : "text-muted-foreground active:scale-95"
                  )}
                >
                  <div
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full transition-all",
                      active ? "bg-leaf-light shadow-sm" : ""
                    )}
                  >
                    {tab.icon}
                  </div>
                  <span className={cn(
                    "mt-0.5 text-[10px] font-medium transition-colors",
                    active ? "text-primary" : "text-muted-foreground"
                  )}>
                    {tab.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
