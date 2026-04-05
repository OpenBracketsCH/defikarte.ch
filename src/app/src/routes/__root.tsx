import { createRootRoute, Outlet } from '@tanstack/react-router';
import { NavBar } from '../app/layout/nav-bar/NavBar';

function RootComponent() {
  return (
    <div className="w-full h-screen flex flex-col">
      <main className="grow overflow-auto">
        <Outlet />
      </main>
      <nav className="shrink-0">
        <NavBar />
      </nav>
    </div>
  );
}

export const Route = createRootRoute({
  component: RootComponent,
});
