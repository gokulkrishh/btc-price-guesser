import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import Stats from '../stats';
import { usePrice } from 'contexts/price';
import { useData } from 'contexts/data';
import { DataItem } from 'types/data';

import '@testing-library/jest-dom';

vi.mock('contexts/data', () => ({
  useData: vi.fn(),
}));

vi.mock('contexts/price', () => ({
  usePrice: vi.fn(),
}));

const dataMock: DataItem[] = [
  {
    id: '3',
    score: 3,
    guess: 'up',
    initialPrice: 150,
    resolvedPrice: 140,
    correct: true,
    resolved: true,
    updatedAt: '2023-10-03T06:57:14.564Z',
    createdAt: '2023-10-03T06:57:14.564Z',
  },
  {
    id: '1',
    score: 2,
    guess: 'up',
    initialPrice: 139,
    resolvedPrice: 140,
    correct: true,
    resolved: true,
    updatedAt: '2023-10-03T06:17:14.564Z',
    createdAt: '2023-10-03T06:17:14.564Z',
  },
];

const priceMockData = {
  price: 160,
  updatedAt: '2023-10-03T06:57:14.564Z',
};

describe('Stats', () => {
  it('renders correctly', () => {
    (useData as ReturnType<typeof vi.fn>).mockReturnValue({
      data: dataMock,
      isLoading: false,
    });
    (usePrice as ReturnType<typeof vi.fn>).mockReturnValue({
      data: priceMockData,
    });

    render(<Stats />);

    expect(screen.getByText('BTC/USD')).toBeInTheDocument();
    expect(screen.getByText('$160.00')).toBeInTheDocument();
    expect(screen.getByText('Current Score')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });
});
