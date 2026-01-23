import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { TextField } from './TextField';

describe('TextField', () => {
  it('renders text field', () => {
    render(<TextField label="click me" type="" />);
    expect(screen.getByText(/click me/i)).toBeInTheDocument();
  });
});
