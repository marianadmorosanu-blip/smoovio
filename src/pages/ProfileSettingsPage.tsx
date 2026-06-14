import React from "react";
import { TopNavbar } from "@/components/TopNavbar";
import { useLocale } from "@/i18n/LocaleContext";
import { useTranslation } from "@/i18n/useTranslation";
import type { SupportedLocale } from "@/types";

const LOCALE_LABELS: Record<SupportedLocale, string> = {
  en: "English",
  sv: "Svenska",
  fr: "Français",
  es: "Español",
  it: "Italiano",
  ro: "Română",
  de: "Deutsch",
};

function SettingRow({
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

function SettingsCard({
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

function ToggleRow({
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

export default function ProfileSettingsPage() {
  const { locale, setLocale } = useLocale();
  const { t } = useTranslation();

  const cycleLocale = () => {
    const locales = Object.keys(LOCALE_LABELS) as SupportedLocale[];
    const idx = locales.indexOf(locale);
    setLocale(locales[(idx + 1) % locales.length]);
  };

  return (
    <div className="min-h-screen bg-background pb-32">
      <TopNavbar title="Profile" subtitle="Settings" />

      <main className="mx-auto max-w-6xl px-4 py-6 md:px-6 lg:px-8">
        {/* Account header */}
        <section className="mb-8 rounded-[32px] border border-border bg-card p-6 shadow-sm md:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-leaf-light text-xl font-bold text-primary">
                S
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  Account
                </div>
                <div className="mt-1 text-lg font-semibold text-foreground">
                  Welcome back
                </div>
                <div className="mt-1 max-w-sm text-sm text-muted-foreground">
                  Manage your language, preferences, and saved settings.
                </div>
              </div>
            </div>
            <button className="rounded-2xl border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground transition hover:bg-muted">
              Sign out
            </button>
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-6">
            <SettingsCard title="Preferences">
              <SettingRow
                label="Language"
                value={LOCALE_LABELS[locale]}
                actionLabel="Change"
                onClick={cycleLocale}
              />
              <ToggleRow
                label={t("childFriendly")}
                description={t("childFriendlyDesc")}
              />
              <ToggleRow
                label="Notifications"
                description="Receive updates about new recipes"
                enabled={false}
              />
            </SettingsCard>

            <SettingsCard title="Account">
              <SettingRow label="Email" value="user@example.com" />
              <SettingRow label="Password" value="••••••••" />
              <SettingRow label="Data" actionLabel="Export" />
            </SettingsCard>
          </div>

          <div className="space-y-6">
            <SettingsCard title="About">
              <div className="rounded-2xl bg-secondary/40 px-4 py-4 ring-1 ring-border">
                <div className="text-xs font-medium text-muted-foreground">Version</div>
                <div className="mt-1 text-sm font-semibold text-foreground">v1 Preview</div>
              </div>
              <div className="rounded-2xl bg-secondary/40 px-4 py-4 ring-1 ring-border">
                <div className="text-xs font-medium text-muted-foreground">{t("disclaimer")}</div>
                <div className="mt-2 text-sm leading-6 text-muted-foreground">
                  {t("generalDisclaimer")}
                </div>
              </div>
              <button className="w-full rounded-2xl border border-border bg-card px-4 py-3 text-sm font-semibold text-foreground transition hover:bg-muted">
                Contact support
              </button>
            </SettingsCard>
          </div>
        </div>
      </main>
    </div>
  );
}
