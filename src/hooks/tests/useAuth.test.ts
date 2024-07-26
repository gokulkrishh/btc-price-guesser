import { describe, it, expect, vi } from 'vitest';
import { act, renderHook } from '@testing-library/react';

import useAuth from '../useAuth';

import '@testing-library/jest-dom';

const getCurrentUserMock = vi.fn();

vi.mock('aws-amplify/auth', () => ({
  getCurrentUser: () => getCurrentUserMock(),
}));

describe('useAuth', () => {
  it('should return currentUser as null and isLoading true, before authentication', async () => {
    const { result } = renderHook(() => useAuth());
    expect(result.current).toEqual({ currentUser: null, isLoading: true });
  });

  it('should return currentUser and isLoading false, after authentication', async () => {
    getCurrentUserMock.mockResolvedValue({ tokens: '123' });
    const { result } = await act(async () => renderHook(() => useAuth()));
    expect(result.current).toEqual({
      currentUser: {
        tokens: '123',
      },
      isLoading: false,
    });
  });
});
