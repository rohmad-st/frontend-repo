'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, User } from 'firebase/auth';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
  Container,
  Box,
  IconButton
} from '@mui/material';

import { auth } from '@/apis/firebase';
import { useAppDispatch, useAppSelector } from '@/store';
import { clearToken } from '@/store/auth/reducers';
import { clearProfile, setProfile } from '@/store/user/reducers';
import { getUsersData, putUserData, userLogout } from '@/store/actions';
import { Button } from '@/components/ui';
import { ConfirmDialog } from '@/components/dialogs/ConfirmDialog';
import { UpdateDialog } from '@/components/dialogs/UpdateDialog';
import { User as TUser, UserData } from '@/@types/user';

import EditIcon from '@mui/icons-material/Edit';

const MainPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { users, status, error } = useAppSelector((state) => state.user);

  const [user, setUser] = useState<User | null>(null);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);

  const handleLogout = async () => {
    await dispatch(userLogout());
    dispatch(clearToken());
    dispatch(clearProfile());
    router.push('/login');
  };

  const handleUpdate = async (data: Omit<TUser, 'id'>) => {
    const payload = { ...selectedUser, ...data } as UserData;
    await dispatch(putUserData(payload));
    await fetchData();
  };

  const fetchData = async () => {
    await dispatch(getUsersData());
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push('/login'); // Redirect to login if not authenticated
      } else {
        setProfile(currentUser);
        setUser(currentUser);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome, {user?.displayName || user?.email}
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Button
            variantColor="secondary"
            onClick={() => setIsDialogOpen(true)}>
            Sign Out
          </Button>

          <Button variantColor="primary" onClick={fetchData}>
            {status === 'loading' ? 'Loading...' : 'Fetch Data'}
          </Button>
        </Box>

        <Paper elevation={3} sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            User List
          </Typography>

          {status !== 'succeeded' && (
            <Box p={2} textAlign="center">
              {status === 'idle' && (
                <Typography>
                  Click &quot;Fetch Data&quot; to start fetch data.
                </Typography>
              )}
              {status === 'loading' && <Typography>Loading...</Typography>}
              {status === 'failed' && (
                <Typography color="error">{error}</Typography>
              )}
            </Box>
          )}

          {users.length > 0 && (
            <List>
              {users.map((user) => (
                <ListItem
                  key={user.id}
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="edit"
                      onClick={() => {
                        setSelectedUser(user);
                      }}>
                      <EditIcon />
                    </IconButton>
                  }>
                  <ListItemText primary={user.name} secondary={user.email} />
                </ListItem>
              ))}
            </List>
          )}
        </Paper>
      </Box>
      <ConfirmDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={handleLogout}
      />
      <UpdateDialog
        open={!!selectedUser?.id}
        onClose={() => setSelectedUser(null)}
        onSubmit={handleUpdate}
        data={selectedUser as TUser}
      />
    </Container>
  );
};

export default MainPage;
