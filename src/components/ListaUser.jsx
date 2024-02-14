import React, { useState } from 'react';
import api from '../api/configure-axios';
import { useParams } from 'react-router-dom';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

const ListaUser = () => {
  const { id } = useParams();
  const [user, SetUser] = useState({});
  const [cursos, SetCursos] = useState([]);

  const getUser = async () => {
    try {
      const res = await api.get(`/users/${id}`);
      console.log(res.data);
      SetUser(res.data);
      SetCursos(res.data.cursos);
      console.log(cursos.map((item) => item.curso.title));
    } catch (e) {
      alert(e.message);
      return null;
    }
  };

  React.useEffect(() => {
    getUser();
  }, []);

  return (
    <Box m={2}>
      <Typography variant='h2' color='text.primary'>
        {user.name}
      </Typography>
      <TableContainer component={Paper}>
        <Table aria-label='a simple table'>
          <TableHead>
            <TableRow>
              <TableCell>
                Participou dos seguintes cursos/treinamentos
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cursos.map((row, idx) => (
              <TableRow
                key={idx}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component='th' scope='row'>
                  {idx + 1} - {row.curso.title}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ListaUser;
