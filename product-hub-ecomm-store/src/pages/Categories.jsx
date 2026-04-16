import { useEffect, useState } from "react";
import { getCategoryList } from "../api/products";
import { Loading, ErrorMessage } from "../components/LoadingError";
import {
  ShoppingCart,
  Armchair,
  House,
  CookingPot,
  Laptop,
  Shirt,
  Watch,
  Smartphone,
  Motorbike,
  Tablet,
  Gem,
  Handbag,
  SoapDispenserDroplet,
  WandSparkles,
} from "lucide-react";
import Cards from "../components/CategoriesCardComponents/Cards";

const categoryIcons = {
  "beauty": <WandSparkles size={38} strokeWidth={1.75} />,
  "fragrances": ( <img className="size-10" src="https://www.svgrepo.com/show/322156/delicate-perfume.svg" alt="Fragrances" /> ),
  "furniture": <Armchair size={38} strokeWidth={1.75} />,
  "groceries": <ShoppingCart size={38} strokeWidth={1.75} />,
  "home-decoration": <House size={38} strokeWidth={1.75} />,
  "kitchen-accessories": <CookingPot size={38} strokeWidth={1.75} />,
  "laptops": <Laptop size={38} strokeWidth={1.75} />,
  "mens-shirts": <Shirt size={38} strokeWidth={1.75} />,
  "mens-shoes": ( <img className="size-10" src="https://www.svgrepo.com/show/482542/shoes-4.svg" alt="Mens Shoes" />),
  "mens-watches": <Watch size={38} strokeWidth={1.75} />,
  "mobile-accessories": <Smartphone size={38} strokeWidth={1.75} />,
  "motorcycle": <Motorbike size={38} strokeWidth={1.75} />,
  "skin-care": <SoapDispenserDroplet size={38} strokeWidth={1.75} />,
  "smartphones": ( <img className="size-10" src="https://www.svgrepo.com/show/499623/mobile.svg" alt="Smartphones" /> ),
  "sports-accessories": ( <img className="size-10" src="https://www.svgrepo.com/show/446025/sports-soccer.svg" alt="Sports Accessories" />),
  "sunglasses": ( <img className="size-10" src="https://www.svgrepo.com/show/488212/glasses.svg" alt="Sunglasses" /> ),
  "tablets": <Tablet size={38} strokeWidth={1.75} />,
  "tops": ( <img className="size-10" src="https://www.svgrepo.com/show/482584/dress-4.svg" alt="Tops" /> ),
  "vehicle": ( <img className="size-10" src="https://www.svgrepo.com/show/490616/car-hatchback.svg" alt="Vehicle" /> ),
  "womens-bags": <Handbag size={38} strokeWidth={1.75} />,
  "womens-dresses": ( <img className="size-10" src="https://www.svgrepo.com/show/290769/dress.svg" alt="Womens Dresses" /> ),
  "womens-jewellery": <Gem size={38} strokeWidth={1.75} />,
  "womens-shoes": ( <img className="size-10" src="https://www.svgrepo.com/show/288714/high-heel-shoe.svg" alt="Womens Shoes" /> ),
  "womens-watches": <Watch size={38} strokeWidth={1.75} />,
};

function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch category list when component loads
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getCategoryList();
        setCategories(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const formatName = (slug) => {
    return slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1
          className="text-3xl font-bold text-gray-900"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          Product Categories
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          {categories.length} categories available
        </p>
      </div>

      {loading && <Loading />}
      {error && <ErrorMessage message={error} />}

     {!loading && !error && (
      <Cards categoryIcons={categoryIcons} categories={categories} formatName={formatName} />
      )}
    </div>
  );
}

export default Categories;
