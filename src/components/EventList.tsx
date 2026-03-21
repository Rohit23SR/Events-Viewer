import { useMemo, useState, useCallback } from 'react'
import { Calendar, AlertCircle, RefreshCw } from 'lucide-react'
import { useDebouncedCallback } from 'use-debounce'
import { EventCard } from './EventCard'
import { LoadingSpinner } from './LoadingSpinner'
import { VenueSelector } from './VenueSelector'
import { EventDetail } from './EventDetail'
import { SearchInput } from './SearchInput'
import { SortSelector, SortOption } from './SortSelector'
import { useAppContext } from '../context/AppContext'
import { useEventsData } from '../hooks/useEventsData'
import type { Event, Venue } from '../types/event.types'

/**
 * Main event list component with filtering, search, and sorting capabilities
 */
export const EventList = () => {
  const { selectedVenue, selectedEvent, setSelectedVenue, setSelectedEvent } = useAppContext()
  const { data, isLoading, isError, error, refetch, isFallback } = useEventsData()

  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [sortOption, setSortOption] = useState<SortOption>('date-asc')
  const [isRefreshing, setIsRefreshing] = useState(false)

  const debouncedSetSearch = useDebouncedCallback((value: string) => {
    setDebouncedSearch(value)
  }, 300)

  const handleSearchChange = useCallback(
    (value: string) => {
      setSearchQuery(value)
      debouncedSetSearch(value)
    },
    [debouncedSetSearch]
  )

  const handleRefetch = useCallback(async () => {
    setIsRefreshing(true)
    await refetch()
    setIsRefreshing(false)
  }, [refetch])

  const venues = useMemo<Venue[]>(() => {
    if (!data?._embedded?.events) return []

    const venueMap = new Map<string, Venue>()
    data._embedded.events.forEach((event: Event) => {
      const eventVenues = event._embedded?.venues || []
      eventVenues.forEach((venue: Venue) => {
        if (venue.id && !venueMap.has(venue.id)) {
          venueMap.set(venue.id, venue)
        }
      })
    })

    return Array.from(venueMap.values()).sort((a, b) => a.name.localeCompare(b.name))
  }, [data])

  const filteredAndSortedEvents = useMemo<Event[]>(() => {
    if (!data?._embedded?.events) return []

    let events = data._embedded.events

    // Filter by venue
    if (selectedVenue) {
      events = events.filter((event: Event) => {
        const eventVenues = event._embedded?.venues || []
        return eventVenues.some((venue: Venue) => venue.id === selectedVenue.id)
      })
    }

    // Filter by search query
    if (debouncedSearch) {
      const searchLower = debouncedSearch.toLowerCase()
      events = events.filter((event: Event) => {
        const nameMatch = event.name.toLowerCase().includes(searchLower)
        const infoMatch = event.info?.toLowerCase().includes(searchLower) || false
        const venueMatch =
          event._embedded?.venues?.some((v) => v.name.toLowerCase().includes(searchLower)) || false
        return nameMatch || infoMatch || venueMatch
      })
    }

    // Sort events
    const sortedEvents = [...events].sort((a, b) => {
      switch (sortOption) {
        case 'date-asc':
          return (
            new Date(a.dates.start.dateTime).getTime() - new Date(b.dates.start.dateTime).getTime()
          )
        case 'date-desc':
          return (
            new Date(b.dates.start.dateTime).getTime() - new Date(a.dates.start.dateTime).getTime()
          )
        case 'name-asc':
          return a.name.localeCompare(b.name)
        case 'name-desc':
          return b.name.localeCompare(a.name)
        default:
          return 0
      }
    })

    return sortedEvents
  }, [data, selectedVenue, debouncedSearch, sortOption])

  if (isLoading) return <LoadingSpinner />

  if (isError) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 dark:bg-gray-900">
        <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900">
            <AlertCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
          </div>
          <h2 className="mb-2 text-center text-2xl font-bold text-gray-900 dark:text-gray-100">
            Error Loading Events
          </h2>
          <p className="mb-6 text-center text-gray-600 dark:text-gray-400">
            {error?.message || 'Unable to load events. Please try again.'}
          </p>
          <button
            onClick={handleRefetch}
            disabled={isRefreshing}
            className="flex w-full items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700 disabled:opacity-50 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? 'Retrying...' : 'Retry'}
          </button>
        </div>
      </div>
    )
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {isFallback && (
        <div className="mb-6 flex animate-fade-in items-start rounded-lg border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-700 dark:bg-yellow-900/20">
          <AlertCircle className="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-yellow-600 dark:text-yellow-500" />
          <div>
            <h3 className="mb-1 font-medium text-yellow-900 dark:text-yellow-200">
              Using Fallback Data
            </h3>
            <p className="text-sm text-yellow-700 dark:text-yellow-300">
              Unable to connect to the live event source. Displaying sample events to demonstrate
              functionality.
            </p>
          </div>
        </div>
      )}

      {/* Filters Section */}
      <div className="mb-8 space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="md:col-span-1">
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Search Events
            </label>
            <SearchInput
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search by name, venue, or description..."
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Filter by Venue
            </label>
            <VenueSelector
              venues={venues}
              selectedVenue={selectedVenue}
              onVenueChange={setSelectedVenue}
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Sort By
            </label>
            <SortSelector value={sortOption} onChange={setSortOption} />
          </div>
        </div>
      </div>

      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          {selectedVenue ? `Events at ${selectedVenue.name}` : 'All Events'}
          {debouncedSearch && (
            <span className="ml-2 text-base font-normal text-gray-500 dark:text-gray-400">
              matching "{debouncedSearch}"
            </span>
          )}
        </h2>
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {filteredAndSortedEvents.length}{' '}
          {filteredAndSortedEvents.length === 1 ? 'event' : 'events'}
        </span>
      </div>

      {filteredAndSortedEvents.length === 0 ? (
        <div className="animate-fade-in py-12 text-center">
          <Calendar className="mx-auto mb-4 h-16 w-16 text-gray-300 dark:text-gray-600" />
          <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-gray-100">
            No events found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            {debouncedSearch
              ? 'No events match your search criteria. Try different keywords.'
              : selectedVenue
                ? 'No events available at this venue.'
                : 'No events available at the moment.'}
          </p>
          {(debouncedSearch || selectedVenue) && (
            <button
              onClick={() => {
                setSearchQuery('')
                setDebouncedSearch('')
                setSelectedVenue(null)
              }}
              className="mt-4 font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Clear all filters
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredAndSortedEvents.map((event) => (
            <EventCard key={event.id} event={event} onClick={() => setSelectedEvent(event)} />
          ))}
        </div>
      )}

      {selectedEvent && (
        <EventDetail event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      )}
    </main>
  )
}
