import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/Index')({
  component: Index,
});

export function Index() {
  return <h1 className='text-center'>Hello World!</h1>;
}
