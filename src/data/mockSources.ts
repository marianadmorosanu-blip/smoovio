import type { RecipeSource } from '@/types';

export const sources: RecipeSource[] = [
  { id: 'src-1', title: 'Harvard T.H. Chan School of Public Health – The Nutrition Source', url: 'https://www.hsph.harvard.edu/nutritionsource/', type: 'guideline' },
  { id: 'src-2', title: 'WHO – Healthy Diet Fact Sheet', url: 'https://www.who.int/news-room/fact-sheets/detail/healthy-diet', type: 'guideline' },
  { id: 'src-3', title: 'American Heart Association – Dietary Recommendations', url: 'https://www.heart.org/', type: 'guideline' },
  { id: 'src-4', title: 'Journal of Nutrition – Dietary Fiber and Health Outcomes (2020)', type: 'study' },
  { id: 'src-5', title: 'Nutrients Journal – Berries and Cardiovascular Health (2019)', type: 'study' },
];
