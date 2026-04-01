import { useEffect, useState } from 'react'
import { getAllProducts, searchProducts } from '../App'
import ProductCard from '../components/ProductCard'
import SearchBar from '../components/SearchBar'
import { Loading, ErrorMessage, NoResults } from '../components/LoadingError'

function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [totalProducts, setTotalProducts] = useState(0)
  const [currentPage, setCurrentPage] = useState(0) // skip value
  const LIMIT = 12

  // Fetch all products OR search results
  const fetchProducts = async (query = '', skip = 0) => {
    try {
      setLoading(true)
      setError(null)

      let data
      if (query) {
        // Use search API
        data = await searchProducts(query)
      } else {
        // Use get all products API
        data = await getAllProducts(LIMIT, skip)
      }

      setProducts(data.products)
      setTotalProducts(data.total)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // Load products on first render
  useEffect(() => {
    fetchProducts('', currentPage * LIMIT)
  }, [currentPage])

  // Handle search
  const handleSearch = (query) => {
    setSearchQuery(query)
    setCurrentPage(0)
    fetchProducts(query, 0)
  }

  const totalPages = Math.ceil(totalProducts / LIMIT)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>
          All Products
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          {searchQuery
            ? `Search results for "${searchQuery}" — ${totalProducts} found`
            : `Showing ${products.length} of ${totalProducts} products`}
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-8 flex items-center gap-4 flex-wrap">
        <SearchBar onSearch={handleSearch} placeholder="Search products by name..." />
        {searchQuery && (
          <button
            onClick={() => handleSearch('')}
            className="text-sm text-gray-500 hover:text-orange-500 underline cursor-pointer"
          >
            Clear search
          </button>
        )}
      </div>

      {/* Content */}
      {loading && <Loading />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && products.length === 0 && <NoResults />}

      {!loading && !error && products.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Pagination — only show when NOT searching */}
          {!searchQuery && totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-12">
              <button
                onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
                disabled={currentPage === 0}
                className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
              >
                ← Previous
              </button>

              <div className="flex gap-1">
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i)}
                    className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                      currentPage === i
                        ? 'bg-orange-500 text-white'
                        : 'border border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages - 1, p + 1))}
                disabled={currentPage >= totalPages - 1}
                className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
              >
                Next →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Products