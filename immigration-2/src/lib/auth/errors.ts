export const AUTH_ERRORS = {
  existing_user: 'This email is already registered. Please login instead.',
  signup_failed: 'Failed to create account. Please try again.',
  invalid_credentials: 'Invalid email or password.',
} as const;

export type AuthErrorCode = keyof typeof AUTH_ERRORS;

export function getAuthErrorMessage(code: string): string {
  return (AUTH_ERRORS as Record<string, string>)[code] || 'An unexpected error occurred';
}