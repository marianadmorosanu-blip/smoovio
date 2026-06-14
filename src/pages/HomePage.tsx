import { Link } from 'react-router-dom';
import {
  Leaf, Moon, Dumbbell, Brain, HeartPulse, Sparkles, Sun, Flame,
  Shield, Droplets, Apple, Flower2, Zap, type LucideIcon,
} from 'lucide-react';
import { TopNavbar } from '@/components/TopNavbar';
import { useTranslation } from '@/i18n/useTranslation';
import {
  useBlendlyFeatured,
  useBlendlyHealthGoals,
  type BlendlyFeaturedRecipe,
} from '@/hooks/useBlendlyData';

type GoalStyle = { Icon: LucideIcon; iconBg: string; iconColor: string };

const GOAL_STYLES: { match: RegExp; style: GoalStyle }[] = [
  { match: /(sömn|sleep|sov)/i,                 style: { Icon: Moon,       iconBg: 'bg-[hsl(215_85%_96%)]', iconColor: 'text-[hsl(215_70%_50%)]' } },
  { match: /(energi|energy|vakna)/i,            style: { Icon: Zap,        iconBg: 'bg-[hsl(40_95%_94%)]',  iconColor: 'text-[hsl(32_90%_48%)]' } },
  { match: /(träning|workout|sport|muskel)/i,   style: { Icon: Dumbbell,   iconBg: 'bg-[hsl(20_85%_95%)]',  iconColor: 'text-[hsl(15_80%_50%)]' } },
  { match: /(stress|lugn|fokus|mental|hjärn)/i, style: { Icon: Brain,      iconBg: 'bg-[hsl(275_60%_96%)]', iconColor: 'text-[hsl(275_55%_55%)]' } },
  { match: /(hjärt|heart|blod)/i,               style: { Icon: HeartPulse, iconBg: 'bg-[hsl(350_75%_96%)]', iconColor: 'text-[hsl(350_70%_55%)]' } },
  { match: /(hud|skin|skön|glow)/i,             style: { Icon: Sparkles,   iconBg: 'bg-[hsl(330_70%_96%)]', iconColor: 'text-[hsl(330_60%_58%)]' } },
  { match: /(immun|förkyl|defense)/i,           style: { Icon: Shield,     iconBg: 'bg-[hsl(190_70%_94%)]', iconColor: 'text-[hsl(195_70%_42%)]' } },
  { match: /(detox|rens|liver|lever)/i,         style: { Icon: Droplets,   iconBg: 'bg-[hsl(175_65%_94%)]', iconColor: 'text-[hsl(175_65%_38%)]' } },
  { match: /(vikt|weight|slim)/i,               style: { Icon: Leaf,       iconBg: 'bg-[hsl(142_60%_94%)]', iconColor: 'text-[hsl(142_65%_40%)]' } },
  { match: /(mage|mag|gut|digest)/i,            style: { Icon: Apple,      iconBg: 'bg-[hsl(145_55%_94%)]', iconColor: 'text-[hsl(145_60%_38%)]' } },
  { match: /(klimak|hormon|menopause)/i,        style: { Icon: Flower2,    iconBg: 'bg-[hsl(310_60%_96%)]', iconColor: 'text-[hsl(310_50%_55%)]' } },
  { match: /(sommar|sun|d-vitamin)/i,           style: { Icon: Sun,        iconBg: 'bg-[hsl(40_95%_94%)]',  iconColor: 'text-[hsl(35_90%_50%)]' } },
  { match: /(brann|inflam|återhämt)/i,          style: { Icon: Flame,      iconBg: 'bg-[hsl(15_80%_94%)]',  iconColor: 'text-[hsl(10_75%_52%)]' } },
];

const DEFAULT_STYLE: GoalStyle = {
  Icon: Leaf,
  iconBg: 'bg-leaf-light',
  iconColor: 'text-primary',
};

function getGoalStyle(name: string): GoalStyle {
  return GOAL_STYLES.find(({ match }) => match.test(name))?.style ?? DEFAULT_STYLE;
}

function QuickCard({ title, to }: { title: string; to: string }) {
  const { Icon, iconBg, iconColor } = getGoalStyle(title);
  return (
    <Link
      to={to}
      className="group flex items-center gap-3 rounded-2xl border border-border/60 bg-card p-4 text-left shadow-soft transition-all duration-200 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-card hover:border-border active:scale-[0.98]"
    >
      <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${iconBg} ${iconColor} transition-transform duration-200 group-hover:scale-110`}>
        <Icon className="h-5 w-5" strokeWidth={2.25} />
      </span>
      <span className="text-[13px] font-semibold capitalize leading-tight text-foreground">{title}</span>
    </Link>
  );
}

function SuggestedRecipeCard({ recipe }: { recipe: BlendlyFeaturedRecipe }) {
  const tags: string[] = [];
  if (recipe.is_vegan) tags.push('Vegan');
  if (recipe.is_gluten_free) tags.push('Gluten-free');
  if (recipe.is_dairy_free) tags.push('Dairy-free');
  if (recipe.difficulty) tags.push(recipe.difficulty.charAt(0).toUpperCase() + recipe.difficulty.slice(1));

  return (
    <div className="rounded-3xl border border-border bg-card p-5 shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-elevated">
      <div className="text-base font-semibold text-foreground">{recipe.name}</div>
      <p className="mt-1.5 text-sm leading-6 text-muted-foreground">{recipe.short_description}</p>
      {tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span key={tag} className="rounded-full bg-leaf-light px-2.5 py-0.5 text-[11px] font-medium text-leaf-dark">{tag}</span>
          ))}
        </div>
      )}
      <Link
        to={`/app/recipe/${recipe.id}`}
        className="mt-3.5 inline-flex items-center text-sm font-semibold text-primary transition hover:text-primary/80"
      >
        View recipe →
      </Link>
    </div>
  );
}

export default function HomePage() {
  const { t } = useTranslation();
  const { data: featured = [], isLoading } = useBlendlyFeatured(3);
  const { data: goals = [], isLoading: goalsLoading } = useBlendlyHealthGoals();

  return (
    <div className="min-h-screen bg-background pb-24">
      <TopNavbar title="Smovioo" />
      <main className="mx-auto max-w-6xl px-4 py-5 md:px-6 lg:px-8">

        <section className="animate-fade-in">
          <h1 className="text-[22px] font-bold leading-tight text-foreground md:text-3xl">
            Feel better.<br className="md:hidden" /> Blend smarter.
          </h1>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Personalized smoothies for your body, your goals, your day.
          </p>
          <div className="mt-5 flex items-center gap-3">
            <Link
              to="/app/create"
              className="inline-flex items-center justify-center rounded-2xl bg-gradient-fresh px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-button transition-all duration-200 hover:-translate-y-0.5 hover:shadow-elevated active:scale-[0.97]"
            >
              Create smoothie
            </Link>
            <Link
              to="/how-it-works"
              className="inline-flex items-center justify-center px-2 py-3 text-sm font-semibold text-muted-foreground transition hover:text-foreground"
            >
              How it works →
            </Link>
          </div>
        </section>

        <section className="mt-7">
          <div className="mb-2.5 flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Quick start — by goal
            </span>
            <Link to="/app/goals" className="text-xs font-semibold text-primary transition hover:text-primary/80">
              See all →
            </Link>
          </div>
          {goalsLoading ? (
            <p className="py-4 text-sm text-muted-foreground">Loading…</p>
          ) : (
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
              {goals.slice(0, 8).map((g) => (
                <QuickCard key={g.id} title={g.name} to={`/app/goals?goal=${g.id}`} />
              ))}
            </div>
          )}
        </section>

        <section className="mt-8">
          <div className="mb-2.5 flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Suggested for you
            </span>
            <Link to="/app/explore" className="text-xs font-semibold text-primary transition hover:text-primary/80">
              See all →
            </Link>
          </div>
          {isLoading ? (
            <p className="py-8 text-center text-sm text-muted-foreground">Loading…</p>
          ) : (
            <div className="space-y-3 md:grid md:grid-cols-2 md:gap-4 md:space-y-0 lg:grid-cols-3">
              {featured.map((recipe) => (
                <SuggestedRecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          )}
        </section>

        <footer className="mt-8 pb-2">
          <p className="text-[11px] text-muted-foreground max-w-sm leading-5">
            {t('generalDisclaimer')}
          </p>
        </footer>
      </main>
    </div>
  );
}
