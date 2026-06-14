import React from "react";
import { useParams } from "react-router-dom";
import { TopNavbar } from "@/components/TopNavbar";
import { useTranslation } from "@/i18n/useTranslation";
import { useFavorites } from "@/hooks/useFavorites";
import { useBlendlyRecipe, useBlendlyRecipeSources, ensureAbsoluteUrl } from "@/hooks/useBlendlyData";

function InfoCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-[24px] border border-border bg-card p-5 shadow-sm">
      <h2 className="text-sm font-semibold uppercase tracking-[0.1em] text-muted-foreground">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

export default function RecipeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { data: recipe, isLoading, error } = useBlendlyRecipe(id);
  const { data: recipeSources = [] } = useBlendlyRecipeSources(id);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-sm text-muted-foreground">Loading…</p>
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-sm text-muted-foreground">
          {error ? (error as Error).message : "Recipe not found."}
        </p>
      </div>
    );
  }

  const fav = isFavorite(recipe.id);

  return (
    <div className="min-h-screen bg-background pb-24">
      <TopNavbar title="Recipe" showBack />

      <main className="mx-auto max-w-6xl px-4 py-5 md:px-6 lg:px-8">
        {/* Hero */}
        <section className="animate-fade-in rounded-[28px] border border-border bg-card p-5 shadow-sm md:p-7">
          <h1 className="text-[22px] font-bold leading-tight text-foreground md:text-3xl">
            {recipe.name}
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            {recipe.short_description}
          </p>

          {/* Tags */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {recipe.is_vegan && (
              <span className="rounded-full bg-leaf-light px-2.5 py-0.5 text-[11px] font-semibold text-primary">Vegan</span>
            )}
            {recipe.is_vegetarian && !recipe.is_vegan && (
              <span className="rounded-full bg-leaf-light px-2.5 py-0.5 text-[11px] font-semibold text-primary">Vegetarian</span>
            )}
            {recipe.is_gluten_free && (
              <span className="rounded-full bg-secondary px-2.5 py-0.5 text-[11px] font-medium text-foreground">Gluten-free</span>
            )}
            {recipe.is_dairy_free && (
              <span className="rounded-full bg-secondary px-2.5 py-0.5 text-[11px] font-medium text-foreground">Dairy-free</span>
            )}
            {recipe.difficulty && (
              <span className="rounded-full bg-secondary px-2.5 py-0.5 text-[11px] font-medium text-foreground capitalize">
                {recipe.difficulty}
              </span>
            )}
          </div>

          {/* Meta + save */}
          <div className="mt-5 flex items-center gap-4">
            <button
              onClick={() => toggleFavorite(recipe.id)}
              className={`rounded-2xl px-5 py-2.5 text-sm font-semibold transition active:scale-[0.98] ${
                fav
                  ? "bg-leaf-light text-primary"
                  : "bg-primary text-primary-foreground hover:bg-primary/90"
              }`}
            >
              {fav ? (
                <span className="flex items-center gap-2">
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 20.5s-6.5-4.2-8.5-8A5.3 5.3 0 0 1 12 6a5.3 5.3 0 0 1 8.5 6.5c-2 3.8-8.5 8-8.5 8Z" />
                  </svg>
                  Saved
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M12 20.5s-6.5-4.2-8.5-8A5.3 5.3 0 0 1 12 6a5.3 5.3 0 0 1 8.5 6.5c-2 3.8-8.5 8-8.5 8Z" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Save recipe
                </span>
              )}
            </button>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span>{recipe.servings} serving{recipe.servings > 1 ? 's' : ''}</span>
              <span className="text-border">·</span>
              <span>{recipe.prep_minutes} min</span>
            </div>
          </div>
        </section>

        {/* Content */}
        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          <div className="space-y-4">
            {/* Instructions */}
            <InfoCard title={t("instructions")}>
              <div className="space-y-2.5">
                <p className="text-sm leading-6 text-muted-foreground whitespace-pre-line">
                  {recipe.instructions}
                </p>
              </div>
            </InfoCard>

            {/* Nutrition */}
            {recipe.calories_kcal && (
              <InfoCard title="Nutrition">
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: 'Calories', value: `${Math.round(recipe.calories_kcal)} kcal` },
                    { label: 'Protein', value: recipe.protein_g ? `${recipe.protein_g.toFixed(1)}g` : '–' },
                    { label: 'Carbs', value: recipe.carbs_g ? `${recipe.carbs_g.toFixed(1)}g` : '–' },
                    { label: 'Fat', value: recipe.fat_g ? `${recipe.fat_g.toFixed(1)}g` : '–' },
                    { label: 'Fiber', value: recipe.fiber_g ? `${recipe.fiber_g.toFixed(1)}g` : '–' },
                    { label: 'Sugar', value: recipe.sugar_g ? `${recipe.sugar_g.toFixed(1)}g` : '–' },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between rounded-2xl bg-secondary/60 px-4 py-3 ring-1 ring-border">
                      <span className="text-sm font-medium text-foreground">{item.label}</span>
                      <span className="text-sm text-muted-foreground">{item.value}</span>
                    </div>
                  ))}
                </div>
              </InfoCard>
            )}
          </div>

          <div className="space-y-4">
            {/* Liquid base */}
            {recipe.liquid_base && (
              <InfoCard title="Liquid Base">
                <p className="text-sm leading-6 text-muted-foreground">{recipe.liquid_base}</p>
              </InfoCard>
            )}

            {/* Source */}
            {recipe.attribution_text && (
              <InfoCard title="Source">
                <div className="rounded-2xl bg-leaf-light/60 px-4 py-3">
                  <div className="text-[13px] font-medium text-primary">{recipe.attribution_text}</div>
                  {ensureAbsoluteUrl(recipe.source_recipe_url) && (
                    <a
                      href={ensureAbsoluteUrl(recipe.source_recipe_url)!}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 block text-xs text-muted-foreground underline"
                    >
                      View original
                    </a>
                  )}
                </div>
              </InfoCard>
            )}

            {/* Sources from smoothie_recipe_sources */}
            {recipeSources.length > 0 && (
              <InfoCard title="Sources">
                <ul className="space-y-3">
                  {recipeSources.map((rs, idx) => {
                    const src = rs.source;
                    if (!src) return null;
                    const href = ensureAbsoluteUrl(src.url);
                    return (
                      <li key={src.id ?? idx} className="rounded-2xl bg-secondary/60 px-4 py-3 ring-1 ring-border">
                        {href ? (
                          <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-medium text-primary underline"
                          >
                            {src.title}
                          </a>
                        ) : (
                          <span className="text-sm font-medium text-foreground">{src.title}</span>
                        )}
                        {rs.claim_summary && (
                          <p className="mt-1 text-xs leading-5 text-muted-foreground">{rs.claim_summary}</p>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </InfoCard>
            )}

            {/* General disclaimer */}
            <InfoCard title={t("disclaimer")}>
              <p className="text-sm leading-6 text-muted-foreground">{t("generalDisclaimer")}</p>
            </InfoCard>
          </div>
        </div>
      </main>
    </div>
  );
}
