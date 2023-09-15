import * as React from "react";
import { ThemeProvider, createTheme, useTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import GravaCursos from "./components/GravaCursos";
import ListaCursos from "./components/ListaCursos";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Atividade from "./components/Atividade";
import Index from "./components/Index";
import CreateUser from "./components/CreateUser";
import Users from "./components/Users";
import { UserProvider } from "./context/UserContext";

export const ColorModeContext = React.createContext({ toggleColorMode: () => { } });

export default function App() {
  const [mode, setMode] = React.useState('light');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  )

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <UserProvider>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<Home />}>
              <Route index element={<Index />} />
              <Route path="/lista-curso/atividade/:id" element={<Atividade />} />
              <Route path="lista-curso" element={<ListaCursos />} />
              <Route path="cria-curso" element={<GravaCursos />} />
              <Route path="create-user" element={<CreateUser />} />
              <Route path="list-user" element={<Users />} />
            </Route>
          </Routes>
        </UserProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );

}

