/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly DEV: boolean
  readonly PROD: boolean
  readonly SSR: boolean
  readonly MODE: string
  readonly VITE_API_URL: string
  readonly VITE_CORS_PROXY_URL: string
  readonly VITE_ENABLE_DARK_MODE: string
  readonly VITE_ENABLE_SEARCH: string
  readonly VITE_ENABLE_SORTING: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
