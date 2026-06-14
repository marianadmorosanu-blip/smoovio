import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

/* ── Types matching the Blendly smoothie_recipes table ── */

export interface BlendlyRecipe {
  id: string;
  slug: string;
  name: string;
  short_description: string;
  instructions: string;
  servings: number;
  prep_minutes: number;
  difficulty: string;
  is_vegan: boolean;
  is_vegetarian: boolean;
  is_gluten_free: boolean;
  is_dairy_free: boolean;
  calories_kcal: number | null;
  protein_g: number | null;
  carbs_g: number | null;
  fat_g: number | null;
  fiber_g: number | null;
  sugar_g: number | null;
  liquid_base: string | null;
  image_url: string | null;
  source_id: string | null;
  source_recipe_url: string | null;
  category_id: string | null;
  status: string;
  created_at: string;
  updated_at: string;
  source_title: string | null;
  source_domain: string | null;
  source_author: string | null;
  attribution_text: string | null;
  curation_method: string | null;
  provenance_notes: string | null;
  internal_quality_score: number | null;
}

/* ── RPC response type ─────────────────────────────── */

export interface BlendlyRecommendation {
  recipe_id: string;
  recipe_slug: string;
  recipe_name: string;
  category_slug: string;
  match_count: number;
  required_count: number;
  missing_count: number;
  match_ratio: number;
  matched_ingredients: string[];
  missing_ingredients: string[];
  extra_recipe_ingredients: string[];
  recommendation_reason: string;
  rank_score: number;
  calories_kcal: number | null;
  protein_g: number | null;
  fiber_g: number | null;
  source_domain: string | null;
}

/* ── Blendly proxy helper ────────────────────────────── */

const PROJECT_ID = import.meta.env.VITE_SUPABASE_PROJECT_ID;

async function callBlendlyProxy<T>(action: string, params?: Record<string, unknown>): Promise<T> {
  const qp = new URLSearchParams({ action });
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      if (v !== undefined && v !== null && typeof v !== 'object') qp.set(k, String(v));
    }
  }
  const url = `https://${PROJECT_ID}.supabase.co/functions/v1/blendly-proxy?${qp.toString()}`;

  const { data: sessionData } = await supabase.auth.getSession();
  const token = sessionData?.session?.access_token;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'apikey': import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
  };
  headers['Authorization'] = `Bearer ${token || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`;

  const resp = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(params ?? {}),
  });

  if (!resp.ok) {
    const err = await resp.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(err.error || `Blendly proxy error: ${resp.status}`);
  }

  return resp.json();
}

/* ── Featured recipe summary (for Home / Explore) ─── */

export interface BlendlyFeaturedRecipe {
  id: string;
  slug: string;
  name: string;
  short_description: string;
  difficulty: string;
  is_vegan: boolean;
  is_gluten_free: boolean;
  is_dairy_free: boolean;
  calories_kcal: number | null;
  source_domain: string | null;
  source_recipe_url: string | null;
  image_url: string | null;
}

/** Ensure a URL string starts with https:// */
export function ensureAbsoluteUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return `https://${url}`;
}

/* ── Hooks ───────────────────────────────────────────── */

export function useBlendlyFeatured(limit = 6) {
  return useQuery({
    queryKey: ['blendly-featured', limit],
    queryFn: () => callBlendlyProxy<BlendlyFeaturedRecipe[]>('featured', { limit }),
    staleTime: 1000 * 60 * 10,
  });
}

export function useBlendlyRecipesByIds(ids: string[]) {
  return useQuery({
    queryKey: ['blendly-recipes-by-ids', ids],
    queryFn: () => callBlendlyProxy<BlendlyFeaturedRecipe[]>('recipes-by-ids', { ids }),
    enabled: ids.length > 0,
    staleTime: 1000 * 60 * 10,
  });
}

export function useBlendlyRecommendations(ingredientSlugs: string[]) {
  return useQuery({
    queryKey: ['blendly-recommendations', ingredientSlugs],
    queryFn: () => callBlendlyProxy<BlendlyRecommendation[]>('recommendations', {
      ingredient_slugs: ingredientSlugs,
    }),
    enabled: ingredientSlugs.length > 0,
    staleTime: 1000 * 60 * 5,
  });
}

export function useBlendlyRecipe(id: string | undefined) {
  return useQuery({
    queryKey: ['blendly-recipe', id],
    queryFn: () => callBlendlyProxy<BlendlyRecipe>('recipe', { id }),
    enabled: !!id,
    staleTime: 1000 * 60 * 10,
  });
}

/* ── Health goals & goal-based recipes ────────────────── */

export interface BlendlyHealthGoal {
  id: string;
  slug: string;
  name: string;
  is_active?: boolean;
}

export interface BlendlyGoalRecipe {
  id: string;
  slug: string;
  name: string;
  short_description: string;
  instructions: string;
  difficulty: string;
  is_vegan: boolean;
  is_gluten_free: boolean;
  is_dairy_free: boolean;
  calories_kcal: number | null;
  source_domain: string | null;
  source_recipe_url: string | null;
  image_url: string | null;
  health_goal_id: string;
}

export interface BlendlyRecipeSource {
  claim_summary: string | null;
  source: { id: string; title: string; url: string | null; notes: string | null } | null;
}

export function useBlendlyHealthGoals() {
  return useQuery({
    queryKey: ['blendly-health-goals'],
    queryFn: () => callBlendlyProxy<BlendlyHealthGoal[]>('health-goals'),
    staleTime: 1000 * 60 * 30,
  });
}

export function useBlendlyRecipesByGoal(goalId: string | undefined) {
  return useQuery({
    queryKey: ['blendly-recipes-by-goal', goalId],
    queryFn: () => callBlendlyProxy<BlendlyGoalRecipe[]>('recipes-by-goal', { goal_id: goalId }),
    enabled: !!goalId,
    staleTime: 1000 * 60 * 10,
  });
}

export function useBlendlyRecipeSources(recipeId: string | undefined) {
  return useQuery({
    queryKey: ['blendly-recipe-sources', recipeId],
    queryFn: () => callBlendlyProxy<BlendlyRecipeSource[]>('recipe-sources', { recipe_id: recipeId }),
    enabled: !!recipeId,
    staleTime: 1000 * 60 * 10,
  });
}
