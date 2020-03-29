import { ThemeOptions } from '@material-ui/core';
import { orange, red } from '@material-ui/core/colors';

const opts: ThemeOptions = {
  palette: {
    primary: {
      main: '#006CA0',
    },
    secondary: orange,
    error: red,
  },
};

export default opts.palette;
