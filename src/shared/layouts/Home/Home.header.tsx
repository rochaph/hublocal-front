import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import { useLocation, useNavigate } from "react-router-dom";

function HomeHeader() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <header>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 1 }}
              onClick={() => navigate("/")}
            >
              <HomeIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Hublocal
            </Typography>
            {pathname !== "/login" && (
              <Button sx={{ color: "#fff" }} onClick={() => navigate("/login")}>
                Login
              </Button>
            )}
            {pathname !== "/signup" && (
              <Button
                sx={{ color: "#fff" }}
                onClick={() => navigate("/signup")}
              >
                Cadastrar
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </header>
  );
}

export default HomeHeader;
