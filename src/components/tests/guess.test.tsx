import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import Guess from '../guess';
import { usePrice } from 'contexts/price';
import { useData } from 'contexts/data';
import { DataItem } from 'types/data';

import '@testing-library/jest-dom';

vi.mock('contexts/price', () => ({
  usePrice: vi.fn(),
}));

vi.mock('contexts/data', () => ({
  useData: vi.fn(),
}));

const createMock = vi.fn();
const updateMock = vi.fn();

vi.mock('aws-amplify/data', () => ({
  generateClient: vi.fn(() => ({
    models: {
      Data: {
        create: (
          newData: {
            price: number;
            action: string;
            resolved: boolean;
            score: number;
          },
          options: {
            authMode: 'userPool';
          },
        ) => createMock(newData, options),
        update: (
          updateData: {
            newPrice: number;
            resolved: boolean;
            action: string;
            score: number;
          },
          options: {
            authMode: 'userPool';
          },
        ) => updateMock(updateData, options),
      },
    },
  })),
}));

const priceMockData = {
  price: 63995.65,
  updatedAt: '2024-07-25T10:57:16.522Z',
};

const mockData = [
  {
    id: '3',
    score: 2,
    guess: 'up',
    initialPrice: 150,
    resolvedPrice: 140,
    correct: false,
    resolved: true,
    updatedAt: '2024-10-03T06:57:14.564Z',
    createdAt: '2024-10-03T06:57:14.564Z',
  },
] as DataItem[];

const triggerFetchMock = vi.fn();

describe('Guess Component', () => {
  beforeEach(() => {
    (usePrice as ReturnType<typeof vi.fn>).mockReturnValue({
      data: priceMockData,
      triggerFetch: triggerFetchMock,
    });
    (useData as ReturnType<typeof vi.fn>).mockReturnValue({
      data: mockData,
      isLoading: false,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.clearAllTimers();
  });

  it('renders the component', () => {
    render(<Guess />);

    const guessTitle = 'Will Price go UP or DOWN in next minute?';

    expect(screen.getByText(guessTitle)).toBeInTheDocument();
    expect(screen.getByText('Up')).toBeInTheDocument();
    expect(screen.getByText('Down')).toBeInTheDocument();
  });

  it('should create history with correctly onClick of guess button', async () => {
    render(<Guess />);

    expect(screen.getByText('Up')).toBeInTheDocument();
    expect(screen.getByText('Down')).toBeInTheDocument();

    await act(async () => {
      await fireEvent.click(screen.getByText('Up'));
    });

    expect(createMock).toHaveBeenCalledWith(
      {
        guess: 'up',
        initialPrice: 63995.65,
        score: 2,
      },
      { authMode: 'userPool' },
    );
  });

  it('renders correct time elapsed and after 60 seconds, update score correctly', async () => {
    (useData as ReturnType<typeof vi.fn>).mockReturnValue({
      data: [
        {
          ...mockData[0],
          correct: false,
          resolved: false,
          createdAt: new Date().toISOString(),
        },
      ],
      isLoading: false,
    });

    vi.useFakeTimers();

    render(<Guess />);

    expect(screen.getByText('Waiting for Price Change...')).toBeInTheDocument();
    expect(screen.getByText('Up')).toBeDisabled();
    expect(screen.getByText('Down')).toBeDisabled();

    expect(screen.getByText('Time Elapsed: 1 second')).toBeInTheDocument();

    await act(async () => {
      await vi.advanceTimersByTime(59000);
    });

    expect(triggerFetchMock).toHaveBeenCalledTimes(0);

    expect(screen.getByText('Time Elapsed: 58 seconds')).toBeInTheDocument();

    await act(async () => {
      await vi.advanceTimersByTime(3000);
    });

    expect(triggerFetchMock).toHaveBeenCalledTimes(1);

    expect(updateMock).toHaveBeenCalledWith(
      {
        id: '3',
        score: 3,
        resolved: true,
        correct: true,
        resolvedPrice: 63995.65,
      },
      { authMode: 'userPool' },
    );
  });
});
