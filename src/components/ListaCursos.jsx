import React from 'react';
import api from '../api/configure-axios';
import ListAltIcon from '@mui/icons-material/ListAlt';
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
} from '@mui/material';
import { Link } from 'react-router-dom';

const ListaCursos = () => {
  const [result, setResult] = React.useState([]);
  const [year, setYear] = React.useState(0);
  const [isLoading, setisLoading] = React.useState(false);

  async function getAtividades() {
    setisLoading(true);

    const data = await api
      .get('/cursos')
      .then((dados) => {
        setisLoading(false);
        return dados.data;
      })
      .catch((err) => {
        console.log(err);
        setisLoading(false);
      });
    setResult(data);
  }

  React.useEffect(() => {
    getAtividades();
    // console.log(result);
  }, []);

  function BasicCard({ row }) {
    return (
      <>
        <Card
          key={row.id}
          elevation={4} /*sx={{ minWidth: 300, maxWidth: 300 }}*/
        >
          <CardContent>
            <Typography variant='h6' component='div'>
              {row.title}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color='text.secondary'>
              {row.body}
            </Typography>
            <Typography variant='body2'>
              Data {row.dataInicio}
              <br />
            </Typography>
          </CardContent>
          <CardActions>
            <Link
              to={`/lista-curso/atividade/${row.id}`}
              style={{ textDecoration: 'none' }}
            >
              <Button size='small'>Mais informações</Button>
            </Link>
          </CardActions>
        </Card>
      </>
    );
  }

  function YearButton() {
    let arr = result.map((item) => item.ano);
    const set = new Set(arr);
    const nodup = Array.from(set);
    return (
      <>
        {nodup.map((item, index) => (
          <Box m={2} key={index} component='div'>
            <Button
              variant='contained'
              startIcon={<ListAltIcon />}
              onClick={() => setYear(item)}
            >
              {item}
            </Button>
          </Box>
        ))}
      </>
    );
  }

  return (
    <Box m={2}>
      <Box m={2} display={'flex'} justifyContent='center'>
        <Typography variant='h4' component='div' display={'flex'}>
          Lista de Atividades
        </Typography>

        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
          onClick={() => setisLoading(false)}
        >
          <CircularProgress color='inherit' />
        </Backdrop>
      </Box>

      <Box>
        <Typography variant='h5' component='div' display={'flex'}>
          Total de atividades:{' '}
          {result.filter((item) => item.ano === year).length}
        </Typography>
        <YearButton />
        <Grid
          container
          spacing={{ xs: 2, md: 2 }}
          columns={{ xs: 2, sm: 8, md: 12 }}
        >
          {result
            .filter((item) => item.ano === year)
            .map((row) => (
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
