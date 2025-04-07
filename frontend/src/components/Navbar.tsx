import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const isActive = (route: string) => location.pathname === route;

  const toggleDrawer = (open: boolean) => () => {
    setOpen(open);
  };

  const handleNavigation = (route: string) => {
    navigate(route);
    setOpen(false);
  };

  const navItems = [
    {
      label: "Início",
      route: "/",
      icon: <HomeIcon />,
      desktopIcon: <HomeIcon sx={{ marginRight: 1 }} />,
    },
  ];

  return (
    <>
      <AppBar position="sticky">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {isMobile && (
            <IconButton color="inherit" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
          )}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
            {navItems.map((item) => (
              <Button
                key={item.route}
                onClick={() => handleNavigation(item.route)}
                startIcon={item.desktopIcon}
                sx={{
                  color: "white",
                  backgroundColor: isActive(item.route)
                    ? "rgba(255,255,255,0.2)"
                    : "transparent",
                  borderRadius: 2,
                  paddingX: 2,
                  transition: "all 0.2s",
                  "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
        >
          <List>
            {navItems.map((item) => (
              <ListItem key={item.route} disablePadding>
                <ListItemButton onClick={() => handleNavigation(item.route)}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
