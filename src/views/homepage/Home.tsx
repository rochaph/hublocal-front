import React from "react";
import HomeLayout from "../../shared/layouts/Home/Home.layout";
import styled from "styled-components";
import Background from "../../assets/Background.svg";
import { Outlet, useLocation } from "react-router-dom";

const HomePage = styled.div`
  height: 100%;
  width: 100%;
  background: url(${Background}) center no-repeat;
  background-size: cover;
`;

function Home() {
  const { pathname } = useLocation();
  return (
    <HomeLayout>{pathname === "/" ? <HomePage /> : <Outlet />}</HomeLayout>
  );
}

export default Home;
