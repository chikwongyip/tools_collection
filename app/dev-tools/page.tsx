'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';

// 开发工具列表
const devTools = [
  {
    id: 'json-format',
    name: 'JSON 格式化',
    icon: '📋',
    description: 'JSON 格式化、压缩、验证工具，支持左右分栏对比',
    path: '/dev-tools/json-format',
    color: 'from-blue-500 to-purple-500'
  },
  // 后续添加更多工具时在这里扩展
];

export default function DevToolsPage() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800'>
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='text-center mb-12'>
          <h1 className='text-4xl font-bold text-gray-900 dark:text-white mb-4'>
            🔧 开发工具集合
          </h1>
          <p className='text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto'>
            精选开发常用工具，提高您的工作效率
          </p>
        </div>

        {/* Tools Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {devTools.map((tool) => (
            <Link
              key={tool.id}
              href={tool.path}
              className='group block bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden'
            >
              <div className={`h-2 bg-gradient-to-r ${tool.color}`}></div>
              <div className='p-6'>
                <div className='text-4xl mb-4'>{tool.icon}</div>
                <h2 className='text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors'>
                  {tool.name}
                </h2>
                <p className='text-gray-600 dark:text-gray-400 text-sm'>
                  {tool.description}
                </p>
                <div className='mt-4 flex items-center text-blue-600 dark:text-blue-400 text-sm font-medium group-hover:translate-x-1 transition-transform'>
                  立即使用
                  <svg className='w-4 h-4 ml-1' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State - if no tools */}
        {devTools.length === 0 && (
          <div className='text-center py-12'>
            <div className='text-6xl mb-4'>🚧</div>
            <p className='text-gray-500 dark:text-gray-400'>
              更多开发工具正在开发中，敬请期待...
            </p>
          </div>
        )}

        {/* Add New Tool Section */}
        <div className='mt-12 text-center'>
          <div className='inline-block bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl p-6'>
            <p className='text-gray-600 dark:text-gray-400 mb-2'>
              需要其他开发工具？
            </p>
            <p className='text-sm text-gray-500 dark:text-gray-500'>
              可以在代码中添加新工具到 devTools 数组中快速扩展
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
