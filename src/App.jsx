import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import GravaCursos from './components/GravaCursos';
import ListaCursos from './components/ListaCursos';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Atividade from './components/Atividade';
import Index from './components/Index';
import CreateUser from './components/CreateUser';
import Users from './components/Users';
import { UserProvider } from './context/UserContext';
import { LoginPage } from './components/LoginPage';
import StoreProvider from './context/StoreProvider';
import PrivateRouter from './routes/private/Private';

export const ColorModeContext = React.createContext();
export default function App() {
  const [mode, setMode] = React.useState('dark');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'dark' ? 'light' : 'dark'));
      },
    }),
    []
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <StoreProvider>
          <UserProvider>
            <CssBaseline />
            <Routes>
              <Route path='/login' element={<LoginPage />} />
              <Route element={<PrivateRouter />}>
                <Route path='/' element={<Home />}>
                  <Route
                    path='/lista-curso/atividade/:id'
                    element={<Atividade />}
                  />
                  <Route path='lista-curso' element={<ListaCursos />} />
                  <Route path='cria-curso' element={<GravaCursos />} />
                  <Route index element={<Index />} />
                  <Route path='create-user' element={<CreateUser />} />
                  <Route path='list-user' element={<Users />} />
                </Route>
              </Route>
            </Routes>
          </UserProvider>
        </StoreProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
