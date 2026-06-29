'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// 开发工具下拉菜单
function DevToolsDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='relative'>
      <button
        onClick={() => setIsOpen(!isOpen)}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
        className='px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1'
      >
        🔧 开发工具
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
        </svg>
      </button>
      {isOpen && (
        <div className='absolute top-full left-0 mt-1 w-52 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50'>
          <Link
            href='/dev-tools'
            className='block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 border-b border-gray-100 dark:border-gray-700 mb-1'
            onClick={() => setIsOpen(false)}
          >
            📦 全部工具
          </Link>
          <Link
            href='/dev-tools/json-format'
            className='block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400'
            onClick={() => setIsOpen(false)}
          >
            📋 JSON 格式化
          </Link>
          <Link
            href='/dev-tools/timestamp'
            className='block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400'
            onClick={() => setIsOpen(false)}
          >
            ⏱️ 时间戳转换
          </Link>
        </div>
      )}
    </div>
  );
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

export default function Navbar() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

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

  // 在客户端获取URL参数
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const categoryId = urlParams.get('categoryId');
      setSelectedCategory(categoryId || null);

      // 监听URL变化
      const handlePopState = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const categoryId = urlParams.get('categoryId');
        setSelectedCategory(categoryId || null);
      };

      window.addEventListener('popstate', handlePopState);
      return () => window.removeEventListener('popstate', handlePopState);
    }
  }, []);

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
            <DevToolsDropdown />
            <Link
              href='/wake-lock'
              className='px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors'
            >
              🌞 屏幕常亮
            </Link>
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
