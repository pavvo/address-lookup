import { Skeleton, useMantineColorScheme } from "@mantine/core";

import useLocation from "@/hooks/use-location";

import { Map } from "./Map";
import { MapboxStyle } from "./types";

export interface MapWrapperProps {
  location: ReturnType<typeof useLocation>["location"];
}

export function MapWrapper({ location }: MapWrapperProps) {
  const { colorScheme } = useMantineColorScheme();

  const mapStyle =
    colorScheme === "dark" ? MapboxStyle.Dark : MapboxStyle.Light;

  if (location.loading) {
    return <Skeleton w="100%" h="100%" />;
  }

  return (
    <Map
      viewState={{
        longitude: location.longitude,
        latitude: location.latitude,
        zoom: 14,
      }}
      mapStyle={mapStyle}
    />
  );
}
