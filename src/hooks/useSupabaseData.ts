import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Ingredient } from '@/types/ingredient';
import type { HealthGoal } from '@/types/healthGoal';
import type { Recipe, RecipeSource } from '@/types/recipe';
import type { TasteProfile, SupportedLocale } from '@/types';

/* ── Helpers ─────────────────────────────────── */

const LOCALES: SupportedLocale[] = ['en', 'sv', 'fr', 'es', 'it', 'ro', 'de'];

function buildLocaleRecord(
  translations: { locale: string; [key: string]: string }[],
  field: string,
): Record<SupportedLocale, string> {
  const record = {} as Record<SupportedLocale, string>;
  for (const loc of LOCALES) {
    const t = translations.find((tr) => tr.locale === loc);
    record[loc] = t ? (t as any)[field] ?? '' : '';
  }
  return record;
}

/* ── Ingredients ─────────────────────────────── */

export function useIngredients() {
  return useQuery({
    queryKey: ['ingredients'],
    queryFn: async (): Promise<Ingredient[]> => {
      const { data: rows, error: ingErr } = await supabase
        .from('ingredients')
        .select('id, emoji, category, sort_order')
        .order('sort_order');
      if (ingErr) throw ingErr;

      const { data: translations, error: trErr } = await supabase
        .from('ingredient_translations')
        .select('ingredient_id, locale, name');
      if (trErr) throw trErr;

      return (rows ?? []).map((row) => {
        const trs = (translations ?? []).filter((t) => t.ingredient_id === row.id);
        return {
          id: row.id,
          emoji: row.emoji,
          category: row.category,
          name: buildLocaleRecord(trs as any[], 'name'),
        };
      });
    },
    staleTime: 1000 * 60 * 10,
  });
}

/* ── Health Goals ─────────────────────────────── */

export function useHealthGoals() {
  return useQuery({
    queryKey: ['health_goals'],
    queryFn: async (): Promise<HealthGoal[]> => {
      const { data: rows, error: gErr } = await supabase
        .from('health_goals')
        .select('id, icon, sort_order')
        .order('sort_order');
      if (gErr) throw gErr;

      const { data: translations, error: trErr } = await supabase
        .from('health_goal_translations')
        .select('goal_id, locale, name, description');
      if (trErr) throw trErr;

      return (rows ?? []).map((row) => {
        const trs = (translations ?? []).filter((t) => t.goal_id === row.id);
        return {
          id: row.id,
          icon: row.icon,
          name: buildLocaleRecord(trs as any[], 'name'),
          description: buildLocaleRecord(trs as any[], 'description'),
        };
      });
    },
    staleTime: 1000 * 60 * 10,
  });
}

/* ── Sources ─────────────────────────────────── */

export function useSources() {
  return useQuery({
    queryKey: ['sources'],
    queryFn: async (): Promise<RecipeSource[]> => {
      const { data, error } = await supabase
        .from('sources')
        .select('id, title, url, type');
      if (error) throw error;
      return (data ?? []).map((s) => ({
        id: s.id,
        title: s.title,
        url: s.url ?? undefined,
        type: s.type as RecipeSource['type'],
      }));
    },
    staleTime: 1000 * 60 * 10,
  });
}

/* ── Recipes (fully hydrated) ────────────────── */

export function useRecipes() {
  return useQuery({
    queryKey: ['recipes'],
    queryFn: async (): Promise<Recipe[]> => {
      const [recipesRes, translationsRes, ingredientsRes, sourcesRes] = await Promise.all([
        supabase.from('recipes').select('*'),
        supabase.from('recipe_translations').select('*'),
        supabase.from('recipe_ingredients').select('*'),
        supabase.from('recipe_sources').select('recipe_id, source_id'),
      ]);

      if (recipesRes.error) throw recipesRes.error;
      if (translationsRes.error) throw translationsRes.error;
      if (ingredientsRes.error) throw ingredientsRes.error;
      if (sourcesRes.error) throw sourcesRes.error;

      const recipes = recipesRes.data ?? [];
      const translations = translationsRes.data ?? [];
      const recipeIngredients = ingredientsRes.data ?? [];
      const recipeSources = sourcesRes.data ?? [];

      return recipes.map((r) => {
        const trs = translations.filter((t) => t.recipe_id === r.id);
        const ings = recipeIngredients.filter((i) => i.recipe_id === r.id);
        const srcs = recipeSources.filter((s) => s.recipe_id === r.id);

        // Build tastes array from boolean flags
        const tastes: string[] = [];
        if (r.taste_sweet) tastes.push('sweet');
        if (r.taste_mild) tastes.push('mild');
        if (r.taste_fresh) tastes.push('fresh');
        if (r.taste_creamy) tastes.push('creamy');
        if (r.taste_full_bodied) tastes.push('full-bodied');
        if (r.taste_green) tastes.push('green');
        if (r.taste_berry) tastes.push('berry');
        if (r.taste_spiced) tastes.push('spiced');

        // Build health goals — just primary for now
        const healthGoals: string[] = r.primary_goal_id ? [r.primary_goal_id] : [];

        return {
          id: r.id,
          title: buildLocaleRecord(trs as any[], 'title'),
          description: buildLocaleRecord(trs as any[], 'description'),
          ingredients: ings.map((i) => ({
            ingredientId: i.ingredient_id,
            amount: i.amount,
            unit: i.unit,
            isRequired: i.is_required,
            importanceScore: i.importance_score,
          })),
          instructions: buildLocaleRecordArray(trs),
          tastes,
          healthGoals,
          childFriendly: r.child_friendly,
          whyRecommended: buildLocaleRecord(trs as any[], 'why_recommended'),
          disclaimer: buildLocaleRecordOptional(trs as any[], 'disclaimer'),
          sourceIds: srcs.map((s) => s.source_id),
          servings: r.servings,
          prepTimeMinutes: r.prep_time_minutes,
        } satisfies Recipe;
      });
    },
    staleTime: 1000 * 60 * 10,
  });
}

/* ── Ingredient Pairings ─────────────────────── */

export function useIngredientPairings() {
  return useQuery({
    queryKey: ['ingredient_pairings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('ingredient_pairings')
        .select('ingredient_a_id, ingredient_b_id, compatibility_score');
      if (error) throw error;
      return data ?? [];
    },
    staleTime: 1000 * 60 * 10,
  });
}

/* ── Ingredient-Goal Rules ───────────────────── */

export function useIngredientGoalRules() {
  return useQuery({
    queryKey: ['ingredient_goal_rules'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('ingredient_goal_rules')
        .select('ingredient_id, goal_id, score, rationale');
      if (error) throw error;
      return data ?? [];
    },
    staleTime: 1000 * 60 * 10,
  });
}

/* ── Taste Profiles (static, no DB table needed) ── */

export const tasteProfiles: TasteProfile[] = [
  { id: 'sweet', name: { en: 'Sweet', sv: 'Söt', fr: 'Sucré', es: 'Dulce', it: 'Dolce', ro: 'Dulce', de: 'Süß' }, emoji: '🍬' },
  { id: 'mild', name: { en: 'Mild', sv: 'Mild', fr: 'Doux', es: 'Suave', it: 'Delicato', ro: 'Blând', de: 'Mild' }, emoji: '☁️' },
  { id: 'fresh', name: { en: 'Fresh', sv: 'Fräsch', fr: 'Frais', es: 'Fresco', it: 'Fresco', ro: 'Proaspăt', de: 'Frisch' }, emoji: '🌿' },
  { id: 'creamy', name: { en: 'Creamy', sv: 'Krämig', fr: 'Crémeux', es: 'Cremoso', it: 'Cremoso', ro: 'Cremos', de: 'Cremig' }, emoji: '🥄' },
  { id: 'full-bodied', name: { en: 'Full-bodied', sv: 'Fyllig', fr: 'Corsé', es: 'Con cuerpo', it: 'Corposo', ro: 'Consistent', de: 'Vollmundig' }, emoji: '🏋️' },
  { id: 'green', name: { en: 'Green', sv: 'Grön', fr: 'Vert', es: 'Verde', it: 'Verde', ro: 'Verde', de: 'Grün' }, emoji: '🥬' },
  { id: 'berry', name: { en: 'Berry', sv: 'Bär', fr: 'Baies', es: 'Bayas', it: 'Frutti di bosco', ro: 'Fructe de pădure', de: 'Beeren' }, emoji: '🍇' },
  { id: 'spiced', name: { en: 'Spiced', sv: 'Kryddad', fr: 'Épicé', es: 'Especiado', it: 'Speziato', ro: 'Condimentat', de: 'Gewürzt' }, emoji: '🫚' },
];

/* ── Internal helpers ────────────────────────── */

function buildLocaleRecordArray(
  translations: { locale: string; instructions: string[] | null }[],
): Record<SupportedLocale, string[]> {
  const record = {} as Record<SupportedLocale, string[]>;
  for (const loc of LOCALES) {
    const t = translations.find((tr) => tr.locale === loc);
    record[loc] = t?.instructions ?? [];
  }
  return record;
}

function buildLocaleRecordOptional(
  translations: { locale: string; [key: string]: string | null }[],
  field: string,
): Record<SupportedLocale, string> | undefined {
  const hasAny = translations.some((t) => (t as any)[field]);
  if (!hasAny) return undefined;
  return buildLocaleRecord(translations as any[], field);
}
