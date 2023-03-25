const BASE_URL = import.meta.env.VITE_MAPBOX_URL;
const TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

const defaultFormValues = {
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  zip: "",
  country: "",
};

export { BASE_URL, TOKEN, defaultFormValues };
