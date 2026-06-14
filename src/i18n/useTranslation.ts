import { useCallback } from 'react';
import translations from './translations';
import { useLocale } from './LocaleContext';
import type { SupportedLocale } from '@/types';

export function useTranslation() {
  const { locale } = useLocale();
  
  const t = useCallback((key: keyof typeof translations['en']) => {
    return translations[locale]?.[key] ?? translations.en[key] ?? key;
  }, [locale]);

  const tRecord = useCallback((record: Record<SupportedLocale, string> | undefined) => {
    if (!record) return '';
    return record[locale] ?? record.en ?? '';
  }, [locale]);

  const tRecordArray = useCallback((record: Record<SupportedLocale, string[]> | undefined) => {
    if (!record) return [];
    return record[locale] ?? record.en ?? [];
  }, [locale]);

  return { t, tRecord, tRecordArray, locale };
}
