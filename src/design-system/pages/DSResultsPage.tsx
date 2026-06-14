import { DSRecipeCard } from "@/design-system/components/DSRecipeCard";
import { SectionCard } from "@/design-system/components/SectionCard";
import type { Recipe } from "@/design-system/types";
import type { RankedRecipe } from "@/lib/recommendation";

interface DSResultsPageProps {
  recipes: Recipe[];
  setActive: (view: string) => void;
  rankedRecipes?: RankedRecipe[];
}

const matchLabelEmoji: Record<string, string> = {
  'best-match': '🏆',
  'good-match': '✅',
  'close-match': '🔄',
};

function getMatchMessage(recipe: RankedRecipe) {
  if (recipe.matchLabel === "best-match") {
    return `Uses ${recipe.exactMatches} of your ingredients`;
  }
  if (recipe.matchLabel === "close-match" && recipe.missingRequired.length > 0) {
    return `Close match — add ${recipe.missingRequired[0]}`;
  }
  return `Uses ${recipe.exactMatches} of your ingredients`;
}

export function DSResultsPage({ recipes, setActive, rankedRecipes }: DSResultsPageProps) {
  const hasResults = recipes.length > 0;

  return (
    <div className="space-y-5">
      <SectionCard title="Your smoothie suggestions" subtitle="Top matches based on ingredients, goal, taste, and child mode.">
        {hasResults ? (
          <div className="grid gap-5">
            {recipes.map((recipe, idx) => {
              const ranked = rankedRecipes?.[idx];
              return (
                <div key={recipe.id} className="space-y-1.5">
                  {ranked && (
                    <div className="flex items-center gap-2 text-xs px-1">
                      <span className="font-medium text-foreground/70">
                        {matchLabelEmoji[ranked.matchLabel] ?? ''} {getMatchMessage(ranked)}
                      </span>
                    </div>
                  )}
                  <DSRecipeCard recipe={recipe} onView={() => setActive("Recipe")} />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-muted-foreground text-sm">No matching recipes found. Try adjusting your selections.</p>
          </div>
        )}
      </SectionCard>
    </div>
  );
}
