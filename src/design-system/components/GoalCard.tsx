interface GoalCardProps {
  title: string;
  description: string;
  active?: boolean;
  onClick?: () => void;
}

export function GoalCard({ title, description, active, onClick }: GoalCardProps) {
  return (
    <button
      onClick={onClick}
      className={[
        "w-full rounded-2xl border p-5 text-left transition",
        active
          ? "border-primary bg-leaf-light"
          : "border-border bg-card hover:bg-muted",
      ].join(" ")}
    >
      <div className="text-sm font-semibold text-foreground">{title}</div>
      <div className="mt-1 text-sm text-muted-foreground">{description}</div>
    </button>
  );
}