import { ThemeOptions } from '@material-ui/core';
import { red } from '@material-ui/core/colors';

const opts: ThemeOptions['palette'] = {
  primary: {
    main: '#35495e',
  },
  secondary: {
    main: '#d35400',
  },
  error: red,
};

export default opts;
