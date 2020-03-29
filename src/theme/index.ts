import { createMuiTheme } from '@material-ui/core/styles';
import palette from './palette';

export default createMuiTheme({
  palette: {
    ...palette,
    type: 'light',
  },
});
