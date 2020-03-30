/**
 * MainMenu component.
 */
import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Menu } from './Menu';

import styles from './styles';

const useStyles = makeStyles(styles);

export interface MainMenuProps {
  mobileOpen: boolean;
  handleDrawerToggle: () => any;
}

const MainMenu: React.FunctionComponent<MainMenuProps> = ({
  mobileOpen,
  handleDrawerToggle,
}) => {
  const classes = useStyles();
  const theme = useTheme();

  const drawer = (
    <div>
      <Link href="/">
        <div className={classes.brand}>
          <div>piyango.online</div>
        </div>
      </Link>
      <Divider className={classes.dividerBottom} />

      {Menu.map(({ title, items }, i) => (
        <React.Fragment key={`menu-cat-${i}`}>
          {title && (
            <ListItem className={classes.categoryHeader}>
              <ListItemText
                classes={{
                  primary: classes.categoryHeaderPrimary,
                }}
              >
                {title}
              </ListItemText>
            </ListItem>
          )}
          {items.map(({ id, icon: Icon, text, active }) => (
            <ListItem
              key={id}
              button
              dense
              className={clsx(classes.item, classes.itemActionable, {
                [classes.active]: active,
              })}
            >
              <ListItemIcon>{Icon}</ListItemIcon>
              <ListItemText
                classes={{
                  primary: classes.itemPrimary,
                }}
                primary={text}
              />
            </ListItem>
          ))}
          <Divider className={classes.divider} />
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <nav className={classes.drawer} aria-label="ana menü">
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Hidden smUp implementation="css">
        <Drawer
          variant="temporary"
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          {drawer}
        </Drawer>
      </Hidden>
    </nav>
  );
};

export default MainMenu;
