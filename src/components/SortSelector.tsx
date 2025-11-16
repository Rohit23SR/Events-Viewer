import { memo } from 'react';
import { ArrowUpDown } from 'lucide-react';

export type SortOption = 'date-asc' | 'date-desc' | 'name-asc' | 'name-desc';

interface SortSelectorProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'date-asc', label: 'Date (Earliest)' },
  { value: 'date-desc', label: 'Date (Latest)' },
  { value: 'name-asc', label: 'Name (A-Z)' },
  { value: 'name-desc', label: 'Name (Z-A)' },
];

/**
 * Dropdown selector for sorting events
 */
const SortSelectorComponent = ({ value, onChange }: SortSelectorProps) => {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <ArrowUpDown className="h-4 w-4 text-gray-400 dark:text-gray-500" />
      </div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
        className="block w-full pl-10 pr-8 py-2.5 border border-gray-300 dark:border-gray-600
                   rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                   focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400
                   appearance-none cursor-pointer transition-colors duration-200"
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
        <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
};

export const SortSelector = memo(SortSelectorComponent);
