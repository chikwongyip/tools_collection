'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

export default function JsonFormatPage() {
  const [inputJson, setInputJson] = useState('');
  const [formattedJson, setFormattedJson] = useState('');
  const [error, setError] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);

  // 解析错误位置信息
  const parseErrorPosition = (error: Error, json: string) => {
    const match = error.message.match(/at position (\d+)/);
    if (match) {
      const position = parseInt(match[1], 10);
      const lines = json.substring(0, position).split('\n');
      const line = lines.length;
      const column = lines[lines.length - 1].length + 1;
      return { position, line, column };
    }
    return null;
  };

  // 获取错误位置附近的内容
  const getErrorContext = (json: string, position: number) => {
    const start = Math.max(0, position - 30);
    const end = Math.min(json.length, position + 30);
    const context = json.substring(start, end);
    const pointerPosition = Math.min(30, position - start);
    return {
      context,
      pointer: ' '.repeat(pointerPosition) + '^',
      hasMoreBefore: start > 0,
      hasMoreAfter: end < json.length,
    };
  };

  // Format JSON function
  const formatJson = useCallback(() => {
    if (!inputJson.trim()) {
      setFormattedJson('');
      setError('');
      return;
    }

    try {
      const parsed = JSON.parse(inputJson);
      const formatted = JSON.stringify(parsed, null, 2);
      setFormattedJson(formatted);
      setError('');
    } catch (err) {
      const error = err as Error;
      const position = parseErrorPosition(error, inputJson);

      let errorMessage = '⚠️ JSON 格式错误\n\n';
      errorMessage += `错误信息: ${error.message}\n\n`;

      if (position) {
        errorMessage += `📍 位置: 第 ${position.line} 行, 第 ${position.column} 列 (字符 ${position.position})\n\n`;

        const context = getErrorContext(inputJson, position.position);
        if (context.hasMoreBefore) errorMessage += '...';
        errorMessage += context.context;
        if (context.hasMoreAfter) errorMessage += '...';
        errorMessage += '\n' + context.pointer + '\n\n';
      }

      errorMessage += '💡 请检查:\n';
      errorMessage += '• 逗号是否正确（最后一项后不能有逗号）\n';
      errorMessage += '• 引号是否配对（必须使用双引号）\n';
      errorMessage += '• 括号是否完整闭合\n';
      errorMessage += '• 特殊字符是否正确转义';

      setError(errorMessage);
      setFormattedJson('');
    }
  }, [inputJson]);

  // Minify JSON
  const minifyJson = useCallback(() => {
    if (!inputJson.trim()) return;

    try {
      const parsed = JSON.parse(inputJson);
      const minified = JSON.stringify(parsed);
      setInputJson(minified);
      setFormattedJson(minified);
      setError('');
    } catch (err) {
      const error = err as Error;
      const position = parseErrorPosition(error, inputJson);

      let errorMessage = '⚠️ JSON 格式错误\n\n';
      errorMessage += `错误信息: ${error.message}\n\n`;

      if (position) {
        errorMessage += `📍 位置: 第 ${position.line} 行, 第 ${position.column} 列 (字符 ${position.position})\n\n`;

        const context = getErrorContext(inputJson, position.position);
        if (context.hasMoreBefore) errorMessage += '...';
        errorMessage += context.context;
        if (context.hasMoreAfter) errorMessage += '...';
        errorMessage += '\n' + context.pointer + '\n\n';
      }

      errorMessage += '💡 请检查:\n';
      errorMessage += '• 逗号是否正确（最后一项后不能有逗号）\n';
      errorMessage += '• 引号是否配对（必须使用双引号）\n';
      errorMessage += '• 括号是否完整闭合\n';
      errorMessage += '• 特殊字符是否正确转义';

      setError(errorMessage);
    }
  }, [inputJson]);

  // Clear all
  const clearAll = () => {
    setInputJson('');
    setFormattedJson('');
    setError('');
  };

  // Copy formatted JSON to clipboard
  const copyToClipboard = async () => {
    if (!formattedJson) return;

    try {
      await navigator.clipboard.writeText(formattedJson);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Copy failed:', err);
    }
  };

  // Handle paste from clipboard
  const pasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setInputJson(text);
    } catch (err) {
      console.error('Paste failed:', err);
    }
  };

  // Auto-format when input changes (with debounce)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputJson.trim()) {
        formatJson();
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [inputJson, formatJson]);

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800'>
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <div className='mb-6'>
          <div className='flex items-center gap-3 mb-2'>
            <Link
              href='/dev-tools'
              className='text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors flex items-center gap-1 text-sm'
            >
              <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
              </svg>
              返回工具列表
            </Link>
          </div>
          <h1 className='text-3xl font-bold text-gray-900 dark:text-white mb-2'>JSON 格式化工具</h1>
          <p className='text-gray-600 dark:text-gray-400'>
            左侧粘贴或输入 JSON，右侧自动显示格式化结果
          </p>
        </div>

        {/* Toolbar */}
        <div className='flex flex-wrap gap-3 mb-4'>
          <button
            onClick={pasteFromClipboard}
            className='px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors flex items-center gap-2'
          >
            📋 粘贴剪贴板内容
          </button>
          <button
            onClick={formatJson}
            className='px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors flex items-center gap-2'
          >
            ✨ 格式化
          </button>
          <button
            onClick={minifyJson}
            className='px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-medium transition-colors flex items-center gap-2'
          >
            📦 压缩
          </button>
          <button
            onClick={clearAll}
            className='px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors flex items-center gap-2'
          >
            🗑️ 清空
          </button>
          {formattedJson && (
            <button
              onClick={copyToClipboard}
              className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                copySuccess
                  ? 'bg-green-600 text-white'
                  : 'bg-purple-500 hover:bg-purple-600 text-white'
              }`}
            >
              {copySuccess ? '✅ 已复制' : '📤 复制格式化结果'}
            </button>
          )}
        </div>

        {/* Split View */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          {/* Left - Input */}
          <div className='bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden'>
            <div className='bg-gray-100 dark:bg-gray-700 px-4 py-3 border-b border-gray-200 dark:border-gray-600'>
              <h2 className='font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2'>
                📝 输入 JSON
              </h2>
            </div>
            <textarea
              value={inputJson}
              onChange={(e) => setInputJson(e.target.value)}
              placeholder='在此粘贴或输入 JSON 内容...'
              className='w-full h-[500px] p-4 font-mono text-sm resize-none focus:outline-none bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200'
              spellCheck={false}
            />
          </div>

          {/* Right - Output */}
          <div className='bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden'>
            <div className='bg-gray-100 dark:bg-gray-700 px-4 py-3 border-b border-gray-200 dark:border-gray-600 flex items-center justify-between'>
              <h2 className='font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2'>
                ✨ 格式化结果
              </h2>
              {formattedJson && (
                <span className='text-sm text-green-600 dark:text-green-400'>
                  ✓ 有效 JSON
                </span>
              )}
            </div>
            {error ? (
              <div className='p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 font-mono text-sm h-[500px] overflow-auto whitespace-pre-wrap'>
                {error}
              </div>
            ) : (
              <pre className='w-full h-[500px] p-4 font-mono text-sm overflow-auto bg-green-50 dark:bg-green-900/10 text-gray-800 dark:text-gray-200 whitespace-pre-wrap'>
                {formattedJson || '格式化后的 JSON 将显示在这里...'}
              </pre>
            )}
          </div>
        </div>

        {/* Tips */}
        <div className='mt-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6'>
          <h3 className='text-lg font-semibold text-blue-800 dark:text-blue-300 mb-3'>
            💡 使用提示
          </h3>
          <ul className='space-y-2 text-blue-700 dark:text-blue-300 text-sm'>
            <li>• 点击「粘贴剪贴板内容」可快速粘贴复制的 JSON</li>
            <li>• 输入或粘贴内容后会自动格式化（300ms 延迟）</li>
            <li>• 「压缩」功能可去除空格和换行，最小化 JSON 体积</li>
            <li>• 支持深度嵌套的复杂 JSON 结构</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
