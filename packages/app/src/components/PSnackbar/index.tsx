/**
 * PSnackbar component.
 */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AlertProps, Color } from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import styles from './styles';
import Alert from '../Alert';
import { useGlobalDispatch } from '../../contexts';

const useStyles = makeStyles(styles);

export interface PSnackbarProps {
  show: boolean;
  message: string;
  severity?: Color;
}

const PSnackbar: React.FunctionComponent<PSnackbarProps & AlertProps> = ({
  show,
  message,
  severity = 'success',
  ...props
}) => {
  const dispatch = useGlobalDispatch();

  const handleClose = () => {
    dispatch({
      type: 'showsnackbar',
      payload: { snackbar: undefined },
    });
  };

  return (
    <Snackbar
      open={show}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      action={
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={handleClose}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      }
    >
      <Alert onClose={handleClose} severity={severity || 'success'} {...props}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default PSnackbar;
