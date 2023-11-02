import {
  Backdrop, Box, Button, Card, CardActionArea, CardContent, CircularProgress,
  Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography
} from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AddParticipantes from './AddParticipantes';
import { Delete, DeleteOutline } from '@mui/icons-material';
import dayjs from 'dayjs';

const Atividade = () => {
  const { id } = useParams()
  const [atividade, setAtividade] = useState({})
  const [loading, setLoading] = useState(true);
  const [dialog, setDialog] = React.useState({ editDiag: false, delDiag: false });
  const handleOpen = (item) => setDialog((prevState) => ({
    ...prevState,
    [item]: true,
  }));
  const handleClose = (item) => setDialog((prevState) => ({
    ...prevState,
    [item]: false,
  }));

  const navigate = useNavigate()

  const getAtividade = async () => {
    setLoading(true)
    try {
      const res = await axios.get(
        process.env.NODE_ENV === "development"
          ? `${import.meta.env.VITE_MYLOCALHOST}:3000/api/cursos/${id}`
          : `https://api-curso-project.vercel.app/api/cursos/${id}`
      );
      setAtividade(res.data)
      setLoading(false)
    } catch (e) {
      alert(e.message);
      return null
    }
  }
  const deleteParticipante = async (id, tipo) => {
    setLoading(true)

    try {
      const res = await axios.delete(
        process.env.NODE_ENV === "development"
          ? `${import.meta.env.VITE_MYLOCALHOST}:3000/api/cursos/${id}`
          : `https://api-curso-project.vercel.app/api/cursos/${id}`
        , { data: { tipo } });
      console.log(res);
      setLoading(false)
      if (tipo === 'curso') {
        navigate("../..", { relative: "path" })
      } else {
        getAtividade()
      }

    } catch (e) {
      alert(e.message);
      return null
    }
  }

  useEffect(() => {
    getAtividade()
  }, [])

  if (loading) {
    return (<Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={loading}
    // onClick={() => setLoading(false)}
    >
      <CircularProgress color="inherit" />
    </Backdrop>)
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  function BasicTable() {
    return (
      <TableContainer component={Box}>
        <Table sx={{ minWidth: { xs: 250, md: 600 } }} size='medium' aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell align="right">Condição</TableCell>

            </TableRow>
          </TableHead>
          <TableBody >
            {atividade.participantes.map((row, index) => (
              <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                key={row.user.name}
              >
                <TableCell component="th" scope="row">
                  {row.user.name}
                </TableCell>
                <TableCell align="right">{row.situacao}</TableCell>
                <TableCell sx={{ border: 'none' }} >
                  <Button variant='text' onClick={() => deleteParticipante(row.id, 'participante')}>
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
    <Box mt={6} display={"flex"} alignContent='center' justifyContent={'center'}>


      <Card elevation={4} >
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            Nome da atividade
          </Typography>
          <Typography display={'flex'} justifyContent={'space-between'} alignItems={'center'} gutterBottom variant="h5" component="div">
            {atividade.title}
            <Button variant='contained' color='error' onClick={() => handleOpen('delDiag')}>
              <Delete />
            </Button>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Descrição da atividade
          </Typography>
          <Typography mb={4} variant="h6" color="text.secondary">
            {atividade.body}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Datas da atividade
          </Typography>
          <Typography mb={4} variant="h6" color="text.secondary">
            Inicio: {dayjs(atividade.dataInicio).format('DD/MM/YYYY')}
            <br />
            Fim: {dayjs(atividade.dataFim).format('DD/MM/YYYY')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Participantes:{atividade.participantes.length}
          </Typography>
          <BasicTable />
          <Box>
            <Button variant='contained' onClick={() => handleOpen('editDiag')}>Editar Atividade</Button>
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

            <Box >
              <AddParticipantes id={id} atividade={atividade} handleClose={handleClose} getAtividade={getAtividade} />
            </Box>
          </DialogContent>
        </Dialog>

        <Dialog
          open={dialog.delDiag}
          onClose={() => handleOpen('delDiag')}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
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
        </Dialog>
      </Card>
    </Box>
  )
}

export default Atividade