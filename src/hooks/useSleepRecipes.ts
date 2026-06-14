import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface SleepRecipeIngredient {
  id: string;
  ingredient: string;
  amount: string;
  sort_order: number;
}

export interface SleepRecipeSource {
  id: string;
  title: string;
  url: string | null;
  notes: string;
}

export interface SleepRecipe {
  id: string;
  title: string;
  description: string;
  benefits: string;
  instructions: string;
  category: string;
  prep_minutes: number;
  servings: number;
  base: string;
  tags: string[];
  symptom_tags: string[];
}

export interface SleepRecipeFull extends SleepRecipe {
  ingredients: SleepRecipeIngredient[];
  sources: SleepRecipeSource[];
}

/** List sleep recipes, optionally filtered by symptom tag(s). */
export function useSleepRecipes(symptomTags: string[] = []) {
  return useQuery({
    queryKey: ['sleep-recipes', symptomTags],
    queryFn: async (): Promise<SleepRecipe[]> => {
      let q = supabase
        .from('sleep_recipes')
        .select('id, title, description, benefits, instructions, category, prep_minutes, servings, base, tags, symptom_tags')
        .order('created_at', { ascending: true });
      if (symptomTags.length > 0) {
        q = q.overlaps('symptom_tags', symptomTags);
      }
      const { data, error } = await q;
      if (error) throw error;
      return data ?? [];
    },
    staleTime: 1000 * 60 * 10,
  });
}

/** Single sleep recipe with ingredients and sources. */
export function useSleepRecipe(id: string | undefined) {
  return useQuery({
    queryKey: ['sleep-recipe', id],
    queryFn: async (): Promise<SleepRecipeFull | null> => {
      if (!id) return null;
      const [recipeRes, ingRes, linkRes] = await Promise.all([
        supabase.from('sleep_recipes').select('*').eq('id', id).maybeSingle(),
        supabase.from('sleep_recipe_ingredients').select('*').eq('recipe_id', id).order('sort_order'),
        supabase.from('sleep_recipe_sources').select('source_id').eq('recipe_id', id),
      ]);
      if (recipeRes.error) throw recipeRes.error;
      if (!recipeRes.data) return null;
      if (ingRes.error) throw ingRes.error;
      if (linkRes.error) throw linkRes.error;

      const sourceIds = (linkRes.data ?? []).map((l) => l.source_id);
      let sources: SleepRecipeSource[] = [];
      if (sourceIds.length > 0) {
        const { data: srcData, error: srcErr } = await supabase
          .from('sleep_sources')
          .select('id, title, url, notes')
          .in('id', sourceIds);
        if (srcErr) throw srcErr;
        sources = srcData ?? [];
      }

      return {
        ...(recipeRes.data as SleepRecipe),
        ingredients: (ingRes.data ?? []) as SleepRecipeIngredient[],
        sources,
      };
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 10,
  });
}

export const MENOPAUSE_SYMPTOMS = [
  'Sömnproblem',
  'Värmevallningar',
  'Humörsvängningar',
  'Trötthet',
  'Viktuppgång',
  'Ledvärk/inflammation',
  'Skelett/bentäthet',
  'Torr hud',
  'Svullen mage',
  'Blodsockerbalans',
] as const;
