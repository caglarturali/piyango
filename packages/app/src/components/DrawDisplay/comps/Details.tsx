/**
 * DrawDisplay->Details component.
 */
import React from 'react';
import { makeStyles } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import styles from '../styles';

const useStyles = makeStyles(styles);

export interface DetailsProps {
  expanded: boolean;
}

const Details: React.FunctionComponent<DetailsProps> = ({ expanded }) => {
  return (
    <Collapse in={expanded} timeout="auto" unmountOnExit>
      <CardContent>DETAYLAR</CardContent>
    </Collapse>
  );
};

export default Details;
