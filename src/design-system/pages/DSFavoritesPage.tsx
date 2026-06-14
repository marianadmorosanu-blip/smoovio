import { SectionCard } from "@/design-system/components/SectionCard";
import { RECIPES } from "@/design-system/data";

export function DSFavoritesPage() {
  return (
    <SectionCard title="Your favorites" subtitle="Saved recipes appear here for quick access later.">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {RECIPES.slice(0, 3).map((recipe) => (
          <div key={recipe.id} className="rounded-2xl border border-border bg-muted p-5">
            <div className="text-base font-semibold tracking-tight text-foreground">{recipe.title}</div>
            <div className="mt-1 text-sm text-muted-foreground">{recipe.description}</div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {recipe.tags.slice(0, 2).map((tag) => (
                <span key={tag} className="rounded-lg bg-card px-2.5 py-1 text-xs font-medium text-foreground">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
