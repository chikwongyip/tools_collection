'use client';

import { useEffect } from 'react';

interface AdBannerProps {
  dataAdSlot: string;
  dataAdFormat?: string;
  dataFullWidthResponsive?: string;
}

const AdBanner = ({
  dataAdSlot,
  dataAdFormat = 'auto',
  dataFullWidthResponsive = 'true'
}: AdBannerProps) => {
  useEffect(() => {
    try {
      // 此时 TypeScript 已经认识 adsbygoogle 了
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error('AdSense error:', e);
    }
  }, []);

  return (
    <div style={{ overflow: 'hidden', minWidth: '250px', minHeight: '100px' }}>
      <ins
        className='adsbygoogle'
        style={{ display: 'block' }}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}
        data-ad-slot={dataAdSlot}
        data-ad-format={dataAdFormat}
        data-full-width-responsive={dataFullWidthResponsive}
      />
    </div>
  );
};

export default AdBanner;
