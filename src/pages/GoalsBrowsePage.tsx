import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { TopNavbar } from "@/components/TopNavbar";
import {
  useBlendlyHealthGoals,
  useBlendlyRecipesByGoal,
  type BlendlyHealthGoal,
  type BlendlyGoalRecipe,
} from "@/hooks/useBlendlyData";

function GoalChip({
  goal,
  active,
  onClick,
}: {
  goal: BlendlyHealthGoal;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={[
        "rounded-full border px-3.5 py-1.5 text-sm font-medium capitalize transition",
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-card text-foreground hover:bg-secondary",
      ].join(" ")}
    >
      {goal.name}
    </button>
  );
}

function RecipeCard({ recipe }: { recipe: BlendlyGoalRecipe }) {
  return (
    <div className="rounded-[22px] border border-border bg-card p-5 shadow-sm">
      <h3 className="text-base font-semibold text-foreground">{recipe.name}</h3>
      {recipe.short_description && (
        <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
          {recipe.short_description}
        </p>
      )}
      {recipe.instructions && (
        <p className="mt-3 line-clamp-3 text-[13px] leading-6 text-foreground/80">
          {recipe.instructions}
        </p>
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

export default function GoalsBrowsePage() {
  const { data: goals = [], isLoading: goalsLoading } = useBlendlyHealthGoals();
  const [searchParams] = useSearchParams();
  const goalFromUrl = searchParams.get("goal") ?? undefined;
  const [selectedGoalId, setSelectedGoalId] = useState<string | undefined>(goalFromUrl);

  const activeGoalId = selectedGoalId ?? goalFromUrl ?? goals[0]?.id;
  const { data: recipes = [], isLoading: recipesLoading } =
    useBlendlyRecipesByGoal(activeGoalId);

  return (
    <div className="min-h-screen bg-background pb-24">
      <TopNavbar title="Goals" subtitle="Browse smoothies by health goal" />
      <main className="mx-auto max-w-6xl px-4 py-5 md:px-6 lg:px-8">
        <section className="animate-fade-in">
          <h1 className="text-[22px] font-bold leading-tight text-foreground md:text-3xl">
            Browse by health goal
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            Pick a goal to see smoothie recipes tailored for it.
          </p>
        </section>

        <section className="mt-6">
          {goalsLoading ? (
            <p className="text-sm text-muted-foreground">Loading goals…</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {goals.map((g) => (
                <GoalChip
                  key={g.id}
                  goal={g}
                  active={g.id === activeGoalId}
                  onClick={() => setSelectedGoalId(g.id)}
                />
              ))}
            </div>
          )}
        </section>

        <section className="mt-8">
          <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Recipes
          </div>
          {recipesLoading ? (
            <p className="py-8 text-center text-sm text-muted-foreground">Loading recipes…</p>
          ) : recipes.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">
              No recipes for this goal yet.
            </p>
          ) : (
            <div className="space-y-3 md:grid md:grid-cols-2 md:gap-4 md:space-y-0 lg:grid-cols-3">
              {recipes.map((r) => (
                <RecipeCard key={r.id} recipe={r} />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
