'use client';

import { useEffect, useState } from 'react';
import AdminLayout from '@/components/AdminLayout';

interface Stats {
  totalTools: number;
  totalCategories: number;
  featuredTools: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats>({
    totalTools: 0,
    totalCategories: 0,
    featuredTools: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [toolsRes, categoriesRes, featuredRes] = await Promise.all([
        fetch('/api/tools'),
        fetch('/api/categories'),
        fetch('/api/tools?featured=true')
      ]);

      const toolsData = await toolsRes.json();
      const categoriesData = await categoriesRes.json();
      const featuredData = await featuredRes.json();

      setStats({
        totalTools: toolsData.pagination?.total || 0,
        totalCategories: categoriesData.length || 0,
        featuredTools: featuredData.pagination?.total || 0
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div>
        <h1 className='text-2xl font-bold text-gray-900 dark:text-white mb-6'>
          仪表板
        </h1>

        {loading ? (
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className='bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 animate-pulse'
              >
                <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4'></div>
                <div className='h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3'></div>
              </div>
            ))}
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            <div className='bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-md p-6 text-white'>
              <h3 className='text-sm font-medium opacity-90 mb-2'>工具总数</h3>
              <p className='text-3xl font-bold'>{stats.totalTools}</p>
            </div>
            <div className='bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-md p-6 text-white'>
              <h3 className='text-sm font-medium opacity-90 mb-2'>分类总数</h3>
              <p className='text-3xl font-bold'>{stats.totalCategories}</p>
            </div>
            <div className='bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-md p-6 text-white'>
              <h3 className='text-sm font-medium opacity-90 mb-2'>推荐工具</h3>
              <p className='text-3xl font-bold'>{stats.featuredTools}</p>
            </div>
          </div>
        )}

        <div className='mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-md p-6'>
          <h2 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
            快速操作
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <a
              href='/admin/tools'
              className='flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors'
            >
              <svg
                className='w-6 h-6 text-blue-600 dark:text-blue-400'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M12 6v6m0 0v6m0-6h6m-6 0H6'
                />
              </svg>
              <span className='font-medium text-gray-900 dark:text-white'>
                添加新工具
              </span>
            </a>
            <a
              href='/admin/categories'
              className='flex items-center gap-3 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors'
            >
              <svg
                className='w-6 h-6 text-purple-600 dark:text-purple-400'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z'
                />
              </svg>
              <span className='font-medium text-gray-900 dark:text-white'>
                管理分类
              </span>
            </a>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
