import { Theme } from '@material-ui/core/styles/createMuiTheme';

declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    custom: {
      palette: {
        activeLink: string;
        border: string;
        drawerBg: string;
        drawerTop: string;
        couponRed: string;
      };
      typography: {
        cursive: string;
        condensed: string;
        monospace: string;
      };
    };
  }

  // allow configuration using `createMuiTheme`
  interface ThemeOptions {
    custom?: {
      palette?: {
        activeLink?: string;
        border?: string;
        drawerBg?: string;
        drawerTop?: string;
        couponRed?: string;
      };
      typography?: {
        cursive?: string;
        condensed?: string;
        monospace?: string;
      };
    };
  }
}
