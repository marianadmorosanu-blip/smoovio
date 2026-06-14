import React from 'react';

export function SettingRow({
  label,
  value,
  actionLabel = "Edit",
  onClick,
}: {
  label: string;
  value?: string;
  actionLabel?: string;
  onClick?: () => void;
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-secondary/40 px-4 py-4 ring-1 ring-border">
      <div>
        <div className="text-sm font-medium text-foreground">{label}</div>
        {value ? <div className="mt-0.5 text-xs text-muted-foreground">{value}</div> : null}
      </div>
      <button
        onClick={onClick}
        className="rounded-xl border border-border bg-card px-4 py-1.5 text-xs font-semibold text-foreground transition hover:bg-muted"
      >
        {actionLabel}
      </button>
    </div>
  );
}

export function SettingsCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-[28px] border border-border bg-card p-5 shadow-sm md:p-6">
      <h2 className="mb-4 text-base font-semibold text-foreground">{title}</h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

export function ToggleRow({
  label,
  description,
  enabled = true,
}: {
  label: string;
  description: string;
  enabled?: boolean;
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-secondary/40 px-4 py-4 ring-1 ring-border">
      <div className="max-w-[70%]">
        <div className="text-sm font-medium text-foreground">{label}</div>
        <div className="mt-0.5 text-xs text-muted-foreground">{description}</div>
      </div>
      <div
        className={`h-7 w-12 rounded-full p-0.5 transition ${
          enabled ? "bg-primary" : "bg-muted"
        }`}
      >
        <div
          className={`h-6 w-6 rounded-full bg-card shadow-sm transition-transform ${
            enabled ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </div>
    </div>
  );
}
