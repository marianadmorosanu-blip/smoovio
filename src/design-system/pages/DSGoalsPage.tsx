import { GoalCard } from "@/design-system/components/GoalCard";
import { PrimaryButton } from "@/design-system/components/PrimaryButton";
import { SectionCard } from "@/design-system/components/SectionCard";
import { GOALS, GOAL_DESCRIPTIONS } from "@/design-system/data";
import type { HealthGoal } from "@/design-system/types";

interface DSGoalsPageProps {
  selectedGoal: HealthGoal;
  setSelectedGoal: (g: HealthGoal) => void;
  setActive: (view: string) => void;
}

export function DSGoalsPage({ selectedGoal, setSelectedGoal, setActive }: DSGoalsPageProps) {
  return (
    <SectionCard title="What is your goal today?" subtitle="Choose one primary goal for the best recommendations.">
      <div className="grid gap-3 md:grid-cols-2">
        {GOALS.map((goal) => (
          <GoalCard
            key={goal}
            title={goal}
            description={GOAL_DESCRIPTIONS[goal]}
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
