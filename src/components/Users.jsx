import {
  Avatar,
  Card,
  CardContent,
  Container,
  IconButton,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import api from '../api/configure-axios';
import React, { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import DeleteDialog from './DeleteDialog';
import { Stack } from '@mui/system';
import { Link } from 'react-router-dom';

const Users = () => {
  const [userId, setUserId] = useState(null);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { operadores } = useContext(UserContext);

  const deleteUser = async (id) => {
    try {
      const res = await api.delete(`/users/${id}`);

      console.log(res);
      handleClose();
    } catch (e) {
      alert(e.message);
      return null;
    }
  };
  function UsersCard() {
    return (
      <>
        {operadores.map((row) => (
          <Card
            key={row.id}
            sx={{
              display: 'flex',
              marginBottom: '0.1rem',
            }}
          >
            <Stack
              width={'100%'}
              direction='row'
              spacing={1}
              justifyContent={'space-between'}
              alignItems={'center'}
              paddingLeft={'0.5rem'}
            >
              <Avatar alt={row.name}></Avatar>
              <CardContent sx={{ width: '100%' }}>
                <Typography
                  display={'flex'}
                  margin={'0'}
                  component='div'
                  variant='h6'
                  alignContent={'flex-start'}
                >
                  {row.name}
                </Typography>
                <Typography
                  variant='subtitle1'
                  color='text.secondary'
                  component='div'
                >
                  Participações: {row.cursos.length}
                </Typography>
              </CardContent>
              <Link
                to={`/list-user/${row.id}`}
                style={{ textDecoration: 'none' }}
              >
                <IconButton size='small'>
                  <InfoIcon sx={{ height: 30, width: 30 }} />
                </IconButton>
              </Link>

              <IconButton
                onClick={() => {
                  setUserId(row.id);
                  handleOpen();
                }}
              >
                <DeleteIcon sx={{ height: 30, width: 30 }} />
              </IconButton>
            </Stack>
          </Card>
        ))}
      </>
    );
  }

  return (
    <Container sx={{ maxWidth: { xs: '100%', md: '50%' } }} disableGutters>
      <Typography variant='h6' color='text.primary'>
        Relatório participações em treinamento
      </Typography>
      <Typography variant='h6' color='text.secondary'>
        Total de pessoas: {operadores.length}
      </Typography>

      <UsersCard />
      <DeleteDialog
        open={open}
        handleClose={handleClose}
        delFunc={() => deleteUser(userId)}
      />
    </Container>
  );
};

export default Users;
