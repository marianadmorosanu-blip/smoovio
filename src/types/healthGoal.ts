import type { SupportedLocale } from './index';

export interface HealthGoal {
  id: string;
  name: Record<SupportedLocale, string>;
  description: Record<SupportedLocale, string>;
  icon: string;
}
