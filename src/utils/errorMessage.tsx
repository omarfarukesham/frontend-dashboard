/* eslint-disable @typescript-eslint/no-explicit-any */
// utils/errorMessage.ts
import { FieldError, Merge, FieldErrorsImpl } from 'react-hook-form';

export const getErrorMessage = (
  error: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined
): string | null => {
  if (!error) return null;
  if (typeof error.message === 'string') {
    return error.message;
  }
  return 'An unexpected error occurred';
};
