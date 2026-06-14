import React, { useMemo, useState } from "react";

type TasteTag = "Sweet" | "Mild" | "Fresh" | "Creamy" | "Full-bodied" | "Green" | "Berry" | "Spiced";

type HealthGoal =
  | "General healthy"
  | "Fiber focus"
  | "Heart-friendly"
  | "Blood sugar conscious"
  | "Filling"
  | "Child-friendly"
  | "Gentle for sensitive stomach"
  | "Energizing";

type Recipe = {
  id: string;
  title: string;
  description: string;
  tags: TasteTag[];
  childFriendly: boolean;
  goal: HealthGoal;
  ingredients: string[];
  why: string;
  source: string;
};

const COLORS = {
  leaf: "#6FA65D",
  leafDark: "#4F7E40",
  mint: "#EEF7EC",
  berry: "#C85C7A",
  berrySoft: "#F8E8EE",
  cream: "#FAF7F2",
  sand: "#F3EEE5",
  text: "#233127",
  muted: "#647166",
  border: "#DCE8D8",
  white: "#FFFFFF",
};

const INGREDIENTS = [
  "Banana", "Blueberries", "Strawberries", "Raspberries", "Mango", "Apple",
  "Pear", "Orange", "Spinach", "Kale", "Carrot", "Beetroot", "Ginger",
  "Oats", "Yogurt", "Kefir", "Oat milk", "Chia seeds", "Avocado",
];

const GOALS: HealthGoal[] = [
  "General healthy", "Fiber focus", "Heart-friendly", "Blood sugar conscious",
  "Filling", "Child-friendly", "Gentle for sensitive stomach", "Energizing",
];

const TASTES: TasteTag[] = [
  "Sweet", "Mild", "Fresh", "Creamy", "Full-bodied", "Green", "Berry", "Spiced",
];

const RECIPES: Recipe[] = [
  {
    id: "1",
    title: "Creamy Blueberry Balance",
    description: "Balanced berry smoothie with oats and yogurt.",
    tags: ["Sweet", "Creamy", "Berry"],
    childFriendly: true,
    goal: "Blood sugar conscious",
    ingredients: ["Banana", "Blueberries", "Oats", "Yogurt", "Oat milk", "Spinach"],
    why: "Uses fruit, oats, and yogurt for a more rounded smoothie option.",
    source: "CDC • Diabetes meal planning",
  },
  {
    id: "2",
    title: "Mild Strawberry Oat",
    description: "Soft berry flavor with a child-friendly texture.",
    tags: ["Sweet", "Mild", "Berry"],
    childFriendly: true,
    goal: "Child-friendly",
    ingredients: ["Strawberries", "Banana", "Oats", "Yogurt", "Oat milk"],
    why: "Prioritizes mild, familiar flavors and smooth texture.",
    source: "NHS • Foods for babies and young children",
  },
  {
    id: "3",
    title: "Green Daily Blend",
    description: "A greener smoothie for everyday fruit-and-veg inspiration.",
    tags: ["Green", "Fresh"],
    childFriendly: false,
    goal: "General healthy",
    ingredients: ["Apple", "Spinach", "Kale", "Avocado", "Oat milk"],
    why: "A simple way to include greens in an everyday smoothie.",
    source: "WHO • Healthy diet",
  },
  {
    id: "4",
    title: "Filling Banana Oat Smoothie",
    description: "A thicker smoothie designed to feel more satisfying.",
    tags: ["Sweet", "Creamy", "Full-bodied"],
    childFriendly: true,
    goal: "Filling",
    ingredients: ["Banana", "Oats", "Chia seeds", "Yogurt", "Oat milk"],
    why: "Oats, chia, and yogurt create a more filling texture.",
    source: "WHO • Healthy diet",
  },
  {
    id: "5",
    title: "Fresh Mango Carrot",
    description: "A bright and lively blend with mango and carrot.",
    tags: ["Fresh", "Sweet"],
    childFriendly: true,
    goal: "Energizing",
    ingredients: ["Mango", "Carrot", "Orange", "Oat milk"],
    why: "Pairs sweet fruit with vibrant color and fresh flavor.",
    source: "Livsmedelsverket • Fruit and vegetables",
  },
  {
    id: "6",
    title: "Gentle Pear Oat",
    description: "A mellow smoothie with simple flavors and soft texture.",
    tags: ["Mild", "Creamy"],
    childFriendly: true,
    goal: "Gentle for sensitive stomach",
    ingredients: ["Pear", "Oats", "Yogurt", "Oat milk"],
    why: "Uses simpler ingredients and a soft, lower-acid profile.",
    source: "NHS • Living with kidney disease",
  },
];

function LogoMark({ small = false }: { small?: boolean }) {
  return (
    <div
      className={[
        "relative overflow-hidden rounded-full",
        small ? "h-10 w-10" : "h-14 w-14",
      ].join(" ")}
      style={{ background: `linear-gradient(135deg, ${COLORS.leaf}, ${COLORS.berry})` }}
    >
      <div className="absolute inset-0 flex items-center justify-center text-white font-black text-lg">S</div>
      <div className="absolute -right-1 top-1 h-4 w-4 rounded-full bg-white/25" />
      <div className="absolute left-1 bottom-1 h-3 w-3 rounded-full bg-white/20" />
    </div>
  );
}

function BrandWordmark() {
  return (
    <div className="flex items-center gap-3">
      <LogoMark />
      <div>
        <div className="text-2xl font-black tracking-tight text-[#233127]">Smovioo</div>
        <div className="text-sm text-[#647166]">Smoothie ideas made simple</div>
      </div>
    </div>
  );
}

function AppShell({
  children,
  active,
  setActive,
}: {
  children: React.ReactNode;
  active: string;
  setActive: (view: string) => void;
}) {
  const nav = ["Home", "Ingredients", "Goals", "Taste", "Results", "Recipe", "Favorites"];
  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#233127]">
      <div className="mx-auto max-w-7xl px-4 py-4 md:px-6 lg:px-8">
        <header className="sticky top-4 z-20 mb-6 rounded-[28px] border border-[#DCE8D8] bg-white/85 px-4 py-3 shadow-sm backdrop-blur md:px-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <BrandWordmark />
            <nav className="flex flex-wrap gap-2">
              {nav.map((item) => (
                <button
                  key={item}
                  onClick={() => setActive(item)}
                  className={[
                    "rounded-full px-4 py-2 text-sm font-semibold transition",
                    active === item
                      ? "bg-[#6FA65D] text-white shadow-sm"
                      : "bg-[#FAF7F2] text-[#233127] hover:bg-[#EEF7EC]",
                  ].join(" ")}
                >
                  {item}
                </button>
              ))}
            </nav>
          </div>
        </header>
        {children}
      </div>
    </div>
  );
}

function SectionCard({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <section className="rounded-[32px] border border-[#DCE8D8] bg-white p-5 shadow-sm md:p-6">
      <div className="mb-4">
        <h2 className="text-xl font-bold tracking-tight text-[#233127]">{title}</h2>
        {subtitle ? <p className="mt-1 text-sm text-[#647166]">{subtitle}</p> : null}
      </div>
      {children}
    </section>
  );
}

function Pill({
  children,
  active = false,
  onClick,
}: {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={[
        "rounded-full px-4 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-[#6FA65D]/30",
        active
          ? "bg-[#6FA65D] text-white shadow-sm"
          : "border border-[#DCE8D8] bg-white text-[#233127] hover:bg-[#EEF7EC]",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

function PrimaryButton({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="rounded-full bg-[#6FA65D] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#4F7E40]"
    >
      {children}
    </button>
  );
}

function SecondaryButton({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="rounded-full border border-[#DCE8D8] bg-white px-5 py-3 text-sm font-semibold text-[#233127] transition hover:bg-[#EEF7EC]"
    >
      {children}
    </button>
  );
}

function GoalCard({
  title,
  description,
  active,
  onClick,
}: {
  title: string;
  description: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={[
        "w-full rounded-[28px] border p-5 text-left transition",
        active ? "border-[#6FA65D] bg-[#EEF7EC] shadow-sm" : "border-[#DCE8D8] bg-white hover:bg-[#FAF7F2]",
      ].join(" ")}
    >
      <div className="text-base font-bold text-[#233127]">{title}</div>
      <div className="mt-1 text-sm text-[#647166]">{description}</div>
    </button>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[28px] border border-[#DCE8D8] bg-white p-4 shadow-sm">
      <div className="text-xs font-bold uppercase tracking-[0.14em] text-[#647166]">{label}</div>
      <div className="mt-2 text-2xl font-black tracking-tight text-[#233127]">{value}</div>
    </div>
  );
}

function RecipeCard({ recipe, onView }: { recipe: Recipe; onView?: () => void }) {
  return (
    <div className="rounded-[30px] border border-[#DCE8D8] bg-white p-5 shadow-sm md:p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="inline-flex rounded-full bg-[#F8E8EE] px-3 py-1 text-xs font-bold text-[#A33E5A]">
            {recipe.goal}
          </div>
          <h3 className="mt-3 text-xl font-black tracking-tight text-[#233127]">{recipe.title}</h3>
          <p className="mt-1 max-w-xl text-sm text-[#647166]">{recipe.description}</p>
        </div>
        <span
          className={[
            "inline-flex rounded-full px-3 py-1 text-xs font-bold",
            recipe.childFriendly ? "bg-[#EEF7EC] text-[#4F7E40]" : "bg-[#F8E8EE] text-[#A33E5A]",
          ].join(" ")}
        >
          {recipe.childFriendly ? "Child-friendly" : "Adult taste"}
        </span>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {recipe.tags.map((tag) => (
          <span key={tag} className="rounded-full bg-[#FAF7F2] px-3 py-1 text-xs font-semibold text-[#233127]">
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-5 grid gap-4 md:grid-cols-[1fr_0.9fr]">
        <div className="rounded-[24px] bg-[#FAF7F2] p-4">
          <div className="text-sm font-bold text-[#233127]">Why this works</div>
          <p className="mt-1 text-sm leading-6 text-[#647166]">{recipe.why}</p>
        </div>
        <div className="rounded-[24px] bg-[#EEF7EC] p-4">
          <div className="text-sm font-bold text-[#233127]">Source</div>
          <p className="mt-1 text-sm leading-6 text-[#4F7E40]">{recipe.source}</p>
        </div>
      </div>
      <div className="mt-5 flex flex-wrap gap-3">
        <PrimaryButton onClick={onView}>View recipe</PrimaryButton>
        <SecondaryButton>Save</SecondaryButton>
      </div>
    </div>
  );
}

function HomePage({ setActive }: { setActive: (view: string) => void }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
      <section className="rounded-[36px] bg-gradient-to-br from-[#EEF7EC] via-[#FAF7F2] to-[#F8E8EE] p-7 shadow-sm md:p-10">
        <div className="inline-flex items-center gap-3 rounded-full bg-white px-4 py-2 shadow-sm">
          <LogoMark small />
          <div>
            <div className="text-base font-black tracking-tight">Smovioo</div>
            <div className="text-xs text-[#647166]">English-first, multilingual-ready</div>
          </div>
        </div>
        <h1 className="mt-6 max-w-3xl text-4xl font-black tracking-tight text-[#233127] md:text-6xl">
          App Store-level smoothie design, built for trust and delight.
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-[#647166] md:text-lg">
          Create evidence-informed smoothie ideas based on what users already have at home, with polished interactions, soft visuals, and source-backed recommendations.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <PrimaryButton onClick={() => setActive("Ingredients")}>Create smoothie</PrimaryButton>
          <SecondaryButton onClick={() => setActive("Results")}>See example results</SecondaryButton>
        </div>
      </section>
      <div className="grid grid-cols-2 gap-4">
        <StatCard label="Health goals" value="8" />
        <StatCard label="Ingredients" value="20+" />
        <StatCard label="Languages" value="7-ready" />
        <StatCard label="Sources" value="Clear" />
      </div>
    </div>
  );
}

function IngredientsPage({
  selected,
  setSelected,
  setActive,
}: {
  selected: string[];
  setSelected: (value: string[]) => void;
  setActive: (view: string) => void;
}) {
  const [query, setQuery] = useState("");
  const filtered = INGREDIENTS.filter((item) => item.toLowerCase().includes(query.toLowerCase()));
  const toggle = (item: string) => {
    setSelected(selected.includes(item) ? selected.filter((x) => x !== item) : [...selected, item]);
  };
  return (
    <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
      <SectionCard title="What do you have at home?" subtitle="Pick ingredients to generate relevant smoothie ideas.">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-[22px] border border-[#DCE8D8] bg-[#FAF7F2] px-4 py-3 text-sm outline-none placeholder:text-[#94A092] focus:border-[#6FA65D]"
          placeholder="Search ingredients..."
        />
        <div className="mt-4 flex flex-wrap gap-2">
          {selected.length === 0 ? (
            <span className="text-sm text-[#647166]">No ingredients selected yet.</span>
          ) : (
            selected.map((item) => (
              <Pill key={item} active onClick={() => toggle(item)}>
                {item}
              </Pill>
            ))
          )}
        </div>
        <div className="mt-6">
          <PrimaryButton onClick={() => setActive("Goals")}>Next step</PrimaryButton>
        </div>
      </SectionCard>
      <SectionCard title="Popular ingredients" subtitle="Tap to add or remove ingredients.">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {filtered.map((item) => (
            <button
              key={item}
              onClick={() => toggle(item)}
              className={[
                "flex items-center justify-between rounded-[22px] border px-4 py-4 text-left transition",
                selected.includes(item)
                  ? "border-[#6FA65D] bg-[#EEF7EC]"
                  : "border-[#DCE8D8] bg-white hover:bg-[#FAF7F2]",
              ].join(" ")}
            >
              <span className="text-sm font-semibold">{item}</span>
              <span className="text-lg font-bold text-[#6FA65D]">{selected.includes(item) ? "−" : "+"}</span>
            </button>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}

function GoalsPage({ selectedGoal, setSelectedGoal, setActive }: { selectedGoal: HealthGoal; setSelectedGoal: (g: HealthGoal) => void; setActive: (view: string) => void }) {
  const descriptions: Record<HealthGoal, string> = {
    "General healthy": "Balanced smoothie ideas for everyday wellness.",
    "Fiber focus": "Options that prioritize fiber-rich ingredients.",
    "Heart-friendly": "Inspired by heart-conscious food choices.",
    "Blood sugar conscious": "More balanced smoothie combinations.",
    Filling: "Smoother ideas that feel more satisfying.",
    "Child-friendly": "Milder flavor combinations for children.",
    "Gentle for sensitive stomach": "Softer ingredient choices and calmer flavors.",
    Energizing: "Bright, fresh blends for a lively feel.",
  };
  return (
    <SectionCard title="What is your goal today?" subtitle="Choose one primary goal for the best recommendations.">
      <div className="grid gap-4 md:grid-cols-2">
        {GOALS.map((goal) => (
          <GoalCard
            key={goal}
            title={goal}
            description={descriptions[goal]}
            active={selectedGoal === goal}
            onClick={() => setSelectedGoal(goal)}
          />
        ))}
      </div>
      <div className="mt-6">
        <PrimaryButton onClick={() => setActive("Taste")}>Continue</PrimaryButton>
      </div>
    </SectionCard>
  );
}

function TastePage({
  selectedTastes,
  setSelectedTastes,
  childMode,
  setChildMode,
  setActive,
}: {
  selectedTastes: TasteTag[];
  setSelectedTastes: (t: TasteTag[]) => void;
  childMode: boolean;
  setChildMode: (v: boolean) => void;
  setActive: (view: string) => void;
}) {
  const toggleTaste = (tag: TasteTag) => {
    setSelectedTastes(selectedTastes.includes(tag) ? selectedTastes.filter((x) => x !== tag) : [...selectedTastes, tag]);
  };
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
      <SectionCard title="How should it taste?" subtitle="Choose one or more taste preferences.">
        <div className="flex flex-wrap gap-3">
          {TASTES.map((tag) => (
            <Pill key={tag} active={selectedTastes.includes(tag)} onClick={() => toggleTaste(tag)}>
              {tag}
            </Pill>
          ))}
        </div>
        <div className="mt-8 rounded-[28px] bg-[#FAF7F2] p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-base font-bold">Child-friendly mode</div>
              <div className="mt-1 text-sm text-[#647166]">Prioritizes milder flavors and smoother textures.</div>
            </div>
            <button
              onClick={() => setChildMode(!childMode)}
              className={[
                "relative h-8 w-14 rounded-full transition",
                childMode ? "bg-[#6FA65D]" : "bg-[#DCE8D8]",
              ].join(" ")}
            >
              <span
                className={[
                  "absolute top-1 h-6 w-6 rounded-full bg-white shadow-sm transition",
                  childMode ? "left-7" : "left-1",
                ].join(" ")}
              />
            </button>
          </div>
        </div>
        <div className="mt-6">
          <PrimaryButton onClick={() => setActive("Results")}>Show smoothie ideas</PrimaryButton>
        </div>
      </SectionCard>
      <SectionCard title="Preview" subtitle="This section shows the interaction style for tags and controls.">
        <div className="rounded-[28px] bg-gradient-to-br from-[#EEF7EC] to-[#F8E8EE] p-6">
          <div className="text-sm font-bold uppercase tracking-[0.16em] text-[#647166]">Smovioo tone</div>
          <div className="mt-3 text-2xl font-black tracking-tight">Friendly, polished, and trustworthy.</div>
          <p className="mt-3 max-w-md text-sm leading-7 text-[#647166]">
            Use soft corners, gentle contrast, and clear hierarchy so the product feels premium and calm instead of clinical.
          </p>
        </div>
      </SectionCard>
    </div>
  );
}

function ResultsPage({ recipes, setActive }: { recipes: Recipe[]; setActive: (view: string) => void }) {
  return (
    <div className="space-y-5">
      <SectionCard title="Your smoothie suggestions" subtitle="Top matches based on ingredients, goal, taste, and child mode.">
        <div className="grid gap-5">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} onView={() => setActive("Recipe")} />
          ))}
        </div>
      </SectionCard>
    </div>
  );
}

function RecipePage({ recipe }: { recipe: Recipe }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
      <SectionCard title={recipe.title} subtitle={recipe.description}>
        <div className="flex flex-wrap gap-2">
          {recipe.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-[#FAF7F2] px-3 py-1 text-xs font-semibold">
              {tag}
            </span>
          ))}
          <span className="rounded-full bg-[#EEF7EC] px-3 py-1 text-xs font-semibold text-[#4F7E40]">
            {recipe.childFriendly ? "Child-friendly" : "Adult taste"}
          </span>
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="text-base font-bold">Ingredients</h3>
            <ul className="mt-3 space-y-2 text-sm text-[#647166]">
              {recipe.ingredients.map((ingredient) => (
                <li key={ingredient} className="rounded-2xl bg-[#FAF7F2] px-4 py-3">{ingredient}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-base font-bold">Instructions</h3>
            <div className="mt-3 rounded-[24px] bg-[#FAF7F2] p-4 text-sm leading-7 text-[#647166]">
              Blend all ingredients until smooth. Add more liquid if needed. Taste and adjust for texture.
            </div>
          </div>
        </div>
      </SectionCard>
      <div className="space-y-6">
        <SectionCard title="Why this is recommended">
          <p className="text-sm leading-7 text-[#647166]">{recipe.why}</p>
        </SectionCard>
        <SectionCard title="Sources">
          <p className="text-sm leading-7 text-[#4F7E40]">{recipe.source}</p>
        </SectionCard>
        <SectionCard title="Disclaimer">
          <p className="text-sm leading-7 text-[#647166]">
            This app provides food inspiration and does not replace professional medical advice.
          </p>
        </SectionCard>
      </div>
    </div>
  );
}

function FavoritesPage() {
  return (
    <SectionCard title="Your favorites" subtitle="Saved recipes appear here for quick access later.">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {RECIPES.slice(0, 3).map((recipe) => (
          <div key={recipe.id} className="rounded-[28px] border border-[#DCE8D8] bg-[#FAF7F2] p-5">
            <div className="text-lg font-bold tracking-tight">{recipe.title}</div>
            <div className="mt-1 text-sm text-[#647166]">{recipe.description}</div>
            <div className="mt-4 flex flex-wrap gap-2">
              {recipe.tags.slice(0, 2).map((tag) => (
                <span key={tag} className="rounded-full bg-white px-3 py-1 text-xs font-semibold">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

function AdminPage() {
  const items = ["Ingredients", "Health goals", "Recipes", "Sources", "Rules", "Translations"];
  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <SectionCard title="Admin navigation" subtitle="Simple content management for version 1.">
        <div className="grid gap-3">
          {items.map((item) => (
            <button key={item} className="rounded-[22px] border border-[#DCE8D8] bg-white px-4 py-4 text-left font-semibold hover:bg-[#FAF7F2]">
              {item}
            </button>
          ))}
        </div>
      </SectionCard>
      <SectionCard title="Recent content" subtitle="Example content cards for editing workflows.">
        <div className="grid gap-3">
          {["Creamy Blueberry Balance", "General healthy", "Banana", "WHO • Healthy diet"].map((item) => (
            <div key={item} className="rounded-[22px] bg-[#FAF7F2] px-4 py-4 text-sm font-semibold text-[#233127]">
              {item}
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}

export default function SmoviooDesignSystem() {
  const [active, setActive] = useState("Home");
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>(["Banana", "Blueberries", "Oats", "Yogurt"]);
  const [selectedGoal, setSelectedGoal] = useState<HealthGoal>("Blood sugar conscious");
  const [selectedTastes, setSelectedTastes] = useState<TasteTag[]>(["Sweet", "Creamy"]);
  const [childMode, setChildMode] = useState(true);

  const filteredRecipes = useMemo(() => {
    return [...RECIPES]
      .map((recipe) => {
        let score = 0;
        score += recipe.ingredients.filter((ingredient) => selectedIngredients.includes(ingredient)).length * 3;
        if (recipe.goal === selectedGoal) score += 5;
        score += recipe.tags.filter((tag) => selectedTastes.includes(tag)).length * 2;
        if (childMode && recipe.childFriendly) score += 4;
        if (childMode && !recipe.childFriendly) score -= 5;
        return { recipe, score };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map((item) => item.recipe);
  }, [selectedIngredients, selectedGoal, selectedTastes, childMode]);

  const featuredRecipe = filteredRecipes[0] ?? RECIPES[0];

  return (
    <AppShell active={active} setActive={setActive}>
      {active === "Home" && <HomePage setActive={setActive} />}
      {active === "Ingredients" && (
        <IngredientsPage selected={selectedIngredients} setSelected={setSelectedIngredients} setActive={setActive} />
      )}
      {active === "Goals" && (
        <GoalsPage selectedGoal={selectedGoal} setSelectedGoal={setSelectedGoal} setActive={setActive} />
      )}
      {active === "Taste" && (
        <TastePage
          selectedTastes={selectedTastes}
          setSelectedTastes={setSelectedTastes}
          childMode={childMode}
          setChildMode={setChildMode}
          setActive={setActive}
        />
      )}
      {active === "Results" && <ResultsPage recipes={filteredRecipes} setActive={setActive} />}
      {active === "Recipe" && <RecipePage recipe={featuredRecipe} />}
      {active === "Favorites" && <FavoritesPage />}
      {active === "Admin" && <AdminPage />}
    </AppShell>
  );
}
