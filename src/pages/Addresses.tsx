import { Link } from "react-router-dom";

import { Anchor, Col, Container, Grid, Text, Title } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";

import { RemappedAddress } from "@/components/AddressForm/types";
import { AddressCard } from "@/components/AddressCard";
import { TextInput } from "@/components/TextInput";
import { IconSearch } from "@tabler/icons-react";
import { useEffect, useState } from "react";

export default function Addresses() {
  const [addresses, setAddresses] = useLocalStorage<RemappedAddress[] | any>({
    key: "addresses",
  });
  const [addressesToDisplay, setAddressesToDisplay] = useState([]);

  useEffect(() => {
    setAddressesToDisplay(addresses);
  }, [addresses]);

  const removeAddress = (address: string) => {
    setAddresses((prev: any) =>
      prev.filter((a: RemappedAddress) => a.addressLine1 !== address)
    );
  };

  const handleSearch = (e: any) => {
    const searchQuery = e.target.value.toLowerCase();

    if (searchQuery.length > 0) {
      const filteredAddresses = addresses.filter((address: RemappedAddress) =>
        address.addressLine1.toLowerCase().includes(searchQuery)
      );

      setAddressesToDisplay(filteredAddresses);
    } else {
      setAddressesToDisplay(addresses);
    }
  };

  return (
    <Container pt={24}>
      <Title>Address Book</Title>

      {addresses && addresses.length > 0 ? (
        <div>
          <Text my={32}>
            You have {addresses.length} saved address
            {addresses.length > 1 ? "es" : ""}.
            <Anchor component={Link} to="/">
              {" "}
              Click here
            </Anchor>{" "}
            to add more.
          </Text>

          <TextInput
            icon={<IconSearch size={16} />}
            placeholder="Search for an address"
            onChange={handleSearch}
            mb={32}
          />

          {addressesToDisplay?.length > 0 ? (
            <Grid pb={32}>
              {addressesToDisplay?.map((address: RemappedAddress) => (
                <Col xs={6} key={address.addressLine1}>
                  <AddressCard address={address} onRemove={removeAddress} />
                </Col>
              ))}
            </Grid>
          ) : (
            <Text mt={32}>
              No addresses found.{" "}
              <Anchor component={Link} to="/">
                Click here
              </Anchor>{" "}
              to add one.
            </Text>
          )}
        </div>
      ) : (
        <Text mt={32}>
          You don't have any saved addresses.{" "}
          <Anchor component={Link} to="/">
            Click here
          </Anchor>{" "}
          to add one.
        </Text>
      )}
    </Container>
  );
}
