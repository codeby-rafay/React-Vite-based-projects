import { Routes, Route, useLocation } from "react-router-dom";
import { lazy, Suspense } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CartDisplay from "./components/CartDisplay";
const Home = lazy(() => import("./pages/Home"));
const Products = lazy(() => import("./pages/Products"));
const SingleProduct = lazy(() => import("./pages/SingleProduct"));
const Categories = lazy(() => import("./pages/Categories"));
const CategoryProducts = lazy(() => import("./pages/Categoryproducts"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Saved = lazy(() => import("./pages/Saved"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const AdminPage = lazy(() => import("./pages/AdminPage"));
const ReviewOrdersAdmin = lazy(() => import("./pages/ReviewOrdersAdmin"));
const NotFound = lazy(() => import("./pages/NotFound"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
import { ToastContainer } from "react-toastify";

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  const isResetPasswordRoute = location.pathname === "/reset-password";

  return (
    <div className="min-h-screen flex flex-col bg-[#fafaf8]">
      {!isAdminRoute && !isResetPasswordRoute && <Navbar />}
      <main className="grow min-h-[80vh]">
        <Suspense
          fallback={
            <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50">
              <div className="w-12 h-12 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-500 text-sm">Loading...</p>
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<SingleProduct />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/category/:slug" element={<CategoryProducts />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/saved" element={<Saved />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedAdminRoute>
                  <AdminPage />
                </ProtectedAdminRoute>
              }
            />
            <Route
              path="/admin/order-reviews"
              element={
                <ProtectedAdminRoute>
                  <ReviewOrdersAdmin />
                </ProtectedAdminRoute>
              }
            />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      {!isAdminRoute && <Footer />}
      {!isAdminRoute && !isResetPasswordRoute && <CartDisplay />}
      <ToastContainer />
    </div>
  );
}

export default App;
