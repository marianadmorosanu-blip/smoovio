import { LogoMark } from "@/design-system/components/LogoMark";
import { PrimaryButton } from "@/design-system/components/PrimaryButton";
import { SecondaryButton } from "@/design-system/components/SecondaryButton";
import { DSRecipeCard } from "@/design-system/components/DSRecipeCard";
import { RECIPES } from "@/design-system/data";

interface DSHomePageProps {
  setActive: (view: string) => void;
}

export function DSHomePage({ setActive }: DSHomePageProps) {
  const previewRecipe = RECIPES[0];

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] items-start">
      {/* Left — brand + copy */}
      <div className="py-4 md:py-8">
        <div className="inline-flex items-center gap-2.5 mb-8">
          <LogoMark small />
          <span className="text-sm font-medium text-muted-foreground tracking-wide">Smovioo</span>
        </div>

        <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-foreground leading-[1.15] max-w-lg">
          Smart smoothie ideas from what you already have
        </h1>

        <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
          Choose your ingredients, your goal, and your taste. Smovioo suggests simple, source-aware blends in seconds.
        </p>

        <div className="mt-8 flex items-center gap-3">
          <PrimaryButton onClick={() => setActive("Ingredients")}>Start now</PrimaryButton>
          <SecondaryButton onClick={() => setActive("Results")}>See how it works</SecondaryButton>
        </div>

        <div className="mt-10 grid grid-cols-3 gap-4 max-w-sm">
          <div>
            <div className="text-2xl font-semibold text-foreground">8</div>
            <div className="text-xs text-muted-foreground mt-0.5">Health goals</div>
          </div>
          <div>
            <div className="text-2xl font-semibold text-foreground">20+</div>
            <div className="text-xs text-muted-foreground mt-0.5">Ingredients</div>
          </div>
          <div>
            <div className="text-2xl font-semibold text-foreground">Clear</div>
            <div className="text-xs text-muted-foreground mt-0.5">Sources</div>
          </div>
        </div>
      </div>

      {/* Right — product preview */}
      <div className="rounded-2xl border border-border bg-card p-4 md:p-5">
        <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">Preview — Top recommendation</div>
        <DSRecipeCard recipe={previewRecipe} onView={() => setActive("Recipe")} />
      </div>
    </div>
  );
}
