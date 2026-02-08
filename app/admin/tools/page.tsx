'use client';

import { useEffect, useState } from 'react';
import AdminLayout from '@/components/AdminLayout';

interface Tool {
  id: string;
  name: string;
  url: string;
  description: string;
  detailedDescription?: string | null;
  icon?: string | null;
  featured: boolean;
  category: {
    id: string;
    name: string;
  };
}

interface Category {
  id: string;
  name: string;
}

export default function ToolsPage() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingTool, setEditingTool] = useState<Tool | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    description: '',
    detailedDescription: '',
    icon: '',
    categoryId: '',
    featured: false
  });

  useEffect(() => {
    fetchTools();
    fetchCategories();
  }, []);

  const fetchTools = async () => {
    try {
      const response = await fetch('/api/tools?limit=100');
      const data = await response.json();
      setTools(data.tools);
    } catch (error) {
      console.error('Error fetching tools:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = editingTool ? `/api/tools/${editingTool.id}` : '/api/tools';
      const method = editingTool ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setShowModal(false);
        setEditingTool(null);
        setFormData({
          name: '',
          url: '',
          description: '',
          detailedDescription: '',
          icon: '',
          categoryId: '',
          featured: false
        });
        fetchTools();
      }
    } catch (error) {
      console.error('Error saving tool:', error);
    }
  };

  const handleEdit = (tool: Tool) => {
    setEditingTool(tool);
    setFormData({
      name: tool.name,
      url: tool.url,
      description: tool.description,
      detailedDescription: tool.detailedDescription || '',
      icon: tool.icon || '',
      categoryId: tool.category.id,
      featured: tool.featured
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('确定要删除这个工具吗？')) return;

    try {
      const response = await fetch(`/api/tools/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        fetchTools();
      }
    } catch (error) {
      console.error('Error deleting tool:', error);
    }
  };

  return (
    <AdminLayout>
      <div>
        <div className='flex items-center justify-between mb-6'>
          <h1 className='text-2xl font-bold text-gray-900 dark:text-white'>
            工具管理
          </h1>
          <button
            onClick={() => {
              setEditingTool(null);
              setFormData({
                name: '',
                url: '',
                description: '',
                detailedDescription: '',
                icon: '',
                categoryId: '',
                featured: false
              });
              setShowModal(true);
            }}
            className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
          >
            添加工具
          </button>
        </div>

        {loading ? (
          <div className='bg-white dark:bg-gray-800 rounded-xl shadow-md p-6'>
            <div className='animate-pulse space-y-4'>
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className='h-12 bg-gray-200 dark:bg-gray-700 rounded'
                ></div>
              ))}
            </div>
          </div>
        ) : (
          <div className='bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden'>
            <table className='min-w-full divide-y divide-gray-200 dark:divide-gray-700'>
              <thead className='bg-gray-50 dark:bg-gray-700'>
                <tr>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>
                    工具名称
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>
                    分类
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>
                    URL
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>
                    推荐
                  </th>
                  <th className='px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>
                    操作
                  </th>
                </tr>
              </thead>
              <tbody className='bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700'>
                {tools.map((tool) => (
                  <tr key={tool.id}>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='text-sm font-medium text-gray-900 dark:text-white'>
                        {tool.name}
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <span className='px-2 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full'>
                        {tool.category.name}
                      </span>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <a
                        href={tool.url}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-sm text-blue-600 dark:text-blue-400 hover:underline'
                      >
                        {tool.url.substring(0, 40)}...
                      </a>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      {tool.featured && (
                        <span className='text-yellow-500'>⭐</span>
                      )}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                      <button
                        onClick={() => handleEdit(tool)}
                        className='text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 mr-4'
                      >
                        编辑
                      </button>
                      <button
                        onClick={() => handleDelete(tool.id)}
                        className='text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300'
                      >
                        删除
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Modal */}
        {showModal && (
          <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50'>
            <div className='bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto'>
              <div className='p-6'>
                <h2 className='text-xl font-bold text-gray-900 dark:text-white mb-4'>
                  {editingTool ? '编辑工具' : '添加工具'}
                </h2>
                <form onSubmit={handleSubmit} className='space-y-4'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                      工具名称 *
                    </label>
                    <input
                      type='text'
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className='w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white'
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                      URL *
                    </label>
                    <input
                      type='url'
                      required
                      value={formData.url}
                      onChange={(e) =>
                        setFormData({ ...formData, url: e.target.value })
                      }
                      className='w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white'
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                      简短描述 *
                    </label>
                    <textarea
                      required
                      rows={2}
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value
                        })
                      }
                      className='w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white'
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                      页面显示详细描述
                    </label>
                    <textarea
                      rows={6}
                      value={formData.detailedDescription}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          detailedDescription: e.target.value
                        })
                      }
                      placeholder='输入工具的详细功能介绍、使用方法等内容...'
                      className='w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white'
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                      图标 URL
                    </label>
                    <input
                      type='url'
                      value={formData.icon}
                      onChange={(e) =>
                        setFormData({ ...formData, icon: e.target.value })
                      }
                      className='w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white'
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                      分类 *
                    </label>
                    <select
                      required
                      value={formData.categoryId}
                      onChange={(e) =>
                        setFormData({ ...formData, categoryId: e.target.value })
                      }
                      className='w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white'
                    >
                      <option value=''>选择分类</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className='flex items-center'>
                    <input
                      type='checkbox'
                      id='featured'
                      checked={formData.featured}
                      onChange={(e) =>
                        setFormData({ ...formData, featured: e.target.checked })
                      }
                      className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500'
                    />
                    <label
                      htmlFor='featured'
                      className='ml-2 text-sm font-medium text-gray-700 dark:text-gray-300'
                    >
                      设为推荐工具
                    </label>
                  </div>
                  <div className='flex gap-4 pt-4'>
                    <button
                      type='submit'
                      className='flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors'
                    >
                      {editingTool ? '更新' : '添加'}
                    </button>
                    <button
                      type='button'
                      onClick={() => setShowModal(false)}
                      className='flex-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors'
                    >
                      取消
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
