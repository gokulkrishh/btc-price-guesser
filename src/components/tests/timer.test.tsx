import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import Timer from '../timer';

import '@testing-library/jest-dom';

describe('Timer Component', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it('renders correctly & call onTick() callback correctly', () => {
    const createdAt = new Date().toISOString();
    const timerCallback = vi.fn();

    render(<Timer timeStamp={createdAt} onTick={timerCallback} />);

    expect(timerCallback).toHaveBeenCalledTimes(0);

    expect(screen.getByText(`Time Elapsed: 1 second`)).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(50000); // after 50 secs
    });

    expect(timerCallback).toHaveBeenCalledTimes(50);

    expect(screen.getByText(`Time Elapsed: 49 seconds`)).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(10000); // after 50 + 10 secs
    });

    expect(screen.getByText(`Time Elapsed: 59 seconds`)).toBeInTheDocument();

    expect(timerCallback).toHaveBeenCalledTimes(60);
  });
});
