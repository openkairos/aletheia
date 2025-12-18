import Root from '@/Root.tsx';
import { render, screen } from '@testing-library/react';

test('render Root component', async () => {
  render(<Root />);

  const text = await screen.findByRole('heading');

  expect(text).toHaveTextContent('Aletheia!');
});
