/**
 * Logo component.
 */
import React from 'react';
import Link from 'next/link';
import { makeStyles } from '@material-ui/core';
import styles from './styles';

const useStyles = makeStyles(styles);

const Logo: React.FunctionComponent = () => {
  const classes = useStyles();

  return (
    <div className={classes.brand}>
      <Link href="/">
        <div>piyango.online</div>
      </Link>
    </div>
  );
};

export default Logo;
