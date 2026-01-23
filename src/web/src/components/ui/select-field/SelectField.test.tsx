import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import { SelectField } from './SelectField';

describe('SelectField', () => {
  it('renders select field', () => {
    render(<SelectField label="" options={[]} />);
  });
});
