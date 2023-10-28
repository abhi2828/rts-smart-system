import dynamic from 'next/dynamic';
import React from 'react';
const Cmms = dynamic(() => import('@/components/Cmms'), {
  ssr: false,
});

const CmmsPage = () => {
  return <Cmms />;
};

export default CmmsPage;
