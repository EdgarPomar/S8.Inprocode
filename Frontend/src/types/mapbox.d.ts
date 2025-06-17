// src/types/mapbox.d.ts

export interface Place {
  name: string;
  country: string;
  lng: number;
  lat: number;
}

export interface MapboxContextItem {
  id: string;
  text: string;
  short_code?: string;
  wikidata?: string;
}

export interface MapSelectorProps {
  onPlaceSelected: (place: Place) => void;
}
