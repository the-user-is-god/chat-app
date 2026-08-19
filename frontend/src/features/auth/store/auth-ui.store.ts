import { create } from 'zustand';

interface AuthUiState {
  // 1. Core transient Client State Fields
  isAuthModalOpen: boolean;
  postLoginRedirectPath: string | null;

  // 2. State Mutators
  setAuthModalOpen: (open: boolean) => void;
  setPostLoginRedirectPath: (path: string | null) => void;
  resetAuthUiState: () => void;
}

/**
 * Global Zustand slice restricted exclusively to local client UI concerns.
 * Strictly decoupled from server-managed HTTP-only tokens and User schemas.
 */
export const useAuthUiStore = create<AuthUiState>((set) => ({
  isAuthModalOpen: false,
  postLoginRedirectPath: null,

  setAuthModalOpen: (open) => set({ isAuthModalOpen: open }),

  setPostLoginRedirectPath: (path) => set({ postLoginRedirectPath: path }),

  resetAuthUiState: () => set({ isAuthModalOpen: false, postLoginRedirectPath: null }),
}));
