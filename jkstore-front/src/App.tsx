import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import OAuth2Callback from "./pages/oauth2/OAuth2Callback";
import { Toaster } from "react-hot-toast";
import "./App.module.css";
import { CreateProductForm } from "./pages/produtos/cadastrarProduto";
import { PrivateRoute } from "./components/PrivateRoute";
import { CartProvider } from "./contexts/CartContext";
import MiniCart from "./components/miniCart/MiniCart";

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Toaster />
        <MiniCart />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/oauth2/callback" element={<OAuth2Callback />} />
          <Route path="/cadastrarNovoProduto" element={
            <PrivateRoute requireAdmin>
              <CreateProductForm />
            </PrivateRoute>
          } />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App
