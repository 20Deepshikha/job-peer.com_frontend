import { render, screen } from '@testing-library/react';
import App from './App';
import { SpeedInsights } from "@vercel/speed-insights/next"

test('renders learn react link', () => {
  render(
    <>
    <App />
    <SpeedInsights />
    </>
    
    );
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
