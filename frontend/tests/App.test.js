import { render, screen } from '@testing-library/react';
import React from 'react';
import App from '../src/App';

describe('App tests', () => {
  it('contains text', () => {
    render(<App />);
    const heading = screen.getByText(/Hello world!/i);
    expect(heading).toBeInTheDocument()
  });
});
