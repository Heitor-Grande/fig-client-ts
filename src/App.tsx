import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from "./pages/Login/Login";
import MainPage from "./pages/main";
import Principal from "./pages/menuPrincipal/principal";
import ControleDeCaixa from "./pages/menuPrincipal/menu/controleCaixa/controleDeCaixa";
import FormularioControleCaixa from "./pages/menuPrincipal/menu/controleCaixa/formularioControleCaixa";
import MeusArquivos from "./pages/menuPrincipal/menu/meusArquivos/meusArquivos";
import MinhaConta from "./pages/menuPrincipal/menu/minhaConta/minhaConta";

function App() {
  return (
    <>
      <ToastContainer
        autoClose={2000}
      />
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<MainPage />}>
            <Route path="/home/principal" element={<Principal />} />
            <Route path="/home/controle/caixa" element={<ControleDeCaixa />} />
            <Route path="/home/controle/caixa/formulario/:id/:acao" element={<FormularioControleCaixa />} />
            <Route path="/home/meus/arquivos" element={<MeusArquivos />} />
            <Route path="/home/minha/conta" element={<MinhaConta />} />
          </Route>
          <Route path="/" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
