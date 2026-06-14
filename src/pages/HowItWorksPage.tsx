import React from "react";
import { TopNavbar } from "@/components/TopNavbar";
import { useTranslation } from "@/i18n/useTranslation";

function StepCard({
  step,
  title,
  text,
}: {
  step: string;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-[28px] border border-border bg-card p-5 shadow-sm md:p-6">
      <div className="inline-flex rounded-full bg-leaf-light px-3 py-1 text-xs font-semibold text-primary">
        {step}
      </div>
      <h3 className="mt-4 text-lg font-semibold text-foreground">{title}</h3>
      <p className="mt-2 text-sm leading-7 text-muted-foreground">{text}</p>
    </div>
  );
}

function PrincipleCard({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-3xl border border-border bg-card p-5 shadow-sm">
      <div className="text-sm font-semibold text-foreground">{title}</div>
      <p className="mt-2 text-sm leading-7 text-muted-foreground">{text}</p>
    </div>
  );
}

export default function HowItWorksPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background">
      <TopNavbar title="How it works" subtitle="A simple guide to Smovioo" showBack />

      <main className="mx-auto max-w-6xl px-4 py-6 md:px-6 lg:px-8">
        {/* Hero */}
        <section className="rounded-[32px] border border-border bg-card p-6 shadow-sm md:p-8">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Overview
          </div>
          <h1 className="mt-2 text-3xl font-bold tracking-[-0.03em] text-foreground md:text-4xl">
            How Smovioo works
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground md:text-base">
            Smovioo helps users create smoothie suggestions based on ingredients they already have,
            the type of smoothie they want, and the flavor profile they prefer. The experience is
            designed to feel simple, calm, and trustworthy.
          </p>
        </section>

        {/* Steps */}
        <section className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <StepCard
            step="Step 1"
            title="Choose ingredients"
            text="Start with ingredients you already have at home. This keeps recommendations practical and easy to use."
          />
          <StepCard
            step="Step 2"
            title="Pick a goal"
            text="Choose a direction like filling, energizing, child-friendly, or more balanced."
          />
          <StepCard
            step="Step 3"
            title="Choose your taste"
            text="Select one or more taste preferences such as creamy, berry, mild, or fresh."
          />
          <StepCard
            step="Step 4"
            title="Get suggestions"
            text="Smovioo shows a small set of polished recipe suggestions with a short explanation."
          />
        </section>

        {/* Principles */}
        <section className="mt-10">
          <div className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Principles
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <PrincipleCard
              title="Use what you already have"
              text="Recommendations begin with real ingredients, not random ideas."
            />
            <PrincipleCard
              title="See the reasoning"
              text="Each suggested smoothie includes a short explanation so the result feels clear and useful."
            />
            <PrincipleCard
              title="Stay careful and clear"
              text="Smovioo is designed for food inspiration and uses cautious, trust-focused wording."
            />
          </div>
        </section>

        {/* Disclaimer */}
        <section className="mt-10 rounded-[32px] border border-border bg-card p-6 shadow-sm md:p-8">
          <div className="text-sm font-semibold text-foreground">{t("disclaimer")}</div>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">
            {t("generalDisclaimer")}
          </p>
        </section>
      </main>
    </div>
  );
}
