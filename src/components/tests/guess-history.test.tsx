import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import GuessHistory from '../guess-history';
import { useData } from 'contexts/data';

import '@testing-library/jest-dom';
import { DataItem } from 'types/data';

vi.mock('contexts/data', () => ({
  useData: vi.fn(),
}));

const mockData: DataItem[] = [
  {
    id: '3',
    score: 85,
    guess: 'up',
    initialPrice: 150,
    resolvedPrice: 140,
    correct: false,
    resolved: true,
    updatedAt: '2024-10-03T06:57:14.564Z',
    createdAt: '2024-10-03T06:57:14.564Z',
  },
];

describe('GuessHistory', () => {
  it('renders empty history component', () => {
    (useData as ReturnType<typeof vi.fn>).mockReturnValue({
      data: [],
      isLoading: true,
    });
    render(<GuessHistory />);
    expect(screen.getByText('History (0)')).toBeInTheDocument();
  });

  it('renders history card, when isLoading is false', () => {
    (useData as ReturnType<typeof vi.fn>).mockReturnValue({
      data: mockData,
      isLoading: false,
    });
    render(<GuessHistory />);
    expect(screen.getByText('History (1)')).toBeInTheDocument();
    expect(screen.getByText('Oct 03, 24')).toBeInTheDocument();
    expect(screen.getByText('up')).toBeInTheDocument();
  });
});
