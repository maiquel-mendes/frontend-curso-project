import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';

import React from 'react';
import api from '../api/configure-axios';

const initialState = {
  name: '',
  email: '',
  role: 'USER',
};

const CreateUser = () => {
  const [inputs, setInputs] = React.useState(initialState);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (inputs.email === '') {
      inputs.email = `${Date.now()}@email.com`;
    }

    try {
      const res = await api.post('/user', {
        usuarios: [inputs],
      });
      console.log(res.data);
      console.log(inputs);
      setInputs(initialState);
    } catch (e) {
      console.error(e.response.data);
    }
  };

  return (
    <>
      <Typography align='center' variant='h4'>
        Criar Usuário
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
            name='name'
            id='user-name'
            label='Nome'
            value={inputs.name}
            onChange={handleChange}
            variant='outlined'
            // sx={{ mb: 2 }}
          />
          <TextField
            name='email'
            id='user-email'
            label='Email'
            value={inputs.email}
            onChange={handleChange}
            variant='outlined'
            // sx={{ margin: 3 }}
          />

          <FormControl>
            <FormLabel id='demo-radio-buttons-group-label'>Tipo</FormLabel>
            <RadioGroup
              aria-labelledby='demo-radio-buttons-group-label'
              name='role'
              value={inputs.role}
              onChange={handleChange}
            >
              <FormControlLabel
                value='USER'
                control={<Radio />}
                label='Usuario'
              />
              <FormControlLabel
                value='ADMIN'
                control={<Radio />}
                label='Administrador'
              />
            </RadioGroup>
          </FormControl>

          <Button sx={{ p: 2, m: 3 }} variant='contained' onClick={onSubmit}>
            <SaveIcon />
            Gravar
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default CreateUser;
