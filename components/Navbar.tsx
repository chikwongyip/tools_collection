'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

interface Category {
  id: string;
  name: string;
  slug: string;
}

export default function Navbar() {
  const searchParams = useSearchParams();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    searchParams.get('categoryId') || null
  );

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        const data = await response.json();
        // API返回的直接是categories数组，不是包含categories属性的对象
        setCategories(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // 监听searchParams变化，更新选中的分类
  useEffect(() => {
    const categoryId = searchParams.get('categoryId');
    setSelectedCategory(categoryId || null);
  }, [searchParams]);

  return (
    <nav className='bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          <div className='flex items-center'>
            <Link href='/' className='flex items-center'>
              <h1 className='text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
                工具导航
              </h1>
            </Link>

            {/* Category Navigation */}
            <div className='hidden md:ml-10 md:flex space-x-8'>
              <Link
                href='/'
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  selectedCategory === null
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
                onClick={() => setSelectedCategory(null)}
              >
                全部
              </Link>

              {loading ? (
                <div className='flex space-x-8'>
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className='w-16 h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse'
                    ></div>
                  ))}
                </div>
              ) : (
                categories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/?categoryId=${category.id}`}
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      selectedCategory === category.id
                        ? 'text-blue-600 dark:text-blue-400'
                        : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'
                    }`}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    {category.name}
                  </Link>
                ))
              )}
            </div>
          </div>

          <div className='flex items-center space-x-4'>
            <Link
              href='/about'
              className='px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors'
            >
              关于我们
            </Link>
            <Link
              href='/privacy'
              className='px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors'
            >
              隐私政策
            </Link>
            <Link
              href='/terms'
              className='px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors'
            >
              服务条款
            </Link>
            <Link
              href='/admin/login'
              className='px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors'
            >
              管理后台
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
