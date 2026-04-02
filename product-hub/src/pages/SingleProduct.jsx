import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getSingleProduct } from "../App";
import { Loading, ErrorMessage } from "../components/LoadingError";
import { Star } from "lucide-react";
import BacktoProductsBtn from "../components/SingleProductPageComponents/BacktoProductsBtn";
import AddtoCartBtn from "../components/SingleProductPageComponents/AddtoCartBtn";
import SaveBtn from "../components/SingleProductPageComponents/SaveBtn";
import CustomerReview from "../components/SingleProductPageComponents/CustomerReview";

function SingleProduct() {
  const { id } = useParams(); // get product id from URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    // Fetch single product when component loads
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getSingleProduct(id);
        setProduct(data);
        setSelectedImage(0);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]); // re-run if id changes

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`text-lg ${i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"}`}
      >
        <Star strokeWidth={3} fill="currentColor" size={18} />
      </span>
    ));
  };

  if (loading)
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Loading />
      </div>
    );
  if (error)
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <ErrorMessage message={error} />
      </div>
    );
  if (!product) return null;

  const allImages = product.images || [product.thumbnail];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
        <Link to="/" className="hover:text-orange-500">
          Home
        </Link>
        <span>/</span>
        <Link to="/products" className="hover:text-orange-500">
          Products
        </Link>
        <span>/</span>
        <span className="text-gray-700 capitalize">{product.category}</span>
        <span>/</span>
        <span className="text-gray-700 line-clamp-1">{product.title}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Images Section */}
        <div>
          {/* Main Image */}
          <div className="bg-gray-50 rounded-2xl overflow-hidden h-80 md:h-96 mb-4">
            <img
              src={allImages[selectedImage]}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Thumbnail Images */}
          {allImages.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {allImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index
                      ? "border-orange-500"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <img
                    src={img}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details */}
        <div>
          {/* Category */}
          <span className="bg-orange-100 text-orange-600 text-xs font-semibold px-3 py-1 rounded-full capitalize">
            {product.category}
          </span>

          {/* Title */}
          <h1
            className="mt-3 text-2xl md:text-3xl font-bold text-gray-900"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            {product.title}
          </h1>

          {/* Brand */}
          {product.brand && (
            <p className="text-gray-400 text-sm mt-1">
              by{" "}
              <span className="text-gray-600 font-medium">{product.brand}</span>
            </p>
          )}

          {/* Rating */}
          <div className="flex items-center gap-2 mt-3">
            <div className="flex">{renderStars(product.rating)}</div>
            <span className="text-gray-600 text-sm font-medium">
              {product.rating} / 5
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3 mt-4">
            <span className="text-4xl font-bold text-orange-500">
              ${product.price}
            </span>
            {product.discountPercentage > 0 && (
              <span className="bg-red-100 text-red-600 text-sm font-semibold px-2 py-1 rounded-full">
                -{Math.round(product.discountPercentage)}% OFF
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm leading-relaxed mt-4">
            {product.description}
          </p>

          {/* Info Tags */}
          <div className="grid grid-cols-2 gap-3 mt-6">
            <div className="bg-gray-50 rounded-xl p-3">
              <div className="text-xs text-gray-400">Stock</div>
              <div
                className={`font-semibold text-sm mt-1 ${product.stock > 0 ? "text-green-600" : "text-red-500"}`}
              >
                {product.stock > 0
                  ? `${product.stock} available`
                  : "Out of stock"}
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-3">
              <div className="text-xs text-gray-400">Warranty</div>
              <div className="font-semibold text-sm mt-1 text-gray-700">
                {product.warrantyInformation || "N/A"}
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-3">
              <div className="text-xs text-gray-400">Shipping</div>
              <div className="font-semibold text-sm mt-1 text-gray-700">
                {product.shippingInformation || "Standard"}
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-3">
              <div className="text-xs text-gray-400">Return Policy</div>
              <div className="font-semibold text-sm mt-1 text-gray-700">
                {product.returnPolicy || "N/A"}
              </div>
            </div>
          </div>

          {/* Add to cart button */}
          <div className="flex gap-3 mt-6">
            <AddtoCartBtn />
            <SaveBtn />
          </div>

          {/* SKU */}
          {product.sku && (
            <p className="text-gray-400 text-xs mt-4">SKU: {product.sku}</p>
          )}
        </div>
      </div>

      {/* Reviews Section */}
      <CustomerReview product={product} />

      {/* Back to products link */}
      <div className="mt-10">
        <BacktoProductsBtn />
      </div>
    </div>
  );
}

export default SingleProduct;
