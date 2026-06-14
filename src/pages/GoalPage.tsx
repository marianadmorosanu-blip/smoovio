import { useNavigate } from 'react-router-dom';
import { PageHeader } from '@/components/PageHeader';
import { useTranslation } from '@/i18n/useTranslation';
import { useHealthGoals } from '@/hooks/useSupabaseData';
import { cn } from '@/lib/utils';

interface GoalPageProps {
  selected: string | null;
  onSelect: (id: string) => void;
}

export default function GoalPage({ selected, onSelect }: GoalPageProps) {
  const { t, tRecord } = useTranslation();
  const navigate = useNavigate();
  const { data: healthGoals = [], isLoading } = useHealthGoals();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading goals…</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <PageHeader
        title={t('selectGoal')}
        subtitle={t('selectGoalSubtitle')}
        showBack
        backTo="/ingredients"
      />

      <div className="px-4 py-4 max-w-lg mx-auto w-full pb-24">
        <div className="grid gap-3">
          {healthGoals.map((goal) => (
            <button
              key={goal.id}
              onClick={() => onSelect(goal.id)}
              className={cn(
                'w-full text-left p-4 rounded-xl border-2 transition-all active:scale-[0.98]',
                selected === goal.id
                  ? 'border-primary bg-primary/5 shadow-sm'
                  : 'border-border/50 bg-card hover:border-primary/30'
              )}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{goal.icon}</span>
                <div>
                  <h3 className="font-medium">{tRecord(goal.name)}</h3>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {tRecord(goal.description)}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-md border-t border-border/50 px-4 py-3">
        <div className="max-w-lg mx-auto">
          <button
            onClick={() => navigate('/taste')}
            disabled={!selected}
            className="w-full bg-primary text-primary-foreground font-semibold py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-all active:scale-[0.98]"
          >
            {t('next')} →
          </button>
        </div>
      </div>
    </div>
  );
}
