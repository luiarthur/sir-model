import { render, screen } from '@testing-library/react';
import { App } from '../App';

test("Renders sir model header", () => {
  render(<App />);
  const linkElement = screen.getByText(/SIR Model/i);
  expect(linkElement).toBeInTheDocument();
});
