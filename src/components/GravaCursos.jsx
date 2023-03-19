import { Button } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import axios from "axios";
import dayjs from "dayjs";
import React from "react";
import "dayjs/locale/pt-br";
import { TextField } from "@mui/material";
import { Container } from "@mui/material";
import { Box } from "@mui/material";

const GravaCursos = () => {
  const [inputs, setInputs] = React.useState({
    title: "",
    body: "",
    dataInicio: dayjs(),
    dataFim: dayjs(),
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3000/cursos", {
        dadosCurso: inputs,
      });
      console.log(res.data);
      console.log(inputs);
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      <Box display={"flex"} justifyContent="center">
        <Box
          width={600}
          component={"form"}
          display="flex"
          flexDirection={"column"}
        >
          <TextField
            name="title"
            id="nome-curso"
            label="Nome do curso"
            value={inputs.title}
            onChange={handleChange}
            variant="outlined"
            sx={{ margin: 3 }}
          />
          <TextField
            name="body"
            id="desc-curso"
            label="Descrição do curso"
            value={inputs.body}
            onChange={handleChange}
            variant="outlined"
            sx={{ margin: 3 }}
          />
          {/* <DemoContainer components={["DatePicker", "DatePicker"]}> */}
          <DatePicker
            // name="dataInicio"
            label="Data Inicial"
            value={inputs.dataInicio}
            onChange={(e) => setInputs({ ...inputs, dataInicio: dayjs(e) })}
            sx={{ margin: 3 }}
          />
          <DatePicker
            // name="dataFim"
            label="Data Final"
            // views={["day", "month", "year"]}
            value={inputs.dataFim}
            sx={{ margin: 3 }}
            onChange={(e) => setInputs({ ...inputs, dataFim: dayjs(e) })}
          />
          <Button sx={{ p: 2, m: 3 }} variant="contained" onClick={onSubmit}>
            Gravar
          </Button>
          {/* </DemoContainer> */}
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default GravaCursos;
