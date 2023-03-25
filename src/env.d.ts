/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MAPBOX_TOKEN: string;
  readonly VITE_MAPBOX_URL: string;
  readonly VITE_DEFAULT_LATITUDE: number;
  readonly VITE_DEFAULT_LONGITUDE: number;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
