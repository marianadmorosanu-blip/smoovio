-- Sleep recipes (new, separate from existing recipes table to avoid touching Blendly flow)
CREATE TABLE public.sleep_recipes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  benefits TEXT NOT NULL DEFAULT '',
  instructions TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL DEFAULT 'Sömn',
  prep_minutes INTEGER NOT NULL DEFAULT 5,
  servings INTEGER NOT NULL DEFAULT 1,
  base TEXT NOT NULL DEFAULT '',
  tags TEXT[] NOT NULL DEFAULT '{}',
  symptom_tags TEXT[] NOT NULL DEFAULT '{}',
  locale TEXT NOT NULL DEFAULT 'sv',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_sleep_recipes_symptom_tags ON public.sleep_recipes USING GIN(symptom_tags);
CREATE INDEX idx_sleep_recipes_tags ON public.sleep_recipes USING GIN(tags);

CREATE TABLE public.sleep_recipe_ingredients (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  recipe_id UUID NOT NULL REFERENCES public.sleep_recipes(id) ON DELETE CASCADE,
  ingredient TEXT NOT NULL,
  amount TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE INDEX idx_sleep_recipe_ingredients_recipe ON public.sleep_recipe_ingredients(recipe_id);

CREATE TABLE public.sleep_sources (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  url TEXT,
  notes TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.sleep_recipe_sources (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  recipe_id UUID NOT NULL REFERENCES public.sleep_recipes(id) ON DELETE CASCADE,
  source_id UUID NOT NULL REFERENCES public.sleep_sources(id) ON DELETE CASCADE,
  UNIQUE (recipe_id, source_id)
);

CREATE INDEX idx_sleep_recipe_sources_recipe ON public.sleep_recipe_sources(recipe_id);

-- RLS
ALTER TABLE public.sleep_recipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sleep_recipe_ingredients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sleep_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sleep_recipe_sources ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read sleep_recipes" ON public.sleep_recipes FOR SELECT USING (true);
CREATE POLICY "Public read sleep_recipe_ingredients" ON public.sleep_recipe_ingredients FOR SELECT USING (true);
CREATE POLICY "Public read sleep_sources" ON public.sleep_sources FOR SELECT USING (true);
CREATE POLICY "Public read sleep_recipe_sources" ON public.sleep_recipe_sources FOR SELECT USING (true);

-- Updated_at trigger
CREATE TRIGGER update_sleep_recipes_updated_at
BEFORE UPDATE ON public.sleep_recipes
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();