import { Alert, Autocomplete, Button, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import SaveIcon from '@mui/icons-material/Save';
import Snackbar from '@mui/material/Snackbar';

import api from '../api/configure-axios';
import dayjs from 'dayjs';
import React, { useContext, useState } from 'react';
import 'dayjs/locale/pt-br';
import { TextField } from '@mui/material';
import { Box } from '@mui/material';
import { UserContext } from '../context/UserContext';

dayjs.locale('pt-br');
const initialState = {
  title: '',
  body: '',
  dataInicio: dayjs(),
  dataFim: dayjs(),
  participantes: [],
};

const GravaCursos = () => {
  const [inputs, setInputs] = React.useState(initialState);
  const [open, setOpen] = useState(false);

  const { operadores } = useContext(UserContext);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post(`/cursos`, {
        dadosCurso: inputs,
      });
      //      console.log(inputs);
      res && setInputs(initialState);

      setOpen(true);
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='pt-br'>
      <Typography align='center' variant='h4'>
        Criar uma nova atividade
      </Typography>
      <Box display={'flex'} justifyContent='center'>
        <Box
          width={1}
          component={'form'}
          display='flex'
          flexDirection={'column'}
          gap={2}
          marginTop={1}
          maxWidth={900}
        >
          <TextField
            name='title'
            id='nome-curso'
            label='Nome da atividade'
            value={inputs.title}
            onChange={handleChange}
            variant='outlined'
            // sx={{ mb: 2 }}
          />
          <TextField
            name='body'
            id='desc-curso'
            label='Descrição da atividade'
            value={inputs.body}
            onChange={handleChange}
            variant='outlined'
            // sx={{ margin: 3 }}
          />
          <DatePicker
            label='Data Inicial'
            value={inputs.dataInicio}
            onChange={(e) => setInputs({ ...inputs, dataInicio: dayjs(e) })}
            // sx={{ margin: 3 }}
          />
          <DatePicker
            label='Data Final'
            value={inputs.dataFim}
            // sx={{ margin: 3 }}
            onChange={(e) => setInputs({ ...inputs, dataFim: dayjs(e) })}
          />
          <Autocomplete
            multiple
            value={inputs.participantes}
            onChange={(e, value) => {
              console.log(inputs.participantes);
              setInputs({ ...inputs, participantes: value });
            }}
            id='tags-outlined'
            options={operadores}
            getOptionLabel={(option) => option?.name}
            defaultValue={[]}
            filterSelectedOptions
            renderInput={(params) => (
              <TextField
                {...params}
                label='Incluir participantes'
                placeholder='Participantes'
              />
            )}
          />
          <Button sx={{ p: 2, m: 3 }} variant='contained' onClick={onSubmit}>
            <SaveIcon />
            Gravar
          </Button>
          <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={() => setOpen(false)}
          >
            <Alert severity='success' sx={{ width: '100%' }}>
              Atividade gravada com sucesso!
            </Alert>
          </Snackbar>
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default GravaCursos;
