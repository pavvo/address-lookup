export interface Feature {
  id: string;
  type: string;
  place_type: string[];
  relevance: number;
  properties: Properties;
  text: string;
  place_name: string;
  matching_place_name: string;
  center: number[];
  geometry: Geometry;
  address: string;
  context: Context[];
}

export interface Context {
  id: string;
  mapbox_id: string;
  text: string;
  wikidata?: string;
  short_code?: string;
}

export interface Geometry {
  type: string;
  coordinates: number[];
}

export interface Properties {
  accuracy: string;
  mapbox_id: string;
}

export interface RemappedAddress {
  short_name: string;
  longitude: number;
  latitude: number;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface AutoCompleteOption {
  value: string;
  content: RemappedAddress;
}
