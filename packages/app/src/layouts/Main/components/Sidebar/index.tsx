/**
 * Sidebar component.
 */
import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core';
import SwipeableDrawer, {
  SwipeableDrawerProps,
} from '@material-ui/core/SwipeableDrawer';
import Divider from '@material-ui/core/Divider';
import SidebarNav from './components/SidebarNav';
import { Menu } from '../../Menu';
import styles from './styles';

const useStyles = makeStyles(styles);

export interface SidebarProps {
  open: boolean;
  variant: SwipeableDrawerProps['variant'];
  onDrawerToggle: (e: any) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, variant, onDrawerToggle }) => {
  const theme = useTheme();
  const classes = useStyles();

  return (
    <SwipeableDrawer
      variant={variant}
      anchor={theme.direction === 'rtl' ? 'right' : 'left'}
      open={open}
      onOpen={onDrawerToggle}
      onClose={onDrawerToggle}
      classes={{
        paper: classes.drawer,
      }}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
    >
      <div className={clsx(classes.root)}>
        <SidebarNav menuItems={Menu} />
      </div>
    </SwipeableDrawer>
  );
};

export default Sidebar;
