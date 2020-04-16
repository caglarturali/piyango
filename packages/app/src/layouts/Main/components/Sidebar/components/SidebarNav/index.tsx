/**
 * SidebarNav component.
 */
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import styles from './styles';
import { MenuCategory } from '../../../../Menu';

const useStyles = makeStyles(styles);

export interface SidebarNavProps {
  menuItems: MenuCategory[];
}

const SidebarNav: React.FC<SidebarNavProps> = ({ menuItems }) => {
  const classes = useStyles();
  const router = useRouter();

  const isActivePath = (path: string) => {
    if (path === '/') return path === '/' && router.asPath === '/';
    return router.asPath.startsWith(path);
  };

  return (
    <>
      {menuItems.map(({ title, items }, i) => (
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
          {items.map(({ id, icon: Icon, text, path }) => (
            <Link href={path} key={id}>
              <ListItem
                button
                dense
                className={clsx(classes.item, classes.itemActionable, {
                  [classes.active]: isActivePath(path),
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
            </Link>
          ))}
          <Divider className={classes.divider} />
        </React.Fragment>
      ))}
    </>
  );
};

export default SidebarNav;
