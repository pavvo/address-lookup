import { Box, createStyles } from "@mantine/core";

import { AddressProvider } from "@/context/address/provider";

import useLocation from "@/hooks/use-location";

import { AddressForm } from "@/components/AddressForm";
import { MapWrapper } from "@/components/Map/MapWrapper";

const useStyles = createStyles((theme) => ({
  root: {
    height: "100%",
    width: "100%",

    display: "flex",

    [`@media (max-width: ${theme.breakpoints.md})`]: {
      height: "auto",
      flexDirection: "column-reverse",
    },
  },

  addressWrap: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing.md,
  },

  map: {
    width: "100%",
    height: "100%",

    [`@media (max-width: ${theme.breakpoints.md})`]: {
      height: 300,
    },
  },
}));

export default function Home() {
  const { classes } = useStyles();

  const { location: userLocation } = useLocation();

  return (
    <AddressProvider>
      <Box className={classes.root}>
        <Box className={classes.addressWrap}>
          <AddressForm />
        </Box>
        <Box className={classes.map}>
          <MapWrapper location={userLocation} />
        </Box>
      </Box>
    </AddressProvider>
  );
}
