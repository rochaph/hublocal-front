import React from "react";
import AppLayout from "../../shared/layouts/App/App.layout";
import { Outlet, useLocation } from "react-router-dom";
import styled from "styled-components";
import Welcome from "../../assets/Welcome.jpeg";

const WelcomeScreen = styled.div`
  display: flex;
  height: 100%;
  width: auto;
  background: url(${Welcome});
  background-size: cover;
`;

function Dashboard() {
  const { pathname } = useLocation();
  return (
    <AppLayout>
      {pathname === "/app" ? (
        <WelcomeScreen data-testid="welcome" />
      ) : (
        <Outlet data-testid="outlet" />
      )}
    </AppLayout>
  );
}

export default Dashboard;
