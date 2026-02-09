'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
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

export default function ToolDetailPage() {
  const [tool, setTool] = useState<Tool | null>(null);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    if (id) {
      fetchTool();
    }
  }, [id, fetchTool]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!tool) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Tool not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <Link href="/" className="text-blue-600 dark:text-blue-400 hover:underline">
            &larr; Back to Home
          </Link>
          <h1 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">
            {tool.name}
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            in {tool.category.name}
          </p>
        </div>
      </header>
      <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Tool Details</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-700 dark:text-gray-300">URL</h3>
                <a 
                  href={tool.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {tool.url}
                </a>
              </div>
              <div>
                <h3 className="font-medium text-gray-700 dark:text-gray-300">Description</h3>
                <p className="text-gray-600 dark:text-gray-400">{tool.description}</p>
              </div>
              {tool.detailedDescription && (
                <div>
                  <h3 className="font-medium text-gray-700 dark:text-gray-300">Detailed Description</h3>
                  <p className="text-gray-600 dark:text-gray-400 whitespace-pre-wrap">{tool.detailedDescription}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
