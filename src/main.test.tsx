import { act, render, screen } from '@testing-library/react';
import { RouterProvider } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';

import router from './router';
import useAuth from 'hooks/useAuth';

import '@testing-library/jest-dom';

vi.mock('hooks/useAuth', async () => ({
  default: vi.fn(() => {}),
}));

vi.mock('aws-amplify/data', () => ({
  generateClient: vi.fn(() => ({
    models: {
      Data: {
        observeQuery: vi.fn(() => ({
          subscribe: vi.fn().mockImplementation(({ next }) => {
            next({ items: [] });
            return { unsubscribe: vi.fn() };
          }),
        })),
      },
    },
  })),
}));

describe('Main', () => {
  it('renders signin page, if user is not signed in', async () => {
    (useAuth as ReturnType<typeof vi.fn>).mockReturnValue({
      isLoading: false,
      currentUser: null,
    });

    await act(() => {
      render(<RouterProvider router={router} />);
    });

    expect(screen.getByText('Sign in to your account')).toBeInTheDocument();
  });

  it('renders signup page correctly', async () => {
    (useAuth as ReturnType<typeof vi.fn>).mockReturnValue({
      isLoading: false,
      currentUser: null,
    });

    await act(() => {
      render(<RouterProvider router={router} />);
      router.navigate('/signup');
    });

    expect(screen.getByText('Sign up here')).toBeInTheDocument();
  });

  it('renders home page, if user is signed in', async () => {
    (useAuth as ReturnType<typeof vi.fn>).mockReturnValue({
      isLoading: false,
      currentUser: {
        email: 'tim@apple.com',
      },
    });

    await act(() => {
      render(<RouterProvider router={router} />);
      router.navigate('/');
    });

    expect(screen.getByText('Price Guesser')).toBeInTheDocument();
  });

  it('renders error page, if user is signed in', async () => {
    (useAuth as ReturnType<typeof vi.fn>).mockReturnValue({
      isLoading: false,
      currentUser: {
        email: 'tim@apple.com',
      },
    });

    await act(() => {
      render(<RouterProvider router={router} />);
      router.navigate('/404');
    });

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Page not found.')).toBeInTheDocument();
  });
});
