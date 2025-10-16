import { render, screen, fireEvent } from '@testing-library/react';
import { EventCard } from '../EventCard';
import type { Event } from '../../types/event.types';

describe('EventCard', () => {
  const mockEvent: Event = {
    id: '1',
    name: 'Test Concert',
    dates: {
      start: {
        dateTime: '2025-11-15T19:00:00Z',
      },
    },
    _embedded: {
      venues: [
        {
          id: '100',
          name: 'Test Venue',
          city: { name: 'Sydney' },
          state: { name: 'NSW' },
        },
      ],
    },
    info: 'Great event',
  };

  const mockOnClick = jest.fn();

  beforeEach(() => {
    mockOnClick.mockClear();
  });

  it('should render event name', () => {
    render(<EventCard event={mockEvent} onClick={mockOnClick} />);
    expect(screen.getByText('Test Concert')).toBeInTheDocument();
  });

  it('should render venue name', () => {
    render(<EventCard event={mockEvent} onClick={mockOnClick} />);
    expect(screen.getByText(/Test Venue/)).toBeInTheDocument();
  });

  it('should render event info', () => {
    render(<EventCard event={mockEvent} onClick={mockOnClick} />);
    expect(screen.getByText('Great event')).toBeInTheDocument();
  });

  it('should call onClick when card is clicked', () => {
    render(<EventCard event={mockEvent} onClick={mockOnClick} />);
    const card = screen.getByText('Test Concert').closest('div');
    fireEvent.click(card!);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('should render without venue', () => {
    const eventWithoutVenue = { ...mockEvent, _embedded: undefined };
    render(<EventCard event={eventWithoutVenue} onClick={mockOnClick} />);
    expect(screen.getByText('Test Concert')).toBeInTheDocument();
  });

  it('should render without info', () => {
    const eventWithoutInfo = { ...mockEvent, info: undefined };
    render(<EventCard event={eventWithoutInfo} onClick={mockOnClick} />);
    expect(screen.getByText('Test Concert')).toBeInTheDocument();
  });

  it('should display "View Details" text', () => {
    render(<EventCard event={mockEvent} onClick={mockOnClick} />);
    expect(screen.getByText(/View Details/)).toBeInTheDocument();
  });
});