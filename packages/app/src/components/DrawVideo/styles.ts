/**
 * DrawVideo component styles.
 */
import { createStyles, Theme } from '@material-ui/core';

export default ({ transitions }: Theme) =>
  createStyles({
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: transitions.create('transform', {
        duration: transitions.duration.shortest,
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
