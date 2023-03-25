import { useEffect, useState } from "react";
import {
  Map as MapGl,
  Marker,
  MarkerDragEvent,
  ViewStateChangeEvent,
} from "react-map-gl";

import { useAddress } from "@/hooks/use-address";

import { MapboxStyle } from "./types";

const accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

export interface MapProps {
  viewState: {
    longitude: number;
    latitude: number;
    zoom: number;
  };
  mapStyle: MapboxStyle;
}

export function Map({ viewState: initialViewState, mapStyle }: MapProps) {
  const [viewState, setViewState] = useState({
    latitude: initialViewState.latitude,
    longitude: initialViewState.longitude,
  });

  const { selectedAddress, updateLatLong } = useAddress();

  const isLatLongAvailable =
    selectedAddress?.latitude && selectedAddress.longitude;

  useEffect(() => {
    if (isLatLongAvailable) {
      setViewState({
        latitude: selectedAddress.latitude || 0,
        longitude: selectedAddress.longitude || 0,
      });
    } else {
      // Reset to initial view state
      setViewState({
        latitude: initialViewState.latitude,
        longitude: initialViewState.longitude,
      });
    }
  }, [selectedAddress]);

  const handleMarkerDragEnd = (e: MarkerDragEvent) => {
    const latLong = e.lngLat;

    setViewState({
      latitude: latLong.lat,
      longitude: latLong.lng,
    });

    updateLatLong(latLong.lat, latLong.lng);
  };

  const handleMapMove = (e: ViewStateChangeEvent) => {
    setViewState(e.viewState);
  };

  return (
    <MapGl
      style={{
        height: "100%",
      }}
      initialViewState={initialViewState}
      {...viewState}
      onMove={handleMapMove}
      mapStyle={mapStyle}
      mapboxAccessToken={accessToken}
    >
      {isLatLongAvailable && (
        <Marker
          draggable
          latitude={selectedAddress.latitude}
          longitude={selectedAddress.longitude}
          onDragEnd={handleMarkerDragEnd}
        />
      )}
    </MapGl>
  );
}
