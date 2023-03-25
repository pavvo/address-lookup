import { createStyles, rem } from "@mantine/core";

export const useStyles = createStyles(
  (theme, { opened }: { opened: boolean }) => ({
    control: {
      position: "absolute",
      bottom: theme.spacing.md,
      left: theme.spacing.md,
      width: rem(200),
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: `${theme.spacing.xs} ${theme.spacing.md}`,
      border: `${rem(1)} solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[2]
      }`,
      borderRadius: theme.radius.sm,
      transition: "background-color 150ms ease",
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[opened ? 5 : 6]
          : opened
          ? theme.colors.gray[0]
          : theme.white,

      "&:hover": {
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[5]
            : theme.colors.gray[0],
      },

      [`@media (max-width: ${theme.breakpoints.md})`]: {
        display: "none",
      },
    },

    label: {
      fontWeight: 500,
      fontSize: theme.fontSizes.sm,
    },

    icon: {
      transition: "transform 150ms ease",
      transform: opened ? "rotate(180deg)" : "rotate(0deg)",
    },
  })
);
