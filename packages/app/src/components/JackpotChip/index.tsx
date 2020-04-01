/**
 * JackpotChip component.
 */
import React from 'react';
import { MoneyUtils } from '@caglarturali/piyango-common';
import { makeStyles } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import styles from './styles';

const useStyles = makeStyles(styles);

export interface JackpotChipProps {
  jackpot: number;
  tooltip: string;
  variant?: 'default' | 'outlined';
  onClick?: () => void;
}

const JackpotChip: React.FunctionComponent<JackpotChipProps> = ({
  jackpot,
  tooltip,
  variant = 'default',
  onClick,
}) => {
  const classes = useStyles();

  const jackpotStr = new MoneyUtils(jackpot).format();

  return (
    <Tooltip title={tooltip}>
      <Chip
        avatar={
          <Avatar>
            <Typography className={classes.currency} variant="body2">
              ₺
            </Typography>
          </Avatar>
        }
        classes={{
          outlined: classes.chipOutlined,
        }}
        label={jackpotStr}
        clickable
        className={classes.chip}
        color="primary"
        variant={variant}
        onClick={onClick}
      />
    </Tooltip>
  );
};

export default JackpotChip;
