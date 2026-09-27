// features/channels/store/useChannelUiStore.ts
import { create } from 'zustand';

interface ChannelUiState {
  activeChannelId: string | null;
  isCreateChannelModalOpen: boolean;
  isMembersPanelOpen: boolean;

  setActiveChannelId: (channelId: string | null) => void;
  setCreateChannelModalOpen: (open: boolean) => void;
  setMembersPanelOpen: (open: boolean) => void;
  resetChannelUiState: () => void;
}

/**
 * Global Zustand slice restricted exclusively to local client UI concerns for channels.
 */
export const useChannelUiStore = create<ChannelUiState>((set) => ({
  activeChannelId: null,
  isCreateChannelModalOpen: false,
  isMembersPanelOpen: false,

  setActiveChannelId: (channelId) => set({ activeChannelId: channelId }),
  setCreateChannelModalOpen: (open) => set({ isCreateChannelModalOpen: open }),
  setMembersPanelOpen: (open) => set({ isMembersPanelOpen: open }),

  resetChannelUiState: () =>
    set({ activeChannelId: null, isCreateChannelModalOpen: false, isMembersPanelOpen: false }),
}));
