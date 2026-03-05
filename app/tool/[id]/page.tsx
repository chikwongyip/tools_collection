'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

interface Tool {
  id: string;
  name: string;
  url: string;
  description: string;
  detailedDescription?: string | null;
  icon?: string | null;
  category: {
    id: string;
    name: string;
  };
}

interface RelatedTool {
  id: string;
  name: string;
  url: string;
  description: string;
  icon?: string | null;
  category: {
    name: string;
  };
}

export default function ToolDetailPage() {
  const [tool, setTool] = useState<Tool | null>(null);
  const [relatedTools, setRelatedTools] = useState<RelatedTool[]>([]);
  const [loading, setLoading] = useState(true);
  const [relatedLoading, setRelatedLoading] = useState(true);
  const params = useParams();
  const { id } = params;

  const fetchTool = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/tools/${id}`);
      const data = await response.json();
      setTool(data);
    } catch (error) {
      console.error('Error fetching tool:', error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  const fetchRelatedTools = useCallback(
    async (categoryId: string) => {
      setRelatedLoading(true);
      try {
        const response = await fetch(
          `/api/tools?categoryId=${categoryId}&limit=4`
        );
        const data = await response.json();
        // 过滤掉当前工具
        const filteredTools = data.tools.filter(
          (t: RelatedTool) => t.id !== id
        );
        setRelatedTools(filteredTools);
      } catch (error) {
        console.error('Error fetching related tools:', error);
      } finally {
        setRelatedLoading(false);
      }
    },
    [id]
  );

  useEffect(() => {
    if (id) {
      fetchTool();
    }
  }, [id, fetchTool]);

  useEffect(() => {
    if (tool?.category.id) {
      fetchRelatedTools(tool.category.id);
    }
  }, [tool, fetchRelatedTools]);

  if (loading) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center'>
        <div className='text-center'>
          <div className='w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4'></div>
          <p className='text-gray-600 dark:text-gray-400'>加载中...</p>
        </div>
      </div>
    );
  }

  if (!tool) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center'>
        <div className='text-center'>
          <svg
            className='w-16 h-16 text-gray-400 mx-auto mb-4'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
            />
          </svg>
          <h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-2'>
            工具未找到
          </h3>
          <p className='text-gray-600 dark:text-gray-400 mb-4'>
            抱歉，您查找的工具不存在或已被移除。
          </p>
          <Link
            href='/'
            className='inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
          >
            返回首页
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800'>
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {/* Tool Header */}
        <div className='bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8'>
          <div className='flex flex-col md:flex-row items-start md:items-center gap-6'>
            {/* Tool Icon */}
            <div className='w-16 h-16 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center flex-shrink-0'>
              {tool.icon ? (
                <img
                  src={tool.icon}
                  alt={tool.name}
                  className='w-10 h-10 object-contain'
                />
              ) : (
                <svg
                  className='w-10 h-10 text-gray-400'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4'
                  />
                </svg>
              )}
            </div>

            {/* Tool Info */}
            <div className='flex-1'>
              <div className='flex items-center gap-4 mb-2'>
                <Link
                  href='/'
                  className='text-blue-600 dark:text-blue-400 hover:underline text-sm'
                >
                  &larr; 返回首页
                </Link>
                <Link
                  href={`/?categoryId=${tool.category.id}`}
                  className='text-sm bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors'
                >
                  {tool.category.name}
                </Link>
              </div>

              <h1 className='text-3xl font-bold text-gray-900 dark:text-white mb-2'>
                {tool.name}
              </h1>

              <p className='text-gray-600 dark:text-gray-400 mb-4'>
                {tool.description}
              </p>

              <a
                href={tool.url}
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium'
              >
                访问工具
                <svg
                  className='w-4 h-4 ml-2'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Tool Details */}
        {tool.detailedDescription && (
          <div className='bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8'>
            <h2 className='text-2xl font-semibold text-gray-900 dark:text-white mb-4'>
              详细介绍
            </h2>
            <div className='prose dark:prose-invert max-w-none'>
              <p className='text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-wrap'>
                {tool.detailedDescription}
              </p>
            </div>
          </div>
        )}

        {/* Related Tools */}
        <div className='bg-white dark:bg-gray-800 rounded-xl shadow-md p-6'>
          <h2 className='text-2xl font-semibold text-gray-900 dark:text-white mb-4'>
            相关工具
          </h2>

          {relatedLoading ? (
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className='bg-gray-50 dark:bg-gray-700 rounded-lg p-4 animate-pulse'
                >
                  <div className='w-12 h-12 bg-gray-200 dark:bg-gray-600 rounded-lg mb-3'></div>
                  <div className='h-4 bg-gray-200 dark:bg-gray-600 rounded w-3/4 mb-2'></div>
                  <div className='h-3 bg-gray-200 dark:bg-gray-600 rounded w-1/2 mb-2'></div>
                  <div className='h-3 bg-gray-200 dark:bg-gray-600 rounded w-full'></div>
                </div>
              ))}
            </div>
          ) : relatedTools.length > 0 ? (
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              {relatedTools.map((relatedTool) => (
                <Link
                  key={relatedTool.id}
                  href={`/tool/${relatedTool.id}`}
                  className='block bg-gray-50 dark:bg-gray-700 rounded-lg p-4 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors'
                >
                  <div className='flex items-start gap-3'>
                    <div className='w-10 h-10 rounded-lg bg-gray-200 dark:bg-gray-600 flex items-center justify-center flex-shrink-0'>
                      {relatedTool.icon ? (
                        <img
                          src={relatedTool.icon}
                          alt={relatedTool.name}
                          className='w-6 h-6 object-contain'
                        />
                      ) : (
                        <svg
                          className='w-6 h-6 text-gray-400'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4'
                          />
                        </svg>
                      )}
                    </div>
                    <div>
                      <h3 className='font-medium text-gray-900 dark:text-white mb-1'>
                        {relatedTool.name}
                      </h3>
                      <p className='text-sm text-gray-600 dark:text-gray-400 line-clamp-2'>
                        {relatedTool.description}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className='text-center py-8'>
              <svg
                className='w-12 h-12 text-gray-400 mx-auto mb-3'
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
              <p className='text-gray-600 dark:text-gray-400'>暂无相关工具</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
