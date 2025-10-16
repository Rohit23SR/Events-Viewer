import { render, screen } from '@testing-library/react';
import { LoadingSpinner } from '../LoadingSpinner';

describe('LoadingSpinner', () => {
  it('should render loading text', () => {
    render(<LoadingSpinner />);
    expect(screen.getByText('Loading events...')).toBeInTheDocument();
  });

  it('should render spinner icon', () => {
    const { container } = render(<LoadingSpinner />);
    const spinner = container.querySelector('.animate-spin');
    expect(spinner).toBeInTheDocument();
  });
});