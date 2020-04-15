import React from 'react';
import App, { AppProps } from 'next/app';
import { createMuiTheme, Theme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  DrawsProvider,
  GlobalProvider,
  GlobalStateContext,
} from '../src/contexts';
import { config, overrides } from '../src/theme';

class MyApp extends App {
  static contextType = GlobalStateContext;

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps } = this.props;

    let theme: Theme = createMuiTheme();

    if (this.context) {
      const { theme: themePref } = this.context;
      theme = createMuiTheme({
        ...config,
        palette: {
          ...config.palette,
          type: themePref,
        },
      });
      theme.overrides = overrides(theme);
    }

    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    );
  }
}

const withProvider = (props: AppProps) => {
  return (
    <GlobalProvider>
      <DrawsProvider>
        <MyApp {...props} />
      </DrawsProvider>
    </GlobalProvider>
  );
};

export default withProvider;
