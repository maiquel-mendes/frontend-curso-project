import React, { useEffect, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import GravaCursos from "./components/GravaCursos";
import ListaCursos from "./components/ListaCursos";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Atividade from "./components/Atividade";

function App() {
  const [mode, setMode] = useState("dark");
  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Home mode={mode} setMode={setMode} />}>
          <Route path="/lista-curso/atividade/:id" element={<Atividade/>} />
          <Route path="lista-curso" element={<ListaCursos />} />
          <Route path="cria-curso" element={<GravaCursos />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
