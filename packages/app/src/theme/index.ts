import { Theme } from '@material-ui/core/styles';

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

export const overrides = (theme: Theme) => ({
  MuiDrawer: MuiDrawer(theme),
  MuiDivider: MuiDivider(theme),
  MuiListItemText: MuiListItemText(theme),
  MuiListItemIcon: MuiListItemIcon(theme),
  MuiAvatar: MuiAvatar(theme),
  MuiCard: MuiCard(theme),
  MuiExpansionPanel: MuiExpansionPanel(theme),
});

export const config = {
  typography,
  palette,
  shape,
  custom,
};
