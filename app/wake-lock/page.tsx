'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';

export default function WakeLockPage() {
  const [isSupported, setIsSupported] = useState(true);
  const [isActive, setIsActive] = useState(false);
  const [wakeLock, setWakeLock] = useState<any>(null);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [elapsedTime, setElapsedTime] = useState('00:00:00');

  // 检查浏览器是否支持 Wake Lock API
  useEffect(() => {
    if (!('wakeLock' in navigator)) {
      setIsSupported(false);
    }
  }, []);

  // 页面重新激活时重新获取 Wake Lock
  useEffect(() => {
    const handleVisibilityChange = async () => {
      if (document.visibilityState === 'visible' && isActive && wakeLock === null) {
        await requestWakeLock();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [isActive, wakeLock]);

  // 计时器 - 更新运行时间
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && startTime) {
      interval = setInterval(() => {
        const now = new Date();
        const diff = now.getTime() - startTime.getTime();

        const hours = Math.floor(diff / 3600000);
        const minutes = Math.floor((diff % 3600000) / 60000);
        const seconds = Math.floor((diff % 60000) / 1000);

        setElapsedTime(
          `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
        );
      }, 1000);
    } else {
      setElapsedTime('00:00:00');
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, startTime]);

  const requestWakeLock = async () => {
    try {
      const wl = await (navigator as any).wakeLock.request('screen');
      setWakeLock(wl);
      setIsActive(true);
      setStartTime(new Date());

      wl.addEventListener('release', () => {
        setIsActive(false);
        setWakeLock(null);
        setStartTime(null);
      });
    } catch (err) {
      console.error('Wake Lock request failed:', err);
      setIsActive(false);
      setWakeLock(null);
      setStartTime(null);
    }
  };

  const releaseWakeLock = async () => {
    if (wakeLock !== null) {
      try {
        await wakeLock.release();
      } catch (err) {
        console.error('Wake Lock release failed:', err);
      }
    }
    setIsActive(false);
    setWakeLock(null);
    setStartTime(null);
  };

  const toggleWakeLock = async () => {
    if (isActive) {
      await releaseWakeLock();
    } else {
      await requestWakeLock();
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800'>
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='bg-white dark:bg-gray-800 rounded-xl shadow-md p-8'>
          <h1 className='text-3xl font-bold text-gray-900 dark:text-white mb-2'>屏幕常亮工具</h1>
          <p className='text-gray-600 dark:text-gray-400 mb-8'>
            保持您的电脑屏幕不熄灭，适合演示、阅读、视频播放等场景
          </p>

          {!isSupported ? (
            <div className='bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6 text-center'>
              <div className='text-5xl mb-4'>⚠️</div>
              <h2 className='text-xl font-semibold text-yellow-800 dark:text-yellow-200 mb-2'>
                浏览器不支持
              </h2>
              <p className='text-yellow-700 dark:text-yellow-300'>
                您的浏览器不支持 Wake Lock API。建议使用最新版本的 Chrome、Edge 或 Safari 浏览器。
              </p>
            </div>
          ) : (
            <div className='text-center'>
              {/* Status Display */}
              <div className={`rounded-xl p-8 mb-8 transition-all duration-300 ${
                isActive
                  ? 'bg-green-50 dark:bg-green-900/20 border-2 border-green-400'
                  : 'bg-gray-50 dark:bg-gray-700/50 border-2 border-gray-200 dark:border-gray-600'
              }`}>
                <div className='text-6xl mb-4'>
                  {isActive ? '☀️' : '🌙'}
                </div>
                <h2 className={`text-2xl font-bold mb-2 ${
                  isActive
                    ? 'text-green-700 dark:text-green-400'
                    : 'text-gray-700 dark:text-gray-300'
                }`}>
                  {isActive ? '屏幕常亮已启用' : '屏幕常亮未启用'}
                </h2>
                <p className={`${
                  isActive
                    ? 'text-green-600 dark:text-green-300'
                    : 'text-gray-500 dark:text-gray-400'
                }`}>
                  {isActive
                    ? '屏幕将保持亮起状态，不会自动熄灭'
                    : '点击下方按钮启动屏幕常亮功能'}
                </p>

                {/* Elapsed Time Display */}
                {isActive && (
                  <div className='mt-6 font-mono'>
                    <div className='text-sm text-green-600 dark:text-green-400 mb-1'>
                      已运行时间
                    </div>
                    <div className='text-4xl font-bold text-green-700 dark:text-green-300 tracking-wider'>
                      {elapsedTime}
                    </div>
                  </div>
                )}
              </div>

              {/* Toggle Button */}
              <button
                onClick={toggleWakeLock}
                className={`px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                  isActive
                    ? 'bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/30'
                    : 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                }`}
              >
                {isActive ? '🔴 停止屏幕常亮' : '🌞 启用屏幕常亮'}
              </button>

              {/* Tips */}
              <div className='mt-8 text-left bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6'>
                <h3 className='text-lg font-semibold text-blue-800 dark:text-blue-300 mb-3'>
                  💡 使用提示
                </h3>
                <ul className='space-y-2 text-blue-700 dark:text-blue-300 text-sm'>
                  <li>• 启用后，此标签页将保持屏幕常亮状态</li>
                  <li>• 切换到其他标签页或最小化浏览器时，屏幕常亮可能会暂时失效</li>
                  <li>• 返回此页面时，屏幕常亮会自动恢复</li>
                  <li>• 刷新或关闭页面将停止屏幕常亮功能</li>
                  <li>• 建议将此页面添加到书签以便快速访问</li>
                </ul>
              </div>

              {/* Note */}
              <div className='mt-6 text-sm text-gray-500 dark:text-gray-400'>
                <p>
                  此功能使用浏览器的 Wake Lock API，不会安装任何软件，也不会修改系统设置。
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
