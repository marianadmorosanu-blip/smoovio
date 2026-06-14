import { useNavigate } from 'react-router-dom';
import { PageHeader } from '@/components/PageHeader';
import { PillTag } from '@/components/PillTag';
import { useTranslation } from '@/i18n/useTranslation';
import { tasteProfiles } from '@/hooks/useSupabaseData';
import { cn } from '@/lib/utils';

interface TastePageProps {
  selected: string[];
  onSelect: (ids: string[]) => void;
  childFriendly: boolean;
  onChildFriendlyChange: (val: boolean) => void;
}

export default function TastePage({ selected, onSelect, childFriendly, onChildFriendlyChange }: TastePageProps) {
  const { t, tRecord } = useTranslation();
  const navigate = useNavigate();

  const toggle = (id: string) => {
    onSelect(
      selected.includes(id)
        ? selected.filter((s) => s !== id)
        : [...selected, id]
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <PageHeader
        title={t('selectTaste')}
        subtitle={t('selectTasteSubtitle')}
        showBack
        backTo="/goal"
      />

      <div className="px-4 py-4 max-w-lg mx-auto w-full pb-24">
        <div className="flex flex-wrap gap-2.5 mb-8">
          {tasteProfiles.map((taste) => (
            <PillTag
              key={taste.id}
              label={tRecord(taste.name)}
              emoji={taste.emoji}
              selected={selected.includes(taste.id)}
              onClick={() => toggle(taste.id)}
              variant="berry"
            />
          ))}
        </div>

        <div className="glass-card rounded-xl p-4">
          <button
            onClick={() => onChildFriendlyChange(!childFriendly)}
            className="w-full flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">👶</span>
              <div className="text-left">
                <p className="font-medium">{t('childFriendly')}</p>
                <p className="text-xs text-muted-foreground">{t('childFriendlyDesc')}</p>
              </div>
            </div>
            <div
              className={cn(
                'w-12 h-7 rounded-pill transition-colors relative',
                childFriendly ? 'bg-primary' : 'bg-muted'
              )}
            >
              <div
                className={cn(
                  'absolute top-0.5 w-6 h-6 rounded-full bg-card shadow-sm transition-transform',
                  childFriendly ? 'translate-x-5' : 'translate-x-0.5'
                )}
              />
            </div>
          </button>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-md border-t border-border/50 px-4 py-3">
        <div className="max-w-lg mx-auto">
          <button
            onClick={() => navigate('/app/results')}
            disabled={selected.length === 0}
            className="w-full bg-primary text-primary-foreground font-semibold py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-all active:scale-[0.98]"
          >
            {t('findSmoothies')} 🥤
          </button>
        </div>
      </div>
    </div>
  );
}
