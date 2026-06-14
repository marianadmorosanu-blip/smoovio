import type { SupportedLocale } from './index';

export interface Recipe {
  id: string;
  title: Record<SupportedLocale, string>;
  description: Record<SupportedLocale, string>;
  ingredients: { ingredientId: string; amount: string; unit: string; isRequired: boolean; importanceScore: number }[];
  instructions: Record<SupportedLocale, string[]>;
  tastes: string[];
  healthGoals: string[];
  childFriendly: boolean;
  whyRecommended: Record<SupportedLocale, string>;
  disclaimer?: Record<SupportedLocale, string>;
  sourceIds: string[];
  servings: number;
  prepTimeMinutes: number;
}

export interface RecipeSource {
  id: string;
  title: string;
  url?: string;
  type: 'study' | 'guideline' | 'book' | 'article';
}

export interface ScoredRecipe {
  recipe: Recipe;
  score: number;
  matchedIngredients: string[];
  matchedTastes: string[];
  goalMatch: boolean;
}
