interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_REQUEST_TIMEOUT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}