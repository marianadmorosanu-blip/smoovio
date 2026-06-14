import { useState } from "react";
import { Pill } from "@/design-system/components/Pill";
import { PrimaryButton } from "@/design-system/components/PrimaryButton";
import { SectionCard } from "@/design-system/components/SectionCard";
import { INGREDIENTS } from "@/design-system/data";

interface DSIngredientsPageProps {
  selected: string[];
  setSelected: (value: string[]) => void;
  setActive: (view: string) => void;
}

export function DSIngredientsPage({ selected, setSelected, setActive }: DSIngredientsPageProps) {
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
          className="w-full rounded-xl border border-border bg-muted px-4 py-3 text-sm outline-none placeholder:text-muted-foreground focus:border-primary"
          placeholder="Search ingredients..."
        />
        <div className="mt-4 flex flex-wrap gap-2">
          {selected.length === 0 ? (
            <span className="text-sm text-muted-foreground">No ingredients selected yet.</span>
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
                "flex items-center justify-between rounded-xl border px-4 py-3.5 text-left transition",
                selected.includes(item)
                  ? "border-primary bg-leaf-light"
                  : "border-border bg-card hover:bg-muted",
              ].join(" ")}
            >
              <span className="text-sm font-medium">{item}</span>
              <span className="text-base font-semibold text-primary">{selected.includes(item) ? "−" : "+"}</span>
            </button>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
