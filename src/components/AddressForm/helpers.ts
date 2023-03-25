import { Feature } from "./types";

export const remapResponseData = (data: Feature) => {
  return {
    short_name: data?.text,
    longitude: data?.center[0],
    latitude: data?.center[1],
    addressLine1: data?.place_name || "",
    city: data?.context?.find((item) => item.id.includes("place"))?.text || "",
    state:
      data?.context?.find((item) => item.id.includes("region"))?.text || "",
    zip:
      data?.context?.find((item) => item.id.includes("postcode"))?.text || "",
    country:
      data?.context?.find((item) => item.id.includes("country"))?.text || "",
  };
};
