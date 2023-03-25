import { Outlet } from "react-router-dom";

import { ThemePicker } from "@/components/ThemePicker";

export function Layout() {
  return (
    <>
      <Outlet />
      <ThemePicker />
    </>
  );
}
