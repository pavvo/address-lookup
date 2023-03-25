import { RemappedAddress } from "@/components/AddressForm/types";
import { useState } from "react";
import { AddressContext } from "./context";

export const AddressProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selectedAddress, setSelectedAddress] =
    useState<Partial<RemappedAddress> | null>(null);

  const updateLatLong = (lat: number, long: number) => {
    setSelectedAddress((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        latitude: lat,
        longitude: long,
      };
    });
  };

  return (
    <AddressContext.Provider
      value={{
        selectedAddress,
        setSelectedAddress,
        updateLatLong,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
};
