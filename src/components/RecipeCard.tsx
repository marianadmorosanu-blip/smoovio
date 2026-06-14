import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PillTag } from './PillTag';
import { useTranslation } from '@/i18n/useTranslation';
import type { ScoredRecipe } from '@/types';
import { tasteProfiles } from '@/hooks/useSupabaseData';

interface RecipeCardProps {
  scored: ScoredRecipe;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onView: () => void;
}

export function RecipeCard({ scored, isFavorite, onToggleFavorite, onView }: RecipeCardProps) {
  const { tRecord } = useTranslation();
  const { recipe, score, matchedIngredients, matchedTastes, goalMatch } = scored;

  const totalIngredients = recipe.ingredients.length;
  const matchCount = matchedIngredients.length;

  return (
    <div className="glass-card rounded-2xl p-5 animate-fade-in">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-lg leading-tight">
            {tRecord(recipe.title)}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            {tRecord(recipe.description)}
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
          score >= 10 ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
        )}>
          Score: {score}
        </span>
        {matchCount > 0 && (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-muted/60 text-foreground/70 font-medium">
            {matchCount}/{totalIngredients} ingredients
          </span>
        )}
        {matchedTastes.length > 0 && (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-muted/60 text-foreground/70 font-medium">
            {matchedTastes.length} taste{matchedTastes.length > 1 ? 's' : ''}
          </span>
        )}
        {goalMatch && (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/8 text-primary font-medium">
            Goal match
          </span>
        )}
      </div>

      <div className="flex flex-wrap gap-1.5 mb-3">
        {recipe.tastes.map((tasteId) => {
          const taste = tasteProfiles.find((t) => t.id === tasteId);
          return taste ? (
            <PillTag
              key={tasteId}
              label={tRecord(taste.name)}
              emoji={taste.emoji}
              size="sm"
              variant="sage"
            />
          ) : null;
        })}
        {recipe.childFriendly && (
          <PillTag label="Child-friendly" size="sm" variant="sand" />
        )}
      </div>

      <div className="flex items-center justify-end">
        <button
          onClick={onView}
          className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
        >
          View →
        </button>
      </div>
    </div>
  );
}
