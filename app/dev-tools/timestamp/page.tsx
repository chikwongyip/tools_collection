'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

export default function TimestampPage() {
  const [datetime, setDatetime] = useState('');
  const [timestamp, setTimestamp] = useState('');
  const [timestampUnit, setTimestampUnit] = useState<'s' | 'ms'>('ms');
  const [copySuccess, setCopySuccess] = useState<string | null>(null);

  // 初始化当前时间
  useEffect(() => {
    const now = new Date();
    updateDateTimeFromDate(now);
    updateTimestampFromDate(now);
  }, []);

  // 从 Date 对象更新 datetime 输入框
  const updateDateTimeFromDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    setDatetime(`${year}-${month}-${day}T${hours}:${minutes}:${seconds}`);
  };

  // 从 Date 对象更新 timestamp
  const updateTimestampFromDate = (date: Date) => {
    const ms = date.getTime();
    if (timestampUnit === 'ms') {
      setTimestamp(ms.toString());
    } else {
      setTimestamp(Math.floor(ms / 1000).toString());
    }
  };

  // 时间转时间戳
  const convertDatetimeToTimestamp = useCallback(() => {
    if (!datetime) {
      setTimestamp('');
      return;
    }

    const date = new Date(datetime);
    if (isNaN(date.getTime())) {
      return;
    }

    const ms = date.getTime();
    if (timestampUnit === 'ms') {
      setTimestamp(ms.toString());
    } else {
      setTimestamp(Math.floor(ms / 1000).toString());
    }
  }, [datetime, timestampUnit]);

  // 时间戳转时间
  const convertTimestampToDatetime = useCallback(() => {
    if (!timestamp) {
      setDatetime('');
      return;
    }

    const ts = parseInt(timestamp, 10);
    if (isNaN(ts)) {
      return;
    }

    let date: Date;
    if (timestampUnit === 'ms') {
      date = new Date(ts);
    } else {
      date = new Date(ts * 1000);
    }

    if (isNaN(date.getTime())) {
      return;
    }

    updateDateTimeFromDate(date);
  }, [timestamp, timestampUnit]);

  // 单位切换时重新转换
  useEffect(() => {
    if (timestamp) {
      const ts = parseInt(timestamp, 10);
      if (!isNaN(ts)) {
        if (timestampUnit === 's' && ts > 10000000000) {
          setTimestamp(Math.floor(ts / 1000).toString());
        } else if (timestampUnit === 'ms' && ts < 10000000000) {
          setTimestamp((ts * 1000).toString());
        }
      }
    }
  }, [timestampUnit]);

  // 获取当前时间
  const setCurrentTime = () => {
    const now = new Date();
    updateDateTimeFromDate(now);
    updateTimestampFromDate(now);
  };

  // 复制到剪贴板
  const copyToClipboard = async (text: string, type: string) => {
    if (!text) return;

    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess(type);
      setTimeout(() => setCopySuccess(null), 2000);
    } catch (err) {
      console.error('Copy failed:', err);
    }
  };

  // 清空所有
  const clearAll = () => {
    setDatetime('');
    setTimestamp('');
  };

  // 格式化显示时间
  const formatDisplayTime = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return '';

    return date.toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800'>
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
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
          <h1 className='text-3xl font-bold text-gray-900 dark:text-white mb-2'>Unix 时间戳转换</h1>
          <p className='text-gray-600 dark:text-gray-400'>
            日期时间与 Unix 时间戳相互转换，支持秒和毫秒单位
          </p>
        </div>

        {/* Unit Selector */}
        <div className='bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-6'>
          <div className='flex items-center gap-4'>
            <span className='text-gray-700 dark:text-gray-300 font-medium'>时间戳单位:</span>
            <div className='flex gap-2'>
              <button
                onClick={() => setTimestampUnit('ms')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  timestampUnit === 'ms'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                毫秒 (ms)
              </button>
              <button
                onClick={() => setTimestampUnit('s')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  timestampUnit === 's'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                秒 (s)
              </button>
            </div>
          </div>
        </div>

        {/* Conversion Cards */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
          {/* Datetime to Timestamp */}
          <div className='bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden'>
            <div className='bg-blue-500 px-4 py-3'>
              <h2 className='font-semibold text-white flex items-center gap-2'>
                📅 日期时间 → 时间戳
              </h2>
            </div>
            <div className='p-6 space-y-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                  选择日期时间
                </label>
                <input
                  type='datetime-local'
                  value={datetime}
                  onChange={(e) => {
                    setDatetime(e.target.value);
                    setTimeout(convertDatetimeToTimestamp, 0);
                  }}
                  className='w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                />
              </div>
              {datetime && (
                <div className='p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg'>
                  <span className='text-sm text-blue-700 dark:text-blue-300'>
                    格式化: {formatDisplayTime(datetime)}
                  </span>
                </div>
              )}
              <button
                onClick={convertDatetimeToTimestamp}
                className='w-full py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors'
              >
                转换为时间戳
              </button>
            </div>
          </div>

          {/* Timestamp to Datetime */}
          <div className='bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden'>
            <div className='bg-green-500 px-4 py-3'>
              <h2 className='font-semibold text-white flex items-center gap-2'>
                ⏱️ 时间戳 → 日期时间
              </h2>
            </div>
            <div className='p-6 space-y-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                  输入时间戳 ({timestampUnit === 'ms' ? '毫秒' : '秒'})
                </label>
                <input
                  type='number'
                  value={timestamp}
                  onChange={(e) => {
                    setTimestamp(e.target.value);
                    setTimeout(convertTimestampToDatetime, 0);
                  }}
                  placeholder={timestampUnit === 'ms' ? '如: 1704067200000' : '如: 1704067200'}
                  className='w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent font-mono'
                />
              </div>
              {datetime && (
                <div className='p-3 bg-green-50 dark:bg-green-900/20 rounded-lg'>
                  <span className='text-sm text-green-700 dark:text-green-300'>
                    格式化: {formatDisplayTime(datetime)}
                  </span>
                </div>
              )}
              <button
                onClick={convertTimestampToDatetime}
                className='w-full py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors'
              >
                转换为日期时间
              </button>
            </div>
          </div>
        </div>

        {/* Result Display */}
        {(timestamp || datetime) && (
          <div className='bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-6'>
            <h3 className='font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2'>
              📊 转换结果
            </h3>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='p-4 bg-gray-50 dark:bg-gray-700 rounded-lg'>
                <div className='text-sm text-gray-500 dark:text-gray-400 mb-1'>时间戳 ({timestampUnit === 'ms' ? '毫秒' : '秒'})</div>
                <div className='flex items-center justify-between'>
                  <span className='font-mono text-lg text-gray-800 dark:text-gray-200'>
                    {timestamp || '-'}
                  </span>
                  <button
                    onClick={() => copyToClipboard(timestamp, 'timestamp')}
                    className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                      copySuccess === 'timestamp'
                        ? 'bg-green-500 text-white'
                        : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/50'
                    }`}
                  >
                    {copySuccess === 'timestamp' ? '✅ 已复制' : '📋 复制'}
                  </button>
                </div>
              </div>
              <div className='p-4 bg-gray-50 dark:bg-gray-700 rounded-lg'>
                <div className='text-sm text-gray-500 dark:text-gray-400 mb-1'>日期时间</div>
                <div className='flex items-center justify-between'>
                  <span className='text-lg text-gray-800 dark:text-gray-200'>
                    {formatDisplayTime(datetime) || '-'}
                  </span>
                  <button
                    onClick={() => copyToClipboard(formatDisplayTime(datetime), 'datetime')}
                    className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                      copySuccess === 'datetime'
                        ? 'bg-green-500 text-white'
                        : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/50'
                    }`}
                  >
                    {copySuccess === 'datetime' ? '✅ 已复制' : '📋 复制'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className='flex gap-4'>
          <button
            onClick={setCurrentTime}
            className='flex-1 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2'
          >
            🕐 使用当前时间
          </button>
          <button
            onClick={clearAll}
            className='px-8 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2'
          >
            🗑️ 清空
          </button>
        </div>

        {/* Tips */}
        <div className='mt-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6'>
          <h3 className='text-lg font-semibold text-blue-800 dark:text-blue-300 mb-3'>
            💡 使用提示
          </h3>
          <ul className='space-y-2 text-blue-700 dark:text-blue-300 text-sm'>
            <li>• Unix 时间戳是从 1970年1月1日 00:00:00 UTC 开始经过的秒/毫秒数</li>
            <li>• 毫秒时间戳通常是 13 位数字，秒时间戳是 10 位数字</li>
            <li>• 输入内容后会自动进行双向转换</li>
            <li>• 点击「使用当前时间」可快速获取当前时间的时间戳</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
