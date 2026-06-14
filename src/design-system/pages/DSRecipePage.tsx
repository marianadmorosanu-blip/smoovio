import { SectionCard } from "@/design-system/components/SectionCard";
import type { Recipe } from "@/design-system/types";

interface DSRecipePageProps {
  recipe: Recipe;
}

export function DSRecipePage({ recipe }: DSRecipePageProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
      <SectionCard title={recipe.title} subtitle={recipe.description}>
        <div className="flex flex-wrap gap-1.5">
          {recipe.tags.map((tag) => (
            <span key={tag} className="rounded-lg bg-muted px-2.5 py-1 text-xs font-medium text-foreground">
              {tag}
            </span>
          ))}
          <span className="rounded-lg bg-leaf-light px-2.5 py-1 text-xs font-medium text-primary">
            {recipe.childFriendly ? "Child-friendly" : "Adult taste"}
          </span>
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="text-sm font-semibold text-foreground">Ingredients</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {recipe.ingredients.map((ingredient) => (
                <li key={ingredient} className="rounded-xl bg-muted px-4 py-3">{ingredient}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">Instructions</h3>
            <div className="mt-3 rounded-xl bg-muted p-4 text-sm leading-relaxed text-muted-foreground">
              Blend all ingredients until smooth. Add more liquid if needed. Taste and adjust for texture.
            </div>
          </div>
        </div>
      </SectionCard>
      <div className="space-y-6">
        <SectionCard title="Why this is recommended">
          <p className="text-sm leading-relaxed text-muted-foreground">{recipe.why}</p>
        </SectionCard>
        <SectionCard title="Sources">
          <p className="text-sm leading-relaxed text-primary">{recipe.source}</p>
        </SectionCard>
        <SectionCard title="Disclaimer">
          <p className="text-sm leading-relaxed text-muted-foreground">
            This app provides food inspiration and does not replace professional medical advice.
          </p>
        </SectionCard>
      </div>
    </div>
  );
}
