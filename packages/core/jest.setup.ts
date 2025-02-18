// packages/core/jest.setup.ts
import '@testing-library/jest-dom';
import { expect } from '@jest/globals';

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R;
      toHaveTextContent(text: string): R;
      toHaveClass(...classNames: string[]): R;
      toBeDisabled(): R;
    }
  }
}
