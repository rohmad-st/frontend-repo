import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  DialogProps
} from '@mui/material';
import { Button } from '@/components/ui';
import { User } from '@/@types/user';

interface UpdateDialogProps extends Omit<DialogProps, 'onSubmit'> {
  onClose?: () => void;
  onSubmit?: (data: Omit<User, 'id'>) => void;
  data?: User;
}

export const UpdateDialog: React.FC<UpdateDialogProps> = ({
  onClose,
  onSubmit,
  data,
  ...props
}) => {
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');

  const handleClose = () => {
    if (onClose) onClose();
  };

  const handleSubmit = () => {
    if (onSubmit) onSubmit({ email, name });
    handleClose(); // Close dialog after submission
  };

  useEffect(() => {
    if (data?.email) setEmail(data.email);
    if (data?.name) setName(data.name);
  }, [data]);

  return (
    <Dialog onClose={handleClose} {...props}>
      <DialogTitle>Update User</DialogTitle>
      <DialogContent>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button variantColor="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          variantColor="primary"
          onClick={handleSubmit}
          disabled={!email || !name} // Disable submit if fields are empty
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};
