// src/components/MapSelector.tsx
import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import mbxGeocoding from '@mapbox/mapbox-sdk/services/geocoding';

import { MapboxContextItem, MapSelectorProps} from '../types/mapbox';

mapboxgl.accessToken = 'pk.eyJ1IjoiZWRnYXIxMjM0NTYiLCJhIjoiY21jMGR1amQ0MDEwZzJqczdzamZ6ejNwcCJ9.HjYFrAC2IHXBFVkIfKxAHA';
const geocodingClient = mbxGeocoding({ accessToken: mapboxgl.accessToken });

const MapSelector: React.FC<MapSelectorProps> = ({ onPlaceSelected }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const markerRef = useRef<mapboxgl.Marker | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (mapRef.current) return;

    mapRef.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-3.7038, 40.4168],
      zoom: 3,
    });

    mapRef.current.on('click', async (e) => {
      const { lng, lat } = e.lngLat;

      if (markerRef.current) markerRef.current.remove();
      markerRef.current = new mapboxgl.Marker().setLngLat([lng, lat]).addTo(mapRef.current!);

      try {
        const response = await geocodingClient.reverseGeocode({
          query: [lng, lat],
          types: ['place'],
          language: ['es', 'en'],
        }).send();

        const feature = response.body.features[0];
        if (feature) {
          const name = feature.text;
          const country = feature.context?.find(
            (c: MapboxContextItem) => c.id.startsWith('country')
          )?.text || '';

          onPlaceSelected({ name, country, lng, lat });
        }
      } catch (error) {
        console.error('Geocoding error:', error);
      }
    });

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // efecto solo corre una vez

  return <div ref={mapContainer} style={{ width: '100%', height: 300, marginBottom: 16 }} />;
};

export default MapSelector;
