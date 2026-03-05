import type { Metadata } from 'next';
import './globals.css';
import Providers from '@/components/Providers';
import Script from 'next/script';

export const metadata: Metadata = {
  title: '工具导航 - 发现和探索优质工具',
  description: '一个精心策划的工具导航网站，帮助您发现和探索各类优质工具'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='zh-CN'>
      <head>
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}`}
          crossOrigin='anonymous'
          strategy='afterInteractive' // 建议在页面交互后加载，优化首屏速度
        />
      </head>
      <body className='antialiased'>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
