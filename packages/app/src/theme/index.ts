import { Theme, ThemeOptions } from '@material-ui/core/styles';

// Base config
import typography from './typography';
import palette from './palette';
import shape from './shape';
import custom from './custom';

// Overrides
import MuiCard from './overrides/MuiCard';
import MuiDrawer from './overrides/MuiDrawer';
import MuiDivider from './overrides/MuiDivider';
import MuiListItemText from './overrides/MuiListItemText';
import MuiListItemIcon from './overrides/MuiListItemIcon';
import MuiAvatar from './overrides/MuiAvatar';
import MuiExpansionPanel from './overrides/MuiExpansionPanel';

export const overrides = (theme: Theme): ThemeOptions['overrides'] => ({
  MuiDrawer: MuiDrawer(theme),
  MuiDivider: MuiDivider(theme),
  MuiListItemText: MuiListItemText(theme),
  MuiListItemIcon: MuiListItemIcon(theme),
  MuiAvatar: MuiAvatar(theme),
  MuiCard: MuiCard(theme),
  MuiExpansionPanel: MuiExpansionPanel(theme),
});

export const config: ThemeOptions = {
  typography,
  palette,
  shape,
  custom,
};
