import React, { useEffect } from "react";
import { hot } from "react-hot-loader/root";
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
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router";

function AppRoutes() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const isAuthenticated =
      token !== null &&
      (jwtDecode(token) as { exp: number }).exp > Date.now() / 1000;

    if (!isAuthenticated) navigate("/");
  }, []);
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
        <Route
          path="empresas/cadastro"
          element={<EmpresaForm mode={"create"} />}
        />
        <Route path="locais/cadastro" element={<LocalForm mode={"create"} />} />
        <Route
          path="responsaveis/cadastro"
          element={<ResponsavelForm mode={"create"} />}
        />
        <Route
          path="empresas/atualizar"
          element={<EmpresaForm mode={"update"} />}
        />
        <Route
          path="locais/atualizar"
          element={<LocalForm mode={"update"} />}
        />
        <Route
          path="responsaveis/atualizar"
          element={<ResponsavelForm mode={"update"} />}
        />
      </Route>
    </Routes>
  );
}

export default hot(AppRoutes);
