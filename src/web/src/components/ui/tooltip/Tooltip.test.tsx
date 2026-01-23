import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import { Tooltip } from './Tooltip';

describe('Tooltip', () => {
  it('renders tooltip', () => {
    render(<Tooltip />);
  });
});
