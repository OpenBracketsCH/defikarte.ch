import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Tag } from './Tag';

describe('Tag', () => {
  it('renders tag', () => {
    render(<Tag icon="">Click me</Tag>);
    expect(screen.getByText(/click me/i)).toBeInTheDocument();
  });
});
