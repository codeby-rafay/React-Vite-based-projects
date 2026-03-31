import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllProducts } from "../App";
import ProductCard from "../components/ProductCard";
import { Loading, ErrorMessage } from "../components/LoadingError";
import { ArrowRight, Sparkle } from "lucide-react";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch products when the page loads
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getAllProducts(20, 0); // get 20 products
        setProducts(data.products);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-linear-to-br from-orange-50 to-amber-50 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <span className="bg-orange-100 text-orange-600 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
            New Arrivals 2026
          </span>
          <h1
            className="mt-4 text-4xl md:text-6xl font-bold text-gray-900 leading-tight"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Shop The Best
            <br />
            <span className="text-orange-500">Products Online</span>
          </h1>
          <p className="mt-4 text-gray-500 text-lg max-w-xl mx-auto">
            Discover thousands of quality products across all categories,
            shipped fast and priced right.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/products"
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-semibold text-sm transition-colors"
            >
              Browse All Products
            </Link>
            <Link
              to="/categories"
              className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 px-8 py-3 rounded-xl font-semibold text-sm transition-colors"
            >
              Shop by Category
            </Link>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-orange-500 text-white py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-xl font-bold">200+</div>
              <div className="text-orange-100 text-xs">Products</div>
            </div>
            <div>
              <div className="text-xl font-bold">30+</div>
              <div className="text-orange-100 text-xs">Categories</div>
            </div>
            <div>
              <div className="text-xl font-bold">Free</div>
              <div className="text-orange-100 text-xs">Shipping</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2
              className="text-2xl md:text-3xl font-bold text-gray-900"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Featured Products
            </h2>
            <p className="text-gray-500 text-sm mt-1">Hand-picked for you</p>
          </div>
          <Link
            to="/products"
            className="text-orange-500 hover:text-orange-600 text-sm font-medium flex items-center gap-1"
          >
            View all
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>

        {loading && <Loading />}
        {error && <ErrorMessage message={error} />}

        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Scrolling marquee of product titles */}
      {!loading && products.length > 0 && (
        <section className="bg-gray-900 py-4 overflow-hidden">
          <div className="flex gap-8 animate-pulse">
            <div className="flex gap-8 whitespace-nowrap">
              {products.concat(products).map((product, i) => (
                <span key={i} className="text-gray-400 text-sm font-medium flex gap-1 items-center">
                  <Sparkle size={14} strokeWidth={1.75} fill="currentColor" /> {product.title}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* More Products Section */}
      {!loading && !error && products.length > 8 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <h2
              className="text-2xl md:text-3xl font-bold text-gray-900"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              More Products
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Keep exploring our collection
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.slice(8, 20).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-10 flex justify-center">
            <Link
              to="/products"
              className="bg-orange-500 hover:bg-orange-600 w-1/5 justify-center text-white px-10 py-3 rounded-xl flex items-center gap-2 font-semibold text-sm transition-colors"
            >
              See All Products <ArrowRight size={16} strokeWidth={2} />
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}

export default Home;
