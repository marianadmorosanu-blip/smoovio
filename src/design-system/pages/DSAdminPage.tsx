import { SectionCard } from "@/design-system/components/SectionCard";

export function DSAdminPage() {
  const items = ["Ingredients", "Health goals", "Recipes", "Sources", "Rules", "Translations"];
  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <SectionCard title="Admin navigation" subtitle="Simple content management for version 1.">
        <div className="grid gap-2">
          {items.map((item) => (
            <button key={item} className="rounded-xl border border-border bg-card px-4 py-3.5 text-left text-sm font-medium text-foreground hover:bg-muted transition">
              {item}
            </button>
          ))}
        </div>
      </SectionCard>
      <SectionCard title="Recent content" subtitle="Example content cards for editing workflows.">
        <div className="grid gap-2">
          {["Creamy Blueberry Balance", "General healthy", "Banana", "WHO • Healthy diet"].map((item) => (
            <div key={item} className="rounded-xl bg-muted px-4 py-3.5 text-sm font-medium text-foreground">
              {item}
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
