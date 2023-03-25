import {
  ActionIcon,
  Box,
  Card,
  createStyles,
  rem,
  Text,
  Title,
} from "@mantine/core";

import { modals } from "@mantine/modals";

import { IconTrash } from "@tabler/icons-react";

import { RemappedAddress } from "../AddressForm/types";

const useStyles = createStyles((theme) => ({
  root: {
    height: "fit-content",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    minHeight: "100%",
    boxShadow: theme.shadows.sm,
    padding: theme.spacing.lg,
    borderRadius: theme.radius.md,
  },
}));

export interface AddressCardProps {
  address: RemappedAddress;
  onRemove: (address: string) => void;
}

export function AddressCard({ address, onRemove }: AddressCardProps) {
  const { classes } = useStyles();

  const openDeleteModal = () =>
    modals.openConfirmModal({
      title: "Delete saved address?",
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to delete this address? This action cannot be
          undone.
        </Text>
      ),
      labels: { confirm: "Delete address", cancel: "No don't delete it" },
      confirmProps: { color: "red" },
      onCancel: () => console.log("Cancelled"),
      onConfirm: () => onRemove(address.addressLine1),
    });

  return (
    <Card className={classes.root} withBorder>
      <Box pos="absolute" top={rem(16)} right={rem(16)}>
        <ActionIcon onClick={openDeleteModal}>
          <IconTrash size={rem(14)} />
        </ActionIcon>
      </Box>
      <Title order={2} mb={8} maw="90%">
        {address.addressLine1}
      </Title>
      <Title order={4} color="dimmed">
        {address.addressLine2}
      </Title>
      {address.city && address.zip && (
        <Text>
          {address.city}, {address.zip}
        </Text>
      )}
      {address.state && address.country && (
        <Text>
          {address.state}, {address.country}
        </Text>
      )}
    </Card>
  );
}
