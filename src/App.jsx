import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Purchases from "./pages/Purchases";
import Product from "./pages/Product";
import Header from "./components/layout/Header";
import NotFound from "./pages/NotFound";
import ProtectedAuth from "./components/auth/ProtectedAuth";
import Cart from "./components/cart/Cart";
import Footer from "./components/layout/Footer";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <section className="grid font-['Yantramanav'] grid-rows-[auto_1fr] min-h-screen">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route element={<ProtectedAuth />}>
          <Route path="/purchases" element={<Purchases />} />
        </Route>
        <Route path="products/:id" element={<Product />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Cart />
      <Footer />
    </section>
  );
}

export default App;
