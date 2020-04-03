/**
 * DrawVideo component styles.
 */
import { createStyles, Theme } from '@material-ui/core';

export default (theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    content: {
      padding: 0,
      '&:last-child': {
        paddingBottom: 0,
      },
    },
    video: {
      width: '100%',
    },
  });
