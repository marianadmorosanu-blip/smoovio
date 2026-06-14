import { Link } from "react-router-dom";
import { TopNavbar } from "@/components/TopNavbar";
import { useFavorites } from "@/hooks/useFavorites";
import { useBlendlyRecipesByIds, type BlendlyFeaturedRecipe } from "@/hooks/useBlendlyData";

function FavoriteCard({
  recipe,
  onRemove,
}: {
  recipe: BlendlyFeaturedRecipe;
  onRemove: () => void;
}) {
  const tags: string[] = [];
  if (recipe.is_vegan) tags.push("Vegan");
  if (recipe.is_gluten_free) tags.push("Gluten-free");
  if (recipe.is_dairy_free) tags.push("Dairy-free");

  return (
    <div className="rounded-[24px] border border-border bg-card p-5 shadow-sm">
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
      <div className="mt-4 flex items-center justify-end gap-2 border-t border-border pt-3.5">
        <button
          onClick={onRemove}
          className="rounded-xl border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground transition hover:bg-muted active:scale-[0.98]"
        >
          Remove
        </button>
        <Link
          to={`/app/recipe/${recipe.id}`}
          className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 active:scale-[0.98]"
        >
          View
        </Link>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="rounded-[28px] border border-dashed border-border bg-card px-6 py-12 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-leaf-light">
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-primary" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M12 20.5s-6.5-4.2-8.5-8A5.3 5.3 0 0 1 12 6a5.3 5.3 0 0 1 8.5 6.5c-2 3.8-8.5 8-8.5 8Z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h2 className="mt-4 text-lg font-semibold text-foreground">No saved recipes yet</h2>
      <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
        Save recipes you like so they are easy to revisit later.
      </p>
      <Link
        to="/app/explore"
        className="mt-5 inline-flex items-center justify-center rounded-2xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 active:scale-[0.98]"
      >
        Explore recipes
      </Link>
    </div>
  );
}

export default function FavoritesPage() {
  const { favorites, toggleFavorite } = useFavorites();
  const { data: savedRecipes = [], isLoading } = useBlendlyRecipesByIds(favorites);

  return (
    <div className="min-h-screen bg-background pb-24">
      <TopNavbar title="Favorites" />
      <main className="mx-auto max-w-6xl px-4 py-5 md:px-6 lg:px-8">
        <section className="animate-fade-in">
          <h1 className="text-[22px] font-bold leading-tight text-foreground md:text-3xl">
            Your saved blends
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            Keep your favorite smoothie ideas in one place for quick access.
          </p>
        </section>

        <div className="mt-6">
          {isLoading ? (
            <p className="py-8 text-center text-sm text-muted-foreground">Loading…</p>
          ) : savedRecipes.length > 0 ? (
            <div className="space-y-3 md:grid md:grid-cols-2 md:gap-4 md:space-y-0">
              {savedRecipes.map((recipe) => (
                <FavoriteCard
                  key={recipe.id}
                  recipe={recipe}
                  onRemove={() => toggleFavorite(recipe.id)}
                />
              ))}
            </div>
          ) : (
            <EmptyState />
          )}
        </div>
      </main>
    </div>
  );
}
