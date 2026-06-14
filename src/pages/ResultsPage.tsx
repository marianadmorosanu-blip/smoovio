import { useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { PageHeader } from '@/components/PageHeader';
import { useTranslation } from '@/i18n/useTranslation';
import { useFavorites } from '@/hooks/useFavorites';
import { useBlendlyRecommendations, type BlendlyRecommendation } from '@/hooks/useBlendlyData';
import { useIngredients } from '@/hooks/useSupabaseData';
import type { UserSelections } from '@/types';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ResultsPageProps {
  selections: UserSelections;
}

function RecommendationCard({
  rec,
  isFavorite,
  onToggleFavorite,
  onView,
}: {
  rec: BlendlyRecommendation;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onView: () => void;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm animate-fade-in">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-lg leading-tight text-foreground">
            {rec.recipe_name}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            {rec.recommendation_reason}
          </p>
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); onToggleFavorite(); }}
          className="shrink-0 p-2 rounded-full hover:bg-muted transition-colors"
        >
          <Heart
            className={cn(
              'h-5 w-5 transition-colors',
              isFavorite ? 'fill-berry text-berry' : 'text-muted-foreground'
            )}
          />
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-2 mb-3 text-xs">
        <span className={cn(
          'inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-medium',
          rec.match_ratio >= 0.75 ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
        )}>
          {rec.match_count}/{rec.required_count} ingredients
        </span>
        {rec.category_slug && (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-muted text-foreground/70 font-medium capitalize">
            {rec.category_slug}
          </span>
        )}
        {rec.calories_kcal && (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-muted text-foreground/70 font-medium">
            {Math.round(rec.calories_kcal)} kcal
          </span>
        )}
        {rec.source_domain && (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-muted text-foreground/70 font-medium">
            {rec.source_domain}
          </span>
        )}
      </div>

      {/* Matched & missing ingredients */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {rec.matched_ingredients.map((ing) => (
          <span key={ing} className="rounded-full bg-leaf-light px-2.5 py-0.5 text-[11px] font-semibold text-primary">
            ✓ {ing}
          </span>
        ))}
        {rec.missing_ingredients.map((ing) => (
          <span key={ing} className="rounded-full bg-secondary px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground">
            + {ing}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-end">
        <button onClick={onView} className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
          View →
        </button>
      </div>
    </div>
  );
}

export default function ResultsPage({ selections }: ResultsPageProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();

  const { data: allIngredients = [] } = useIngredients();

  // Map UUIDs to English name slugs for the Blendly RPC
  const ingredientSlugs = useMemo(() => {
    return selections.ingredients
      .map((id) => {
        const ing = allIngredients.find((i) => i.id === id);
        return ing ? ing.name.en.toLowerCase().replace(/\s+/g, '-') : '';
      })
      .filter(Boolean);
  }, [selections.ingredients, allIngredients]);

  const { data: results = [], isLoading, error } = useBlendlyRecommendations(ingredientSlugs);

  const hasResults = results.length > 0;

  return (
    <div className="min-h-screen flex flex-col">
      <PageHeader title={t('yourSmoothies')} showBack backTo="/taste" />

      <div className="px-4 py-4 max-w-lg mx-auto w-full">
        {isLoading && (
          <div className="text-center py-16">
            <p className="text-muted-foreground">Finding your perfect smoothies…</p>
          </div>
        )}

        {error && (
          <div className="text-center py-16">
            <p className="text-destructive mb-2">Something went wrong</p>
            <p className="text-sm text-muted-foreground">{(error as Error).message}</p>
          </div>
        )}

        {!isLoading && !error && hasResults && (
          <div className="space-y-4">
            {results.map((rec) => (
              <RecommendationCard
                key={rec.recipe_id}
                rec={rec}
                isFavorite={isFavorite(rec.recipe_id)}
                onToggleFavorite={() => toggleFavorite(rec.recipe_id)}
                onView={() => navigate(`/app/recipe/${rec.recipe_id}`)}
              />
            ))}
          </div>
        )}

        {!isLoading && !error && !hasResults && selections.ingredients.length > 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground mb-4">{t('noResults')}</p>
            <Link to="/ingredients" className="text-primary font-medium hover:text-primary/80">
              {t('tryAgain')}
            </Link>
          </div>
        )}

        <div className="mt-8 p-4 rounded-xl bg-muted/50 border border-border/30">
          <p className="text-xs text-muted-foreground leading-relaxed">
            ⚠️ {t('generalDisclaimer')}
          </p>
        </div>
      </div>
    </div>
  );
}
