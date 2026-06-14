import { Link } from 'react-router-dom';
import { useTranslation } from '@/i18n/useTranslation';

function TrustCard({ title, text, delay }: { title: string; text: string; delay?: string }) {
  return (
    <div
      className="rounded-[28px] border border-border bg-card p-6 shadow-sm animate-fade-in md:p-7"
      style={delay ? { animationDelay: delay, animationFillMode: 'both' } : undefined}
    >
      <h3 className="text-[15px] font-semibold text-foreground">{title}</h3>
      <p className="mt-2 text-sm leading-[1.7] text-muted-foreground">{text}</p>
    </div>
  );
}

function MiniStepRow({ step, label, active }: { step: string; label: string; active?: boolean }) {
  return (
    <div className={`flex items-center gap-3.5 rounded-2xl px-4 py-3.5 ${active ? 'bg-leaf-light/70' : 'bg-transparent'}`}>
      <div className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${active ? 'bg-primary text-primary-foreground' : 'bg-muted/60 text-muted-foreground'}`}>
        {step}
      </div>
      <span className={`text-sm font-medium ${active ? 'text-foreground' : 'text-muted-foreground/80'}`}>{label}</span>
    </div>
  );
}

export default function LandingPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background">
      {/* Compact top bar */}
      <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground shadow-sm">
            S
          </div>
          <span className="text-[15px] font-semibold tracking-tight text-foreground">Smovioo</span>
        </div>
        <Link
          to="/how-it-works"
          className="text-[13px] font-medium text-muted-foreground transition hover:text-foreground"
        >
          How it works
        </Link>
      </header>

      <main className="mx-auto max-w-6xl px-5 pb-16 pt-6 md:pt-20">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
          {/* Hero copy */}
          <div className="animate-fade-in">
            <h1 className="text-[28px] font-bold leading-[1.15] tracking-[-0.03em] text-foreground sm:text-4xl md:text-5xl">
              Smart smoothie ideas from what you already have
            </h1>
            <p className="mt-5 max-w-lg text-[15px] leading-7 text-muted-foreground">
              Choose your ingredients, your goal, and your taste. Smovioo suggests simple, source-aware blends in seconds.
            </p>
            <div className="mt-9 flex items-center gap-4">
              <Link
                to="/app/create"
                className="inline-flex items-center justify-center rounded-2xl bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90 active:scale-[0.98]"
              >
                Start now
              </Link>
              <Link
                to="/how-it-works"
                className="text-sm font-medium text-muted-foreground transition hover:text-foreground"
              >
                How it works →
              </Link>
            </div>
          </div>

          {/* App preview */}
          <div className="animate-fade-in" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
            <div className="mx-auto w-full max-w-[320px] rounded-[32px] border border-border/80 bg-card p-6 shadow-[0_16px_48px_-8px_hsl(var(--foreground)/0.08),0_4px_16px_-4px_hsl(var(--foreground)/0.04)] lg:ml-auto lg:mr-0">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">S</div>
                <div>
                  <div className="text-sm font-semibold text-foreground">Smovioo</div>
                  <div className="text-[11px] text-muted-foreground">Your blend assistant</div>
                </div>
              </div>
              <div className="mt-5 space-y-1">
                <MiniStepRow step="1" label="Choose ingredients" active />
                <MiniStepRow step="2" label="Pick a goal" />
                <MiniStepRow step="3" label="Choose your taste" />
                <MiniStepRow step="4" label="Get suggestions" />
              </div>
              <div className="mt-5 rounded-2xl bg-leaf-light/50 p-4">
                <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-primary/80">Preview</div>
                <div className="mt-1.5 text-sm font-medium text-foreground">Green Power Boost</div>
                <div className="mt-0.5 text-xs text-muted-foreground">Spinach, banana, mango, almond milk</div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust cards */}
        <section className="mt-16 md:mt-24">
          <div className="mb-6 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Why Smovioo
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            <TrustCard
              title="Use what you already have"
              text="Start with ingredients at home. Recommendations stay practical and realistic."
              delay="0.15s"
            />
            <TrustCard
              title="Choose a goal that fits"
              text="Filling, energizing, child-friendly, or balanced. Your goal shapes every suggestion."
              delay="0.25s"
            />
            <TrustCard
              title="See the reasoning"
              text="Every suggestion includes an explanation and referenced sources. Transparent, not magical."
              delay="0.35s"
            />
          </div>
        </section>

        {/* Disclaimer */}
        <footer className="mt-16 border-t border-border pt-8 md:mt-20 md:pt-10">
          <p className="mx-auto max-w-2xl text-center text-[11px] leading-5 text-muted-foreground">
            {t('generalDisclaimer')}
          </p>
        </footer>
      </main>
    </div>
  );
}
