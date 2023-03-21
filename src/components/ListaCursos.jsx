import React from "react";
import axios from "axios";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
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
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect } from "react";

const ListaCursos = () => {
  const [result, setResult] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  async function pega() {
    setisLoading(true);
    const data = await axios
      .get("https://api-curso-project.vercel.app/cursos")
      // .get("http://192.168.15.40:3000/cursos")
      .then((dados) => {
        setisLoading(false);
        return dados.data;
      });

    setResult(data);
    console.log(data);
  }

  const teste = () => {
    alert("tetsando");
  };

  //   useEffect(() => {
  //     pega();
  //   }, []);

  function BasicCard({ row }) {
    return (
      <>
        {/* {result.map((row) => ( */}
        <Card key={row.title} sx={{ minWidth: 300, maxWidth: 300 }}>
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
              {row["participantes"].map((item) => ` ${item.user.name},`)}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
        {/* ))} */}
      </>
    );
  }

  return (
    <Box>
      <Box m={2} display={"flex"} justifyContent="center">
        <LoadingButton
          loading={isLoading}
          loadingPosition="start"
          startIcon={<SaveIcon />}
          variant="outlined"
          onClick={pega}
        >
          Listar Cursos
        </LoadingButton>
      </Box>
      {/* <TableContainer
        sx={{ display: result.length === 0 ? "none" : "" }}
        component={Paper}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nome do curso</TableCell>
              <TableCell align="center">descrição</TableCell>
              <TableCell align="right">Dias&nbsp;</TableCell>
              <TableCell align="right">data inicio</TableCell>
              <TableCell align="left">Data fim</TableCell>
              <TableCell align="left">Participantes</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {result.map((row) => (
              <TableRow
                key={row.title}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.title}
                </TableCell>
                <TableCell align="center">{row.body}</TableCell>
                <TableCell align="right">{row.dias}</TableCell>
                <TableCell align="right">{row.dataInicio}</TableCell>
                <TableCell align="right">{row.dataFim}</TableCell>
                <TableCell size="small" align="left">
                  {row["participantes"].map((item) => ` ${item.user.name},`)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> */}
      <Box>
        <Grid
          container
          spacing={{ xs: 2, md: 2 }}
          columns={{ xs: 2, sm: 8, md: 12 }}
        >
          {result.map((row) => (
            <Grid item xs={4} sm={4} md={4} key={row.title}>
              <BasicCard row={row} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default ListaCursos;
