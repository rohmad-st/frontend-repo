import * as React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogProps
} from '@mui/material';
import { Button } from '@/components/ui';

interface ConfirmDialogProps extends DialogProps {
  onClose?: () => void;
  onConfirm?: () => void;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  onClose,
  onConfirm,
  ...props
}) => {
  const handleClose = () => {
    if (onClose) onClose();
  };

  const handleConfirm = () => {
    if (onConfirm) onConfirm();
  };

  return (
    <Dialog onClose={onClose} {...props}>
      <DialogTitle>Are you sure you want to sign out?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Clicking &quot;Yes&quot; will log you out of your account.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variantColor="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variantColor="primary" onClick={handleConfirm} autoFocus>
          Yes, Sign Out
        </Button>
      </DialogActions>
    </Dialog>
  );
};
