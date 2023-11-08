import {
  Backdrop,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Dialog,
  DialogContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import api from '../api/configure-axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AddParticipantes from './AddParticipantes';
import { Delete, DeleteOutline } from '@mui/icons-material';
import dayjs from 'dayjs';
import DeleteDialog from './DeleteDialog';

const Atividade = () => {
  const { id } = useParams();
  const [atividade, setAtividade] = useState({});
  const [loading, setLoading] = useState(true);
  const [dialog, setDialog] = React.useState({
    editDiag: false,
    delDiag: false,
  });
  const handleOpen = (item) =>
    setDialog((prevState) => ({
      ...prevState,
      [item]: true,
    }));
  const handleClose = (item) =>
    setDialog((prevState) => ({
      ...prevState,
      [item]: false,
    }));

  const navigate = useNavigate();

  const getAtividade = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/cursos/${id}`);
      setAtividade(res.data);
      setLoading(false);
    } catch (e) {
      alert(e.message);
      return null;
    }
  };
  const deleteParticipante = async (id, tipo) => {
    setLoading(true);

    try {
      const res = await api.delete(`/cursos/${id}`, { data: { tipo } });
      console.log(res);
      setLoading(false);
      if (tipo === 'curso') {
        navigate('../..', { relative: 'path' });
      } else {
        getAtividade();
      }
    } catch (e) {
      alert(e.message);
      return null;
    }
  };
  const deleteCurso = () => {
    deleteParticipante(id, 'curso');
  };

  useEffect(() => {
    getAtividade();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
        // onClick={() => setLoading(false)}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
    );
  }

  function BasicTable() {
    return (
      <TableContainer component={Box}>
        <Table
          sx={{ minWidth: { xs: 250, md: 600 } }}
          size='medium'
          aria-label='simple table'
        >
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell align='center'>Condição</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {atividade.participantes.map((row) => (
              <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                key={row.user.name}
              >
                <TableCell component='th' scope='row'>
                  {row.user.name}
                </TableCell>
                <TableCell component={'th'} align='center'>
                  {row.situacao}
                </TableCell>
                <TableCell align='center'>
                  <Button
                    variant='text'
                    onClick={() => deleteParticipante(row.id, 'participante')}
                  >
                    <DeleteOutline />
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
          <Typography variant='body2' color='text.secondary'>
            Nome da atividade
          </Typography>
          <Typography
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
            gutterBottom
            variant='h5'
            component='div'
          >
            {atividade.title}
            <Button
              variant='contained'
              color='error'
              onClick={() => handleOpen('delDiag')}
            >
              <Delete />
            </Button>
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            Descrição da atividade
          </Typography>
          <Typography mb={4} variant='h6' color='text.secondary'>
            {atividade.body}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            Datas da atividade
          </Typography>
          <Typography mb={4} variant='h6' color='text.secondary'>
            Inicio: {dayjs(atividade.dataInicio).format('DD/MM/YYYY')}
            <br />
            Fim: {dayjs(atividade.dataFim).format('DD/MM/YYYY')}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            Participantes:{atividade.participantes.length}
          </Typography>
          <BasicTable />
          <Box sx={{ margin: '10px' }}>
            <Button variant='contained' onClick={() => handleOpen('editDiag')}>
              Editar Atividade
            </Button>
          </Box>
        </CardContent>
        <Dialog
          fullWidth
          open={dialog.editDiag}
          onClose={() => handleClose('editDiag')}
          // aria-labelledby="modal-modal-title"
          // aria-describedby="modal-modal-description"
        >
          <DialogContent>
            <Box>
              <AddParticipantes
                id={id}
                atividade={atividade}
                handleClose={handleClose}
                getAtividade={getAtividade}
              />
            </Box>
          </DialogContent>
        </Dialog>

        <DeleteDialog
          open={dialog.delDiag}
          delFunc={deleteCurso}
          handleClose={() => handleClose('delDiag')}
        />
        {/* <DialogTitle id="alert-dialog-title">
            {"Você deseja realmente excluir essa atividade?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Alertamos que após a exclusão não será possivel recuperar os dados apagados!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant='contained' color='error' onClick={() => deleteParticipante(id, 'curso')}>Sim</Button>
            <Button variant='contained' color='success' onClick={() => handleClose('delDiag')} autoFocus>
              Não
            </Button>
          </DialogActions>
        </Dialog> */}
      </Card>
    </Box>
  );
};

export default Atividade;
