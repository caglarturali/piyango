/**
 * CheckCoupon->Layout component.
 */
import React from 'react';
import { makeStyles, useMediaQuery, useTheme } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import RefreshIcon from '@material-ui/icons/Refresh';
import styles from '../styles';

const useStyles = makeStyles(styles);

export interface CheckCouponLayoutProps {
  title: string;
  show: boolean;
  handleClose: () => void;
  handleReset: () => void;
}

const CheckCouponLayout: React.FunctionComponent<CheckCouponLayoutProps> = ({
  title,
  show,
  handleClose,
  handleReset,
  children,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <Dialog
      disableBackdropClick
      fullWidth
      fullScreen={fullScreen}
      open={show}
      onClose={handleClose}
    >
      <AppBar color="default" className={classes.appBar}>
        <Toolbar classes={{ root: !fullScreen ? classes.toolbarRoot : '' }}>
          <Typography variant="body1" color="inherit" className={classes.flex}>
            {title}
          </Typography>

          <Tooltip title="Sıfırla">
            <IconButton
              color="inherit"
              onClick={handleReset}
              aria-label="Sıfırla"
            >
              <RefreshIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Kapat">
            <IconButton
              color="inherit"
              onClick={handleClose}
              aria-label="Kapat"
            >
              <CloseIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      <DialogContent className={classes.mainArea}>{children}</DialogContent>
    </Dialog>
  );
};

export default CheckCouponLayout;
