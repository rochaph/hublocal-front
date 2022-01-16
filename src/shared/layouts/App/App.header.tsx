import React, { useLayoutEffect, useState } from "react";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import styled from "styled-components";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router";
import { ListItemButton, ListItemText } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const HeaderButton = styled(Button)`
  color: #fff;
  margin-left: 1em;
`;

function AppHeader() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [collapse, setCollapse] = useState(false);
  const data = [{ label: "teste" }];
  const buttons = [
    {
      label: "Empresas",
      route: "empresas",
    },
    {
      label: "Locais",
      route: "locais",
    },
    {
      label: "Responsáveis",
      route: "responsaveis",
    },
    {
      label: "Sair",
      route: "/",
    },
  ];

  useLayoutEffect(() => {
    function updateSize() {
      const shouldCollapse = window.innerWidth < 901;
      setCollapse(shouldCollapse);
    }

    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <header>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <HeaderButton
              style={{
                color: "#fff",
                textTransform: "none",
                marginRight: "2em",
              }}
              onClick={() => navigate("/app", { replace: true })}
            >
              <Typography variant="h6" component="div" sx={{}}>
                Hublocal
              </Typography>
            </HeaderButton>

            {collapse ? (
              <Box sx={{ bgcolor: open ? "rgba(71, 98, 130, 0.2)" : null }}>
                <ListItemButton
                  alignItems="center"
                  sx={{ justifyContent: "center" }}
                  onClick={() => setOpen(!open)}
                >
                  <MenuIcon />
                </ListItemButton>
              </Box>
            ) : (
              buttons.map(({ route, label }, key) => (
                <HeaderButton
                  key={key}
                  style={{ marginLeft: label === "Sair" ? "auto" : "none" }}
                  onClick={() => navigate(route, { replace: true })}
                >
                  {label}
                </HeaderButton>
              ))
            )}
          </Toolbar>

          {collapse &&
            open &&
            buttons.map(({ route, label }, key) => (
              <ListItemButton
                sx={{ mx: 2 }}
                key={key}
                onClick={() => {
                  navigate(route, { replace: true });
                  setOpen(false);
                }}
              >
                <ListItemText
                  primary={label}
                  primaryTypographyProps={{
                    fontSize: 14,
                    fontWeight: "medium",
                  }}
                />
              </ListItemButton>
            ))}
        </AppBar>
      </Box>
    </header>
  );
}

export default AppHeader;
