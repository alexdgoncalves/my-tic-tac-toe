import { Snackbar, SnackbarOrigin } from '@mui/material';
import { useState } from 'react';

interface SimpleAlertProps {
  message: string;
}

interface State extends SnackbarOrigin {
  open: boolean;
}

export default function SimpleAlert({ message }: SimpleAlertProps) {
  const [state, setState] = useState<State>({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  return (
    <Snackbar
      open={state.open}
      onClose={handleClose}
      message={message}
      key="top"
    />
  )
}