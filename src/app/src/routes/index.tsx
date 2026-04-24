import { createFileRoute } from '@tanstack/react-router';
import { Map } from '../features/map/Map';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <Map />;
}
