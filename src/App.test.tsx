import { render, screen } from '@testing-library/react';
import App from '@/App';

test('render App component', async () => {
  render(<App />);

  const text = await screen.findByRole('heading');

  expect(text).toHaveTextContent('Aletheia!');
});
