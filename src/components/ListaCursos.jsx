import React, { useEffect } from "react";
import axios from "axios";
import ListAltIcon from '@mui/icons-material/ListAlt';
import { useState } from "react";
import {
  Backdrop,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";


const ListaCursos = () => {
  const [result, setResult] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  async function getAtividades() {
    setisLoading(true);

    const data = await axios
      .get(process.env.NODE_ENV === "development"
        ? `${import.meta.env.VITE_MYLOCALHOST}:3000/api/cursos/`
        : "https://api-curso-project.vercel.app/api/cursos"
      )
      .then((dados) => {
        setisLoading(false);
        return dados.data;
      }).catch((err) => {
        console.log(err);
        setisLoading(false)
      })
    setResult(data);

  }

  useEffect(() => {
    getAtividades()
  }, [])


  function BasicCard({ row }) {
    return (
      <>
        <Card key={row.id} elevation={4} /*sx={{ minWidth: 300, maxWidth: 300 }}*/>
          <CardContent>
            <Typography variant="h6" component="div" >
              {row.title}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary" >
              {row.body}
            </Typography>
            <Typography variant="body2" >
              Data {row.dataInicio}
              <br />


            </Typography>
          </CardContent>
          <CardActions>
            <Link to={`/lista-curso/atividade/${row.id}`} style={{ textDecoration: 'none' }}>
              <Button size="small">Mais informações</Button>
            </Link>
          </CardActions>
        </Card>
      </>
    );
  }

  return (
    <Box>
      <Box m={2} display={"flex"} justifyContent="center">

        <Button
          variant="contained"
          startIcon={<ListAltIcon />}
          onClick={getAtividades}
        >Listar Atividades
        </Button>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
          onClick={() => setisLoading(false)}
        >
          <CircularProgress color="inherit" />
        </Backdrop>

      </Box>

      <Box>
        <Typography variant="h5" component="div" display={'flex'}>
          Total de atividades: {result.length}
        </Typography>
        <Grid
          container
          spacing={{ xs: 2, md: 2 }}
          columns={{ xs: 2, sm: 8, md: 12 }}
        >
          {result.map((row) => (
            <Grid item xs={4} sm={4} md={4} key={row.id}>
              <BasicCard row={row} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default ListaCursos;
