import { useState } from "react";
import { Link } from "react-router-dom";

import {
  Anchor,
  Autocomplete,
  Button,
  Group,
  Loader,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";

import { TextInput } from "@/components/TextInput";

import { useAddress } from "@/hooks/use-address";

import { useStyles } from "./styles";
import { AutoCompleteOption, Feature, RemappedAddress } from "./types";
import { remapResponseData } from "./helpers";
import { BASE_URL, TOKEN, defaultFormValues } from "./constants";

export function AddressForm() {
  const [formValues, setFormValues] = useState(defaultFormValues);
  const [options, setOptions] = useState<AutoCompleteOption[]>([]);
  const [loading, setLoading] = useState(false);

  const [_, setAddresses] = useLocalStorage<RemappedAddress[] | any>({
    key: "addresses",
    defaultValue: [],
  });

  const { classes } = useStyles();

  const { selectedAddress, setSelectedAddress } = useAddress();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    setSelectedAddress({
      ...selectedAddress,
      [e.target.name]: e.target.value,
    });
  };

  const saveSelectedAddress = () => {
    setAddresses((prev: any) => [...prev, selectedAddress]);

    notifications.show({
      title: "Address saved",
      message: "Address has been saved successfully",
      color: "green",
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    saveSelectedAddress();
    resetForm();
  };

  const resetForm = () => {
    setFormValues(defaultFormValues);
    setOptions([]);
    setSelectedAddress(null);
  };

  const handleAutocompleteSelect = ({ content }: AutoCompleteOption) => {
    setFormValues((prev) => ({
      ...prev,
      city: content.city,
      state: content.state,
      zip: content.zip,
      country: content.country,
    }));

    setSelectedAddress(content);
  };

  const handleAutocompleteChange = (query: string) => {
    setFormValues((prev) => ({
      ...prev,
      addressLine1: query,
    }));

    setSelectedAddress({
      ...selectedAddress,
      addressLine1: query,
    });

    if (!query) return setOptions([]);

    if (query.length < 3) return setOptions([]);

    fetchOptions(query);
  };

  const fetchOptions = async (query: string) => {
    setLoading(true);

    const url = `${BASE_URL}/geocoding/v5/mapbox.places/${query}.json?access_token=${TOKEN}`;

    const response = await fetch(url);

    const data = await response.json();

    setOptions(
      data.features.map((feature: Feature) => ({
        value: feature.place_name,
        content: remapResponseData(feature),
      }))
    );

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack className={classes.stackRoot}>
        <Title>Address Lookup</Title>
        <Text mb={16}>
          Use the form below to search for an address. Once you find the address
          you are looking for you can save it to your{" "}
          <Anchor component={Link} to="/addresses">
            address book
          </Anchor>
          .
        </Text>
        <Autocomplete
          data={options}
          label="Address"
          placeholder="15329 Huston 21st"
          classNames={classes}
          value={formValues.addressLine1}
          onChange={handleAutocompleteChange}
          filter={() => true}
          rightSection={loading ? <Loader size={20} /> : null}
          onItemSubmit={handleAutocompleteSelect}
          required
        />
        <TextInput
          label="Address Line 2"
          placeholder="Apt / Suite / Bldg. (optional)"
          classNames={classes}
          name="addressLine2"
          value={formValues.addressLine2}
          onChange={handleInputChange}
        />
        <TextInput
          label="City"
          placeholder="Houston"
          classNames={classes}
          name="city"
          value={formValues.city}
          onChange={handleInputChange}
        />
        <Group grow>
          <TextInput
            label="State"
            placeholder="TX"
            classNames={classes}
            name="state"
            value={formValues.state}
            onChange={handleInputChange}
          />
          <TextInput
            label="Zip"
            placeholder="77008"
            classNames={classes}
            name="zip"
            value={formValues.zip}
            onChange={handleInputChange}
          />
        </Group>
        <TextInput
          label="Country"
          placeholder="United States"
          classNames={classes}
          name="country"
          value={formValues.country}
          onChange={handleInputChange}
        />
        <Group grow>
          <Button size="md" type="submit">
            Save
          </Button>
          <Button variant="outline" size="md" onClick={resetForm}>
            Reset
          </Button>
        </Group>
      </Stack>
    </form>
  );
}
