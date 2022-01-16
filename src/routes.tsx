import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./views/homepage/Home";
import Login from "./views/homepage/Login";
import Signup from "./views/homepage/Signup";
import Dashboard from "./views/dashboard/Dashboard";
import Responsavel from "./views/responsavel/Responsavel";
import Local from "./views/local/Local";
import Empresa from "./views/empresa/Empresa";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>
      <Route path="/app" element={<Dashboard />}>
        <Route path="empresas" element={<Empresa />} />
        <Route path="locais" element={<Local />} />
        <Route path="responsaveis" element={<Responsavel />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
