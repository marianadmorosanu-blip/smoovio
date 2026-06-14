export type SupportedLocale = 'en' | 'sv' | 'fr' | 'es' | 'it' | 'ro' | 'de';

export interface Translatable {
  id: string;
  translations: Record<SupportedLocale, string>;
}

// Re-export domain types
export type { Ingredient } from './ingredient';
export type { HealthGoal } from './healthGoal';
export type { Recipe, RecipeSource, ScoredRecipe } from './recipe';
export type { TabKey, NavTab } from './navigation';

export interface TasteProfile {
  id: string;
  name: Record<SupportedLocale, string>;
  emoji: string;
}

export interface UserSelections {
  ingredients: string[];
  healthGoal: string | null;
  tastes: string[];
  childFriendly: boolean;
}
