import React from "react";
import AppLayout from "../../shared/layouts/App/App.layout";
import { Outlet, useLocation } from "react-router-dom";
import styled from "styled-components";
import Welcome from "../../assets/Welcome.jpeg";
import AuthComponent from "../../shared/components/AuthComponent";

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
    <AuthComponent>
      <AppLayout>
        {pathname === "/app" ? (
          <WelcomeScreen data-testid="welcome" />
        ) : (
          <Outlet data-testid="outlet" />
        )}
      </AppLayout>
    </AuthComponent>
  );
}

export default Dashboard;
