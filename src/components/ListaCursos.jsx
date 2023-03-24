import React from "react";
import axios from "axios";
import LoadingButton from "@mui/lab/LoadingButton";
import ListAltIcon from '@mui/icons-material/ListAlt';
import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";


const ListaCursos = () => {
  const [result, setResult] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  async function getAtividades() {
    setisLoading(true);
    const data = await axios
      // .get("https://api-curso-project.vercel.app/cursos")
      .get("http://192.168.15.40:3000/cursos")
      .then((dados) => {
        setisLoading(false);
        return dados.data;
      });

    setResult(data);
  }

  

  function BasicCard({ row }) {
    return (
      <>
        <Card key={row.id} /*sx={{ minWidth: 300, maxWidth: 300 }}*/>
          <CardContent>
            <Typography variant="h5" component="div">
              {row.title}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {row.body}
            </Typography>
            <Typography variant="body2">
              Inicio {row.dataInicio}
              <br />
              Fim {row.dataFim}
              <br />
              <br />
              Participantes:
              <br/>
              {row["participantes"].map((item) => ` ${item.user.name},`)}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Mais informações</Button>
          </CardActions>
        </Card>
      </>
    );
  }

  return (
    <Box>
      <Box m={2} display={"flex"} justifyContent="center">
        <LoadingButton
          loading={isLoading}
          loadingPosition="start"
          startIcon={<ListAltIcon />}
          variant="outlined"
          onClick={getAtividades}
        >
          Listar atividades
        </LoadingButton>
      </Box>
     
      <Box>
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
