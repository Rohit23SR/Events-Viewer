import { useState, useEffect } from 'react';
import { fetchEvents } from '../api/eventsApi';
import type { UseEventsDataState } from '../types/api.types';

export const useEventsData = () => {
  const [state, setState] = useState<UseEventsDataState>({
    data: null,
    isLoading: true,
    isError: false,
    error: null,
    isFallback: false,
  });

  const refetch = async () => {
    setState(prev => ({ 
      ...prev, 
      isLoading: true, 
      isError: false, 
      error: null 
    }));
    
    try {
      const result = await fetchEvents();
      setState({
        data: result.data,
        isLoading: false,
        isError: false,
        error: null,
        isFallback: result.isFallback,
      });
    } catch (error) {
      setState({
        data: null,
        isLoading: false,
        isError: true,
        error: error as Error,
        isFallback: false,
      });
    }
  };

  useEffect(() => {
    refetch();
  }, []);

  return { ...state, refetch };
};