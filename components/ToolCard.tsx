'use client';

import { useState } from 'react';
import Link from 'next/link';

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

interface ToolCardProps {
  tool: Tool;
}

export default function ToolCard({ tool }: ToolCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className='group relative bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700'>
      <div className='p-6'>
        <div className='flex items-start gap-4'>
          {/* Icon */}
          <div className='flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-xl font-bold group-hover:scale-110 transition-transform duration-300'>
            {tool.icon ? (
              <img
                src={tool.icon}
                alt={tool.name}
                className='w-full h-full object-cover rounded-lg'
              />
            ) : (
              tool.name.charAt(0).toUpperCase()
            )}
          </div>

          {/* Content */}
          <div className='flex-1 min-w-0'>
            <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-1 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors'>
              {tool.name}
            </h3>
            <span className='inline-block px-2 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full mb-2'>
              {tool.category.name}
            </span>
            <p className='text-sm text-gray-600 dark:text-gray-300 line-clamp-2'>
              {tool.description}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className='mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between'>
          <a
            href={tool.url}
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors'
          >
            访问工具
            <svg
              className='ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M13 7l5 5m0 0l-5 5m5-5H6'
              />
            </svg>
          </a>

          {tool.detailedDescription && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className='text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 flex items-center gap-1 transition-colors'
            >
              {isExpanded ? '收起详情' : '详细内容'}
              <svg
                className={`w-4 h-4 transition-transform ${
                  isExpanded ? 'rotate-180' : ''
                }`}
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='m19 9-7 7-7-7'
                />
              </svg>
            </button>
          )}
        </div>

        {/* Detailed Description Panel */}
        {tool.detailedDescription && (
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              isExpanded ? 'max-h-96 mt-4' : 'max-h-0'
            }`}
          >
            <div className='p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-100 dark:border-gray-700'>
              <p className='text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed'>
                {tool.detailedDescription}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Hover Effect Overlay */}
      <div className='absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none' />
    </div>
  );
}
