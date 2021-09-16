import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Editor link', () => {
  render(<App />);
  const linkElement = screen.getByText(/My Editor/i);
  expect(linkElement).toBeInTheDocument();
});
