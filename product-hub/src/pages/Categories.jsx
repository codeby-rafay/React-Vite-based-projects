import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getCategoryList } from '../App'
import { Loading, ErrorMessage } from '../components/LoadingError'

// Nice emoji icons for categories
const categoryIcons = {
  'beauty': '💄',
  'fragrances': '🌸',
  'furniture': '🪑',
  'groceries': '🛒',
  'home-decoration': '🏠',
  'kitchen-accessories': '🍳',
  'laptops': '💻',
  'mens-shirts': '👔',
  'mens-shoes': '👟',
  'mens-watches': '⌚',
  'mobile-accessories': '📱',
  'motorcycle': '🏍️',
  'skin-care': '🧴',
  'smartphones': '📲',
  'sports-accessories': '⚽',
  'sunglasses': '🕶️',
  'tablets': '📱',
  'tops': '👗',
  'vehicle': '🚗',
  'womens-bags': '👜',
  'womens-dresses': '👗',
  'womens-jewellery': '💍',
  'womens-shoes': '👠',
  'womens-watches': '⌚',
}

function Categories() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Fetch category list when component loads
    const fetchCategories = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await getCategoryList()
        setCategories(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  const formatName = (slug) => {
    return slug
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>
          Product Categories
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Browse by category — {categories.length} categories available
        </p>
      </div>

      {loading && <Loading />}
      {error && <ErrorMessage message={error} />}

      {!loading && !error && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {categories.map((slug) => (
            <Link key={slug} to={`/category/${slug}`}>
              <div className="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-md hover:border-orange-200 hover:-translate-y-1 transition-all duration-200 text-center group cursor-pointer">
                {/* Emoji icon */}
                <div className="text-4xl mb-3">
                  {categoryIcons[slug] || '📦'}
                </div>
                {/* Category name */}
                <h3 className="text-sm font-semibold text-gray-800 group-hover:text-orange-500 transition-colors">
                  {formatName(slug)}
                </h3>
                {/* Arrow */}
                <div className="text-orange-400 text-xs mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  Browse →
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default Categories