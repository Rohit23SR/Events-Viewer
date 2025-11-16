import '@testing-library/jest-dom';

// Mock import.meta.env for Vite compatibility
const importMetaEnv = {
  DEV: false,
  PROD: true,
  MODE: 'test',
  VITE_API_URL: 'https://test-api.com/events.json',
  VITE_CORS_PROXY_URL: 'https://corsproxy.io/?',
  VITE_ENABLE_DARK_MODE: 'true',
  VITE_ENABLE_SEARCH: 'true',
  VITE_ENABLE_SORTING: 'true',
};

Object.defineProperty(globalThis, 'import', {
  value: {
    meta: {
      env: importMetaEnv,
    },
  },
  writable: true,
});

// Also set on global for module scope
(global as unknown as { import: { meta: { env: typeof importMetaEnv } } }).import = {
  meta: {
    env: importMetaEnv,
  },
};

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Mock fetch globally
globalThis.fetch = jest.fn();
