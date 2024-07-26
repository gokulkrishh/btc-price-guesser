import { describe, it, expect, beforeAll, afterAll, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import HistoryCard from '../history';
import { DataItem } from 'types/data';

import '@testing-library/jest-dom';

describe('HistoryCard', () => {
  beforeAll(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2023-10-01T12:34:56Z'));
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  const mockData: DataItem = {
    id: '3',
    score: 2,
    guess: 'up',
    initialPrice: 150,
    resolvedPrice: 140,
    correct: true,
    resolved: true,
    updatedAt: '2023-10-03T06:57:14.564Z',
    createdAt: '2023-10-03T06:57:14.564Z',
  };

  it('renders the component with given data', () => {
    render(<HistoryCard data={mockData} />);
    expect(screen.getByText('up')).toBeInTheDocument();
    expect(screen.getByText('Oct 03, 23')).toBeInTheDocument();
    expect(screen.getByText('12:27:14 PM')).toBeInTheDocument();
    expect(screen.getByText('Initial: $150.00')).toBeInTheDocument();
    expect(screen.getByText('Score: 2')).toBeInTheDocument();
    expect(screen.getByText('won (+1)')).toBeInTheDocument();
  });

  it('handles resolved and correct guess for "down"', () => {
    render(<HistoryCard data={{ ...mockData, guess: 'down' }} />);
    expect(screen.getByText('down')).toBeInTheDocument();
  });

  it('renders unresolved with skeleton', () => {
    render(<HistoryCard data={{ ...mockData, resolved: false }} />);

    expect(screen.getByText('up')).toBeInTheDocument();
    expect(screen.getByText('Oct 03, 23')).toBeInTheDocument();
    expect(screen.getByText('12:27:14 PM')).toBeInTheDocument();
    expect(screen.getByText('Initial: $150.00')).toBeInTheDocument();
    expect(screen.getByText('Score: Nil')).toBeInTheDocument();
  });

  it('handles incorrect guess', () => {
    render(
      <HistoryCard data={{ ...mockData, correct: false, resolved: true }} />,
    );
    expect(screen.getByText('up')).toBeInTheDocument();
    expect(screen.getByText('Oct 03, 23')).toBeInTheDocument();
    expect(screen.getByText('12:27:14 PM')).toBeInTheDocument();
    expect(screen.getByText('Initial: $150.00')).toBeInTheDocument();
    expect(screen.getByText('Score: 2')).toBeInTheDocument();
    expect(screen.getByText('lost (-1)')).toBeInTheDocument();
  });
});
