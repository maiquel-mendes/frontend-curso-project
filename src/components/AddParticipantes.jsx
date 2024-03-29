import {
  Autocomplete,
  Box,
  Button,
  TextField,
  Typography,
} from '@mui/material';
import api from '../api/configure-axios';

import React from 'react';
import { UserContext } from '../context/UserContext';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';

dayjs.locale('pt-br');
const AddParticipantes = ({ id, atividade, handleClose, getAtividade }) => {
  const initialState = {
    title: atividade.title,
    body: atividade.body,
    dataInicio: dayjs(atividade.dataInicio),
    dataFim: dayjs(atividade.dataFim),
    participantes: [],
  };
  const [inputs, setInputs] = React.useState(initialState);

  const { operadores } = React.useContext(UserContext);

  const participantesCadastrados = atividade.participantes.map(
    (item) => item.user.name
  );

  const operadoresFilter = operadores.filter((item) =>
    participantesCadastrados.includes(item.name) ? false : true
  );

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.patch(`/cursos/${id}`, {
        dadosCurso: inputs,
      });
      res && console.log(res);
      handleClose('editDiag'); // chama a função pra fechar o dialago de edição
      getAtividade();
    } catch (e) {
      console.warn(e.response.data);
    }
  };

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='pt-br'>
        <Typography align='center' variant='h4'>
          Editar atividade
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
            />
            <TextField
              inputMode='text'
              name='body'
              id='desc-curso'
              label='Descrição da atividade'
              value={inputs.body}
              onChange={handleChange}
              variant='outlined'
            />
            <DatePicker
              label='Data Inicial'
              value={inputs.dataInicio}
              onChange={(e) => setInputs({ ...inputs, dataInicio: dayjs(e) })}
            />
            <DatePicker
              label='Data Final'
              value={inputs.dataFim}
              onChange={(e) => setInputs({ ...inputs, dataFim: dayjs(e) })}
            />
          </Box>
        </Box>
        <Autocomplete
          multiple
          value={inputs.participantes}
          onChange={(e, value) => {
            setInputs({ ...inputs, participantes: value });
          }}
          id='tags-outlined'
          options={operadoresFilter}
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
        <Box>
          <Button onClick={onSubmit}>Gravar</Button>
        </Box>
      </LocalizationProvider>
    </div>
  );
};

export default AddParticipantes;
