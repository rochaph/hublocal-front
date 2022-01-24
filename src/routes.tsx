import React from "react";
import { hot } from "react-hot-loader/root";
import { Route, Routes } from "react-router-dom";
import Home from "./views/homepage/Home";
import Login from "./views/homepage/Login";
import Signup from "./views/homepage/Signup";
import Dashboard from "./views/dashboard/Dashboard";
import Local from "./views/local/Local";
import Empresa from "./views/empresa/Empresa";
import CreateLocalForm from "./views/local/CreateLocalForm";
import UpdateLocalForm from "./views/local/UpdateLocalForm";
import CreateEmpresaForm from "./views/empresa/CreateEmpresaForm";
import NotFound from "./views/NotFound/NotFound";
import UpdateEmpresaForm from "./views/empresa/UpdateEmpresaForm";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>
      <Route path="/app" element={<Dashboard />}>
        <Route path="empresas" element={<Empresa />} />
        <Route path="empresas/cadastro" element={<CreateEmpresaForm />} />
        <Route path="empresas/atualizar/:id" element={<UpdateEmpresaForm />} />
        <Route path="locais" element={<Local />} />
        <Route path="locais/cadastro" element={<CreateLocalForm />} />
        <Route path="locais/atualizar/:id" element={<UpdateLocalForm />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default hot(AppRoutes);
