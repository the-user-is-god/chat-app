/**
 * Global architecture blueprint for client-side Zustand slices.
 * Ensures consistent reset procedures across the application to prevent state bleeding.
 */
export interface BaseStoreState {
  /**
   * Universal modifier method to purge active store parameters back to default states.
   * Invocable globally during actions like tenant user logouts.
   */
  reset: () => void;
}
