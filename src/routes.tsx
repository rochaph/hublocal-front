import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./views/homepage/Home";
import Login from "./views/homepage/Login";
import Signup from "./views/homepage/Signup";
import Dashboard from "./views/dashboard/Dashboard";
import Responsavel from "./views/responsavel/Responsavel";
import Local from "./views/local/Local";
import Empresa from "./views/empresa/Empresa";
import EmpresaForm from "./views/empresa/EmpresaForm";
import LocalForm from "./views/local/LocalForm";
import ResponsavelForm from "./views/responsavel/ResponsavelForm";

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
        <Route path="empresas/cadastro" element={<EmpresaForm />} />
        <Route path="locais/cadastro" element={<LocalForm />} />
        <Route path="responsaveis/cadastro" element={<ResponsavelForm />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
