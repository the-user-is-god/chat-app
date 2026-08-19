import { toast as sonnerToast } from 'sonner';
import { AppApiError } from '@/lib/api';

/**
 * Enterprise unified notification gateway.
 * Enforces strict look-and-feel conventions across mutations.
 */
export const toast = {
  success: (message: string, description?: string) => {
    sonnerToast.success(message, { description });
  },

  info: (message: string, description?: string) => {
    sonnerToast.info(message, { description });
  },

  warning: (message: string, description?: string) => {
    sonnerToast.warning(message, { description });
  },

  /**
   * Safely unwraps application-normalized API errors into clean alerts.
   */
  error: (error: unknown, fallbackMessage = 'Transaction execution failure') => {
    if (error instanceof AppApiError) {
      sonnerToast.error(error.message, {
        description: error.statusCode
          ? `Server Status Log: ${error.statusCode}`
          : 'Network connectivity drop',
      });
      return;
    }

    const plainMessage = error instanceof Error ? error.message : fallbackMessage;
    sonnerToast.error(plainMessage);
  },

  /**
   * Directly binds a mutation's network lifecycle straight to structural toast alerts.
   */
  promise: <T>(
    promise: Promise<T> | (() => Promise<T>),
    config: { loading: string; success: string; error: string }
  ) => {
    return sonnerToast.promise(promise, config);
  },
};
