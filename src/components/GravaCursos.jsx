import { Autocomplete, Button, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import SaveIcon from "@mui/icons-material/Save";


import axios from "axios";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import "dayjs/locale/pt-br";
import { TextField } from "@mui/material";
import { Container } from "@mui/material";
import { Box } from "@mui/material";

const initialState = {
  title: "",
  body: "",
  dataInicio: dayjs(),
  dataFim: dayjs(),
  participantes: [],
}

const GravaCursos = () => {
  const [inputs, setInputs] = React.useState(initialState);
  const [operadores, setOperadores] = useState([])

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        process.env.NODE_ENV === "development"
          ? `${import.meta.env.VITE_MYLOCALHOST}:3000/api/cursos`
          : "https://api-curso-project.vercel.app/api/cursos",
        {
          dadosCurso: inputs,
        }
      );
      //      console.log(inputs);
      setInputs(initialState)
    } catch (e) {
      alert(e.message);
    }
  };

  async function getUsers() {
    try {
      const res = await axios.get(
        process.env.NODE_ENV === "development" ? `${import.meta.env.VITE_MYLOCALHOST}:3000/api/user` : "https://api-curso-project.vercel.app/api/user"
      );
      //console.log(res.data);
      setOperadores(res.data)
    } catch (e) {
      alert(e.message);
    }

  };

  useEffect(() => {

    getUsers()
  }
    , [])

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      <Typography align="center" variant="h4">
        Criar uma nova atividade
      </Typography>
      <Box display={"flex"} justifyContent="center">
        <Box
          width={1}
          component={"form"}
          display="flex"
          flexDirection={"column"}
          gap={2}
          marginTop={1}
          maxWidth={900}
        >
          <TextField
            name="title"
            id="nome-curso"
            label="Nome da atividade"
            value={inputs.title}
            onChange={handleChange}
            variant="outlined"
          // sx={{ mb: 2 }}
          />
          <TextField
            name="body"
            id="desc-curso"
            label="Descrição da atividade"
            value={inputs.body}
            onChange={handleChange}
            variant="outlined"
          // sx={{ margin: 3 }}
          />
          <DatePicker
            label="Data Inicial"
            value={inputs.dataInicio}
            onChange={(e) => setInputs({ ...inputs, dataInicio: dayjs(e) })}
          // sx={{ margin: 3 }}
          />
          <DatePicker
            label="Data Final"
            value={inputs.dataFim}
            // sx={{ margin: 3 }}
            onChange={(e) => setInputs({ ...inputs, dataFim: dayjs(e) })}
          />
          <Autocomplete
            multiple
            value={inputs.participantes}
            onChange={(e, value) => {
              console.log(inputs.participantes);
              setInputs({ ...inputs, participantes: value })
            }}
            id="tags-outlined"
            options={operadores}
            getOptionLabel={(option) => option?.name}
            defaultValue={[]}
            filterSelectedOptions
            renderInput={(params) => (
              <TextField
                {...params}
                label="Incluir participantes"
                placeholder="Participantes"
              />
            )}
          />
          <Button sx={{ p: 2, m: 3 }} variant="contained" onClick={onSubmit}>
            <SaveIcon />
            Gravar
          </Button>
        </Box>
      </Box>
    </LocalizationProvider>
  );
};






export default GravaCursos;
