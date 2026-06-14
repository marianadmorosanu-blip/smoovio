import { Link } from "react-router-dom";
import { TopNavbar } from "@/components/TopNavbar";
import { useTranslation } from "@/i18n/useTranslation";
import { useHealthGoals } from "@/hooks/useSupabaseData";
import { useBlendlyFeatured, ensureAbsoluteUrl, type BlendlyFeaturedRecipe } from "@/hooks/useBlendlyData";

function GoalCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-[22px] border border-border bg-card p-4 shadow-sm transition hover:bg-secondary">
      <div className="text-sm font-semibold text-foreground">{title}</div>
      <p className="mt-1.5 text-[12px] leading-[1.5] text-muted-foreground">{text}</p>
    </div>
  );
}

function RecipePreviewCard({ recipe }: { recipe: BlendlyFeaturedRecipe }) {
  const tags: string[] = [];
  if (recipe.is_vegan) tags.push("Vegan");
  if (recipe.is_gluten_free) tags.push("Gluten-free");
  if (recipe.is_dairy_free) tags.push("Dairy-free");

  return (
    <div className="rounded-[26px] border border-border bg-card p-5 shadow-sm">
      <div className="text-base font-semibold text-foreground">{recipe.name}</div>
      <p className="mt-1.5 text-sm leading-6 text-muted-foreground">{recipe.short_description}</p>
      {tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span key={tag} className="rounded-full bg-secondary px-2.5 py-0.5 text-[11px] font-medium text-foreground">
              {tag}
            </span>
          ))}
        </div>
      )}
      {recipe.source_domain && (
        <div className="mt-4 rounded-[18px] bg-leaf-light/50 p-3.5 ring-1 ring-border">
          <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Source
          </div>
          {ensureAbsoluteUrl(recipe.source_recipe_url) ? (
            <a
              href={ensureAbsoluteUrl(recipe.source_recipe_url)!}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 block text-[13px] font-medium text-primary underline"
            >
              {recipe.source_domain}
            </a>
          ) : (
            <div className="mt-1 text-[13px] font-medium text-primary">{recipe.source_domain}</div>
          )}
        </div>
      )}
      {recipe.calories_kcal && (
        <p className="mt-2 text-xs text-muted-foreground">{Math.round(recipe.calories_kcal)} kcal</p>
      )}
      <Link
        to={`/app/recipe/${recipe.id}`}
        className="mt-4 inline-flex items-center text-sm font-semibold text-primary transition hover:text-primary/80"
      >
        View recipe →
      </Link>
    </div>
  );
}

export default function ExplorePage() {
  const { tRecord } = useTranslation();
  const { data: goals = [] } = useHealthGoals();
  const { data: featured = [], isLoading } = useBlendlyFeatured(6);

  return (
    <div className="min-h-screen bg-background pb-24">
      <TopNavbar title="Explore" subtitle="Browse goals and recipes" />
      <main className="mx-auto max-w-6xl px-4 py-5 md:px-6 lg:px-8">
        {/* Header */}
        <section className="animate-fade-in">
          <h1 className="text-[22px] font-bold leading-tight text-foreground md:text-3xl">
            Browse goals, blends, and ideas
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            Discover the kinds of smoothie suggestions Smovioo can generate based on health goals, ingredients, and taste preferences.
          </p>
          <Link
            to="/app/create"
            className="mt-5 inline-flex items-center justify-center rounded-2xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90 active:scale-[0.98]"
          >
            Create your own →
          </Link>
        </section>

        {/* Goals */}
        <section className="mt-8">
          <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Popular directions
          </div>
          <div className="grid grid-cols-2 gap-2.5 md:grid-cols-4">
            {goals.slice(0, 8).map((goal) => (
              <GoalCard
                key={goal.id}
                title={tRecord(goal.name)}
                text={tRecord(goal.description)}
              />
            ))}
          </div>
        </section>

        {/* Recipe previews */}
        <section className="mt-8">
          <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Featured recipes
          </div>
          {isLoading ? (
            <p className="py-8 text-center text-sm text-muted-foreground">Loading…</p>
          ) : (
            <div className="space-y-3 md:grid md:grid-cols-2 md:gap-4 md:space-y-0 lg:grid-cols-3">
              {featured.map((recipe) => (
                <RecipePreviewCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
