'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter
import Link from 'next/link'; // Keep Link for the admin login
import ToolCard from '@/components/ToolCard';
import CategoryFilter from '@/components/CategoryFilter';

interface Tool {
  id: string;
  name: string;
  url: string;
  description: string;
  detailedDescription?: string | null;
  icon?: string | null;
  category: {
    name: string;
  };
}

export default function HomePage() {
  const router = useRouter(); // Initialize useRouter
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchTools = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedCategory) params.append('categoryId', selectedCategory);
      if (searchQuery) params.append('search', searchQuery);

      const response = await fetch(`/api/tools?${params.toString()}`);
      const data = await response.json();
      setTools(data.tools);
    } catch (error) {
      console.error('Error fetching tools:', error);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, searchQuery]);

  useEffect(() => {
    fetchTools();
  }, [fetchTools]);

  // const handleToolClick = (toolId: string) => {
  //   router.push(`/tool/${toolId}`);
  // };

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800'>
      {/* Header */}
      <header className='bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
          <div className='flex items-center justify-between'>
            <div>
              <h1 className='text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
                工具导航
              </h1>
              <p className='mt-1 text-sm text-gray-600 dark:text-gray-400'>
                发现和探索优质工具
              </p>
            </div>
            <Link
              href='/admin/login' // Use Link for internal navigation
              className='px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors'
            >
              管理后台
            </Link>
          </div>

          {/* Search Bar */}
          <div className='mt-6'>
            <div className='relative'>
              <input
                type='text'
                placeholder='搜索工具...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='w-full px-4 py-3 pl-12 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white'
              />
              <svg
                className='absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                />
              </svg>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
          {/* Sidebar */}
          <aside className='lg:col-span-1'>
            <CategoryFilter
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </aside>

          {/* Tools Grid */}
          <div className='lg:col-span-3'>
            {loading ? (
              <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className='bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 animate-pulse'
                  >
                    <div className='flex items-start gap-4'>
                      <div className='w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg'></div>
                      <div className='flex-1 space-y-2'>
                        <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4'></div>
                        <div className='h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2'></div>
                        <div className='h-3 bg-gray-200 dark:bg-gray-700 rounded'></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : tools.length > 0 ? (
              <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>
                {tools.map((tool) => (
                  <ToolCard
                    key={tool.id}
                    tool={tool}
                    // onClick={() => handleToolClick(tool.id)}
                  />
                ))}
              </div>
            ) : (
              <div className='text-center py-12'>
                <svg
                  className='mx-auto h-12 w-12 text-gray-400'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                  />
                </svg>
                <h3 className='mt-2 text-sm font-medium text-gray-900 dark:text-white'>
                  没有找到工具
                </h3>
                <p className='mt-1 text-sm text-gray-500 dark:text-gray-400'>
                  尝试调整搜索条件或选择其他分类
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
