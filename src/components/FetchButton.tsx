'use client';

import { MouseEventHandler } from 'react';
import { Typography } from '@mui/material';
import { Button } from './ui';
import { UserStatuses } from '@/@types/user';

interface FetchButtonProps {
  status?: UserStatuses;
  onClick: MouseEventHandler<HTMLButtonElement>;
  error?: string | null;
}

const FetchButton: React.FC<FetchButtonProps> = ({
  onClick,
  status,
  error
}) => {
  return (
    <div>
      <Button onClick={onClick} variant="contained">
        {(!status || status === 'succeeded') && (
          <Typography>Fetch Data</Typography>
        )}
        {status === 'loading' && <Typography>Loading...</Typography>}
        {status === 'failed' && <Typography color="error">{error}</Typography>}
      </Button>
    </div>
  );
};

export default FetchButton;
