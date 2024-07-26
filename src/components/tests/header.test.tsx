import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter as Router, useNavigate } from 'react-router-dom';

import Header from '../header';
import useAuth from 'hooks/useAuth';
import { signOut } from 'aws-amplify/auth';

import '@testing-library/jest-dom';

vi.mock('hooks/useAuth', async () => ({ default: vi.fn() }));

vi.mock('react-router-dom', async () => {
  const imports = await vi.importActual('react-router-dom');
  return { ...imports, useNavigate: vi.fn() };
});

vi.mock('aws-amplify/auth', () => ({
  signOut: vi.fn(),
}));

describe('Header Component', () => {
  it('renders correctly', () => {
    (useAuth as ReturnType<typeof vi.fn>).mockReturnValue({
      isLoading: false,
      currentUser: { name: 'Test User' },
    });
    render(
      <Router>
        <Header />
      </Router>,
    );
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  it('navigates to the signin page, on click of sign out', async () => {
    const navigate = vi.fn();
    (useAuth as ReturnType<typeof vi.fn>).mockReturnValue({
      isLoading: false,
      currentUser: { email: 'tim@apple.com' },
    });
    (useNavigate as ReturnType<typeof vi.fn>).mockReturnValue(navigate);

    render(
      <Router>
        <Header />
      </Router>,
    );

    await act(async () => {
      fireEvent.click(screen.getByText('Logout'));
    });

    expect(signOut).toHaveBeenCalled();
    expect(navigate).toHaveBeenCalledWith('/signin');
  });
});
