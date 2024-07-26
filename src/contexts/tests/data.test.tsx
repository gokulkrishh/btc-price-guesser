import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useData, DataProvider } from '../data';
import { DataItem } from 'types/data';

import '@testing-library/jest-dom';

const mockDataItems: DataItem[] = [
  {
    id: '3',
    score: 85,
    guess: 'up',
    initialPrice: 150,
    resolvedPrice: 140,
    correct: false,
    resolved: true,
    updatedAt: '2023-10-03T06:57:14.564Z',
    createdAt: '2023-10-03T06:57:14.564Z',
  },
  {
    id: '1',
    score: 85,
    guess: 'up',
    initialPrice: 150,
    resolvedPrice: 140,
    correct: false,
    resolved: true,
    updatedAt: '2023-10-03T05:57:14.564Z',
    createdAt: '2023-10-03T05:57:14.564Z',
  },
];

vi.mock('aws-amplify/data', () => ({
  generateClient: vi.fn(() => ({
    models: {
      Data: {
        observeQuery: vi.fn(() => ({
          subscribe: vi.fn().mockImplementation(({ next }) => {
            next({ items: mockDataItems });
            return { unsubscribe: vi.fn() };
          }),
        })),
      },
    },
  })),
}));

describe('DataProvider', () => {
  it('provides the correct context values', async () => {
    const MockComponent = () => {
      const { data, isLoading } = useData();
      return (
        <div>
          <span>{isLoading ? 'Loading' : 'Loaded'}</span>
          <span>{JSON.stringify(data)}</span>
        </div>
      );
    };

    render(
      <DataProvider>
        <MockComponent />
      </DataProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText('Loaded')).toBeInTheDocument();
      expect(
        screen.getByText(JSON.stringify(mockDataItems)),
      ).toBeInTheDocument();
    });
  });
});
