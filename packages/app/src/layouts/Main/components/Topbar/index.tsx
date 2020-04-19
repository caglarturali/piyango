/**
 * Topbar component.
 */
import React from 'react';
import { makeStyles } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import styles from './styles';
import Logo from '../../../../icons/Logo';

const useStyles = makeStyles(styles);

export interface TopbarProps {
  contentTitle: string;
  onMenuClick: (e: any) => void;
}

const Topbar: React.FC<TopbarProps> = ({ contentTitle, onMenuClick }) => {
  const classes = useStyles();

  return (
    <AppBar elevation={0}>
      <Toolbar classes={{ root: classes.toolbar }}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={onMenuClick}
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
        <div className={classes.content}>
          <Logo />
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
