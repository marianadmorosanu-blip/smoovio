import { Pill } from "@/design-system/components/Pill";
import { PrimaryButton } from "@/design-system/components/PrimaryButton";
import { SectionCard } from "@/design-system/components/SectionCard";
import { TASTES } from "@/design-system/data";
import type { TasteTag } from "@/design-system/types";

interface DSTastePageProps {
  selectedTastes: TasteTag[];
  setSelectedTastes: (t: TasteTag[]) => void;
  childMode: boolean;
  setChildMode: (v: boolean) => void;
  setActive: (view: string) => void;
}

export function DSTastePage({ selectedTastes, setSelectedTastes, childMode, setChildMode, setActive }: DSTastePageProps) {
  const toggleTaste = (tag: TasteTag) => {
    setSelectedTastes(selectedTastes.includes(tag) ? selectedTastes.filter((x) => x !== tag) : [...selectedTastes, tag]);
  };
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
      <SectionCard title="How should it taste?" subtitle="Choose one or more taste preferences.">
        <div className="flex flex-wrap gap-2">
          {TASTES.map((tag) => (
            <Pill key={tag} active={selectedTastes.includes(tag)} onClick={() => toggleTaste(tag)}>
              {tag}
            </Pill>
          ))}
        </div>
        <div className="mt-8 rounded-xl bg-muted p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-sm font-semibold text-foreground">Child-friendly mode</div>
              <div className="mt-1 text-sm text-muted-foreground">Prioritizes milder flavors and smoother textures.</div>
            </div>
            <button
              onClick={() => setChildMode(!childMode)}
              className={[
                "relative h-7 w-12 rounded-full transition",
                childMode ? "bg-primary" : "bg-border",
              ].join(" ")}
            >
              <span
                className={[
                  "absolute top-0.5 h-6 w-6 rounded-full bg-card shadow-sm transition",
                  childMode ? "left-[22px]" : "left-0.5",
                ].join(" ")}
              />
            </button>
          </div>
        </div>
        <div className="mt-6">
          <PrimaryButton onClick={() => setActive("Results")}>Show smoothie ideas</PrimaryButton>
        </div>
      </SectionCard>
      <SectionCard title="Design direction" subtitle="Visual tone for Smovioo's interface.">
        <div className="rounded-xl bg-gradient-to-br from-leaf-light to-muted p-6">
          <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Smovioo tone</div>
          <div className="mt-3 text-xl font-semibold tracking-tight text-foreground">Calm, clear, and trustworthy.</div>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
            Premium wellness aesthetic with soft hierarchy, refined spacing, and botanical restraint.
          </p>
        </div>
      </SectionCard>
    </div>
  );
}
