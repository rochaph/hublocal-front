import React from "react";
import HomeLayout from "../../shared/layouts/Home/Home.layout";
import { useAppSelector } from "../../store/hooks";
import AppLayout from "../../shared/layouts/App/App.layout";
import Box from "@mui/material/Box";
import styled from "styled-components";

const BoxNotFound = styled(Box)`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

function NotFound() {
  const isAuthenticated = useAppSelector((sel) => sel.auth.isLoggedIn);
  const textNotFound = "Rota não existe.";

  return isAuthenticated ? (
    <AppLayout>
      <BoxNotFound sx={{}}>{textNotFound}</BoxNotFound>
    </AppLayout>
  ) : (
    <HomeLayout>{textNotFound}</HomeLayout>
  );
}

export default NotFound;
