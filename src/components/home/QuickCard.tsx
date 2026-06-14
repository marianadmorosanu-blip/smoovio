export function QuickCard({
  title,
  to,
}: {
  title: string;
  to?: string;
}) {
  if (to) {
    const { Link } = require('react-router-dom');
    return (
      <Link to={to} className="rounded-[22px] border border-border bg-card p-4 text-left shadow-sm transition hover:bg-secondary">
        <div className="text-sm font-semibold text-foreground">{title}</div>
      </Link>
    );
  }
  return (
    <button className="rounded-[22px] border border-border bg-card p-4 text-left shadow-sm transition hover:bg-secondary">
      <div className="text-sm font-semibold text-foreground">{title}</div>
    </button>
  );
}

export function RecipePreviewCard({
  title,
  desc,
}: {
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-[26px] border border-border bg-card p-5 shadow-sm">
      <div className="text-lg font-semibold text-foreground">{title}</div>
      <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
      <button className="mt-4 text-sm font-semibold text-primary hover:text-primary/80 transition-colors">
        View recipe →
      </button>
    </div>
  );
}
