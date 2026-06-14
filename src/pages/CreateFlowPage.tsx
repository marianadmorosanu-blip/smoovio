import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TopNavbar } from "@/components/TopNavbar";
import { useTranslation } from "@/i18n/useTranslation";
import { useIngredients, useHealthGoals } from "@/hooks/useSupabaseData";
import { useBlendlyRecommendations, type BlendlyRecommendation } from "@/hooks/useBlendlyData";

/* ── Taste profiles (static UI labels) ─────────────────── */

const TASTE_OPTIONS = [
  { id: 'sweet', label: 'Sweet', emoji: '🍬' },
  { id: 'mild', label: 'Mild', emoji: '☁️' },
  { id: 'fresh', label: 'Fresh', emoji: '🌿' },
  { id: 'creamy', label: 'Creamy', emoji: '🥄' },
  { id: 'full-bodied', label: 'Full-bodied', emoji: '🏋️' },
  { id: 'green', label: 'Green', emoji: '🥬' },
  { id: 'berry', label: 'Berry', emoji: '🍇' },
  { id: 'spiced', label: 'Spiced', emoji: '🫚' },
];

/* ── Sub-components ───────────────────────────────────── */

function StepDot({ label, step, currentStep }: { label: string; step: number; currentStep: number }) {
  const active = currentStep === step;
  const done = currentStep > step;
  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className={[
          "flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all",
          active ? "bg-primary text-primary-foreground scale-110" :
          done ? "bg-leaf-light text-primary" :
          "bg-muted text-muted-foreground",
        ].join(" ")}
      >
        {done ? (
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : step}
      </div>
      <span className={`text-[10px] font-medium ${active ? 'text-foreground' : 'text-muted-foreground'}`}>
        {label}
      </span>
    </div>
  );
}

function StepConnector({ done }: { done: boolean }) {
  return <div className={`mt-[-8px] h-0.5 flex-1 rounded-full ${done ? 'bg-leaf-light' : 'bg-border'}`} />;
}

function SelectPill({ label, active, onClick }: { label: string; active?: boolean; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className={[
        "rounded-full px-3.5 py-2 text-[13px] font-medium transition-all active:scale-[0.97]",
        active ? "bg-primary text-primary-foreground shadow-sm" : "bg-card text-foreground ring-1 ring-border hover:bg-muted",
      ].join(" ")}
    >
      {label}
    </button>
  );
}

function GoalCard({ title, description, active, onClick }: {
  title: string; description: string; active?: boolean; onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={[
        "rounded-[22px] border p-3.5 text-left transition-all active:scale-[0.98]",
        active ? "border-primary bg-leaf-light shadow-sm" : "border-border bg-card hover:bg-secondary",
      ].join(" ")}
    >
      <span className="text-sm font-semibold text-foreground">{title}</span>
      <p className="mt-1.5 text-[12px] leading-[1.4] text-muted-foreground">{description}</p>
    </button>
  );
}

function ResultCard({ rec, onView }: { rec: BlendlyRecommendation; onView: () => void }) {
  return (
    <div className="rounded-[26px] border border-border bg-card p-5 shadow-sm animate-fade-in">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-base font-semibold text-foreground">{rec.recipe_name}</div>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">{rec.recommendation_reason}</p>
        </div>
        <div className="shrink-0 rounded-full bg-leaf-light px-2.5 py-1 text-[11px] font-bold text-primary">
          {Math.round(rec.rank_score)}%
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
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

      {rec.calories_kcal && (
        <p className="mt-2 text-xs text-muted-foreground">{Math.round(rec.calories_kcal)} kcal</p>
      )}

      <button
        onClick={onView}
        className="mt-4 inline-flex items-center justify-center rounded-2xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 active:scale-[0.98]"
      >
        View recipe →
      </button>
    </div>
  );
}

/* ── Main ─────────────────────────────────────────────── */

export default function CreateFlowPage() {
  const navigate = useNavigate();
  const { t, tRecord } = useTranslation();
  const [step, setStep] = useState(1);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [selectedTastes, setSelectedTastes] = useState<string[]>([]);
  const [childMode, setChildMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { data: allIngredients = [] } = useIngredients();
  const { data: healthGoals = [] } = useHealthGoals();

  const toggleIngredient = (id: string) =>
    setSelectedIngredients((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  const toggleTaste = (id: string) =>
    setSelectedTastes((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);

  // Map selected ingredient UUIDs to name slugs for the Blendly RPC
  const ingredientSlugs = useMemo(() => {
    if (step < 4) return []; // Don't query until we reach results
    return selectedIngredients
      .map((id) => {
        const ing = allIngredients.find((i) => i.id === id);
        return ing ? ing.name.en.toLowerCase().replace(/\s+/g, '-') : '';
      })
      .filter(Boolean);
  }, [step, selectedIngredients, allIngredients]);

  const { data: results = [], isLoading: loadingResults } = useBlendlyRecommendations(ingredientSlugs);

  const categories = useMemo(() => {
    const cats = new Map<string, typeof allIngredients>();
    allIngredients.forEach((ing) => {
      const list = cats.get(ing.category) || [];
      list.push(ing);
      cats.set(ing.category, list);
    });
    return cats;
  }, [allIngredients]);

  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return categories;
    const q = searchQuery.toLowerCase();
    const filtered = new Map<string, typeof allIngredients>();
    categories.forEach((ings, cat) => {
      const matches = ings.filter((i) => tRecord(i.name).toLowerCase().includes(q));
      if (matches.length > 0) filtered.set(cat, matches);
    });
    return filtered;
  }, [categories, searchQuery, tRecord]);

  const primaryBtn = "rounded-2xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 active:scale-[0.98]";
  const secondaryBtn = "rounded-2xl border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground transition hover:bg-muted active:scale-[0.98]";

  return (
    <div className="min-h-screen bg-background">
      <TopNavbar
        title="Create"
        subtitle={step === 4 ? "Your results" : `Step ${step} of 4`}
        showBack
        onBack={() => step > 1 ? setStep((s) => s - 1) : navigate(-1)}
      />

      <main className="mx-auto max-w-6xl px-4 py-5 md:px-6 lg:px-8">
        {/* Step indicator */}
        <div className="flex items-center gap-0 px-2">
          <StepDot label={t("ingredients")} step={1} currentStep={step} />
          <StepConnector done={step > 1} />
          <StepDot label="Goal" step={2} currentStep={step} />
          <StepConnector done={step > 2} />
          <StepDot label="Taste" step={3} currentStep={step} />
          <StepConnector done={step > 3} />
          <StepDot label="Results" step={4} currentStep={step} />
        </div>

        {/* ── Step 1: Ingredients ── */}
        {step === 1 && (
          <section className="mt-6 animate-fade-in rounded-[28px] border border-border bg-card p-4 shadow-sm md:p-6">
            <h2 className="text-lg font-semibold text-foreground">{t("selectIngredients")}</h2>
            <p className="mt-1 text-sm text-muted-foreground">Choose ingredients you already have at home.</p>

            <div className="mt-3.5">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t("searchIngredients")}
                className="w-full rounded-2xl border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            {selectedIngredients.length > 0 && (
              <div className="mt-2 text-xs font-medium text-primary">
                {selectedIngredients.length} {t("ingredientsSelected")}
              </div>
            )}

            <div className="mt-4 space-y-4">
              {Array.from(filteredCategories.entries()).map(([category, ings]) => (
                <div key={category}>
                  <div className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                    {t(category as any) || category}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {ings.map((ing) => (
                      <SelectPill
                        key={ing.id}
                        label={tRecord(ing.name)}
                        active={selectedIngredients.includes(ing.id)}
                        onClick={() => toggleIngredient(ing.id)}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 flex justify-end">
              <button onClick={() => setStep(2)} disabled={selectedIngredients.length === 0} className={`${primaryBtn} disabled:opacity-40`}>
                {t("next")}
              </button>
            </div>
          </section>
        )}

        {/* ── Step 2: Goal ── */}
        {step === 2 && (
          <section className="mt-6 animate-fade-in rounded-[28px] border border-border bg-card p-4 shadow-sm md:p-6">
            <h2 className="text-lg font-semibold text-foreground">{t("selectGoal")}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{t("selectGoalSubtitle")}</p>
            <div className="mt-4 grid gap-2.5 md:grid-cols-2">
              {healthGoals.map((goal) => (
                <GoalCard
                  key={goal.id}
                  title={tRecord(goal.name)}
                  description={tRecord(goal.description)}
                  active={selectedGoal === goal.id}
                  onClick={() => setSelectedGoal(goal.id)}
                />
              ))}
            </div>
            <div className="mt-5 flex justify-between">
              <button onClick={() => setStep(1)} className={secondaryBtn}>{t("back")}</button>
              <button onClick={() => setStep(3)} disabled={!selectedGoal} className={`${primaryBtn} disabled:opacity-40`}>{t("next")}</button>
            </div>
          </section>
        )}

        {/* ── Step 3: Taste ── */}
        {step === 3 && (
          <section className="mt-6 animate-fade-in rounded-[28px] border border-border bg-card p-4 shadow-sm md:p-6">
            <h2 className="text-lg font-semibold text-foreground">{t("selectTaste")}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{t("selectTasteSubtitle")}</p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {TASTE_OPTIONS.map((taste) => (
                <SelectPill
                  key={taste.id}
                  label={`${taste.emoji} ${taste.label}`}
                  active={selectedTastes.includes(taste.id)}
                  onClick={() => toggleTaste(taste.id)}
                />
              ))}
            </div>

            {/* Child-friendly toggle */}
            <div className="mt-5 rounded-[20px] bg-secondary/60 p-3.5 ring-1 ring-border">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold text-foreground">{t("childFriendly")}</div>
                  <div className="mt-0.5 text-[12px] text-muted-foreground">{t("childFriendlyDesc")}</div>
                </div>
                <button
                  onClick={() => setChildMode(!childMode)}
                  className={`relative h-7 w-12 shrink-0 rounded-full transition ${childMode ? "bg-primary" : "bg-border"}`}
                >
                  <span className={`absolute top-0.5 h-6 w-6 rounded-full bg-card shadow-sm transition-all ${childMode ? "left-[22px]" : "left-0.5"}`} />
                </button>
              </div>
            </div>

            <div className="mt-5 flex justify-between">
              <button onClick={() => setStep(2)} className={secondaryBtn}>{t("back")}</button>
              <button onClick={() => setStep(4)} disabled={selectedTastes.length === 0} className={`${primaryBtn} disabled:opacity-40`}>
                See results
              </button>
            </div>
          </section>
        )}

        {/* ── Step 4: Results ── */}
        {step === 4 && (
          <section className="mt-6 pb-6">
            <div className="mb-5">
              <h2 className="text-lg font-semibold text-foreground">{t("yourSmoothies")}</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Based on {selectedIngredients.length} ingredients, your goal, and taste preferences.
              </p>
            </div>
            {loadingResults ? (
              <div className="text-center py-16">
                <p className="text-muted-foreground">Finding your perfect smoothies…</p>
              </div>
            ) : results.length > 0 ? (
              <div className="space-y-4">
                {results.map((rec) => (
                  <ResultCard
                    key={rec.recipe_id}
                    rec={rec}
                    onView={() => navigate(`/app/recipe/${rec.recipe_id}`)}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-[26px] border border-dashed border-border bg-card px-6 py-10 text-center">
                <p className="text-sm text-muted-foreground">{t("noResults")}</p>
              </div>
            )}
            <div className="mt-5 flex justify-between">
              <button onClick={() => { setStep(1); setSelectedIngredients([]); setSelectedGoal(null); setSelectedTastes([]); setChildMode(false); setSearchQuery(""); }} className={secondaryBtn}>
                Start over
              </button>
              <Link to="/app/home" className={primaryBtn}>
                Go to Home
              </Link>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
