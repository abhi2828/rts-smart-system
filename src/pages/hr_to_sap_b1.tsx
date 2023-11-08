import dynamic from 'next/dynamic';
import React from 'react';
const HrTOSAP_B1 = dynamic(() => import('@/components/HrTOSAP_B1'), {
  ssr: false,
});

const HrTOSAP_B1Page = () => {
  return <HrTOSAP_B1 />;
};

export default HrTOSAP_B1Page;
