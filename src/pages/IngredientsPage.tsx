import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { PillTag } from '@/components/PillTag';
import { useTranslation } from '@/i18n/useTranslation';
import { useIngredients } from '@/hooks/useSupabaseData';

interface IngredientsPageProps {
  selected: string[];
  onSelect: (ids: string[]) => void;
}

const categoryOrder = ['fruits', 'vegetables', 'liquids', 'proteins', 'extras'];

export default function IngredientsPage({ selected, onSelect }: IngredientsPageProps) {
  const { t, tRecord } = useTranslation();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const { data: ingredients = [], isLoading } = useIngredients();

  const filtered = useMemo(() => {
    if (!search.trim()) return ingredients;
    const q = search.toLowerCase();
    return ingredients.filter((i) =>
      Object.values(i.name).some((n) => n.toLowerCase().includes(q))
    );
  }, [search, ingredients]);

  const grouped = useMemo(() => {
    const groups: Record<string, typeof ingredients> = {};
    for (const cat of categoryOrder) {
      const items = filtered.filter((i) => i.category === cat);
      if (items.length > 0) groups[cat] = items;
    }
    return groups;
  }, [filtered]);

  const toggle = (id: string) => {
    onSelect(
      selected.includes(id)
        ? selected.filter((s) => s !== id)
        : [...selected, id]
    );
  };

  const categoryLabels: Record<string, string> = {
    fruits: t('fruits'),
    vegetables: t('vegetables'),
    liquids: t('liquids'),
    proteins: t('proteins'),
    extras: t('extras'),
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading ingredients…</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <PageHeader
        title={t('selectIngredients')}
        subtitle={`${selected.length} ${t('ingredientsSelected')}`}
        showBack
        backTo="/"
      />

      <div className="px-4 py-3 max-w-lg mx-auto w-full">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t('searchIngredients')}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-muted/50 border border-border/50 text-sm focus:outline-none focus:ring-2 focus:ring-ring/30 transition-all"
          />
        </div>

        <div className="space-y-5 pb-24">
          {Object.entries(grouped).map(([cat, items]) => (
            <div key={cat}>
              <h2 className="text-sm font-medium text-muted-foreground mb-2 uppercase tracking-wide">
                {categoryLabels[cat] || cat}
              </h2>
              <div className="flex flex-wrap gap-2">
                {items.map((item) => (
                  <PillTag
                    key={item.id}
                    label={tRecord(item.name)}
                    emoji={item.emoji}
                    selected={selected.includes(item.id)}
                    onClick={() => toggle(item.id)}
                    variant="sage"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-md border-t border-border/50 px-4 py-3">
        <div className="max-w-lg mx-auto">
          <button
            onClick={() => navigate('/goal')}
            disabled={selected.length === 0}
            className="w-full bg-primary text-primary-foreground font-semibold py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-all active:scale-[0.98]"
          >
            {t('next')} →
          </button>
        </div>
      </div>
    </div>
  );
}
