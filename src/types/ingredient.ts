import type { SupportedLocale } from './index';

export interface Ingredient {
  id: string;
  name: Record<SupportedLocale, string>;
  category: string;
  emoji: string;
}
