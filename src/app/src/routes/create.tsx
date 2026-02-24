import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/create')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/create"!</div>
}
