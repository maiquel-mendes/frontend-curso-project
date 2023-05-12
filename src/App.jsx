import React, { useEffect, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import GravaCursos from "./components/GravaCursos";
import ListaCursos from "./components/ListaCursos";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Atividade from "./components/Atividade";
import Index from "./components/Index";
import CreateUser from "./components/CreateUser";
import Users from "./components/Users";

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
          <Route index element={<Index />} />
          <Route path="/lista-curso/atividade/:id" element={<Atividade />} />
          <Route path="lista-curso" element={<ListaCursos />} />
          <Route path="cria-curso" element={<GravaCursos />} />
          <Route path="create-user" element={<CreateUser />} />
          <Route path="list-user" element={<Users />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
