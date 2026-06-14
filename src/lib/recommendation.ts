import type { Recipe as DSRecipe, TasteTag } from '@/design-system/types';
import type { Recipe as TypedRecipe, ScoredRecipe } from '@/types';
import type { UserSelections } from '@/types';
import { recipes as typedRecipes } from '@/data/mockData';

/* ── Types ─────────────────────────────────────────────── */

export type RecommendationInput = {
  selectedIngredients: string[];
  selectedGoal?: string;
  selectedTastes: TasteTag[];
  childMode: boolean;
  recipes: DSRecipe[];
  ingredientPairings?: Record<string, number>;
};

export type RankedRecipe = DSRecipe & {
  score: number;
  exactMatches: number;
  missingRequired: string[];
  matchLabel: 'best-match' | 'good-match' | 'close-match';
};

/* ── Helpers ───────────────────────────────────────────── */

function normalize(value: string) {
  return value.trim().toLowerCase();
}

function pairingKey(a: string, b: string) {
  const parts = [normalize(a), normalize(b)].sort();
  return `${parts[0]}::${parts[1]}`;
}

/* ── Core engine (design-system recipes) ───────────────── */

export function getRecommendationsDS({
  selectedIngredients,
  selectedGoal,
  selectedTastes,
  childMode,
  recipes,
  ingredientPairings = {},
}: RecommendationInput): RankedRecipe[] {
  const normalizedSelected = selectedIngredients.map(normalize);

  return recipes
    .map((recipe) => {
      const recipeIngredients = recipe.ingredients.map(normalize);
      const requiredIngredients = recipeIngredients;

      const exactMatches = recipeIngredients.filter((ing) =>
        normalizedSelected.includes(ing)
      ).length;

      const matchedSelected = normalizedSelected.filter((ing) =>
        recipeIngredients.includes(ing)
      ).length;

      const selectedCoverage =
        normalizedSelected.length > 0
          ? matchedSelected / normalizedSelected.length
          : 0;

      const missingRequired = requiredIngredients.filter(
        (ing) => !normalizedSelected.includes(ing)
      );

      let score = 0;
      score += exactMatches * 4;
      if (selectedGoal && recipe.goal === selectedGoal) score += 5;
      score += recipe.tags.filter((tag) => selectedTastes.includes(tag)).length * 2;
      if (childMode && recipe.childFriendly) score += 4;
      if (childMode && !recipe.childFriendly) score -= 6;
      if (missingRequired.length > 2) score -= 3;

      for (let i = 0; i < selectedIngredients.length; i++) {
        for (let j = i + 1; j < selectedIngredients.length; j++) {
          const key = pairingKey(selectedIngredients[i], selectedIngredients[j]);
          score += ingredientPairings[key] ?? 0;
        }
      }

      const meaningfulMatch =
        exactMatches >= 2 || selectedCoverage >= 0.5 || missingRequired.length === 1;
      if (!meaningfulMatch) score = -999;

      let matchLabel: RankedRecipe['matchLabel'] = 'good-match';
      if (exactMatches >= 3 || selectedCoverage >= 0.75) {
        matchLabel = 'best-match';
      } else if (missingRequired.length === 1) {
        matchLabel = 'close-match';
        score += 2;
      }

      return { ...recipe, score, exactMatches, missingRequired, matchLabel };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}

/* ── Types for DB-powered recommendations ──────────────── */

export type IngredientPairing = {
  ingredient_a_id: string;
  ingredient_b_id: string;
  compatibility_score: number;
};

export type IngredientGoalRule = {
  ingredient_id: string;
  goal_id: string;
  score: number;
};

export type RecommendationContext = {
  pairings?: IngredientPairing[];
  goalRules?: IngredientGoalRule[];
};

/* ── Adapter for typed recipes (app pages) ─────────────── */

export function getRecommendations(
  selections: UserSelections,
  recipesOverride?: TypedRecipe[],
  context?: RecommendationContext,
): ScoredRecipe[] {
  const normalizedSelected = selections.ingredients.map(normalize);
  const recipesToUse = recipesOverride ?? typedRecipes;

  // Build pairing lookup
  const pairingMap: Record<string, number> = {};
  if (context?.pairings) {
    for (const p of context.pairings) {
      const key = pairingKey(p.ingredient_a_id, p.ingredient_b_id);
      pairingMap[key] = p.compatibility_score;
    }
  }

  // Build goal-rule lookup: goalId -> Set of ingredient scores
  const goalRuleMap: Record<string, Record<string, number>> = {};
  if (context?.goalRules) {
    for (const r of context.goalRules) {
      if (!goalRuleMap[r.goal_id]) goalRuleMap[r.goal_id] = {};
      goalRuleMap[r.goal_id][r.ingredient_id] = r.score;
    }
  }

  return recipesToUse
    .map((recipe) => {
      const recipeIngredientIds = recipe.ingredients.map((i) => normalize(i.ingredientId));

      const matchedIngredients = recipeIngredientIds.filter((id) =>
        normalizedSelected.includes(id)
      );

      // Count missing *required* ingredients only
      const requiredIngredients = recipe.ingredients.filter((i) => i.isRequired);
      const missingRequired = requiredIngredients.filter(
        (i) => !normalizedSelected.includes(normalize(i.ingredientId))
      );

      const selectedCoverage =
        normalizedSelected.length > 0
          ? normalizedSelected.filter((id) => recipeIngredientIds.includes(id)).length / normalizedSelected.length
          : 0;

      let score = 0;

      // Weighted ingredient matching using importance_score
      for (const ing of recipe.ingredients) {
        if (normalizedSelected.includes(normalize(ing.ingredientId))) {
          score += Math.round((ing.importanceScore / 5) * 4); // scale: importance 5 → +4, importance 10 → +8
        }
      }

      // Goal match
      const goalMatch = selections.healthGoal
        ? recipe.healthGoals.includes(selections.healthGoal)
        : false;
      if (goalMatch) score += 5;

      // Goal-ingredient synergy bonus from DB rules
      if (selections.healthGoal && goalRuleMap[selections.healthGoal]) {
        const rules = goalRuleMap[selections.healthGoal];
        for (const ingId of selections.ingredients) {
          if (rules[ingId]) {
            score += rules[ingId]; // typically 1-3
          }
        }
      }

      // Taste match
      const matchedTastes = recipe.tastes.filter((t) =>
        selections.tastes.includes(t)
      );
      score += matchedTastes.length * 2;

      // Child mode
      if (selections.childFriendly) {
        if (recipe.childFriendly) score += 4;
        else score -= 6;
      }

      // Penalty for missing required ingredients
      if (missingRequired.length > 2) score -= 3;

      // Ingredient pairing bonuses from DB
      for (let i = 0; i < selections.ingredients.length; i++) {
        for (let j = i + 1; j < selections.ingredients.length; j++) {
          const key = pairingKey(selections.ingredients[i], selections.ingredients[j]);
          if (pairingMap[key]) score += pairingMap[key];
        }
      }

      // Meaningful match threshold
      const meaningfulMatch =
        matchedIngredients.length >= 2 || selectedCoverage >= 0.5 || missingRequired.length === 1;
      if (!meaningfulMatch) score = -999;

      return {
        recipe,
        score: Math.max(0, Math.round(score)),
        matchedIngredients,
        matchedTastes,
        goalMatch,
      };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}
