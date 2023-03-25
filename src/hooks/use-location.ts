import { useState, useEffect } from "react";

import { notifications } from "@mantine/notifications";

const defaultLongitude = import.meta.env.VITE_DEFAULT_LONGITUDE;
const defaultLatitude = import.meta.env.VITE_DEFAULT_LATITUDE;

export interface LocationState {
  latitude: number;
  longitude: number;
  error: unknown;
  loading: boolean;
}

const useLocation = () => {
  const [location, setLocation] = useState<LocationState>({
    latitude: defaultLatitude,
    longitude: defaultLongitude,
    error: null,
    loading: true,
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocation({
        ...location,
        error: "Geolocation is not supported",
        loading: false,
      });

      notifications.show({
        title: "Error",
        message: "Your browser does not support Geolocation",
        color: "red",
        autoClose: 3000,
      });

      return;
    }

    const handleSuccess = (position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords;
      setLocation({
        latitude,
        longitude,
        error: null,
        loading: false,
      });
    };

    const handleError = (error: GeolocationPositionError) => {
      setLocation({ ...location, error, loading: false });

      const errorTitle = error.code === 1 ? "Permission denied" : "Error";
      const errorMessage =
        error.code === 1 ? "Please allow location access" : error.message;

      notifications.show({
        title: errorTitle,
        message: errorMessage,
        color: "red",
        autoClose: 3000,
      });
    };

    const watcher = navigator.geolocation.watchPosition(
      handleSuccess,
      handleError
    );

    return () => navigator.geolocation.clearWatch(watcher);
  }, []);

  return { location };
};

export default useLocation;
