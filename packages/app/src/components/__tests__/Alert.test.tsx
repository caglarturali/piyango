import React from 'react';
import { render } from '@testing-library/react';
import Alert from '../Alert';

describe('<Alert />', () => {
  test('should correctly render Alert component', () => {
    const { asFragment } = render(<Alert color="success" />);
    expect(asFragment()).toMatchSnapshot();
  });
});
