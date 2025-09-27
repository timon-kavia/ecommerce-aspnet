import React from 'react';
import type { Category } from '../types';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: number | null;
  onCategorySelect: (categoryId: number | null) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onCategorySelect,
}) => {
  return (
    <div className="category-filter">
      <h3>Categories</h3>
      <ul className="category-list">
        <li>
          <button
            className={`category-button ${selectedCategory === null ? 'active' : ''}`}
            onClick={() => onCategorySelect(null)}
          >
            All Products
          </button>
        </li>
        {categories.map(category => (
          <li key={category.id}>
            <button
              className={`category-button ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => onCategorySelect(category.id)}
            >
              {category.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryFilter;