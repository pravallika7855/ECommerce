import React from 'react';
import ProductCard from './ProductCard';
import { PackageX } from 'lucide-react';

/**
 * ProductList Component
 * Reusable list container that maps over products array and renders ProductCard components
 * Receives `products` array via props.
 */
const ProductList = ({ products = [] }) => {
  if (!products || products.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">
          <PackageX size={40} />
        </div>
        <h2>No Products Found</h2>
        <p>We couldn't find any products matching your current criteria.</p>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
