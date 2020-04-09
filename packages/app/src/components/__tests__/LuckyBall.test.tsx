import React from 'react';
import { render } from '@testing-library/react';
import LuckyBall from '../LuckyBall';

describe('<LuckyBall />', () => {
  test('renders LuckyBall component with padded number', () => {
    const { asFragment } = render(<LuckyBall num={7} />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('renders LuckyBall component w/o padding on number', () => {
    const { asFragment } = render(<LuckyBall num={7} pad={false} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
