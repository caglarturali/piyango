import React from 'react';
import { render } from '@testing-library/react';
import { GlobalProvider } from '../../contexts';
import PSnackbar from '../PSnackbar';

describe('<PSnackbar />', () => {
  test('renders PSnackbar component with given message', () => {
    const msg = 'Test Message';
    const { asFragment, getByText } = render(
      <GlobalProvider>
        <PSnackbar show={true} message={msg} severity="success" />
      </GlobalProvider>,
    );
    const str = getByText(msg);
    expect(asFragment()).toMatchSnapshot();
    expect(str).toBeInTheDocument();
  });
});
