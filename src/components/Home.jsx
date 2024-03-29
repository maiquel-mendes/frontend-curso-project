import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import ListAltIcon from '@mui/icons-material/ListAlt';
import HomeIcon from '@mui/icons-material/Home';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import LogoutIcon from '@mui/icons-material/Logout';
import Header from './Header';
import { Outlet, useNavigate } from 'react-router-dom';
import { AppBar, Drawer } from '@mui/material';
import StoreContext from '../context/StoreContext';

const drawerWidth = 240;

export default function Home({ token }) {
  const [open, setOpen] = React.useState(false);
  const { setToken } = React.useContext(StoreContext);

  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    console.log(token);
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleLogOut = () => {
    setToken(null);
    localStorage.removeItem('token');
    navigate('/login');
  };

  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));
  const drawerAnchor = window.innerWidth <= 900 ? 'bottom' : 'left';
  return (
    <Box
      sx={{
        display: 'flex',
      }}
    >
      <CssBaseline />
      <AppBar open={open}>
        <Header
          handleDrawerClose={handleDrawerClose}
          handleDrawerOpen={handleDrawerOpen}
          open={open}
          setOpen={setOpen}
          drawerWidth={drawerWidth}
          logout={handleLogOut}
        />
      </AppBar>
      <Drawer anchor={drawerAnchor} onClick={handleDrawerClose} open={open}>
        <List>
          {[
            { name: 'Home', link: '/', icon: <HomeIcon /> },
            {
              name: 'Criar atividade',
              link: 'cria-curso',
              icon: <NoteAddIcon />,
            },
            {
              name: 'Listar atividade',
              link: 'lista-curso',
              icon: <ListAltIcon />,
            },
            {
              name: 'Criar usuario',
              link: 'create-user',
              icon: <PersonAddIcon />,
            },
            {
              name: 'Listar usuarios',
              link: 'list-users',
              icon: <FolderSharedIcon />,
            },
          ].map((item) => (
            <ListItem key={item.name} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                onClick={() => navigate(item.link)}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.name}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
          <ListItem key={'15'} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
              onClick={handleLogOut}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary={'Sair'} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>

      <Box component='main' sx={{ flexGrow: 1, p: 0, m: 0 }} open={open}>
        <DrawerHeader />

        <Outlet />
      </Box>
    </Box>
  );
}
