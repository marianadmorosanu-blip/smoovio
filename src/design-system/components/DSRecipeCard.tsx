import type { Recipe } from "../types";
import { PrimaryButton } from "./PrimaryButton";
import { SecondaryButton } from "./SecondaryButton";

interface DSRecipeCardProps {
  recipe: Recipe;
  onView?: () => void;
}

export function DSRecipeCard({ recipe, onView }: DSRecipeCardProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 md:p-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <span className="inline-flex rounded-lg bg-berry-light px-2.5 py-1 text-xs font-medium text-accent">
            {recipe.goal}
          </span>
          <h3 className="mt-2.5 text-lg font-semibold tracking-tight text-foreground">{recipe.title}</h3>
          <p className="mt-1 max-w-xl text-sm text-muted-foreground">{recipe.description}</p>
        </div>
        <span
          className={[
            "inline-flex rounded-lg px-2.5 py-1 text-xs font-medium",
            recipe.childFriendly ? "bg-leaf-light text-primary" : "bg-berry-light text-accent",
          ].join(" ")}
        >
          {recipe.childFriendly ? "Child-friendly" : "Adult taste"}
        </span>
      </div>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {recipe.tags.map((tag) => (
          <span key={tag} className="rounded-lg bg-muted px-2.5 py-1 text-xs font-medium text-foreground">
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <div className="rounded-xl bg-muted p-4">
          <div className="text-sm font-medium text-foreground">Why this works</div>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{recipe.why}</p>
        </div>
        <div className="rounded-xl bg-leaf-light p-4">
          <div className="text-sm font-medium text-foreground">Source</div>
          <p className="mt-1 text-sm leading-relaxed text-primary">{recipe.source}</p>
        </div>
      </div>
      <div className="mt-5 flex flex-wrap gap-3">
        <PrimaryButton onClick={onView}>View recipe</PrimaryButton>
        <SecondaryButton>Save</SecondaryButton>
      </div>
    </div>
  );
}
