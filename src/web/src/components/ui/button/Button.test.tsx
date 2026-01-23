import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Button } from './Button';

describe('Button', () => {
  it('renders button', () => {
    render(<Button>Click me</Button>);

    expect(screen.getByText(/click me/i)).toBeInTheDocument();
  });
});
