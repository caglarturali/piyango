/**
 * Sidebar component.
 */
import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core';
import Drawer, { DrawerProps } from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import SidebarNav from './components/SidebarNav';
import { Menu } from '../../Menu';
import styles from './styles';

const useStyles = makeStyles(styles);

export interface SidebarProps {
  open: boolean;
  variant: DrawerProps['variant'];
  onClose: (e: any) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, variant, onClose }) => {
  const theme = useTheme();
  const classes = useStyles();

  return (
    <Drawer
      variant={variant}
      anchor={theme.direction === 'rtl' ? 'right' : 'left'}
      open={open}
      onClose={onClose}
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
    </Drawer>
  );
};

export default Sidebar;
