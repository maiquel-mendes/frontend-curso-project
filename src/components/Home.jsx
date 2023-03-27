import * as React from "react";
import {
  styled,
  useTheme,
} from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import ListAltIcon from '@mui/icons-material/ListAlt';
import HomeIcon from '@mui/icons-material/Home';
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Header from "./Header";
import { Outlet, useNavigate } from "react-router-dom";
import { AppBar, Drawer } from "@mui/material";

const drawerWidth = 240;

export default function Home({ mode, setMode }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    console.log(teste);
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));
  const teste = window.innerWidth <= 900 ? "bottom" : "left";
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar open={open}>
        <Header
          mode={mode}
          setMode={setMode}
          handleDrawerClose={handleDrawerClose}
          handleDrawerOpen={handleDrawerOpen}
          open={open}
          setOpen={setOpen}
          drawerWidth={drawerWidth}
        />
      </AppBar>
      <Drawer anchor={teste} onClick={handleDrawerClose} open={open}>
        <List>
          {[
            { name: "Home", link: "/", icon: (<HomeIcon />) },
            { name: "Criar atividade", link: "cria-curso", icon: (<NoteAddIcon />) },
            { name: "Listar atividade", link: "lista-curso", icon: (<ListAltIcon />) },
          ].map((item, index) => (
            <ListItem key={item.name} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
                onClick={() => navigate(item.link)}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
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
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3, m: 3 }} open={open}>
        <DrawerHeader />
        <Typography align="center" variant="h4">
          Abra o menu para visualizar as opções disponiveis
        </Typography>
        <Outlet />
      </Box>
    </Box>
  );
}
