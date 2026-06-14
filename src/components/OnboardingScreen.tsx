import React from "react";

interface OnboardingScreenProps {
  onStart?: () => void;
  onHowItWorks?: () => void;
}

function FeatureCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-[24px] border border-border bg-card p-5 shadow-sm">
      <div className="text-sm font-semibold text-foreground">{title}</div>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
    </div>
  );
}

export function OnboardingScreen({ onStart, onHowItWorks }: OnboardingScreenProps) {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-6xl px-4 py-6 md:px-6 lg:px-8">
        {/* Hero */}
        <section className="relative overflow-hidden rounded-[36px] border border-border bg-gradient-to-br from-card via-background to-secondary px-6 py-8 md:px-10 md:py-12">
          <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-leaf-light blur-3xl" />
          <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-berry-light blur-3xl" />

          <div className="relative grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-3 rounded-full border border-border bg-card/80 px-4 py-2 backdrop-blur-sm">
                <div className="h-2.5 w-2.5 rounded-full bg-primary" />
                <span className="text-sm font-medium text-muted-foreground">
                  English-first · Multilingual-ready
                </span>
              </div>

              <div className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Smovioo
              </div>

              <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight tracking-[-0.03em] md:text-5xl lg:text-6xl">
                Smart smoothie ideas from what you already have
              </h1>

              <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground md:text-lg">
                Choose your ingredients, your goal, and your taste. Smovioo suggests simple, source-aware blends in seconds.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={onStart}
                  className="inline-flex items-center justify-center rounded-2xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition hover:bg-leaf-dark"
                >
                  Start now
                </button>
                <button
                  onClick={onHowItWorks}
                  className="inline-flex items-center justify-center rounded-2xl border border-border bg-card px-6 py-3.5 text-sm font-semibold text-foreground transition hover:bg-muted"
                >
                  See how it works
                </button>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                {["Ingredient-led suggestions", "Source-aware guidance", "Child-friendly mode"].map((label) => (
                  <span
                    key={label}
                    className="rounded-full bg-card px-4 py-2 text-sm text-muted-foreground shadow-sm ring-1 ring-border"
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>

            {/* Right — app preview card */}
            <div className="mx-auto w-full max-w-md">
              <div className="rounded-[30px] border border-border bg-card p-4 shadow-[0_20px_60px_hsl(var(--foreground)/0.06)]">
                <div className="rounded-[24px] bg-secondary p-4 ring-1 ring-border">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                        Today's setup
                      </div>
                      <div className="mt-1 text-lg font-semibold text-foreground">
                        Your blend preview
                      </div>
                    </div>
                    <div className="rounded-full bg-leaf-light px-3 py-1 text-xs font-semibold text-leaf-dark">
                      Ready
                    </div>
                  </div>

                  <div className="mt-5">
                    <div className="text-sm font-medium text-foreground">Ingredients</div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {["Banana", "Blueberries", "Oats", "Yogurt"].map((item) => (
                        <span
                          key={item}
                          className="rounded-full bg-card px-3 py-1.5 text-xs font-medium text-foreground ring-1 ring-border"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl bg-card p-4 ring-1 ring-border">
                      <div className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Goal</div>
                      <div className="mt-2 text-sm font-semibold text-foreground">Blood sugar conscious</div>
                    </div>
                    <div className="rounded-2xl bg-card p-4 ring-1 ring-border">
                      <div className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Taste</div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {["Sweet", "Creamy"].map((tag) => (
                          <span key={tag} className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-foreground">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 rounded-[24px] bg-card p-4 ring-1 ring-border">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Suggested recipe</div>
                        <div className="mt-2 text-lg font-semibold text-foreground">Creamy Blueberry Balance</div>
                        <p className="mt-2 text-sm leading-6 text-muted-foreground">
                          A balanced berry smoothie with oats and yogurt for a more rounded, satisfying blend.
                        </p>
                      </div>
                      <div className="shrink-0 rounded-full bg-berry-light px-3 py-1 text-xs font-semibold text-berry">
                        Child-friendly
                      </div>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {["Berry", "Creamy", "Balanced"].map((tag) => (
                        <span key={tag} className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-foreground">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="mt-5 border-t border-border pt-4">
                      <div className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Source</div>
                      <div className="mt-1 text-sm font-medium text-leaf-dark">CDC · Meal planning guidance</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature cards */}
        <section className="mt-8 grid gap-4 md:grid-cols-3">
          <FeatureCard
            title="Use what you already have"
            text="Start with ingredients you already have at home and get suggestions that feel practical, not random."
          />
          <FeatureCard
            title="Choose a goal that fits"
            text="Pick a direction like filling, energizing, or child-friendly to make results feel more relevant."
          />
          <FeatureCard
            title="See the reasoning"
            text="Smovioo explains why a blend is suggested and keeps the tone careful, clear, and trustworthy."
          />
        </section>
      </div>
    </main>
  );
}
