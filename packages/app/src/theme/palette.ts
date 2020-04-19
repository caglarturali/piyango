import { ThemeOptions } from '@material-ui/core';
import { orange, red } from '@material-ui/core/colors';

const opts: ThemeOptions['palette'] = {
  primary: {
    main: '#35495e',
  },
  secondary: orange,
  error: red,
};

export default opts;
