/**
 * API Service for DummyJSON Products Integration
 * Endpoint Base: https://dummyjson.com/products
 */

const BASE_URL = 'https://dummyjson.com/products';

/**
 * Fetch all products from DummyJSON API
 * @param {number} limit - Maximum number of products to fetch (default: 100)
 * @returns {Promise<Array>} List of products
 */
export const getProducts = async (limit = 100) => {
  try {
    const response = await fetch(`${BASE_URL}?limit=${limit}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch products (Status: ${response.status})`);
    }
    const data = await response.json();
    return data.products || [];
  } catch (error) {
    console.error('API Error in getProducts:', error);
    throw error;
  }
};

/**
 * Fetch a single product by ID
 * @param {string|number} id - Product ID
 * @returns {Promise<Object>} Single product data
 */
export const getProductById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`);
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Product with ID "${id}" was not found.`);
      }
      throw new Error(`Failed to fetch product details (Status: ${response.status})`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`API Error in getProductById(${id}):`, error);
    throw error;
  }
};

/**
 * Fetch list of product categories
 * @returns {Promise<Array>} Array of category objects or string titles
 */
export const getCategories = async () => {
  try {
    const response = await fetch(`${BASE_URL}/categories`);
    if (!response.ok) {
      throw new Error(`Failed to fetch categories (Status: ${response.status})`);
    }
    const data = await response.json();
    
    // Normalize format: DummyJSON returns either string array or object array with { slug, name, url }
    return data.map((cat) => {
      if (typeof cat === 'string') {
        return { slug: cat, name: cat.replace('-', ' ') };
      }
      return {
        slug: cat.slug || cat.name,
        name: cat.name || cat.slug
      };
    });
  } catch (error) {
    console.error('API Error in getCategories:', error);
    throw error;
  }
};

/**
 * Fetch products filtered by a category slug
 * @param {string} category - Category slug/name
 * @returns {Promise<Array>} Filtered products array
 */
export const getProductsByCategory = async (category) => {
  try {
    const response = await fetch(`${BASE_URL}/category/${encodeURIComponent(category)}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch products for category "${category}" (Status: ${response.status})`);
    }
    const data = await response.json();
    return data.products || [];
  } catch (error) {
    console.error(`API Error in getProductsByCategory(${category}):`, error);
    throw error;
  }
};

/**
 * Search products by query string
 * @param {string} query - Search term
 * @returns {Promise<Array>} Filtered products array
 */
export const searchProducts = async (query) => {
  try {
    const response = await fetch(`${BASE_URL}/search?q=${encodeURIComponent(query)}`);
    if (!response.ok) {
      throw new Error(`Search failed for query "${query}" (Status: ${response.status})`);
    }
    const data = await response.json();
    return data.products || [];
  } catch (error) {
    console.error(`API Error in searchProducts(${query}):`, error);
    throw error;
  }
};
