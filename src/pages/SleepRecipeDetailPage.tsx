import { useParams, Link } from 'react-router-dom';
import { TopNavbar } from '@/components/TopNavbar';
import { useSleepRecipe } from '@/hooks/useSleepRecipes';

function ensureAbsolute(url: string | null | undefined): string | null {
  if (!url) return null;
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return `https://${url}`;
}

export default function SleepRecipeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: recipe, isLoading } = useSleepRecipe(id);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background pb-24">
        <TopNavbar title="Recept" />
        <p className="px-4 py-8 text-center text-sm text-muted-foreground">Laddar…</p>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="min-h-screen bg-background pb-24">
        <TopNavbar title="Recept" />
        <div className="px-4 py-8 text-center text-sm text-muted-foreground">
          <p>Receptet hittades inte.</p>
          <Link to="/app/sleep" className="mt-3 inline-block text-primary">
            ← Tillbaka
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      <TopNavbar title={recipe.category} />
      <main className="mx-auto max-w-3xl px-4 py-5 md:px-6">
        <Link to="/app/sleep" className="text-xs font-semibold text-muted-foreground hover:text-foreground">
          ← Alla sömnrecept
        </Link>

        <h1 className="mt-3 text-[22px] font-bold leading-tight text-foreground md:text-3xl">
          {recipe.title}
        </h1>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">{recipe.description}</p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {recipe.tags.map((t) => (
            <span
              key={t}
              className="rounded-full bg-secondary px-2.5 py-0.5 text-[11px] font-medium text-foreground"
            >
              {t}
            </span>
          ))}
        </div>

        <section className="mt-6 rounded-[20px] border border-border bg-card p-4">
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Varför denna smoothie hjälper din sömn
          </h2>
          <p className="mt-2 text-sm leading-6 text-foreground">{recipe.benefits}</p>
        </section>

        <section className="mt-6">
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Ingredienser
          </h2>
          <ul className="mt-2 space-y-1.5 text-sm text-foreground">
            {recipe.ingredients.map((ing) => (
              <li key={ing.id} className="flex gap-2">
                <span className="font-semibold text-foreground">{ing.amount}</span>
                <span className="text-muted-foreground">{ing.ingredient}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-6">
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Så gör du
          </h2>
          <p className="mt-2 whitespace-pre-line text-sm leading-6 text-foreground">
            {recipe.instructions}
          </p>
        </section>

        {recipe.sources.length > 0 && (
          <section className="mt-6">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Källor
            </h2>
            <ul className="mt-2 space-y-2">
              {recipe.sources.map((s) => {
                const href = ensureAbsolute(s.url);
                return (
                  <li key={s.id} className="text-sm">
                    {href ? (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-primary hover:text-primary/80"
                      >
                        {s.title} ↗
                      </a>
                    ) : (
                      <span className="font-semibold text-foreground">{s.title}</span>
                    )}
                    {s.notes && (
                      <p className="mt-0.5 text-xs leading-5 text-muted-foreground">{s.notes}</p>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>
        )}
      </main>
    </div>
  );
}
