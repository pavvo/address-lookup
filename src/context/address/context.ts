import { RemappedAddress } from "@/components/AddressForm/types";
import { createContext } from "react";

export interface AddressContextProps {
  selectedAddress: Partial<RemappedAddress> | null;
  setSelectedAddress: (address: Partial<RemappedAddress> | null) => void;
  updateLatLong: (lat: number, long: number) => void;
}

export const AddressContext = createContext<AddressContextProps>({
  selectedAddress: null,
  setSelectedAddress: () => {},
  updateLatLong: () => {},
});
