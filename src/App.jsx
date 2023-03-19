import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import "./App.css";
import { Box, Button } from "@mui/material";
import GravaCursos from "./components/GravaCursos";
import ListaCursos from "./components/ListaCursos";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";

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
        <Route path="/" element={<Header mode={mode} setMode={setMode} />}>
          <Route path="lista-curso" element={<ListaCursos />} />
          <Route path="cria-curso" element={<GravaCursos />} />
        </Route>
      </Routes>
      <Container>
        <Box></Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
