import React from "react";
import { BrandWordmark } from "./BrandWordmark";

interface AppShellProps {
  children: React.ReactNode;
  active: string;
  setActive: (view: string) => void;
}

const NAV_ITEMS = ["Home", "Ingredients", "Goals", "Taste", "Results", "Recipe", "Favorites"];

export function AppShell({ children, active, setActive }: AppShellProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-7xl px-4 py-4 md:px-6 lg:px-8">
        <header className="sticky top-4 z-20 mb-6 rounded-2xl border border-border bg-card/90 px-4 py-3 backdrop-blur-md md:px-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <BrandWordmark />
            <nav className="flex flex-wrap gap-1.5">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item}
                  onClick={() => setActive(item)}
                  className={[
                    "rounded-xl px-3.5 py-2 text-sm font-medium transition",
                    active === item
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  ].join(" ")}
                >
                  {item}
                </button>
              ))}
            </nav>
          </div>
        </header>
        {children}
      </div>
    </div>
  );
}
