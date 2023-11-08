import {
  Box,
  Button,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import api from '../api/configure-axios';
import React, { useContext, useState } from 'react';
import { Delete } from '@mui/icons-material';
import { UserContext } from '../context/UserContext';
import DeleteDialog from './DeleteDialog';

const Users = () => {
  const [userId, setUserId] = useState(null);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { operadores } = useContext(UserContext);

  const deleteUser = async (id) => {
    try {
      const res = await api.delete(`/user/${id}`);

      console.log(res);
      handleClose();
    } catch (e) {
      alert(e.message);
      return null;
    }
  };

  function BasicTable() {
    return (
      <TableContainer component={Box}>
        <Table size='small' aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Nome</TableCell>
              <TableCell align='center'>Treinamentos</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {operadores.map((row, index) => (
              <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                key={row.id}
              >
                <TableCell component='th' scope='row'>
                  {index + 1}
                </TableCell>
                <TableCell component='th' scope='row'>
                  {row.name}
                </TableCell>
                <TableCell align='center'>{row.cursos.length}</TableCell>
                <TableCell sx={{ border: 'none' }}>
                  <Button
                    onClick={() => {
                      setUserId(row.id);
                      handleOpen();
                    }}
                  >
                    <Delete />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  return (
    <Box
      mt={6}
      display={'flex'}
      alignContent='center'
      justifyContent={'center'}
    >
      <Card elevation={4}>
        <CardContent>
          <Typography variant='h5' color='text.secondary'>
            Relatorio de participação
          </Typography>

          <BasicTable />
        </CardContent>
        <DeleteDialog
          open={open}
          handleClose={handleClose}
          delFunc={() => deleteUser(userId)}
        />
      </Card>
    </Box>
  );
};

export default Users;
