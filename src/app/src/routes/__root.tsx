import { createRootRoute, Outlet } from "@tanstack/react-router";
import { NavBar } from "../app/layout/NavBar/NavBar";

function RootComponent() {
  return (
    <div className="">
      <main>
        <Outlet />
      </main>
      <NavBar />
    </div>
  );
}

export const Route = createRootRoute({
  component: RootComponent,
});
