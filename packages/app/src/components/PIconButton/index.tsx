/**
 * PIconButton component.
 */
import React from 'react';
import { makeStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import styles from './styles';

const useStyles = makeStyles(styles);

export interface PIconButtonProps {
  title: string;
  icon: React.ElementType;
  className?: string;
  handlers?: { [eventName: string]: (e: any) => void };
  disabled?: boolean;
}

const PIconButton: React.FunctionComponent<PIconButtonProps> = ({
  title,
  icon: Icon,
  className,
  handlers,
  disabled = false,
}) => {
  const classes = useStyles();

  return (
    <Tooltip title={title}>
      <Box>
        <IconButton
          disabled={disabled}
          className={className}
          color="default"
          aria-label={title}
          {...handlers}
        >
          <Icon />
        </IconButton>
      </Box>
    </Tooltip>
  );
};

export default PIconButton;
