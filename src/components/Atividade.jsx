import { Backdrop, Box, Card, CardActionArea, CardContent, CircularProgress, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Atividade = () => {
  const { id } = useParams()
  const [atividade, setAtividade] = useState({})
  const [loading, setLoading] = useState(true);

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

  function BasicTable() {
    return (
      <TableContainer component={Box}>
        <Table sx={{ minWidth: { xs: 250, md: 600 } }} size='small' aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell align="center">Nome de guerra</TableCell>
              <TableCell align="center">Instituição</TableCell>
              <TableCell align="right">Condição</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {atividade.participantes.map((row, index) => (
              <TableRow
                key={row[index]}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.user.name}
                </TableCell>
                <TableCell align="center">{row.situacao}</TableCell>
                <TableCell align="right">{row.situacao}</TableCell>
                <TableCell align="right">{row.situacao}</TableCell>

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
        <CardActionArea>
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
              Participantes:{atividade.participantes.length}
            </Typography>
            <BasicTable />
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  )
}

export default Atividade