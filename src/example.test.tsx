import { render, screen } from '@testing-library/react';

test('render Root component', async () => {
  render(<h1>Aletheia!</h1>);

  const text = await screen.findByRole('heading');

  expect(text).toHaveTextContent('Aletheia!');
});
