'use client';

import { useState, useEffect } from 'react';

interface Category {
  id: string;
  name: string;
  _count: {
    tools: number;
  };
}

interface CategoryFilterProps {
  selectedCategory: string | null;
  onCategoryChange: (categoryId: string | null) => void;
}

export default function CategoryFilter({
  selectedCategory,
  onCategoryChange
}: CategoryFilterProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className='bg-white dark:bg-gray-800 rounded-xl shadow-md p-6'>
        <div className='animate-pulse space-y-3'>
          <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded w-20'></div>
          <div className='h-8 bg-gray-200 dark:bg-gray-700 rounded'></div>
          <div className='h-8 bg-gray-200 dark:bg-gray-700 rounded'></div>
          <div className='h-8 bg-gray-200 dark:bg-gray-700 rounded'></div>
        </div>
      </div>
    );
  }

  return (
    <div className='bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 sticky top-6'>
      <h2 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
        分类筛选
      </h2>
      <div className='space-y-2'>
        <button
          onClick={() => onCategoryChange(null)}
          className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
            selectedCategory === null
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          <span className='font-medium'>全部工具</span>
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
              selectedCategory === category.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            <div className='flex items-center justify-between'>
              <span className='font-medium'>{category.name}</span>
              <span className='text-sm opacity-75'>
                ({category._count.tools})
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
