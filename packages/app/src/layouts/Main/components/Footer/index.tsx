/**
 * Footer component.
 */
import React from 'react';
import { makeStyles } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import styles from './styles';
import { app } from '../../../../configs/app';

const useStyles = makeStyles(styles);

const Footer: React.FC = () => {
  const classes = useStyles();

  return (
    <footer className={classes.root}>
      <Typography variant="body2">
        &copy;{' '}
        <Link component="a" href={app.baseUrl}>
          Piyango.online
        </Link>{' '}
        {new Date().getFullYear()}
      </Typography>
    </footer>
  );
};

export default Footer;
