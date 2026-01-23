import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { IconButton } from './IconButton';

describe('IconButton', () => {
  it('renders icon button', () => {
    render(<IconButton icon="" />);

    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
