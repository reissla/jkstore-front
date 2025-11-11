import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { Toaster } from "react-hot-toast";
import "./App.module.css";
import { CreateProductForm } from "./pages/produtos/cadastrarProduto";

function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cadastrarNovoProduto" element={<CreateProductForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
