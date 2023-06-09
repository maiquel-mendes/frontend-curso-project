import {
  Backdrop, Box, Button, Card, CardActionArea, CardContent, CircularProgress,
  Container, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography
} from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AddParticipantes from './AddParticipantes';
import { Delete } from '@mui/icons-material';

const Atividade = () => {
  const { id } = useParams()
  const [atividade, setAtividade] = useState({})
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getAtividade = async () => {
    setLoading(true)
    try {
      const res = await axios.get(
        process.env.NODE_ENV === "development"
          ? `http://192.168.15.40:3000/api/cursos/${id}`
          : `https://api-curso-project.vercel.app/api/cursos/${id}`
      );
      setAtividade(res.data)
      setLoading(false)
    } catch (e) {
      alert(e.message);
      return null
    }
  }
  const deleteParticipante = async (id) => {
    try {
      const res = await axios.delete(
        process.env.NODE_ENV === "development"
          ? `http://192.168.15.40:3000/api/cursos/${id}`
          : `https://api-curso-project.vercel.app/api/cursos/${id}`
      );
      console.log(res);
      getAtividade()
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
                  <Button onClick={() => deleteParticipante(row.id)}>
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
    <Box mt={6} display={"flex"} alignContent='center' justifyContent={'center'}>


      <Card elevation={4} sx={{ maxWidth: 800 }}>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            Nome da atividade
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            {atividade.title}
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
            Inicio: {atividade.dataInicio}
            <br />
            Fim: {atividade.dataFim}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Participantes:{atividade.participantes.length}
          </Typography>
          <BasicTable />
        </CardContent>
        <Button onClick={handleOpen}>Cadastrar participantes</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <AddParticipantes id={id} atividade={atividade} setOpen={setOpen} getAtividade={getAtividade} />
          </Box>
        </Modal>
      </Card>
    </Box>
  )
}

export default Atividade