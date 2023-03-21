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
import Home from "./components/Home";

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
          <Route path="lista-curso" element={<ListaCursos />} />
          <Route path="cria-curso" element={<GravaCursos />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
