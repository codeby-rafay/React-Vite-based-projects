import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CartDisplay from "./components/CartDisplay";
import Home from "./pages/Home";
import Products from "./pages/Products";
import SingleProduct from "./pages/SingleProduct";
import Categories from "./pages/Categories";
import CategoryProducts from "./pages/Categoryproducts";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Saved from "./pages/Saved";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-[#fafaf8]">
      <Navbar />
      <main className="grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<SingleProduct />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/category/:slug" element={<CategoryProducts />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/saved" element={<Saved />} />
        </Routes>
      </main>
      <Footer />
      <CartDisplay />
    </div>
  );
}

export default App;
