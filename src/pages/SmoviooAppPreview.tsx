import { useMemo, useState } from "react";
import { AppShell } from "@/design-system/components/AppShell";
import { DSHomePage } from "@/design-system/pages/DSHomePage";
import { DSIngredientsPage } from "@/design-system/pages/DSIngredientsPage";
import { DSGoalsPage } from "@/design-system/pages/DSGoalsPage";
import { DSTastePage } from "@/design-system/pages/DSTastePage";
import { DSResultsPage } from "@/design-system/pages/DSResultsPage";
import { DSRecipePage } from "@/design-system/pages/DSRecipePage";
import { DSFavoritesPage } from "@/design-system/pages/DSFavoritesPage";
import { DSAdminPage } from "@/design-system/pages/DSAdminPage";
import { RECIPES } from "@/design-system/data";
import { getRecommendationsDS } from "@/lib/recommendation";
import type { HealthGoal, TasteTag } from "@/design-system/types";

export default function SmoviooAppPreview() {
  const [active, setActive] = useState("Home");
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>(["Banana", "Blueberries", "Oats", "Yogurt"]);
  const [selectedGoal, setSelectedGoal] = useState<HealthGoal>("Blood sugar conscious");
  const [selectedTastes, setSelectedTastes] = useState<TasteTag[]>(["Sweet", "Creamy"]);
  const [childMode, setChildMode] = useState(true);

  const rankedRecipes = useMemo(() => {
    return getRecommendationsDS({
      selectedIngredients,
      selectedGoal,
      selectedTastes,
      childMode,
      recipes: RECIPES,
    });
  }, [selectedIngredients, selectedGoal, selectedTastes, childMode]);

  const filteredRecipes = rankedRecipes.map(({ score, exactMatches, missingRequired, matchLabel, ...recipe }) => recipe);
  const featuredRecipe = filteredRecipes[0] ?? RECIPES[0];

  return (
    <AppShell active={active} setActive={setActive}>
      {active === "Home" && <DSHomePage setActive={setActive} />}
      {active === "Ingredients" && (
        <DSIngredientsPage selected={selectedIngredients} setSelected={setSelectedIngredients} setActive={setActive} />
      )}
      {active === "Goals" && (
        <DSGoalsPage selectedGoal={selectedGoal} setSelectedGoal={setSelectedGoal} setActive={setActive} />
      )}
      {active === "Taste" && (
        <DSTastePage
          selectedTastes={selectedTastes}
          setSelectedTastes={setSelectedTastes}
          childMode={childMode}
          setChildMode={setChildMode}
          setActive={setActive}
        />
      )}
      {active === "Results" && <DSResultsPage recipes={filteredRecipes} setActive={setActive} rankedRecipes={rankedRecipes} />}
      {active === "Recipe" && <DSRecipePage recipe={featuredRecipe} />}
      {active === "Favorites" && <DSFavoritesPage />}
      {active === "Admin" && <DSAdminPage />}
    </AppShell>
  );
}
