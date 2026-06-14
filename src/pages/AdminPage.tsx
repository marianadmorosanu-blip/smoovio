import { PageHeader } from '@/components/PageHeader';
import { useTranslation } from '@/i18n/useTranslation';
import { useIngredients, useHealthGoals, useRecipes, useSources } from '@/hooks/useSupabaseData';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

export default function AdminPage() {
  const { t, tRecord } = useTranslation();
  const { data: ingredients = [] } = useIngredients();
  const { data: healthGoals = [] } = useHealthGoals();
  const { data: recipes = [] } = useRecipes();
  const { data: sources = [] } = useSources();

  return (
    <div className="min-h-screen">
      <PageHeader title={t('adminPanel')} showBack backTo="/" />

      <div className="px-4 py-4 max-w-lg mx-auto">
        <p className="text-sm text-muted-foreground mb-4">
          Read-only admin view — data loaded from Supabase.
        </p>

        <Tabs defaultValue="ingredients">
          <TabsList className="w-full grid grid-cols-4 mb-4">
            <TabsTrigger value="ingredients" className="text-xs">{t('manageIngredients')}</TabsTrigger>
            <TabsTrigger value="recipes" className="text-xs">{t('manageRecipes')}</TabsTrigger>
            <TabsTrigger value="goals" className="text-xs">{t('manageGoals')}</TabsTrigger>
            <TabsTrigger value="sources" className="text-xs">{t('manageSources')}</TabsTrigger>
          </TabsList>

          <TabsContent value="ingredients">
            <div className="glass-card rounded-xl divide-y divide-border/30">
              {ingredients.map((i) => (
                <div key={i.id} className="px-4 py-2.5 flex items-center justify-between">
                  <span className="text-sm flex items-center gap-2">
                    <span>{i.emoji}</span> {tRecord(i.name)}
                  </span>
                  <span className="text-xs text-muted-foreground">{i.category}</span>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="recipes">
            <div className="space-y-2">
              {recipes.map((r) => (
                <div key={r.id} className="glass-card rounded-xl p-4">
                  <h3 className="font-medium text-sm">{tRecord(r.title)}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{tRecord(r.description)}</p>
                  <div className="flex gap-1 mt-2 flex-wrap">
                    {r.tastes.map((t) => (
                      <span key={t} className="text-xs bg-muted px-2 py-0.5 rounded-pill">{t}</span>
                    ))}
                    {r.childFriendly && <span className="text-xs">👶</span>}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="goals">
            <div className="space-y-2">
              {healthGoals.map((g) => (
                <div key={g.id} className="glass-card rounded-xl p-4 flex items-start gap-3">
                  <span className="text-xl">{g.icon}</span>
                  <div>
                    <h3 className="font-medium text-sm">{tRecord(g.name)}</h3>
                    <p className="text-xs text-muted-foreground">{tRecord(g.description)}</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="sources">
            <div className="glass-card rounded-xl divide-y divide-border/30">
              {sources.map((s) => (
                <div key={s.id} className="px-4 py-3">
                  <p className="text-sm">{s.title}</p>
                  <p className="text-xs text-muted-foreground">{s.type}</p>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
