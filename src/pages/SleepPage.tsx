import { useState } from 'react';
import { Link } from 'react-router-dom';
import { TopNavbar } from '@/components/TopNavbar';
import { useSleepRecipes, MENOPAUSE_SYMPTOMS } from '@/hooks/useSleepRecipes';

export default function SleepPage() {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>(['Sömnproblem']);
  const { data: recipes = [], isLoading } = useSleepRecipes(selectedSymptoms);

  const toggleSymptom = (s: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <TopNavbar title="Klimakteriebesvär" />
      <main className="mx-auto max-w-6xl px-4 py-5 md:px-6 lg:px-8">
        <section className="animate-fade-in">
          <h1 className="text-[22px] font-bold leading-tight text-foreground md:text-3xl">
            Smoothies för sömn i klimakteriet
          </h1>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Välj ett eller flera besvär för att se anpassade recept med magnesium, tryptofan
            och blodsockerstabiliserande näring.
          </p>
        </section>

        <section className="mt-6">
          <div className="mb-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Besvär
          </div>
          <div className="flex flex-wrap gap-2">
            {MENOPAUSE_SYMPTOMS.map((s) => {
              const active = selectedSymptoms.includes(s);
              return (
                <button
                  key={s}
                  onClick={() => toggleSymptom(s)}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                    active
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-foreground hover:bg-secondary/80'
                  }`}
                >
                  {s}
                </button>
              );
            })}
          </div>
        </section>

        <section className="mt-7">
          <div className="mb-2.5 flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              {recipes.length} recept
            </span>
          </div>
          {isLoading ? (
            <p className="py-8 text-center text-sm text-muted-foreground">Laddar…</p>
          ) : recipes.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">
              Inga recept matchar valda besvär ännu.
            </p>
          ) : (
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {recipes.map((r) => (
                <Link
                  key={r.id}
                  to={`/app/sleep/${r.id}`}
                  className="rounded-[24px] border border-border bg-card p-5 shadow-sm transition hover:bg-secondary/40 active:scale-[0.99]"
                >
                  <div className="text-base font-semibold text-foreground">{r.title}</div>
                  <p className="mt-1.5 line-clamp-2 text-sm leading-6 text-muted-foreground">
                    {r.description}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {r.tags.slice(0, 4).map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-secondary px-2.5 py-0.5 text-[11px] font-medium text-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
