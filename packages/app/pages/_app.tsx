import React from 'react';
import App, { AppProps } from 'next/app';
import { createMuiTheme, Theme, ThemeProvider } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { DrawsProvider, GlobalProvider, useGlobalState } from '../src/contexts';
import { config, overrides } from '../src/theme';

interface MyAppProps {
  theme: Theme;
}

class MyApp extends App<MyAppProps> {
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps, theme } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    );
  }
}

const ThemeWrapper: React.FC<AppProps> = (appProps) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const { theme: themePref } = useGlobalState();

  const theme = React.useMemo(() => {
    const t = createMuiTheme({
      ...config,
      palette: {
        ...config.palette,
        type: prefersDarkMode ? 'dark' : 'light',
      },
    });
    t.overrides = overrides(t);
    return t;
  }, [prefersDarkMode]);

  return <MyApp theme={theme} {...appProps} />;
};

const WithProviders = (props: AppProps) => (
  <GlobalProvider>
    <DrawsProvider>
      <ThemeWrapper {...props} />
    </DrawsProvider>
  </GlobalProvider>
);

export default WithProviders;
