import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import DataCard from '../data';

import '@testing-library/jest-dom';

describe('DataCard', () => {
  it('renders correctly', () => {
    render(
      <DataCard className="test-class" title="Test Title" value="Test Data" />,
    );
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Data')).toBeInTheDocument();
    expect(screen.getByText('Test Title').closest('div')).toHaveClass(
      'test-class',
    );
  });
});
