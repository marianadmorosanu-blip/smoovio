export function StepCard({
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

export function PrincipleCard({
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
