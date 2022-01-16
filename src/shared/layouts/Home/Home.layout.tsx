import React, { ReactNode } from "react";
import Footer from "../Footer.layout";
import Header from "./Home.header";
import styled from "styled-components";

const StyledMain = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
`;

function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <StyledMain>{children}</StyledMain>
      <Footer />
    </>
  );
}

export default HomeLayout;
