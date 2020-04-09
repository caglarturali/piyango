import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import LuckyBall from '../LuckyBall';

describe('<LuckyBall />', () => {
  test('renders LuckyBall component with padded number', () => {
    const { asFragment, getByText } = render(<LuckyBall num={7} />);
    const str = getByText(/07/);
    expect(asFragment()).toMatchSnapshot();
    expect(str).toBeInTheDocument();
  });

  test('renders LuckyBall component w/o padding on number', () => {
    const { asFragment, getByText, queryByText } = render(
      <LuckyBall num={7} pad={false} />,
    );
    const str = getByText(/7/);
    const padded = queryByText(/07/);
    expect(asFragment()).toMatchSnapshot();
    expect(str).toBeInTheDocument();
    expect(padded).toBeNull();
  });
});
