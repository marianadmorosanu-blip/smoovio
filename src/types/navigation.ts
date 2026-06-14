export type TabKey = 'home' | 'explore' | 'favorites' | 'profile';

export interface NavTab {
  key: TabKey;
  label: string;
  to: string;
  icon: React.ReactNode;
}
