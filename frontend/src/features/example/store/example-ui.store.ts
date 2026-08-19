import { create } from 'zustand';
import { BaseStoreState } from '@/lib/store';

interface ExampleUiState extends BaseStoreState {
  isPanelExpanded: boolean;
  setPanelExpanded: (expanded: boolean) => void;
}

export const useExampleUiStore = create<ExampleUiState>((set) => ({
  isPanelExpanded: false,
  setPanelExpanded: (expanded) => set({ isPanelExpanded: expanded }),
  reset: () => set({ isPanelExpanded: false }),
}));
