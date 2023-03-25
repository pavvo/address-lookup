import { useState } from "react";

import {
  UnstyledButton,
  Menu,
  Group,
  useMantineColorScheme,
  useMantineTheme,
  ColorScheme,
} from "@mantine/core";
import { IconChevronDown, IconMoonStars, IconSun } from "@tabler/icons-react";

import { useStyles } from "./styles";
import { colorSchemes } from "./constants";

export function ThemePicker() {
  const [opened, setOpened] = useState(false);
  const { classes } = useStyles({ opened });

  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();

  const handleColorSchemeChange = (value: ColorScheme) => {
    toggleColorScheme(value);
  };

  const items = colorSchemes.map((scheme) => (
    <Menu.Item
      icon={
        scheme.label === "Dark" ? (
          <IconMoonStars
            color={theme.colors.gray[6]}
            size="1.25rem"
            stroke={1.5}
          />
        ) : (
          <IconSun color={theme.colors.gray[6]} size="1.25rem" stroke={1.5} />
        )
      }
      onClick={() =>
        handleColorSchemeChange(scheme.label.toLowerCase() as ColorScheme)
      }
      key={scheme.label}
    >
      {scheme.label}
    </Menu.Item>
  ));

  return (
    <Menu
      onOpen={() => setOpened(true)}
      onClose={() => setOpened(false)}
      width="target"
    >
      <Menu.Target>
        <UnstyledButton className={classes.control}>
          <Group spacing="xs">
            {colorScheme === "dark" ? (
              <IconMoonStars color={theme.colors.gray[6]} size="1.25rem" />
            ) : (
              <IconSun color={theme.colors.gray[6]} size="1.25rem" />
            )}
            <span className={classes.label}>
              {colorScheme === "dark" ? "Dark" : "Light"}
            </span>
          </Group>
          <IconChevronDown size="1rem" className={classes.icon} stroke={1.5} />
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>
          Use the <strong>mod+J</strong> hotkey to toggle the color scheme
        </Menu.Label>
        {items}
      </Menu.Dropdown>
    </Menu>
  );
}
