import { createRootRoute, Outlet } from '@tanstack/react-router';
import { NavBar } from '../app/layout/NavBar/NavBar';

function RootComponent() {
  return (
    <div className="w-full h-screen flex flex-col">
      <main className="grow">
        <Outlet />
      </main>
      <nav>
        <NavBar />
      </nav>
    </div>
  );
}

export const Route = createRootRoute({
  component: RootComponent,
});
