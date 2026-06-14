
-- Enum for source types
CREATE TYPE public.source_type AS ENUM ('study', 'guideline', 'book', 'article');

-- Enum for pairing types
CREATE TYPE public.pairing_type AS ENUM ('classic', 'complementary', 'experimental');

-- Supported locales enum
CREATE TYPE public.supported_locale AS ENUM ('en', 'sv', 'fr', 'es', 'it', 'ro', 'de');

-- ─── Ingredients ─────────────────────────────────────────
CREATE TABLE public.ingredients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  emoji TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.ingredient_translations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ingredient_id UUID NOT NULL REFERENCES public.ingredients(id) ON DELETE CASCADE,
  locale public.supported_locale NOT NULL,
  name TEXT NOT NULL,
  UNIQUE (ingredient_id, locale)
);

-- ─── Health Goals ────────────────────────────────────────
CREATE TABLE public.health_goals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  icon TEXT NOT NULL DEFAULT '',
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.health_goal_translations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  goal_id UUID NOT NULL REFERENCES public.health_goals(id) ON DELETE CASCADE,
  locale public.supported_locale NOT NULL,
  name TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  UNIQUE (goal_id, locale)
);

-- ─── Sources ─────────────────────────────────────────────
CREATE TABLE public.sources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  url TEXT,
  type public.source_type NOT NULL DEFAULT 'guideline',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ─── Recipes ─────────────────────────────────────────────
CREATE TABLE public.recipes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  primary_goal_id UUID REFERENCES public.health_goals(id) ON DELETE SET NULL,
  child_friendly BOOLEAN NOT NULL DEFAULT false,
  servings INT NOT NULL DEFAULT 1,
  prep_time_minutes INT NOT NULL DEFAULT 5,
  taste_sweet BOOLEAN NOT NULL DEFAULT false,
  taste_mild BOOLEAN NOT NULL DEFAULT false,
  taste_fresh BOOLEAN NOT NULL DEFAULT false,
  taste_creamy BOOLEAN NOT NULL DEFAULT false,
  taste_full_bodied BOOLEAN NOT NULL DEFAULT false,
  taste_green BOOLEAN NOT NULL DEFAULT false,
  taste_berry BOOLEAN NOT NULL DEFAULT false,
  taste_spiced BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.recipe_translations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  recipe_id UUID NOT NULL REFERENCES public.recipes(id) ON DELETE CASCADE,
  locale public.supported_locale NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  why_recommended TEXT NOT NULL DEFAULT '',
  disclaimer TEXT,
  instructions TEXT[] NOT NULL DEFAULT '{}',
  UNIQUE (recipe_id, locale)
);

-- ─── Recipe Ingredients (junction) ───────────────────────
CREATE TABLE public.recipe_ingredients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  recipe_id UUID NOT NULL REFERENCES public.recipes(id) ON DELETE CASCADE,
  ingredient_id UUID NOT NULL REFERENCES public.ingredients(id) ON DELETE CASCADE,
  amount TEXT NOT NULL DEFAULT '',
  unit TEXT NOT NULL DEFAULT '',
  is_required BOOLEAN NOT NULL DEFAULT true,
  importance_score INT NOT NULL DEFAULT 5,
  UNIQUE (recipe_id, ingredient_id)
);

-- ─── Ingredient-Goal Rules ───────────────────────────────
CREATE TABLE public.ingredient_goal_rules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ingredient_id UUID NOT NULL REFERENCES public.ingredients(id) ON DELETE CASCADE,
  goal_id UUID NOT NULL REFERENCES public.health_goals(id) ON DELETE CASCADE,
  score INT NOT NULL DEFAULT 0,
  rationale TEXT NOT NULL DEFAULT '',
  UNIQUE (ingredient_id, goal_id)
);

-- ─── Ingredient Pairings ─────────────────────────────────
CREATE TABLE public.ingredient_pairings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ingredient_a_id UUID NOT NULL REFERENCES public.ingredients(id) ON DELETE CASCADE,
  ingredient_b_id UUID NOT NULL REFERENCES public.ingredients(id) ON DELETE CASCADE,
  compatibility_score INT NOT NULL DEFAULT 0,
  pairing_type public.pairing_type NOT NULL DEFAULT 'complementary',
  UNIQUE (ingredient_a_id, ingredient_b_id)
);

-- ─── Recipe Sources (junction) ───────────────────────────
CREATE TABLE public.recipe_sources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  recipe_id UUID NOT NULL REFERENCES public.recipes(id) ON DELETE CASCADE,
  source_id UUID NOT NULL REFERENCES public.sources(id) ON DELETE CASCADE,
  UNIQUE (recipe_id, source_id)
);

-- ─── Goal Sources (junction) ─────────────────────────────
CREATE TABLE public.goal_sources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  goal_id UUID NOT NULL REFERENCES public.health_goals(id) ON DELETE CASCADE,
  source_id UUID NOT NULL REFERENCES public.sources(id) ON DELETE CASCADE,
  UNIQUE (goal_id, source_id)
);

-- ─── Editorial Notes ─────────────────────────────────────
CREATE TABLE public.editorial_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  topic TEXT NOT NULL,
  summary TEXT NOT NULL,
  source_ids UUID[] NOT NULL DEFAULT '{}',
  locale public.supported_locale NOT NULL DEFAULT 'en',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ─── Language Settings ───────────────────────────────────
CREATE TABLE public.language_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  locale public.supported_locale NOT NULL UNIQUE,
  label TEXT NOT NULL,
  enabled BOOLEAN NOT NULL DEFAULT true
);

-- ─── User Favorites ─────────────────────────────────────
CREATE TABLE public.user_favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  recipe_id UUID NOT NULL REFERENCES public.recipes(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, recipe_id)
);

-- ─── User Pantry ─────────────────────────────────────────
CREATE TABLE public.user_pantry (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  ingredient_id UUID NOT NULL REFERENCES public.ingredients(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, ingredient_id)
);

-- ─── Enable RLS on all tables ────────────────────────────
ALTER TABLE public.ingredients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ingredient_translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.health_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.health_goal_translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recipe_translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recipe_ingredients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ingredient_goal_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ingredient_pairings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recipe_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.goal_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.editorial_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.language_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_pantry ENABLE ROW LEVEL SECURITY;

-- ─── RLS: Public read for reference data ─────────────────
CREATE POLICY "Public read ingredients" ON public.ingredients FOR SELECT USING (true);
CREATE POLICY "Public read ingredient_translations" ON public.ingredient_translations FOR SELECT USING (true);
CREATE POLICY "Public read health_goals" ON public.health_goals FOR SELECT USING (true);
CREATE POLICY "Public read health_goal_translations" ON public.health_goal_translations FOR SELECT USING (true);
CREATE POLICY "Public read sources" ON public.sources FOR SELECT USING (true);
CREATE POLICY "Public read recipes" ON public.recipes FOR SELECT USING (true);
CREATE POLICY "Public read recipe_translations" ON public.recipe_translations FOR SELECT USING (true);
CREATE POLICY "Public read recipe_ingredients" ON public.recipe_ingredients FOR SELECT USING (true);
CREATE POLICY "Public read ingredient_goal_rules" ON public.ingredient_goal_rules FOR SELECT USING (true);
CREATE POLICY "Public read ingredient_pairings" ON public.ingredient_pairings FOR SELECT USING (true);
CREATE POLICY "Public read recipe_sources" ON public.recipe_sources FOR SELECT USING (true);
CREATE POLICY "Public read goal_sources" ON public.goal_sources FOR SELECT USING (true);
CREATE POLICY "Public read editorial_notes" ON public.editorial_notes FOR SELECT USING (true);
CREATE POLICY "Public read language_settings" ON public.language_settings FOR SELECT USING (true);

-- ─── RLS: User-owned data ────────────────────────────────
CREATE POLICY "Users read own favorites" ON public.user_favorites FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert own favorites" ON public.user_favorites FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users delete own favorites" ON public.user_favorites FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users read own pantry" ON public.user_pantry FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert own pantry" ON public.user_pantry FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users delete own pantry" ON public.user_pantry FOR DELETE USING (auth.uid() = user_id);

-- ─── Updated-at trigger ──────────────────────────────────
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_recipes_updated_at
  BEFORE UPDATE ON public.recipes
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
