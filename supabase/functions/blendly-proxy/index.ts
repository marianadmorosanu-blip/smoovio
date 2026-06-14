import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

function jsonResponse(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const url = new URL(req.url);
  const action = url.searchParams.get("action");

  const blendlyUrl = Deno.env.get("BLENDLY_SUPABASE_URL");
  const blendlyKey = Deno.env.get("BLENDLY_SUPABASE_ANON_KEY");

  if (!blendlyUrl || !blendlyKey) {
    return jsonResponse({ error: "Blendly credentials not configured" }, 500);
  }

  const blendly = createClient(blendlyUrl, blendlyKey);

  try {
    // Recommendations via RPC — use raw REST with single unnamed param
    if (action === "recommendations") {
      const body = await req.json();
      const ingredientSlugs: string[] = body.ingredient_slugs ?? [];

      // Try different parameter names for the text[] function
      const paramNames = ["p_ingredient_slugs", "ingredient_slugs", "slugs", "p_slugs", "ingredients", "p_ingredients"];
      
      for (const name of paramNames) {
        const restUrl = `${blendlyUrl}/rest/v1/rpc/api_get_smoothie_recommendations`;
        const resp = await fetch(restUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "apikey": blendlyKey,
            "Authorization": `Bearer ${blendlyKey}`,
          },
          body: JSON.stringify({ [name]: ingredientSlugs }),
        });

        if (resp.ok) {
          const data = await resp.json();
          return jsonResponse(data);
        }
        
        const errText = await resp.text();
        // If it's a schema cache miss, try next name
        if (errText.includes("schema cache")) continue;
        // Other error - return it
        return jsonResponse({ error: errText }, resp.status);
      }
      
      return jsonResponse({ error: "Could not find matching parameter name for RPC" }, 400);
    }

    // Featured recipes list (latest published)
    if (action === "featured") {
      const limit = Number(url.searchParams.get("limit") ?? "6");
      const { data, error } = await blendly
        .from("smoothie_recipes")
        .select("id, slug, name, short_description, difficulty, is_vegan, is_gluten_free, is_dairy_free, calories_kcal, source_domain, source_recipe_url, image_url")
        .eq("status", "published")
        .order("created_at", { ascending: false, nullsFirst: false })
        .limit(limit);
      if (error) return jsonResponse({ error: error.message }, 400);
      return jsonResponse(data ?? []);
    }

    // Batch recipes by ids (for favorites)
    if (action === "recipes-by-ids") {
      const body = await req.json().catch(() => ({}));
      const ids: string[] = body.ids ?? [];
      if (ids.length === 0) return jsonResponse([]);
      const { data, error } = await blendly
        .from("smoothie_recipes")
        .select("id, slug, name, short_description, difficulty, is_vegan, is_gluten_free, is_dairy_free, calories_kcal, source_domain, source_recipe_url, image_url")
        .in("id", ids);
      if (error) return jsonResponse({ error: error.message }, 400);
      return jsonResponse(data ?? []);
    }

    // Single recipe by id from smoothie_recipes table
    if (action === "recipe") {
      const id = url.searchParams.get("id");
      if (!id) return jsonResponse({ error: "Missing id" }, 400);
      const { data, error } = await blendly
        .from("smoothie_recipes")
        .select("*")
        .eq("id", id)
        .maybeSingle();
      if (error) return jsonResponse({ error: error.message }, 400);
      if (!data) return jsonResponse({ error: "Recipe not found" }, 404);
      return jsonResponse(data);
    }

    // List all health goals
    if (action === "health-goals") {
      const { data, error } = await blendly
        .from("health_goals")
        .select("*");
      if (error) return jsonResponse({ error: error.message }, 400);
      return jsonResponse(data ?? []);
    }

    // Recipes for a given health goal id
    if (action === "recipes-by-goal") {
      const goalId = url.searchParams.get("goal_id");
      if (!goalId) return jsonResponse({ error: "Missing goal_id" }, 400);
      const { data, error } = await blendly
        .from("smoothie_recipes")
        .select("id, slug, name, short_description, instructions, difficulty, is_vegan, is_gluten_free, is_dairy_free, calories_kcal, source_domain, source_recipe_url, image_url, health_goal_id")
        .eq("health_goal_id", goalId)
        .eq("status", "published");
      if (error) return jsonResponse({ error: error.message }, 400);
      return jsonResponse(data ?? []);
    }

    // Sources for a recipe (joins smoothie_recipe_sources -> sources)
    if (action === "recipe-sources") {
      const recipeId = url.searchParams.get("recipe_id");
      if (!recipeId) return jsonResponse({ error: "Missing recipe_id" }, 400);
      const { data, error } = await blendly
        .from("smoothie_recipe_sources")
        .select("claim_summary, source:sources(id, title, url, notes)")
        .eq("recipe_id", recipeId);
      if (error) return jsonResponse({ error: error.message }, 400);
      return jsonResponse(data ?? []);
    }

    return jsonResponse({ error: `Unknown action: ${action}` }, 400);
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return jsonResponse({ error: msg }, 500);
  }
});
