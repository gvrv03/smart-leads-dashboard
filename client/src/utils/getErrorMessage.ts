import { AxiosError } from 'axios';

interface ApiErrorData {
  error?: string;
  message?: string;
}

/**
 * Extracts a user-friendly error message from any error type.
 * Prioritizes the server's error message over generic axios messages.
 */
export function getErrorMessage(error: unknown): string {
  if (error instanceof AxiosError) {
    const data = error.response?.data as ApiErrorData | undefined;

    // Use the server's error message if available
    if (data?.error) return data.error;
    if (data?.message) return data.message;

    // Fallback based on status code
    switch (error.response?.status) {
      case 400:
        return 'Invalid request. Please check your input.';
      case 401:
        return 'Invalid email or password.';
      case 403:
        return 'You do not have permission to perform this action.';
      case 404:
        return 'The requested resource was not found.';
      case 409:
        return 'This resource already exists.';
      case 500:
        return 'Server error. Please try again later.';
      default:
        break;
    }

    // Network error
    if (error.code === 'ERR_NETWORK') {
      return 'Unable to connect to the server. Please check your connection.';
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'An unexpected error occurred. Please try again.';
}
