import dynamic from 'next/dynamic';
import React from 'react';
const Eprocurement = dynamic(() => import('@/components/Eprocurement'), {
  ssr: false,
});

const EprocurementPage = () => {
  return <Eprocurement />;
};

export default EprocurementPage;
