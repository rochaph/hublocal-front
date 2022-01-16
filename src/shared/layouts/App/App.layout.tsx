import React, { ReactNode } from "react";
import Footer from "../Footer.layout";
import Header from "./App.header";

function AppLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default AppLayout;
