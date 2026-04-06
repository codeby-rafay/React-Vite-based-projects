import { Routes, Route } from "react-router-dom";
import axios from "axios";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products";
import SingleProduct from "./pages/SingleProduct";
import Categories from "./pages/Categories";
import CategoryProducts from "./pages/CategoryProducts";
import About from "./pages/About";
import Contact from "./pages/Contact";

const BASE_URL = "https://dummyjson.com";

export const getAllProducts = async (limit = 30, skip = 0) => {
  const response = await axios.get(
    `${BASE_URL}/products?limit=${limit}&skip=${skip}`
  );
  return response.data;
};

export const getSingleProduct = async (id) => {
  const response = await axios.get(`${BASE_URL}/products/${id}`);
  return response.data;
};

export const searchProducts = async (query) => {
  const response = await axios.get(`${BASE_URL}/products/search?q=${query}`);
  return response.data;
};

export const getAllCategories = async () => {
  const response = await axios.get(`${BASE_URL}/products/categories`);
  return response.data;
};

// (just names)
export const getCategoryList = async () => {
  const response = await axios.get(`${BASE_URL}/products/category-list`);
  return response.data;
};

export const getProductsByCategory = async (category) => {
  const response = await axios.get(`${BASE_URL}/products/category/${category}`);
  return response.data;
};

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
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
