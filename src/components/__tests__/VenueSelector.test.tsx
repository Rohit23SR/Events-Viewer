import { render, screen, fireEvent } from '@testing-library/react';
import { VenueSelector } from '../VenueSelector';
import type { Venue } from '../../types/venue.types';

describe('VenueSelector', () => {
  const mockVenues: Venue[] = [
    {
      id: '1',
      name: 'Venue A',
      city: { name: 'Sydney' },
      state: { name: 'NSW' },
    },
    {
      id: '2',
      name: 'Venue B',
      city: { name: 'Melbourne' },
      state: { name: 'VIC' },
    },
  ];

  const mockOnVenueChange = jest.fn();

  beforeEach(() => {
    mockOnVenueChange.mockClear();
  });

  it('should render with "All Venues" when no venue selected', () => {
    render(
      <VenueSelector
        venues={mockVenues}
        selectedVenue={null}
        onVenueChange={mockOnVenueChange}
      />
    );
    expect(screen.getByText('All Venues')).toBeInTheDocument();
  });

  it('should display selected venue name', () => {
    render(
      <VenueSelector
        venues={mockVenues}
        selectedVenue={mockVenues[0]}
        onVenueChange={mockOnVenueChange}
      />
    );
    expect(screen.getByText('Venue A')).toBeInTheDocument();
  });

  it('should open dropdown when clicked', () => {
    render(
      <VenueSelector
        venues={mockVenues}
        selectedVenue={null}
        onVenueChange={mockOnVenueChange}
      />
    );
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(screen.getByText('Show all events')).toBeInTheDocument();
  });

  it('should display all venues in dropdown', () => {
    render(
      <VenueSelector
        venues={mockVenues}
        selectedVenue={null}
        onVenueChange={mockOnVenueChange}
      />
    );
    
    fireEvent.click(screen.getByRole('button'));
    
    expect(screen.getByText('Venue A')).toBeInTheDocument();
    expect(screen.getByText('Venue B')).toBeInTheDocument();
    expect(screen.getByText('Sydney, NSW')).toBeInTheDocument();
    expect(screen.getByText('Melbourne, VIC')).toBeInTheDocument();
  });

  it('should call onVenueChange with null when "All Venues" clicked', () => {
    render(
      <VenueSelector
        venues={mockVenues}
        selectedVenue={mockVenues[0]}
        onVenueChange={mockOnVenueChange}
      />
    );
    
    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(screen.getByText('Show all events'));
    
    expect(mockOnVenueChange).toHaveBeenCalledWith(null);
  });

  it('should call onVenueChange with venue when venue clicked', () => {
    render(
      <VenueSelector
        venues={mockVenues}
        selectedVenue={null}
        onVenueChange={mockOnVenueChange}
      />
    );
    
    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(screen.getByText('Venue B'));
    
    expect(mockOnVenueChange).toHaveBeenCalledWith(mockVenues[1]);
  });
});